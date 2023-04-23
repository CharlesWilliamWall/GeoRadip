<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '@/store/mapStore'
import { Icon } from '@iconify/vue';

//get weatherObject from mapStore

const mapStore = useMapStore()


const weatherObject = computed(() => {
  return mapStore.weatherObject
})

</script>

<template>
  <div class="flex flex-col relative top-0 right-0">
    <div v-if="mapStore.points.length == 0" class="flex flex-col border-2 rounded-2xl">
      <div class="flex justify-center pt-4 basis-1/3">
        <div><Icon icon="bi:thermometer-half" class="w-10 h-10 flex basis-1/2 justify-center items-center ml-2" /></div>
        <div class="flex basis-1/2 justify-center items-center text-sm">{{ weatherObject.temp + '°C' }}</div>
      </div>
      <div class="flex pt-4 basis-1/3 justify-center">
        <div><Icon icon="ph:wind-thin" class="w-10 h-10 flex basis-1/2 justify-center items-center ml-2" /></div>
        <div class="flex basis-1/2 justify-center items-center text-sm">{{ weatherObject.windSpeed + 'KM/H' }}</div>
      </div>
      <div class="flex flex-row justify-center basis-1/3">
        <div><img class="w-14 h-14 flex basis-1/2 justify-center items-center" :src="weatherObject.weatherIcon" /></div>
        <div class="w-16 h-16 flex basis-1/2 justify-center items-center text-sm">{{ weatherObject.weatherDescription }}</div>
      </div>
    </div>
    <div v-for="point,index in mapStore.points" :key="index">
      <div v-if="index > mapStore.points.length - 2" cl class="flex flex-col border-2 rounded-2xl">
        <p class="font-mono pt-2 text-lg font-extrabold">{{ point.name }}</p>
        <div class="flex justify-center pt-4 basis-1/3">
          <div><Icon icon="bi:thermometer-half" class="w-10 h-10 flex basis-1/2 justify-center items-center ml-2" /></div>
          <div class="flex basis-1/2 justify-center items-center text-sm">{{ point.weather?.temp + '°C' }}</div>
        </div>
        <div class="flex pt-4 basis-1/3 justify-center">
          <div><Icon icon="ph:wind-thin" class="w-10 h-10 flex basis-1/2 justify-center items-center ml-2" /></div>
          <div class="flex basis-1/2 justify-center items-center text-sm">{{ point.weather?.windSpeed + 'KM/H' }}</div>
        </div>
        <div class="flex flex-row justify-center basis-1/3">
          <div><img class="w-14 h-14 flex basis-1/2 justify-center items-center" :src="point.weather?.weatherIcon" /></div>
          <div class="w-16 h-16 flex basis-1/2 justify-center items-center text-sm">{{ point.weather?.weatherDescription }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
