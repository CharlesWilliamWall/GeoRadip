import {
  LFO,
  Noise,
  OnePoleFilter,
  Multiply,
  Add,
  Subtract,
  GreaterThan,
  GreaterThanZero,
  Filter,
  Negate,
  Signal,
  Panner,
} from 'tone';
import { DCFilter } from "../component/DCFilter";

const lfo = new LFO(0.1, 0, 0.5); // lfo (freq = 0.1, min = 0, max= 0.5)

// ****** gust ********
// noise + filter
const gustNoise = new Noise('white');//.start();
const gustLop = new OnePoleFilter(0.5, 'lowpass');
const gustLop2 = new OnePoleFilter(0.5, 'lowpass');
const gustHip = new OnePoleFilter(15, 'highpass');
const gustNoiseMult = new Multiply(50);

gustNoise.chain(gustLop, gustLop2, gustHip, gustNoiseMult);

// //signal scalling
const gustInAdd = new Add(0.5);
const gustInMult = new Multiply();
const gustInSub = new Subtract(0.125);

lfo.connect(gustInAdd);
gustInAdd.connect(gustInMult); //square the inlet
gustInAdd.connect(gustInMult.factor);
gustInMult.connect(gustInSub);

const gustMultTotal = new Multiply(); // OUTPUT of gust
gustNoiseMult.connect(gustMultTotal);
gustInSub.connect(gustMultTotal.factor);

// ******* squall ********
//noise + filter
const squallNoise = new Noise('white');//.start();
const squallLop = new OnePoleFilter(3, 'lowpass');
const squallLop2 = new OnePoleFilter(3, 'lowpass');
const squallHip = new OnePoleFilter(15, 'highpass');
const squallNoiseMult = new Multiply(20);

squallNoise.chain(squallLop, squallLop2, squallHip, squallNoiseMult);

// TODO implement max util
// take the last 0.1 of the lfo
// [max~ (maxVal)] (Pd)= send maximum between maxValue and incoming signal
const maxValue = 0.4;
const grTh = new GreaterThan(maxValue);
const gateMult = new Multiply(); // keep just what is above maxValue

lfo.connect(grTh);
grTh.connect(gateMult);
lfo.connect(gateMult.factor);

const inverse = new Negate();
const invPlusOne = new Add(1); // create lower than ( 1 if lower than maxValue )

grTh.connect(inverse);
inverse.connect(invPlusOne);

const constMaxSig = new Signal(maxValue);

const multSig = new Multiply(); // remove what is above maxValue from the constant sig
invPlusOne.connect(multSig);
constMaxSig.connect(multSig.factor);

const finalAdd = new Add();
multSig.connect(finalAdd);
gateMult.connect(finalAdd.addend);

const squallInSub = new Subtract(0.4);
const squallInMult = new Multiply(8);
const squallSquare = new Multiply();

finalAdd.connect(squallInSub);
squallInSub.connect(squallInMult);
squallInMult.connect(squallSquare);
squallInMult.connect(squallSquare.factor);

const squallMultTotal = new Multiply(); //OUTPUT of squall
squallSquare.connect(squallMultTotal);
squallNoiseMult.connect(squallMultTotal.factor);

// wind speed
// add gust and squall control signals and clip output
const gustSquallAdd = new Add();
gustMultTotal.connect(gustSquallAdd);
squallMultTotal.connect(gustSquallAdd.addend);

const finalWSpeed = new Add();
squallMultTotal.connect(finalWSpeed);
gustMultTotal.connect(finalWSpeed.addend);

// TODO implement clip util
// manual constrain / clip for signals :o(
//0 if input is lower than 0, input value if not

const grThZero = new GreaterThanZero();
finalWSpeed.connect(grThZero);

const lowerBoundMult = new Multiply(); // with lower limit
finalWSpeed.connect(lowerBoundMult);
grThZero.connect(lowerBoundMult.factor);

// const grThMax = new GreaterThan(1); // max = 1;
// lowerMult.connect(grThMax);

// const neg = new Negate();
// grThMax.connect(neg);

// const plusOne = new Add(1);
// inverse.connect(plusOne);

// const clipMult = new Multiply(); // bring anything that goes beyond 1 to 0
// lowerMult.connect(clipMult);
// plusOne.connect(clipMult.factor);

// const clippedOut = new Add(); // OUTPUT for windspeed algo
// clipMult.connect(clippedOut);
// grThMax.connect(clippedOut.addend);

const multWSpeed = new Multiply(200);
const addWspeed = new Add(300);
lowerBoundMult.chain(multWSpeed, addWspeed);

// wind generator
const mainNoise = new Noise('pink'); //.start(); to have wind
// mainNoise.volume.value = 0;
const bdpass = new Filter(800, 'bandpass');
bdpass.Q.value = 1;
mainNoise.connect(bdpass);

const speedNotnull = new Add(0.3);
lowerBoundMult.connect(speedNotnull);

const noiseModul = new Multiply();
speedNotnull.connect(noiseModul);
bdpass.connect(noiseModul.factor);

// TODO : check weird effect on panning (pressure on one ear)
const outPanner = new Panner(0);
// const dc = new DCFilter();

export const dc = new OnePoleFilter(20, 'highpass').toDestination();

noiseModul.connect(outPanner);
outPanner.connect(dc);


export function start(){
    lfo.start();
    gustNoise.start();
    squallNoise.start();
    mainNoise.start();
}

export function stop(){
    gustNoise.stop();
    squallNoise.stop();
    mainNoise.stop();
    lfo.stop();
}

export function setVolume(volValue: number){
    mainNoise.volume.rampTo(volValue, 0.05);
}
export function setPan(panValue:number){
    outPanner.pan.value = panValue;
}


