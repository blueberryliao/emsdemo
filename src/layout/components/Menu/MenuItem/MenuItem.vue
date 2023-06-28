<template>
  <!-- <div
    class="menu-item"
  > -->
  <div
    class="menu-item"
    @mouseenter="showSub"
    @mouseleave="closeSub"
  >
    <div
      v-if="!isSub"
      class="menu-item-title"
      :class="{'has-children': menu.children && Array.isArray (menu.children) && menu.children.length > 0}"
    >
      <div class="left" @click.stop="push (menu)">
        <div v-if="!menu.meta.icon" class="icon"></div>
        <div v-else-if="menu.meta.icon == ' '"  class="icon"></div>
        <div v-else :style="`background-image:url('${menu.meta.icon.trim()}')`" class="icon"></div>
        <span>{{ menu.meta.title }}</span>
      </div>
      <div class="right">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="sub-menu" :style="style" ref="subMenu" v-if="menu.children && Array.isArray (menu.children) && menu.children.length > 0">
        <div class="left">
          <div
            class="icon"
            :style="iconStyle"
          ></div>
        </div>
        <div class="right">
          <Menu :isSub="true" v-for="(v, i) in menu.children" :key="i" :menu="v" />
        </div>
      </div>
    </div>
    <div
      v-else-if="menu.meta.isOpenNewTab"
      class="sub-menu-item-title"
      @click.stop="open (menu.path)"
    >
      {{ menu.meta.title }}
    </div>
    <router-link
      v-else
      class="sub-menu-item-title"
      :to="menu.meta.menuCode?menu.path+'?menuCode='+menu.meta.menuCode+'&title='+menu.meta.title:menu.path || new Date ().getTime ()"
    >
      {{ menu.meta.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    menu: {
      
    }, 
    offsetX: {}, 
    offsetY: {}, 
    isSub: {
      default () {
        return false; 
      }
    }
  },
  data () {
    return {
      style: {
      }, 
      iconStyle: {
      }
    }
  }, 
  methods: {
    calcPosition () {
      this.style = {}; 
      this.iconStyle = {}; 
      const { x, y, top, bottom, width, height, left, right } = this.$el.getBoundingClientRect (); 
      this.style.left = this.offsetX ? x + width + this.offsetX + 'px' : x + width + 'px'
      this.calcPositionY ({
        y, top, bottom, height
      }); 
    }, 
    calcPositionY (p_posotion) {
      const { top, bottom, height } = p_posotion; 
      const subMenuHeight = this.$refs.subMenu.clientHeight; 
      if (subMenuHeight + top < document.body.offsetHeight) {
        this.style.top = top + 'px';
        this.iconStyle.top =  height/2 + 'px'; 
        this.iconStyle.transform =  'translateY(-50%)'; 
      } else {
        this.style.bottom = document.body.offsetHeight - bottom + 'px'; 
        this.iconStyle.bottom = height/2 + 'px'; 
        this.iconStyle.transform =  'translateY(50%)'; 
      }

    }, 
    showSub () {
      if (this.$refs.subMenu) {
        this.calcPosition (); 
        this.style.width = 'auto'; 
      }
    }, 
    closeSub () {
      if (this.$refs.subMenu) {
        this.style = {}; 
        this.style.width = '0px'; 
      }
    }, 
    open (url) {
      const NOWUSER = JSON.parse(window.sessionStorage.getItem('TOKEN'))  
      if(url.indexOf("?")==-1){   //url后面没有参数  ？+参数
        window.open (`${url}?auth=${NOWUSER}`); 
      }else{
        window.open (`${url}&auth=${NOWUSER}`); 
      }
    }, 
    push (menu) {
      if (this.$route.path === menu.path || this.$route.path === menu.children[0].path) return; 
      if (menu.children && Array.isArray (menu.children) && menu.children.length > 0)
        return this.$router.push (menu.children[0].path); 
      this.$router.push (menu.path)
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 2.34rem;
  height: .55rem;
  font-size: .18rem;
  text-decoration: none;
  color: #fff;
  padding-left: .2rem;
  padding-right: .1rem;
  border-radius: 5px;
  position: relative;
  &:hover {
    background-color: #649bf6;
    /* & > .sub-menu {
        ::v-deep .wrap  {
          & > .left {
            &::after  {
              content: ''; 
              position: absolute;
              background-image: url("~assets/image/layout/left-arrow.png");
              background-position: center;
              background-size: contain;
              height: 9rem;
              width: 10rem;
              left: 33rem; 
              background-repeat: no-repeat;
              top: 50%; 
              transform: translateY(-50%);
            }
          }
        }
      } */
  }
  &.has-children {
    &:hover {
      &::after {
        content: "";
        position: absolute;
        background-image: url("~@/assets/image/layout/left-arrow.png");
        background-position: center;
        background-size: contain;
        height: 0.09rem;
        width: .1rem;
        right: -.27rem;
        background-repeat: no-repeat;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  & > .left {
    display: flex;
    align-items: center;
    & > .icon {
      height: .16rem;
      width: .16rem;
      background-image: url("~@/assets/image/icon/yuanData.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      margin-right: .18rem;
    }
  }
}
.sub-menu {
  position: fixed;
  display: flex;
  width: 0;
  overflow: hidden;
  z-index: 3000;
  & > .left {
    width: .25rem;
    position: relative;
    & > .icon {
      position: absolute;
      background-image: url("~@/assets/image/layout/left-arrow.png");
      background-position: center;
      background-size: contain;
      height: 0.09rem;
      width: .1rem;
      right: -0.02rem; 
      background-repeat: no-repeat;
      transform: translateY(-50%);
    }
  }
  & > .right {
    &::-webkit-scrollbar {
    /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: #649bf6;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
    overflow: auto;
    box-sizing: border-box;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    border-radius: 0.05rem;
    background-color: #3e82f3;
    position: relative;
  }
}
.sub-menu-item-title {
  text-align: center;
  line-height: 1.5;
  width: 1.6rem;
  height: .55rem;
  box-sizing: border-box;
  padding: 0.05rem .1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: .55rem;
  font-size: .16rem;
  text-decoration: none;
  border-radius: 5px;
  position: relative;
  color: #fff; 
  cursor: pointer;
  &:hover {
    background-color: #649BF6;
  }
}
</style>