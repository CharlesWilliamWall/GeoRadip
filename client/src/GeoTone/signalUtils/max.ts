// import { ToneAudioNodeOptions } from "../core/context/ToneAudioNode";
// import { SignalOperator } from "./SignalOperator";
import { ToneAudioNode } from "tone/Tone/core/context/ToneAudioNode";
import type { ToneAudioNodeOptions } from "tone/Tone/core/context/ToneAudioNode";
import { SignalOperator } from "tone/Tone/signal/SignalOperator";
import { GreaterThan } from "tone/Tone/signal/GreaterThan";
import { Negate } from "tone/Tone/signal/Negate";
import { Add } from "tone/Tone/signal/Add";
import { Multiply } from "tone/Tone/signal/Multiply";
import { Signal } from "tone/Tone/signal/Signal";

export interface MaxOptions extends ToneAudioNodeOptions{
    max: number;
}

/**
 * Return maximum between argument and incomming signal
 *
 * @example
 
 * @category Signal
 */

export class Max<Options extends MaxOptions = MaxOptions> extends SignalOperator<Options> {
    readonly name: string = 'Max';

    private _max: number;


	// readonly input: ToneAudioNode;
	// readonly output: ToneAudioNode;

    private _gth: GreaterThan;

    private _multIn: Multiply;

    private _neg: Negate;

    private _addOne: Add;

    private _maxSign: Signal;

    private _multSig: Multiply;

    private _finalAdd: Add;

    constructor(value:number){

    };
   

    // input: GreaterThan;



}