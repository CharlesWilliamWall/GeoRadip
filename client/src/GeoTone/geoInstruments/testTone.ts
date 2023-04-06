import { Oscillator } from 'tone/Tone/source/oscillator/Oscillator';
import type { Positive, Decibels } from 'tone/Tone/core/type/Units';
import { context } from "tone/Tone"

export class TestTone {
    readonly name = 'TestTone';

    private _osc: Oscillator;
    freq: Positive;

    constructor(freq?: Positive) {
        if (freq) {
            this.freq = freq;
        } else {
            this.freq = 432;
        } 

        this._osc = new Oscillator(this.freq, 'sine');
        this._osc.volume.value = -24;

        //connections
        this._osc.toDestination();
    }

    start() {
        
        // context.resume();
        this._osc.start();
        console.log("test tone started");
        console.log("test tone context", context);
        

    }
    stop() {
        this._osc.stop();
    }

    setVolume(value: Decibels) {
        this._osc.volume.rampTo(value, 0.1);
    }
}
