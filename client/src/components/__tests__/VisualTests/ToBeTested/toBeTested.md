/****************MAP****************** */

import { describe, test, expect, beforeEach } from 'vitest';
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

/************************ Map ****************************************** */
//needs to be mocked


/****************EDITPROFILE****************** */
import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LeftDrawer from '../../../DrawerLeft/DrawerLeft.vue';
import { createPinia, setActivePinia } from 'pinia';

function easyTest() {
  const isTrue = true;
  const isFalse = false;
  if (isTrue) {
    return 'test passed'.toUpperCase() || true;
  }
  if (isFalse) {
    return 'test failed'.toUpperCase || false;
  }
}

//sanity check
console.log('sanity check', easyTest());
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
//TU1: test if leftDrawer exists
describe('Tests LeftDrawer Visual', () => {
  test('TU1: test if leftDrawer exists and is visible', () => {
    //arrange
    const wrapper = mount(LeftDrawer);

    //act
    //assert
    expect(wrapper.exists()).toBe(true);
    // console.log('TU7.1: leftDrawer exists')

    expect(wrapper.isVisible()).toBe(true);
    // console.log('TU7.2: leftDrawer is visible')
  });
  console.log('TU7: test if leftDrawer exists and is visible', easyTest());

  //TU2: test if leftDrawer opens the correct menu
  test('TU2: test if leftDrawer opens the correct menu', () => {
    //arrange
    const wrapper = mount(LeftDrawer);

    //act
    //assert
    expect(wrapper.find('#LMRandomizer').isVisible()).toBe(true);
  });
});

/******************PARTIALBACKUP****************** */
import { describe, test, expect, beforeEach } from 'vitest';
//import { mount } from '@vue/test-utils';
//import HeaderHome from '../../header/HeaderHome.vue';
//import LeftDrawer from '../drawer/LeftDrawer.vue'
//import RightDrawer from '../../DrawerRight/DrawerRight.vue';
//import SignIn from '../../DrawerRight/SignIn.vue';
//import SignUp from '../../DrawerRight/SignUp.vue';
import { createPinia, setActivePinia } from 'pinia';

// function easyTest() {
//   const isTrue = true;
//   const isFalse = false;
//   if (isTrue) {
//     return 'test passed'.toUpperCase() || true;
//   }
//   if (isFalse) {
//     return 'test failed'.toUpperCase || false;
//   }
// }

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

// /************************ HeaderHome ****************************************** */
// // //TU1: test if headerHome exists
// // describe('TU1: test if headerHome existence and visibility', () => {
// //   test('existence and visibility of headerHome', () => {
// //     //arrange
// //     const wrapper = mount(HeaderHome);

// //     //act
// //     //assert
// //     expect(wrapper.exists()).toBe(true);
// //     // console.log('TU1.1: headerHome exists')

// //     expect(wrapper.isVisible()).toBe(true);
// //     // console.log('TU1.2: headerHome is visible')
// //   });
// // });
// // console.log('TU1: test if headerHome exists and is visible', easyTest());

// // //TU2: test if headerHome has a menu button and a left drawer
// // //left menu
// // describe('TU2: test if headerHome has a menu button and a left drawer', () => {
// //   test('existence and visibility of headerHome left menu', () => {
// //     //arrange
// //     const wrapper = mount(HeaderHome);
// //     const leftMenuBtn = wrapper.find('#leftMenuBtn');
// //     console.log('leftMenuBtn', leftMenuBtn);
// //     const leftDrawer = wrapper.find('#leftDrawer');

// //     //act
// //     leftMenuBtn.trigger('click').then(() => {
// //       expect(wrapper.find('#leftDrawer').exists()).toBe(true),
// //         //console.log('TU2.1: headerHome left drawer exists')

// //         expect(leftDrawer.isVisible()).toBe(true),
// //         //console.log('TU2.2: headerHome left drawer is visible when left menu is clicked')

// //         expect(leftDrawer.find('#LMRandomizer').isVisible()).toBe(true);
// //       //console.log('TU2.3: headerHome left drawer randomizer title is visible when left menu is clicked')

// //       wrapper.find('#leftMenuBtn').trigger('click');
// //       //console.log('TU2.4: headerHome left drawer is hidden when left menu is clicked again')
// //     });

// //     //assert
// //     expect(wrapper.find('#leftMenuBtn').exists()).toBe(true);
// //     //console.log('TU2.4: headerHome left menu exists')

// //     expect(wrapper.find('#leftMenuBtn').isVisible()).toBe(true);
// //     //console.log('TU2.5: headerHome left menu is visible')
// //   });
// // });
// // console.log('TU2: test if headerHome has a menu button and a left drawer', easyTest());

// //TU3: test if headerHome has a logo button linked to home page
// describe('TU3: test if headerHome has a logo button linked to home page', () => {
//   test('existence and visibility of functionning headerHome logo', () => {
//     //arrange
//     const wrapper = mount(HeaderHome);
//     const logo = wrapper.find('#logo');
//     const logoBtn = wrapper.find('#logoBtn');

//     //act
//     logoBtn.trigger('click');

//     //assert
//     expect(logo.exists()).toBe(true);
//     // console.log('TU3.1: headerHome logo exists')

//     expect(logo.isVisible()).toBe(true);
//     // console.log('TU3.2: headerHome logo is visible')
//   });
// });
// console.log('TU3: test if headerHome has a logo button linked to home page', easyTest());

// //TU4: test if headerHome has a search bar with a text input
// describe('TU4: test if headerHome has a search bar with a text input', () => {
//   test('existence and visibility of a headerHome search bar', () => {
//     //arrange
//     const wrapper = mount(HeaderHome);
//     const searchBar = wrapper.find('#searchBar');
//     //const inPlaceholder = wrapper.find('#searchBar').attributes('placeholder')

//     //act
//     searchBar.trigger('input');

//     //assert
//     expect(searchBar.exists()).toBe(true);
//     //console.log('TU4.1: headerHome search bar exists')

//     expect(searchBar.isVisible()).toBe(true);
//     //console.log('TU4.2: headerHome search bar is visible')

//     expect(wrapper.find('#searchBar').attributes('type')).toBe('text');
//     //console.log('TU4.3: headerHome search bar is a text input')

//     expect(wrapper.find('#searchBar').attributes('placeholder')).toBe('Enter a location');
//     //console.log('TU4.4: headerHome search bar placeholder is correct')
//   });
// });
// console.log('TU4: test if headerHome has a search bar with a text input', easyTest());

// //TU5: test if headerHome has a piano button linked to music page
// describe('TU5: test if headerHome has a piano button linked to music page', () => {
//   test('existence and visibility of a headerHome piano', () => {
//     //arrange
//     const wrapper = mount(HeaderHome);
//     const pianoBtn = wrapper.find('#pianoBtn');

//     //act
//     pianoBtn.trigger('click');

//     //assert
//     expect(pianoBtn.exists()).toBe(true);
//     //console.log('TU5.1: headerHome piano button exists')

//     expect(pianoBtn.isVisible()).toBe(true);
//     //console.log('TU5.2: headerHome piano button is visible')
//   });
// });
// console.log('TU5: test if headerHome has a piano button linked to music page', easyTest());

// //TU6: test if headerHome has an account button and a right drawer
// //Account (rightDrawer)
// describe('TU6: test if headerHome has an account button and a right drawer', () => {
//   test('existence and visibility of functionning headerHome right menu', () => {
//     //arrange
//     const wrapper = mount(HeaderHome);
//     const account = wrapper.find('#account');
//     //const rightDrawer = wrapper.find('#rightDrawer')

//     //act
//     account.trigger('click');

//     //assert
//     expect(wrapper.find('#account').exists()).toBe(true);
//     //console.log('TU6.1: headerHome account button exists')

//     expect(wrapper.find('#account').isVisible()).toBe(true);
//     //console.log('TU6.2: headerHome account button is visible')

//     //wrapper.emitted()
//   });
// });
// console.log('TU6: test if headerHome has an account button and a right drawer', easyTest());

// /************************* RIGHTDRAWER ************************************ */
// //Sign in (rightDrawer)
// //TU7: test if right drawer has a sign in button
// describe('TU7: test if there is a functionning sign in BUTTON in right drawer', () => {
//   test('existence and visibility of a functionning sign in BUTTON in right drawer', () => {
//     //arrange
//     const wrapper = mount(RightDrawer);
//     const signInBtn = wrapper.find('#signInBtn');

//     //act
//     signInBtn.trigger('click');

//     //assert
//     expect(signInBtn.exists()).toBe(true);
//     //console.log('TU7.1: right drawer sign in button exists')

//     expect(signInBtn.isVisible()).toBe(true);
//     //console.log('TU7.2: right drawer sign in button is visible')
//   });
// });
// console.log('TU7: test if there is a functionning sign up button in right drawer', easyTest());

// //Sign up (rightDrawer)
// //TU8: test if right drawer has a functionning sign up button
// describe('TU8: test if there is a functionning sign in FORM in right drawer', () => {
//   test('existence and visibility of a functionning sign in FORM in right drawer', () => {
//     //arrange
//     const wrapper = mount(SignIn);
//     const signInForm = wrapper.find('#signInForm');
//     const signInBtn = wrapper.find('#signInBtn');

//     //act
//     signInBtn.trigger('click');

//     //assert
//     expect(signInForm.exists()).toBe(true);
//     //console.log('TU9.1: right drawer sign up form exists')

//     expect(signInForm.isVisible()).toBe(true);
//     //console.log('TU9.2: right drawer sign up form is visible')

//     expect(wrapper.find('#signInForm').exists()).toBe(true);
//     //console.log('TU9.3: right drawer sign up form is visible')

//     /*++expect(wrapper.find('#username').attributes('type')).toBe('input')*/

//     expect(wrapper.find('#email').exists()).toBe(true);
//     //console.log('TU9.4: right drawer sign up form exists')

//     expect(wrapper.find('#email').attributes('type')).toBe('email');
//     //console.log('TU9.5: right drawer sign up form email input is correct')

//     expect(wrapper.find('#password').attributes('type')).toBe('password');
//     //console.log('TU9.5: right drawer sign up form email input is correct')

//     //expect(wrapper.find('#closeBtn').isVisible()).toBe(true)
//     //console.log('TU9.6: right drawer sign up form close button exists')
//   });
// });
// console.log('TU8: test if there is a functionning sign up BUTTON in right drawer', easyTest());

// //TU9: test if right drawer has a functionning sign up form
// //Sign up form (rightDrawer)
// describe('TU9: test if there is a functionning sign up BUTTON in right drawer', () => {
//   test('the sign up BUTTON in right drawer is functionning', () => {
//     //arrange
//     const wrapper = mount(SignUp);

//     //act
//     wrapper.trigger('click');

//     //assert
//     expect(wrapper.exists()).toBe(true);
//     //console.log('TU9.1: right drawer sign up form exists')

//     expect(wrapper.isVisible()).toBe(true);
//     //console.log('TU9.2: right drawer sign up form is visible')
//   });
// });

// //TU10 test if right drawer has a functionning sign up form
// //Sign up form (rightDrawer)
// describe('TU9: test if there is a functionning sign up FORM in right drawer', () => {
//   test('the sign up FORM in right drawer is functionning', () => {
//     //arrange
//     const wrapper = mount(SignUp);

//     //act
//     wrapper.trigger('click');

//     //assert
//     expect(wrapper.exists()).toBe(true);
//     //console.log('TU9.1: right drawer sign up form exists')

//     expect(wrapper.isVisible()).toBe(true);
//     //console.log('TU9.2: right drawer sign up form is visible')

//     expect(wrapper.find('#signUpForm').exists()).toBe(true);
//     //console.log('TU9.3: right drawer sign up form is visible')

//     expect(wrapper.find('#email').exists()).toBe(true);
//     //console.log('TU9.4: right drawer sign up form exists')

//     expect(wrapper.find('#username').attributes('type')).toBe('text');
//     //console.log('TU9.5: right drawer sign up form email input is correct')

//     expect(wrapper.find('#email').attributes('type')).toBe('email');
//     //console.log('TU9.5: right drawer sign up form email input is correct')

//     expect(wrapper.find('#password').attributes('type')).toBe('password');
//     //console.log('TU9.5: right drawer sign up form email input is correct')

//     expect(wrapper.find('#confirmPassword').attributes('type')).toBe('password');
//     //console.log('TU9.5: right drawer sign up form email input is correct')
//   });
// });
// //
// //
// //
// //

// /************************* OTHER STUFF ************************************ */
// /* à faire
// menu gauche

// logo

// search bar => pas fonctionnelle encore

// piano (path to / music)

// music => mute

// music => volume up/down

// menu droite

// sign in

// signup

// carte => mouse scroll (zoom in/out)

// carte => mouse lmb to drag and move map
// */

// /*//TU2: test if headerHome has a menu
// //left menu
// console.log('TU2: test if headerHome has a functionning menu', easyTest())
// describe('headerHome left menu', () => {
//   test('existence and visibility of functionning headerHome left menu', () => {
//     //arrange
//     const wrapper = mount(HeaderHome)
//     const leftDrawer = wrapper.find('#leftDrawer')
//     const leftMenuBtnOpen = wrapper.find('#leftMenuBtnOpen')

//     //act
//     leftMenuBtnOpen.trigger('click')

//     //assert
//     expect(wrapper.find('#leftMenuBtn').exists()).toBe(true)
//     console.log('TU2.1: headerHome left menu exists')

//     expect(leftDrawer.isVisible()).toBe(true)
//     console.log('TU2.4: headerHome left menu is visible')
//   })
// })

//     //arrange
//     const wrapper = mount(HeaderHome)
//     const searchBar = wrapper.find('#searchBar')
//     const IsText = wrapper.find('#searchBar').text()
//     const inPlaceholder = wrapper.find('#searchBar').attributes('placeholder')

//     //act
//     searchBar.trigger('click')

//     //assert
//     expect(searchBar.exists()).toBe(true)
//     console.log('TU3.1: headerHome search bar exists')

//     expect(IsText).toBe('')
//     console.log('TU3.2: headerHome search bar is empty')

//     expect(inPlaceholder).toBe('Enter a location')
//     console.log('TU3.3: headerHome search bar placeholder is correct')
//   })
// })*/

/******************AVATARPROFILE************************ */
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

