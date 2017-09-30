import { startMirage } from 'yourapp/initializers/ember-cli-mirage';

let server2 = startMirage();
server2.shutdown();

server.put('/lessons/:id', (schema, request) => {
    let params = JSON.parse(request.requestBody);
});
server.post('/questions', {errors: ['There was an error']}, 500);

server.loadFixtures();
server.loadFixtures('countries', 'states');

server.create('author');
let authors = server.createList('author', 3);
let author = server.create('author', { admin: true });
let author2 = server.create('author', { admin: true, age: 30 });
server.createList('blog-post', 10, { author });

server.logging = true;
