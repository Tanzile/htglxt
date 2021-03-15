<template>
  <div class="a">
    <el-alert
      title="注意：只允许为第三级分类设置相关参数"
      :closable="false"
      type="warning"
      show-icon
    >
    </el-alert>
    <div class="ab">
      <span class="demonstration">选择商品分类：</span>
      <el-cascader
        v-model="value"
        :options="list"
        :props="props"
        @change="handleChange"
      ></el-cascader>
    </div>
    <div class="dis">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加参数</el-button
          >
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <!--标签  -->
                <el-tag closable :disable-transitions="false">
                  {{ props.row.attr_vals }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <!--  -->
              </template>
            </el-table-column>
            <el-table-column label="#" type="index" prop="id">
            </el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作" prop="desc">
              <template slot-scope="props">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="
                    (dtbj = true), adtbj(props.row.attr_id, props.row.attr_name)
                  "
                ></el-button>
                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                  @click="handleClose(props.row.attr_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- ------- -->
        <el-tab-pane label="静态参数" name="second">
          <el-button type="primary" @click="(add = true), jtadd"
            >添加静态属性</el-button
          >
          <el-table border :data="jtlist" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <!--标签  -->
                <el-tag
                  closable
                  :disable-transitions="false"
                  @close="handleClose(props.row)"
                >
                  {{ props.row.attr_vals }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <!--  -->
              </template>
            </el-table-column>
            <el-table-column label="#" type="index" prop="id">
            </el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作" prop="desc">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="
                    (jtbj = true), ajtbj(scope.row.attr_id, scope.row.attr_name)
                  "
                ></el-button>
                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                  @click="handleClose(scope.row.attr_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加动态 -->
    <el-dialog title="添加动态属性" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="动态参数" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="(dialogFormVisible = false), dtadd()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加静态 -->
    <el-dialog title="添加动态属性" :visible.sync="add">
      <el-form :model="form">
        <el-form-item required label="静态属性" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add = false">取 消</el-button>
        <el-button type="primary" @click="(add = false), jtadd()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 静态编辑 -->
    <el-dialog title="添加动态属性" :visible.sync="jtbj">
      <el-form :model="form">
        <el-form-item label="动态属性" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="jtbj = false">取 消</el-button>
        <el-button type="primary" @click="(jtbj = false), jtbjs()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 动态态编辑 -->
    <el-dialog title="添加动态属性" :visible.sync="dtbj">
      <el-form :model="form">
        <el-form-item label="静态属性" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dtbj = false">取 消</el-button>
        <el-button type="primary" @click="(dtbj = false), dtbjs()"
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
      add: false,
      formLabelWidth: "120px",
      inputVisible: false,
      tableData: [],
      dialogFormVisible: false,
      jtbj: false,
      dtbj: false,
      form: {
        name: "",
        value: "",
      },
      list: [],
      id: null,
      value: [],
      jtlist: [],
      activeName: "first",
      props: { value: "cat_id", label: "cat_name", children: "children" },
      tjlist: {},
    };
  },
  methods: {
    qq() {
      http({
        url: `categories/${this.id}/attributes`,
        method: "get",
        params: {
          sel: "many",
        },
      }).then((res) => {
        this.tableData = res.data;
        console.log(res)
      });
    },
    qqs() {
      http({
        url: `categories/${this.id}/attributes`,
        method: "get",
        params: {
          sel: "only",
        },
      }).then((res) => {
        this.jtlist = res.data;
      });
    },
    //开始
    handleChange(v) {
      this.id = v[2];
      this.qq();
      this.qqs();
    },
    handleClick(v, e) {},
    //动态添加
    dtadd() {
      http({
        url: `categories/${this.value[2]}/attributes`,
        method: "post",
        data: {
          attr_name: this.form.name,
          attr_sel: "many",
          attr_vals: this.form.value,
        },
      }).then((res) => {
        this.form = {};
        this.qq();
      });
    },
    //静态添加
    jtadd() {
      http({
        url: `categories/${this.value[2]}/attributes`,
        method: "post",
        data: {
          attr_name: this.form.name,
          attr_sel: "only",
        },
      }).then((res) => {
        this.form = {};
        this.qqs();
      });
    },
    //删除参数
    handleClose(v) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: () => {
          http({
            url: `categories/${this.value[2]}/attributes/${v}`,
            method: "delete",
          }).then((res) => {
            if (res.meta.status == 200) {
              this.$message({
                message: "恭喜你，删除参数成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.qq();
                  this.qqs();
                },
              });
            } else {
              this.$message.error("参数删除失败");
            }
          });
        },
      });
    },
    //静态编辑
    ajtbj(v, n) {
      (this.form.name = n), (this.form.value = v);
    },
    jtbjs() {
      http({
        url: `categories/${this.value[2]}/attributes/${this.form.value}`,
        method: "put",
        data: {
          attr_name: this.form.name,
          attr_sel: "only",
        },
      }).then((res) => {
        this.form = {};
        this.qqs();
      });
    },
    //动态编辑
    adtbj(v, n) {
      (this.form.name = n), (this.form.value = v);
    },
    dtbjs() {
      http({
        url: `categories/${this.value[2]}/attributes/${this.form.value}`,
        method: "put",
        data: {
          attr_name: this.form.name,
          attr_sel: "many",
        },
      }).then((res) => {
        this.form = {};
        this.qq();
      });
    },
  },
  components: {},
  computed: {},
  mounted() {
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
.a {
  margin-top: 20px;
  padding: 30px;
  background: #fff;
}
.ab {
  margin-top: 20px;
}
</style>
