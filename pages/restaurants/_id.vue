<template>
  <div class="container mt-2 row">
    <b-col>
      <!-- <b-button @click="$router.go(-1)">
        go back
      </b-button> -->
      <!-- Breadcrumb -->
      <Breadcrumb
        class="mt-2 mb-2"
      >
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline" />
          Home
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="ios-cafe" />
          {{ restaurant.name }}
        </BreadcrumbItem>
      </Breadcrumb><!-- ./Breadcrumb -->
      <div>
        <div v-for="dish in restaurant.dishes" :key="dish.id">
          <b-card
            :title="dish.name"
            :img-src="`http://localhost:1337${dish.image.url}`"
            :img-alt="dish.name"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text class="mb-3">
              <p class="d-inline">
                {{ dish.description }}
              </p>
              <div class="mt-3">
                current price:
                <b-badge variant="info">
                  <p style="font-size: 1rem;">
                    {{ dish.price | currency }}
                  </p>
                </b-badge>
              </div>
            </b-card-text>
            <b-button
              @click="addToCart(dish)"
            >
              Add to cart
            </b-button>
          </b-card>
        </div>
      </div>
    </b-col>
    <b-col>
      <!-- import cart component here -->
      <div
        class="position-fixed"
      >
        <Cart />
      </div>
    </b-col>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import restaurantQuery from '~/apollo/queries/restaurant/restaurant'
import Cart from '@/components/Cart.vue'

export default {
  components: {
    Cart
  },
  data () {
    return {
      restaurant: Object
    }
  },
  apollo: {
    restaurant: {
      prefetch: true,
      query: restaurantQuery,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    })
  }
}
</script>
