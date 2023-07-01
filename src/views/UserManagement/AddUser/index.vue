<template>
  <div class="test">
    <div class="princict-tree">
      <!-- <div class="filter">
        <el-input
          placeholder=""
          v-model="filterText"
          clearable
          suffix-icon="el-icon-search"
        >
        </el-input>
      </div> -->

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
      >
      </el-tree>
    </div>
    <div class="content">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="User Name">
              <el-input v-model="formInline.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Password">
              <el-input v-model="formInline.password"></el-input>
              <!-- <el-select v-model="formInline.password">
                
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Full Name">
              <el-input v-model="formInline.fullName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Gender">
              <!-- <el-input v-model="formInline.gender"></el-input> -->
              <el-select v-model="formInline.gender">
                <el-option label="male" value="0"></el-option>
                <el-option label="female" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="User Type">
              <el-select v-model="formInline.userType">
                <el-option label="male" value="0"></el-option>
                <el-option label="female" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Authority">
              <!-- <el-input v-model="formInline.gender"></el-input> -->
              <el-select v-model="formInline.authority">
                <el-option label="male" value="0"></el-option>
                <el-option label="female" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Position">
              <el-select v-model="formInline.position">
                <el-option label="male" value="0"></el-option>
                <el-option label="female" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Jurisdiction">
              <el-select v-model="formInline.position">
                <el-option label="male" value="0"></el-option>
                <el-option label="female" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Phone Number">
              <el-input v-model="formInline.phoneNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Digital Certificates">
              <el-input v-model="formInline.digitalCertificates"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Status">
              <el-input v-model="formInline.status"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="form-button">
          <el-button @click="cancel()">Cancel</el-button>
          <el-button type="primary" @click="saveForm()">Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Request from "@/common/net/request.js";
// import Tab from "@/components/Tab/tabIncome.vue";
// const request = new Request();
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      formInline: {},
    };
  },
  //   computed: {
  //     //计算属性
  //     example: "",
  //     mainTabs: {
  //       get() {
  //         return this.$store.state.common.mainTabs;
  //       },
  //       set(val) {
  //         this.$store.commit("common/updateMainTabs", val);
  //       },
  //     },
  //   },
  watch: {
    //观察
    //   $route: "routeHandle",
    //   keywordSearch: {
    //     handler(nv) {},
    //   },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    cancel() {},
    saveForm() {},
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.test {
  width: 100%;
  height: 100%;
  display: flex;
  .princict-tree {
    width: 200px;
    height: 100%;
    border-right: 1px solid #d4d4d7;
    padding: 10px;
    .filter {
      //   width: 90%;
    }
  }
  .content {
    flex: 1;
    // border: 1px solid red;
    padding: 30px 20px;
    .form-button {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
  }
}
</style>
