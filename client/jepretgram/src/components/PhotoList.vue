<template>
<div>
  <NavBar/>
  <b-container fluid>
  <photo></photo>
  </b-container>
</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Photo from '@/components/Photo'
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {
    Photo,NavBar
  },
  computed: {
    ...mapGetters([
      'photos'
    ])
  },
  methods: {
    ...mapActions([
      'fetchData'
    ])
  },
  created () {
    this.fetchData()
  }
}
</script>
