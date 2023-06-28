<!-- @format -->
<template>
  <div :class="{ process: hasText }">
    <div class="title" v-if="hasText">{{ title }}</div>

    <div class="blocks">
      <ul id="loadbar">
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 0 ? 'layerFill1' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 10 ? 'layerFill2' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 20 ? 'layerFill3' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 30 ? 'layerFill4' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 40 ? 'layerFill5' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 50 ? 'layerFill6' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 60 ? 'layerFill7' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 70 ? 'layerFill8' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages > 80 ? 'layerFill9' : '',
            ]"
          ></div>
        </li>
        <li :class="[isPanorama ? 'panoramaBorder' : 'orangeBorder']">
          <div
            :class="[
              isPanorama ? 'panoramaBar' : 'orangeBar',
              percentages == 100 ? 'layerFill10' : '',
            ]"
          ></div>
        </li>
      </ul>
    </div>
    <div class="data" v-if="hasText">{{ percentages }}%</div>
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
.progress {
  /* border: solid 1px salmon; */
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 5rem;
}
.title {
  color: #000000;
  font-size: 0.16rem;
  line-height: 0.27rem;
}

ul#loadbar {
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  display: flex;
  align-items: flex-start;
}
ul#loadbar li {
  margin: 0;
  padding: 0;
  float: left;
  position: relative;
  width: 0.07rem;
  margin-left: 1px;
  margin-right: 0.09rem;
  /* transform: skew(-20deg); */
}
.orangeBorder {
  border: solid 1px #ff4b23;
  height: 0.27rem;
}
.panoramaBorder {
  border: solid 1px #00c9ff;
  height: 0.22rem;
}

ul#loadbar li:first-child {
  margin-left: 0;
}

.orangeBar {
  width: 0.07rem;
  opacity: 0;
  height: 0.27rem;
  background: linear-gradient(180deg, #ffbb36 0%, #ff1b1b 100%);
}

.panoramaBar {
  width: 0.07rem;
  opacity: 0;
  height: 0.22rem;
  background: #00eeff;
}

.layerFill1 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.1s;
}
.layerFill2 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.2s;
}
.layerFill3 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.3s;
}
.layerFill4 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.4s;
}
.layerFill5 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.5s;
}
.layerFill6 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.6s;
}
.layerFill7 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.7s;
}
.layerFill8 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.8s;
}
.layerFill9 {
  animation: fill 0.5s linear forwards;
  animation-delay: 0.9s;
}
.layerFill10 {
  animation: fill 0.5s linear forwards;
  animation-delay: 1s;
}
@keyframes fill {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.data {
  font-size: 0.15rem;
  color: #bd191b;
  line-height: 0.27rem;
}
</style>
