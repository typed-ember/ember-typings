import Ember from 'ember';
import { assertType } from './lib/assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
    capitalized: Ember.computed<string>(function() {
        return this.get('name').toUpperCase();
    })
});

assertType<string>(Ember.set(person, 'name', 'Joe'));
assertType<number>(Ember.set(person, 'age', 35));
assertType<string>(Ember.set(person, 'capitalized', 'JOE'));

assertType<string>(person.set('name', 'Joe'));
assertType<number>(person.set('age', 35));
assertType<string>(person.set('capitalized', 'JOE'));

const pojo = { name: 'Fred' };

assertType<string>(Ember.set(pojo, 'name', 'Joe'));
