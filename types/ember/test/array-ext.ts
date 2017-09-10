import Ember from 'ember';
import { assertType } from "./lib/assert";

declare global {
    interface Array<T> extends Ember.NativeArray<T> {}
}

class Person extends Ember.Object {
    name: string;
}

const person = Person.create({ name: 'Joe' });
const array = [ person ];

assertType<number>(array.get('length'));
assertType<Person>(array.get('firstObject'));
assertType<string[]>(array.mapBy('name'));
assertType<string[]>(array.map(p => p.get('name')));
