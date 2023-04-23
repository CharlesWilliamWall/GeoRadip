import { Negate, GreaterThan, Signal, Add } from 'tone/Tone/signal';
import type { SignalOptions } from 'tone/Tone/signal';
import type { ToneAudioNode } from 'tone/Tone/core/context/ToneAudioNode';
import type { Param } from 'tone/Tone/core/context/Param';
import { optionsFromArguments } from 'tone/Tone/core/util/Defaults';
import { readOnly } from 'tone/Tone/core/util/Interface';

export type LowerThanOptions = SignalOptions<'number'>;

/**
 * Do the inverse of GreatherThan.
 * Output 1 if the signal is lower than the value, otherwise outputs 0.
 * can compare two signals or a signal and a number.
 *
 *  @example
 * return Tone.Offline(() => {
 * 	const lt = new Tone.LowerThan(2).toDestination(); // test exemple
 * 	const sig = new Tone.Signal(1).connect(lt);
 *  sig.rampTo(3, 0.1)
 * }, 0.1, 1);
 * @category Signal
 */

export class LowerThan extends Signal<'number'> {
    readonly name: string = 'LowerThan';
    readonly override: boolean = false;

    readonly input: ToneAudioNode;
    readonly output: ToneAudioNode;

    /**
     * compare the incoming signal
     */
    private _gt: GreaterThan;

    /**
     * Invert the result of GreatherThan
     */
    private _neg: Negate;

    /**
     * Add 1 to bring the output to 1 or 0
     */
    private _plusOne: Add;

    readonly comparator: Param<'number'>;

    /**
     * @param value The value to compare to
     */

    constructor(value?: number);
    constructor(options?: Partial<LowerThanOptions>);
    constructor() {
        super(Object.assign(optionsFromArguments(LowerThan.getDefaults(), arguments, ['value'])));
        const options = optionsFromArguments(LowerThan.getDefaults(), arguments, ['value']);

        this._gt = this.input = new GreaterThan({
            context: this.context,
            value: options.value
        });

        this._neg = new Negate();

        this._plusOne = this.output = new Add({
            context: this.context,
            value: 1
        });

        this.comparator = this._param;

        readOnly(this, 'comparator');

        //connections
        this._gt.chain(this._neg, this._plusOne);
    }

    static getDefaults(): LowerThanOptions {
        return Object.assign(Signal.getDefaults(), {
            value: 0
        });
    }

    dispose(): this {
        super.dispose();
        this._gt.dispose();
        this._neg.dispose();
        this._plusOne.dispose();
        this.comparator.dispose();
        return this;
    }
}
