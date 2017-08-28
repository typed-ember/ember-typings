import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { test, skip, moduleFor, moduleForModel, moduleForComponent, setResolver } from 'ember-qunit';

moduleForComponent('x-foo', {
    integration: true
});

moduleForComponent('x-foo', {
    unit: true,
    needs: ['helper:pluralize-string']
});

moduleForModel('user', {
    needs: ['model:child']
});

moduleFor('controller:home');

moduleFor('component:x-foo', 'Some description');

moduleFor('component:x-foo', 'TestModule callbacks', {
    beforeSetup() {
    },

    beforeEach(assert) {
        assert.ok(true);
    },

    afterEach(assert) {
        assert.ok(true);
    },

    afterTeardown(assert) {
        assert.ok(true);
    }
});

// if you don't have a custom resolver, do it like this:
setResolver(Ember.DefaultResolver.create());

test('it renders', function(assert) {
    assert.expect(2);

    // setup the outer context
    this.set('value', 'cat');
    this.on('action', function(result) {
        assert.equal(result, 'bar', 'The correct result was returned');
    });

    // render the component
    this.render(hbs`
        {{ x-foo value=value action="result" }}
    `);

    assert.equal(this.$('div>.value').text(), 'cat', 'The component shows the correct value');

    this.$('button').click();
});

// run a test
test('it renders', function(assert) {
    assert.expect(1);

    // creates the component instance
    const subject = this.subject();

    // render the component on the page
    this.render();
    assert.equal(this.$('.foo').text(), 'bar');
});

test('It can calculate the result', function(assert) {
    assert.expect(1);

    const subject = this.subject();

    subject.set('value', 'foo');
    assert.equal(subject.get('result'), 'bar');
});

skip('disabled test');

skip('disabled test', function(assert) { });
