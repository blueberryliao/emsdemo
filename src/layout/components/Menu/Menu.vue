<!-- @format -->
<template>
  <div id="customMenu">
    <div class="navBox">
      <ul ref="menus">
        <li v-for="(menu, i) in menuList" :key="i" v-limitUser="menu.limit">
          <h2
            class="obtain"
            :data-url="menu.path"
            :data-children="menu.children ? 1 : 0"
          >
            <span class="item-icon">
              <category-management
                v-if="menu.name == '任务管理'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <List
                v-if="menu.name == '任务统计'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <Star
                v-if="menu.name == '绩效评价'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <Star
                v-if="menu.name == '支部绩效'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <Star
                v-if="menu.name == '处室绩效'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <Star
                v-if="menu.name == '我的绩效'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <Comment
                v-if="menu.name == '消息中心'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <mac-finder
                v-if="menu.name == '账号管理'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <Me
                v-if="menu.name == '角色权限'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <setting-two
                v-if="menu.name == '个人设置'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <check-one
                v-if="menu.name == '系统设置'"
                theme="outline"
                size=".23rem"
                fill="#fff"
              />
              <connection-box
                theme="outline"
                size=".23rem"
                fill="#fff"
                v-if="menu.name == '任务类别'"
              />
            </span>
            {{ menu.name }}
            <span
              v-if="noReadingCount !== 0 && menu.name == '消息中心'"
              class="no-reading-count"
              >{{ noReadingCount }}</span
            >
            <i v-if="menu.children"></i>
          </h2>
          <div class="secondary">
            <section
              v-for="(sitem, si) in menu.children"
              :key="si"
              v-limitUser="sitem.limit"
            >
              <h3 :data-url="sitem.path">
                <span class="seconFocus"></span>
                {{ sitem.name }}
              </h3>
            </section>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  List,
  CategoryManagement,
  Star,
  Comment,
  MacFinder,
  Me,
  SettingTwo,
  CheckOne,
  ConnectionBox,
} from "@icon-park/vue";
import PubSub from "pubsub-js";
import Request from "@/common/net/request.js";
const request = new Request();
export default {
  name: "customMenu",
  components: {
    List,
    CategoryManagement,
    Star,
    Comment,
    MacFinder,
    Me,
    SettingTwo,
    CheckOne,
    ConnectionBox,
  },
  props: ["menuList"],
  data() {
    return {
      flag: true,
      liC: [], //所有的一级节点
      sec: null, //点击的li下一个兄弟
      sib: [], //li除了自己以外的其他亲兄弟元素
      otherArr: [], //其他所有的二级菜单
      arrowClass: [], //其他所有的箭头
      currentPath: "",
      currentNode: null,
      h2Node: {}, //当前点击的h2节点
      h3Node: {}, //当前点击的h3节点
      noReadingCount: 0,
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        /**
         * 顶部进度条动画
         **/

        let search = newVal.fullPath.split("?");
        search = search.length > 1 ? search[1] : "";
        const progressEle = document.querySelector("#progress .bar");
        progressEle.style.opacity = 1;
        progressEle.style.width = "100%";

        setTimeout(() => {
          progressEle.style.opacity = 0;
          progressEle.style.width = "0%";
        }, 2000);

        //解决从消息中心跳转到任务管理时，对应菜单高亮
        const { path: newPath } = newVal;
        const isTaskManage =
          newPath.includes("OfficeManage") ||
          newPath.includes("AdminTaskManage") ||
          newPath.includes("PersonManage") ||
          newPath.includes("taskManage");
        if (oldVal && oldVal.path.includes("MessageCenter") && isTaskManage) {
          //只模拟高亮，不做点击，点击则会重写url
          const eleOld = this.getElementByAttr("h2", "data-url", oldVal.path);
          eleOld.removeAttribute("class", "obFocus");
          const eleNew = this.getElementByAttr("h2", "data-url", newVal.path);
          eleNew.className = "obFocus";
        } else {
          //当前页面刷新时对应菜单高亮不丢失
          //TODO 二级菜单高亮及展开丢失
          setTimeout(() => {
            const ele = this.getElementByAttr("h2", "data-url", newVal.path);
            ele.className = "obFocus";
          }, 100);
        }
      },
      immediate: true,
    },
  },

  methods: {
    async init() {
      let that = this;
      that.liC = document.querySelectorAll(".navBox li h2");
      let date = new Date();
      let year = date.getFullYear();
      const res = await this.getNewMessageCount(
        this.$store.state.selectYear || year
      );
      if (res.code == 200) {
        this.noReadingCount = +res.data;
      }
      console.log({ res });
      // 主导航nav点击事件
      for (var i = 0; i < that.liC.length; i++) {
        that.liC[i].onclick = function () {
          if (that.flag) {
            // 节流阀
            that.flag = false;
            setTimeout(function () {
              that.flag = true;
            }, 500);

            // 自点
            if (this.className === "obFocus") {
              this.querySelector("i").classList.remove("arrowRot");
              that.getNext(this).style.height = "0";
              this.classList.add("obtain");
              this.classList.remove("obFocus");
              return;
            }
            that.sec = that.getNext(this); //li下一个兄弟
            that.sib = that.siblings(that.sec.parentNode); //li除了自己以外的其他亲兄弟元素
            that.otherArr = []; //其他所有的二级菜单
            that.arrowClass = []; //其他所有的箭头

            // 排他 secondary arrowRot obFocus
            for (let j = 0; j < that.sib.length; j++) {
              var sibSec = that.sib[j].getElementsByTagName("*");
              for (let i = 0; i < sibSec.length; i++) {
                if (sibSec[i].className == "secondary") {
                  that.otherArr.push(sibSec[i]); //存其他所有的secondary
                }
                if (sibSec[i].className == "arrowRot") {
                  that.arrowClass.push(sibSec[i]); //存其他所有的箭头
                }
                if (sibSec[i].className == "obFocus") {
                  sibSec[i].classList.remove("obFocus");
                  sibSec[i].classList.add("obtain");
                }
              }
            }
            for (let i = 0; i < that.otherArr.length; i++) {
              that.otherArr[i].style.height = "0";
            }
            if (that.arrowClass[0]) {
              that.arrowClass[0].classList.remove("arrowRot");
            }

            // 留自己
            that.sec.style.height = that.sec.children.length * 0.4 + "rem";
            if (this.getElementsByTagName("i").length > 0) {
              this.getElementsByTagName("i")[0].classList.add("arrowRot");
            }
            this.classList.remove("obtain");
            this.classList.add("obFocus");
            //点击二级菜单，则对应三级菜单focus状态取消
            const seconC = document.querySelectorAll(".secondary h3");
            for (let i = 0; i < seconC.length; i++) {
              seconC[i].classList.remove("seconFocus");
            }

            //跳转
            if (this.getAttribute("data-children") == 0)
              that.$router.push({
                path: this.getAttribute("data-url"),
              });
          }
        };
      }

      // 子导航点击事件
      var seconC = document.querySelectorAll(".secondary h3");
      console.log(seconC);
      for (var i = 0; i < seconC.length; i++) {
        seconC[i].onclick = function () {
          for (var i = 0; i < seconC.length; i++) {
            seconC[i].classList.remove("seconFocus");
          }
          this.classList.add("seconFocus");
          //跳转
          // console.log(this.getAttribute("data-url"));
          that.$router.push({ path: this.getAttribute("data-url") });
        };
      }
    },

    getByClass(clsName, parent) {
      var oParent = parent ? document.getElementById(parent) : document,
        boxArr = new Array(),
        oElements = oParent.getElementsByTagName("*");
      for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
          boxArr.push(oElements[i]);
        }
      }
      return boxArr;
    },
    // 获取下一个兄弟元素
    getNext(node) {
      if (!node.nextSibling) return null;
      var nextNode = node.nextSibling;
      if (nextNode.nodeType == 1) {
        return nextNode;
      }
      return this.getNext(node.nextSibling);
    },

    // 获取除了自己以外的其他亲兄弟元素
    siblings(elem) {
      var r = [];
      var n = elem.parentNode.firstChild;
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          r.push(n);
        }
      }
      return r;
    },

    //获取某个属性的节点
    getElementByAttr(tag, attr, value) {
      var aElements = document.getElementsByTagName(tag);
      var aEle = {};
      for (var i = 0; i < aElements.length; i++) {
        if (aElements[i].getAttribute(attr) == value) aEle = aElements[i];
      }
      return aEle;
    },
    getNewMessageCount(year) {
      let url = `/message/getNoReadMessageCountNum/${year}`;
      // let url = `/message/getNoReadMessageCountNum`;
      return request.send({
        url,
        method: "get",
      });
    },

    //模拟点击
    imitateClick() {
      let newVal = this.$route.path;
      //如果是一级节点，直接点击
      this.h2Node = this.getElementByAttr("h2", "data-url", newVal);
      if (this.h2Node.nodeType) this.h2Node.click();
      //如果是二级节点，先找到其上级h2节点 即祖父的哥哥节点
      this.h3Node = this.getElementByAttr("h3", "data-url", newVal);
      let grandparentPreSibling =
        this.h3Node.parentNode.parentNode.parentNode.children[0];
      if (this.h3Node.nodeType) {
        //此时应该点击h2然后点击h3
        //模拟点击父级h2
        this.sec = this.getNext(grandparentPreSibling); //h2下一个兄弟
        this.sib = this.siblings(grandparentPreSibling.parentNode); //li除了自己以外的其他亲兄弟元素
        this.otherArr = []; //其他所有的二级菜单
        this.arrowClass = []; //其他所有的箭头
        // 排他 secondary arrowRot obFocus
        for (let j = 0; j < this.sib.length; j++) {
          var sibSec = this.sib[j].getElementsByTagName("*");
          for (let i = 0; i < sibSec.length; i++) {
            if (sibSec[i].className == "secondary") {
              this.otherArr.push(sibSec[i]); //存其他所有的secondary
            }
            if (sibSec[i].className == "arrowRot") {
              this.arrowClass.push(sibSec[i]); //存其他所有的箭头
            }
            if (sibSec[i].className == "obFocus") {
              sibSec[i].classList.remove("obFocus");
              sibSec[i].classList.add("obtain");
            }
          }
        }
        //其他一级菜单的高度为0
        for (let i = 0; i < this.otherArr.length; i++) {
          this.otherArr[i].style.height = "0";
        }
        if (this.arrowClass[0]) {
          this.arrowClass[0].classList.remove("arrowRot");
        }
        // 留自己
        this.sec.style.height = this.sec.children.length * 0.4 + "rem";
        if (grandparentPreSibling.getElementsByTagName("i").length > 0) {
          grandparentPreSibling
            .getElementsByTagName("i")[0]
            .classList.add("arrowRot");
        }
        grandparentPreSibling.classList.remove("obtain");
        grandparentPreSibling.classList.add("obFocus");
        //点击本级h3
        this.h3Node.click();
      }
    },
  },
  computed: {},
  beforeMount() {
    console.log("进入新的menu", this.menuList);
  },
  mounted() {
    this.currentPath = this.$route.fullPath;
    this.$nextTick(() => {
      // this.init();
      //匹配当前的路径，模拟点击命中菜单
      let that = this;
      // window.addEventListener(
      //   "popstate",
      //   function (e) {
      //     // alert("我监听到了浏览器的返回前进按钮事件啦");
      //     that.imitateClick();
      //   },
      //   false
      // );
    });
    // PubSub.subscribe("menuMessageRefresh", async () => {
    //   console.log("in menuMessageRefresh");
    //   const res = await this.getNewMessageCount();
    //   if (res.code == 200) {
    //     this.noReadingCount = +res.data;
    //   }
    // });
  },
};
</script>

<style lang="scss" scoped>
#customMenu {
  box-sizing: border-box;
  overflow-y: auto;
  // height: 70%;
  height: 65%;
  float: left;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .navH span .obscure {
    box-sizing: border-box;
    width: 2rem;
  }
  .navBox {
    box-sizing: border-box;
    width: 2rem;
    // height: 100%;
    height: 85%;
    overflow-y: auto;
    padding-left: 0.05rem;
    padding-right: 0.07rem;
    margin-top: 0.1rem;
    ul li {
      box-sizing: border-box;
      cursor: pointer;
      margin-bottom: 0.1rem;
      position: relative;
      .obtain {
      }
      .obtain:hover::after {
        content: "";
        position: absolute;
        width: 1.18rem;
        height: 0.18rem;
        opacity: 0.6;
        filter: blur(6px);
        background-color: #35b7cb;
        left: 50%;
        transform: translateX(-50%);
        bottom: -0.09rem;
        border-radius: 50%;
        z-index: 1;
      }
      .obFocus {
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.15);
        /* Note: currently only Safari supports backdrop-filter */
        // filter: blur(2px);
        font-weight: 900;
        backdrop-filter: blur(2px);
        --webkit-backdrop-filter: blur(2px);
      }
      .obFocus::before {
        content: "";
        position: absolute;
        width: 1.4rem;
        height: 0.47rem;
        transform: translateX(-50%);
        left: 50%;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 10px 10px 0 0;
        z-index: 0;
        filter: blur(2px);
      }
      .obFocus::after {
        content: "";
        position: absolute;
        width: 1.18rem;
        height: 0.18rem;
        opacity: 0.6;
        filter: blur(6px);
        background-color: #35b7cb;
        left: 50%;
        transform: translateX(-50%);
        bottom: -0.09rem;
        border-radius: 50%;
        z-index: 1;
      }
      h2 {
        box-sizing: border-box;
        position: relative;
        width: 1.56rem;
        height: 0.59rem;
        margin: 0 auto;
        line-height: 0.59rem;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
        border-radius: 10px;
        -webkit-transition: all 0.6s ease;
        -moz-transition: all 0.6s ease;
        -o-transition: all 0.6s ease;
        -ms-transition: all 0.6s ease;
        i {
          box-sizing: border-box;
          position: absolute;
          top: 50%;
          right: 0.15rem;
          border-top: 0.07rem transparent dashed;
          border-left: 0.07rem solid #fff;
          border-right: 0.07rem transparent dashed;
          border-bottom: 0.07rem transparent dashed;
          display: inline-block;
          -webkit-transition: -webkit-transform 0.6s ease;
          -moz-transition: -moz-transform 0.6s ease;
          -o-transition: -o-transform 0.6s ease;
          -ms-transition: -ms-transform 0.6s ease;
          transform-origin: 4px 3px;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
        }
        .arrowRot {
          box-sizing: border-box;
          -webkit-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          transform: rotate(90deg);
        }
      }
      h2:hover {
        // background: transparent;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.15);
        /* Note: currently only Safari supports backdrop-filter */
        backdrop-filter: blur(2px);
        --webkit-backdrop-filter: blur(2px);
      }
      .secondary {
        box-sizing: border-box;
        height: 0;
        width: 1.4rem;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
        margin: 0 auto;
        -webkit-transition: all 0.6s ease;
        -moz-transition: all 0.6s ease;
        -o-transition: all 0.6s ease;
        -ms-transition: all 0.6s ease;
        h3 {
          box-sizing: border-box;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          font-size: 0.14rem;
          color: #ffffff;
          background: transparent;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          /* Note: currently only Safari supports backdrop-filter */
          backdrop-filter: blur(2px);
          --webkit-backdrop-filter: blur(2px);
          background-color: rgba(255, 255, 255, 0.15);
          // -webkit-transition: all 0.4s ease;
          // -moz-transition: all 0.4s ease;
          // -o-transition: all 0.4s ease;
          // -ms-transition: all 0.4s ease;
        }
        h3:hover {
          background-color: rgba(255, 255, 255, 0.2);
          background-image: url("~@/assets/icon/subMenuIcon.png");
          background-repeat: no-repeat;
          background-position: 0.05rem center;
        }
        .seconFocus {
          background-image: url("~@/assets/icon/subMenuIcon.png");
          background-repeat: no-repeat;
          background-position: 0.05rem center;
        }
      }
    }
  }
}

.item-icon {
  position: absolute;
  left: 0.1rem;
  top: 55%;
  transform: translateY(-50%);

  svg {
    width: 0.26rem;
    height: 0.26rem;
  }
}

.no-reading-count {
  position: absolute;
  right: 0.02rem;
  top: 0.09rem;
  background: #d1080a;
  height: 0.2rem;
  width: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.13rem;
  border-radius: 0.1rem;
}
</style>
