<template>
  <div class="beer">
    <div class="beer__media">
      <img class="beer__img" :src="beer.image_url" :alt="beer.name" data-test="beer-image" />
    </div>

    <div class="beer__wrap">
      <div class="beer__body">
        <div class="beer__header">
          <div class="beer__info">
            <h2 class="beer__name" data-test="beer-name">{{ beer.name }}</h2>
            <h3 class="beer__tagline" data-test="beer-tagline">{{ beer.tagline }}</h3>
          </div>

          <div class="beer__abv">
            <div class="beer__abv-label">ALC.VOL</div>
            <div class="beer__abv-percentage" data-test="beer-abv">{{ beer.abv }}%</div>
          </div>
        </div>

        <p class="beer__description" data-test="beer-description">{{ beer.description }}</p>
      </div>

      <div class="beer__pairings">
        <h4 class="beer__pairings-title">Goes great with</h4>

        <ul class="beer__pairings-list">
          <li
            class="beer__pairings-item"
            v-for="(item , index) in foodPairings"
            :key="index"
            data-test="beer-food-pairing"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Beer',
  props: {
    beer: Object
  },
  computed: {
    /**
     * Only show the first three food pairing suggestins.
     *
     * @returns {Array} The three food pairing suggestions.
     */
    foodPairings() {
      const items = this.beer.food_pairing;
      return items.slice(0, 3);
    }
  }
};
</script>

<style lang="scss">
.beer {
  display: flex;

  &__media {
    margin-right: 1rem;
  }

  &__img {
    max-width: 4rem;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__info {
    padding-right: 1rem;
  }

  &__name {
    margin-bottom: 0.25rem;
    font-size: 2rem;
  }

  &__tagline {
    font-size: 1.125rem;
  }

  &__abv {
    display: flex;
    flex-direction: column;
    min-width: 3.75rem;
  }

  &__abv-label {
    font-family: 'Oswald', sans-serif;
    text-align: center;
    text-transform: uppercase;
  }

  &__abv-percentage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.75rem;
    padding: 0.5rem;
    color: #fff;
    font-weight: 700;
    background-color: #000;
    border-radius: 50%;
  }

  &__description {
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
  }

  &__pairings-title {
    margin-bottom: 0.25rem;
    color: #00afdb;
  }

  &__pairings-list {
    font-size: 0.875rem;
  }
}
</style>
