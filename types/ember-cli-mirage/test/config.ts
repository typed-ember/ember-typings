import { Server } from "ember-cli-mirage";

export default function(this: Server) {
    this.namespace = 'api';

    this.timing = 400; // default

    this.passthrough();
    this.passthrough('/addresses', '/contacts');
    this.passthrough('/something');

    this.pretender.handledRequest = function(verb, path, request) {
        let { responseText } = request;
        // log request and response data
    }

    this.get('/authors', () => {
        return {
            authors: [
                {id: 1, name: 'Zelda'},
                {id: 2, name: 'Link'},
                {id: 3, name: 'Epona'},
            ]
        };
    });

    this.get('/authors');
    this.get('/authors/:id');
    this.get('/posts/:id', 'blog-posts');
    this.post('/authors');
    this.put('/authors/:id');
    this.patch('/authors/:id');
    this.del('/authors/:id');
    this.get('/contacts', { coalesce: true });
    this.post('/contacts', 'user');  // optionally specify the type as second param
    this.get('/contacts', 'users', { coalesce: true });
    this.del('/contacts/:id', ['contact', 'addresses']);

    this.resource('contacts', { only: ['index', 'show'] });
    this.resource('contacts', { except: ['update'] });
    this.resource('blog-posts', { path: '/posts' });

    this.get('/authors', () => {
        return ['Link', 'Zelda', 'Epona'];
    });

    this.get('/authors', (schema, request) => {
        return schema.authors.all();
    });

    this.post('/authors', (schema, request) => {
        const attrs = JSON.parse(request.requestBody).author;
        return schema.authors.create(attrs);
    });

    this.get('/authors/:id/blog-posts', (schema, request) => {
        let author = schema.authors.find(request.params.id);
        return author.blogPosts;
    });

    this.del('/authors/:id', (schema, request) => {
        let author = schema.authors.find(request.params.id);
        author.posts.delete();
        author.delete();
    });

    this.post('/authors', function(schema, request) {
        let attrs = JSON.parse(request.requestBody).author;

        if (attrs.name) {
            return schema.authors.create(attrs);
        } else {
            return new Response(400, {some: 'header'}, {errors: ['name cannot be blank']});
        }
    });

    this.put('/contacts/:id', function({ contacts }, request) {
        let id = request.params.id;
        let attrs = this.normalizedRequestAttrs();

        return contacts.find(id).update(attrs);
    });

    this.del('/contacts/:id', ({ contacts }, request) => {
        let id = request.params.id;
        let contact = contacts.find(id);

        contact.addresses.destroy();
        contact.destroy();
    });

    this.get('/complex_query', () => {
        return [1, 2, 3, 4, 5];
    }, { timing: 3000 });
}

export function testConfig() {
    // test-only config, does not apply to development
}
