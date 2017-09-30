import { Factory, faker, association, trait } from 'ember-cli-mirage';

const PersonFactory = Factory.extend({
    name(i) {
        return `Person ${i}`;
    },
    age: 28,
    admin: false,
    avatar() {
        return faker.internet.avatar();
    }
});

const AuthorFactory = Factory.extend({
    firstName() {
        return faker.name.firstName();
    },
    lastName() {
        return faker.name.lastName();
    },
    age() {
        // list method added by Mirage
        return faker.list.random(18, 20, 28, 32, 45, 60)();
    },
});

// mirage/factories/contact.js
const ContactFactory = Factory.extend({

    isAdmin: faker.random.boolean,

    afterCreate(contact, server) {
        // Only allow a max of 5 admins to be created
        if (server.schema.contacts.where({ isAdmin: true }).models.length >= 5) {
            contact.update({ isAdmin: false });
        }
    }

});

// mirage/factories/article.js
const ArticleFactory = Factory.extend({
    title: 'ember-cli-mirage rockzzz',
    author: association()
});

// mirage/factories/author.js
const AuthorFactory2 = Factory.extend({
    withNames: trait({
        firstName: 'Yehuda',
        lastName: 'Katz'
    })
});

// mirage/factories/author.js
const AuthorFactory3 = Factory.extend({
    firstName: faker.name.firstName,
    afterCreate(author, server) {
        server.create('post', { author });
    }
});

// mirage/factories/subject.js
const SubjectFactory = Factory.extend({
    name: faker.list.cycle('Economics', 'Philosophy', 'English', 'History', 'Mathematics'),
    students: faker.list.random(100, 200, 300, 400, 500)
});
