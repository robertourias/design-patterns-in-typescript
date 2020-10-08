interface Component {
    operation: Function;
  }
  
  abstract class Leaf implements Component {
    operation() {}
  }
  
  abstract class Composite implements Component {
    protected childs: Component[] = [];
    operation() {
      this.childs.forEach(child => {
        child.operation();
      });
    }
    add(component: Component) {
      this.childs.push(component);
    }
    remove(component: Component) {
      this.childs.splice(this.childs.indexOf(component), 1);
    }
    getChild() {
      return this.childs;
    }
  }
  
  class Duck extends Composite {
    constructor(childs: Component[]) {
      super();
      this.childs = childs;
    }
  }
  
  class DuckVoice extends Leaf {
    operation() {
      console.log('Quack.');
    }
  }
  
  class DuckFly extends Composite {
    operation() {
      console.log('It flies.');
      super.operation();
    }
    add(component: Component) {
      super.add(component);
      return this;
    }
  }
  
  class Wing extends Leaf {
    operation() {
      console.log('Flap-flap-flap');
    }
  }
  
  const wings = [new Wing(), new Wing()];
  const flyAbility = new DuckFly().add(wings[0]).add(wings[1]);
  const voiceAbility = new DuckVoice();
  
  const duck = new Duck([flyAbility, voiceAbility]);
  
  duck.operation();
  