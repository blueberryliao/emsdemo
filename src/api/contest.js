import request from "@/utils/request";

// 获取用户列表
export const getContestList = (query) => {
  return request({
    url: "/contests/contests/list",
    method: "get",
    params: query,
  });
};

//候选人
export const getCandidateList = (query) => {
  return request({
    url: "/candidate/candidate/list",
    method: "get",
    params: query,
  });
};
