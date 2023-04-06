<script lang="ts" setup>
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import { useDrawerStore } from '@/store/drawerStore'
import SignIn from '../../SignIn.vue';
import SignUp from '../../SignUp.vue';
import { Icon } from '@iconify/vue';
import ButtonGradient from '@/components/utils/Buttons/ButtonGradient.vue';
import router from '@/router'

onMounted(() => {
  initFlowbite();
});

const drawerStore = useDrawerStore()

let signInOpen = drawerStore.SignInOpen
let signUpOpen = drawerStore.SignUpOpen

const toggleSignIn = () => {
  signInOpen = !signInOpen
  if (signInOpen === true) {
    router.push('/signin')
  } else {
    router.push('/')
  }
}

const toggleSignUp = () => {
  signUpOpen = !signUpOpen
  if (signUpOpen === true) {
    router.push('/signup')
  } else {
    router.push('/')
  }
  console.log(signUpOpen)
}
</script>
<template>
<div id="avatarButton" type="button" data-dropdown-toggle="userDropdown2" data-dropdown-placement="bottom-start" data-drawer-backdrop="false" class="cursor-pointer flex justify-center items-center">
  <Icon icon="healthicons:ui-user-profile-outline" class="h-6 w-6 sm:h-10 sm:w-10" />
</div>
<div id="userDropdown2" class="z-10 hidden bg-slate-100 text-[#616161] divide-y divide-gray-100 rounded-lg shadow w-44 border-2">
    <div class="px-4 py-3 text-sm">
      <div class="font-medium truncate">Sign in options</div>
    </div>
    <ul class="py-2 text-sm" aria-labelledby="avatarButton">
      <li>
        <div class="text-center py-2">
            <ButtonGradient @click="toggleSignIn" id="signInBtn" data-drawer-target="drawer-top-signin" data-drawer-toggle="drawer-top-signin" data-drawer-placement="right" data-drawer-backdrop="false" aria-controls="drawer-top-signin">
                <span>Sign in</span>
            </ButtonGradient>
        </div>
      </li>
      <li>
        <div class="text-center py-4">
            <ButtonGradient @click="toggleSignUp" id="signUpBtn" data-drawer-backdrop="false" data-drawer-target="drawer-top-signup" data-drawer-toggle="drawer-top-signup" data-drawer-placement="right" aria-controls="drawer-top-signup">
                <span>Sign up</span>
            </ButtonGradient>
        </div>
      </li>
    </ul>
</div>
    <div id="drawer-top-signin" class="fixed border-4 border-white bg-slate-100 text-[#616161] top-16 w-80 z-20 p-4 transition-transform translate-x-full" tabindex="-1" aria-labelledby="drawer-top-label-signin">
        <button @click.prevent="toggleSignIn" type="button" data-drawer-hide="drawer-top-signin" aria-controls="drawer-top-signin" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
        </button>
        <SignIn />
  </div>

  <div id="drawer-top-signup" class="fixed border-4 border-white bg-slate-100 text-[#616161] top-16 w-80 z-20 p-4 transition-transform translate-x-full" tabindex="-1" aria-labelledby="drawer-top-label-signup">
    <button @click.prevent="toggleSignUp" type="button" data-drawer-backdrop="false" data-drawer-hide="drawer-top-signup" aria-controls="drawer-top-signup" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Close menu</span>
    </button>
    <SignUp />
  </div>
</template>
