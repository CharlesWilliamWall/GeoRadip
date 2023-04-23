<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useUser } from '@/store/userStore';
const userStore = useUser();
const dropdown = ref(false);

const selectUser :any = ref(null);


const toggleDropdown = () => {
  dropdown.value = !dropdown.value;
};

const showFollowers = async () => {
  await userStore.showFollowers();
};

</script>
<template>

  <div @click="toggleDropdown" v-for="(user, index) in userStore.followers" :key="index" type="button" :class="user.profilePicture" class="flex flex-row w-8 h-8 rounded-full cursor-pointer justify-center items-center font-semibold">
    <div  class="select-none text-white">{{ user.name.slice(0, 2).toUpperCase() }}</div>

    <div  v-if="dropdown" class="absolute w-full right-0 rounded-md shadow-lg mt-16">
      <div class="py-1 bg-white rounded-md shadow-xs">
        <div class="text-slate-500">show profile</div>
        <!-- <div class="text-slate-500" v-if="selectUser">{{ selectUser.email }}</div> -->
      </div>
    </div>
  </div>
</template>
