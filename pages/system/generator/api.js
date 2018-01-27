// 代码生成器
export function getTableColumns(params) {
  return unfetch({
    url: '/platform/codegenerator/connect',
    method: 'post',
    data: params
  })
}

export function buildFile(params) {
  return unfetch({
    url: '/platform/codegenerator/buildfile',
    method: 'post',
    data: params
  })
}
