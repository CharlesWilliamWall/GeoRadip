<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { UserFormInterface } from '../../shared/interface/User.interface';
//import type { PointInterface } from '../../shared/interface/Point.interface'
import { useUser } from '../../store/userStore';
import { useDrawerStore } from '../../store/drawerStore';
//import { savePoint } from '../../shared/services/point.service'
import ButtonGradient from '../utils/Buttons/ButtonGradient.vue';

const user = useUser();
const drawerStore = useDrawerStore();
const router = useRouter();

const isMatch = computed(() => {
  if (state.password !== state.confirmPassword) {
    return false;
  } else {
    return true;
  }
});

const color = user.randomColor();

const state = reactive<UserFormInterface>({
  name: '',
  email: '',
  password: undefined,
  confirmPassword: undefined,
  profilePicture: color,
});

const signUp = async () => {
  await user.createUser({ ...state });
  if (!user.error) {
    drawerStore.SignUpOpen = false;
    router.push('/profile');
  } else console.log(user.error);
};

const removeError = () => {
  user.error = false;
};
</script>

<template>
  <div class="bg-slate-50 text-[#616161] rounded-lg shadow dark:bg-gray-700">
    <div class="px-6 py-6 lg:px-8">
      <form class="space-y-6" v-if="!user.isAuthenticated" id="signUpForm">
        <input
          type="text"
          name="username"
          id="username"
          autocomplete="username"
          class="bg-gray-5 0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="username"
          required
          v-model="state.name"
        />
        <div>
          <input
            type="email"
            name="email"
            id="emailUp"
            autocomplete="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
            v-model="state.email"
            @input="removeError"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="passwordUp"
            autocomplete="new-password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            v-model="state.password"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="passwordUpC"
            autocomplete="new-password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            v-model="state.confirmPassword"
          />
        </div>
        <div v-if="!isMatch">
        <p id="error1" class="text-red-500">Passwords do not match</p>
        <ButtonGradient disabled id="createAccountBtn"> Sign up </ButtonGradient>
      </div>
      <div v-else-if="user.error">
        <p id="error2" class="text-red-500">valid email or username is required</p>
        <ButtonGradient disabled id="createAccountBtn"> Sign up </ButtonGradient>
      </div>
      <div v-else>
        <ButtonGradient @click.prevent="signUp()" id="createAccountBtn"> Sign up </ButtonGradient>
      </div>
      </form>
    </div>
  </div>
</template>
