import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

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
