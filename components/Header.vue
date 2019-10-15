<template>
  <Menu mode="horizontal" :theme="theme1" active-name="1">
    <nuxt-link to="/">
      <MenuItem name="brand">
        <Icon type="ios-paper" />
        nuxt-mall
      </MenuItem>
    </nuxt-link>
    <nuxt-link v-if="!username" :to="{ name: 'users-register' }">
      <MenuItem name="register">
        <Icon type="ios-people" />
        register
      </MenuItem>
    </nuxt-link>
    <nuxt-link v-if="!username" :to="{ name: 'users-signin' }">
      <MenuItem name="login">
        <Icon type="ios-people" />
        login
      </MenuItem>
    </nuxt-link>
    <Submenu v-if="username" name="3">
      <template slot="title">
        <Icon type="ios-stats" />
        {{ username }}
      </template>
      <MenuGroup title="options">
        <MenuItem name="3-1">
          <div @click="logout">
            <Icon type="ios-power" />
            logout
          </div>
        </MenuItem>
      </MenuGroup>
    </Submenu>
  </Menu>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      theme1: 'light'
    }
  },
  computed: {
    username () {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}
</script>
