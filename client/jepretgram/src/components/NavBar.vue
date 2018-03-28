<template>
  <b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-brand href="#">JepretGram</b-navbar-brand>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        <add-photos></add-photos>
        <b-button size="sm" class="my-2 my-sm-0" type="submit" @click = 'logout'>Logout</b-button>
      </b-nav-form>
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import AddPhotos from '@/components/AddPhotos'
export default {
  components: {
    AddPhotos
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
