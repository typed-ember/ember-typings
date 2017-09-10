import Ember from 'ember';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import { assertType } from "./lib/assert";

Component.extend({
    layout: hbs`
        <div>
          {{yield}}
        </div>
    `
});

Component.extend({
    layout: 'my-layout'
});

const MyComponent = Component.extend();
assertType<string | string[]>(Ember.get(MyComponent, 'positionalParams'));
