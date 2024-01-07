export enum EventBusName {
  Workouts = "workouts",
  Nutrition = "nutrition",
}
class EventBus {
  private callbacks: Record<
    string,
    {
      eventName: EventBusName;
      callback: () => void;
    }
  > = {};

  emit(eventName: EventBusName) {
    Object.values(this.callbacks)
      .filter((cb) => cb.eventName === eventName)
      .forEach((cb) => cb.callback());
  }

  subscribe(eventName: EventBusName, callback: () => void) {
    const callbackId = window.crypto.randomUUID();
    this.callbacks[callbackId] = { eventName, callback };
    const unsubscribe = () => {
      delete this.callbacks[callbackId];
    };
    return unsubscribe;
  }
}

const bus = new EventBus();
export default bus;
