export function map(inVal: number, inMin: number, inMax: number, outMin: number, outMax: number ){
    return (inVal - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
 // get int between min and max (exclusive)
export function  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}