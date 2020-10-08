# Design Patterns in Typescript

Todos nós usamos padrões de design em nosso código. Às vezes, é desnecessário, mas pode dar uma estrutura agradável e compreensível para sua arquitetura. Como o TypeScript está ficando mais popular, decidi mostrar alguns dos padrões populares com sua implementação.


##Padrões abordados:
- Singleton
- Fluent Interface
- Observer 
- Composite 
- Abstract factory


------------


###Singleton:
#### Visão geral
Singleton é a maioria dos padrões conhecidos no mundo da programação. Basicamente, você usa esse padrão se precisar instanciar um número restrito de instâncias. Você faz isso criando um construtor privado e fornecendo um método estático, que retorna uma instância da classe.

####Uso
Este padrão é usado em outros padrões. A fábrica e o construtor abstratos usam em suas próprias implementações. Às vezes, você usa singletons com fachadas, porque deseja fornecer apenas uma instância de uma fachada.


####Código　

```javascript
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
```

------------



###Interface Fluente
####Visão geral
Freqüentemente usado em bibliotecas de teste (por exemplo, Mocha, Cypress), uma interface fluente torna o código legível como prosa escrita. Ele é implementado usando encadeamento de métodos. Basicamente, todo método retorna isso. (self) e o encadeamento termina quando um método em cadeia retorna void. Além disso, outras técnicas usadas para uma interface fluente - funções aninhadas e escopo de objeto.

####Uso
Como mencionamos anteriormente, ele é usado para criar um código mais legível. Além disso, você pode facilmente compor objetos com esse padrão e criar consultas legíveis.

####Código

```javascript
class Book {
  private title: string | undefined;
  private author: string | undefined;
  private rating: number | undefined;
  private content: string | undefined;

  setTitle(title: string) {
    this.title = title;
    return this;
  }
  setAuthor(author: string) {
    this.author = author;
    return this;
  }
  setRating(rating: number) {
    this.rating = rating;
    return this;
  }
  setContent(content: string) {
    this.content = content;
    return this;
  }
  getInfo() {
    return `A ${this.title} book is written by ${this.author} with ${
      this.rating
    } out of 5 stars`;
  }
}

console.log(
  new Book()
    .setTitle('Voyna i Mir')
    .setAuthor('Lev Tolstoy')
    .setRating(3)
    .setContent('A very long and boring book... Once ago...')
    .getInfo(),
);
```

------------



###Observer
####Visão geral
Este padrão sugere que você tem um sujeito e alguns observadores. Cada vez que você atualiza seu estado de assunto, os observadores são notificados sobre isso. Esse padrão é muito útil quando você precisa vincular vários objetos uns aos outros com abstração e liberdade de implementação. Além disso, esse padrão é uma parte fundamental do familiar padrão de arquitetura model-view-controller (MVC). Fortemente usado em quase todas as bibliotecas de GUI.

####Uso
Você tem uma classe básica de Assunto, que possui 3 métodos: anexar, desanexar, notificar e uma lista de observadores, que implementou a interface Observer. Observer - é uma interface, que possui apenas um método - **update()**. Você adiciona observadores por **attach()**, remove-os por **detach()** e por **notify()** - chamando o método **update()** em cada um deles.

####Código
```javascript
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
```

------------



###Composite
####Visão geral
O padrão composto é um padrão que abstrai um grupo de objetos em uma única instância do mesmo tipo. O padrão composto é fácil de executar, testar e compreender. É usado sempre que é necessário representar uma hierarquia parte-todo como uma estrutura em árvore e para tratar parte e todo o objeto igualmente.

####Uso
Basicamente, existem duas maneiras de usar esse padrão: uniforme e seguro.

De maneira uniforme, você define as operações relacionadas aos filhos na interface do Component - ou seja, que Leaf e Composite são tratados da mesma forma. O ruim é que você perde a segurança de tipo porque operações relacionadas aos filhos podem ser realizadas em objetos Folha.

De maneira segura, as operações relacionadas aos filhos são definidas apenas na classe Composite. Objetos Folha e Composto são tratados de maneira diferente. Visto que as operações relacionadas aos filhos não podem ser realizadas no Leaf, você ganha segurança de tipo.

####Código
```javascript
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
 
````

------------



###Abstract Factory
####Visão geral
A fábrica abstrata é um padrão específico, que costumava criar um objeto abstrato com uma fábrica abstrata. Isso basicamente significa que você pode colocar cada fábrica que implementa o Abstract Factory e ela retornaria uma instância, que implementa a interface Abstract Object.

####Uso
Você define duas interfaces: uma de Abstract Factory e uma de Subject. Em seguida, você implementa o que quiser e expõe a interface. Um cliente não sabe o que está dentro, ele apenas obtém um objeto com métodos de implementação de uma interface.

####Código
```javascript
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
```

------------


###Referência

[Bits ans Pieces](https://www.netguru.com/codestories/top-5-most-used-patterns-in-oop-with-typescript)
