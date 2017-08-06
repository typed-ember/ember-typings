import Ember from 'ember';
import { assertType } from './lib/assert';

const Person = Ember.Object.extend({
    firstName: '',
    lastName: '',

    getFullName() { return `${this.firstName} ${this.lastName}`; }
});

assertType<string>(Person.prototype.firstName);
assertType<() => string>(Person.prototype.getFullName);

const person = Person.create({
    firstName: 'Joe',
    lastName: 'Blow',
    extra: 42
});

assertType<string>(person.getFullName());
assertType<number>(person.extra);

class ES6Person extends Ember.Object {
    firstName: '';
    lastName: '';

    get fullName() { return `${this.firstName} ${this.lastName}`; }
}

assertType<string>(ES6Person.prototype.firstName);
assertType<string>(ES6Person.prototype.fullName);

const es6Person = ES6Person.create({
    firstName: 'Joe',
    lastName: 'Blow',
    extra: 42
});

assertType<string>(es6Person.fullName);
assertType<number>(es6Person.extra);
