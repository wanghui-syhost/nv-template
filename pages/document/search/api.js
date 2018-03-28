
export function searchAttachment(params){
	return unfetch({
		url:'/demo/search/attachment',
		method: 'get',
		params
	});
}