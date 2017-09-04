import Ember from 'ember';
import { assertType } from './lib/assert';

const Person = Ember.Object.extend({
    firstName: '',
    lastName: '',
    age: 0,

    noArgs: Ember.computed(() => 'test'),

    fullName: Ember.computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),

    fullNameReadonly: Ember.computed('fullName', function() {
        return this.get('fullName');
    }).readOnly(),

    fullNameWritable: Ember.computed('firstName', 'lastName', {
        get() {
            return this.get('fullName');
        },
        set(key, value) {
            let [first, last] = value.split(' ');
            this.set('firstName', first);
            this.set('lastName', last);
            return value;
        }
    }),

    fullNameGetOnly: Ember.computed('fullName', {
        get() {
            return this.get('fullName');
        }
    }),

    fullNameSetOnly: Ember.computed('firstName', 'lastName', {
        set(key, value) {
            let [first, last] = value.split(' ');
            this.set('firstName', first);
            this.set('lastName', last);
            return value;
        }
    })
});

const person = Person.create({
    firstName: 'Fred',
    lastName: 'Smith',
    age: 29,
});

assertType<string>(person.get('noArgs'));
assertType<string>(person.get('firstName'));
assertType<string>(person.get('fullName'));
assertType<string>(person.get('fullNameReadonly'));
assertType<string>(person.get('fullNameWritable'));
assertType<string>(person.get('fullNameGetOnly'));
assertType<string>(person.get('fullNameSetOnly'));
assertType<{ firstName: string, fullName: string, age: number }>(person.getProperties('firstName', 'fullName', 'age'));
