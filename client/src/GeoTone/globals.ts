import * as Tone from 'tone';

export function updateVolume(value: number) {
    Tone.getDestination().volume.rampTo(value, 0.05);
}

export async function startAudio() {
    await Tone.start();
    Tone.Transport.start()
    console.log(Tone.context.state);
    console.log(Tone.getContext());
    console.log('audio context started');
}

export function contextState(){
    console.log("context state" , Tone.context.state);
    
}
export function createContext() {
    const context = new Tone.Context();
    Tone.setContext(context);
}
