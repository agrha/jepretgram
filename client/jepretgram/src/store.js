import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let username = localStorage.getItem('username')
let url = `http://localhost:3000`
Vue.use(Vuex)

const state = {
  photos: [],
  username: username

}

const getters = {
  posts: state => {
    return state.posts
  },
  postChildren: (state) => (id) => {
    return state.post.find(post => post.id === id)
  },
  username: state => {
    return state.username
  },
  role: state => {
    return state.role
  },
  id: state => {
    return state.id
  }
}

const mutations = {
  fetchData (state, payload) {
    state.posts = payload
  },
  addData (state, payload) {
    state.posts.push(payload)
  },
  editData (state, payload) {
    console.log(payload)
    let index = state.posts.findIndex(post => post._id === payload.id)
    console.log(index)
    state.posts.splice(index, 1, payload)
  },
  deleteData (state, payload) {
    state.posts.map((data, index) => {
      if (payload.id === data._id) {
        state.posts.splice(index, 1)
      }
    })
  }
}

const actions = {
  fetchData ({commit}) {
    console.log('masuk fetch')
    axios.get(`${url}/photos`)
      .then(data => {
        console.log('hasil fetch', data.data.data)
        commit('fetchData', data.data.data)
      })
  },
  editBlog ({commit}, obj) {
    axios.put(`${url}/photos/${obj.id}`, obj, {headers: {token: localStorage.getItem('token')}})
      .then(data => {
        console.log('edit', data)
        commit('editData', obj)
      })
      .catch(err => {
        console.log('error edit', err)
      })
  },
  writeBlog ({commit}, obj) {
    axios.post(`${url}/photos`, obj, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log(response.data)
        commit('addData', obj)
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  deleteBlog ({commit}, obj) {
    axios.delete(`${url}/photos/${obj.id}`, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log(response.data)
        commit('deleteData', obj)
      })
      .catch(err => {
        alert('error when deleting photos')
        console.log('error when deleting photos', err)
      })
  },
  logout () {
    localStorage.clear()
    window.location.href = '/'
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
