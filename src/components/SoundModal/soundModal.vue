<script setup lang="ts">
import { useModalStore } from '@/store/modalStore';
import { useSoundStore } from '@/store/soundStore';
import ButtonGradient from '../utils/Buttons/ButtonGradient.vue';

const modalStore = useModalStore();
const soundStore = useSoundStore();

const closeModal = () => {
    //on click, the dialog box will disappear and the audio will start
    modalStore.isVisible = !modalStore.isVisible;
    console.log('modalStore.isVisible', modalStore.isVisible);
    soundStore.startAudio();
    // soundStore.startWind();
};
</script>

<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-md"
        ></div>

        <div class="fixed inset-0 z-10 overflow-y-auto bg-none">
            <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->

                <div
                    class="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                    <div class="bg-none px-4 pt-5 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3
                                    class="text-3xl text-center font-bold leading-6 text-white drop-shadow-sm"
                                    id="modal-title"
                                >
                                    Welcome to
                                    <span
                                        class="text-transparent bg-clip-text bg-gradient-to-r from-land-400 to-base drop-shadow-sm"
                                        >GeoRadio</span
                                    >
                                </h3>
                                <div class="mt-2">
                                    <p class="text-lg text-white text-center drop-shadow-2x py-2 drop-shadow-sm">
                                        To fully enjoy this lost and sound, we strongly recommend
                                        wearing headphones.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-none px-4 justify-center text-center">
                        <div>
                            <ButtonGradient @click="closeModal()"> Begin </ButtonGradient>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
