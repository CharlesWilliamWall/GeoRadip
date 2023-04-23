// import { TestTone } from './TestTone';
// import { DebugOsc } from './DebugOsc';
import { Sonar } from './Sonar';
import { Chime } from './Chime';
import { context } from 'tone/Tone';
// import * as Scales from './scales';
import type { Scale } from './scales';
import type { MidiNote } from 'tone/Tone/core/type/NoteUnits';
// import type { PatternName } from 'tone/Tone/event/PatternGenerator';
import type { SonarOptions } from './Sonar';
import type { ChimeOptions } from './Chime';

export interface GeoInstruments {
    id: number;
    instruments: Instruments;
}

// export interface GeoInstrumentsOptions {
//     baseNote: MidiNote;
//     scale: Scale;
//     pattern: PatternName;
// }

// type and interface difference
//https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c

// export type GeoInstrumentsOptions = SonarOptions & ChimeOptions;
export interface GeoInstrumentsOptions extends SonarOptions, ChimeOptions {};

export class Instruments {
    readonly name = 'instruments';

    sonar: Sonar;
    chime: Chime;

    // scale: Scale;
    // root: MidiNote;

    _state: string;
    get state() {
        return this._state;
    }
    private set state(value: string) {
        this._state = value;
    }
    // private _scales: string[];

    // constructor(options?: GeoInstrumentsOptions)
    constructor() {
        // this._scales = Scales.getScaleNames();
        // const rdmInt = this.getRandomInt(0, this._scales.length-1); // get a random scale but exclude chromatic
        // this.scale = Scales.getScale(this._scales[rdmInt]);
        this.chime = new Chime(); 
        this.sonar = new Sonar();

        // this.scale = this.chime.scale;
        // this.root = this.chime.root;

        this._state = 'started';
    }

    start() {
        
        this.chime.start();
        this.sonar.start();
        this._state = 'started';

    }
    stop() {
        this.chime.stop();
        this.sonar.stop();
        this._state = 'stopped';
    }
    setPan(value: number) {
        this.chime.setPan(value);
        this.sonar.setPan(value);
    }
    setVolume(value: number){
        this.chime.setVolume(value);
        this.sonar.setVolume(value);
    }
    setPitches(scale: Scale, root: MidiNote) {
        this.chime.setScale(scale);
        this.chime.setRoot(root);
        this.sonar.setNote(scale, root);
    }
    contextState() {
        console.log('instruments context ==> ', context.state);
        console.log(context);
    }

    static getDefaults():  GeoInstrumentsOptions{
        // TODO make better return so we don't have the same fields in the same object
        //separate Sonar and Chime better ? 
        const a = Object.assign({},Sonar.getDefaults(), Chime.getDefaults())
        // return Object.assign({},Sonar.getDefaults(), Chime.getDefaults());
        // console.log(a);
        return a;
        // console.log(Sonar.getDefaults());
        // console.log(Chime.getDefaults());
    }
    disconnect(){
        this.sonar.disconnect();
        // this.chime.disconnect();
    }
    dispose() {
        this.sonar.dispose();
        // this.chime.dispose();

    }
}
