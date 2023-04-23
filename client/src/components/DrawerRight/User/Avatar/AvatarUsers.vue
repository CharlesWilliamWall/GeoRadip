<script lang="ts" setup>
import { ref, onMounted , computed } from 'vue';
import { useUser } from '@/store/userStore';
const userStore = useUser();
const dropdown = ref(false);

const selectUser :any = ref(null);

const resetSelectUser = () => {
  selectUser.value = null;
};

const toggleDropdown = () => {
  dropdown.value = !dropdown.value;
};

const filterCurrentUser = () => {
  const currentUser : any = userStore.currentUser;
  userStore.users = userStore.users.filter((user: any) => user._id !== currentUser._id);
};

const filterFollowing = () => {
  const currentUser : any = userStore.currentUser;
  userStore.newUsers = userStore.users.filter((user: any) => !currentUser.followees.includes(user.name));
  userStore.followees = userStore.users.filter((user: any) => currentUser.followees.includes(user.name));
  userStore.followers = userStore.users.filter((user: any) => currentUser.followers.includes(user.name));
};

const getUser = (user: any) => {
  selectUser.value = user;
};

const follow = async (currentUser: any, user: any, action: string) => {
  console.log(currentUser.followees + "36")
  currentUser.followees.push(user.name);
  user.followers.push(currentUser.name);
  await userStore.follow(currentUser.name, user.name, action);
  console.log(currentUser.followees)
  userStore.users = userStore.users.map((user: any) => {
    if (user.name === currentUser.name) {
      return currentUser;
    }
    if (user.name === user.name) {
      return user;
    }
    return user;
  });
  userStore.currentUser = currentUser;
  resetSelectUser();
  filterFollowing();
};

onMounted(() => {
  filterCurrentUser();
  filterFollowing();
});

const newUsers = computed(() => {
  return userStore.newUsers;
});
</script>
<template>
  <div @click="toggleDropdown" v-for="user in newUsers" :key="user" type="button" :class="user.profilePicture" class="flex flex-row w-8 h-8 rounded-full cursor-pointer justify-center items-center font-semibold">
    <div @click="getUser(user)" class="select-none text-white">{{ user.name.slice(0, 2).toUpperCase() }}</div>

    <div  v-if="dropdown" class="absolute w-full right-0 rounded-md shadow-lg mt-36">
      <div class="py-1 bg-white rounded-md shadow-xs">
        <div @click="follow(userStore.currentUser, selectUser, 'follow')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-0">Follow</div>
        <div class="text-slate-500" v-if="selectUser">{{ selectUser.name }}</div>
        <div class="text-slate-500" v-if="selectUser">{{ selectUser.email }}</div>
      </div>
    </div>
  </div>
</template>
