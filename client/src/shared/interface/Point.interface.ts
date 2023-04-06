import type mapboxgl from 'mapbox-gl';
export interface Point {
    id: number;
    name: string;
    coordonates: Coordonates;
    elevation: number;
    type: string;
    marker?: mapboxgl.Marker;
    positions: Positions;
    inBound?: boolean;
    pan?: number;
    weather?: Weather;
}

export interface Coordonates {
    lng: number;
    lat: number;
}

export interface Weather {
  temp: number;
  humidity: number;
  windSpeed: number;
  weather: string;
  weatherDescription: string;
  weatherIcon: string;
}

//position: [number, number];
export interface Positions {
    x: number;
    y: number;
}