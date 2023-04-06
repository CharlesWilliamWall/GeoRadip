<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useMapStore } from '@/store/mapStore';

const mapStore = useMapStore();
const points = mapStore.points;

const pointName = (index: number) => {
    const name = String.fromCharCode(65 + index);
    return name;
};

const removePoint = (index: number) => {
    mapStore.removePoint(index);
};
</script>

<template>
    <div class="flex flex-col">
        <div v-for="(point, index) in points" :key="point.elevation" class="flex py-1 text-center">
            <div class="flex basis-1/3">
                <button @click="removePoint(index)" class="flex justify-start -ml-2">
                    <Icon :icon="'ph:x'" class="w-6 h-6" />
                </button>
                <div class="flex ml-1">
                    <p class="flex justify-center">{{ point.name }}</p>
                </div>
            </div>
            <p class="flex justify-center basis-1/3 text-sm">
                ({{ point.coordonates.lng.toFixed(2) }} , {{ point.coordonates.lat.toFixed(2) }})
            </p>
            <p class="flex justify-center basis-1/3">{{ point.type }}</p>
        </div>
    </div>
</template>
