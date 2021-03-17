<template>
  <div class="ac">
    <el-input placeholder="请输入内容" v-model="inpid" class="inp"></el-input>
    <el-button class="but" @click="cxid" icon="el-icon-search"></el-button>
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加分类</el-button
    >
    <zk-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="cateList"
      :columns="columns"
      border
      :selection-type="false"
      :expand-type="false"
      show-index
      index-text="#"
      class="tree-table"
    >
      <template slot="isok" slot-scope="scope">
        <i
          class="el-icon-success"
          style="color: #20b2aa"
          v-if="scope.row.cat_deleted === false"
        ></i>
        <i class="el-icon-error" style="color: #f92672" v-else></i>
      </template>
      <template slot="order" slot-scope="scope">
        <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
        <el-tag type="success" v-else-if="scope.row.cat_level === 1" size="mini"
          >二级</el-tag
        >
        <el-tag type="danger" v-if="scope.row.cat_level === 2" size="mini"
          >三级</el-tag
        >
      </template>
      <template slot-scope="scope" slot="opt">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="(bjs = true), bj(scope.row)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-danger"
          @click="del(scope.row)"
          size="mini"
          >删除</el-button
        >
      </template>
    </zk-table>
    <!-- 分页器 -->
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
    <!-- 添加 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="aa">
          <span class="demonstration">父级分类</span>
          <el-cascader
            required
            v-model="value"
            :options="list"
            :props="props"
            @change="handleChange"
          ></el-cascader>
        </div>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="(dialogFormVisible = false), add()"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑分类" :visible.sync="bjs">
      <el-form :model="bjlist">
        <el-form-item required label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="bjlist.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="bjs = false">取 消</el-button>
          <el-button type="primary" @click="(bjs = false), bjss(bjlist)"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import http from "../axios/axios";
export default {
  data() {
    return {
      loading: true,
      addid: [],
      bjlist: {
        name: "",
      },
      inpid: null,
      list: [],
      value: [],
      props: { value: "cat_id", label: "cat_name", children: "children" },
      pagenum: 1,
      pagesize: 2,
      currentPage4: 1,
      total: 0,
      cateList: [],
      dialogFormVisible: false,
      bjs: false,
      formLabelWidth: "120px",
      form: {
        name: "",
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
          width: "75px",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
    };
  },
  methods: {
    //封装请求
    qq() {
      http({
        url: "categories",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        this.total = res.data.total;
        this.cateList = res.data.result;
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
    //删除
    del(v) {
      let a = Number(v.cat_id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: () => {
          http({
            url: `categories/${a}`,
            method: "delete",
          }).then((res) => {
            if (res.meta.status == 200) {
              this.$message({
                message: "恭喜你，删除用户成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.qq();
                },
              });
            } else {
              this.$message.error("用户删除失败");
            }
          });
        },
      });
    },
    handleChange(value) {
      this.addid = value;
    },
    //添加用户
    add() {
      http({
        url: "categories",
        method: "post",
        data: {
          cat_pid: this.addid[1],
          cat_name: this.form.name,
          cat_level: 2,
        },
      }).then((res) => {
        if (res.meta.status == 201) {
          this.$message({
            message: "恭喜你，添加用户成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.qq();
            },
          });
        } else {
          this.$message.error("用户添加失败");
        }
      });
    },
    //编辑列表
    bj(v) {
      this.bjlist = v;
    },
    bjss(v) {
      console.log(v);
      http({
        url: `categories/${v.cat_id}`,
        method: "put",
        data: {
          cat_name: v.cat_name,
        },
      }).then((res) => {
        if (res.meta.status == 200) {
          this.$message({
            message: "恭喜你，编辑用户成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.qq();
            },
          });
        } else {
          this.$message.error("编辑添加失败");
        }
      });
    },
    //查询id
    cxid() {
      http({
        url: `categories/${this.inpid}`,
        method: "get",
      }).then((res) => {
        if (res.meta.status != 400) {
          this.cateList.splice(0, this.cateList.length, res.data);
        } else {
          this.$message.error("用户不存在");
        }
      });
    },
  },
  components: {},
  computed: {},
  mounted() {
    this.qq();
    http({
      url: "categories",
      method: "get",
      params: {
        type: 2,
      },
    }).then((res) => {
      this.list = res.data;
    });
  },
};
</script>

<style scoped lang="less">
.ac {
  margin-top: 20px;
}
.aa {
  margin-left: 63px;
}
.inp {
  width: 240px;
  height: 40px;
}
</style>
