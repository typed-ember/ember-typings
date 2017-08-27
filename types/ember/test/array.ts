import Ember from 'ember';

const pets = ['dog', 'cat', 'fish'];
pets.get('length'); // 3
pets.get('firstObject'); // 'dog'

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
