<template>
  <div class="dialog-case">
    <el-dialog
      class="dialog"
      :title="title"
      :top="top"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :before-close="handleClose"
      ref="adialog"
      :close-on-click-modal="closeOnModal"
      :show-close="hasClose"
      :append-to-body="isappendtobody"
    >
      <slot></slot>
      <template slot="title">
        <div
          :style="{
            'font-weight': isBold,
            'font-size': '0.16rem',
            'font-family': '微软雅黑',
          }"
        >
          {{ title }}
        </div>
      </template>
      <span slot="footer" class="dialog-footer" v-if="hasFooter">
        <el-button
          type="primary"
          class="saveBtn"
          v-if="isSubmit"
          @click="submit"
          >{{ submitBtnTxt }}</el-button
        >
        <el-button
          type="primary"
          class="saveBtn"
          :class="isSubmit ? 'isSubmit' : ''"
          @click="save"
          v-if="isSave"
          >{{ saveBtnTxt }}</el-button
        >
        <el-button class="grayBtn" @click="cancel">{{
          cancelBtnTxt
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    //父组件传的显示/隐藏指针
    top: {
      type: String,
      required: false,
      default: "15vh",
    },
    dialogShow: {
      type: Boolean,
      default: true,
    },
    //是否有右上角关闭
    hasClose: {
      type: Boolean,
      default: true,
    },
    //弹窗宽度
    dialogWidth: {
      type: String,
      required: false,
      default: "10rem",
    },
    // //弹框的marginTop
    // dialogTop: {
    //   type: String,
    //   required: false,
    //   default: "15vh",
    // },
    //弹窗标题文字
    title: {
      type: [String, Number],
      required: false,
      default: "标题",
    },
    //标题背景颜色
    titleBgColor: {
      type: String,
      required: false,
      default: "#fff",
    },
    //标题高度
    titleHeight: {
      type: String,
      required: false,
      default: "0.65rem",
    },

    //标题字体大小
    titleFontSize: {
      type: String,
      required: false,
      default: "0.16rem",
    },
    //标题字颜色
    titleColor: {
      type: String,
      required: false,
      default: "#000000",
    },
    //取消按钮的文字
    cancelBtnTxt: {
      type: String,
      required: false,
      default: "取消",
    },
    //确定按钮的文字
    saveBtnTxt: {
      type: String,
      required: false,
      default: "保存",
    },
    // 提交按钮的文字
    submitBtnTxt: {
      type: String,
      required: false,
      default: "提交",
    },
    //是否有footer
    hasFooter: {
      type: Boolean,
      default: true,
    },
    //遮罩层是否插入至了body元素上
    isappendtobody: {
      type: Boolean,
      default: false,
    },
    isSubmit: {
      type: Boolean,
      default: false,
    },
    isBold: {
      type: String,
      default: "none",
    },
    isSave:{
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      closeOnModal: false,
    };
  },
  watch: {},
  methods: {
    closeDialog() {
      // this.$emit("dialogShowChange", false);
    },
    handleClose(done) {
      this.$emit("resetPopupData");
    },
    cancel() {
      this.$emit("resetPopupData");
    },
    save() {
      this.$emit("submitPopupData");
    },
    submit() {
      this.$emit("submitBtnPopupData");
    },
  },
  computed: {
    //本组件的显示/隐藏指针
    dialogVisible: {
      get() {
        return this.dialogShow;
      },
      set(val) {
        // 当dialogVisible改变的时候，触发父组件的 updateVisible方法，更改传入子组件的dialogShow的值
        this.$emit("updateVisible", val);
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (this.titleHeight)
        document
          .querySelector(".dialog")
          .style.setProperty("--titleheight", this.titleHeight);
      if (this.titleBgColor)
        document
          .querySelector(".dialog")
          .style.setProperty("--titlebg", this.titleBgColor);
      if (this.titleFontSize)
        document
          .querySelector(".dialog")
          .style.setProperty("--titlesize", this.titleFontSize);
      if (this.titleColor)
        document
          .querySelector(".dialog")
          .style.setProperty("--titlecolor", this.titleColor);
    });
  },
};
</script>

<style lang="scss">
/*
  .el-dialog__close {
    color: $header_bg;
    font-size: 20px;
    font-weight: bolder;
    position: absolute;
    top: 8px;
    right: 8px;
    &::after {
      content: "";
      border: 2px solid $header_bg;
      width: 20px;
      height: 20px;
      border-radius: 25px;
      position: absolute;
      right: -2px;
      top: -3px;
    }
  }
    */

.dialog-case {
  font-size: 0.12rem;
}

.el-dialog__wrapper {
  .el-dialog {
    // border: 1px solid #e3e3e3;
    border-radius: 8px;
    .el-dialog__header {
      border-radius: 8px 8px 0 0;
      height: var(--titleheight, 0.65rem);
      background-color: var(--titlebg, #fff);
      opacity: 1;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0.2rem;
      border-bottom: 1px solid #dfdfdf;
      & > .el-dialog__title {
        color: var(--titlecolor, #666);
        font-weight: bold;
        font-size: var(--titlesize, 0.16rem);
      }
      & > .el-dialog__headerbtn {
        position: static;
        /* 兼容IE11 ,取消原有的position定位 */
        & > i {
          color: #666;
          font-size: 0.16rem;
          &:hover,
          &:active,
          &:focus {
            color: #666;
          }
        }
      }
    }
    .el-form-item__label {
      font-size: 0.14rem;
    }
    .el-dialog__body {
      padding: 0.2rem;
    }
    .dialog-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #dfdfdf;
      padding-top: 0.2rem;
      .saveBtn {
        padding: 0 0.4rem;
        height: 0.32rem;
        background: #0090ff;
        opacity: 1;
        border-radius: 0.08rem;
      }
      .el-button {
        margin: 0 10px;
        font-size: 0.14rem;
        font-family: "微软雅黑";
        // padding-top: 0rem !important;
        // padding-bottom: 0rem !important;
      }
      /* 确定按钮 */
      .el-button--primary {
        // background-color: var(--primaryColor, #0090FF);
        border: 1px solid var(--primaryColor, #0090ff);
      }
      .el-button--primary:hover {
        box-shadow: 0px 0px 10px rgba(#0090ff, 0.6);
        border-color: #0090ff;
        background-color: #0090ff;
      }
      .grayBtn {
        padding: 0 0.4rem;
        height: 0.32rem;
        background-color: #dddddd;
        color: #999999;
        opacity: 1;
        border-radius: 0.08rem;
      }
      .el-button--default:hover {
        background-color: #ccc;
        color: #999999;
        border-color: #ccc;
        box-shadow: 0px 0px 10px #ccc;
      }
    }
  }
  .isSubmit {
    background-color: white !important;
    color: #0090ff !important;
  }
}
</style>
