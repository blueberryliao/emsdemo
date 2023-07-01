<template>
  <div class="authority">
    <div class="top">
      <div class="card">
        <div class="card-title"></div>
        <div class="card-box">
          <div v-for="(item, index) in systemUserRoles" :key="index">
            <div @click="getMenu(item, $event)">{{ item.roleName }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title"></div>
        <div class="card-box"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="card">
        <div class="card-title"></div>
        <div class="card-box">
          <div v-for="(item, index) in systemUserRoles" :key="index">
            <div @click="getMenu(item, $event)">{{ item.roleName }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title"></div>
        <div class="card-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleList, getMenu } from "@/api/user";
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
      equipmentUserRoles: [],
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
  //   watch: {
  //     //观察
  //     $route: "routeHandle",
  //     keywordSearch: {
  //       handler(nv) {},
  //     },
  //   },
  methods: {
    getRoleList() {
      getRoleList({
        roleType: 1,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.systemUserRoles = res.rows;
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
    getMenu(item, $event) {
      console.log("item", item);
      console.log("$event", $event);
      let roleId = item.roleId;
      console.log("roldId", roleId);
      getMenu(roleId).then((res) => {
        console.log("res", res);
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
  padding-left: 100px;
  padding-top: 40px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  .top {
    border-bottom: 1px solid black;
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
    width: 300px;
    height: 400px;
    border: 1px solid black;
    margin-right: 250px;
  }
}
</style>
