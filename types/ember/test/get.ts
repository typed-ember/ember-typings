import Ember from 'ember';
import { assertType } from './lib/assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<string>(Ember.get(person, 'name'));
assertType<number>(Ember.get(person, 'age'));

assertType<string>(person.get('name'));
assertType<number>(person.get('age'));

const pojo = { name: 'Fred' };

assertType<string>(Ember.get(pojo, 'name'));
