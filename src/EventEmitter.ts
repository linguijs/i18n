interface EventMap {
  [event: string]: any[];
}

type EventListener<T extends any[]> = (...args: T) => void;

type EnsureArgs<T> = T extends any[] ? T : any[];

class EventEmitter<EventsMapped = EventMap> {
  private observers: {
    [event: string]: Map<(...args: any[]) => void, number>;
  };

  constructor() {
    // This is an Object containing Maps:
    //
    // { [event: string]: Map<listener: function, numTimesAdded: number> }
    //
    // We use a Map for O(1) insertion/deletion and because it can have functions as keys.
    //
    // We keep track of numTimesAdded (the number of times it was added) because if you attach the same listener twice,
    // we should actually call it twice for each emitted event.
    this.observers = {};
  }

  on<EventName extends keyof EventsMapped & string>(
    events: EventName,
    listener: EventListener<EnsureArgs<EventsMapped[EventName]>>,
  ) {
    events.split(' ').forEach((event) => {
      if (!this.observers[event]) this.observers[event] = new Map();
      const numListeners = this.observers[event].get(listener) || 0;
      this.observers[event].set(listener, numListeners + 1);
    });

    return this;
  }

  off<EventName extends keyof EventsMapped & string>(
    event: EventName,
    listener?: EventListener<EnsureArgs<EventsMapped[EventName]>>,
  ) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }

    this.observers[event].delete(listener);
  }

  emit<EventName extends keyof EventsMapped & string>(event: EventName, ...args: EnsureArgs<EventsMapped[EventName]>) {
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }

    if (this.observers['*']) {
      const cloned = Array.from(this.observers['*'].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }
}

export default EventEmitter;
