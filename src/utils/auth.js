import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const lastChat = 'lastChatId'
const lastMessage = 'lastMessage'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLastConversation() {
  return Cookies.get(lastChat)
}

export function setLastConversation(id) {
  return Cookies.set(lastChat, id)
}

export function removeLastConversation() {
  return Cookies.remove(lastChat)
}

export function getLastMessage() {
  return Cookies.get(lastMessage)
}

export function setLastMessage(id) {
  return Cookies.set(lastMessage, id)
}

export function removeLastMessage() {
  return Cookies.remove(lastMessage)
}