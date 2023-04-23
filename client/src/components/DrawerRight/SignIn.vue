<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { SigninFormInterface } from '../../shared/interface/User.interface';
import { useUser } from '../../store/userStore';
import { useDrawerStore } from '../../store/drawerStore';
import ButtonGradient from '../utils/Buttons/ButtonGradient.vue';

const user = useUser();
const router = useRouter();
const drawerStore = useDrawerStore();
const state = reactive<SigninFormInterface>({
  email: '',
  password: ''
});

const signIn = async () => {
  await user.signIn({ ...state });
  if (!user.error) {
    drawerStore.SignInOpen = false;
    router.push('/profile');
  } else {
    console.log(user.error);
  }
};
</script>

<template>
  <div class="bg-slate-50 text-[#616161] rounded-lg shadow dark:bg-gray-700">
    <div class="px-6 py-6 lg:px-8">
      <form id="signInForm" class="space-y-6" v-if="!user.isAuthenticated">
        <input
          v-model="state.email"
          type="email"
          name="email"
          id="emailIn"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
        />
        <input
          id="passwordIn"
          v-model="state.password"
          type="password"
          name="password"
          autocomplete="off"
          placeholder="Mot de passe"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
        <p v-if="user.error" id="error" class="text-red-600">Email or password is incorrect</p>
        <ButtonGradient @click.prevent="signIn" id="loginBtn"> Login </ButtonGradient>
      </form>
    </div>
  </div>
</template>
