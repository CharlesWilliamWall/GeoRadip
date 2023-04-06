import { AMSynth, Panner, LFO, Loop, Transport, FrequencyClass } from 'tone/Tone';
import type { AudioRange, NormalRange, Seconds, Time } from 'tone/Tone/core/type/Units';
import type { Frequency } from 'tone/Tone/core/type/Units';
import type { ToneOscillatorType } from 'tone/Tone/source/index';
import { Gain } from 'tone/Tone/core/context/Gain';
import type { MidiNote } from 'tone/Tone/core/type/NoteUnits';
import type { Scale } from './scales';

export interface SonarOptions {
    lfo: {
        frequency: Frequency;
        type: ToneOscillatorType;
    };
    note: MidiNote;
    gain: NormalRange;
    pan: AudioRange;
    loop: {
        interval: Seconds;
    };
    enveloppe: {
        duration: Seconds;
    };
}

export class Sonar {
    readonly name = 'Sonar';

    private _lfo: LFO;
    private _gain: Gain;
    private _synth: AMSynth;
    private _panner: Panner;
    private _loop: Loop;
    private _envDuration: Seconds;

    note: MidiNote;

    constructor() {
        const options = Sonar.getDefaults();

        this.note = options.note;
        this._envDuration = options.enveloppe.duration;
        this._lfo = new LFO(options.lfo.frequency, 0, 1).start();
        this._lfo.type = options.lfo.type;

        this._synth = new AMSynth({
            volume: 0,
            detune: 0,
            portamento: 0.8,
            harmonicity: 0.1,
            oscillator: {
                partialCount: 2,
                partials: [1, 0.030140817901234556],
                phase: 0,
                type: 'custom'
            },
            envelope: {
                attack: 0.01,
                attackCurve: 'linear',
                decay: 0.5,
                decayCurve: 'exponential',
                release: 2,
                releaseCurve: 'exponential',
                sustain: 0.5
            },
            modulation: {
                partialCount: 0,
                // partials: [],
                phase: 0,
                // type: 'pulse',
                type: 'triangle'
                // width: 0.25
            },
            modulationEnvelope: {
                attack: 0.5,
                attackCurve: 'linear',
                decay: 0.01,
                decayCurve: 'exponential',
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
            }
        });
        this._gain = new Gain(options.gain);
        this._panner = new Panner(options.pan);

        //connections
        // this._lfo.connect(this._gain.gain)
        this._lfo.connect(this._gain.gain);
        this._synth.connect(this._gain);
        this._gain.connect(this._panner);
        this._panner.toDestination();

        // TODO error: retrig before current time
        //retrig
        this._loop = new Loop((time) => {
            this._synth.triggerAttackRelease(
                FrequencyClass.mtof(this.note),
                this._envDuration,
                time
            );
        }, options.loop.interval);
    }

    // TODO add Pattern to have sonar retriggered
    start() {
        this._loop.start();
        if (Transport.state === 'paused' || Transport.state === 'stopped') {
            Transport.start();
        }
        // this._lfo.start(); // causes DOM exception if called when map moves :o(
    }
    stop() {
        this._loop.stop();
        // this._lfo.disconnect(this._gain.gain);
        // this._lfo.stop();
    }
    trigger() {
        this._synth.triggerAttackRelease(this.note, 2);
    }

    setPan(value: number) {
        this._panner.pan.rampTo(value, 0.1);
    }
    setVolume(value: number){
        this._synth.volume.rampTo(value, 0.5);
    }
    setInterval(value: Time) {
        this._loop.interval = value;
    }
    setNote(scale: Scale, root: MidiNote) {
        // const middleNote = scale.intervals[Math.floor(scale.intervals.length / 2)];
        const middleNote = scale.intervals[1];
        // this.note = middleNote + root as MidiNote;
        this.note = (middleNote + root) as MidiNote;
        // console.log(this.note);
    }
    setLfoFreq(freq: number){
        this._lfo.frequency.rampTo(freq, 0.5); 
    }
    // getState(){
    //     return this._loop.state;
    // }
    getCurrentOptions(): SonarOptions {
        return {
            lfo: {
                frequency: this._lfo.frequency.value,
                type: this._lfo.type
            },
            note: this.note,
            gain: this._gain.gain.value,
            pan: this._panner.pan.value,
            loop: {
                interval: this._loop.interval as Seconds
            },
            enveloppe: {
                duration: this._envDuration
            }
        };
    }

    static getDefaults(): SonarOptions {
        return {
            lfo: {
                frequency: 3,
                type: 'triangle'
            },
            note: 60,
            gain: 1,
            pan: 0,
            loop: {
                interval: 7
            },
            enveloppe: {
                duration: 2
            }
        };
    }
    disconnect() {
        this._lfo.disconnect(this._gain.gain);
        this._synth.disconnect(this._gain);
        this._gain.disconnect(this._panner);
        this._panner.disconnect();
    }
    dispose(): this {
        this._lfo.dispose();
        this._gain.dispose();
        this._synth.dispose();
        this._panner.dispose();
        this._loop.dispose();
        return this;
    }
}
