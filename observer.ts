async function sleep(msec: any) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
  
interface Observer {
    update: Function;
}
  
  class Observable {
    constructor(protected observers: Observer[] = []) {}
  
    attach(observer: Observer) {
      this.observers.push(observer);
    }
    detach(observer: Observer) {
      this.observers.splice(this.observers.indexOf(observer), 1);
    }
    notify(object = {}) {
      this.observers.forEach(observer => {
        observer.update(object);
      });
    }
  }
  
  class GPSDevice extends Observable {
    constructor(private coordinates: any = { x: 0, y: 0, z: 0 }) {
      super();
    }
  
    process() {
      this.coordinates.x = Math.random() * 100;
      this.coordinates.y = Math.random() * 100;
      this.coordinates.z = Math.random() * 100;
  
      this.notify(this.coordinates);
    }
  }
  
  class Logger implements Observer {
    update(object: any) {
      console.log(`Got the next data ${object.x} ${object.y} ${object.z}`);
    }
  }
  
  class TwoDimensionalLogger implements Observer {
    update(object: any) {
      console.log(`Got the next 2D data ${object.x} ${object.y}`);
    }
  }
  
  const gps = new GPSDevice();
  const logger = new Logger();
  const twoDLogger = new TwoDimensionalLogger();
  
  gps.attach(logger);
  gps.attach(twoDLogger);
  
  (async () => {
    for (let tick = 0; tick < 100; tick++) {
      await (async () => {
        await sleep(1000);
        if (tick === 3) gps.detach(logger)
        gps.process();
      })();
    }
  })();