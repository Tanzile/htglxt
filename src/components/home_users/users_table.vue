<template>
  <div class="box">
    <div>
      <el-input placeholder="请输入内容" v-model="inpid" class="inp"></el-input>
      <el-button class="but" @click="cxid" icon="el-icon-search"></el-button>
      <el-button type="primary" @click="add = true">添加用户</el-button>
    </div>
    <!-- 用户列表渲染 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色" width="180">
      </el-table-column>

      <el-table-column prop="mg_state" label="状态" width="180">
        <template slot-scope="scope">
          <div @click="state(scope.row.mg_state, scope.row.id)">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              getfrom(
                scope.row.username,
                scope.row.email,
                scope.row.mobile,
                scope.row.id
              ),
                (adds = true)
            "
            icon="el-icon-edit"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="del(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            icon="el-icon-s-tools"
            type="warning"
            @click="
              (addss = true),
                szname(scope.row.username, scope.row.email, scope.row.id)
            "
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
    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="add">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add = false">取 消</el-button>
        <el-button type="primary" @click="(add = false), tj()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="adds">
      <el-form :model="formlist">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formlist.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formlist.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="formlist.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adds = false">取 消</el-button>
        <el-button type="primary" @click="(adds = false), setname()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="addss">
      <el-form :model="szlist">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="szlist.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="szlist.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分配新角色" :label-width="formLabelWidth">
          <el-select v-model="szlist.region" placeholder="请选择">
            <el-option
              v-for="item in jslist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addss = false">取 消</el-button>
        <el-button type="primary" @click="(addss = false), fp()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      total: 0,
      currentPage4: 1,
      pagenum: 1,
      pagesize: 2,
      add: false,
      adds: false,
      addss: false,
      jslist: [],
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        region: "",
      },
      formlist: {
        username: "",
        mobile: "",
        email: "",
        id: "",
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
          url: "users",
          method: "get",
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        }).then((res) => {
          console.log(res);
          this.tableData = res.data.users;
          this.total = res.data.total;
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
      http({
        url: "users",
        method: "post",
        data: {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          mobile: this.form.mobile,
        },
      }).then((res) => {
        if (res.meta.status == 201) {
          this.$message({
            message: "恭喜你，用户添加成功",
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
    //删除
    del(v) {
      let vs = Number(v);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: () => {
          http({
            url: `users/${vs}`,
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
          this.inpid = "";
        } else {
          this.$message.error("用户不存在");
        }
      });
    },
    //传给编辑用户的数据
    getfrom(username, email, mobile, id) {
      this.formlist.username = username;
      this.formlist.email = email;
      this.formlist.mobile = mobile;
      this.formlist.id = id;
    },
    //提交要编辑的数据
    setname() {
      http({
        url: `users/${this.formlist.id}`,
        method: "put",
        data: {
          email: this.formlist.email,
          mobile: this.formlist.mobile,
        },
      }).then((res) => {
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
    //分配角色
    szname(username, email, id) {
      this.szlist.username = username;
      this.szlist.email = email;
      this.szlist.id = id;
    },
    fp() {
      console.log(this.szlist.id);
      console.log(this.szlist.region);
      http({
        url: `users/${this.szlist.id}/role`,
        method: "put",
        data: {
          rid: this.szlist.region - 0,
        },
      }).then((res) => {
        this.qq();
        console.log(res);
      });
    },
  },

  components: {},
  computed: {},
  mounted() {
    http({
      url: "roles",
      method: "get",
    }).then((res) => {
      this.jslist = res.data;
    });
    this.qq();
  },
  updated() {
    this.loading = false;
  },
};
</script>

<style scoped lang="less">
.box {
  width: 1200px;
  background: #fff;
  padding: 30px;
  margin-top: 20px;
}
.inp {
  width: 240px;
  height: 40px;
}
.but {
  background: #f5f7fa;
}
</style>
