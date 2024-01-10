
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  email: {
    token: 'email-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'email-token': {
    roles: ['email'],
    introduction: 'I am a user',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Commone User'
  },
}

module.exports = [
  // user signup
  {
    url: '/mini-gpt4-web/user/signup',
    type: 'post',
    response: config => {
      const { email } = config.body
      const token = tokens[email]

      // mock error
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: 'Account and password are incorrect.'
      //   }
      // }

      return {
        code: 20000,
        data: email
      }
    }
  },
  // user login
  {
    url: '/mini-gpt4-web/user/login',
    type: 'post',
    response: config => {
      const { email } = config.body
      const token = tokens[email]

      // mock error
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: 'Account and password are incorrect.'
      //   }
      // }

      return {
        code: 20000,
        data: email
      }
    }
  },

  // get user info
  {
    url: '/mini-gpt4-web/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return {
        code: 20000,
        data: users['admin-token']
      }
    }
  },

  // user logout
  {
    url: '/mini-gpt4-web/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
