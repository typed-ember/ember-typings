import Ember from 'ember';
import { computed, action } from 'ember-decorators/object';
import { alias, and } from 'ember-decorators/object/computed';

/** Static assertion that `value` has type `T` */
declare function assertType<T>(value: T): void;

class UserComponent extends Ember.Component {
    first = 'Joe';
    last = 'Smith';

    @alias('first') firstName: string;
    @and('first', 'last') hasFullName: boolean;

    @computed('last')
    get lastName() {
        return this.get('last');
    }

    @computed('first', 'last')
    get fullName() {
        return `${this.get('first')} ${this.get('last')}`;
    }

    set fullName(value: string) {
        const [ first, last ] = value.split(' ');
        this.setProperties({ first, last });
    }

    // At the moment, I cannot make TypeScript happy without the empty
    // parenthesis after @acton. It shouts at me with a TS1241 error and I
    // cannot figure how to change the declaration
    @action()
    handleSomeAction() {}
}

const component = UserComponent.create();
assertType<string>(component.get('first'));
assertType<string>(component.get('last'));
assertType<string>(component.get('firstName'));
assertType<string>(component.get('lastName'));
assertType<boolean>(component.get('hasFullName'));
assertType<string>(component.get('fullName'));
