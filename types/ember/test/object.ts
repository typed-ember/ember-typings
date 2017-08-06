import Ember from 'ember';

const LifetimeHooks = Ember.Object.extend({
    resource: null,

    init() {
        this._super();
        this.resource = {};
    },

    willDestroy() {
        delete this.resource;
        this._super();
    }
});
