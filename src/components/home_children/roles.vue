<template>
  <div>
    <Breadcrumb one="权限管理" two="角色列表"></Breadcrumb>
    <div id="roles">
      <!-- 添加角色 -->
      <el-button type="primary" @click="dialogFormVisible = true">
        添加角色
      </el-button>
      <el-dialog
        title="添加角色"
        v-model="dialogFormVisible"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="rolesInfo" ref="rolesInfo">
          <el-form-item>
            <el-input
              v-model="rolesInfo.rName"
              autocomplete="off"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="rolesInfo.rDesc"
              autocomplete="off"
              placeholder="请输入角色描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancleroles">取 消</el-button>
            <el-button type="primary" @click="addroles('rolesInfo')"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
      <!-- 编辑角色 -->
      <el-dialog
        title="编辑角色"
        v-model="dialogEditVisible"
        :visible.sync="dialogEditVisible"
      >
        <el-form :model="editsInfo" ref="editsInfo">
          <el-form-item>
            <el-input
              v-model="editsInfo.eName"
              autocomplete="off"
              placeholder="请输入想修改的角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="editsInfo.eDesc"
              autocomplete="off"
              placeholder="请输入想修改的角色描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancleedit">取 消</el-button>
            <el-button type="primary" @click="editroles('editsInfo')"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
      <!-- 添加权限 -->
      <el-dialog
        title="分配权限"
        v-model="treeVisible"
        :visible.sync="treeVisible"
        @close="resettree"
      >
        <el-tree
          :data="rolestree"
          show-checkbox
          node-key="id"
          :props="treeprops"
          default-expand-all
          :default-checked-keys="deftrees"
          ref="reftree"
        ></el-tree>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancletree">取 消</el-button>
            <el-button @click="settree" type="primary">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 角色列表 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['rowbottom', i1 === 0 ? 'rowtop' : '', 'vcenter']"
              v-for="(lev1, i1) in scope.row.children"
              :key="lev1.id"
            >
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightsById(scope.row, lev1.id)"
                  >{{ lev1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'rowtop', 'vcenter']"
                  v-for="(lev2, i2) in lev1.children"
                  :key="lev2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      @close="removeRightsById(scope.row, lev2.id)"
                      type="success"
                      >{{ lev2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      @close="removeRightsById(scope.row, lev3.id)"
                      type="warning"
                      v-for="lev3 in lev2.children"
                      :key="lev3.id"
                    >
                      {{ lev3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <!-- 操作按钮 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="goedit(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleroles(scope.row.id)"
            >
              删除
            </el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="gorolestree(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import http from "./../axios/axios";
import Breadcrumb from "../gz/breadcrumb ";
export default {
  props: {},
  data() {
    return {
      loading: true,
      // 列表中的所有数据
      tableData: [],
      // 显示隐藏
      dialogFormVisible: false,
      dialogEditVisible: false,
      treeVisible: false,
      // 编辑角色需要的数据保存
      editRowId: "",
      editsInfo: {
        eName: "",
        eDesc: "",
      },
      rolesInfo: {
        rName: "",
        rDesc: "",
      },
      // 权限树
      rolestree: "",
      treeprops: {
        label: "authName",
        children: "children",
      },
      deftrees: [],
      getrowtreeid: "",
    };
  },
  // 调用加载列表函数刷新列表
  mounted() {
    this.loadrolesList();
  },
  methods: {
    // 加载列表
    async loadrolesList() {
      await http("/roles").then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.info("刷新列表失败!请重试..");
        } else {
          this.$message.success("获取列表成功!");
          this.tableData = res.data;
          this.loading = false;
        }
      });
    },
    // 打开添加角色的输入框
    goadd() {
      this.showadd = !this.showadd;
    },
    //取消添加角色的输入框
    cancleroles() {
      this.rolesInfo.rName = "";
      this.rolesInfo.rDesc = "";
      this.dialogFormVisible = false;
      this.goadd();
    },
    // 添加角色
    addroles(rolesInfo) {
      this.$refs[rolesInfo].validate((valid) => {
        if (valid) {
          http({
            url: "/roles",
            method: "post",
            data: {
              roleName: this.rolesInfo.rName,
              roleDesc: this.rolesInfo.rDesc,
            },
          }).then((res) => {
            this.tableData.push(res.data);
            this.loadrolesList();
            this.rolesInfo.rName = "";
            this.rolesInfo.rDesc = "";
            this.dialogFormVisible = false;
          });
        }
      });
    },
    // 删除角色
    async deleroles(id) {
      const resultfromawait = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (resultfromawait !== "confirm") {
        return this.$message.info("取消删除角色");
      } else {
        http({
          url: `roles/${id}`,
          method: "delete",
        }).then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.info("删除角色失败");
          }
          this.$message.success("成功删除角色");
          this.loadrolesList();
        });
      }
    },
    // 根据ID删除角色权限
    async removeRightsById(roleid, rightsid) {
      const resultfromRights = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (resultfromRights !== "confirm") {
        console.log(roleid);
        return this.$message.info("取消删除权限");
      } else {
        http({
          url: `roles/${roleid.id}/rights/${rightsid}`,
          method: "delete",
        }).then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.info("删除权限失败");
          } else {
            this.$message.success("成功权限角色");
            roleid.children = res.data;
          }
        });
      }
    },
    // 打开编辑角色框
    goedit(rowid) {
      this.dialogEditVisible = true;
      this.editRowId = rowid;
      console.log(this.editRowId);
    },
    // 编辑角色
    editroles(editsInfo) {
      this.$refs[editsInfo].validate((valid) => {
        if (valid) {
          http({
            url: `roles/${this.editRowId}`,
            method: "put",
            data: {
              roleName: this.editsInfo.eName,
              roleDesc: this.editsInfo.eDesc,
            },
          }).then((res) => {
            this.tableData.push(res.data);
            this.loadrolesList();
            this.editsInfo.eName = "";
            this.editsInfo.eDesc = "";
            this.dialogEditVisible = false;
          });
        }
      });
    },
    // 取消编辑
    cancleedit() {
      this.dialogEditVisible = false;
      this.editsInfo.eName = "";
      this.editsInfo.eDesc = "";
      this.$message.info("取消编辑");
    },
    // 打开分配权限
    async gorolestree(rowmsg) {
      this.getrowtreeid = rowmsg.id;
      const { data: res } = await http({
        url: "rights/tree",
        method: "get",
      });
      this.rolestree = res;
      this.getkeys(rowmsg, this.deftrees);
      this.treeVisible = true;
    },
    // 递归遍历所有不含children的对象id
    getkeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getkeys(item, arr);
      });
    },
    // 关闭分配时重置数组数据
    resettree() {
      this.deftrees = [];
    },
    // 点击确定分配权限
    settree() {
      // elementui内置方法拿到勾选项
      const keys = [
        ...this.$refs.reftree.getCheckedKeys(),
        ...this.$refs.reftree.getHalfCheckedKeys(),
      ];
      // 分割成请求需要的格式
      const reqid = keys.join(",");
      // 请求post设置权限
      http({
        url: `roles/${this.getrowtreeid}/rights`,
        method: "post",
        data: {
          rids: reqid,
        },
      }).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("设置权限失败");
        } else {
          this.$message.success("设置权限成功");
          this.loadrolesList();
          this.treeVisible = false;
        }
      });
    },
    // 关闭树形图分配
    cancletree() {
      this.deftrees = [];
      this.treeVisible = false;
    },
  },
  components: {
    Breadcrumb,
  },
};
</script>

<style lang="less">
#roles {
  padding: 20px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  margin-top: 20px;

  .addbox {
    padding: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;

    input {
      width: 500px;
    }
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table {
    margin-top: 20px;
  }

  .el-tag {
    margin: 7px;
  }

  .rowtop {
    border-top: 1px solid #eee;
  }

  .rowbottom {
    border-bottom: 1px solid #eee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }
}
</style>
