<template>
  <div>
    <h4>Register</h4>
    <b-form inline>
      <label class="sr-only" for="inlineFormInputName2">Username</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" v-model='username' placeholder="your username here" />
      <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
      <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input type='password' placeholder="Password" v-model='password' />
      </b-input-group>
      <b-button variant="primary" @click= 'register'>Register</b-button>
      <b-button variant="primary" @click = 'toLogin'>Back to Login</b-button>
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
  methods:{
    register () {
      let obj = {
        username: this.username,
        password: this.password
      }
      axios.post(`${url}/users/signup`,obj)
        .then(response => {
          alert('register success')
          localStorage.setItem('token')
          console.log(response.data.data.token)
          this.toLogin()
        })
        .catch(err=>{
          alert('register fail')
          console.log(err.message)
        })
    },
    toLogin () {
      this.$router.push('Login')
    }
  }
}
</script>
