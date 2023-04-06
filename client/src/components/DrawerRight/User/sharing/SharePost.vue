<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '@/store/userStore';
import ButtonGradient from '@/components/utils/Buttons/ButtonGradient.vue';
import ButtonUserProfile from '@/components/utils/Buttons/ButtonUserProfile.vue';

const userStore = useUser();

const post = ref('');

const createPost = async (post: string) => {
    const user:any = userStore.currentUser?.name;
    const date: string =  new Date().toLocaleString();
    console.log(date);
    await userStore.createPost(post, user, date);
    post = '';
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.value = '';
    }  
};
</script>
<template>
    <div class="w-full mr-4">
        <div class="py-0 mb-2 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <textarea
                v-model="post"
                class="w-full h-24 p-2 text-gray-700 bg-white rounded focus:outline-none"
                placeholder="What's on your mind?"
            ></textarea>
        </div>
        <div class="flex flex-row justify-around mt-4">
            <div class="flex">
                <ButtonUserProfile>
                    Capture
                </ButtonUserProfile>
            </div>
            <div class="flex">
                <ButtonGradient @click="createPost(post)">Share</ButtonGradient>
            </div>
        </div>
    </div>
</template>