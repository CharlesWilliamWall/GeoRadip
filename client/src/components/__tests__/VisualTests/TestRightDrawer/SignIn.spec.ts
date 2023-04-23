import SignIn from '../../../DrawerRight/SignIn.vue';
import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUser } from '../../../../store/userStore';

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

/************************ SignIn ****************************************** */
describe('Tests SignIn Visual', () => {
  test('TU1: SignIn should exist and be visible', () => {
    //arrange
    const wrapper = mount(SignIn);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  test('TU2: SignIn should have a form', () => {
    //arrange
    const wrapper = mount(SignIn);
    const form = wrapper.find('#signInForm');

    //act
    //assert
    expect(form.exists()).toBe(true);
    expect(form.isVisible()).toBe(true);
  });

  test('TU3: SignIn should have the correct form elements', () => {
    //arrange
    const wrapper = mount(SignIn);
    const form = wrapper.find('#signInForm');

    //act
    //assert
    expect(form.find('#emailIn').exists()).toBe(true);
    expect(form.find('#emailIn').isVisible()).toBe(true);
    expect(form.find('#emailIn').attributes('type')).toBe('email');

    expect(form.find('#passwordIn').exists()).toBe(true);
    expect(form.find('#passwordIn').attributes('type')).toBe('password');

    expect(form.find('#loginBtn').exists()).toBe(true);
    expect(form.find('#loginBtn').isVisible()).toBe(true);
  });

  test('TU4: SignIn should have the correct error message on submitting form with error', () => {
    const user = useUser();
    user.error = true;
    //arrange
    const wrapper = mount(SignIn);
    const form = wrapper.find('#signInForm');
    const loginBtn = form.find('#loginBtn');
    const error = form.find('#error');

    //act
    loginBtn.trigger('click');

    //assert
    expect(user.error).toBe(true);
    expect(error.text()).toBe('Email or password is incorrect');
    expect(error.isVisible()).toBe(true);
  });
});
