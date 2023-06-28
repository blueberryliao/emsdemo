<template>
  <div class="card_component">
    <div v-if="dataInfo.infoType == 0">
      <div class="card_component_one">
        <div v-for="i in 4" :key="i" class="one_Dialog">
          <div v-for="(item, index) in dealData(dataInfo.data, i)" :key="index">
            <p>{{ item.label + "&nbsp;&nbsp;" + item.value }}</p>
          </div>
        </div>

        <button>{{ dataInfo.year }}年</button>
      </div>
      <div class="summary">
        <div v-for="(item, index) in dealDataT(dataInfo.data)" :key="index" class="one_Dialog">
          <p>{{ item.label }}&nbsp;&nbsp;</p>
          <p>{{ item.value }}</p>
        </div>
      </div>
    </div>
    <div v-if="dataInfo.infoType == 1">
      <div class="card_component_one">
        <div v-for="i in 5" :key="i" class="one_Dialog card_two">
          <div
            v-for="(item, index) in dealDataTwo(dataInfo.data, i)"
            :key="index"
          >
            <p>{{ item.label + "&nbsp;&nbsp;" }}</p>
            <p>{{ item.value }}</p>
          </div>
        </div>

        <button>{{ dataInfo.year }}年</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card_component",
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {
          // data: [
          //   {
          //     label: "分配任务数",
          //     value: 5,
          //   },
          //   {
          //     label: "完成任务数",
          //     value: 4,
          //   },
          //   {
          //     label: "完成任务率",
          //     value: "80%",
          //   },
          //   {
          //     label: "分配任务分值",
          //     value: 25,
          //   },
          //   {
          //     label: "完成任务分值",
          //     value: 5,
          //   },
          //   {
          //     label: "分值完成率",
          //     value: "80%",
          //   },
          //   {
          //     label: "按时完成任务数",
          //     value: 5,
          //   },
          //   {
          //     label: "按时完成分值",
          //     value: 5,
          //   },
          //   {
          //     label: "按时完成率",
          //     value: 5,
          //   },
          //   {
          //     label: "提交次数",
          //     value: 5,
          //   },
          //   {
          //     label: "退回次数",
          //     value: 5,
          //   },
          //   {
          //     label: "提交通过率",
          //     value: 5,
          //   },
          //   {
          //     label: "本年参考得分",
          //     value: 5,
          //   },
          //   {
          //     label: "本年得分",
          //     value: 5,
          //   },
          //   {
          //     label: "本年排名",
          //     value: 5,
          //   },
          // ],
          // infoType: 0,
          // year: 2021,
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    dealData(v, i) {
      return v.slice((i - 1) * 3, (i - 1) * 3 + 3);
    },
    dealDataT(v) {
      return v.slice(12, 16);
    },
    dealDataTwo(v, i) {
      if (i == 3) {
        return v.slice((i - 1) * 3, (i - 1) * 3 + 2);
      } else if (i == 4) {
        return v.slice((i - 2) * 3 + 2, (i - 1) * 3 + 1);
      } else if (i == 5) {
        return v.slice((i - 2) * 3 + 1, (i - 1) * 3 + 1);
      } else {
        return v.slice((i - 1) * 3, (i - 1) * 3 + 3);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card_component {
  background-color: #fff;
  width: 100%;
  height: 100%;
  font-size: 0.14rem;
  padding-top: 0.4rem;
  .card_component_one {
    width: 100%;
    display: flex;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    .one_Dialog {
      border-right: 1px dotted #0090ff;
      flex: 1;
      margin-right: 0.4rem;
      padding-bottom: 0.2rem;
      div {
        padding-top: 0.2rem;
        color: #000000;
        p {
          display: inline-block;
        }
      }
    }
    .one_Dialog:last-of-type {
      border-right: none;
      margin-right: 0;
      padding-bottom: 0;
      p{
          text-align: center;
        //  margin-left: -0.2rem;
      }
    }
    button {
      position: absolute;
      top: -0.28rem;
      left: 0;
      padding: 0 0.1rem;
      height: 0.28rem;
      background: linear-gradient(180deg, #4bcbeb 0%, #0090ff 100%);
      color: #fff;
      border: none;
    }
  }
  .summary {
    border-bottom: 1px solid #dfdfdf;
    display: flex;
    div {
      height: 0.66rem;
      line-height: 0.66rem;
      flex: 1;
      border-right: 1px solid #dfdfdf;
      text-align: left;
      margin-right: 0.4rem;
      p {
        display: inline-block;
        color: #000000;
      }
    }
 
    div:first-of-type {
      text-align: left;
    }
    div:last-of-type {
      display: flex;
      flex-direction: column-reverse;
      border-right: none;
      margin-right: 0;
      p {
        display: block;
        height: 0.33rem;
        line-height: 0.33rem;
      }
      p:last-of-type {
        background-image: linear-gradient(180deg, #eba04b 0%, #d1080a 100%);
        background-clip: text;
        color: transparent;
        font-size: 0.2rem;
        font-weight: 800;
        font-family: "YOUSHEBIAOTIHEI";
      }
    }
  }
  .card_two:last-of-type,
  .card_three:last-of-type {
    div:last-of-type {
      display: flex;
      flex-direction: column-reverse;
      border-right: none;
      p {
        display: block;
        height: 0.33rem;
        line-height: 0.33rem;
      }
      p:last-of-type {
        background-image: linear-gradient(180deg, #eba04b 0%, #d1080a 100%);
        background-clip: text;
        color: transparent;
        font-size: 0.2rem;
        font-weight: 800;
        font-family: "YOUSHEBIAOTIHEI";
      }
    }
  }
}
</style>