import Route from '@ember/routing/route';
import Ember from 'ember';
const { Logger } = Ember;

class Route1 extends Route {
  queryParams = {
    category: {
      refreshModel: true,
    },
  };
  templateName: 'posts/favorite-posts';
}
