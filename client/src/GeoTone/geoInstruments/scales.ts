// C4 = middle C, A4 = 440,
import { Frequency } from "tone/Tone";
// import type { Frequency as Freq } from "tone/Tone/core/type/Units";


export interface Scale {
    name: string;
    intervals: number[];
}

const scales: Scale[] = [
    //koshi
    //Terra (G C E F G C E G)
    {
        name: 'terra',
        intervals: [0, 5, 9, 10, 12, 17, 21, 24]
    },
    //Aria (A C E A B C E B)
    {
        name: 'aria',
        intervals: [0, 3, 7, 14, 16, 17, 21, 29]
    },

    // Aqua (A D F G A D F A / Pentatonic)
    {
        name: 'aqua',
        intervals: [0, 5, 8, 10, 12, 17, 20, 24]
    },

    // Ignis (G B D G B D G A / Pentatonic)
    {
        name: 'ignis',
        intervals: [0, 4, 7, 12, 16, 19, 26]
    },

    //zaphir
    // Crystalide – G A B D A G B D  (spring)
    {
        name: 'crystalide',
        intervals: [0, 2, 4, 7, 14, 24, 27, 30]
    },

    // Sunray – G# B C# E G# E A C#  (summer)
    {
        name: 'sunray',
        intervals: [0, 2, 4, 7, 11, 14, 17, 21]
    },

    // Twilight – E G B C E G B C  (autumn)
    {
        name: 'twilight',
        intervals: [0, 3, 7, 8, 12, 15, 19, 20]
    },

    // Sufi – F A D F A G A D  (intermediate)
    {
        name: 'sufi',
        intervals: [0, 4, 9, 12, 16, 26, 28, 33]
    },

    // Blue Moon – D F A B C E A# C  (winter)
    {
        name: 'blueMoon',
        intervals: [0, 3, 7, 9, 10, 14, 20, 22]
    },
    //monotone
    {
        name: 'monotone',
        intervals: [0, 0, 12, 0, 0, 0, 12, 12]
    },
    // duotone
    {
        name: 'duotone', 
        intervals: [0, 7, 12, 0, 12, 7, 0, 0]
    },
    // chromatic
    {
        name: 'chromatic',
        intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    //add space scale (third encounters)
    {
        name: 'thirdEncounters',
        intervals: [14, 16, 12, 0, 9],
    }
];

export function getScale(name: string): Scale {
    let outScale = {
        name: "",
        intervals: [ 0, 0, 0, 0, 0, 0, 0, 0]
    };
    scales.forEach((scale) => {
        if (scale.name == name) 
        outScale = scale;
    });
    return outScale;
}

export function getScaleNames(): string[] {
    const names: string[] = [];
    scales.forEach((scale) => {
        names.push(scale.name);
    });

    return names;
}

export function scaleToFreq(scale: Scale, root: any){
    const freqScale = Frequency(root).harmonize(scale.intervals);
        return freqScale;
};
