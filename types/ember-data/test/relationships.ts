import Ember from 'ember';
import DS from 'ember-data';

const Person = DS.Model.extend({
    children: DS.hasMany('folder', { inverse: 'parent' }),
    parent: DS.belongsTo('folder', { inverse: 'children' })
});

const Polymorphic = DS.Model.extend({
    paymentMethods: DS.hasMany('payment-method', { polymorphic: true })
});

const BlogPost = DS.Model.extend({
    title: DS.attr('string'),
    tag: DS.attr('string'),
    comments: DS.hasMany('comment', { async: true })
    relatedPosts: DS.hasMany('post')
});

let blogPost = this.get('store').peekRecord('blog-post', 1);

blogPost.get('comments').then((comments) => {
    // now we can work with the comments
});
