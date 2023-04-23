<script setup lang="ts">
import Toggle from '../components/utils/ToggleSimple.vue';
import ButtonGradient from '../components/utils/Buttons/ButtonGradient.vue';
import { useSoundStore } from '../store/soundStore';
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

const soundStore = useSoundStore();
const ensemble = soundStore.getEnsemble;

const isInstr = ref(false);
watch(isInstr, () => {
    if (isInstr.value) {
        for (let i = 0; i < ensemble.length; i++) {
            ensemble[i].start();
        }
    } else {
        for (let i = 0; i < ensemble.length; i++) {
            ensemble[i].stop();
        }
    }
});

// global controls
soundStore.getContextState();
// soundStore.startAudio();

// // ******* master volume and output *******
const volValue = ref(-20);
const soundOut = ref(false);
soundStore.updateVolume(-Infinity);
// Tone.Destination.volume.value = -Infinity;
watch(soundOut, () => {
    if (soundOut.value) {
        soundStore.updateVolume(volValue.value); // maybe just change volValue ?
    } else {
        soundStore.updateVolume(-Infinity);
    }
});

watch(volValue, () => {
    if (soundOut.value) {
        soundStore.updateVolume(volValue.value);
    }
});
</script>
<template>
    <div class="flex px-2 py-2 space-x-6 bg-slate-400">
        <div class="flex flex-col justify-center items-center">
            <p>start audio context</p>
            <button
                @click="soundStore.startAudio()"
                class="px-2 py-2 border-2 border-white rounded-md"
            >
                <Icon icon="heroicons:power-20-solid" class="h-11 w-11" />
            </button>
        </div>

        <div class="flex flex-col justify-center items-center">
            <p>audio context state</p>
            <button
                @click="soundStore.getContextState()"
                class="px-2 py-2 border-2 border-white rounded-md"
            >
                <Icon icon="heroicons:circle-stack" class="h-11 w-11" />
            </button>
        </div>

        <div class="flex flex-col justify-center items-center">
            <p>output</p>
            <Toggle :name="'mute'" v-model="soundOut" />
            <p>{{ soundOut }}</p>
        </div>

        <div class="control">
            <p>volume</p>
            <input
                type="range"
                name="zoom"
                id=""
                min="-120"
                max="0"
                v-model="volValue"
                class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg range-lg"
            />
            <p class="font-mono text-gray-900">{{ volValue }}</p>
        </div>
    </div>
    <ButtonGradient @click="soundStore.createInstruments()"> create intruments</ButtonGradient>
    <ButtonGradient @click="soundStore.getContextState()"> get context state</ButtonGradient>
    <p>ensemble length: {{ ensemble.length }}</p>
    <p class="font-bold">start instruments</p>
    <Toggle :name="'instr'" v-model="isInstr" />
</template>
