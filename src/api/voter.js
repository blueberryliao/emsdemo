import request from "@/utils/request";

// 获取用户列表
export const getVoterList = (query) => {
  return request({
    url: "/system/voterManagement/list",
    method: "get",
    params: query,
  });
};

//删除用户
export const deleteVoter = (id) => {
  return request({
    url: `/system/voterManagement/${id}`,
    method: "delete",
    // data: data,
  });
};
