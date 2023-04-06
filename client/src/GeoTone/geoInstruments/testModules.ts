 
// import type { InputNode } from 'tone';
// import * as Tone from 'tone';
// import { DCFilter } from '../component/DCFilter'
 
// const filter = new DCFilter().toDestination();
// const abs = new Tone.Abs();
// const osc = new Tone.Oscillator();
  
// osc.chain(abs, filter );
// osc.start();

import {
    MonoSynth,
    Reverb,
    Pattern,
    Loop,
    Transport,
    MidiClass,
    context,
    Frequency
} from 'tone/Tone';
import type { MidiNote } from 'tone/Tone/core/type/NoteUnits';
// import * as Tone from 'tone/Tone';
import type { Scale } from './scales';
import * as Scales from './scales';

// const newScale = MidiClass.mtof(60);
// const newScale = Frequency("A4").harmonize(Scales.terra.intervals);
// console.log("scale", newScale);
// console.log(Scales.terra.intervals.length);
// console.log(context.state);
// console.log('voice context',context.currentTime);

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

export const synth = new MonoSynth().toDestination();



const baseNote = 53;
// let degree = 0;
// let note;

const currentScale = Scales.getScale('sufi');

const intv = currentScale.intervals;

// get int between 0 and max (exclusive)
// function getRandomInt(max: number): number {
//     return Math.floor(Math.random() * max);
// }

const freqScale = Frequency(baseNote).harmonize(intv);
// console.log(freqScale);

// function intervalToFreq(intervals: number[], baseNote: MidiNote) : {

// }
// const loop = new Loop((time) => {
//     note = MidiClass.mtof((intv[degree] + transpo) as MidiNote);
//     synth.triggerAttackRelease(note, '16n', time);
//     // degree += 1;
//     degree = (intv.length);
//     if (degree === intv.length) degree = 0;
// }, '8n');

// loop.humanize = "32n";
// loop.probability = 0.9;

const pattern = new Pattern(
    (time, note) => {
        // trigger...(note, duration, time of trigger, velocity)
        synth.triggerAttackRelease(note.toFrequency(), 0.1, time + 0.1, 0.5);
    },
    freqScale,
    'randomOnce'
);

pattern.humanize = 0.1;
pattern.probability = 0.9;

export function start() {
    // loop.start();
    pattern.start();
    context.resume();
    Transport.start();

    // console.log();
    console.log('loop context', context.state);
    console.log('voice context', context.currentTime);
    console.log('loop context', pattern.context);
}
export function stop() {
    // loop.stop();
    pattern.stop();
}
