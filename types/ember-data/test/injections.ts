import Ember from 'ember';
import DS from 'ember-data';

Ember.Route.extend({
    model() {
        return this.store.findAll('my-model');
    }
});

Ember.Controller.extend({
    actions: {
        create() {
            return this.store.createRecord('my-model');
        }
    }
});

Ember.DataAdapter.extend({
    test() {
        this.store.findRecord('my-model', 123);
    }
});
