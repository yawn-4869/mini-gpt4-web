import {conversationCreate, conversationAsk, conversationDelete, getConversationDetail, getConversationList, downLoadConversation } from '@/api/conversation'
import { setLastConversation, getLastConversation, getLastMessage } from '@/utils/auth'
import Cookies from 'js-cookie'

const state = {
    conversationId: getLastConversation(),
    lastMessageId: getLastMessage()
}

const mutations = {
    SET_CONVERSATION: (state, id) => {
        state.conversationId = id
        setLastConversation(id)
    }, 
}

const actions = {
    // conversation start
    create({ commit }, data) {
        // const {image} = data
        // const {image_uri} = data
        return new Promise((resolve, reject) => {
            conversationCreate(data).then(response => {
                commit('SET_CONVERSATION', response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    ask({commit}, data) {
        const { content, id } = data;
        return new Promise((resolve, reject) => {
            conversationAsk(content, id) 
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    detail({commit}, data) {
        const { id } = data;
        return new Promise((resolve, reject) => {
            getConversationDetail({ conversationId: id }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    
    list({commit}) {
        return new Promise((resolve, reject) => {
            getConversationList().then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    download({commit}, id) {
        console.log(id)
        return new Promise((resolve, reject) => {
            downLoadConversation(id).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
  }