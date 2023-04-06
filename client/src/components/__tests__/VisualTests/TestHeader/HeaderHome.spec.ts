import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import HeaderHome from '../../../header/HeaderHome.vue';

//sanity check
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

/************************ HeaderHome ****************************************** */
describe('Tests HeaderHome Visual', () => {
  test('TU1: HeaderHome should exist and be visible', () => {
    //arrange
    const wrapper = mount(HeaderHome);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  test('TU2: HeaderHome should have a visible menu button', () => {
    //arrange
    const wrapper = mount(HeaderHome);
    const leftMenuBtn = wrapper.find('#leftMenuBtn');
    console.log('leftMenuBtn', leftMenuBtn);

    //act
    leftMenuBtn.trigger('click');

    //assert
    expect(leftMenuBtn.exists()).toBe(true);
    expect(leftMenuBtn.isVisible()).toBe(true);
  });

  test('TU3: HeaderHome should have a visible logo', () => {
    //arrange
    const wrapper = mount(HeaderHome);

    //act
    //assert
    expect(wrapper.find('#logo').exists()).toBe(true);
    expect(wrapper.find('#logo').isVisible()).toBe(true);
  });

  test('TU4: HeaderHome should have a visible search bar input', () => {
    //arrange
    const wrapper = mount(HeaderHome);

    //act
    //assert
    expect(wrapper.find('#searchBar').exists()).toBe(true);
    expect(wrapper.find('#searchBar').isVisible()).toBe(true);
    expect(wrapper.find('#searchBar').attributes('type')).toBe('text');
    expect(wrapper.find('#searchBar').attributes('placeholder')).toBe('Enter a location');
  });

  //TU5: test if headerHome has a search button
  test('TU5: HeaderHome should have a visible account button', () => {
    //arrange
    const wrapper = mount(HeaderHome);

    //act
    wrapper.find('#accountBtn').trigger('click');

    //assert
    expect(wrapper.find('#accountBtn').exists()).toBe(true);
    expect(wrapper.find('#accountBtn').isVisible()).toBe(true);
  });
});
