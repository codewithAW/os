import type { SimulationEvent } from './types';

type Subscriber = (event: SimulationEvent) => void;
const subscribers = new Set<Subscriber>();

export function emitSimulationEvent(event: SimulationEvent) {
  subscribers.forEach((subscriber) => subscriber(event));
}

export function subscribeToSimulationEvents(subscriber: Subscriber) {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}
