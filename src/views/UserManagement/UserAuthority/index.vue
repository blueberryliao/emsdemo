<template>
  <div class="authority">
    <div class="top">
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="card-title">
            <span>{{ roles[0].role }}</span>
          </div>
          <el-menu v-for="item in systemUserRoles" :key="item.roleName">
            <el-menu-item :index="item.roleName" @click="clickUser(item)">
              <i class="el-icon-user"></i>
              <span>{{ item.roleName }}</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="transfer">
        <button
          disabled="disabled"
          type="button"
          class="el-button el-button--primary is-disabled el-transfer__button"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </div>

      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="card-title">
            <span>Funcion</span>
          </div>
          <div>
            <el-checkbox
              :indeterminate="isMenuIndeterminate"
              v-model="menuCheckAll"
              @change="handleCheckAllChange"
              class="checkall"
              >All</el-checkbox
            >
            <el-checkbox-group
              v-model="checkedMenus"
              @change="handleCheckedMenusChange"
            >
              <div v-for="menu in menus" :key="menu.id">
                <el-checkbox :label="menu.label">{{ menu.label }}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </el-card>
      </div>
    </div>
    <div class="bottom">
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="card-title">
            <span>{{ roles[1].role }}</span>
          </div>
          <!-- <div
            v-for="(item, index) in equipmentUserRoles"
            :key="index"
            class="text item"
          >
            {{ item.roleName }}
          </div> -->
          <el-menu v-for="item in equipmentUserRoles" :key="item.roleName">
            <el-menu-item :index="item.roleName">
              <i class="el-icon-user"></i>
              <span>{{ item.roleName }}</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="transfer">
        <button
          disabled="disabled"
          type="button"
          class="el-button el-button--primary is-disabled el-transfer__button"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="card-title">
            <span>Funcion</span>
          </div>
          <div>
            <el-checkbox
              :indeterminate="isEquimentIndeterminate"
              v-model="equipmentCheckAll"
              @change="handlEequipmentCheckAllChange"
              class="checkall"
              >All</el-checkbox
            >
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleList, getAuthority } from "@/api/user";
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      roles: [
        {
          role: "System User",
          roleType: 1,
        },
        {
          role: "Equipment User",
          roleType: 2,
        },
      ],

      systemUserRoles: [],
      menuCheckAll: false,
      checkedMenus: [],
      menus: [],
      isMenuIndeterminate: true,
      equipmentCheckAll: true,
      isEquimentIndeterminate: false,
      equipmentUserRoles: [],
    };
  },

  methods: {
    getRoleList() {
      getRoleList({
        roleType: 1,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.systemUserRoles = res.rows;
          this.clickUser(res.rows[0]);
        }
      });
      getRoleList({
        roleType: 2,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.equipmentUserRoles = res.rows;
        }
      });
    },
    // getMenu(item, $event) {
    //   console.log("item", item);
    //   console.log("$event", $event);
    //   let roleId = item.roleId;
    //   console.log("roldId", roleId);
    //   getMenu(roleId).then((res) => {
    //     console.log("res", res);
    //   });
    // },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isMenuIndeterminate = false;
    },
    handleCheckedMenusChange(value) {
      console.log("value", value);
      let checkedCount = value.length;
      this.menuCheckAll = checkedCount === this.menus.length;
      this.isMenuIndeterminate =
        checkedCount > 0 && checkedCount < this.menus.length;
      //修改绑定的权限
    },
    handlEequipmentCheckAllChange() {},
    clickUser(item) {
      console.log("item", item);
      let roleId = item.roleId;
      console.log("roldId", roleId);
      //获取系统用户权限
      getAuthority(roleId).then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.menus = res.menus;
          this.checkedMenus = res.checkedKeys;
        }
      });
    },
  },
  created() {
    this.getRoleList();
  },
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
.authority {
  // width: 1000px;
  // padding-left: 100px;
  padding: 40px 500px 40px 100px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  .top {
    border-bottom: 1px dashed #d4d4d7;
    display: flex;
    align-items: center;
    // justify-content: space-around;
    padding-bottom: 40px;
    // width: 800px;
  }
  .bottom {
    display: flex;
    align-items: center;
    // justify-content: space-around;
    padding-top: 40px;
  }
  .card {
    margin-right: 70px;
    .card-title {
      font-size: 18px;
      font-weight: 900;
      padding-bottom: 15px;
      // background: #f5f7fa;
    }

    .text {
      font-size: 16px;
    }

    .item {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
    .text:hover {
      background-color: #eef5fe;
    }

    .box-card {
      width: 300px;
      // height: 400px;
    }
    .checkall {
      margin-top: 15px;
    }
  }
  .transfer {
    margin-right: 70px;
  }
  ::v-deep .el-card__header {
    background-color: #f5f7fa;
  }
  ::v-deep .el-card__body {
    padding: 0px;
    height: 320px;
    overflow: auto;
  }
  ::v-deep .el-menu-item {
    height: 45px;
    line-height: 45px;
  }
  ::v-deep .el-checkbox {
    padding-left: 20px;
    line-height: 40px;
  }
}
</style>
