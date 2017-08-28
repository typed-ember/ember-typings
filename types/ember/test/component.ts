import Ember from 'ember';
import Component from '@ember/component';
import Object, { computed } from '@ember/object'
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

const component1 = Component.extend({
  actions: {
    hello(name: string) {
      console.log('Hello', name);
    },
  },
});

const component2 = Component.extend({
  tagName: 'em',
});

const component3 = Component.extend({
  classNames: ['my-class', 'my-other-class'],
});

const component4 = Component.extend({
  classNameBindings: ['propertyA', 'propertyB'],
  propertyA: 'from-a',
  propertyB: computed(function() {
    if ('someLogic') {
      return 'from-b';
    }
  }),
});

const component5 = Component.extend({
  classNameBindings: ['hovered'],
  hovered: true,
});

const component6 = Component.extend({
  classNameBindings: ['messages.empty'],
  messages: Object.create({
    empty: true,
  }),
});

const component7 = Component.extend({
  classNameBindings: ['isEnabled:enabled:disabled'],
  isEnabled: true,
});

const component8 = Component.extend({
  classNameBindings: ['isEnabled::disabled'],
  isEnabled: true,
});

const component9 = Component.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: 'http://google.com',
});

const component10 = Component.extend({
  tagName: 'a',
  attributeBindings: ['url:href'],
  url: 'http://google.com',
});

const component11 = Component.extend({
  tagName: 'use',
  attributeBindings: ['xlinkHref:xlink:href'],
  xlinkHref: '#triangle',
});

const component12 = Component.extend({
  tagName: 'input',
  attributeBindings: ['disabled'],
  disabled: false,
});

const component13 = Component.extend({
  tagName: 'input',
  attributeBindings: ['disabled'],
  disabled: computed(function() {
    if ('someLogic') {
      return true;
    } else {
      return false;
    }
  }),
});

const component14 = Component.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: null,
});

const component15 = Component.extend({
  click(event: object) {
    // will be called when an instance's
    // rendered element is clicked
  },
});
