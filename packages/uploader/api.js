export function getTreeDocuments(reqParams) {
  return unfetch({
    url: '/document/tree/documents',
    params: reqParams
  });
}

// 文件重命名
export function FileRename(fileInfo) {
  return unfetch.put('/file/rename', fileInfo);
}
// 移动文件夹
export function moveFolder(reqParams) {
  return unfetch.put('/document/tree/move/directory', reqParams);
}

export function FileDelete(fileId) {
  return unfetch.delete('/file', {
    params: {
      ID: fileId
    }
  });
}

//文件夹列表
export function getFolderList(){
  return unfetch({
    url: '/document/tree/folder'
  })
}

export function FileAdd(fileInfo) {
  return unfetch({
    url: '/file',
    method: 'post',
    data: {
      files: JSON.stringify(fileInfo)
    }
  });
}

export function FileDownload(fileId) {
  return unfetch.get('/file/download/compress', {
    params: {
      ID: fileId
    }
  })
}

// 新建文件夹
export function FileCreatedNewFolder(reqParams) {
  return unfetch.post('/document/tree/directory', reqParams)
}

// 文件夹重命名
export function FileRenameFolder(reqParams) {
  return unfetch.post('/document/tree/rename', reqParams)
}

// 删除文件夹
export function FileDeleteFolder(fileId) {
  return unfetch.delete('/document/tree/directory', {
    params: {
      ID: fileId
    }
  })
}

// 批量删除文件或者文件夹
export function deleteDirAndFiles(ids) {
  return unfetch.delete('/document/tree/batDelete', {
    params: {
      IDS: ids
    }
  });
}

// 文件预览
export function FileView(FILE_ID) {
  return unfetch({
    url: '/file/view',
    params: FILE_ID
  });
}


// 查询当前登陆人拥有的操作权限数据
export function getOperatePermission(params){
	return unfetch({
		url:'/role/operate/get/operate/by/user',
		method: 'get',
		params
	});
}
//批量移交文档
export function batchSaveFileArchive(params) {
  return unfetch({
    url: '/file/archive/addBatch',
    method: 'post',
    data: params
  });
}

// 根据角色ID查询拥有该角色的人员
export function getUsersByRoleId(params){
	return unfetch({
		url:'/role/user/get/user/by/role',
		method: 'get',
		params
	});
}