<template>
  <div id="box">
    <el-alert class="hh" title="添加商品" type="info" center show-icon> </el-alert>
    <div class="hend">
      <el-steps :active="active" finish-status="success" space="1200px">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div>
      <el-tabs
        @tab-click="dj()"
        v-model="name"
        :tab-position="tabPosition"
        style="height: 100%"
      >
        <el-tab-pane name="0" label="基本信息">
          <!--  -->
          <el-form
            v-model="formInline"
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item label="商品名称" required>
              <el-input class="s" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" required>
              <el-input class="s" v-model="formInline.pic"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" required>
              <el-input class="s" v-model="formInline.wie"></el-input>
            </el-form-item>
            <el-form-item class="s" label="商品数量" required>
              <el-input-number
                class="w"
                v-model="formInline.number"
                controls-position="right"
                :min="0"
                :max="99999"
              ></el-input-number>
            </el-form-item>
            <span class="demonstration">选择商品分类：</span>
            <el-cascader
              class="qqs"
              prop="goods_cat"
              v-model="value"
              :options="list"
              :props="props"
              @change="handleChange"
            ></el-cascader>
          </el-form>
          <!--  -->
        </el-tab-pane>
        <el-tab-pane name="1" :disabled="csbd" label="商品参数">
          <el-checkbox
            v-for="item in cs"
            :key="item.id"
            class="bqq"
            v-model="checked3"
            :label="item.attr_vals"
            border
            size="medium"
          ></el-checkbox>
        </el-tab-pane>
        <el-tab-pane name="2" :disabled="csbd" label="商品属性">
          <el-form
            :model="sxnew"
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item
              v-for="item in sxlist"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input :value="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="3" :disabled="csbd" label="商品图片">
          <el-upload
            class="upload-demo"
            :action="imghttp"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane :disabled="csbd" name="4" label="商品内容">
          <quill-editor class="h" v-model="formInline.goods_introduce">
          </quill-editor>
          <el-button @click="addfs" type="primary" class="but"
            >添加商品</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import http from "../axios/axios";
export default {
  data() {
    return {
      active: 0,
      tabPosition: "left",
      labelPosition: "top",
      num: 0,
      csbd: true,
      sxnew: {
        name: "",
        vals: "",
      },
      list: [],
      fileList: [],
      sxlist: [],
      value: [],
      name: "",
      imghttp: "/api/upload",
      checked3: true,
      cs: [],
      props: { value: "cat_id", label: "cat_name", children: "children" },
      formInline: {
        name: "",
        pic: "",
        wie: "",
        number: 0,
        goods_introduce: "",
      },
    };
  },
  methods: {
    handleChange(v) {
      if (
        this.formInline.name != "" &&
        this.formInline.pic != "" &&
        this.formInline.wie != "" &&
        this.formInline.number != 0 &&
        this.value != ""
      ) {
        this.csbd = false;
        this.sxbd = false;
        this.active++;
        this.name = "1";
      } else {
        this.$message.error("请补全，表格的信息");
        return false;
      }
      http({
        url: `categories/${this.value[2]}/attributes`,
        method: "get",
        params: {
          sel: "many",
        },
      }).then((res) => {
        this.cs = res.data;
        console.log(res);
      });
      //静态
      http({
        url: `categories/${this.value[2]}/attributes`,
        method: "get",
        params: {
          sel: "only",
        },
      }).then((res) => {
        this.sxlist = res.data;
        this.sxjtbd = false;
        console.log(res);
      });
    },
    dj() {
      http({
        url: `categories/${this.value[2]}/attributes`,
        method: "get",
        params: {
          sel: "many",
        },
      }).then((res) => {
        this.cs = res.data;
      });
      this.active = this.name - 0;
      //静态
      http({
        url: `categories/${this.value[2]}/attributes`,
        method: "get",
        params: {
          sel: "only",
        },
      }).then((res) => {
        this.sxlist = res.data;
      });
    },
    handlePreview() {},
    handleRemove() {},
    addfs() {
      console.log(this.formInline);
      console.log(this.list);
      http({
        url: "goods",
        method: "post",
        data: {
          goods_name: this.formInline.name,
          goods_cat: `${this.value[0]},${this.value[1]},${this.value[2]}`,
          goods_price: this.formInline.pic,
          goods_number: this.formInline.number,
          goods_weight: this.formInline.wie,
          goods_introduce: this.goods_introduce,
        },
      }).then((res) => {
        this.name++
        console.log(res);
        if (res.meta.status == 201) {
          this.$message({
            message: `恭喜你，用户添加成功`,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.replace("/home/goods");
            },
          });
        } else {
          this.$message.error("用户添加失败");
        }
      });
    },
  },
  components: {},
  computed: {},
  mounted() {
    this.name = "0";
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
.hend {
  margin-top: 20px;
  margin-left: 200px;
  width: 80%;
}
.hh{
  width: 80%;
}
#box {
  background: #fff;
  padding: 30px;
  height: 100%;
}
.w {
  width: 80%;
}
.bqq {
  margin-top: 50px;
}
.but {
  margin-top: 50px;
}
.s {
  width: 80%;
}
</style>
