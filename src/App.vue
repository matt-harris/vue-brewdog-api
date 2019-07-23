<template>
  <div id="app">
    <div class="container">
      <h1>Punk API</h1>
      <h2>Brewdog's expansive back catalogue of beer</h2>

      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>

        <div class="beer-list" v-if="beers">
          <div class="beer" v-for="beer in beers" :key="beer.id">
            <h3>{{ beer.name }}</h3>

            <p>{{ beer.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      beers: null,
      loading: true,
      errored: false,
      errors: []
    };
  },
  mounted() {
    axios
      .get('https://api.punkapi.com/v2/beers')
      .then(response => {
        this.beers = response.data;
      })
      .catch(error => {
        this.errored = true;
        this.errors.push(error);
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Fira Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #232323;
}

.container {
  width: 96%;
  max-width: 74rem;
  margin: 2rem auto;
}

.beer-list {
  display: grid;
  grid-gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  @media screen and (min-width: 40rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
