import request from "@/utils/request";

// 获取用户列表
export const getGeographyList = (query) => {
  return request({
    url: "/system/precinct/list",
    method: "get",
    // params: query,
  });
};
