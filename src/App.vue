<template>
  <div id="app">
    <header class="header" role="header">
      <div class="container">
        <h1 class="header__title">Punk API - Brewdog's expansive back catalogue of beer</h1>
      </div>
    </header>

    <main role="content" class="container">
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>

        <div class="beer-list" v-if="beers">
          <Beer v-for="beer in beers" :beer="beer" :key="beer.id" />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Beer from './components/Beer';

export default {
  name: 'app',
  components: {
    Beer: Beer
  },
  data() {
    return {
      beers: null,
      loading: true,
      errored: false,
      errors: []
    };
  },
  created() {
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
html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol,
ul {
  margin-left: 1.5rem;
}

img {
  max-width: 100%;
  height: auto;
}

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #232323;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
}

.container {
  width: 96%;
  max-width: 80rem;
  margin-right: auto;
  margin-left: auto;
}

.header {
  padding: 1.5rem;
  background: #000;
  color: #fff;

  &__title {
    font-size: 2rem;
    font-weight: 700;
  }
}

.beer-list {
  display: grid;
  grid-gap: 3rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media screen and (min-width: 40rem) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
