import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import AvatarProfile from '../../../../../DrawerRight/User/Avatar/AvatarProfile.vue';

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

// /************************ AvatarProfile****************************************** */
//TU1: test if AvatarProfile exists  and is visible
describe('Tests AvatarProfile Visual', () => {
  test('TU1: test if AvatarProfile exists and is visible', () => {
    //arrange
    const wrapper = mount(AvatarProfile);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    // console.log('TU9.1: AvatarProfile exists')

    expect(wrapper.isVisible()).toBe(true);
    // console.log('TU9.2: AvatarProfile is visible')
  });
  console.log('TU1: test if AvatarProfile exists and is visible');

  //TU2: test if AvatarProfile has the correct elements
  test('TU2: test if AvatarProfile has the correct elements', () => {
    //arrange
    const wrapper = mount(AvatarProfile);

    //act
    //assert
    expect(wrapper.find('#avatarPlaceholder').exists()).toBe(true);
    expect(wrapper.find('#avatarPlaceholder').isVisible()).toBe(true);
  });
});
