import { FMSynth, Pattern, FrequencyClass, Freeverb, Transport } from 'tone/Tone';
import type { MidiNote } from 'tone/Tone/core/type/NoteUnits';
import type { Seconds } from 'tone/Tone/core/type/Units'
import type { PatternName } from 'tone/Tone/event/PatternGenerator';
import type { Scale } from './scales';
import * as Scales from './scales';

export class SpaceSynth {
    readonly name = 'SpaceSynth';

    private _synth: FMSynth;
    private _pattern: Pattern<any>;
    private _reverb: Freeverb;

    private _scale: Scale;
    private _patternName: PatternName;
    private _interval: Seconds;

    root: MidiNote;

    constructor() {
        this._synth = new FMSynth({
            volume: -12,
            detune: 0,
            portamento: 0,
            harmonicity: 1,
            oscillator: {
                partialCount: 0,
                // partials: [],
                phase: 0,
                type: 'sine'
            },
            envelope: {
                attack: 0.1,
                attackCurve: 'linear',
                decay: 0.2,
                decayCurve: 'exponential',
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
            },
            modulation: {
                partialCount: 0,
                partials: [],
                phase: 0,
                type: 'triangle'
            },
            modulationEnvelope: {
                attack: 0.2,
                attackCurve: 'linear',
                decay: 0.01,
                decayCurve: 'exponential',
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
            },
            modulationIndex: 12.22
        });

        this.root = 55 +12 as MidiNote;
        this._scale = Scales.getScale('thirdEncounters');
        this._patternName = 'up';

        this._pattern = new Pattern(
            (time, note) => {
                // trigger...(note, duration, time of trigger, velocity)
                this._synth.triggerAttackRelease(
                    FrequencyClass.mtof((note + this.root) as MidiNote),
                    0.4,
                    time,
                    1
                );
            },
            this._scale.intervals,
            this._patternName
        );

        this._pattern.interval = this._interval = 2;


        this._reverb = new Freeverb();
        this._reverb.dampening = 1000;
        this._reverb.roomSize.value = 0.8;

        //connections
        this._synth.connect(this._reverb);
        this._reverb.toDestination();
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
    setVolume(value: number){
        this._synth.volume.rampTo(value, 0.5);
    }
    // getState(){
    //     return this._pattern.state;
    // }
}
