class Singleton {
    private static instance: Singleton | null;
    private constructor() {}
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new Singleton();
      }
      return this.instance;
    }
  }
  
  console.log(Singleton.getInstance() === Singleton.getInstance());
  //true