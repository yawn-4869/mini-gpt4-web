import { register, login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, removeLastConversation, removeLastMessage } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    user: null,
    isLoggedIn: false,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, user) => {
    state.user = user
  }, 
  SET_LOGIN_STATE(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  }
}

const actions = {
  // user register
  register({ commit }, userInfo) {
    const { checkPassword, userAccount, userPassword } = userInfo
    return new Promise((resolve, reject) => {
      register({ checkPassword: checkPassword, userAccount: userAccount.trim(), userPassword: userPassword }).then(response => {
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { userAccount, userPassword } = userInfo
    return new Promise((resolve, reject) => {
      login({ userAccount: userAccount.trim(), userPassword: userPassword }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.id)
        commit('SET_NAME', data.userAccount)
        setToken(data.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('登录验证失败, 请重新登陆')
        }

        // const { userAccount, avatar } = data
        commit('SET_NAME', data.userAccount)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit  }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        removeLastConversation()
        removeLastMessage()
        resetRouter()
        commit('RESET_STATE')
        localStorage.removeItem('imageUrl');
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

