import { Serializer } from 'ember-cli-mirage';
import Ember from 'ember';
const { dasherize } = Ember.String;

// mirage/serializers/application.js
const ApplicationSerializer = Serializer.extend({
    keyForAttribute(attr) {
        return dasherize(attr);
    },

    keyForRelationship(attr) {
        return dasherize(attr);
    },
});

// mirage/serializers/author.js
const AuthorSerializer = Serializer.extend({
    include: ['blogPosts']
});
