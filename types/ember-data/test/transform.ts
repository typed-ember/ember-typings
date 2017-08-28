import Ember from 'ember';
import DS from 'ember-data';

class Point extends Ember.Object {
    x: number;
    y: number;
}

const PointTransform = DS.Transform.extend({
    serialize(value: Point) {
        return [value.get('x'), value.get('y')];
    },
    deserialize(value: [ number, number ]) {
        return Point.create({ x: value[0], y: value[1] });
    }
});
