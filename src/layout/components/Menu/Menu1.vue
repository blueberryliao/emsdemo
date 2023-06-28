<script>
const level2Icon = "require('../../assets/icon/subMenuIcon.png')";
import {
  List,
  CategoryManagement,
  Star,
  Comment,
  MacFinder,
  Me,
  SettingTwo,
  CheckOne,
} from "@icon-park/vue";

export default {
  components: {
    List,
    CategoryManagement,
    Star,
    Comment,
    MacFinder,
    Me,
    SettingTwo,
    CheckOne,
  },
  props: ["menuList"],
  methods: {
    renderMenuItem(menuList, level, currentPath) {
      return menuList.map((menu) => {
        if (
          !!menu.children &&
          Array.isArray(menu.children) &&
          menu.children.length
        ) {
          return (
            <el-submenu class={`menu_level-${level}`} index={menu.path}>
              <template slot="title">
                <div class="sub_menu_title">
                  {menu.name == "任务管理" && (
                    <category-management
                      theme="outline"
                      size="24"
                      fill="#fff"
                    />
                  )}
                  {menu.name == "任务统计" && (
                    <List theme="outline" size="24" fill="#fff" />
                  )}
                  {menu.name == "绩效评价" && (
                    <Star theme="outline" size="24" fill="#fff" />
                  )}
                  {menu.name == "消息中心" && (
                    <Comment theme="outline" size="24" fill="#fff" />
                  )}
                  {menu.name == "账号管理" && (
                    <mac-finder theme="outline" size="24" fill="#fff" />
                  )}
                  {menu.name == "角色权限" && (
                    <Me theme="outline" size="24" fill="#fff" />
                  )}
                  {menu.name == "个人设置" && (
                    <setting-two theme="outline" size="24" fill="#fff" />
                  )}
                  {menu.name == "系统设置" && (
                    <check-one theme="outline" size="24" fill="#fff" />
                  )}
                  {menu.menuLevel === 1 && (
                    <span class="menu-txt-1">{menu.name}</span>
                  )}
                  {menu.menuLevel === 2 && (
                    <span class="menu-txt-2">{menu.name}</span>
                  )}
                </div>
              </template>
              {this.renderMenuItem(menu.children, level + 1, currentPath)}
            </el-submenu>
          );
        }
        return (
          <el-menu-item class={`menu_level-${level}`} index={menu.path}>
            <template slot="title">
              <div class="menu_item_title">
                {menu.name == "任务统计" && (
                  <List theme="outline" size="24" fill="#fff" />
                )}
                {menu.name == "任务管理" && (
                  <category-management theme="outline" size="24" fill="#fff" />
                )}
                {menu.name == "绩效评价" && (
                  <Star theme="outline" size="24" fill="#fff" />
                )}
                {menu.name == "消息中心" && (
                  <Comment theme="outline" size="24" fill="#fff" />
                )}
                {menu.name == "账号管理" && (
                  <mac-finder theme="outline" size="24" fill="#fff" />
                )}
                {menu.name == "角色权限" && (
                  <Me theme="outline" size="24" fill="#fff" />
                )}
                {menu.name == "个人设置" && (
                  <setting-two theme="outline" size="24" fill="#fff" />
                )}
                {menu.name == "系统设置" && (
                  <check-one theme="outline" size="24" fill="#fff" />
                )}
                {menu.menuLevel === 1 && (
                  <span class="menu-txt-1">{menu.name}</span>
                )}
                {menu.menuLevel === 2 && (
                  <div>
                    {menu.path == currentPath ? (
                      <span class="level-2-icon"></span>
                    ) : (
                      ""
                    )}
                    <span class="menu-txt-2">{menu.name}</span>
                  </div>
                )}
              </div>
            </template>
          </el-menu-item>
        );
      });
    },
  },
  render() {
    let currentPath = this.$route.fullPath;
    // console.log(currentPath);
    return (
      <el-menu
        router={true}
        text-color="#fff"
        active-text-color="#fff"
        unique-opened={true}
      >
        {this.renderMenuItem(this.menuList, 1, currentPath)}
      </el-menu>
    );
  },
};
</script>

<style lang="scss" scoped>
@mixin transparent($height, $radius) {
  & {
    background-color: transparent;
    position: relative;
    &::before {
      border-radius: $radius;
      content: "";
      height: $height;
      width: 100%;
      left: 1px;
      top: 1px;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.2);
      filter: blur(1px);
    }
  }
}
.el-menu::v-deep {
  background-color: transparent;
  color: #fff;
  .el-menu--inline {
    background-color: transparent;
    margin-left: 0.08rem;
    margin-right: 0.08rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: none;
    border-radius: 0 0 10px 10px;
    @include transparent(100%, 0);
    &::before {
      border-top: none;
      border-radius: 0 0 10px 10px;
      border-radius: 0 0 10px 10px;
    }
  }
}
.menu_level-1::v-deep {
  padding: 0 !important;
  width: 1.56rem;
  min-height: 0.59rem;
  margin-left: 0.14rem;
  text-align: center;
  border-radius: 10px;
  // font-size: 0.2rem;
  &:hover,
  &.is-opened,
  &.is-active {
    &:not(.el-submenu) {
      @include transparent(0.57rem, 10px);
    }
    .sub_menu_title,
    .menu_item_title {
      position: relative;
      // border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      &::after {
        content: "";
        position: absolute;
        width: 1.18rem;
        height: 0.18rem;
        opacity: 0.6;
        filter: blur(6px);
        background-color: #35b7cb;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        bottom: -0.09rem;
        border-radius: 50%;
        z-index: 1;
      }
    }
  }
  .sub_menu_title,
  .menu_item_title {
    svg {
      margin-right: 0.2rem;
    }
  }

  &.is-opened {
    .el-submenu__title {
      @include transparent(0.57rem, 10px);
    }
    .sub_menu_title {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 1.4rem;
        height: 0.4rem;
        transform: translateX(-50%);
        left: 50%;
        bottom: 1px;
        background-color: rgba(255, 255, 255, 0.2);
        filter: blur(1px);
        border-radius: 10px 10px 0 0;
        z-index: 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: none;
        border-radius: 10px 10px 0 0;
      }
    }
  }
  .el-submenu__title {
    text-align: center;
    padding: 0 !important;
    border-radius: 0.1rem;
    &:hover {
      @include transparent(0.57rem, 10px);
    }
  }
}
.menu_level-2::v-deep {
  padding: 0 !important;
  background-color: transparent !important;
  width: 1.4rem;
  line-height: 0.38rem;
  height: auto;
  min-width: 0;
  position: relative;
  &:hover,
  &.is-active {
    background-color: transparent !important;
    @include transparent(100%, 0);
    &::before {
      opacity: 0.4;
    }
  }
  & > .menu_item_title {
    border: none !important;
  }
}
.menu-txt-1 {
  font-size: 0.18rem;
}
.menu-txt-2 {
  font-size: 0.14rem;
}
// .menu-txt-2::before {
//   content: url("~@/assets/icon/subMenuIcon.png");
//   display: inline-block;
//   padding-left: 7px;
//   width: 22px;
//   height: 22px;
//   opacity: 0;
// }
@media screen and (max-width: 1440px) {
  .menu-txt-2 {
    font-size: 0.12rem;
  }
}

.level-2-icon {
  position: relative;
}
.level-2-icon::before {
  position: absolute;
  left: -0.3rem;
  content: url("~@/assets/icon/subMenuIcon.png");
  display: inline-block;
  padding-left: 7px;
  width: 22px;
  height: 22px;
  opacity: 1;
}
@media screen and (max-width: 1440px) {
  .level-2-icon::before {
    left: -0.4rem;
    // top: 1px;
  }
}
// .menu-txt-2:hover::before {
//   opacity: 1;
// }
</style>
