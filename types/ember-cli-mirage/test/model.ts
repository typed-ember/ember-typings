import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

const Author = Model.extend({
});

// mirage/models/author.js
const Author1 = Model.extend({
    blogPosts: hasMany()
});

// mirage/models/blog-post.js
type BlogPost = typeof BlogPost.prototype;
const BlogPost = Model.extend({
    author: belongsTo()
});

declare module "ember-cli-mirage/registry" {
    export interface ModelRegistry {
        'author': typeof Author;
        'blog-post': typeof BlogPost;
    }

    export interface ModelRegistryPlural {
        authors: typeof Author;
        blogPosts: typeof BlogPost;
    }
}
