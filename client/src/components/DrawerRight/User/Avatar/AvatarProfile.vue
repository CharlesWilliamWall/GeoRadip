<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import { signOut } from '@/shared/services/auth.service';
import { useUser } from '@/store/userStore';

const user = useUser();
const username = user.currentUser?.name;

const userEmail = user.currentUser?.email;

// show the first two letters of the username
const avatar = ref(username?.slice(0, 2).toUpperCase());

onMounted(() => {
  initFlowbite();
});

const signOutUser = () => {
  signOut();
  window.location.reload();
};

const colors = [
  'bg-red-400',
  'bg-orange-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-teal-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-gray-400',
  'bg-black',
  'bg-pink-400',
  'bg-teal-400',
  'bg-blue-400',
  'bg-indigo-400',

];

const newColor = ref(user.currentUser?.profilePicture);

const saveColor =  (color: string) => {
   user.updateProfilePicture(user.currentUser?.name, newColor.value = color);
};

</script>
<template>
<!-- <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-12 h-12 rounded-full cursor-pointer" src="../../../../assets/image/Screenshot_20191210-130559_Messenger.jpg" alt="User dropdown"> -->
<div id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" data-drawer-backdrop="false" :class="newColor" class="select-none w-10 h-10 rounded-full cursor-pointer flex justify-center items-center font-semibold text-white">
  {{ avatar  }}
</div>

<div id="userDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div class="font-medium truncate"> {{ userEmail }}</div>
    </div>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
      <p>change color</p>
      <div class="flex flex-wrap justify-center">
        <li v-for="color in colors" :key="color" class="w-6 h-6 rounded-full m-1" :class="color" @click="saveColor(color)"></li>
      </div>
      <!-- <p>add a picture</p> -->
    </ul>
    <div class="py-3">
      <router-link to="/">
        <button
          @click="signOutUser"
          class="px-8  py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
          id="logoutBtn"
        >
          <span>Sign out</span>
        </button>
      </router-link>
    </div>
</div>
</template>
