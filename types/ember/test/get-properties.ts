import Ember from 'ember';
import { assertType } from './lib/assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<{ name: string }>(Ember.getProperties(person, 'name'));
assertType<{ name: string, age: number }>(Ember.getProperties(person, 'name', 'age'));
assertType<{ name: string, age: number }>(Ember.getProperties(person, [ 'name', 'age' ]));

assertType<{ name: string }>(person.getProperties('name'));
assertType<{ name: string, age: number }>(person.getProperties('name', 'age'));
assertType<{ name: string, age: number }>(person.getProperties([ 'name', 'age' ]));

const pojo = { name: 'Fred', age: 29 };
assertType<{ name: string, age: number }>(Ember.getProperties(pojo, 'name', 'age'));
