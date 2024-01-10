import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/mini-gpt4-web/table/list',
    method: 'get',
    params
  })
}
