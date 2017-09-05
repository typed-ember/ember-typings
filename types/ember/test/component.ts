import Ember from 'ember';
import Component from '@ember/component';
import Object, { computed } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { assertType } from "./lib/assert";

Component.extend({
  layout: hbs`
        <div>
          {{yield}}
        </div>
    `,
});

Component.extend({
  layout: 'my-layout',
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
class Comp1 extends Component {
  name = '';
  hello(name: string) {
      this.set('name', name);
  }
}

class Comp2 extends Component {
  tagName: 'em';
}

class Comp3 extends Component {
  classNames: ['my-class', 'my-other-class'];
}

class Comp4 extends Component {
  classNameBindings = ['propertyA', 'propertyB'];
  propertyA = 'from-a';
  propertyB = computed(() => {
    if (!this.get('propertyA')) {
      return 'from-b';
    }
  });
}

class Comp5 extends Component {
  classNameBindings = ['hovered'];
  hovered = true;
}

class Comp6 extends Component {
  classNameBindings = ['messages.empty'];
  messages = Object.create({
    empty: true,
  });
}

class Comp7 extends Component {
  classNameBindings = ['isEnabled:enabled:disabled'];
  isEnabled = true;
}

class Comp8 extends Component {
  classNameBindings = ['isEnabled::disabled'];
  isEnabled = true;
}

class Comp9 extends Component {
  tagName = 'a';
  attributeBindings = ['href'];
  href: 'http://google.com';
}

class Comp10 extends Component {
  tagName = 'a';
  attributeBindings = ['url:href'];
  url = 'http://google.com';
}

class Comp11 extends Component {
  tagName = 'use';
  attributeBindings = ['xlinkHref:xlink:href'];
  xlinkHref = '#triangle';
}

class Comp12 extends Component {
  tagName = 'input';
  attributeBindings = ['disabled'];
  disabled = false;
}

class Comp13 extends Component {
  tagName = 'input';
  attributeBindings = ['disabled'];
  disabled = computed(() => {
    if ('someLogic') {
      return true;
    } else {
      return false;
    }
  });
}

class Comp14 extends Component {
  tagName = 'form';
  attributeBindings = ['novalidate'];
  novalidate = null;
}

class Comp15 extends Component {
  click(event: object) {
    // will be called when an instance's
    // rendered element is clicked
  }
}
