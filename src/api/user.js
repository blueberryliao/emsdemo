import request from "@/utils/request";

// 获取用户列表
export const getUserList = (query) => {
  return request({
    url: "/system/user/list",
    method: "get",
    // params: query
  });
};
//修改状态

export const changeStatus = (data) => {
  return request({
    url: "/system/user/changeStatus ",
    method: "put",
    data: data,
  });
};

//获取角色

export const getRoleList = (query) => {
  return request({
    url: "/system/role/list",
    method: "get",
    params: query,
  });
};

//根据角色获取菜单

export const getMenu = (id) => {
  return request({
    url: `/system/menu/roleMenuTreeselect/${id}`,
    method: "get",
    // params: query,
  });
};
