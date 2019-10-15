import Cookies from 'js-cookie'

// define empty state
export const state = () => {}

// creating mutation
export const mutations = {
  setUser (state, user) {
    state.user = user
    Cookies.set('user', user)
  },

  // logout
  logout (state) {
    state.user = null
    Cookies.set('user', null)
  }
}

// current user getters
export const getters = {
  username: (state) => {
    return state.user && state.user.username
  }
}
