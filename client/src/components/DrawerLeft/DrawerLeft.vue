<script setup lang="ts">
import { Icon } from '@iconify/vue';
import DrawerMeteo from './DrawerUtilities/DrawerMeteo.vue';
import DrawerPoint from './DrawerUtilities/DrawerPoint.vue';
//import DrawerTerrain from './DrawerUtilities/DrawerTerrain.vue';
import { useMapStore } from '@/store/mapStore';
import buttonLeftDrawer from '../utils/Buttons/buttonLeftDrawer.vue';

const mapStore = useMapStore();
</script>

<template>
  <div class="flex flex-col basis-1/3">
    <div class="flex flex-row justify-center pb-2">
      <div class="flex flex-col mb-2">
        <p class="font-semibold text-xl mb-2">randomizer</p>
        <buttonLeftDrawer @click="mapStore.setRandomPosition()">
          <Icon :icon="'fad:random-1dice'" class="h-10 w-10" />
        </buttonLeftDrawer>
      </div>
      <!-- <div class="flex flex-col">
        <p class="flex justify-center mb-1">current</p>
        <buttonLeftDrawer @click="mapStore.setRandomPosition()">
          <Icon :icon="'basil:current-location-outline'" class="h-8 w-8" />
        </buttonLeftDrawer>
      </div> -->
    </div>

    <div id="LMWeather" class="flex basis-1/4 flex-col justify-center pb-2">
      <p class="font-semibold border-t-2 text-xl py-2">Weather</p>
      <DrawerMeteo />
    </div>

    <div id="LMArea" class="flex basis-1/4 flex-col justify-center pb-12">
      <div
        class="flex flex-row justify-center py-2 text-center px-1 font-mono font-semibold text-lg border-t-2"
      >
        <p class="flex justify-center basis-1/3">Points</p>
        <p class="flex justify-center basis-1/3">Coordonates</p>
        <p class="flex justify-center basis-1/3">Type</p>
      </div>
      <DrawerPoint />
    </div>

    <!-- <div id="LMViews" class="flex basis-1/4 flex-col justify-center">
    <p class="border-y-2 text-xl p-1">Views</p>
    <DrawerTerrain />
  </div> -->
  </div>
</template>
