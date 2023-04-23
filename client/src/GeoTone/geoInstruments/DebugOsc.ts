import { Oscillator } from 'tone/Tone/source/oscillator/Oscillator';
import { Signal } from 'tone/Tone/signal/Signal';
import type { Decibels } from 'tone/Tone/core/type/Units';
import { context } from "tone/Tone"



export class DebugOsc {
    readonly name = 'Debug Oscillator';

    private _debugOsc: Oscillator;

    freqMod: Signal ;

    constructor(input?: Signal) {
        this._debugOsc = new Oscillator(200, 'sine');
        
        this.freqMod = new Signal(200);
        this._debugOsc.volume.value = -24;

        //connections
        this._debugOsc.toDestination();
        if(input){
            this.freqMod = input;
            this.freqMod.connect(this._debugOsc.frequency);            
        }
    }

    start() {
        // context;
        this._debugOsc.start();
        console.log("debug tone started");
        console.log("debug osc context", context);
        

    }
    stop() {
        this._debugOsc.stop();
    }

    setVolume(value: Decibels) {
        this._debugOsc.volume.rampTo(value, 0.1);
    }
}
