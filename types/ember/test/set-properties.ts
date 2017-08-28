import Ember from 'ember';
import { assertType } from './lib/assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<{ name: string }>(Ember.setProperties(person, { name: 'Joe' }));
assertType<{ name: string, age: number }>(Ember.setProperties(person, { name: 'Joe', age: 35 }));

assertType<{ name: string }>(person.setProperties({ name: 'Joe' }));
assertType<{ name: string, age: number }>(person.setProperties({ name: 'Joe', age: 35 }));
