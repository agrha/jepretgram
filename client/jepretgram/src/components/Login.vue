<template>
  <div>
    <h3>Login</h3>
    <b-form inline>
      <label class="sr-only" for="inlineFormInputName2">Username</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" v-model='username' placeholder="username" />
      <label class="sr-only" for="inlineFormInputGroupUsername2">Password</label>
      <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input v-model="password" type='password' placeholder="password" />
      </b-input-group>
      <b-button variant="primary" @click = 'signin'>Login</b-button>
      <b-button variant="primary" @click = 'toLogin'>Register</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
let url = `http://localhost:3000`
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toLogin () {
      this.$router.push('Register')
    },
    signin () {
      let obj = {
        username: this.username,
        password: this.password
      }
      axios.post(`${url}/users/signin`, obj)
        .then(response => {
          alert('login success')
          console.log('ini response', response.data.data.token)
          this.$router.push('Photolist')
        })
        .catch(err => {
          alert('login fail')
          console.log(err)
        })
    }
  }
}
</script>
