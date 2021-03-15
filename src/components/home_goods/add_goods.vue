<template>
  <div id="box">
    <el-alert title="添加商品" type="info" center show-icon> </el-alert>
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
        <el-tab-pane name="1" label="基本信息">
          <!--  -->
          <el-form
            v-model="formInline"
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item label="商品名称" required>
              <el-input v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" required>
              <el-input v-model="formInline.pic"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" required>
              <el-input v-model="formInline.wie"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" required>
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
        <el-tab-pane name="2" :disabled="csbd" label="商品参数">
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
        <el-tab-pane name="3" :disabled="sxjtbd" label="商品属性">
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item
              v-for="item in sxlist"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">定时任务补偿</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">定时任务补偿</el-tab-pane>
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
      csbd: false,
      sxbd: false,
      sxjtbd: false,
      list: [],
      sxlist: [],
      value: [],
      name: "",
      checked3: true,
      cs: [],
      props: { value: "cat_id", label: "cat_name", children: "children" },
      formInline: {
        name: "",
        pic: "",
        wie: "",
        number: 0,
      },
    };
  },
  methods: {
    handleChange() {
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
        this.name = "2";
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
        console.log(res);
        console.log(this.cs);
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
        console.log(res);
      });
      if ((this.checked3 = true)) {
        this.sxbd = false;
        this.active++;
        this.name = "3";
      }
    },
  },
  components: {},
  computed: {},
  mounted() {
    this.name = "1";
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
}
#box {
  background: #fff;
  padding: 30px;
  height: 100%;
}
.w {
  width: 100%;
}
.bqq {
  margin-top: 50px;
}
</style>
