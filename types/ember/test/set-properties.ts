import Ember from 'ember';
import { assertType } from './lib/assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
    capitalized: Ember.computed<string>(function() {
        return this.get('name').toUpperCase();
    })
});

assertType<{ name: string }>(Ember.setProperties(person, { name: 'Joe' }));
assertType<{ name: string, age: number }>(Ember.setProperties(person, { name: 'Joe', age: 35 }));
assertType<{ name: string, capitalized: string }>(Ember.setProperties(person, { name: 'Joe', capitalized: 'JOE' }));

assertType<{ name: string }>(person.setProperties({ name: 'Joe' }));
assertType<{ name: string, age: number }>(person.setProperties({ name: 'Joe', age: 35 }));
assertType<{ name: string, capitalized: string }>(person.setProperties({ name: 'Joe', capitalized: 'JOE' }));
