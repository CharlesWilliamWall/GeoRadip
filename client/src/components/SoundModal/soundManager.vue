<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSoundStore } from '@/store/soundStore';
import ToggleSimple from '../utils/ToggleSimple.vue';

const soundStore = useSoundStore();

const soundOut = ref(true);
watch(soundOut, () => {
    if (soundOut.value) {
        soundStore.updateVolume(volValue.value); // maybe just change volValue ?
    } else {
        soundStore.updateVolume(-Infinity);
    }
});

const volValue = ref(-12);
soundStore.updateVolume(volValue.value);
watch(volValue, () => {
    if (soundOut.value) {
        soundStore.updateVolume(volValue.value);
    }
});
</script>

<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed bottom-0 right-0 left-96 z-10 overflow-y-auto bg-none w-fit h-fit mx-2">
            <div class="flex items-center justify-center p-2 sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                    <div
                        class="flex-row bg-none px-2 pb-2 pt-2 sm:p-6 sm:pb-4 backdrop-blur-md rounded-xl"
                    >
                        <div class="sm:flex sm:items-start"></div>
                        <div class="flex">
                            <p class="mx-2 mt-0.5 font-bold text-white drop-shadow-lg">Volume</p>
                            <p class="flex font-mono text-white mt-1 drop-shadow-lg">{{ volValue }}</p>
                            <input
                                type="range"
                                name="zoom"
                                id=""
                                min="-120"
                                max="0"
                                v-model="volValue"
                                class="mt-3 appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg range-lg mx-3 my-1 drop-shadow-lg"
                            />

                            <ToggleSimple
                                name="sound"
                                class="cursor-pointer mx-2 drop-shadow-lg"
                                v-model="soundOut"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
