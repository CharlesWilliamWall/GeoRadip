import type { GeoInstruments } from './../GeoTone/geoInstruments/GeoInstruments';
/* eslint-disable @typescript-eslint/no-unused-vars */
import mapboxgl, { Marker, type MapBoxZoomEvent } from 'mapbox-gl';
import type { Canada } from '@/shared/interface/Canada.interface';
import canada from '../shared/data/canada.json';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { Point, Weather } from '@/shared/interface/Point.interface';
import { map } from '../shared/utilities/numbers';

import { useSoundStore } from './soundStore';

interface State {
    userLocation: number[];
    map: mapboxgl.Map | null;
    center: [number, number];
    style: string;
    zoom: number;
    points: Point[];
    savedPoints: [Point[]];
    nextId: number;
    distance: [number, number];
    weatherObject: Weather;
}

export const useMapStore = defineStore('map', {
    state: (): State => ({
        nextId: 1,
        userLocation: [0, 0],
        map: null,
        center: [0, 0],
        style: '',
        zoom: 0,
        points: [],
        savedPoints: [[]],
        distance: [0, 0],
        weatherObject: {
            temp: 0,
            humidity: 0,
            windSpeed: 0,
            weather: '',
            weatherDescription: '',
            weatherIcon: ''
        }
    }),
    getters: {
        getCenter(): number[] {
            return this.center;
        },
        getPoints(): Point[] {
            return this.points;
        },
        getId(): number {
            return this.nextId;
        },
        getZoom(): number | undefined {
            return this.map?.getZoom();
        }
    },
    actions: {
        setUserLocation(coords: [number, number]) {
            this.userLocation[0] = coords[0];
            this.userLocation[1] = coords[1];
        },
        fetchMap(map: any) {
            this.map = map;
        },

        setRandomPosition()  {
            const canadaPosition: Canada[] = canada;
            const index = Math.floor(Math.random() * canadaPosition.length);
            this.center = [canadaPosition[index].lng, canadaPosition[index].lat];
            if (this.map != null) {
                this.map.flyTo({
                    center: [this.center[0], this.center[1]],
                    zoom: 10,
                    speed: 1,
                    essential: true
                });
            }
            this.getWeather(this.center[0], this.center[1]);
            return this.center;
        },

        async setMarker(event: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
            if (this.map) {
                const marker: mapboxgl.Marker = new mapboxgl.Marker({ draggable: true })
                    .setLngLat(event.lngLat)
                    .addTo(this.map);

                //add point to points array
                const point = await this.addPoint(marker, event);

                // create intruments with id and info from point
                const soundStore = useSoundStore();
                soundStore.createInstruments(this.nextId, point);

                this.nextId++;

                //on dragend event get new info about the point
                marker.on('dragend', async () => {
                    await this.setNewPosition(marker, point);
                    point.pan = this.getPan(point);

                    //update sound 
                    const soundStore = useSoundStore();
                    const geoInstr = soundStore.getGeoInstrumentsById(point.id);
                    // soundStore.setInstrPan(geoInstr as GeoInstruments, point.pan);
                   soundStore.updateInstrument(geoInstr as GeoInstruments, point);
                });

                // console.log(this.points);
            }
        },

        async addPoint(
            marker: mapboxgl.Marker,
            event: mapboxgl.MapMouseEvent & mapboxgl.EventData
        ) {
            const { lng, lat } = marker.getLngLat();
            const weather: Weather = await this.getWeather(lng, lat);
            const point = {
                id: this.nextId,
                name: 'point-' + this.nextId,
                marker: marker,
                elevation: await this.getElevation(lng, lat),
                type: this.getType(event.point),
                coordonates: { lng, lat },
                positions: { x: event.point.x, y: event.point.y },
                inBound: true,
                pan: 0,
                weather: weather
            };
            point.pan = this.getPan(point);
            this.points.push(point);
            // this.nextId++;
            return point;
        },

        async setNewPosition(marker: mapboxgl.Marker, point: Point) {
            if (this.map) {
                const index = this.points.findIndex((p) => p.id === point.id);
                this.points[index].elevation = await this.getElevation(
                    marker.getLngLat().lng,
                    marker.getLngLat().lat
                );
                const { lng, lat } = marker.getLngLat();
                const mapBoxPoint: mapboxgl.Point = this.map.project({ lng, lat });
                this.points[index].type = this.getType(mapBoxPoint);
                this.points[index].coordonates = {
                    lng: marker.getLngLat().lng,
                    lat: marker.getLngLat().lat
                };
                this.points[index].positions = { x: mapBoxPoint.x, y: mapBoxPoint.y };
                this.points[index].weather = await this.getWeather(
                    marker.getLngLat().lng,
                    marker.getLngLat().lat
                );
            }
        },

        async getElevation(lng: number, lat: number) {
            const data = await axios.get(
                `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=50&access_token=${mapboxgl.accessToken}`
            );
            if (data.status != 200) return 0;
            const allFeatures = data.data.features;
            const elevations = allFeatures.map((feature: any) => feature.properties.ele);
            const highestElevation = Math.max(...elevations);
            return highestElevation;
        },

        async getWeather(lng: number, lat: number) {
            //set timeout to wait for the data to be fetched
            const weatherData = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=9ac0b2ae93a7ff98bb65da684f2c73ce&units=metric`
            );
            //set timeout to wait for the data to be fetched
            if (weatherData.status != 200) {
                this.weatherObject = {
                    temp: 0,
                    humidity: 0,
                    windSpeed: 0,
                    weather: '',
                    weatherDescription: '',
                    weatherIcon: ''
                };
                
                return this.weatherObject;
            }
            const temp = weatherData.data.main.temp;
            const humidity = weatherData.data.main.humidity;
            //convert wind speed from m/s to km/h
            // const windSpeed = Math.round(weatherData.data.wind.speed * 3.6);
            const windSpeed = Math.round(weatherData.data.wind.speed * 3.6);
            const weather = weatherData.data.weather[0].main;
            const weatherDescription = weatherData.data.weather[0].description;
            const weatherIcon = weatherData.data.weather[0].icon;
            this.weatherObject = {
                temp: temp,
                humidity: humidity,
                windSpeed: windSpeed,
                weather: weather,
                weatherDescription: weatherDescription,
                weatherIcon:' https://openweathermap.org/img/wn/' + weatherIcon + '.png'
            };
            return this.weatherObject;
        },

        getType(point: mapboxgl.Point | mapboxgl.PointLike): string {
            if (this.map) {
                const allTypes = this.getAllTypes();
                try {
                    const features: mapboxgl.MapboxGeoJSONFeature[] =
                        this.map.queryRenderedFeatures(point);
                     console.log('Features', features);
                    if (features.length > 0) {
                        if (features[0].sourceLayer == 'water' ||  features[0].sourceLayer == 'depth') return 'water';
                        
                        if (allTypes.includes(features[0].properties?.class))
                            return features[0].properties?.class;
                    }
                } catch (error) {
                    return 'map';
                }
            }
            return 'map';
        },
        getAllTypes(): string[] {
            return [
                'snow',
                'map',
                'crop',
                'grass',
                'scrub',
                'wood',
                'water',
                'wetland',
                'national_park'
            ];
        },
        removePoint(index: number) {
            // console.log('index', index);
            // console.log('id', this.points[index].id);
        
            this.points[index].marker?.remove();

            this.points.splice(index, 1);
            //keep the same index for all the points after the removed one
            for (let i = index; i < this.points.length; i++) {
                this.points[i].marker?.getElement().setAttribute('data-index', i.toString());
            }

            const soundStore = useSoundStore();
            soundStore.removeInstruments(index);
        },

        getPan(point: Point) {
            const width = window.innerWidth;
            // let pan = ((point.positions.x - 0) * (1 - -1)) / (width - 0) + -1;
            let pan = map(point.positions.x, 0, width, -1, 1);
            if (pan < -1) pan = -1;
            else if (pan > 1) pan = 1;
            return pan;
        },
        getPointById(id: number): Point | undefined {
            let foundPoint: Point | undefined = undefined;
            this.points.forEach((point) => {
                if (id === point.id) {
                    foundPoint = point;
                }
            });
            return foundPoint;
        },
        validateMarkerInBounds() {
            //to know if the marker is in the map bounds or not true/false
            if (this.points.length > 0) {
                this.points.forEach((point) => {
                    if (this.map) {
                        if (point.marker) {
                            point.inBound = this.map.getBounds().contains(point.marker.getLngLat());
                        } //works ok
                    }
                });

                const soundStore = useSoundStore();
                soundStore.updateEnsembleState(this.points);
                
            }
            // console.log("zoom", this.map?.getZoom());
            
        },
        updateZoom(zoom: number){
            this.zoom = zoom;
            // console.log(zoom);
            const soundStore = useSoundStore();
            soundStore.changeAmbiance(zoom);
            
        },

        setPosition() {
            this.points.forEach((point) => {
                if (this.map) {
                    const { lng, lat } = point.coordonates;
                    const mapBoxPoint: mapboxgl.Point = this.map.project({ lng, lat });
                    point.positions = { x: mapBoxPoint.x, y: mapBoxPoint.y };
                    point.pan = this.getPan(point);
                }
            });
        },

        setSavedPoints(points: Point[]) {
            this.savedPoints.push(points);
        }
    }
});
