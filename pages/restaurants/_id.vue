<template>
  <div class="container mt-2">
    <b-button @click="$router.go(-1)">
      go back
    </b-button>
    <h4>{{ restaurant.name }}</h4>
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
          <b-card-text>
            {{ dish.description }}
          </b-card-text>
          <b-button>Add to cart</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import restaurantQuery from '~/apollo/queries/restaurant/restaurant'

export default {
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
  }
}
</script>
