import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RightDrawer from '../../../DrawerRight/DrawerRight.vue';
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

/************************ RightDrawer ****************************************** */
describe('Tests RightDrawer Visual', () => {
  test('TU1: RightDrawer should exist and be visible', () => {
    //arrange
    const wrapper = mount(RightDrawer);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  test('TU2: RightDrawer should open the correct menu', () => {
    //arrange
    const wrapper = mount(RightDrawer);

    //act
    //assert
    expect(wrapper.find('#signInBtn').exists()).toBe(true);
    expect(wrapper.find('#signInBtn').isVisible()).toBe(true);

    expect(wrapper.find('#signUpBtn').exists()).toBe(true);
    expect(wrapper.find('#signUpBtn').isVisible()).toBe(true);
  });
});
