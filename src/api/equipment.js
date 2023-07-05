import request from "@/utils/request";

// 获取列表
export const getEquipmentList = (query) => {
  return request({
    url: "/system/management/list",
    method: "get",
    params: query,
  });
};

//新增
export const addEquipment = (data) => {
  return request({
    url: "/system/management",
    method: "post",
    data: data,
  });
};

//删除
export const deleteEquipment = (id) => {
  return request({
    url: `/system/management/${id}`,
    method: "delete",
    // data: data,
  });
};

//编辑
export const editEquipment = (data) => {
  return request({
    url: `/system/management`,
    method: "put",
    data: data,
  });
};
