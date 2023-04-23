import { context, Transport } from "tone";

export function start() {
    context.resume();
        Transport.start();
}

export function stop() {
    Transport.stop()
}