<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, type Ref } from 'vue';
import { useMapStore } from '@/store/mapStore';
import axios from 'axios';

const mapStore = useMapStore();
const searchQuery = ref('');
const searchData: Ref<any> = ref('');
const focused = ref(false);
const queryTimeout = ref(0);

const search = () => {
  clearTimeout(queryTimeout.value);
  searchData.value = null;
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      const params = {
        access_token:
          'pk.eyJ1Ijoic3VwZXJzYWdlIiwiYSI6ImNsZHZwMmo4ZjAwaTMzbm52a2V5Y2dnNXYifQ.4SMbR-DTPAx77VDZfvgqYQ',
        fuzzyMatch: 'true',
        autocomplete: 'true',
        lang: 'en',
        limit: '10',
        proximity: `${mapStore.map?.getCenter().lng},${mapStore.map?.getCenter().lat}`
      };
      const urlParams = new URLSearchParams(params);
      const getData = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?${urlParams}`
      );
      searchData.value = getData.data.features;
    }
  }, 750);
};
function selectedResult(result: any) {
  console.log(result);
  searchQuery.value = result.place_name;
  searchData.value = null;
  focused.value = !focused.value;
  const zoom = result.place_type[0] == 'poi' ? 18 : 10;
  mapStore.map?.flyTo({
    center: [result.geometry.coordinates[0], result.geometry.coordinates[1]],
    zoom: zoom,
    speed: 1,
    essential: true
  });
}
</script>

<template>
  <div class="relative flex basis-[25%] justify-center">
    <Icon icon="material-symbols:search-sharp" class="h-6 w-6 sm:h-10 sm:w-10" />
    <input
      class="pl-4 pr-4 py-1 bg-slate-100 mx-4 w-full border-b-2 border-slate-300 focus:outline-none"
      placeholder="Enter a location"
      v-model="searchQuery"
      @input="search()"
      @focus="focused = !focused"
    />
    <div class="absolute ml-[2rem] mt-[3.5rem] w-[90%]">
      <div v-if="searchData && focused" class="h-[200px] bg-white rounded-md overflow-y-scroll">
        <div
          class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white"
          v-for="(result, index) in searchData"
          :key="index"
          @click="selectedResult(result)"
        >
          <Icon icon="mdi:map-marker" />
          <p class="text-[12px]">{{ result.place_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
