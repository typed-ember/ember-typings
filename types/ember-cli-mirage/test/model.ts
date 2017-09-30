import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

const Author = Model.extend({
});

// mirage/models/author.js
const Author1 = Model.extend({
    blogPosts: hasMany()
});

// mirage/models/blog-post.js
const BlogPost = Model.extend({
    author: belongsTo()
});
