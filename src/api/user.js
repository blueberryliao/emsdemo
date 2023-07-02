import request from "@/utils/request";

// 获取用户列表
export const getUserList = (query) => {
  return request({
    url: "/system/user/list",
    method: "get",
    params: query,
  });
};

//删除用户
export const deleteUser = (id) => {
  return request({
    url: `/system/user/${id}`,
    method: "delete",
    // data: data,
  });
};

//新增用户
export function addUser(data) {
  return request({
    url: "/system/user",
    method: "post",
    data: data,
  });
}

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

export const getAuthority = (id) => {
  return request({
    url: `/system/menu/roleMenuTreeselect/${id}`,
    method: "get",
    // params: query,
  });
};
