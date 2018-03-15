
export function getRoleDocumentDatas(params){
	return unfetch({
		url:'/document/role/document/list',
		method: 'get',
		params
	});
}
export function saveRoleDocument(params){
	return unfetch({
		url:'/document/role/document',
		method: 'post',
		data: params
	});
}
export function getRoleDocument(params){
	return unfetch({
		url:'/document/role/document',
		method: 'get',
		params
	});
}
export function updateRoleDocument(params){
	return unfetch({
		url:'/document/role/document',
		method: 'put',
		params
	});
}
export function deleteRoleDocument(params){
	return unfetch({
		url:'/document/role/document',
		params: params,
		method: 'delete'
	});
}
