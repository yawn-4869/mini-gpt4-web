import request from '@/utils/request'
import service from '@/utils/request';

export function conversationCreate(formData) {
  return service.post('/conversation/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

export function conversationDelete(params) {
  return request({
    url: '/conversation/delete',
    method: 'delete',
    params
  })
}

export function conversationAsk(msg, id) {
  return request({
    url: '/conversation/ask',
    method: 'get',
    params: {
      ask: msg,
      conversationId: id
    }
  })
}

export function getConversationDetail(params) {
  return request({
    url: '/conversation/detail',
    method: 'get',
    params
  })
}

export function getConversationList() {
  return request({
    url: '/conversation/list',
    method: 'get',
  })
}

export function downLoadConversation(id) {
  return request({
    url: '/conversation/export',
    method: 'get',
    responseType: 'blob',
    params: {
      conversationId: id
    }
  })
}