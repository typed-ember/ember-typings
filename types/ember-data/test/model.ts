import Ember from 'ember';
import DS from 'ember-data';

const Person = DS.Model.extend({
    firstName: DS.attr(),
    lastName: DS.attr(),
    title: DS.attr({ defaultValue: "The default" }),
    title2: DS.attr({ defaultValue: () => "The default" }),

    fullName: Ember.computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    })
});

const User = DS.Model.extend({
    username: DS.attr('string'),
    email: DS.attr('string'),
    verified: DS.attr('boolean', { defaultValue: false }),
    createdAt: DS.attr('date', {
        defaultValue() { return new Date(); }
    })
});
