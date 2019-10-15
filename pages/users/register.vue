<template>
  <div class="container mt-5 pt-5">
    <b-row>
      <!-- register banner -->
      <b-col md="6">
        <div>
          <img
            src="https://assets-ouch.icons8.com/preview/133/c404f53e-d587-4aca-9fcc-116554038e19.png"
            alt="signup"
            width="500"
          >
        </div>
      </b-col>
      <!-- form -->
      <b-col md="6">
        <div class="mb-4">
          <h5 class="text-center">
            Register new user
          </h5>
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="username">
            <Input v-model="formInline.username" type="text" placeholder="Username" />
            <Icon slot="prepend" type="ios-person-outline" />
          </FormItem>
          <FormItem
            prop="mail"
          >
            <Input v-model="formInline.mail" placeholder="Enter your e-mail" />
          </FormItem>
          <FormItem prop="password">
            <Input v-model="formInline.password" type="password" placeholder="Password" />
            <Icon slot="prepend" type="ios-lock-outline" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">
              Register
            </Button>
          </FormItem>
        </Form>
        <nuxt-link :to="{ name: 'users-signin' }">
          signIn
        </nuxt-link>
      </b-col>
      <Spin v-if="spinShow" size="large" fix />
    </b-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import strapi from '~/utils/Strapi'

export default {
  data () {
    return {
      spinShow: false,
      formInline: {
        username: '',
        mail: '',
        password: ''
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ],
        mail: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async handleSubmit (name) {
      this.spinShow = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Valid inputs!')
        } else {
          this.$Message.error('invalid inputs!')
        }
      })
      if (this.formInline.username && this.formInline.mail && this.formInline.password) {
        try {
          // server
          const response = await strapi.register(
            this.formInline.username,
            this.formInline.mail,
            this.formInline.password
          )
          this.spinShow = false
          // call setUser
          this.setUser(response.user)
          this.$router.push('/')
        } catch (err) {
          alert('check your fields')
          this.spinShow = false
        }
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
