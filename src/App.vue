<template>
  <div id="app">
    <header class="header" role="header">
      <div class="header__wrap container">
        <img class="header__logo" src="@/assets/logo.png" alt="Brewdog - Punk API" />
        <h1 class="header__title">Punk API - Brewdog's expansive back catalogue of beer</h1>
      </div>
    </header>

    <main role="content" class="container">
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section class="grid" v-else>
        <div v-if="loading">Loading...</div>

        <aside class="sidebar">
          <BeerFilter label="Search">
            <input
              class="beer-filter__input"
              type="search"
              placeholder="e.g. Punk IPA"
              v-model="beerSearch"
            />
          </BeerFilter>

          <BeerFilter label="Filter by ABV">
            <select class="beer-filter__input beer-filter__input--select" v-model="beerStrength">
              <option value="all">All Beers</option>
              <option value="weak">Weak (0 - 4.5%)</option>
              <option value="medium">Medium (4.5% - 7.5%)</option>
              <option value="strong">Strong (7.5% +)</option>
            </select>
          </BeerFilter>

          <button class="btn" @click="toggleFavourites">{{ showFavouriteText }}</button>
        </aside>

        <div class="beer-list" v-if="beers">
          <p
            v-if="filterBeers.length === 0"
            class="beer-list__empty"
          >No beers available to show, please try adjusting your filter criteria, or adding your favourite beer.</p>

          <Beer
            v-for="beer in filterBeers"
            :beer="beer"
            @send-favourite-id="updateMyFavourites"
            :key="beer.id"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Beer from './components/Beer';
import BeerFilter from './components/BeerFilter';

export default {
  name: 'app',
  components: {
    Beer: Beer,
    BeerFilter: BeerFilter
  },
  data() {
    return {
      beers: null,
      loading: true,
      errored: false,
      errors: [],
      beerSearch: '',
      beerStrength: 'all',
      showFavourites: false,
      myFavourites: []
    };
  },
  methods: {
    /**
     * Toggles the state of showFavourites.
     */
    toggleFavourites() {
      this.showFavourites = !this.showFavourites;
    },
    /**
     * Updates myFavourites array of beer ID's.
     */
    updateMyFavourites(id) {
      const index = this.myFavourites.indexOf(id);

      if (index !== -1) {
        this.myFavourites.splice(index, 1);
      } else {
        this.myFavourites.push(id);
      }

      this.saveMyFavourites();
    },
    /**
     * Save myFavourites array of beer ID's to localStorage.
     */
    saveMyFavourites() {
      const parsed = JSON.stringify(this.myFavourites);
      localStorage.setItem('beerFavourites', parsed);
    }
  },
  computed: {
    /**
     * Filter beers.
     *
     * @returns {Array} The filtered beers.
     */
    filterBeers() {
      const LOW_STRENGTH = 'weak';
      const MEDIUM_STRENGTH = 'medium';
      const HIGH_STRENGTH = 'strong';
      const ALL_STRENGTH = 'all';

      const filtered = this.beers
        .filter(beer =>
          beer.name.toLowerCase().includes(this.beerSearch.toLowerCase())
        )
        .filter(beer => {
          const strengths = {
            [LOW_STRENGTH]: beer.abv <= 4.5,
            [MEDIUM_STRENGTH]: beer.abv > 4.5 && beer.abv <= 7.5,
            [HIGH_STRENGTH]: beer.abv > 7.5,
            [ALL_STRENGTH]: beer
          };

          return strengths[this.beerStrength];
        })
        .filter(beer => {
          if (this.showFavourites) {
            return beer.isFavourite;
          }

          return beer;
        });

      return filtered;
    },
    /**
     * Toggles the show favourite button text.
     *
     * @returns {String} The button text.
     */
    showFavouriteText() {
      return this.showFavourites ? 'Show all beers' : 'Show favourites';
    }
  },
  created() {
    axios
      .get('https://api.punkapi.com/v2/beers?per_page=80')
      .then(response => {
        this.beers = response.data;

        // If we have favourite beers in localStorage, retrieve them.
        if (localStorage.getItem('beerFavourites')) {
          try {
            this.myFavourites = JSON.parse(
              localStorage.getItem('beerFavourites')
            );
          } catch (e) {
            localStorage.removeItem('beerFavourites');
          }
        }

        this.beers = this.beers.map(beer => {
          // Is the current beer in my favourites array?
          const isFavourite = !!this.myFavourites.find(
            element => element === beer.id
          );

          // Beer object.
          return {
            id: beer.id,
            name: beer.name,
            tagline: beer.tagline,
            description: beer.description,
            image_url: beer.image_url,
            abv: beer.abv,
            food_pairing: beer.food_pairing,
            isFavourite
          };
        });
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

body {
  min-height: 100vh;
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
  color: #333;
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

.btn {
  width: 100%;
  padding: 0.5rem;
  font-family: 'Oswald', sans-serif;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: #de0000;
  border: transparent;
  cursor: pointer;
  outline: none;
}

.container {
  width: 96%;
  max-width: 90rem;
  margin-right: auto;
  margin-left: auto;
}

.header {
  padding: 1.5rem;
  background: #000;
  color: #fff;

  &__wrap {
    display: flex;
    align-items: center;
  }

  &__logo {
    width: 3rem;
    margin-right: 1.5rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
  }
}

.grid {
  display: grid;
  grid-gap: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media screen and (min-width: 48rem) {
    grid-template-columns: repeat(12, 1fr);
  }
}

.sidebar {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 48rem) {
    position: sticky;
    top: 1rem;
  }

  @media screen and (min-width: 48rem) {
    grid-column: 1/4;
  }
}

.beer-list {
  @media screen and (min-width: 48rem) {
    grid-column: 4/13;
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
  }

  &__empty {
    @media screen and (min-width: 48rem) {
      grid-column: span 2;
      justify-self: center;
    }
  }
}
</style>
