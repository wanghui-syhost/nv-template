// 字典表
export function getDictionaries(params) {
  return unfetch({
    url: '/dictionary/list',
    method: 'get',
    params
  })
}

// 系统配置
export function getConfigDatas(params) {
  return unfetch({
    url: '/config/list',
    method: 'get',
    params
  });
}

export function saveConfig(params) {
  return unfetch({
    url: '/config',
    method: 'post',
    data: params
  });
}

export function batchSaveConfig(params) {
  return unfetch({
    url: '/config/batch',
    method: 'post',
    data: params
  });
}

export function validConfigKey(params) {
  return unfetch({
    url: '/config/valid',
    method: 'get',
    params
  });
}

export function updateConfig(params) {
  return unfetch({
    url: '/config',
    method: 'put',
    params
  });
}

export function updateDictionary(params) {
  return fetch({
    url: '/dictionary',
    method: 'put',
    params
  })
}

export function deleteDictionary(params) {
  return unfetch({
    url: '/dictionary',
    params,
    method: 'delete'
  })
}

export function validDictionary(params) {
  return unfetch({
    url: '/dictionary/valid',
    method: 'get',
    params
  })
}

export function saveDictionary(params) {
  return unfetch({
    url: '/dictionary',
    method: 'post',
    data: params
  })
}