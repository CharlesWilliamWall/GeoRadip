import { LFO, Noise } from 'tone/Tone/source';
import { OnePoleFilter, Filter, Panner } from 'tone/Tone/component';
import {
    Multiply,
    Negate,
    Add,
    Subtract,
    GreaterThan,
    GreaterThanZero,
    Signal,
    Pow,
} from 'tone/Tone/signal';

export class Wind {
    readonly name = 'Wind';

    private _lfo: LFO;

    constructor() {
        this._lfo = new LFO(0.1, 0, 0.5); // (freq = 0.1, min = 0, max= 0.5)

        // ****** gust ********
        // noise + filter
        const gustNoise = new Noise('white'); //.start();
        const gustLop = new OnePoleFilter(0.5, 'lowpass');
        const gustLop2 = new OnePoleFilter(0.5, 'lowpass');
        const gustHip = new OnePoleFilter(15, 'highpass');
        const gustNoiseMult = new Multiply(50);

        // //signal scalling
        const gustInAdd = new Add(0.5);
        const gustInMult = new Multiply();
        const gustInSub = new Subtract(0.125);

        const gustMultTotal = new Multiply(); // OUTPUT of gust

        //gust connections
        this._lfo.connect(gustInAdd);
        gustInAdd.connect(gustInMult); //square the inlet
        gustInAdd.connect(gustInMult.factor);
        gustInMult.connect(gustInSub);

        gustNoise.chain(gustLop, gustLop2, gustHip, gustNoiseMult);

        gustNoiseMult.connect(gustMultTotal);
        gustInSub.connect(gustMultTotal.factor);

        // ******* squall ********
        //noise + filter
        const squallNoise = new Noise('white'); //.start();
        const squallLop = new OnePoleFilter(3, 'lowpass');
        const squallLop2 = new OnePoleFilter(3, 'lowpass');
        const squallHip = new OnePoleFilter(15, 'highpass');
        const squallNoiseMult = new Multiply(20);

        //squall connections
        squallNoise.chain(squallLop, squallLop2, squallHip, squallNoiseMult);


    }
}
