<script setup lang="ts">
import { onMounted,  computed } from 'vue';
import AvatarUsers from './Avatar/AvatarUsers.vue';
import AvatarFollower from './Avatar/AvatarFollower.vue';
import AvatarFollowee from './Avatar/AvatarFollowee.vue';
import SharePost from './sharing/SharePost.vue';
import SharedPost from './sharing/SharedPost.vue';
import { useDrawerStore } from '@/store/drawerStore';
import { useUser } from '@/store/userStore';
const userStore = useUser();
const drawerStore = useDrawerStore();

onMounted(() => {
  drawerStore.SignInOpen = false;
});

const followersCount = computed(() => {
  return userStore.currentUser?.followers?.length;
});

const followeesCount = computed(() => {
  return userStore.currentUser?.followees?.length;
});
</script>
<template>
  <div class="flex flex-col w-full max-w-sm pb-12 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hovered:gray-500">
    <p class="font-semibold border-b-2 text-xl mr-4">New views</p>
    <div class="w-full max-w-sm flex flex-col basis-1/3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hovered:gray-500">
      <SharedPost />
    </div>
    <div class="py-4 w-full max-w-sm flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hovered:gray-500">
      <div class="flex flex-row justify-around items-center">
        <SharePost />
      </div>
    </div>
    <div class="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hovered:gray-500">
      <div v-if="userStore.newUsers.length > 0" class="flex flex-col">
        <p class="font-semibold text-xl mb-2 border-t-2 mr-4">Users</p>
        <div class="grid grid-cols-5 gap-2">
          <AvatarUsers />
        </div>
      </div>
      <div class="flex flex-col mr-4 pt-4">
        <div class="flex flex-col bg-slate-200 border-2 rounded-xl my-4">
            <span class="text-sm text-gray-500">Followers</span>
            <span class="text-md font-medium text-gray-900">{{ followersCount }}</span>
            <div class="grid grid-cols-4 gap-2 mb-2 ml-2"><AvatarFollower /></div>
        </div>
        <div class="flex flex-col bg-slate-200 border-2 rounded-xl">
          <span class="text-sm text-gray-500">Following</span>
          <span class="text-md font-medium text-gray-900">{{ followeesCount }}</span>
          <div class="grid grid-cols-4 gap-2 mb-2 ml-2"><AvatarFollowee /></div>         
        </div>
      </div>
    </div>
  </div>  
</template>