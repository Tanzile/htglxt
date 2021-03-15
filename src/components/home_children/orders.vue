<template>
  <div id="orders">
    <!-- 搜索 -->
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      class="searchOrder"
    >
    </el-input>
    <el-button icon="el-icon-search" @click="searchOrders">搜索</el-button>
    <!-- 表格 -->
    <el-table :data="ordersList" stripe style="width: 100%" border>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column prop="order_number" label="订单编号"> </el-table-column>
      <el-table-column prop="order_price" label="订单价格"> </el-table-column>
      <el-table-column prop="pay_status" label="是否付款">
        <el-tag type="success" v-if="ordersList.pay_status == 0">已付款</el-tag>
        <el-tag type="danger" v-else>未付款</el-tag>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"> </el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">
        {{ scope.row.create_time | filtedate }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="reWriteOrder(scope.row)"
          >
            订单
          </el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-location-outline"
            @click="reWriteAdress(scope.row)"
            >地址</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 2, 5, 10]"
      :current-page="pagenum"
      :page-size="pagesize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 15px"
    >
    </el-pagination>
    <!-- 弹出编辑订单 -->
    <el-dialog
      title="编辑角色"
      v-model="dialogReWriteOrdersVisible"
      :visible.sync="dialogReWriteOrdersVisible"
    >
      <el-form :model="reWriteOrderList" ref="reWriteOrderList">
        <el-form-item label="请填写0或1  (0:未发货，1:已经发货)">
          <el-input
            v-model="reWriteOrderList.is_send"
            autocomplete="off"
            placeholder="订单是否发货"
            prefix-icon="el-icon-caret-right"
          ></el-input>
        </el-form-item>
        <el-form-item label="请填写订单的价格  (单位为：￥)">
          <el-input
            v-model="reWriteOrderList.order_price"
            autocomplete="off"
            placeholder="订单价格"
            prefix-icon="el-icon-caret-right"
          ></el-input>
        </el-form-item>
        <el-form-item label="请填写订单的数量">
          <el-input
            v-model="reWriteOrderList.order_number"
            autocomplete="off"
            placeholder="订单数量"
            prefix-icon="el-icon-caret-right"
          ></el-input>
        </el-form-item>
        <el-form-item label="请填写0或1  (0:未付款，1:已付款)">
          <el-input
            v-model="reWriteOrderList.pay_status"
            autocomplete="off"
            placeholder="支付状态"
            prefix-icon="el-icon-caret-right"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancleReWriteOrders">取 消</el-button>
          <el-button
            type="primary"
            @click="successReWriteOrders('reWriteOrderList')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import http from "./../axios/axios";
import { fmtDate } from '@/components/filters/date.js';
let { log } = console;
export default {
  props: {},
  data() {
    return {
      pagenum: 1,
      pagesize: 5,
      total: 0,
      ordersList: [],
      // 修改订单状态
      dialogReWriteOrdersVisible: false,
      orderId: "",
      reWriteOrderList: {
        order_number: "",
        is_send: "",
        order_price: "",
        pay_status: "",
      },
    };
  },
  methods: {
    // 分页器
    handleSizeChange(newSize) {
      this.pagesize = newSize;
      this.loadOrdersList();
    },
    handleCurrentChange(newNum) {
      this.pagenum = newNum;
      this.loadOrdersList();
    },
    // 封装加载订单列表
    loadOrdersList() {
      http({
        url: "orders",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        if (res.meta.status !== 200) {
          this.$message.error("加载订单失败!");
        } else {
          this.ordersList = res.data.goods;
          this.total = res.data.total;
          this.$message.success("加载订单成功!");
          log(this.ordersList);
        }
      });
    },
    // 修改订单
    /* 打开订单弹层的按钮，并把当前行ID值赋值给空数组 */
    reWriteOrder(scoperow) {
      this.orderId = scoperow.order_id;
      this.dialogReWriteOrdersVisible = true;
    },
    successReWriteOrders(reWriteOrderList) {
      this.$refs[reWriteOrderList].validate((valid) => {
        if (valid) {
          http({
            url: `orders/${this.orderId}`,
            method: "put",
            data: {
              order_number: this.reWriteOrderList.order_number,
              is_send: this.reWriteOrderList.is_send,
              order_price: this.reWriteOrderList.order_price,
              pay_status: this.reWriteOrderList.pay_status,
            },
          }).then((res) => {
            if (res.meta.status !== 201) {
              this.$message.error("修改订单失败");
            } else {
              this.$message.success("修改订单成功");
              this.dialogReWriteOrdersVisible = false;
              this.loadOrdersList();
              this.order_number = "";
              this.is_send = "";
              this.order_price = "";
              this.pay_status = "";
            }
          });
        }
      });
    },
    cancleReWriteOrders() {
      this.dialogReWriteOrdersVisible = false;
    },
    // 修改地址
    reWriteAdress(scopeRow) {
      let id = scopeRow.order_id;
      log("修改地址功能的当前行id值:" + id);
      this.$message.info("此功能尚在维护中...");
      /* http({
        url: `/kuaidi/${id}`,
        method: "get",
      }).then((res) => log(res)); */
    },
    // 搜索
    searchOrders(){
      this.$message.info("此功能尚在维护中...")
    }
  },
  filters: {
    filtedate: function (date) {
      let t = new Date(date);
      return fmtDate(t, "yyyy-MM-dd hh:mm:ss");
    },
  },
  components: {},
  computed: {},
  mounted() {
    this.loadOrdersList();
  },
};
</script>

<style scoped lang="less">
#orders {
  padding: 20px;
  border-radius: 5px;
  background: #fff;

  .searchOrder {
    margin-bottom: 15px;
    width: 200px;
  }
}
</style>
