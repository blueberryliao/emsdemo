/** @format */

import request from '@/utils/request';

// 获取列表
export const getBallotInfo = (query) => {
	return request({
		url: '/system/voterManagement/getElectionInformation',
		method: 'get',
		params: query
	});
};

// //候选人
// export const getCandidateList = (query) => {
//   return request({
//     url: "/candidate/candidate/list",
//     method: "get",
//     params: query,
//   });
// };
