import { Instruments } from './../GeoTone/geoInstruments/GeoInstruments';
import { CheapWind as Wind } from './../GeoTone/geoInstruments/CheapWind';
import { SpaceSynth } from './../GeoTone/geoInstruments/SpaceSynth';
import type {
    GeoInstruments,
    GeoInstrumentsOptions
} from '../GeoTone/geoInstruments/GeoInstruments';
import * as Scales from '../GeoTone/geoInstruments/scales';
import type { Scale } from '../GeoTone/geoInstruments/scales';
import * as Tone from 'tone/Tone';
import { defineStore } from 'pinia';
import type { Point } from '../shared/interface/Point.interface';
import type { MidiNote } from 'tone/Tone/core/type/NoteUnits';
import type { PatternName } from 'tone/Tone/event/PatternGenerator';
import { useMapStore } from './mapStore';
import { map } from '../shared/utilities/numbers';
// import * as Wind from '../GeoTone/geoInstruments/wind';

interface SoundState {
    ensemble: GeoInstruments[]; // TODO make interface for instruments
    globalSounds: any[];
    // wind: Wind | undefined;
    // space: SpaceSynth | undefined;
    // context: any;
    // transport: any;
}

export const useSoundStore = defineStore('sound', {
    state: (): SoundState => ({
        ensemble: [],
        globalSounds: []
        // wind: undefined,
        // space: undefined,
        // context: new Tone.Context()
        // transport: this.context.transport,
    }),
    getters: {
        getEnsemble(): any[] {
            return this.ensemble;
        }
        // getWind(): Wind | undefined{
        //     // return this.wind;
        // },
    },

    actions: {
        // ************ wind **************
        createWind(): Wind {
            return new Wind();
            // wind.start();
        },
        // ************* space ************
        createSpaceSynth(): SpaceSynth {
            return new SpaceSynth();
        },

        startInstrument(instr: any) {
            instr.start();
        },
        stopInstrument(instr: any) {
            instr.stop();
        },
        // toggleInstrState(instr: any) {
        //     if (instr.getState() === 'started') {
        //         this.stopInstrument(instr);
        //     } else {
        //         this.startInstrument(instr);
        //     }
        // },
        createInstruments(id: number, point: Point) {
            // const root = Math.floor(map(point.elevation, -410, 8840, 40, 60)) as MidiNote;

            const newInst = new Instruments();
            this.setInstrumentOptions(newInst, point);

            const geoInstrument: GeoInstruments = { id: id, instruments: newInst };
            this.setInstrPan(geoInstrument, point.pan as number);

            newInst.start();
            this.ensemble.push(geoInstrument);

            console.log('instruments created');
            // console.log('type', point.type);
            // console.log('elevation', point.elevation);
            // console.log('wind speed', point.weather?.windSpeed);
            console.log(newInst.chime.getCurrentOptions());
            console.log(newInst.sonar.getCurrentOptions());
        },
        removeInstruments(index: number) {
            const instr = this.ensemble[index].instruments;
            instr.stop();

            // wait for sound to end.
            setTimeout(() => {
                // instr.disconnect();
                // instr.dispose();
                console.log('ens id', this.ensemble[index].id);
                this.ensemble.splice(index, 1);
            }, 3000);
        },
        async startAudio() {
            await Tone.start();

            // this.context.resume();
            console.log(this.getContextState());
            Tone.Transport.start();
            const wind = this.createWind();
            const space = this.createSpaceSynth();

            this.globalSounds[0] = wind;
            this.globalSounds[1] = space;

            setTimeout(() => {
                this.startInstrument(wind);
                this.startInstrument(space);
                space.setVolume(-Infinity);
            }, 1000);
        },
        // mapping for surface type

        mapSurfaceType(type: string, bass: MidiNote) {
            switch (type) {
                case 'map':
                    return {
                        root: bass,
                        scale: Scales.getScale('monotone'),
                        pattern: 'random'
                    };
                case 'water':
                    return {
                        root: (bass + 12) as MidiNote, // octave
                        scale: Scales.getScale('aqua'),
                        pattern: 'randomWalk'
                    };
                case 'wetland':
                    return {
                        root: (bass + 7) as MidiNote, // 5th
                        scale: Scales.getScale('aqua'),
                        pattern: 'alternateUp'
                    };
                case 'crop':
                    return {
                        root: (bass + 4) as MidiNote, // major 3rd
                        scale: Scales.getScale('sunray'),
                        pattern: 'randomOnce'
                    };

                case 'grass':
                    return {
                        root: (bass + 9) as MidiNote, // major 6th
                        scale: Scales.getScale('duotone'),
                        pattern: 'random'
                    };
                case 'scrub':
                    return {
                        root: (bass + 5) as MidiNote, // major 4th
                        scale: Scales.getScale('terra'),
                        pattern: 'randomOnce'
                    };
                case 'wood':
                    return {
                        root: (bass + 11) as MidiNote, // major 7th
                        scale: Scales.getScale('ignis'),
                        pattern: 'randomWalk'
                    };
                case 'snow':
                    return {
                        root: (bass + 14) as MidiNote, // major 9th
                        scale: Scales.getScale('crystalide'),
                        pattern: 'upDown'
                    };
                case 'national_park':
                    return {
                        root: (bass + 16) as MidiNote, // major 11th
                        scale: Scales.getScale('sufi'),
                        pattern: 'alternateDown'
                    };
                default:
                    return {
                        root: bass,
                        scale: Scales.getScale('chromatic'),
                        pattern: 'random'
                    };
            }
        },
        mapWeather(point: Point) {
            if (point.weather) {
                const windSpeed = point.weather.windSpeed;
                if (windSpeed >= 10 && windSpeed < 30) {
                    return {
                        lfofreq: 4,
                        prob: 0.7,
                        envDur: 0.1,
                        interval: 0.7
                    };
                } else if (windSpeed >= 30 && windSpeed < 50) {
                    return {
                        lfofreq: 6,
                        prob: 0.8,
                        envDur: 0.05,
                        interval: 0.5
                    };
                } else if (windSpeed >= 50) {
                    return {
                        lfofreq: 8,
                        prob: 0.9,
                        envDur: 0.05,
                        interval: 0.2
                    };
                } else {
                    return {
                        lfofreq: 3,
                        prob: 0.5,
                        envDur: 0.1,
                        interval: 1
                    };
                }
            } else {
                return {
                    lfofreq: 3,
                    prob: 0.5,
                    envDur: 0.1,
                    interval: 1
                };
            }
        },
        getContextState() {
            console.log(Tone.getContext().state);
            return Tone.getContext().state;
        },
        // setNewContext() {
        //     Tone.setContext(this.context);
        // },
        updateVolume(value: number) {
            Tone.getDestination().volume.rampTo(value, 0.05);
        },
        getGeoInstrumentsById(id: number): GeoInstruments | undefined {
            let foundGeoIns: GeoInstruments | undefined = undefined;
            this.ensemble.forEach((geoIns) => {
                if (id === geoIns.id) {
                    foundGeoIns = geoIns as GeoInstruments;
                }
            });
            return foundGeoIns;
        },
        //update the ensemble pan and playing state ( map move )
        updateEnsembleState(points: Point[]) {
            if (points.length > 0) {
                points.forEach((point) => {
                    const geoIns = this.getGeoInstrumentsById(point.id) as GeoInstruments;

                    if (point.inBound && geoIns.instruments.state === 'stopped') {
                        // start sound
                        geoIns.instruments.start();
                    } else if (!point.inBound && geoIns.instruments.state === 'started') {
                        //stop sound
                        geoIns.instruments.stop();
                    }
                    // change pan with new position
                    this.setInstrPan(geoIns, point.pan as number);
                });
            }
            const mapStore = useMapStore();

            // this.changeAmbiance(mapStore.getZoom);
        },
        changeAmbiance(zoom: number | undefined) {
            const wind = this.globalSounds[0];
            const space = this.globalSounds[1];

            if (zoom && space) {
                if (zoom < 3) {
                    space.setVolume(map(zoom, 3, 0, -40, -6));
                    wind.setVolume(map(zoom, 0, 3, -50, 0));
                    if (this.ensemble.length > 0) {
                        this.ensemble.forEach((geoInstr) => {
                            geoInstr.instruments.setVolume(map(zoom, 0, 3, -60, 0));
                        });
                    }
                } else {
                    space.setVolume(-Infinity);
                    wind.setVolume(0);
                    if (this.ensemble.length > 0) {
                        this.ensemble.forEach((geoInstr) => {
                            geoInstr.instruments.setVolume(0);
                        });
                    }
                }
            }
        },
        //update the instruments of a point ( marker move )
        updateInstrument(geoInstr: GeoInstruments, point: Point): void {
            this.setInstrPan(geoInstr, point.pan as number);
            this.setInstrumentOptions(geoInstr.instruments, point);
        },
        setInstrumentOptions(instruments: Instruments, point: Point) {
            const surfaceOptions = this.mapSurfaceType(point.type, 45);
            console.log('surface', point.type);

            instruments.setPitches(surfaceOptions.scale, surfaceOptions.root);
            instruments.chime.setPattern(surfaceOptions.pattern as PatternName);

            const weatherOptions = this.mapWeather(point);
            console.log('windSpeed', point.weather?.windSpeed);

            instruments.chime.setProbability(weatherOptions.prob);
            instruments.chime.setInterval(weatherOptions.interval);
            instruments.chime.setEnvDuration(weatherOptions.envDur);
            instruments.sonar.setLfoFreq(weatherOptions.lfofreq);

            console.log(instruments.chime.getCurrentOptions());
            console.log(instruments.sonar.getCurrentOptions());
        },
        setInstrPan(geoInstr: GeoInstruments, value: number) {
            geoInstr.instruments.setPan(value);
        }
    }
});
