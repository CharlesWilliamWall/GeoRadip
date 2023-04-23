import { LFO, Noise } from 'tone/Tone/source';
import { Gain } from 'tone/Tone/core/context/Gain';
import { OnePoleFilter, Filter, Panner } from 'tone/Tone/component';
import { Multiply } from 'tone/Tone/signal';

export class CheapWind {
    readonly name = 'Wind';

    private _lfo: LFO;
    private _mainNoise: Noise;
    private _modlfo: LFO;
    // private _multiply: Multiply;

    private _bp: Filter;
    private _gain: Gain;
    private _pannerL: Panner;
    private _pannerR: Panner;

    constructor() {
        this._lfo = new LFO(0.025, 0.01, 0.015); // (freq = 0.1, min = 0, max= 0.5)
        this._lfo.type = 'sine';

        this._modlfo = new LFO(0.05, 500, 1500);
        this._modlfo.type = 'sine';
        
        this._mainNoise = new Noise('white');
        this._bp = new Filter(800, 'bandpass');

        this._gain = new Gain(0);

        this._pannerL = new Panner(-0.3);
        this._pannerR = new Panner(0.3);
        
        //connections
        this._modlfo.connect(this._bp.frequency);
        this._lfo.connect(this._gain.gain);
        this._mainNoise.connect(this._bp);
        this._bp.connect(this._gain);
        this._gain.fan(this._pannerL, this._pannerR);
        this._pannerL.toDestination();
        this._pannerR.toDestination();
        // this._mainNoise.toDestination();
    }

    start(){
        this._lfo.start();
        this._modlfo.start();
        this._mainNoise.start();
    }
    stop(){ 
        this._lfo.stop();
        this._modlfo.stop();
        this._mainNoise.stop();
    }
    // getState(){
    //     return this._mainNoise.state;
    // }
    setVolume(value: number){
        this._mainNoise.volume.rampTo(value, 0.5);
    }

}
