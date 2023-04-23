<script setup lang="ts">
// import * as Tone from 'tone';
import { updateVolume, startAudio, createContext } from '../GeoTone/globals';
import { TestTone } from '../GeoTone/geoInstruments/TestTone';
import { DebugOsc } from "../GeoTone/geoInstruments/DebugOsc";
import * as Wind from '../GeoTone/geoInstruments/wind';
import * as Voice from '../GeoTone/geoInstruments/voice';
import { Chime } from '../GeoTone/geoInstruments/Chime';
import { Sonar } from '../GeoTone/geoInstruments/Sonar';
// import * as Scales from '../GeoTone/geoInstruments/scales';

import { ref, watch } from 'vue';
import Toggle from '../components/utils/ToggleSimple.vue';
import ButtonGradient  from '../components/utils/Buttons/ButtonGradient.vue'
import { Icon } from '@iconify/vue';

// bug: sound stays on if people go back to map
// async function startAudio() {
//   await Tone.start();
//   console.log('audio context started');
// }

// createContext();
// ********** test tone *************************
const isTestTone = ref(false);
// const osc = new Tone.Oscillator(432, 'sine').toDestination();
// osc.toDestination();
// osc.volume.value = -Infinity;
const testTone = new TestTone(300);

watch(isTestTone, () => {
  if (isTestTone.value) {
    testTone.setVolume(-20);
    testTone.start();
  } else {
    testTone.setVolume(-Infinity);
    setTimeout(() => {
      testTone.stop();
    }, 100);
  }
});

// ********** debug osc *************************
const isDebugTone = ref(false);
const debugOsc = new DebugOsc();
watch(isDebugTone, () => {
  if (isDebugTone.value) {
    debugOsc.start();
    debugOsc.setVolume(-20);
    // debugOsc.volume.rampTo(0, 0.1);
  } else {
    debugOsc.setVolume(-Infinity);
    setTimeout(() => {
      debugOsc.stop();
    }, 100);
  }
});

// ********** wind  *************************
const isWind = ref(false);
const windVol = ref(0);
const panVal = ref(0);
Wind.setVolume(-Infinity);
// Wind.dc.toDestination();

watch(isWind, () => {
  if (isWind.value) {
    Wind.start();
    Wind.setVolume(windVol.value);
  } else {
    Wind.setVolume(-Infinity);
    Wind.stop();
  }
});
watch(windVol, () => {
  Wind.setVolume(windVol.value);
});
watch(panVal, () => {
  Wind.setPan(panVal.value / 100);
});

// ********** voice *************************
const isVoice = ref(false);
watch(isVoice, () => {
  if (isVoice.value) {
    Voice.start();
  } else {
    Voice.stop();
  }
});

// ********** Chime *************************
const isChime = ref(false);
const chimePan = ref(0); // -1_left 0_center +1_right
const chime = new Chime("C4", "blueMoon");

// TODO test change root
//testing changes
// setTimeout(() => {
//   chime.setScale(Scales.getScale("aqua"));
//   chime.setPattern("upDown"); // changes work through methods
//   chime.setInterval("16n");
//   console.log("scale changed");
// }, 15000)

chime.duration = 0.1;
chime.durationVar = 0.4;

chime.velocity = 0.1;
chime.velocityVar = 0.5;

watch(isChime, () => {
  if (isChime.value) {
    chime.start();
  } else {
    chime.stop();
  }
});

watch (chimePan, () => {
  chime.setPan(chimePan.value / 100);
});

// ********** Sonar *************************
const sonar = new Sonar("c6");
const sonarPan = ref(0);
function triggerSonar() {
  sonar.trigger();
}

watch (sonarPan, () => {
  sonar.setPan(sonarPan.value / 100);
});

// ******* master volume and output *******
const volValue = ref(-20);
const soundOut = ref(false);
updateVolume(-Infinity);
// Tone.Destination.volume.value = -Infinity;
watch(soundOut, () => {
  if (soundOut.value) {
    updateVolume(volValue.value);
  } else {
    updateVolume(-Infinity);
  }
});

watch(volValue, () => {
  if (soundOut.value) {
    updateVolume(volValue.value);
  }
});

//******** meter ********
// sample value of input every 80 ms
const meterDisplay = ref(0);
// const meter = new Tone.DCMeter();
// multTotal.connect(meter);
// lowerBoundMult.connect(meter);
setInterval(() => {
  // meterDisplay.value = meter.getValue() as number;
  // console.log(meter.getValue());
}, 80);

const elevation = ref(400);

// landcover: wood, scrub, grass, crop, map, snow
const landcover = ref(0);
const landCovers = {
  9: 'national_park',
  8: 'wetland',
  7: 'water',
  6: 'wood',
  5: 'scrub',
  4: 'grass',
  3: 'crop',
  2: 'map',
  1: 'snow'
};

const levels = ref(56);
const shadeLevels = {
  56: 'extreme',
  67: 'dark',
  78: 'medium',
  89: 'faint',
  90: 'medium',
  94: 'brightest'
};

const zoom = ref(12);

const windSpeed = ref(30);
</script>

<template>
  <main>
    <div class="flex px-2 py-2 space-x-2 bg-indigo-50">
      <div class="p-6 h-max bg-airport rounded-md shadow-md flex-col space-x-4 space-y-3">
        <label for="landcover" class="text-white font-bold">landcover</label>
        <div v-for="(value, key) in landCovers" :key="key" class="space-x-4">
          <input
            :id="value"
            type="radio"
            name="landcover"
            :value="key"
            class="appearance-none w-5 h-5 bg-white border-2 border-slate-800 checked:bg-water"
          />
          <label :for="value" class="font-mono text-gray-900">{{ value }} ({{ key }})</label>
        </div>
      </div>
      <div class="p-6 h-max bg-industrial rounded-md shadow-md flex-col space-x-4 space-y-3">
        <label for="shadeLevels" class="text-white font-bold">shade levels</label>
        <div v-for="(value, key) in shadeLevels" :key="key" class="space-x-4">
          <input
            :id="value"
            type="radio"
            name="shadeLevels"
            :value="key"
            class="appearance-none w-5 h-5 bg-white border-2 border-slate-900 checked:bg-water"
          />
          <label :for="value" class="font-mono text-gray-90">{{ value }} ({{ key }})</label>
        </div>
      </div>
      <div class="p-6 h-max bg-red-400 rounded-md shadow-md flex-none">
        <div class="flex-row space-x-4 space-y-3 justify-center">
          <label for="elevation" class="text-white font-bold">elevation</label>
          <input
            type="range"
            name="elevation"
            id=""
            class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg"
            min="-410"
            max="8840"
            v-model="elevation"
          />
          <p class="font-mono text-white">{{ elevation }}</p>
        </div>
      </div>
      <div class="p-6 h-max bg-indigo-300 rounded-md shadow-md flex-none">
        <div class="flex-row space-x-4 space-y-3 justify-center">
          <label for="zoom" class="text-white font-bold">zoom</label>
          <input
            type="range"
            name="zoom"
            id=""
            class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg range-lg"
            min="1"
            max="20"
            v-model="zoom"
          />
          <p class="font-mono text-white">{{ zoom }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-row px-2 py-2 space-x-2 bg-cyan-50">
      <div class="p-6 h-max bg-base rounded-md shadow-md flex flex-col items-center">
        <h4 class="text-xl font-bold">wind</h4>
        <div class="flex-row space-x-4 space-y-3 justify-center">
          <label for="windVol" class="text-slate-900">volume</label>
          <input
            type="range"
            name="windVol"
            id=""
            min="-120"
            max="0"
            v-model="windVol"
            class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg range-lg"
          />
          <p class="font-mono text-gray-900">{{ windVol }}</p>
        </div>
        <div class="flex-row space-x-4 space-y-3 justify-center">
          <label for="windPan" class="text-slate-900">pan</label>
          <input
            type="range"
            name="pan"
            id=""
            min="-100"
            max="100"
            v-model="panVal"
            class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg range-lg"
          />
          <p class="font-mono text-gray-900">{{ panVal / 100 }}</p>
        </div>

        <div class="flex-row space-x-4 space-y-3 justify-center">
          <label for="windSpeed" class="text-slate-900">speed</label>
          <input
            type="range"
            name="windSpeed"
            id=""
            class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg"
            min="0"
            max="300"
            v-model="windSpeed"
          />
          <p class="font-mono text-gray-900">{{ windSpeed }}</p>
        </div>
        <Toggle :name="'wind'" v-model="isWind" />
      </div>

      <div class="p-6 h-max bg-slate-300 rounded-md shadow-md flex flex-col items-center">
        <h4 class="text-xl font-bold">voice</h4>
        <Toggle :name="'voice'" v-model="isVoice" />
      </div>

      <div class="p-6 h-max bg-medical rounded-md shadow-md flex flex-col items-center">
        <h4 class="text-xl font-bold">Chime</h4>
        <Toggle :name="'chime'" v-model="isChime" />
        <div class="flex-row space-x-4 space-y-3 justify-center">
          <label for="chimePan" class="text-slate-900">pan</label>
          <input
            type="range"
            name="chimePan"
            id=""
            min="-100"
            max="100"
            v-model="chimePan"
            class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg range-lg"
          />
          <p class="font-mono text-gray-900">{{ chimePan / 100 }}</p>
        </div>
      </div>
      <div class="p-6 h-max bg-indigo-300 rounded-md shadow-md flex flex-col items-center">
        <h4 class="text-xl font-bold">Sonar</h4>
        <ButtonGradient @click = "triggerSonar()">*</ButtonGradient>
        <div class="flex-row space-x-4 space-y-3 justify-center">
          <label for="sonarPan" class="text-slate-900">pan</label>
          <input
            type="range"
            name="sonarPan"
            id=""
            min="-100"
            max="100"
            v-model="sonarPan"
            class="appearance-none transparent w-80 h-3 cusrsor-pointer rounded-lg range-lg"
          />
          <p class="font-mono text-gray-900">{{ sonarPan / 100 }}</p>
        </div>
      </div>
    </div>

    <div class="flex px-2 py-2 space-x-6 bg-slate-400">
      <div class="flex flex-col justify-center items-center">
        <p>start audio context</p>
        <button @click="startAudio()" class="px-2 py-2 border-2 border-white rounded-md">
          <Icon icon="heroicons:power-20-solid" class="h-11 w-11" />
        </button>
      </div>

      <div class="flex flex-col justify-center items-center">
        <p>test tone</p>
        <Toggle :name="'tone'" v-model="isTestTone" />
        <p>{{ isTestTone }}</p>
      </div>

      <div class="flex flex-col justify-center items-center">
        <p>debug tone</p>
        <Toggle :name="'debug'" v-model="isDebugTone" />
        <p>{{ isDebugTone }}</p>
      </div>

      <div class="flex flex-col justify-center w-80">
        <p>signal meter</p>
        <p class="">{{ meterDisplay }}</p>
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
  </main>
</template>

<style scoped></style>
