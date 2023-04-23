import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LeftDrawer from '../../../DrawerLeft/DrawerLeft.vue';
import { createPinia, setActivePinia } from 'pinia';

//sanity check
console.log('sanity check');
describe('sanity check', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test('sanity check', () => {
    //arrange
    const total = 1 + 1;

    //act
    //assert
    expect(total).toBe(2);
  });
});

/************************ LeftDrawer ****************************************** */
describe('Tests LeftDrawer Visual', () => {
  test('TU1: LeftDrawer should exist and be visible', () => {
    //arrange
    const wrapper = mount(LeftDrawer);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  test('TU2: LeftDrawer should open the correct menu', () => {
    //arrange
    const wrapper = mount(LeftDrawer);

    //act
    //assert
    expect(wrapper.find('#randomizer').exists()).toBe(true);
    expect(wrapper.find('#randomizer').isVisible()).toBe(true);
  });
});
