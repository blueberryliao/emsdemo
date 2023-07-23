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

//提交选票
export const saveBallot = (data) => {
	return request({
		url: '/system/voterManagement/submitElectionInformation',
		method: 'post',
		data: data
	});
};
//暂缓处理选票
export const suspendBallot = (data) => {
	return request({
		url: '/system/voterManagement/suspendElectionInformation',
		method: 'post',
		data: data
	});
};

//提交竞选职位
export const saveContest = (data) => {
	return request({
		url: '/system/voterManagement/submitElectionInformationDuties',
		method: 'post',
		data: data
	});
};

//暂缓处理竞选
export const suspendContest = (data) => {
	return request({
		url: '/system/voterManagement/suspendElectionInformationDuties',
		method: 'post',
		data: data
	});
};

//候选人
export const getDataCentreCandidates = (query) => {
	return request({
		url: '/system/ballotCountingController/getDataCentreCandidates',
		method: 'get',
		params: query
	});
};

//voters
export const getDataCentreVoters = (query) => {
	return request({
		url: '/system/ballotCountingController/getDataCentreVoters',
		method: 'get',
		params: query
	});
};

//ballot
export const getDataCentreBallots = (query) => {
	return request({
		url: '/system/ballotCountingController/getDataCentreBallots',
		method: 'get',
		params: query
	});
};
//
