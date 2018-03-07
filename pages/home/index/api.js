import unfetch from 'nenv/unfetch'

export function getTrail(pageParams) {
  return unfetch({
    url: '/info/trails',
    params: pageParams
  });
}

export function getInfo(pageParams) {
  return unfetch({
    url: '/info/infos',
    params: pageParams
  });
}

export function getHomeInfoCnt() {
  return unfetch.get('/info/todo/done')
}