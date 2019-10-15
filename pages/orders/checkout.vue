<template>
  <div class="container row">
    <b-col>
      <form method="post" @submit.prevent="handleSubmit">
        <h3>checkout</h3>
        <input v-model="address" type="text" placeholder="address">
        <input v-model="city" type="text" placeholder="city">
        <input v-model="postalCode" type="text" placeholder="postal code">
        <card
          ref="card-stripe"
          stripe="pk_test_EkgRdwSuRpwR0FUEsUSMJVCw00HJk4Sukt"
          @change="complete = $event.complete"
        />
        <b-button
          type="submit"
        >
          process payment
        </b-button>
      </form>
    </b-col>

    <b-col>
      <Cart />
    </b-col>
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import { mapMutations } from 'vuex'
import Cart from '@/components/Cart.vue'
import strapi from '~/utils/Strapi'

export default {
  // ..
  components: {
    Cart,
    Card
  },
  data () {
    return {
      address: '',
      postalCode: '',
      city: '',
      complete: false,
      loading: false
    }
  },
  methods: {
    async handleSubmit () {
      const response = await createToken()
      const token = response.token.id
      // process
      await strapi.createEntry('orders', {
        amount: this.$store.getters['cart/price'],
        dishes: this.$store.getters['cart/items'],
        address: this.address,
        postalCode: this.postalCode,
        city: this.city,
        token
      }).then(() => {
        this.$Message.success('success')
        this.emptyCart()
        this.$router.push('/')
      }).catch(() => {
        this.$Message.error('cannot process payments')
      })
    },
    ...mapMutations({
      emptyCart: 'cart/empty'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
