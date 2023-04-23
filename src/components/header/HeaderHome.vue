<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUser } from '@/store/userStore';
import { Icon } from '@iconify/vue';
import SearchBar from './SearchBar.vue';
import { initDrawers } from 'flowbite';
import DrawerLeft from '@/components/DrawerLeft/DrawerLeft.vue';
import DrawerRight from '@/components/DrawerRight/DrawerRight.vue';
import UserProfile from '../DrawerRight/User/UserProfile.vue';
import AvatarProfile from '../DrawerRight/User/Avatar/AvatarProfile.vue';
import AvatarGuest from '../DrawerRight/User/Avatar/AvatarGuest.vue';

onMounted(() => {
  initDrawers();
});

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const user = useUser();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <header class="shadow-lg relative h-16 z-40">
    <div as="nav" class="bg-slate-100 text-[#616161]">
      <div class="mx-auto px-2 sm:px-6 lg:px-4">
        <div class="relative flex flex-row h-16 items-center justify-between">
          <div class="flex basis-1/4 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <div class="text-center">
                <button
                  @click="toggleLeftDrawer"
                  id="leftMenuBtn"
                  type="button"
                  data-drawer-target="drawer-left-example"
                  data-drawer-toggle="drawer-left-example"
                  data-drawer-placement="left"
                  data-drawer-backdrop="false"
                  aria-controls="drawer-left-example"
                >
                  <Icon icon="clarity:bars-line" class="h-6 w-6 sm:h-10 sm:w-10" />
                </button>
              </div>
            </div>
            <div class="pl-2 sm:pl-8">
              <h1
                class="text-xl font-extrabold text-gray-900 dark:text-white sm:text-2xl md:text-3xl lg:text-4xl"
              >
                <span
                
                  class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
                  >GeoRadio</span
                >
              </h1>
            </div>
          </div>
            <SearchBar />
          <div class="flex basis-1/4 justify-end items-center">
            <div class="text-center px-12">
              <div v-if="!user.isAuthenticated">
                <AvatarGuest />
              </div>
                <div v-else>
                  <AvatarProfile />
                </div>
            </div>
            <div class="flex px-4">
              <button
                    @click.prevent="toggleRightDrawer"
                    id="accountBtn"
                    type="button"
                    data-drawer-target="drawer-right-example"
                    data-drawer-toggle="drawer-right-example"
                    data-drawer-placement="right"
                    data-drawer-backdrop="false"
                    aria-controls="drawer-right-example"
                  >
                <Icon icon="ic:baseline-menu-open" class="h-6 w-6 sm:h-10 sm:w-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div
    id="drawer-left-example"
    class="flex flex-col bg-slate-100 text-[#616161] text-center w-80 fixed top-16 left-0 z-20 h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hovered:gray-500 transition-transform -translate-x-full"
    tabindex="-1"
    aria-labelledby="drawer-left-label"
  >
    <button
      @click="toggleLeftDrawer"
      type="button"
      data-drawer-hide="drawer-left-example"
      aria-controls="drawer-left-example"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <DrawerLeft />
  </div>

  <div
    id="drawer-right-example"
    class="flex flex-col bg-slate-100 text-[#616161] text-center w-80 fixed top-16 right-0 z-20 p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hovered:gray-500 transition-transform translate-x-full"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <button
      @click="toggleRightDrawer"
      type="button"
      data-drawer-hide="drawer-right-example"
      aria-controls="drawer-right-example"
      class="text-gray-400 bg-transparent mr-4 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <UserProfile v-if="user.isAuthenticated" />
    <DrawerRight v-if="!user.isAuthenticated" />
  </div>
</template>
