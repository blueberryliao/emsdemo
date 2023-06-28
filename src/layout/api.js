import Request from '@/common/net/request.js';
const request = new Request();


// 获取年度列表
export function getYearList() {
	let url = `/task-category/queryCategoryByYear`
	return request.send({
		url,
		method: "get",
		config: {
		headers: {
			"Content-Type": "application/json"
		},
	},
	});
}


