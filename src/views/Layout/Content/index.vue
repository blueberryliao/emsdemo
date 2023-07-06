<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      monShow: false,
    };
  },
  methods: {
    getTableYear() {},
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
.content {
  width: 100%;
  .header {
    background-color: #d4d4d7;
    height: 40px;
    width: 100%;
  }
}
</style>
