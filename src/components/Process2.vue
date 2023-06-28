<!-- @format -->
<template>
  <div class="container">
    <div class="bar blue active" data-percent="50"></div>
  </div>
</template>

<script>
export default {
  name: "process",
  props: {
    //百分比 以1-100表示
    percent: {
      type: Number,
      default: 0.6,
    },
    title: {
      type: String,
      default: "债务率",
    },
    hasText: {
      //是否显示文字，还是只显示bar
      type: Boolean,
      default: true,
    },
    isPanorama: {
      //是否是全景图
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},

  methods: {},
  created() {},
  mounted() {},
  computed: {
    percentages: function () {
      return this.percent * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
$max-bar-width: 600px;
$breakpoint-smartphone: 350px;
$time: 12s;
$easing: ease-in-out;
$color: #0292ff;

// GRADIENT MIXIN
// @mixin bg($color){
//   background-color: $color;
//   background-image: repeating-linear-gradient(-45deg, $color, $color ($max-bar-width/20), lighten($color, 10%) ($max-bar-width/20), lighten($color, 10%) ($max-bar-width/10));
//   background-size: $max-bar-width 100%;
//   animation: barberpole $time linear infinite
// }

*,
*:before,
*:after {
  box-sizing: border-box;
}

.container {
  margin: 0.2rem auto;
  max-width: $max-bar-width;
}

.bar {
  height: 60px;
  width: 0;
  transition: width 1.2s ease-in-out;
  position: relative;
  //   margin: 0.5rem 0;
  //   border-radius: 4px;
}
.bar.blue {
  background-color: #0292ff;
  background-image: repeating-linear-gradient(
    -45deg,
    #0292ff,
    #0292ff ($max-bar-width/20),
    lighten($color, 10%) ($max-bar-width/20),
    lighten($color, 10%) ($max-bar-width/10)
  );
  background-size: $max-bar-width 100%;
  animation: barberpole 12s linear infinite;
  border: 2px solid #0292ff;
}

@keyframes barberpole {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: $max-bar-width 0%;
  }
}

@for $i from 1 through 20 {
  .bar.active[data-percent="#{$i*5}"] {
    width: $i * 5%;
  }
}
</style>
