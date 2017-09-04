import DS from 'ember-data';
import { assertType } from './lib/assert';

class Comment extends DS.Model {
    text = DS.attr('string');
}

class BlogPost extends DS.Model {
    title = DS.attr('string');
    commentsAsync = DS.hasMany<Comment>('comment');
    commentsSync = DS.hasMany<Comment>('comment', { async: false });
}

const post = BlogPost.create();

assertType<DS.PromiseArray<Comment>>(post.get('commentsSync').reload());
assertType<Comment>(post.get('commentsSync').createRecord());
assertType<Comment>(post.get('commentsSync').get('firstObject'));
assertType<string>(post.get('commentsSync').get('firstObject').get('text'));

assertType<DS.PromiseArray<Comment>>(post.get('commentsAsync').reload());
assertType<Comment>(post.get('commentsAsync').createRecord());
assertType<Comment>(post.get('commentsAsync').get('firstObject'));
assertType<string>(post.get('commentsAsync').get('firstObject').get('text'));
assertType<boolean>(post.get('commentsAsync').get('isFulfilled'));

post.get('commentsAsync').then(comments => {
    assertType<Comment>(comments.get('firstObject'));
    assertType<string>(comments.get('firstObject').get('text'));
});

class Polymorphic extends DS.Model {
    paymentMethods = DS.hasMany('payment-method', { polymorphic: true });
}
