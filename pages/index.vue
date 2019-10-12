<template>
  <div class="container mt-3">
    <form class="mb-2">
      <input v-model="query" type="search" placeholder="search...">
    </form>

    <div>
      <b-card
        v-for="restaurant in filtered"
        :key="restaurant.id"
        no-body
        class="overflow-hidden mb-4"
        style="max-width: 540px;"
      >
        <b-row no-gutters>
          <b-col md="5">
            <b-card-img :src="`http://localhost:1337${restaurant.image.url}`" class="rounded-0" />
          </b-col>
          <b-col md="6">
            <b-card-body :title="restaurant.name">
              <b-card-text>{{ restaurant.description }}</b-card-text>
              <router-link
                :to="{ name: 'restaurants-id', params: { id: restaurant.id } }"
                tag="a"
                class="button"
              >
                <b-button variant="info">
                  see dishes
                </b-button>
              </router-link>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <!-- if no search results -->
      <h3 v-if="!filtered.length">
        No results
      </h3>
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
