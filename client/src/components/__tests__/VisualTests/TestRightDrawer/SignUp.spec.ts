import { describe, test, expect, beforeEach, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SignUp from '../../../DrawerRight/SignUp.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useUser } from '../../../../store/userStore';

//sanity check
console.log('sanity check');
describe('sanity check', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('sanity check', () => {
    //arrange
    const total = 1 + 1;

    //act
    //assert
    expect(total).toBe(2);
  });
});

/************************ SignUp ****************************************** */
//TU1: test if SignUp exists and is visible
describe('Tests SignUp Visual', () => {
  test('TU1: SignUp should exist and be visible', () => {
    //arrange
    const wrapper = mount(SignUp);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  test('TU2: SignUp should have the correct form', () => {
    //arrange
    const wrapper = mount(SignUp);
    const form = wrapper.find('#signUpForm');

    //act
    //assert
    expect(form.exists()).toBe(true);
    expect(form.isVisible()).toBe(true);
  });

  test('TU3: SignUp should have the correct form elements', () => {
    //arrange
    const wrapper = mount(SignUp);
    const form = wrapper.find('#signUpForm');

    //act
    //assert
    expect(form.find('#username').exists()).toBe(true);
    expect(form.find('#username').attributes('type')).toBe('text');

    expect(form.find('#emailUp').exists()).toBe(true);
    expect(form.find('#emailUp').attributes('type')).toBe('email');

    expect(form.find('#passwordUp').exists()).toBe(true);
    expect(form.find('#passwordUp').attributes('type')).toBe('password');

    expect(form.find('#passwordUpC').exists()).toBe(true);
    expect(form.find('#passwordUpC').attributes('type')).toBe('password');

    expect(form.find('#createAccountBtn').exists()).toBe(true);
    expect(form.find('#createAccountBtn').isVisible()).toBe(true);
  });

  test('TU4: SignUn should have the correct error message on submitting form with error', () => {
    const user = useUser();
    user.error = true;
    //arrange
    const wrapper = mount(SignUp);
    const form = wrapper.find('#signUpForm');
    const loginBtn = form.find('#createAccountBtn');
    const error1 = form.find('#error1');

    //act
    loginBtn.trigger('click');

    //assert
    expect(user.error).toBe(true);
    expect(error1.text()).toBe('Email already in use');
    expect(error1.isVisible()).toBe(true);
  });
});
