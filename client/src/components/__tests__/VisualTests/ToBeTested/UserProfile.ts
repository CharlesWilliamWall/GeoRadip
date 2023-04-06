import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import UserProfile from '@/components/DrawerRight/User/UserProfile.vue';

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

/************************ UserProfile ****************************************** */
//TU1: test if UserProfile exists  and is visible
describe('Tests UserProfile Visual', () => {
  test('TU1: test if UserProfile exists and is visible', () => {
    //arrange
    const wrapper = mount(UserProfile);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    // console.log('TU9.1: UserProfile exists')

    expect(wrapper.isVisible()).toBe(true);
    // console.log('TU9.2: UserProfile is visible')
  });
  console.log('TU1: test if UserProfile exists and is visible');

  //TU2: test if UserProfile has the correct elements
  // test('TU2: test if UserProfile has the correct elements', () => {
  //   //arrange
  //   const wrapper = mount(UserProfile);

  //   //act
  //   wrapper.find('#addFriendBtn').trigger('click');
  //   wrapper.find('#editProfileBtn').trigger('click');
  //   wrapper.find('#logoutBtn').trigger('click');
  //   wrapper.find('#editProfileClseBtn').trigger('click');

  //   //assert
  //   expect(wrapper.find('#profileUsername').exists()).toBe(true);
  //   expect(wrapper.find('#profileUsername').isVisible()).toBe(true);

  //   expect(wrapper.find('#profileCity').exists()).toBe(true);
  //   expect(wrapper.find('#profileCity').isVisible()).toBe(true);

  //   expect(wrapper.find('#addFriendBtn').exists()).toBe(true);
  //   expect(wrapper.find('#addFriendBtn').isVisible()).toBe(true);

  //   expect(wrapper.find('#editProfileBtn').exists()).toBe(true);
  //   expect(wrapper.find('#editProfileBtn').isVisible()).toBe(true);

  //   expect(wrapper.find('#profileFriends').exists()).toBe(true);
  //   expect(wrapper.find('#profileFriends').isVisible()).toBe(true);

  //   expect(wrapper.find('#logoutBtn').exists()).toBe(true);
  //   expect(wrapper.find('#logoutBtn').isVisible()).toBe(true);
  // });
});
