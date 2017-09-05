import Ember from 'ember';
import Inflector, { singularize, pluralize } from 'ember-inflector';

Inflector.inflector.singularize("tacos"); // taco
Inflector.inflector.pluralize("taco"); // tacos

singularize("tacos"); // taco
pluralize("taco"); // tacos

Ember.String.singularize("tacos"); // taco
Ember.String.pluralize("taco"); // tacos

// or if not using Ember CLI/ES6
Inflector.inflector.pluralize("taco"); // tacos

const inflector = Inflector.inflector;
const inflector2 = new Inflector();
const inflector3 = new Inflector();
const inflector4 = new Inflector(Inflector.defaultRules);

const customRules = {
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

const inflector5 = new Inflector(customRules);

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
