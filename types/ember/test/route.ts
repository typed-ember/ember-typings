import Route from '@ember/routing/route';
import Object from '@ember/object';
import Array from '@ember/array';
import Ember from 'ember'; // currently needed for Transition

interface Post extends Object {}

interface Posts extends Array<Post> {}

Route.extend({
  beforeModel(transition: Ember.Transition) {
    this.transitionTo('someOtherRoute');
  },
});

Route.extend({
  afterModel(posts: Posts, transition: Ember.Transition) {
    if (posts.length === 1) {
      this.transitionTo('post.show', posts.firstObject);
    }
  },
});

Route.extend({
  actions: {
    showModal(evt: {modalName: string}) {
      this.render(evt.modalName, {
        outlet: 'modal',
        into: 'application',
      });
    },
    hideModal(evt: {modalName: string}) {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application',
      });
    },
  },
});

Ember.Route.extend({
  model() {
    let post = this.modelFor('post');
    return post.get('comments');
  },
});

Route.extend({
  queryParams: {
    memberQp: { refreshModel: true },
  },
});

Route.extend({
  renderTemplate() {
    this.render('photos', {
      into: 'application',
      outlet: 'anOutletName',
    });
  },
});

Route.extend({
  renderTemplate(controller: Ember.Controller, model: {}) {
    this.render('posts', {
      view: 'someView', // the template to render, referenced by name
      into: 'application', // the template to render into, referenced by name
      outlet: 'anOutletName', // the outlet inside `options.into` to render into.
      controller: 'someControllerName', // the controller to use for this template, referenced by name
      model, // the model to set on `options.controller`.
    });
  },
});

Route.extend({
  resetController(controller: Ember.Controller, isExiting: boolean, transition: boolean) {
    if (isExiting) {
    //   controller.set('page', 1);
    }
  },
});

Route.extend({
  model() {
    return this.store.findAll('photo');
  },

  setupController(controller: Ember.Controller, model: {}) {
    this._super(controller, model);
    // this.controllerFor('application').set('showingPhotos', true);
  },
});
