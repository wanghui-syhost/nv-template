
export function getDocumentRoleDatas(params){
	return unfetch({
		url:'/document/role/list',
		method: 'get',
		params
	});
}
export function saveDocumentRole(params){
	return unfetch({
		url:'/document/role',
		method: 'post',
		data: params
	});
}
export function getDocumentRole(params){
	return unfetch({
		url:'/document/role',
		method: 'get',
		params
	});
}
export function updateDocumentRole(params){
	return unfetch({
		url:'/document/role',
		method: 'put',
		params
	});
}
export function deleteDocumentRole(params){
	return unfetch({
		url:'/document/role',
		params: params,
		method: 'delete'
	});
}


// 查询文件夹树形数据
export function getFolderTreeList(params){
	return unfetch({
		url:'/document/role/document/folder/relation',
		method: 'get',
		params
	});
}
// 批量修改角色文件夹关联数据
export function batchUpdateRoleDocument(params){
	return unfetch({
		url:'/document/role/document/batch/update',
		method: 'post',
		data: params
	});
}



