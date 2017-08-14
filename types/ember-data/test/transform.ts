import Ember from 'ember';
import DS from 'ember-data';

const PointTransform = DS.Transform.extend({
    serialize(value) {
        return [value.get('x'), value.get('y')];
    },
    deserialize(value) {
        return Ember.Object.create({ x: value[0], y: value[1] });
    }
});
