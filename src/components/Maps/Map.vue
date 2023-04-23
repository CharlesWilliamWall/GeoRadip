<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import { onMounted } from 'vue';
import { useMapStore } from '@/store/mapStore';

const mapStore = useMapStore();

onMounted(() => {
    mapboxgl.accessToken =
        'pk.eyJ1IjoicGlwby1wbCIsImEiOiJjbGVpdjJyODkwNTdsM3NwYmFrbjh1MmJpIn0.D6VdtCYvdpP1zRb9BIWZMw';
    const map = new mapboxgl.Map({
        container: 'map',
        testMode: false,
        style: 'mapbox://styles/pipo-pl/cleiv66op001s01qx53243z0e',
        center: [-79.3832, 43.6532],
        zoom: 3
    });

    navigator.geolocation.getCurrentPosition(
        (position) => {
            map.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 10,
                speed: 1,
                essential: true
            });
            mapStore.setUserLocation([position.coords.longitude, position.coords.latitude]);
        },
        (err) => {
            console.log(err);
            map.flyTo({
                center: [mapStore.center[0], mapStore.center[1]],
                zoom: 10,
                speed: 1,
                essential: true
            });
            mapStore.setRandomPosition();
            mapStore.setUserLocation(mapStore.center);
        }
    );

    map.on('moveend', () => {
        mapStore.setPosition();
        mapStore.validateMarkerInBounds();
        mapStore.updateZoom(map.getZoom());
    });
    map.on('click', mapStore.setMarker);
    mapStore.fetchMap(map);
});
</script>

<template>
    <div id="map" class="h-full"></div>
</template>

<style scoped></style>
