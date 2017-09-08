import Ember from 'ember';
import { assertType } from './lib/assert';

const Person = Ember.Object.extend({
    firstName: '',
    lastName: '',
    age: 0,

    noArgs: Ember.computed<string>(() => 'test'),

    fullName: Ember.computed<string>('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),

    fullNameReadonly: Ember.computed<string>('fullName', function() {
        return this.get('fullName');
    }).readOnly(),

    fullNameWritable: Ember.computed<string>('firstName', 'lastName', {
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

    fullNameGetOnly: Ember.computed<string>('fullName', {
        get() {
            return this.get('fullName');
        }
    }),

    fullNameSetOnly: Ember.computed<string>('firstName', 'lastName', {
        set(key, value) {
            let [first, last] = value.split(' ');
            this.set('firstName', first);
            this.set('lastName', last);
            return value;
        }
    }),

    combinators: Ember.computed<string>(function() {
        return this.get('firstName');
    }).property('firstName')
      .meta({ foo: 'bar' })
      .volatile()
      .readOnly()
});

const person = Person.create({
    firstName: 'Fred',
    lastName: 'Smith',
    age: 29,
});

assertType<string>(person.firstName);
assertType<number>(person.age);
assertType<Ember.ComputedProperty<string>>(person.noArgs);
assertType<Ember.ComputedProperty<string>>(person.fullName);
assertType<Ember.ComputedProperty<string>>(person.fullNameReadonly);
assertType<Ember.ComputedProperty<string>>(person.fullNameWritable);
assertType<Ember.ComputedProperty<string>>(person.fullNameGetOnly);
assertType<Ember.ComputedProperty<string>>(person.fullNameSetOnly);
assertType<Ember.ComputedProperty<string>>(person.combinators);

assertType<string>(person.get('firstName'));
assertType<number>(person.get('age'));
assertType<string>(person.get('noArgs'));
assertType<string>(person.get('fullName'));
assertType<string>(person.get('fullNameReadonly'));
assertType<string>(person.get('fullNameWritable'));
assertType<string>(person.get('fullNameGetOnly'));
assertType<string>(person.get('fullNameSetOnly'));
assertType<string>(person.get('combinators'));

assertType<{ firstName: string, fullName: string, age: number }>(person.getProperties('firstName', 'fullName', 'age'));
