import Ember from 'ember';
import DS from 'ember-data';

declare const store: DS.Store;

let post = store.createRecord('post', {
    title: 'Rails is Omakase',
    body: 'Lorem ipsum'
});

post.save(); // => POST to '/posts'

store.findRecord('post', 1).then(function(post) {
    post.get('title'); // => "Rails is Omakase"
    post.set('title', 'A new post');
    post.save(); // => PATCH to '/posts/1'
});

store.queryRecord('user', {}).then(function(user) {
    let username = user.get('username');
    console.log(`Currently logged in as ${username}`);
});

const blogPosts = this.get('store').findAll('blog-post'); // => GET /blog-posts

const blogPosts2 = this.get('store').peekAll('blog-post'); // => no network request

const MyRoute = Ember.Route.extend({
    model(params) {
        return this.store.findRecord('post', params.post_id, {include: 'comments,comments.author'});
    }
});

// GET to /users?filter[email]=tomster@example.com
const tom = store.query('user', {
    filter: {
        email: 'tomster@example.com'
    }
}).then(function(users) {
    return users.get("firstObject");
});

store.push({
    data: [{
        id: 1,
        type: 'album',
        attributes: {
            title: 'Fewer Moving Parts',
            artist: 'David Bazan',
            songCount: 10
        },
        relationships: {}
    }, {
        id: 2,
        type: 'album',
        attributes: {
            title: 'Calgary b/w I Can\'t Make You Love Me/Nick Of Time',
            artist: 'Bon Iver',
            songCount: 2
        },
        relationships: {}
    }]
});
