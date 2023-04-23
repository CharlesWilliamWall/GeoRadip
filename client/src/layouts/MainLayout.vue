<script setup lang="ts">
import HeaderContent from '../components/header/HeaderHome.vue';
import soundModal from '../components/SoundModal/soundModal.vue';
import { useModalStore } from '@/store/modalStore';
import soundManager from '@/components/SoundModal/soundManager.vue';

const modalStore = useModalStore();
</script>

<template>
    <div id="app" class="flex flex-col h-screen w-screen">
        <div id="header" class="z-40">
            <HeaderContent />
        </div>

        <div v-if="!modalStore.isVisible" id="player" class="z-40">
            <soundModal />
        </div>

        <div v-if="modalStore.isVisible" id="soundOut" class="z-40 justify-end">
            <soundManager />
        </div>

        <div id="main" class="grid flex-grow">
            <div id="content" class="z-30">
                <RouterView />
            </div>
        </div>
    </div>
</template>
