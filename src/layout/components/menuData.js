/* let MenuData = [
  {
    name: "任务统计",
    path: "/rwtj",
    meta: {
      icon: '<iconpark-icon name="list"></iconpark-icon>',
      isOpenNewTab: false,
      title: "任务统计",
    },
  },
  {
    name: "任务管理",
    path: "/rwgl",
    meta: {
      icon: '<iconpark-icon name="category-management"></iconpark-icon>',
      isOpenNewTab: false,
      title: "任务管理",
    },
  },
  {
    name: "绩效评价",
    path: "/jxpj",
    meta: {
      icon: '<iconpark-icon name="star"></iconpark-icon>',
      isOpenNewTab: false,
      title: "绩效评价",
    },
  },
  {
    name: "消息中心",
    path: "/xxzx",
    meta: {
      icon: '<iconpark-icon name="comment"></iconpark-icon>',
      isOpenNewTab: false,
      title: "消息中心",
    },
  },
  {
    name: "账号管理",
    path: "/sysManagement/userManagement",
    meta: {
      icon: '<iconpark-icon name="mac-finder"></iconpark-icon>',
      isOpenNewTab: false,
      title: "账号管理",
    },
    children: [
      {
        name: "账号管理",
        path: "/sysManagement/userManagement",
        meta: {
          icon: null,
          isOpenNewTab: false,
          title: "账号管理",
        },
      },
    ],
  },
  {
    name: "角色权限",
    path: "/sysManagement/roleAdmin",
    meta: {
      icon: '<iconpark-icon name="me"></iconpark-icon>',
      isOpenNewTab: false,
      title: "角色权限",
    },
    children: [
      {
        name: "角色权限",
        path: "/sysManagement/roleAdmin",
        meta: {
          icon: null,
          isOpenNewTab: false,
          title: "角色权限",
        },
      },
    ],
  },
  {
    name: "个人设置",
    path: "/selfSetting",
    meta: {
      icon: '<iconpark-icon name="setting-two"></iconpark-icon>',
      isOpenNewTab: false,
      title: "个人设置",
    },
  },

  //   {
  //     name: "菜单管理",
  //     path: "/sysManagement/menuAdmin",
  //     meta: {
  //       icon: null,
  //       isOpenNewTab: false,
  //       title: "菜单管理",
  //     },
  //     children: [
  //       {
  //         name: "菜单管理",
  //         path: "/sysManagement/menuAdmin",
  //         meta: {
  //           icon: null,
  //           isOpenNewTab: false,
  //           title: "菜单管理",
  //         },
  //       },
  //     ],
  //   },

  //   {
  //     name: "数据字典",
  //     path: "/sysManagement/dataDictionary",
  //     meta: {
  //       icon: null,
  //       isOpenNewTab: false,
  //       title: "数据字典",
  //     },
  //     children: [
  //       {
  //         name: "数据字典",
  //         path: "/sysManagement/dataDictionary",
  //         meta: {
  //           icon: null,
  //           isOpenNewTab: false,
  //           title: "数据字典",
  //         },
  //       },
  //     ],
  //   },
]; */


let MenuData = [
  {
    name: "任务统计",
    path: "/rwtj",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "任务统计",
    },
    menuLevel: 1,
    limit: ["TaskStatistical"],
    children: [
      {
        path: "/index/taskStatistics",
        name: "任务统计",
        meta: {
          icon: null,
          isOpenNewTab: false,
          title: "督导组任务统计",
        },
        menuLevel: 2,
        limit: ["TaskStatistical_dudao"],
      },
      {
        path: "/index/taskStatisticsDep",
        name: "任务统计",
        meta: {
          icon: null,
          isOpenNewTab: false,
          title: "处室任务统计",
        },
        menuLevel: 2,
        limit: ["TaskStatistical_chushi"],
      },
      {
        path: "/index/TaskStatisticalDetails",
        name: "办理详情",
        meta: {
          icon: null,
          isOpenNewTab: false,
          title: "办理详情",
        },
        menuLevel: 2,
        limit: ["DealDetails"],
      },
    ]
  },
  {
    name: "任务管理",
    path: "/index/AdminTaskManage",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "督导任务",
    },
    menuLevel: 1,
    limit: ["TaskManagement_dudao"],
  },
  {
    name: "任务管理",
    path: "/index/OfficeManage",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "支部&处室任务",
    },
    menuLevel: 1,
    limit: ["TaskManagement_chushi"],
  },
  {
    name: "任务管理",
    path: "/index/PersonManage",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "责任人任务",
    },
    menuLevel: 1,
    limit: ["TaskManagement_zrr"],
  },
  {
    name: "绩效评价",
    path: "/index/performanceEvaluation",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "督导组绩效评价",
    },
    menuLevel: 1,
    limit: ["PA_dudao"],
  },
  {
    name: "绩效评价",
    path: "/index/branchEachrt",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "处室绩效",
    },
    menuLevel: 1,
    limit: ["PA_chushi"],
  },
  {
    name: "处室绩效",
    path: "/index/performanceDetails",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "处室绩效",
    },
    menuLevel: 1,
    limit: ["Performance_chushi"],
  },
  {
    name: "我的绩效",
    path: "/index/performanceDetailsSelf",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "我的绩效",
    },
    menuLevel: 1,
    limit: ["Performance_me"],
  },
  {
    name: "消息中心",
    path: "/index/MessageCenter",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "消息中心",
    },
    menuLevel: 1,
    limit: ["MessageCenter"],
  },
  {
    name: "账号管理",
    path: "/index/userManagement",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "账号管理",
    },
    menuLevel: 1,
    limit: ["AccountManagement"],
  },
  {
    name: "角色权限",
    path: "/index/roleAdmin",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "角色权限",
    },
    menuLevel: 1,
    limit: ["RolePermission"],
  },
  {
    name: "个人设置",
    path: "/index/AccountSetting",
    meta: {
      icon: null,
      isOpenNewTab: false,
      title: "个人设置",
    },
    menuLevel: 1,
    limit: ["PersonalSettings"],
  },
];


export default MenuData;
