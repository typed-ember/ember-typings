export default function(server) {
    server.createList('author', 10);
    server.createList('blog-post', 10);

    let author = server.create('author', {name: 'Zelda'});
    server.createList('blog-post', 20, { author });
};
