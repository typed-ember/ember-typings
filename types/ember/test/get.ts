import Ember from 'ember';
import { assertType } from './lib/assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
    capitalized: Ember.computed<string>(function() {
        return this.get('name').toUpperCase();
    })
});

assertType<string>(Ember.get(person, 'name'));
assertType<number>(Ember.get(person, 'age'));
assertType<string>(Ember.get(person, 'capitalized'));

assertType<string>(person.get('name'));
assertType<number>(person.get('age'));
assertType<string>(person.get('capitalized'));

const pojo = { name: 'Fred' };

assertType<string>(Ember.get(pojo, 'name'));
