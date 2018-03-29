
export function searchAttachment(params){
	return unfetch({
		url:'/document/tree/search/permission/pagination',
		method: 'get',
		params
	});
}