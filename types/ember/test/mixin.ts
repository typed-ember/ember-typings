import Ember from 'ember';
import { assertType } from "./lib/assert";

interface EditableMixin extends Ember.Object {
    edit(): void;
    isEditing: boolean;
}

const EditableMixin = Ember.Mixin.create(<EditableMixin> {
    edit() {
        console.log('starting to edit');
        this.set('isEditing', true);
    },
    isEditing: false
});

const EditableComment = Ember.Object.extend(EditableMixin, {
    postId: 0,

    canEdit() {
        return !this.isEditing;
    },

    tryEdit() {
        if (this.canEdit()) {
            this.edit();
        }
    }
});

const comment = EditableComment.create({
    postId: 42
});

comment.edit();
comment.canEdit();
comment.tryEdit();
assertType<boolean>(comment.isEditing);
assertType<number>(comment.postId);

const LiteralMixins = Ember.Object.extend({ a: 1 }, { b: 2 }, { c: 3 });
const obj = LiteralMixins.create();
assertType<number>(obj.a);
assertType<number>(obj.b);
assertType<number>(obj.c);

const Post = Ember.Object.extend({
    postId: 0
});

const editablePost = Post.createWithMixins(EditableMixin);
assertType<number>(editablePost.postId);
editablePost.edit();
