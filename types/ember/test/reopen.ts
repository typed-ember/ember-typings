import Ember from 'ember';
import { assertType } from "./lib/assert";

const Person = Ember.Object.extend({
    name: '',
    sayHello() {
        alert(`Hello. My name is ${this.get('name')}`);
    }
});

assertType<string>(Person.create().name);
assertType<void>(Person.create().sayHello());

const Person2 = Person.reopenClass({
    species: 'Homo sapiens',

    createPerson(name: string): typeof Person.prototype {
        return Person.create({ name });
    }
});

assertType<string>(Person2.create().name);
assertType<void>(Person2.create().sayHello());
assertType<string>(Person2.species);

let tom = Person2.create({
    name: 'Tom Dale'
});
let yehuda = Person2.createPerson('Yehuda Katz');

tom.sayHello(); // "Hello. My name is Tom Dale"
yehuda.sayHello(); // "Hello. My name is Yehuda Katz"
alert(Person2.species); // "Homo sapiens"

const Person3 = Person2.reopen({
    goodbyeMessage: 'goodbye',

    sayGoodbye() {
        alert(`${this.get('goodbyeMessage')}, ${this.get('name')}`);
    }
});

const person3 = Person3.create();
person3.get('name');
person3.get('goodbyeMessage');
person3.sayHello();
person3.sayGoodbye();
