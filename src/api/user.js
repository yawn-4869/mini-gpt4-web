import request from '@/utils/request'

export function signup(data) {
  return request({
    url: '/mini-gpt4-web/user/signup',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/mini-gpt4-web/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/mini-gpt4-web/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/mini-gpt4-web/user/logout',
    method: 'post'
  })
}
