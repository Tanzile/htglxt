<template>
  <div class="box">
    <div>
      <el-input placeholder="请输入内容" v-model="inpid" class="inp"></el-input>
      <el-button class="but" @click="cxid" icon="el-icon-search"></el-button>
      <el-button type="primary" @click="tj()">添加商品</el-button>
    </div>
    <!-- 用户列表渲染 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="500">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="150">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="150">
      </el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              getfrom(
                scope.row.goods_name,
                scope.row.goods_price,
                scope.row.goods_number,
                scope.row.goods_weight,
                scope.row.goods_introduce,
                scope.row.goods_id
              ),
                (adds = true)
            "
            icon="el-icon-edit"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="del(scope.row.goods_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[2, 5, 10, 13]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="adds">
      <el-form :model="formlist">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="formlist.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input
            v-model="formlist.goods_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input
            v-model="formlist.goods_number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
          <el-input
            v-model="formlist.goods_weight"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input
            v-model="formlist.goods_introduce"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dd">
        <span class="demonstration">选择商品分类：</span>
        <el-cascader
          class="qqs"
          prop="goods_cat"
          v-model="value"
          :options="list"
          :props="props"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adds = false">取 消</el-button>
        <el-button type="primary" @click="(adds = false), setname()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 分配角色 -->
  </div>
</template>

<script>
import http from "../axios/axios";
export default {
  props: {},
  data() {
    return {
      loading: true,
      inpid: null,
      tableData: [],
      props: { value: "cat_id", label: "cat_name", children: "children" },
      list: [],
      value: [],
      total: 0,
      currentPage4: 1,
      pagenum: 1,
      pagesize: 2,
      add: false,
      adds: false,
      addss: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        region: "",
      },
      formlist: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        goods_id: "",
      },
      szlist: {
        username: "",
        region: "",
        email: "",
        id: "",
      },
      formLabelWidth: 120 + "px",
    };
  },
  methods: {
    //封装的请求
    qq() {
      http({
        url: "goods",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        this.tableData = res.data.goods;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    //分页器
    handleSizeChange(val) {
      this.pagesize = val;
      this.qq();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.qq();
    },
    //添加新用户
    tj() {
      this.$router.replace("/home/addgoods");
    },
    //删除
    del(v) {
      let vs = Number(v);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: () => {
          http({
            url: `goods/${vs}`,
            method: "delete",
          }).then((res) => {
            if (res.meta.status == 200) {
              this.$message({
                message: "恭喜你，删除商品成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.qq();
                },
              });
            } else {
              this.$message.error("商品删除失败");
            }
          });
        },
      });
    },
    //更改状态
    state(sta, id) {
      http({
        url: `users/${id}/state/${sta}`,
        method: "put",
      }).then((res) => {
        if (res.meta.status == 200) {
          this.$message({
            message: `恭喜你，${res.data.username}的状态更改成功`,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.qq();
            },
          });
        } else {
          this.$message.error("用户状态更改失败");
        }
      });
    },
    //查询用户
    cxid() {
      http({
        url: `users/${this.inpid}`,
        method: "get",
      }).then((res) => {
        if (res.meta.status != 400) {
          this.tableData.splice(0, this.tableData.length, res.data);
        } else {
          this.$message.error("用户不存在");
        }
      });
    },
    //传给编辑用户的数据
    getfrom(
      goods_name,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      goods_id
    ) {
      this.formlist.goods_name = goods_name;
      this.formlist.goods_price = goods_price;
      this.formlist.goods_number = goods_number;
      this.formlist.goods_weight = goods_weight;
      this.formlist.goods_introduce = goods_introduce;
      this.formlist.goods_id = goods_id;
    },
    //提交要编辑的数据
    setname() {
      console.log(this.value);
      http({
        url: `goods/${this.formlist.goods_id}`,
        method: "put",
        data: {
          goods_name: this.formlist.goods_name,
          goods_price: this.formlist.goods_price,
          goods_number: this.formlist.goods_number,
          goods_weight: this.formlist.goods_weight,
          goods_introduce: this.formlist.goods_introduce,
          goods_cat: `${this.value[0]},${this.value[1]},${this.value[2]}`,
        },
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.$message({
            message: `恭喜你，${res.data.username}编辑成功`,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.qq();
            },
          });
        } else {
          this.$message.error("用户编辑失败");
        }
      });
    },
    handleChange() {},
  },

  components: {},
  computed: {},
  mounted() {
    this.qq();
    http({
      url: "categories",
      method: "get",
      params: {
        type: 3,
      },
    }).then((res) => {
      this.list = res.data;
    });
  },
};
</script>

<style scoped lang="less">
.box {
  margin-top: 20px;
  width: 100%;
  background: #fff;
  padding: 30px;
}
.inp {
  width: 240px;
  height: 40px;
}
.but {
  background: #f5f7fa;
}
.dd {
  margin-left: 20px;
}
</style>
