<script setup lang="ts">
import { computed } from 'vue';
import { useUser } from '@/store/userStore';

const userStore = useUser();

const myPosts = computed(() => {
  const myPosts : any = [];
  if (userStore.currentUser?.posts) {
    userStore.currentUser?.posts.forEach((post: any) => {
      myPosts.push(post);
    });
  }

  if (userStore.users) {
    userStore.users.forEach((userPost: any) => {
      if (userPost.posts) {
        userPost.posts.forEach((post: any) => {
          myPosts.push(post);
        });
      }
    });
  }

  if (userStore.currentUser?.followees) {
    userStore.currentUser?.followees.forEach((followee: any) => {
      if (followee.posts) {
        followee.posts.forEach((post: any) => {
          myPosts.push(post);
        });
      }
    });
  }

  if (userStore.currentUser?.followers) {
    userStore.currentUser?.followers.forEach((follower: any) => {
      if (follower.posts) {
        follower.posts.forEach((post: any) => {
          myPosts.push(post);
        });
      }
    });
  }

  myPosts.sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return myPosts;
});
</script>

<template>
  <div v-for="(post,index) in myPosts" :key="index">
    <div class="flex-col bg-slate-200 my-1 mr-4 overflow-auto rounded-xl">
      <p class="flex justify-start text-slate-600 text-sm font-mono p-1 pl-2">{{ post.user }}:</p>
      <p class="flex justify-center text-gray-500 dark:text-gray-400">{{ post.post }}</p>
      <p class="flex justify-end text-slate-500 text-xs font-thin p-1 pr-2">{{ post.date }}</p>
    </div>
  </div>
</template>