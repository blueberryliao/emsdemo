<template>
  <div class="add-equipment">
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
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
    <div class="content">
      <el-form
        :inline="true"
        :model="formInline"
        :rules="rules"
        ref="ruleForm"
        class="demo-form-inline"
        label-width="150px"
      >
        <div class="top">
          <div class="title-box">
            <div class="title">Basic Information</div>
            <div class="op">
              scan the bar code on the device to quickly input information
              <i class="el-icon-full-screen"></i>
            </div>
          </div>

          <el-row>
            <el-col :span="12">
              <el-form-item label="Device Type" prop="deviceType">
                <el-select v-model="formInline.deviceType" style="width: 300px">
                  <el-option
                    v-for="item in deviceTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Device Id" prop="deviceId">
                <el-input
                  v-model="formInline.deviceId"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Use" prop="use">
                <el-select v-model="formInline.use" style="width: 300px">
                  <el-option
                    v-for="item in useOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Ballot Type" prop="ballotType">
                <el-select v-model="formInline.ballotType" style="width: 300px">
                  <el-option
                    v-for="item in ballotTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Jurisdiction" prop="jurisdiction">
                <el-input
                  v-model="formInline.jurisdiction"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Location" prop="location">
                <el-input
                  v-model="formInline.location"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="middle">
          <div class="title-box">
            <div class="title">
              Authorized User
              <el-popover placement="right" width="400" trigger="click">
                <el-checkbox-group
                  v-model="selectedUserList"
                  @change="handleCheckedUsersChange()"
                >
                  <div>
                    <el-checkbox
                      v-for="user in users"
                      :label="user.userName"
                      :key="user.userId"
                      >{{ user.userName }}</el-checkbox
                    >
                  </div>
                </el-checkbox-group>
                <i class="el-icon-circle-plus-outline add" slot="reference"></i>
              </el-popover>
            </div>

            <div class="op"></div>
          </div>
          <div class="user-list">
            <el-tag
              :key="user"
              v-for="user in selectedUserList"
              closable
              :disable-transitions="false"
              @close="handleClose(user)"
            >
              {{ user }}
            </el-tag>
          </div>
        </div>
        <div class="bottom">
          <div class="title-box">
            <div class="title">Fucntionalities Configuration</div>
            <div class="op"></div>
          </div>
          <div class="extra-info">
            <el-row class="row">
              <el-col :span="6">
                <el-checkbox v-model="checked1"
                  >Vote review in the screen</el-checkbox
                ></el-col
              >
              <el-col :span="12">
                View period
                <!-- <span class="empty-block">**</span>
                s -->
                <input class="empty-block" v-model="input1" />s
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="6">
                <el-checkbox v-model="checked2"
                  >Printing of vote receipt</el-checkbox
                ></el-col
              >
            </el-row>
            <el-row class="row-narrow">
              <el-col :span="6">
                <el-checkbox v-model="checked3"
                  >Ballot security mark detection</el-checkbox
                ></el-col
              >
            </el-row>
            <el-row class="row">
              <el-col :span="5" class="start-space">
                <el-radio v-model="radio" label="1"
                  >Reject Invalid ballot</el-radio
                >
              </el-col>
              <el-col :span="12">
                <el-radio v-model="radio" label="2"
                  >Put invalid ballot in secondary box</el-radio
                >
              </el-col>
            </el-row>
            <el-row class="row-narrow">
              <el-col :span="12">
                <el-checkbox v-model="checked4">Ballot divert</el-checkbox>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="6" class="start-space">
                Main Box
                <el-select v-model="mainBox" style="width: 150px" size="mini">
                  <el-option
                    v-for="item in mainBoxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                Secondary Box
                <el-select
                  v-model="secondarybox"
                  style="width: 150px"
                  size="mini"
                >
                  <el-option
                    v-for="item in secondaryBoxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="6">
                <el-checkbox v-model="checked5"
                  >Vote timeout locking</el-checkbox
                ></el-col
              >
              <el-col :span="12">
                Voting period
                <!-- <span class="empty-block">**</span>
                s -->
                <input class="empty-block" v-model="input2" />s
              </el-col>
            </el-row>
            <el-row class="row"
              >Ballot recognition threshld
              <!-- <span class="empty-block">**</span> % -->
              <input class="empty-block" v-model="input3" />%
            </el-row>
            <el-row class="row">
              <el-col :span="6">
                <el-checkbox v-model="checked6"
                  >Pre-vote before the official vote</el-checkbox
                ></el-col
              >
              <el-col :span="12">
                Votes
                <!-- <span class="empty-block">**</span> -->
                <input class="empty-block" v-model="input4" />
              </el-col>
            </el-row>
          </div>
        </div>

        <el-form-item class="form-button">
          <el-button @click="cancel()">Cancel</el-button>
          <el-button type="primary" @click="saveForm()">Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getGeographyList } from "../../../api/geography.js";
import { getUserList } from "@/api/user";
import { handleTree } from "@/utils/ruoyi";
import { addEquipment, editEquipment } from "../../../api/equipment.js";

export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      isEdit: false,
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "districtName",
      },
      formInline: {
        ballotType: "1",
        deviceType: "VRVM",
        deviceId: "A001",
        jurisdiction: "1 st Precinct; 0001A",
        location: "laboris",
        userId: "110,111",
        use: "Voting",
      },
      rules: {
        deviceType: [
          {
            required: true,
            message: "please choose device type",
            trigger: "change",
          },
        ],
        deviceId: [
          {
            required: true,
            message: "please input device ID",
            trigger: "change",
          },
        ],
        jurisdiction: [
          {
            required: true,
            message: "please click the jurisdiction ",
            trigger: "change",
          },
        ],
      },
      geographyList: [],
      deviceTypeOptions: [
        {
          label: "VRVM",
          value: "VRVM",
        },
        {
          label: "EVM",
          value: "EVM",
        },
        {
          label: "PCOS",
          value: "PCOS",
        },
        {
          label: "CCOS",
          value: "CCOS",
        },
      ],
      useOptions: [
        {
          label: "Registration",
          value: "Registration",
        },
        {
          label: "Verification",
          value: "Verification",
        },
        {
          label: "Voting",
          value: "Voting",
        },
        {
          label: "Counting",
          value: "Counting",
        },
      ],
      ballotTypeOptions: [
        {
          label: "Paper ballot",
          value: "1",
        },
        {
          label: "Enectronic ballot",
          value: "0",
        },
      ],
      users: [],
      selectedUserList: [],
      systemUserAuthorityList: [],
      equipmentUserAuthorityList: [],
      authorityOptions: [],
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: true,
      checked6: false,
      input1: "20",
      input2: "20",
      input3: "20",
      input4: "10",
      radio: "1",
      mainBox: "Overvote",
      mainBoxOptions: [
        { label: "Overvote", value: "Overvote" },
        { label: "Undervote", value: "Undervote" },
        { label: "Misread", value: "Misread" },
        { label: "Rejected", value: "Rejected" },
        { label: "Previously scanned", value: "Previously scanned" },
      ],
      secondarybox: "Undervote",
      secondaryBoxOptions: [
        { label: "Overvote", value: "Overvote" },
        { label: "Undervote", value: "Undervote" },
        { label: "Misread", value: "Misread" },
        { label: "Rejected", value: "Rejected" },
        { label: "Previously scanned", value: "Previously scanned" },
      ],
    };
  },

  methods: {
    getGeographyList() {
      getGeographyList().then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.geographyList = res.data;
          this.treeData = handleTree(this.geographyList);
          console.log("tree", this.treeData);
        }
      });
    },
    //获取当前可选用户
    getUserList() {
      let query = {
        userType: 2,
      };
      getUserList(query).then((res) => {
        if (res.code == 200) {
          console.log("res.rows**", res.rows);
          //如果是新建，默认选中用户为第一个
          this.users = res.rows;
          if (!this.isEdit) this.selectedUserList = [this.users[0].userName];
        }
      });
    },
    handleCheckedUsersChange(val) {
      // console.log("val", val);
    },

    //删除用户的绑定关系
    handleClose(val) {
      // console.log("val", val); //用户名User1
      this.selectedUserList.splice(this.selectedUserList.indexOf(val), 1);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log("data", data);
      this.$set(
        this.formInline,
        "jurisdiction",
        `${data.districtName} , ${data.id}`
      );
    },
    cancel() {
      this.$msgbox
        .confirm(`Are you sure you want to clear form?`, "System Info", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          console.log("this.formInline", this.formInline);
          this.formInline = {};
          this.selectedUserList = [];
        });
    },
    saveForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return this.$message.error(
            "please finish the required form validation"
          );
        }
      });
      //获取选中userId，组合成"userId": "110,111",
      let userId = "";
      this.selectedUserList.map((uName) => {
        this.users.map((user) => {
          if (user.userName == uName) {
            userId += user.userId + ", ";
          }
        });
      });
      this.formInline.userId = userId;
      console.log("this.formInline", this.formInline);

      if (this.isEdit) {
        editEquipment(this.formInline).then((res) => {
          console.log("edit res", res);
          if (res.code == 200) {
            this.$router.push({ path: "/EquipmentManagement" });
          }
        });
      } else {
        addEquipment(this.formInline).then((res) => {
          console.log("add new res", res);
          if (res.code == 200) {
            this.$router.push({ path: "/EquipmentManagement" });
          }
        });
      }
    },
  },
  async created() {
    this.getGeographyList();
    await this.getUserList();
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
      console.log("this.$route", this.$route.query);
      if (this.$route.query.id && this.$route.query.id !== null) {
        this.isEdit = true;
        this.formInline = this.$route.query;
        let { sysUserList } = this.$route.query;
        console.log("sysUserList", sysUserList);
        this.selectedUserList = sysUserList.map((equip) => {
          return equip.userName;
        });
      } else {
        this.isEdit = false;
      }
      console.log("this.isEdit", this.isEdit);
    });
  },
};
</script>

<style lang="scss" scoped>
.add-equipment {
  width: 100%;
  height: 100%;
  display: flex;
  .princict-tree {
    width: 260px;
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
    padding: 20px 40px;

    .top {
      height: 260px;
      // border: #5a9cf8 1px solid;
      padding-bottom: 20px;
    }
    .middle {
      height: 140px;
      // border: #5a9cf8 1px solid;
      padding-bottom: 20px;
      overflow: auto;

      .user-list {
        height: calc(100% - 40px);
        overflow: auto;
      }
      .add {
        color: #409eff;
        cursor: pointer;
      }
      .el-tag + .el-tag {
        margin-left: 30px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
    .bottom {
      height: 420px;
      // border: #5a9cf8 1px solid;
      .extra-info {
        padding: 0 30px;
        .empty-block {
          border: #5a9cf8 1px solid;
          width: 30px;
          height: 25px;
          margin-right: 5px;
        }
        .count {
          height: 15px;
          // width: 30px;
        }
        .row-narrow {
          height: 30px;
        }
        .row {
          height: 42px;
        }
        .start-space {
          margin-left: 30px;
        }
      }
    }
    .title-box {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      // justify-content: space-between;
      .title {
        font-size: 18px;
        font-weight: bold;
        width: 300px;
      }
      .op {
        color: #999;
        cursor: not-allowed;
      }
    }

    .form-button {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .digital {
      font-size: 22px;
      color: #d4d4d7;
      cursor: not-allowed;
    }
    .status-lock {
      font-size: 22px;
      color: #ae3d2e;
      cursor: pointer;
    }
    .status-unlock {
      font-size: 22px;
      color: #5a9cf8;
      cursor: pointer;
    }
  }

  ::v-deep .el-form-item .el-select {
    width: 100%;
  }

  ::v-deep .el-row {
    // margin-bottom: 10px;
  }
  ::v-deep .el-tree-node__content {
    height: 40px;
  }
}
</style>
