
//统计分析饼图
export function getStatisticalPie(params){
	return unfetch({
		url:'/document/tree/get/statistical/pie',
		method: 'get',
		params
	});
}



