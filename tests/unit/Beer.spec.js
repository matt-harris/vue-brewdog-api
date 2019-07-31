import { shallowMount } from '@vue/test-utils';
import Beer from '@/components/Beer';

// Beer object from api to test against.
const beer = {
  id: 192,
  name: 'Punk IPA 2007 - 2010',
  tagline: 'Post Modern Classic. Spiky. Tropical. Hoppy.',
  description:
    "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
  image_url: 'https://images.punkapi.com/v2/192.png',
  abv: 6,
  food_pairing: [
    'Spicy carne asada with a pico de gallo sauce',
    'Shredded chicken tacos with a mango chilli lime salsa',
    'Cheesecake with a passion fruit swirl sauce',
    'We only want to show three food pairings, our computed property should remove it',
  ],
};

// https://lmiller1990.github.io/vue-testing-handbook/components-with-props.html#refactor-with-a-factory-function
const factory = (propsData) => {
  return shallowMount(Beer, {
    propsData: {
      beer,
      ...propsData,
    },
  });
};

describe('Beer', () => {
  it('renders without errors', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('renders beer image attributes', () => {
    const wrapper = factory();
    expect(wrapper.find('.beer__img').attributes('src')).toBe(
      'https://images.punkapi.com/v2/192.png',
    );
    expect(wrapper.find('.beer__img').attributes('alt')).toBe(beer.name);
  });

  it('renders beer.name', () => {
    const wrapper = factory();
    expect(wrapper.find('.beer__title').text()).toBe(beer.name);
  });

  it('renders beer.tagline', () => {
    const wrapper = factory();
    expect(wrapper.find('.beer__tagline').text()).toBe(beer.tagline);
  });

  it('renders beer.abv', () => {
    const wrapper = factory();
    expect(wrapper.find('.beer__abv-percentage').text()).toBe(beer.abv + '%');
  });

  it('renders beer.description', () => {
    const wrapper = factory();
    expect(wrapper.find('.beer__description').text()).toBe(beer.description);
  });

  it('renders the first three beer.food_pairing items', () => {
    const wrapper = factory();
    const listItems = wrapper.findAll('.beer__pairings-item');
    expect(listItems).toHaveLength(3);
  });
});
