import { MonoSynth, Panner, Transport, Pattern, FrequencyClass } from 'tone/Tone';
import type { MidiNote } from 'tone/Tone/core/type/NoteUnits';
import type { PatternName } from 'tone/Tone/event/PatternGenerator';
import type { AudioRange, Seconds } from 'tone/Tone/core/type/Units';
import type { NormalRange } from 'tone/Tone/core/type/Units';
import type { Time } from 'tone/Tone/core/type/Units';
import * as Scales from './scales';
import type { Scale } from './scales';

export interface ChimeOptions {
    scale: Scale;
    root: MidiNote;
    pan: AudioRange;

    pattern: {
        humanize: Seconds;
        probability: NormalRange;
        name: PatternName;
        interval: Seconds;
    };
    envelope: {
        duration: Seconds;
        durationVar: Seconds;
        velocity: NormalRange;
        velocityVar: NormalRange;
    };
}

// this class should extend some base class (instrument or tone with context )
// to acces the base functions of any Tone object (dispose, volume, etc.)
export class Chime {
    readonly name = 'Chime';

    private _scale: Scale;

    root: MidiNote;

    private _humanizeVal: Seconds;

    private _probability: NormalRange;

    private _envDuration: Seconds; // duration of the envelope in seconds

    private _envDurationVar: Seconds; // random variation on the envelope's duration

    velocity: NormalRange;

    velocityVar: NormalRange; // amplitude of variation of velocity

    private _patternName: PatternName;

    private _synth: MonoSynth;

    private _panner: Panner;

    private _pattern: Pattern<any>;

    private _interval: Seconds;

    // TODO getDefaults function
    // constructor(root: MidiNote, scale: Scale)
    constructor() {
        const options = Chime.getDefaults();
        this.root = options.root;
        this._scale = options.scale;
        this._patternName = options.pattern.name;
        this._humanizeVal = options.pattern.humanize;
        this._probability = options.pattern.probability;
        this._envDuration = options.envelope.duration;
        this._envDurationVar = options.envelope.durationVar;
        this.velocity = options.envelope.velocity;
        this.velocityVar = options.envelope.velocityVar;
        this._interval = options.pattern.interval;

        this._synth = new MonoSynth({
            volume: 0,
            detune: 0,
            portamento: 0.2,
            envelope: {
                attack: 0.01,
                attackCurve: 'linear',
                decay: 0.3,
                decayCurve: 'exponential',
                release: 0.8,
                releaseCurve: 'exponential',
                sustain: 0.6
            },
            filter: {
                Q: 1,
                detune: 0,
                frequency: 0,
                gain: 0,
                rolloff: -12,
                type: 'lowpass'
            },
            filterEnvelope: {
                attack: 0.001,
                attackCurve: 'linear',
                decay: 0.7,
                decayCurve: 'exponential',
                release: 1,
                releaseCurve: 'exponential',
                sustain: 0.1,
                baseFrequency: 300,
                exponent: 2,
                octaves: 4
            },
            oscillator: {
                detune: 0,
                frequency: 0,
                partialCount: 0,
                partials: [],
                phase: 0,
                type: 'fatsine',
                count: 3,
                spread: 20
            }
        });

        this._panner = new Panner(options.pan);

        // const freqScale = Frequency(this.root).harmonize(this.scale.intervals);
        this._pattern = new Pattern(
            (time, note) => {
                // console.log(note);

                // trigger...(note, duration, time of trigger, velocity)
                this._synth.triggerAttackRelease(
                    FrequencyClass.mtof((note + this.root) as MidiNote),
                    this.calcDuration(),
                    time + this._humanizeVal,
                    this.calcVelo()
                );
            },

            this._scale.intervals,
            this._patternName
        );

        this._pattern.humanize = this._humanizeVal;
        this._pattern.probability = this._probability;
        //The time between successive callbacks. better than using humanize ?
        this._pattern.interval = this._interval;

        // connections
        this._synth.connect(this._panner);
        this._panner.toDestination();
    }

    start() {
        // context.resume();
        this._pattern.start();
        // Transport.start(); // move to general controls (store ?)
        // console.log("chime context", context);

        // Transport.start();
        if (Transport.state === 'paused' || Transport.state === 'stopped') {
            Transport.start();
        }
    }
    stop() {
        this._pattern.stop();
    }

    setHumanize(variation: number) {
        this._pattern.humanize = variation;
    }

    setProbability(chance: number) {
        this._pattern.probability = chance;
    }

    setPattern(pattern: PatternName) {
        this._pattern.pattern = pattern;
    }
    setScale(newScale: Scale) {
        // this._pattern.values = newScale.intervals;
        this._scale = newScale;
    }

    setInterval(value: Time) {
        this._pattern.interval = value;
    }
    setEnvDuration(duration: Seconds){
        this._envDuration = duration;
    }
    protected calcDuration(): number {
        return this._envDuration + Math.random() * this._envDurationVar;
    }

    protected calcVelo(): number {
        const velo = this.velocity + Math.random() * this.velocityVar;
        if (velo > 1) {
            return 1;
        } else {
            return velo;
        }
    }

    setPan(value: number) {
        this._panner.pan.rampTo(value, 0.1);
    }
    setRoot(note: MidiNote) {
        this.root = note;
    }
    setVolume(value: number){
        this._synth.volume.rampTo(value, 0.5);
    }
    // getState(){
    //     return this._pattern.state;
    // }
    getCurrentOptions(): ChimeOptions {
        return {
            scale: this._scale,
            root: this.root,
            pan: this._panner.pan.value,

            pattern: {
                humanize: this._humanizeVal,
                probability: this._probability,
                name: this._pattern.pattern,
                interval: this._pattern.interval as Seconds
            },
            envelope: {
                duration: this._envDuration,
                durationVar: this._envDurationVar,
                velocity: this.velocity,
                velocityVar: this.velocityVar
            }
        };
    }

    static getDefaults(): ChimeOptions {
        return {
            scale: Scales.getScale('monotone'),
            root: 60,
            pan: 0,
            pattern: {
                humanize: 0.1,
                probability: 0.5,
                name: 'randomOnce',
                interval: 1
            },
            envelope: {
                duration: 0.1,
                durationVar: 0.3,
                velocity: 0.2,
                velocityVar: 0.3
            }
        };
    }
    disconnect(){
        this._synth.disconnect();
        this._panner.disconnect();
    }
    dispose(): this {
        this._synth.dispose();
        this._pattern.dispose();
        this._panner.dispose();
        return this;
    }
}
