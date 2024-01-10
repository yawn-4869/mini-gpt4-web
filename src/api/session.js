import request from '@/utils/request'

export function queryChatSession(queryID) {
  return request({
    url: 'mini-gpt4-web/documentations/query',
    method: 'post',
    queryID
  })
}
