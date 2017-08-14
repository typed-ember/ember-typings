import Ember from 'ember';
import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;
const inflector2 = new Ember.Inflector();
const inflector3 = new Ember.Inflector(Ember.Inflector.defaultRules);

inflector.irregular('formula', 'formulae');
inflector.uncountable('advice');

inflector.pluralize('cow'); // => 'kine'
inflector.singularize('kine'); // => 'cow'

inflector.pluralize('advice'); // => 'advices'
inflector.uncountable('advice');
inflector.pluralize('advice'); // => 'advice'

inflector.pluralize('formula'); // => 'formulas'
inflector.irregular('formula', 'formulae');
inflector.pluralize('formula'); // => 'formulae'

// you would not need to add these as they are the default rules
inflector.plural(/$/, 's');
inflector.singular(/s$/i, '');

const rules = {
    plurals:  [
        [ /$/, 's' ]
    ],
    singular: [
        [ /\s$/, '' ]
    ],
    irregularPairs: [
        [ 'cow', 'kine' ]
    ],
    uncountable: [ 'fish' ]
};

const inflector4 = new Ember.Inflector(rules);
