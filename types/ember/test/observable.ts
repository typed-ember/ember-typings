import Ember from 'ember';

class MyComponent extends Ember.Component {
    foo = 'bar';

    init() {
        this._super.apply(this, arguments);
        this.addObserver('foo', this, 'fooDidChange');
        this.addObserver('foo', this, this.fooDidChange);
        Ember.addObserver(this, 'foo', this, 'fooDidChange');
        Ember.addObserver(this, 'foo', this, this.fooDidChange);
        this.removeObserver('foo', this, 'fooDidChange');
        this.removeObserver('foo', this, this.fooDidChange);
        Ember.removeObserver(this, 'foo', this, 'fooDidChange');
        Ember.removeObserver(this, 'foo', this, this.fooDidChange);
    }

    fooDidChange(sender: MyComponent, key: 'foo') {
        // your code
    }
}
