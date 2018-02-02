export function getTrail(pageParams) {
  return unfetch({
    url: '/demo/info/trails',
    params: pageParams
  });
}

export function getUserPermission(params) {
  return unfetch({
    url: '/user/permission',
    method: 'get',
    params
  });
}

// 计划详情api
export function getInfo(pageParams) {
  return unfetch({
    url: '/info/infos',
    params: pageParams
  });
}

export function modifyInfo(modifyData) {
  return unfetch.put(
    '/info/todo',
    modifyData
  );
}

export function deleteInfo(id) {
  return unfetch.delete(
    '/info/infos', {
      params: {
        ID: id
      }
    }
  );
}


// 文件上传api
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

export function FileDelete(fileId) {
  return unfetch.delete('/file', {
    params: {
      ID: fileId
    }
  });
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