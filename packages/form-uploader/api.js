// 查询选项值
export function selectOptionByFileType(params){
	return unfetch({
		url:'/file/type/data/select/by/file/type',
		method: 'get',
		params
	});
}

// 查询指定大类的文件列表
export function selectByFileType(params){
	return unfetch({
		url:'/file/select/by/file/type',
		method: 'get',
		params
	});
}

// 删除文件
export function FileDelete(fileId) {
	return unfetch.delete('/file', {
	  params: {
		ID: fileId
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

// 文件上传成功后调用
export function FileAdd(fileInfo) {
	return unfetch({
	  url: '/file',
	  method: 'post',
	  data: {
		files: JSON.stringify(fileInfo)
	  }
	});
  }





