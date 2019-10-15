<template>
  <div class="container">
    <img
      src="https://assets-ouch.icons8.com/preview/125/6414b067-ba59-46ef-8693-4e190aa466c7.png"
      class="mt-1"
      height="250"
      width="250"
      alt="cart"
    >
    <div>
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>name</th>
            <th>price</th>
            <th>quantity</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in selectedDishes" :key="dish.id">
            <td>{{ dish.name }}</td>
            <td>{{ dish.price }}</td>
            <td>{{ dish.quantity }}</td>
            <td>
              <a @click="addToCart(dish)">
                <Icon type="ios-add-circle-outline" size="30" color="green" />
              </a>
              <a @click="removeFromCart(dish)">
                <Icon type="ios-remove-circle-outline" size="30" color="red" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <b-button
        v-show="$route.path !== 'orders/checkout'"
        @click="checkout"
      >
        process to checkout
        {{ price | currency }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    id () {
      return this.$route.params.id
    },
    selectedDishes () {
      return this.$store.getters['cart/items']
    },
    price () {
      return this.$store.getters['cart/price']
    },
    numberOfItems () {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    }),

    checkout () {
      // redirect to signin
      const currentUser = this.$store.getters['auth/username']

      if (!currentUser) {
        this.$router.push('/users/signin')
        return
      }
      this.$router.push('/orders/checkout')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
