import Ember from 'ember';
import Component from '@ember/component';

const myComponent = Ember.Component.create({});
myComponent.tagName = 'li';
myComponent.classNames = ['some-class', 'some-other-class'];
myComponent.ariaRole = 'some-role';
myComponent.elementId = 'some-id';
myComponent.isVisible = true;
myComponent.layout = 'some-layout';
myComponent.positionalParams = 'some-param';
myComponent.actions = {
  foo: () => {},
  bar() {},
};
myComponent.didReceiveAttrs = () => {};
myComponent.didRender = () => {};
myComponent.didUpdate = () => {};
myComponent.didUpdateAttrs = () => {};
myComponent.willRender = () => {};
myComponent.willUpdate = () => {};

class YourComponent extends Ember.Component {
  tagName = 'some-tag';
}

export default Component.extend({
  tagName: 4, // this should error, but doesn't
});
