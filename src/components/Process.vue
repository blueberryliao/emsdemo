<!-- @format -->
<template>
  <section :class="'container' + k">
    <div class="progress">
      <span class="active"></span>
    </div>
  </section>
</template>

<script>
export default {
  name: "process",
  props: {
    //百分比 以0-1表示
    percent: {
      type: Number,
      default: 0,
      required: true,
      validator: function (value) {
        return value >= 0 && value <= 1;
      },
    },
    k: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  watch: {
    percent: {
      handler(v) {
        let str = ".container" + this.k;
        if (this.percentages) {
          document
            .querySelector(str)
            .style.setProperty("--percentage", this.percentages);
        }
      },
    },
  },

  methods: {},
  computed: {
    percentages: function () {
      if (this.percent > 1 || this.pecent < 0) {
        return console.log("父组件传给Process组件的百分比不正确");
      } else {
        return this.percent * 100 + "%";
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      let str = ".container" + this.k;
      if (this.percentages) {
        // let per = `$(this.percent)%`;
        document
          .querySelector(str)
          .style.setProperty("--percentage", this.percentages);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
// $percent: 0;

.container {
  // margin: 0.2rem auto;
  width: 100%;
}
.container > div {
  // margin-bottom: 20px;
}

.progress {
  height: 14px;
  background: #fff;
  border: #0090ff 1px solid;
  border-radius: 10px;
}
.progress > span {
  position: relative;
  float: left;
  margin: 0 -1px;
  height: 14px;
  text-align: right;
  border-radius: 10px;
  background-image: linear-gradient(90deg, #0090ff 0%, #4bcbeb 100%);
}

.active {
  animation: animate-positive 2s;
  width: var(--percentage, 0%);
}
@keyframes animate-positive {
  0% {
    width: 0;
  }
}
</style>
