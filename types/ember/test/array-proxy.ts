import Ember from 'ember';

const pets = ['dog', 'cat', 'fish'];
const proxy = Ember.ArrayProxy.create({ content: Ember.A(pets) });

proxy.get('firstObject'); // 'dog'
proxy.set('content', Ember.A(['amoeba', 'paramecium']));
proxy.get('firstObject'); // 'amoeba'

const overridden = Ember.ArrayProxy.create({
    content: Ember.A(pets),
    objectAtContent(idx: number) {
        return this.get('content').objectAt(idx).toUpperCase();
    }
});

overridden.get('firstObject'); // 'DOG'
