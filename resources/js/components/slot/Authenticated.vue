<template>
  <slot></slot>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../../router'
export default {
  name: 'Authenticated',
  computed: {
    ...mapGetters['authenticated'],
  },
  created() {
    // !this.$store.getters.authenticated
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  },
}
</script>
