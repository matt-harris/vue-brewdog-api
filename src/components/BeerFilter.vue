<template>
  <div class="beer-filter">
    <label class="beer-filter__label">{{ label }}</label>
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'BeerFilter',
  props: {
    label: String
  }
};
</script>

<style lang="scss">
.beer-filter {
  padding: 1rem;
  color: #fff;
  background: #00afdb;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.25rem;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__input {
    width: 100%;
    padding: 0.5rem;
    border: 0.125rem solid #000;

    &--select {
      height: 2.0625rem;
    }
  }
}
</style>
