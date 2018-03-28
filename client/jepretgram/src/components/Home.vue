<template>
  <b-jumbotron>
  <template slot="header">
    JepretGram
  </template>
  <template slot="lead">
    Poto-Poto Asik
  </template>
  <hr class="my-4">
  <p>
    selfie,wefie,dll
  </p>
  <b-btn variant="primary" @click ='toLogin'>Login</b-btn>
  <b-btn variant="success" @click ='toRegister'>Register</b-btn>
</b-jumbotron>
</template>

<script>
export default {
  methods: {
    toLogin () {
      this.$router.push('Login')
    },
    toRegister () {
      this.$router.push('Register')
    }
  }
}
</script>
