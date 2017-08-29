import Ember from 'ember';
import { assertType } from './lib/assert';

const Person = Ember.Object.extend({
    name: '',
    isHappy: false
});

const people = Ember.A([
    Person.create({ name: 'Yehuda', isHappy: true }),
    Person.create({ name: 'Majd', isHappy: false }),
]);

people.get('length');
people.get('lastObject');
people.isAny('isHappy');
people.isAny('isHappy', false);
people.filterBy('isHappy');

assertType<boolean[]>(people.mapBy('isHappy'));
assertType<any[]>(people.mapBy('name.length'));

assertType<string>(people.get('lastObject').get('name'));
assertType<boolean>(people.get('firstObject').get('isHappy'));

const letters: Ember.Enumerable<string> = Ember.A(['a', 'b', 'c']);
const codes: number[] = letters.map((item, index, enumerable) => {
    assertType<string>(item);
    assertType<number>(index);
    assertType<Ember.Enumerable<string>>(enumerable);
    return item.charCodeAt(0);
});
