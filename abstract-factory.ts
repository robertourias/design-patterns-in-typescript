interface SoundFactory {
    create: Function;
  }
  
  interface Sound {
    enable: Function;
  }
  
  class FerrariSound implements Sound {
    enable() {
      console.log('Wrooom-wrooom-wrooooom!');
    }
  }
  
  class BirdSound implements Sound {
    enable() {
      console.log('Flap-flap-flap');
    }
  }
  
  class FerrariSoundFactory implements SoundFactory {
    create() {
      return new FerrariSound();
    }
  }
  
  class BirdSoundFactory implements SoundFactory {
    create() {
      return new BirdSound();
    }
  }
  
  (() => {
    let factory: SoundFactory | null = null ;
  
    const type = Math.random() > 0.5 ? 'ferrari' : 'bird';
  
    switch (type) {
      case 'ferrari':
        factory = new FerrariSoundFactory();
        break;
      case 'bird':
        factory = new BirdSoundFactory();
        break;
    }
  
    if (factory) {
      const soundMaker = factory.create();
      soundMaker.enable();
    }
  
  })();
  
  /*
  ts-node abstract-factory.ts
  Flap-flap-flap
  
  ts-node abstract-factory.ts
  Wrooom-wrooom-wrooooom!
  
  ts-node abstract-factory.ts
  Flap-flap-flap
  
  ts-node abstract-factory.ts
  Wrooom-wrooom-wrooooom!
  */