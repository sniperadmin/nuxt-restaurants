<template>
  <div class="container mt-3">
    <input v-model="query" type="search" placeholder="search...">

    <div v-for="restaurant in filtered" :key="restaurant.id">
      <img :src="`http://localhost:1337${restaurant.image.url}`" :alt="restaurant.name">
      <h4>{{ restaurant.name }}</h4>
    </div>
  </div>
</template>

<script>
import restaurantsQuery from '~/apollo/queries/restaurant/restaurants'
export default {
  data () {
    return {
      restaurants: [],
      query: ''
    }
  },
  apollo: {
    restaurants: {
      prefetch: true,
      query: restaurantsQuery
    }
  },
  computed: {
    filtered () {
      return this.restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase())
      })
    }
  }
}
</script>
