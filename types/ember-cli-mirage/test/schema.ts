import { Model, hasMany, belongsTo } from 'ember-cli-mirage';


let posts = schema.blogPosts.all();
posts.modelName; // "blog-post"

let posts2 = schema.blogPosts.find([1, 2, 4]);
let posts3 = schema.blogPosts.where({published: true});

posts.update('published', true); // the db was updated for all posts
posts.save(); // all posts saved to db
posts.reload(); // reloads data for each post from the db
posts.destroy(); // all posts removed from db

let postsByTitleAsc = posts.sort((a, b) => {
    return b.title < a.title;
});

let longPosts = posts.filter((postModel) => {
    return postModel.wordCount >= 1000;
});
