// Type definitions for Ember.js 2.8
// Project: http://emberjs.com/
// Definitions by: Jed Mao <https://github.com/jedmao>
//                 bttf <https://github.com/bttf>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

/// <reference types="jquery" />
/// <reference types="handlebars" />

declare module 'ember' {
// Capitalization is intentional: this makes it much easier to re-export RSVP on
// the Ember namespace.
import Rsvp from 'rsvp';
import { TemplateFactory } from 'htmlbars-inline-precompile';

// Get an alias to the global Array type to use in inner scope below.
type GlobalArray<T> = T[];

/**
 * Deconstructs computed properties into the types which would be returned by `.get()`.
 */
type ComputedProperties<T> = {
    [K in keyof T]: Ember.ComputedProperty<T[K]> | T[K];
};

/**
 * Check that any arguments to `create()` match the type's properties.
 *
 * Accept any additional properties and add merge them into the instance.
 */
type EmberInstanceArguments<T> = Partial<T> & {
    [key: string]: any
};

/**
 * Accept any additional properties and add merge them into the prototype.
 */
interface EmberClassArguments {
    [key: string]: any;
}

/**
 * Map type `T` to a plain object hash with the identity mapping.
 *
 * Discards any additional object identity like the ability to `new()` up the class.
 * The `new()` capability is added back later by merging `EmberClassConstructor<T>`
 *
 * Implementation is carefully chosen for the reasons described in
 * https://github.com/typed-ember/ember-typings/pull/29
 */
type Objectify<T> = Readonly<T>;

type Fix<T> = {
    [K in keyof T]: T[K];
};

/**
 * Ember.Object.extend(...) accepts any number of mixins or literals.
 */
type MixinOrLiteral<T, Base> = Ember.Mixin<T, Base> | T;

/**
 * Used to infer the type of ember classes of type `T`.
 *
 * Generally you would use `EmberClass.create()` instead of `new EmberClass()`.
 *
 * The no-arg constructor is required by the typescript compiler.
 * The multi-arg constructor is included for better ergonomics.
 *
 * Implementation is carefully chosen for the reasons described in
 * https://github.com/typed-ember/ember-typings/pull/29
 */
type EmberClassConstructor<T> = (
    new () => T
) & (
    new (...args: any[]) => T
);

interface ActionsHash {
    [index: string]: (...params: any[]) => any;
}

interface RenderOptions {
    into?: string;
    controller?: string;
    model?: any;
    outlet?: string;
    view?: string;
}

interface RouteQueryParam {
    refreshModel?: boolean;
    replace?: boolean;
    as?: string;
}

interface ViewMixin {
    // methods
    $: JQueryStatic;
    rerender(): void;
    // properties
    attributeBindings: string[];
    element: Element;
    elementId: string;
    tagName: string;
    // events
    didInsertElement(): void;
    willClearRender(): void;
    willDestroyElement(): void;
    willInsertElement(): void;
}
const ViewMixin: Ember.Mixin<ViewMixin>;

/**
Ember.CoreView is an abstract class that exists to give view-like behavior to both Ember's main
view class Ember.Component and other classes that don't need the full functionality of Ember.Component.

Unless you have specific needs for CoreView, you will use Ember.Component in your applications.
**/
class CoreView extends Ember.Object.extend(Ember.Evented, ActionHandler) {}
interface ActionSupport {
    sendAction(action: string, ...params: any[]): void;
}
const ActionSupport: ActionSupport;

interface ClassNamesSupport {
    /**
    A list of properties of the view to apply as class names. If the property is a string value,
    the value of that string will be applied as a class name.

    If the value of the property is a Boolean, the name of that property is added as a dasherized
    class name.

    If you would prefer to use a custom value instead of the dasherized property name, you can
    pass a binding like this: `classNameBindings: ['isUrgent:urgent']`

    This list of properties is inherited from the component's superclasses as well.
    */
    classNameBindings: string[];
    classNames: string[];
}
const ClassNamesSupport: ClassNamesSupport;

/**
TextSupport is a shared mixin used by both Ember.TextField and Ember.TextArea. TextSupport
adds a number of methods that allow you to specify a controller action to invoke when a
certain event is fired on your text field or textarea. The specifed controller action would
get the current value of the field passed in as the only argument unless the value of the field
is empty. In that case, the instance of the field itself is passed in as the only argument.
**/
interface TextSupport extends TargetActionSupport {
    cancel(event: Function): void;
    focusIn(event: Function): void;
    focusOut(event: Function): void;
    insertNewLine(event: Function): void;
    keyPress(event: Function): void;
    action: string;
    bubbles: boolean;
    onEvent: string;
}
const TextSupport: Ember.Mixin<TextSupport, Ember.Component>;

/**
Ember.ActionHandler is available on some familiar classes including Ember.Route,
Ember.Component, and Ember.Controller. (Internally the mixin is used by Ember.CoreView,
Ember.ControllerMixin, and Ember.Route and available to the above classes through inheritance.)
**/
interface ActionHandler {
    /**
    Triggers a named action on the ActionHandler. Any parameters supplied after the actionName
    string will be passed as arguments to the action target function.

    If the ActionHandler has its target property set, actions may bubble to the target.
    Bubbling happens when an actionName can not be found in the ActionHandler's actions
    hash or if the action target function returns true.
    **/
    send(actionName: string, ...args: any[]): void;
    /**
    The collection of functions, keyed by name, available on this ActionHandler as action targets.
    **/
    actions: ActionsHash;
}
const ActionHandler: Ember.Mixin<ActionHandler>;

interface TriggerActionOptions {
    "action"?: string;
    "target"?: Ember.Object;
    "actionContext"?: Ember.Object;
}
/**
Ember.TargetActionSupport is a mixin that can be included in a class to add a triggerAction method
with semantics similar to the Handlebars {{action}} helper. In normal Ember usage, the {{action}}
helper is usually the best choice. This mixin is most often useful when you are doing more
complex event handling in Components.
**/
interface TargetActionSupport {
    triggerAction(opts: TriggerActionOptions): boolean;
}

export namespace Ember {
    /**
    Alias for jQuery.
    **/
    // ReSharper disable once DuplicatingLocalDeclaration
    const $: JQueryStatic;
    /**
    Creates an Ember.NativeArray from an Array like object. Does not modify the original object.
    Ember.A is not needed if Ember.EXTEND_PROTOTYPES is true (the default value). However, it is
    recommended that you use Ember.A when creating addons for ember or when you can not garentee
    that Ember.EXTEND_PROTOTYPES will be true.
    **/
    function A<T>(arr?: T[]): NativeArray<T>;

    interface FunctionPrototypeExtensions {
        /**
         * The `property` extension of Javascript's Function prototype is available
         * when `EmberENV.EXTEND_PROTOTYPES` or `EmberENV.EXTEND_PROTOTYPES.Function` is
         * `true`, which is the default.
         */
        property(...args: string[]): ComputedProperty<any>;
        /**
         * The `observes` extension of Javascript's Function prototype is available
         * when `EmberENV.EXTEND_PROTOTYPES` or `EmberENV.EXTEND_PROTOTYPES.Function` is
         * true, which is the default.
         */
        observes(...args: string[]): this;
        /**
         * The `on` extension of Javascript's Function prototype is available
         * when `EmberENV.EXTEND_PROTOTYPES` or `EmberENV.EXTEND_PROTOTYPES.Function` is
         * true, which is the default.
         */
        on(...args: string[]): this;
    }

    interface ArrayPrototypeExtensions<T> extends MutableArray<T>, Observable, Copyable {}

    /**
    An instance of Ember.Application is the starting point for every Ember application. It helps to
    instantiate, initialize and coordinate the many objects that make up your app.
    **/
    class Application extends Namespace {
        /**
        Call advanceReadiness after any asynchronous setup logic has completed.
        Each call to deferReadiness must be matched by a call to advanceReadiness
        or the application will never become ready and routing will not begin.
        **/
        advanceReadiness(): void;
        /**
        Use this to defer readiness until some condition is true.

        This allows you to perform asynchronous setup logic and defer
        booting your application until the setup has finished.

        However, if the setup requires a loading UI, it might be better
        to use the router for this purpose.
        */
        deferReadiness(): void;
        /**
        defines an injection or typeInjection
        **/
        inject(factoryNameOrType: string, property: string, injectionName: string): void;
        /**
        This injects the test helpers into the window's scope. If a function of the
        same name has already been defined it will be cached (so that it can be reset
        if the helper is removed with `unregisterHelper` or `removeTestHelpers`).
        Any callbacks registered with `onInjectHelpers` will be called once the
        helpers have been injected.
        **/
        injectTestHelpers(): void;
        /**
        registers a factory for later injection
        @param fullName type:name (e.g., 'model:user')
        @param factory (e.g., App.Person)
        **/
        register(fullName: string, factory: Function, options?: {}): void;
        /**
        This removes all helpers that have been registered, and resets and functions
        that were overridden by the helpers.
        **/
        removeTestHelpers(): void;
        /**
        Reset the application. This is typically used only in tests.
        **/
        reset(): void;
        /**
        This hook defers the readiness of the application, so that you can start
        the app when your tests are ready to run. It also sets the router's
        location to 'none', so that the window's location will not be modified
        (preventing both accidental leaking of state between tests and interference
        with your testing framework).
        **/
        setupForTesting(): void;
        /**
        The DOM events for which the event dispatcher should listen.
        */
        customEvents: {};
        /**
        The Ember.EventDispatcher responsible for delegating events to this application's views.
        **/
        eventDispatcher: EventDispatcher;
        /**
        Set this to provide an alternate class to Ember.DefaultResolver
        **/
        resolver: DefaultResolver;
        /**
        The root DOM element of the Application. This can be specified as an
        element or a jQuery-compatible selector string.

        This is the element that will be passed to the Application's, eventDispatcher,
        which sets up the listeners for event delegation. Every view in your application
        should be a child of the element you specify here.
        **/
        rootElement: HTMLElement | string;
        /**
        Called when the Application has become ready.
        The call will be delayed until the DOM has become ready.
        **/
        ready: Function;
        /**
        Application's router.
        **/
        Router: Router;
        registry: Registry;
    }
    /**
    The `ApplicationInstance` encapsulates all of the stateful aspects of a
    running `Application`.
    **/
    class ApplicationInstance extends EngineInstance {
    }
    /**
    This module implements Observer-friendly Array-like behavior. This mixin is picked up by the
    Array class as well as other controllers, etc. that want to appear to be arrays.
    **/
    interface Array<T> extends Enumerable<T> {
        /**
         * __Required.__ You must implement this method to apply this mixin.
         */
        length: number | ComputedProperty<number>;
        /**
         * Returns the object at the given `index`. If the given `index` is negative
         * or is greater or equal than the array length, returns `undefined`.
         */
        objectAt(idx: number): T | undefined;
        /**
         * This returns the objects at the specified indexes, using `objectAt`.
         */
        objectsAt(indexes: number[]): Ember.Array<T>;
        /**
         * Returns a new array that is a slice of the receiver. This implementation
         * uses the observable array methods to retrieve the objects for the new
         * slice.
         */
        slice(beginIndex?: number, endIndex?: number): T[];
        /**
         * Returns the index of the given object's first occurrence.
         * If no `startAt` argument is given, the starting location to
         * search is 0. If it's negative, will count backward from
         * the end of the array. Returns -1 if no match is found.
         */
        indexOf(searchElement: T, fromIndex?: number): number;
        /**
         * Returns the index of the given object's last occurrence.
         * If no `startAt` argument is given, the search starts from
         * the last position. If it's negative, will count backward
         * from the end of the array. Returns -1 if no match is found.
         */
        lastIndexOf(searchElement: T, fromIndex?: number): number;
        /**
         * Adds an array observer to the receiving array. The array observer object
         * normally must implement two methods:
         */
        addArrayObserver(target: {}, opts: {}): this;
        /**
         * Removes an array observer from the object if the observer is current
         * registered. Calling this method multiple times with the same object will
         * have no effect.
         */
        removeArrayObserver(target: {}, opts: {}): this;
        /**
         * Becomes true whenever the array currently has observers watching changes
         * on the array.
         */
        hasArrayObservers: ComputedProperty<boolean>;
        /**
         * If you are implementing an object that supports `Ember.Array`, call this
         * method just before the array content changes to notify any observers and
         * invalidate any related properties. Pass the starting index of the change
         * as well as a delta of the amounts to change.
         */
        arrayContentWillChange(startIdx: number, removeAmt: number, addAmt: number): this;
        /**
         * If you are implementing an object that supports `Ember.Array`, call this
         * method just after the array content changes to notify any observers and
         * invalidate any related properties. Pass the starting index of the change
         * as well as a delta of the amounts to change.
         */
        arrayContentDidChange(startIdx: number, removeAmt: number, addAmt: number): this;
        /**
         * Returns a special object that can be used to observe individual properties
         * on the array. Just get an equivalent property on this object and it will
         * return an enumerable that maps automatically to the named key on the
         * member objects.
         */
        '@each': ComputedProperty<T>;
    }
    // Ember.Array rather than Array because the `array-type` lint rule doesn't realize the global is shadowed
    const Array: Mixin<Ember.Array<any>>;

    /**
    An ArrayProxy wraps any other object that implements Ember.Array and/or Ember.MutableArray,
    forwarding all requests. This makes it very useful for a number of binding use cases or other cases
    where being able to swap out the underlying array is useful.
    **/
    interface ArrayProxy<T> extends MutableArray<T> {}
    class ArrayProxy<T> extends Object.extend(MutableArray as {}) {
        /**
         * Should actually retrieve the object at the specified index from the
         * content. You can override this method in subclasses to transform the
         * content item to something new.
         */
        objectAtContent(idx: number): T | undefined;
    }
    /**
    AutoLocation will select the best location option based off browser support with the priority order: history, hash, none.
    **/
    class AutoLocation extends Object {
    }
    const BOOTED: boolean;
    /**
     * Connects the properties of two objects so that whenever the value of one property changes,
     * the other property will be changed also.
     *
     * @deprecated https://emberjs.com/deprecations/v2.x#toc_ember-binding
     **/
    class Binding {
        constructor(toPath: string, fromPath: string);
        connect(obj: any): Binding;
        copy(): Binding;
        disconnect(): Binding;
        from(path: string): Binding;
        to(path: string | any[]): Binding;
        toString(): string;
    }
    /**
    The internal class used to create text inputs when the {{input}} helper is used
    with type of checkbox. See Handlebars.helpers.input for usage details.
    **/
    class Checkbox extends Component {
    }
    /**
     * Implements some standard methods for comparing objects. Add this mixin to
     * any class you create that can compare its instances.
     * @private
     */
    interface Comparable {
        compare(a: any, b: any): number;
    }
    const Comparable: Mixin<Comparable>;
    /**
    A view that is completely isolated. Property access in its templates go to the view object
    and actions are targeted at the view object. There is no access to the surrounding context or
    outer controller; all contextual information is passed in.
    **/
    class Component extends CoreView.extend(ViewMixin, ActionSupport, ClassNamesSupport) {
        // methods
        readDOMAttr(name: string): string;
        // properties
        /**
         * The WAI-ARIA role of the control represented by this view. For example, a button may have a
         * role of type 'button', or a pane may have a role of type 'alertdialog'. This property is
         * used by assistive software to help visually challenged users navigate rich web applications.
         */
        ariaRole: string;
        /**
         * The HTML id of the component's element in the DOM. You can provide this value yourself but
         * it must be unique (just as in HTML):
         *
         * If not manually set a default value will be provided by the framework. Once rendered an
         * element's elementId is considered immutable and you should never change it. If you need
         * to compute a dynamic value for the elementId, you should do this when the component or
         * element is being instantiated:
         */
        elementId: string;
        /**
         * If false, the view will appear hidden in DOM.
         */
        isVisible: boolean;
        /**
         * A component may contain a layout. A layout is a regular template but supersedes the template
         * property during rendering. It is the responsibility of the layout template to retrieve the
         * template property from the component (or alternatively, call Handlebars.helpers.yield,
         * {{yield}}) to render it in the correct location. This is useful for a component that has a
         * shared wrapper, but which delegates the rendering of the contents of the wrapper to the
         * template property on a subclass.
         */
        layout: TemplateFactory | string;
        /**
         * Enables components to take a list of parameters as arguments.
         */
        static positionalParams: string[] | string;
        // events
        /**
         * Called when the attributes passed into the component have been updated. Called both during the
         * initial render of a container and during a rerender. Can be used in place of an observer; code
         * placed here will be executed every time any attribute updates.
         */
        didReceiveAttrs(): void;
        /**
         * Called after a component has been rendered, both on initial render and in subsequent rerenders.
         */
        didRender(): void;
        /**
         * Called when the component has updated and rerendered itself. Called only during a rerender,
         * not during an initial render.
         */
        didUpdate(): void;
        /**
         * Called when the attributes passed into the component have been changed. Called only during a
         * rerender, not during an initial render.
         */
        didUpdateAttrs(): void;
        /**
         * Called before a component has been rendered, both on initial render and in subsequent rerenders.
         */
        willRender(): void;
        /**
         * Called when the component is about to update and rerender itself. Called only during a rerender,
         * not during an initial render.
         */
        willUpdate(): void;
    }
    /**
    A computed property transforms an objects function into a property.
    By default the function backing the computed property will only be called once and the result
    will be cached. You can specify various properties that your computed property is dependent on.
    This will force the cached result to be recomputed if the dependencies are modified.
    **/
    class ComputedProperty<T> {
        /**
         * Call on a computed property to set it into non-cached mode. When in this
         * mode the computed property will not automatically cache the return value.
         */
        volatile(): this;
        /**
         * Call on a computed property to set it into read-only mode. When in this
         * mode the computed property will throw an error when set.
         */
        readOnly(): this;
        /**
         * Sets the dependent keys on this computed property. Pass any number of
         * arguments containing key paths that this computed property depends on.
         */
        property(...path: string[]): this;
        /**
         * In some cases, you may want to annotate computed properties with additional
         * metadata about how they function or what values they operate on. For example,
         * computed property functions may close over variables that are then no longer
         * available for introspection.
         */
        meta(meta: {}): this;
        meta(): {};
    }
    /**
     * A container used to instantiate and cache objects.
     * @private
     */
    class Container {
        /**
         * Given a fullName, return the corresponding factory. The consumer of the factory
         * is responsible for the destruction of any factory instances, as there is no
         * way for the container to ensure instances are destroyed when it itself is
         * destroyed.
         */
        factoryFor(fullName: string, options?: {}): any;
    }
    /**
    The ContainerDebugAdapter helps the container and resolver interface
    with tools that debug Ember such as the Ember Inspector for Chrome and Firefox.
    **/
    class ContainerDebugAdapter extends Object {
      resolver: Resolver;
      canCatalogEntriesByType(type: string): boolean;
      catalogEntriesByType(type: string): any[];
    }
    /**
     * Additional methods for the Controller.
     * @private
     */
    interface ControllerMixin extends ActionHandler {
        replaceRoute(name: string, ...args: any[]): void;
        transitionToRoute(name: string, ...args: any[]): void;
        model: any;
        queryParams: string[] | Array<{ [key: string]: { type: string } }>;
        target: Object;
    }
    const ControllerMixin: Ember.Mixin<ControllerMixin>;
    class Controller extends Object.extend(ControllerMixin) {}
    /**
     * Implements some standard methods for copying an object. Add this mixin to
     * any object you create that can create a copy of itself. This mixin is
     * added automatically to the built-in array.
     * @private
     */
    interface Copyable {
        /**
         * __Required.__ You must implement this method to apply this mixin.
         */
        copy(deep: boolean): Copyable;
        /**
         * If the object implements `Ember.Freezable`, then this will return a new
         * copy if the object is not frozen and the receiver if the object is frozen.
         */
        frozenCopy(): Copyable;
    }
    const Copyable: Ember.Mixin<Copyable>;
    class CoreObject {
        _super(...args: any[]): any;

        /**
        An overridable method called when objects are instantiated. By default,
        does nothing unless it is overridden during class definition.
        @method init
        **/
        init(): void;

        /**
        Defines the properties that will be concatenated from the superclass (instead of overridden).
        @property concatenatedProperties
        @type Array
        @default null
        **/
        concatenatedProperties: any[];

        /**
        Destroyed object property flag. If this property is true the observers and bindings were
        already removed by the effect of calling the destroy() method.
        @property isDestroyed
        @default false
        **/
        isDestroyed: boolean;
        /**
        Destruction scheduled flag. The destroy() method has been called. The object stays intact
        until the end of the run loop at which point the isDestroyed flag is set.
        @property isDestroying
        @default false
        **/
        isDestroying: boolean;

        /**
        Destroys an object by setting the `isDestroyed` flag and removing its
        metadata, which effectively destroys observers and bindings.
        If you try to set a property on a destroyed object, an exception will be
        raised.
        Note that destruction is scheduled for the end of the run loop and does not
        happen immediately.  It will set an isDestroying flag immediately.
        @method destroy
        @return {Ember.Object} receiver
        */
        destroy(): CoreObject;

        /**
        Override to implement teardown.
        @method willDestroy
        */
        willDestroy(): void;

        /**
        Returns a string representation which attempts to provide more information than Javascript's toString
        typically does, in a generic way for all Ember objects (e.g., "<App.Person:ember1024>").
        @method toString
        @return {String} string representation
        **/
        toString(): string;

        static create<Instance>(
            this: EmberClassConstructor<Instance>
        ): Fix<Instance>;

        static create<Instance, Args,
            T1 extends EmberInstanceArguments<Args>>(
            this: EmberClassConstructor<Instance & ComputedProperties<Args>>,
            arg1: T1 & ThisType<Fix<T1 & Instance>>
        ): Fix<Instance & T1>;

        static create<Instance, Args,
            T1 extends EmberInstanceArguments<Args>,
            T2 extends EmberInstanceArguments<Args>>(
            this: EmberClassConstructor<Instance & ComputedProperties<Args>>,
            arg1: T1 & ThisType<Fix<Instance & T1>>,
            arg2: T2 & ThisType<Fix<Instance & T1 & T2>>
        ): Fix<Instance & T1 & T2>;

        static create<Instance, Args,
            T1 extends EmberInstanceArguments<Args>,
            T2 extends EmberInstanceArguments<Args>,
            T3 extends EmberInstanceArguments<Args>>(
            this: EmberClassConstructor<Instance & ComputedProperties<Args>>,
            arg1: T1 & ThisType<Fix<Instance & T1>>,
            arg2: T2 & ThisType<Fix<Instance & T1 & T2>>,
            arg3: T3 & ThisType<Fix<Instance & T1 & T2 & T3>>
        ): Fix<Instance & T1 & T2 & T3>;

        static extend<Statics, Instance>(
            this: Statics & EmberClassConstructor<Instance>
        ): Objectify<Statics> & EmberClassConstructor<Instance>;

        static extend<Statics, Instance extends B1,
            T1 extends EmberClassArguments, B1>(
            this: Statics & EmberClassConstructor<Instance>,
            arg1: MixinOrLiteral<T1, B1> & ThisType<Fix<Instance & T1>>
        ): Objectify<Statics> & EmberClassConstructor<T1 & Instance>;

        static extend<Statics, Instance extends B1 & B2,
            T1 extends EmberClassArguments, B1,
            T2 extends EmberClassArguments, B2>(
            this: Statics & EmberClassConstructor<Instance>,
            arg1: MixinOrLiteral<T1, B1> & ThisType<Fix<Instance & T1>>,
            arg2: MixinOrLiteral<T2, B2> & ThisType<Fix<Instance & T1 & T2>>
        ): Objectify<Statics> & EmberClassConstructor<T1 & T2 & Instance>;

        static extend<Statics, Instance extends B1 & B2 & B3,
            T1 extends EmberClassArguments, B1,
            T2 extends EmberClassArguments, B2,
            T3 extends EmberClassArguments, B3>(
            this: Statics & EmberClassConstructor<Instance>,
            arg1: MixinOrLiteral<T1, B1> & ThisType<Fix<Instance & T1>>,
            arg2: MixinOrLiteral<T2, B2> & ThisType<Fix<Instance & T1 & T2>>,
            arg3: MixinOrLiteral<T3, B3> & ThisType<Fix<Instance & T1 & T2 & T3>>
        ): Objectify<Statics> & EmberClassConstructor<T1 & T2 & T3 & Instance>;

        static extend<Statics, Instance extends B1 & B2 & B3 & B4,
            T1 extends EmberClassArguments, B1,
            T2 extends EmberClassArguments, B2,
            T3 extends EmberClassArguments, B3,
            T4 extends EmberClassArguments, B4>(
            this: Statics & EmberClassConstructor<Instance>,
            arg1: MixinOrLiteral<T1, B1> & ThisType<Fix<Instance & T1>>,
            arg2: MixinOrLiteral<T2, B2> & ThisType<Fix<Instance & T1 & T2>>,
            arg3: MixinOrLiteral<T3, B3> & ThisType<Fix<Instance & T1 & T2 & T3>>,
            arg4: MixinOrLiteral<T4, B4> & ThisType<Fix<Instance & T1 & T2 & T3 & T4>>
        ): Objectify<Statics> & EmberClassConstructor<T1 & T2 & T3 & T4 & Instance>;

        static reopen<Statics, Instance>(
            this: Statics & EmberClassConstructor<Instance>
        ): Objectify<Statics> & EmberClassConstructor<Instance>;

        static reopen<Statics, Instance,
            T1 extends EmberClassArguments, B1>(
            this: Statics & EmberClassConstructor<Instance>,
            arg1: MixinOrLiteral<T1, B1> & ThisType<Fix<Instance & T1>>
        ): Objectify<Statics> & EmberClassConstructor<Instance & T1>;

        static reopen<Statics, Instance,
            T1 extends EmberClassArguments, B1,
            T2 extends EmberClassArguments, B2>(
            this: Statics & EmberClassConstructor<Instance>,
            arg1: MixinOrLiteral<T1, B1> & ThisType<Fix<Instance & T1>>,
            arg2: MixinOrLiteral<T2, B2> & ThisType<Fix<Instance & T1 & T2>>
        ): Objectify<Statics> & EmberClassConstructor<Instance & T1 & T2>;

        static reopen<Statics, Instance,
            T1 extends EmberClassArguments, B1,
            T2 extends EmberClassArguments, B2,
            T3 extends EmberClassArguments, B3>(
            this: Statics & EmberClassConstructor<Instance>,
            arg1: MixinOrLiteral<T1, B1> & ThisType<Fix<Instance & T1>>,
            arg2: MixinOrLiteral<T2, B2> & ThisType<Fix<Instance & T1 & T2>>,
            arg3: MixinOrLiteral<T3, B3> & ThisType<Fix<Instance & T1 & T2 & T3>>
        ): Objectify<Statics> & EmberClassConstructor<Instance & T1 & T2 & T3>;

        static reopenClass<Statics>(
            this: Statics
        ): Statics;

        static reopenClass<Statics,
            T1 extends EmberClassArguments>(
            this: Statics, arg1: T1
        ): Statics & T1;

        static reopenClass<Statics,
            T1 extends EmberClassArguments,
            T2 extends EmberClassArguments>(
            this: Statics, arg1: T1, arg2: T2
        ): Statics & T1 & T2;

        static reopenClass<Statics,
            T1 extends EmberClassArguments,
            T2 extends EmberClassArguments,
            T3 extends EmberClassArguments>(
            this: Statics, arg1: T1, arg2: T2, arg3: T3
        ): Statics & T1 & T2 & T3;

        static detect<Statics, Instance>(
            this: Statics & EmberClassConstructor<Instance>,
            obj: any): obj is Objectify<Statics> & EmberClassConstructor<Instance>;

        static detectInstance<Instance>(
            this: EmberClassConstructor<Instance>,
            obj: any): obj is Instance;

        /**
         Iterate over each computed property for the class, passing its name and any
         associated metadata (see metaForProperty) to the callback.
         **/
        static eachComputedProperty(callback: Function, binding: {}): void;
        /**
         Returns the original hash that was passed to meta().
         @param key property name
         **/
        static metaForProperty(key: string): {};
        static isClass: boolean;
        static isMethod: boolean;
    }
    /**
     * The `DataAdapter` helps a data persistence library
     * interface with tools that debug Ember such as Chrome and Firefox.
     */
    class DataAdapter extends Object {
        /**
         * The container-debug-adapter which is used
         * to list all models.
         */
        containerDebugAdapter: any;
        /**
         * Ember Data > v1.0.0-beta.18
         * requires string model names to be passed
         * around instead of the actual factories.
         */
        acceptsModelName: any;
        /**
         * Specifies how records can be filtered.
         * Records returned will need to have a `filterValues`
         * property with a key for every name in the returned array.
         */
        getFilters(): any[];
        /**
         * Fetch the model types and observe them for changes.
         */
        watchModelTypes(typesAdded: Function, typesUpdated: Function): Function;
        /**
         * Fetch the records of a given type and observe them for changes.
         */
        watchRecords(modelName: string, recordsAdded: Function, recordsUpdated: Function, recordsRemoved: Function): Function;
    }
    const Debug: {
        /**
         * Allows for runtime registration of handler functions that override the default deprecation behavior.
         * Deprecations are invoked by calls to [Ember.deprecate](http://emberjs.com/api/classes/Ember.html#method_deprecate).
         * The following example demonstrates its usage by registering a handler that throws an error if the
         * message contains the word "should", otherwise defers to the default handler.
         */
        registerDeprecationHandler(handler: Function): any;
        /**
         * Allows for runtime registration of handler functions that override the default warning behavior.
         * Warnings are invoked by calls made to [Ember.warn](http://emberjs.com/api/classes/Ember.html#method_warn).
         * The following example demonstrates its usage by registering a handler that does nothing overriding Ember's
         * default warning behavior.
         */
        registerWarnHandler(handler: Function): any;
    };
    /**
     * The DefaultResolver defines the default lookup rules to resolve
     * container lookups before consulting the container for registered
     * items:
     */
    class DefaultResolver extends Resolver {
        /**
         * This method is called via the container's resolver method.
         * It parses the provided `fullName` and then looks up and
         * returns the appropriate template or class.
         */
        resolve(fullName: string): {};
        /**
         * This will be set to the Application instance when it is
         * created.
         */
        namespace: Application;
    }
    namespace ENV {
        const EXTEND_PROTOTYPES: typeof Ember.EXTEND_PROTOTYPES;
        const LOG_BINDINGS: boolean;
        const LOG_STACKTRACE_ON_DEPRECATION: boolean;
        const LOG_VERSION: boolean;
        const MODEL_FACTORY_INJECTIONS: boolean;
        const RAISE_ON_DEPRECATION: boolean;
    }
    namespace EXTEND_PROTOTYPES {
        const Array: boolean;
        const Function: boolean;
        const String: boolean;
    }
    /**
     * The `Engine` class contains core functionality for both applications and
     * engines.
     */
    class Engine extends Namespace {
        /**
         * The goal of initializers should be to register dependencies and injections.
         * This phase runs once. Because these initializers may load code, they are
         * allowed to defer application readiness and advance it. If you need to access
         * the container or store you should use an InstanceInitializer that will be run
         * after all initializers and therefore after all code is loaded and the app is
         * ready.
         */
        initializer(initializer: {}): any;
        /**
         * Instance initializers run after all initializers have run. Because
         * instance initializers run after the app is fully set up. We have access
         * to the store, container, and other items. However, these initializers run
         * after code has loaded and are not allowed to defer readiness.
         */
        instanceInitializer(instanceInitializer: any): any;
        /**
         * Set this to provide an alternate class to `Ember.DefaultResolver`
         */
        resolver: Resolver;
    }
    /**
     The `EngineInstance` encapsulates all of the stateful aspects of a
     running `Engine`.
     **/
    class EngineInstance extends Object {
      unregister(fullName: string): void;
    }
    /**
     * This mixin defines the common interface implemented by enumerable objects
     * in Ember. Most of these methods follow the standard Array iteration
     * API defined up to JavaScript 1.8 (excluding language-specific features that
     * cannot be emulated in older versions of JavaScript).
     */
    interface Enumerable<T> {
        /**
         * Helper method returns the first object from a collection. This is usually
         * used by bindings and other parts of the framework to extract a single
         * object if the enumerable contains only one item.
         */
        firstObject: ComputedProperty<T | undefined>;
        /**
         * Helper method returns the last object from a collection. If your enumerable
         * contains only one object, this method should always return that object.
         * If your enumerable is empty, this method should return `undefined`.
         */
        lastObject: ComputedProperty<T | undefined>;
        /**
         * @deprecated Use `Enumerable#includes` instead.
         */
        contains(obj: T): boolean;
        /**
         * Iterates through the enumerable, calling the passed function on each
         * item. This method corresponds to the `forEach()` method defined in
         * JavaScript 1.6.
         */
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        /**
         * Alias for `mapBy`
         */
        getEach(key: string): any[];
        /**
         * Sets the value on the named property for each member. This is more
         * ergonomic than using other methods defined on this helper. If the object
         * implements Ember.Observable, the value will be changed to `set(),` otherwise
         * it will be set directly. `null` objects are skipped.
         */
        setEach(key: string, value: any): any;
        /**
         * Maps all of the items in the enumeration to another value, returning
         * a new array. This method corresponds to `map()` defined in JavaScript 1.6.
         */
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        /**
         * Similar to map, this specialized function returns the value of the named
         * property on all items in the enumeration.
         */
        mapBy(key: string): any[];
        /**
         * Returns an array with all of the items in the enumeration that the passed
         * function returns true for. This method corresponds to `filter()` defined in
         * JavaScript 1.6.
         */
        filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
        filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
        /**
         * Returns an array with all of the items in the enumeration where the passed
         * function returns false. This method is the inverse of filter().
         */
        reject(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
        /**
         * Returns an array with just the items with the matched property. You
         * can pass an optional second argument with the target value. Otherwise
         * this will match any property that evaluates to `true`.
         */
        filterBy(key: string, value?: any): any[];
        /**
         * Returns an array with the items that do not have truthy values for
         * key.  You can pass an optional second argument with the target value.  Otherwise
         * this will match any property that evaluates to false.
         */
        rejectBy(key: string, value?: string): any[];
        /**
         * Returns the first item in the array for which the callback returns true.
         * This method works similar to the `filter()` method defined in JavaScript 1.6
         * except that it will stop working on the array once a match is found.
         */
        find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;
        /**
         * Returns the first item with a property matching the passed value. You
         * can pass an optional second argument with the target value. Otherwise
         * this will match any property that evaluates to `true`.
         */
        findBy(key: string, value: string): T | undefined;
        /**
         * Returns `true` if the passed function returns true for every item in the
         * enumeration. This corresponds with the `every()` method in JavaScript 1.6.
         */
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        /**
         * Returns `true` if the passed property resolves to the value of the second
         * argument for all items in the enumerable. This method is often simpler/faster
         * than using a callback.
         */
        isEvery(key: string, value: boolean): boolean;
        /**
         * Returns `true` if the passed function returns true for any item in the
         * enumeration.
         */
        any(callback: (value: T, index: number, array: T[]) => boolean, target?: {}): boolean;
        /**
         * Returns `true` if the passed property resolves to the value of the second
         * argument for any item in the enumerable. This method is often simpler/faster
         * than using a callback.
         */
        isAny(key: string, value?: boolean): boolean;
        /**
         * This will combine the values of the enumerator into a single value. It
         * is a useful way to collect a summary value from an enumeration. This
         * corresponds to the `reduce()` method defined in JavaScript 1.8.
         */
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        /**
         * Invokes the named method on every object in the receiver that
         * implements it. This method corresponds to the implementation in
         * Prototype 1.6.
         */
        invoke(methodName: keyof T, ...args: any[]): any[];
        /**
         * Simply converts the enumerable into a genuine array. The order is not
         * guaranteed. Corresponds to the method implemented by Prototype.
         */
        toArray(): T[];
        /**
         * Returns a copy of the array with all `null` and `undefined` elements removed.
         */
        compact(): Enumerable<T>;
        /**
         * Returns a new enumerable that excludes the passed value. The default
         * implementation returns an array regardless of the receiver type.
         * If the receiver does not contain the value it returns the original enumerable.
         */
        without(value: T): Enumerable<T>;
        /**
         * Returns a new enumerable that contains only unique values. The default
         * implementation returns an array regardless of the receiver type.
         */
        uniq(): Enumerable<T>;
        /**
         * Converts the enumerable into an array and sorts by the keys
         * specified in the argument.
         */
        sortBy(property: string): Enumerable<T>;
        /**
         * Returns a new enumerable that contains only items containing a unique property value.
         * The default implementation returns an array regardless of the receiver type.
         */
        uniqBy(): Enumerable<T>;
        /**
         * Returns `true` if the passed object can be found in the enumerable.
         */
        includes(searchElement: T, fromIndex?: number): boolean;
        /**
         * This is the handler for the special array content property. If you get
         * this property, it will return this. If you set this property to a new
         * array, it will replace the current content.
         */
        '[]': ComputedProperty<this>;
    }
    const Enumerable: Mixin<Enumerable<any>>;
    /**
    A subclass of the JavaScript Error object for use in Ember.
    **/
    // Restore this to 'typeof Error' when https://github.com/Microsoft/TypeScript/issues/983 is resolved
    // ReSharper disable once DuplicatingLocalDeclaration
    const Error: any; // typeof Error;
    /**
    Handles delegating browser events to their corresponding Ember.Views. For example, when you click on
    a view, Ember.EventDispatcher ensures that that view's mouseDown method gets called.
    **/
    class EventDispatcher extends Object {
        events: {};
    }
    /**
    This mixin allows for Ember objects to subscribe to and emit events.
    You can also chain multiple event subscriptions.
    **/
    interface Evented {
        has(name: string): boolean;
        off(name: string, target: any, method: Function): Evented;
        on(name: string, target: any, method: Function): Evented;
        one(name: string, target: any, method: Function): Evented;
        trigger(name: string, ...args: any[]): void;
    }
    const Evented: Mixin<Evented>;
    const FROZEN_ERROR: string;
    interface Freezable {
        freeze(): Freezable;
        isFrozen: boolean;
    }
    const Freezable: Mixin<Freezable>;
    const GUID_KEY: string;
    namespace Handlebars {
        function compile(string: string): Function;
        function compile(environment: any, options?: any, context?: any, asObject?: any): any;
        function precompile(string: string, options: any): void;
        class Compiler {}
        class JavaScriptCompiler {}
        function registerPartial(name: string, str: any): void;
        function K(): any;
        function createFrame(objec: any): any;
        function Exception(message: string): void;
        class SafeString {
            constructor(str: string);
            static toString(): string;
        }
        function parse(string: string): any;
        function print(ast: any): void;
        const logger: typeof Ember.Logger;
        function log(level: string, str: string): void;
    }
    class HashLocation extends Object {
    }
    class HistoryLocation extends Object {
        rootURL: string;
    }
    const IS_BINDING: RegExp;
    /**
     * Namespace for injection helper methods.
     */
    namespace inject {
        /**
         * Creates a property that lazily looks up another controller in the container.
         * Can only be used when defining another controller.
         */
        function controller<T extends Controller>(name?: string): ComputedProperty<T>;
        /**
         * Creates a property that lazily looks up a service in the container. There
         * are no restrictions as to what objects a service can be injected into.
         */
        function service<T extends Service>(name?: string): ComputedProperty<T>;
    }
    class Helper extends Object {
        static helper(h: (params: any, hash?: any) => any): Helper;
        compute(params: any[], hash: any): any;
        recompute(params: any[], hash: any): any;
    }
    class Instrumentation {
        getProperties(obj: any, list: any[]): {};
        getProperties(obj: any, ...args: string[]): {};
        instrument(name: string, payload: any, callback: Function, binding: any): void;
        reset(): void;
        subscribe(pattern: string, object: any): void;
        unsubscribe(subscriber: any): void;
    }
    const K: Function;
    class LinkComponent extends Component {
      activeClass: string;
      currentWhen: any;
      rel: string | null;
      replace: string | null;
      tabindex: string | null;
      target: string | null;
      title: string | null;
    }
    const LOG_BINDINGS: boolean;
    const LOG_STACKTRACE_ON_DEPRECATION: boolean;
    const LOG_VERSION: boolean;
    class Location {
        create(options?: {}): any;
        registerImplementation(name: string, implementation: any): void;
    }
    const Logger: {
        assert(param: any): void;
        debug(...args: any[]): void;
        error(...args: any[]): void;
        info(...args: any[]): void;
        log(...args: any[]): void;
        warn(...args: any[]): void;
    };
    function MANDATORY_SETTER_FUNCTION(value: string): void;
    const META_KEY: string;
    class Map {
        copy(): Map;
        static create(): Map;
        forEach(callback: Function, self: any): void;
        get(key: any): any;
        has(key: any): boolean;
        set(key: any, value: any): void;
        length: number;
    }
    class MapWithDefault extends Map {
        copy(): MapWithDefault;
        static create(): MapWithDefault;
    }
    class Mixin<T, Base = Ember.Object> {
        /**
         * Mixin needs to have *something* on its prototype, otherwise it's treated like an empty interface.
         */
        private __ember_mixin__: never;

        static create<T, Base = Ember.Object>(args?: T & ThisType<Fix<T & Base>>): Mixin<T, Base>;
    }
    /**
     * This mixin defines the API for modifying array-like objects. These methods
     * can be applied only to a collection that keeps its items in an ordered set.
     * It builds upon the Array mixin and adds methods to modify the array.
     * One concrete implementations of this class include ArrayProxy.
     */
    interface MutableArray<T> extends Array<T>, MutableEnumberable<T> {
        /**
         * __Required.__ You must implement this method to apply this mixin.
         */
        replace(idx: number, amt: number, objects: any[]): any;
        /**
         * Remove all elements from the array. This is useful if you
         * want to reuse an existing array without having to recreate it.
         */
        clear(): this;
        /**
         * This will use the primitive `replace()` method to insert an object at the
         * specified index.
         */
        insertAt(idx: number, object: {}): this;
        /**
         * Remove an object at the specified index using the `replace()` primitive
         * method. You can pass either a single index, or a start and a length.
         */
        removeAt(start: number, len: number): this;
        /**
         * Push the object onto the end of the array. Works just like `push()` but it
         * is KVO-compliant.
         */
        pushObject(obj: T): T;
        /**
         * Add the objects in the passed numerable to the end of the array. Defers
         * notifying observers of the change until all objects are added.
         */
        pushObjects(objects: Enumerable<T>): this;
        /**
         * Pop object from array or nil if none are left. Works just like `pop()` but
         * it is KVO-compliant.
         */
        popObject(): T;
        /**
         * Shift an object from start of array or nil if none are left. Works just
         * like `shift()` but it is KVO-compliant.
         */
        shiftObject(): T;
        /**
         * Unshift an object to start of array. Works just like `unshift()` but it is
         * KVO-compliant.
         */
        unshiftObject(obj: T): T;
        /**
         * Adds the named objects to the beginning of the array. Defers notifying
         * observers until all objects have been added.
         */
        unshiftObjects(objects: Enumerable<T>): this;
        /**
         * Reverse objects in the array. Works just like `reverse()` but it is
         * KVO-compliant.
         */
        reverseObjects(): this;
        /**
         * Replace all the receiver's content with content of the argument.
         * If argument is an empty array receiver will be cleared.
         */
        setObjects(objects: Ember.Array<T>): this;
    }
    const MutableArray: Mixin<MutableArray<any>>;
    /**
     * This mixin defines the API for modifying generic enumerables. These methods
     * can be applied to an object regardless of whether it is ordered or
     * unordered.
     */
    interface MutableEnumberable<T> extends Enumerable<T> {
        /**
         * __Required.__ You must implement this method to apply this mixin.
         */
        addObject(object: T): T;
        /**
         * Adds each object in the passed enumerable to the receiver.
         */
        addObjects(objects: Enumerable<T>): this;
        /**
         * __Required.__ You must implement this method to apply this mixin.
         */
        removeObject(object: T): T;
        /**
         * Removes each object in the passed enumerable from the receiver.
         */
        removeObjects(objects: Enumerable<T>): this;
    }
    const MutableEnumerable: Mixin<MutableEnumberable<any>>;
    const NAME_KEY: string;
    class Namespace extends Object {
    }
    interface NativeArray<T> extends GlobalArray<T>, MutableArray<T>, Observable, Copyable {
        /**
         * __Required.__ You must implement this method to apply this mixin.
         */
        length: number;
        /**
         * Returns the first item in the array for which the callback returns true.
         * This method works similar to the `filter()` method defined in JavaScript 1.6
         * except that it will stop working on the array once a match is found.
         */
        find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;
    }
    const NativeArray: Mixin<NativeArray<any>>;
    class NoneLocation extends Object {
    }
    const ORDER_DEFINITION: string[];
    class Object extends CoreObject.extend(Observable) {
    }
    class ObjectProxy extends Object {
        /**
        The object whose properties will be forwarded.
        **/
        content: Object;
    }

    interface Observable {
        addObserver(obj: any, path: string | null, target: Function | any, method?: Function | string): void;
        beginPropertyChanges(): Observable;
        cacheFor(keyName: string): any;
        decrementProperty(keyName: string, decrement?: number): number;
        endPropertyChanges(): Observable;
        get<T, K extends keyof T>(this: ComputedProperties<T>, key: K): T[K];
        getProperties<T, K extends keyof T>(this: ComputedProperties<T>, list: K[]): Pick<T, K>;
        getProperties<T, K extends keyof T>(this: ComputedProperties<T>, ...list: K[]): Pick<T, K>;
        getWithDefault(keyName: string, defaultValue: any): any;
        hasObserverFor(key: string): boolean;
        incrementProperty(keyName: string, increment?: number): number;
        notifyPropertyChange(keyName: string): Observable;
        propertyDidChange(keyName: string): Observable;
        propertyWillChange(keyName: string): Observable;
        removeObserver(key: string, target: {}, method: Function | string): void;
        set<T, K extends keyof T>(this: ComputedProperties<T>, key: K, value: T[K]): T[K];
        setProperties<T, K extends keyof T>(this: ComputedProperties<T>, hash: Pick<T, K>): Pick<T, K>;

        /**
        Set the value of a boolean property to the opposite of its current value.
        */
        toggleProperty(keyName: string): boolean;
    }
    const Observable: Mixin<Observable, Ember.CoreObject>;
    class OrderedSet {
        add(obj: any): void;
        clear(): void;
        copy(): OrderedSet;
        static create(): OrderedSet;
        forEach(fn: Function, self: any): void;
        has(obj: any): boolean;
        isEmpty(): boolean;
        toArray(): any[];
    }
    /**
     * A low level mixin making ObjectProxy promise-aware.
     */
    interface PromiseProxyMixin<T> extends RSVP.Promise<T> {
        /**
         * If the proxied promise is rejected this will contain the reason
         * provided.
         */
        reason: any;
        /**
         * Once the proxied promise has settled this will become `false`.
         */
        isPending: boolean;
        /**
         * Once the proxied promise has settled this will become `true`.
         */
        isSettled: boolean;
        /**
         * Will become `true` if the proxied promise is rejected.
         */
        isRejected: boolean;
        /**
         * Will become `true` if the proxied promise is fulfilled.
         */
        isFulfilled: boolean;
        /**
         * The promise whose fulfillment value is being proxied by this object.
         */
        promise: RSVP.Promise<T>;
    }
    const PromiseProxyMixin: Mixin<PromiseProxyMixin<any>>;
    class Registry {
        constructor(options: any);
        static set: typeof Ember.set;
        register(fullName: string, factory: any): void;
        unregister(fullName: string): void;
    }
    class Resolver extends Ember.Object {
    }

    // FYI - RSVP source comes from https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/promise.js
    const RSVP: typeof Rsvp;
    namespace RSVP {
        type Promise<T> = Rsvp.Promise<T>;
    }

    /**
      The `Ember.Route` class is used to define individual routes. Refer to
      the [routing guide](http://emberjs.com/guides/routing/) for documentation.
    */
    class Route extends Object.extend(ActionHandler, Evented) {
        // methods
        /**
        This hook is called after this route's model has resolved.
        It follows identical async/promise semantics to `beforeModel`
        but is provided the route's resolved model in addition to
        the `transition`, and is therefore suited to performing
        logic that can only take place after the model has already
        resolved.
        */
        afterModel(resolvedModel: any, transition: Transition): Rsvp.Promise<any>;

        /**
        This hook is the first of the route entry validation hooks
        called when an attempt is made to transition into a route
        or one of its children. It is called before `model` and
        `afterModel`, and is appropriate for cases when:
        1) A decision can be made to redirect elsewhere without
            needing to resolve the model first.
        2) Any async operations need to occur first before the
            model is attempted to be resolved.
        This hook is provided the current `transition` attempt
        as a parameter, which can be used to `.abort()` the transition,
        save it for a later `.retry()`, or retrieve values set
        on it from a previous hook. You can also just call
        `this.transitionTo` to another route to implicitly
        abort the `transition`.
        You can return a promise from this hook to pause the
        transition until the promise resolves (or rejects). This could
        be useful, for instance, for retrieving async code from
        the server that is required to enter a route.
        */
        beforeModel(transition: Transition): Rsvp.Promise<any>;

        /**
         * Returns the controller for a particular route or name.
         * The controller instance must already have been created, either through entering the
         * associated route or using `generateController`.
         */
        controllerFor(name: string): Controller;

        /**
         * Disconnects a view that has been rendered into an outlet.
         */
        disconnectOutlet(options: string | {outlet?: string, parentView?: string}): void;

        /**
         * A hook you can implement to convert the URL into the model for
         * this route.
         */
        model(params: {}, transition: Transition): any | Rsvp.Promise<any>;

        /**
         * Returns the model of a parent (or any ancestor) route
         * in a route hierarchy.  During a transition, all routes
         * must resolve a model object, and if a route
         * needs access to a parent route's model in order to
         * resolve a model (or just reuse the model from a parent),
         * it can call `this.modelFor(theNameOfParentRoute)` to
         * retrieve it.
         */
        modelFor(name: string): {};

        /**
         * Retrieves parameters, for current route using the state.params
         * variable and getQueryParamsFor, using the supplied routeName.
         */
        paramsFor(name: string): {};

        /**
         * Refresh the model on this route and any child routes, firing the
         * `beforeModel`, `model`, and `afterModel` hooks in a similar fashion
         * to how routes are entered when transitioning in from other route.
         * The current route params (e.g. `article_id`) will be passed in
         * to the respective model hooks, and if a different model is returned,
         * `setupController` and associated route hooks will re-fire as well.
         * An example usage of this method is re-querying the server for the
         * latest information using the same parameters as when the route
         * was first entered.
         * Note that this will cause `model` hooks to fire even on routes
         * that were provided a model object when the route was initially
         * entered.
         */
        redirect(): Transition;

        /**
         * Refresh the model on this route and any child routes, firing the
         * `beforeModel`, `model`, and `afterModel` hooks in a similar fashion
         * to how routes are entered when transitioning in from other route.
         * The current route params (e.g. `article_id`) will be passed in
         * to the respective model hooks, and if a different model is returned,
         * `setupController` and associated route hooks will re-fire as well.
         * An example usage of this method is re-querying the server for the
         * latest information using the same parameters as when the route
         * was first entered.
         * Note that this will cause `model` hooks to fire even on routes
         * that were provided a model object when the route was initially
         * entered.
         */
        refresh(): Transition;

        /**
         * `render` is used to render a template into a region of another template
         * (indicated by an `{{outlet}}`). `render` is used both during the entry
         * phase of routing (via the `renderTemplate` hook) and later in response to
         * user interaction.
         */
        render(name: string, options?: RenderOptions): void;

        /**
         * A hook you can use to render the template for the current route.
         * This method is called with the controller for the current route and the
         * model supplied by the `model` hook. By default, it renders the route's
         * template, configured with the controller for the route.
         * This method can be overridden to set up and render additional or
         * alternative templates.
         */
        renderTemplate(controller: Controller, model: {}): void;

        /**
         * Transition into another route while replacing the current URL, if possible.
         * This will replace the current history entry instead of adding a new one.
         * Beside that, it is identical to `transitionTo` in all other respects. See
         * 'transitionTo' for additional information regarding multiple models.
         */
        replaceWith(name: string, ...args: any[]): Transition;

        /**
         * A hook you can use to reset controller values either when the model
         * changes or the route is exiting.
         */
        resetController(controller: Controller, isExiting: boolean, transition: any): void;

        /**
         * Sends an action to the router, which will delegate it to the currently active
         * route hierarchy per the bubbling rules explained under actions.
         */
        send(name: string, ...args: any[]): void;

        /**
         * A hook you can implement to convert the route's model into parameters
         * for the URL.
         *
         * The default `serialize` method will insert the model's `id` into the
         * route's dynamic segment (in this case, `:post_id`) if the segment contains '_id'.
         * If the route has multiple dynamic segments or does not contain '_id', `serialize`
         * will return `Ember.getProperties(model, params)`
         * This method is called when `transitionTo` is called with a context
         * in order to populate the URL.
         */
        serialize(model: {}, params: string[]): string;

        /**
         * A hook you can use to setup the controller for the current route.
         * This method is called with the controller for the current route and the
         * model supplied by the `model` hook.
         * By default, the `setupController` hook sets the `model` property of
         * the controller to the `model`.
         * If you implement the `setupController` hook in your Route, it will
         * prevent this default behavior. If you want to preserve that behavior
         * when implementing your `setupController` function, make sure to call
         * `_super`
         */
        setupController(controller: Controller, model: {}): void;

        /**
         * Transition the application into another route. The route may
         * be either a single route or route path
         */
        transitionTo(name: string, ...object: any[]): Transition;

        /**
         * The name of the view to use by default when rendering this routes template.
         * When rendering a template, the route will, by default, determine the
         * template and view to use from the name of the route itself. If you need to
         * define a specific view, set this property.
         * This is useful when multiple routes would benefit from using the same view
         * because it doesn't require a custom `renderTemplate` method.
         */
        transitionTo(name: string, ...object: any[]): Transition;

        // properties
        /**
         * The controller associated with this route.
         */
        controller: Controller;

        /**
         * The name of the controller to associate with this route.
         * By default, Ember will lookup a route's controller that matches the name
         * of the route (i.e. `App.PostController` for `App.PostRoute`). However,
         * if you would like to define a specific controller to use, you can do so
         * using this property.
         * This is useful in many ways, as the controller specified will be:
         * * p assed to the `setupController` method.
         * * used as the controller for the view being rendered by the route.
         * * returned from a call to `controllerFor` for the route.
         */
        controllerName: string;

        /**
         * Configuration hash for this route's queryParams.
         */
        queryParams: { [key: string]: RouteQueryParam };

        /**
         * The name of the route, dot-delimited
         */
        routeName: string;

        /**
         * The name of the template to use by default when rendering this routes
         * template.
         * This is similar with `viewName`, but is useful when you just want a custom
         * template without a view.
         */
        templateName: string;

        // events
        /**
         * This hook is executed when the router enters the route. It is not executed
         * when the model for the route changes.
         */
        activate(): void;

        /**
         * This hook is executed when the router completely exits this route. It is
         * not executed when the model for the route changes.
         */
        deactivate(): void;

        /**
         * The didTransition action is fired after a transition has successfully been
         * completed. This occurs after the normal model hooks (beforeModel, model,
         * afterModel, setupController) have resolved. The didTransition action has
         * no arguments, however, it can be useful for tracking page views or resetting
         * state on the controller.
         */
        didTransition(): void;

        /**
         * When attempting to transition into a route, any of the hooks may return a promise
         * that rejects, at which point an error action will be fired on the partially-entered
         * routes, allowing for per-route error handling logic, or shared error handling logic
         * defined on a parent route.
         */
        error(error: Error | any, transition: Transition): void;

        /**
         * The loading action is fired on the route when a route's model hook returns a
         * promise that is not already resolved. The current Transition object is the first
         * parameter and the route that triggered the loading event is the second parameter.
         */
        loading(transition: Transition, route: Route): void;

        /**
         * The willTransition action is fired at the beginning of any attempted transition
         * with a Transition object as the sole argument. This action can be used for aborting,
         * redirecting, or decorating the transition from the currently active routes.
         */
        willTransition(transition: Transition): void;
    }
    interface RouterMapContext {
        route(name: string, callback: (this: RouterMapContext) => void): void;
        route(name: string, options?: { path?: string, resetNamespace?: boolean }, callback?: (this: RouterMapContext) => void): void;
    }
    class Router extends Object {
        /**
         * The `Router.map` function allows you to define mappings from URLs to routes
         * in your application. These mappings are defined within the
         * supplied callback function using `this.route`.
         */
        static map(callback: (this: RouterMapContext) => void): void;
    }
    class RouterDSL {
        resource(name: string, options?: {}, callback?: Function): void;
        resource(name: string, callback: Function): void;
        route(name: string, options?: {}): void;
        explicitIndex: boolean;
        router: Router;
        options: any;
    }
    class Service extends Object {
    }
    const STRINGS: boolean;
    namespace String {
        function camelize(str: string): string;
        function capitalize(str: string): string;
        function classify(str: string): string;
        function dasherize(str: string): string;
        function decamelize(str: string): string;
        function fmt(...args: string[]): string;
        function htmlSafe(str: string): void; // TODO: @returns Handlebars.SafeStringStatic;
        function isHTMLSafe(str: string): boolean;
        function loc(...args: string[]): string;
        function underscore(str: string): string;
        function w(str: string): string[];
    }
    const TEMPLATES: {};
    namespace Test {
        class Adapter extends Ember.Object {
            constructor();
        }
        class Promise<T> extends Rsvp.Promise<T> {
            constructor();
        }
        function oninjectHelpers(callback: Function): void;
        function promise<T>(resolver: (a: T) => any, label: string): Ember.Test.Promise<T>;
        function unregisterHelper(name: string): void;
        function registerHelper(name: string, helperMethod: Function): void;
        function registerAsyncHelper(name: string, helperMethod: Function): void;

        const adapter: Object;
        const QUnitAdapter: Object;

        function registerWaiter(callback: Function): void;
        function registerWaiter(context: any, callback: Function): void;
        function unregisterWaiter(callback: Function): void;
        function unregisterWaiter(context: any, callback: Function): void;

        function resolve<T>(result: T): Ember.Test.Promise<T>;
    }
    class TextArea extends Component.extend(TextSupport) {
        cancel(event: Function): void;
        focusIn(event: Function): void;
        focusOut(event: Function): void;
        insertNewLine(event: Function): void;
        keyPress(event: Function): void;
        action: string;
        bubbles: boolean;
        onEvent: string;
    }
    class TextField extends Component.extend(TextSupport) {
        cancel(event: Function): void;
        focusIn(event: Function): void;
        focusOut(event: Function): void;
        insertNewLine(event: Function): void;
        keyPress(event: Function): void;
        action: string;
        bubbles: boolean;
        onEvent: string;
        pattern: string;
        size: string;
        type: string;
        value: string;
    }
    interface Transition {
        targetName: string;
        urlMethod: string;
        intent: any;
        params: {} | any;
        pivotHandler: any;
        resolveIndex: number;
        handlerInfos: any;
        resolvedModels: {} | any;
        isActive: boolean;
        state: any;
        queryParams: {} | any;
        queryParamsOnly: boolean;

        isTransition: boolean;

        /**
          The Transition's internal promise. Calling `.then` on this property
          is that same as calling `.then` on the Transition object itself, but
          this property is exposed for when you want to pass around a
          Transition's promise, but not the Transition object itself, since
          Transition object can be externally `abort`ed, while the promise
          cannot.
         */
        promise: Rsvp.Promise<any>;

        /**
          Custom state can be stored on a Transition's `data` object.
          This can be useful for decorating a Transition within an earlier
          hook and shared with a later hook. Properties set on `data` will
          be copied to new transitions generated by calling `retry` on this
          transition.
         */
        data: any;

        /**
          A standard promise hook that resolves if the transition
          succeeds and rejects if it fails/redirects/aborts.

          Forwards to the internal `promise` property which you can
          use in situations where you want to pass around a thennable,
          but not the Transition itself.

          @arg {Function} onFulfilled
          @arg {Function} onRejected
          @arg {String} label optional string for labeling the promise. Useful for tooling.
          @return {Promise}
         */
        then(onFulfilled: Function, onRejected?: Function, label?: string): Rsvp.Promise<any>;

        /**
          Forwards to the internal `promise` property which you can
          use in situations where you want to pass around a thennable,
          but not the Transition itself.

          @method catch
          @arg {Function} onRejection
          @arg {String} label optional string for labeling the promise.
          Useful for tooling.
          @return {Promise}
         */
        catch(onRejection: Function, label?: string): Rsvp.Promise<any>;

        /**
          Forwards to the internal `promise` property which you can
          use in situations where you want to pass around a thennable,
          but not the Transition itself.

          @method finally
          @arg {Function} callback
          @arg {String} label optional string for labeling the promise.
          Useful for tooling.
          @return {Promise}
         */
        finally(callback: Function, label?: string): Rsvp.Promise<any>;

        /**
         Aborts the Transition. Note you can also implicitly abort a transition
         by initiating another transition while a previous one is underway.
        */
        abort(): Transition;
        normalize(manager: StateManager, contexts: any[]): void;

        /**
         Retries a previously-aborted transition (making sure to abort the
         transition if it's still active). Returns a new transition that
         represents the new attempt to transition.
        */
        retry(): Transition;

        /**
          Sets the URL-changing method to be employed at the end of a
          successful transition. By default, a new Transition will just
          use `updateURL`, but passing 'replace' to this method will
          cause the URL to update using 'replaceWith' instead. Omitting
          a parameter will disable the URL change, allowing for transitions
          that don't update the URL at completion (this is also used for
          handleURL, since the URL has already changed before the
          transition took place).

          @arg {String} method the type of URL-changing method to use
            at the end of a transition. Accepted values are 'replace',
            falsy values, or any other non-falsy value (which is
            interpreted as an updateURL transition).

          @return {Transition} this transition
         */
        method(method: string): Transition;

        /**
          Fires an event on the current list of resolved/resolving
          handlers within this transition. Useful for firing events
          on route hierarchies that haven't fully been entered yet.

          Note: This method is also aliased as `send`

          @arg {Boolean} [ignoreFailure=false] a boolean specifying whether unhandled events throw an error
          @arg {String} name the name of the event to fire
         */
        trigger(ignoreFailure: boolean, eventName: string): void;
        /**
          Fires an event on the current list of resolved/resolving
          handlers within this transition. Useful for firing events
          on route hierarchies that haven't fully been entered yet.

          Note: This method is also aliased as `send`

          @arg {String} name the name of the event to fire
         */
        trigger(eventName: string): void;

        /**
          Transitions are aborted and their promises rejected
          when redirects occur; this method returns a promise
          that will follow any redirects that occur and fulfill
          with the value fulfilled by any redirecting transitions
          that occur.

          @return {Promise} a promise that fulfills with the same
            value that the final redirecting transition fulfills with
         */
        followRedirects(): Rsvp.Promise<any>;
    }
    const VERSION: string;
    interface ViewTargetActionSupport {
        target: any;
        actionContext: any;
    }
    const ViewTargetActionSupport: Mixin<ViewTargetActionSupport>;
    const ViewUtils: {}; // TODO: define interface
    function addListener(
        obj: any,
        eventName: string,
        target: Function | any,
        method: Function | string,
        once?: boolean
    ): void;
    function addObserver(obj: any, path: string | null, target: Function | any, method?: Function | string): void;
    function aliasMethod(methodName: string): ComputedProperty<any>;
    function assert(desc: string, test: boolean): void;
    function beginPropertyChanges(): void;

    /**
     * @deprecated https://emberjs.com/deprecations/v2.x#toc_ember-binding
     */
    function bind(obj: any, to: string, from: string): Binding;
    function cacheFor(obj: any, key: string): any;
    function canInvoke(obj: any, methodName: string): boolean;
    function changeProperties(callback: Function, binding?: any): void;
    function compare(v: any, w: any): number;
    type compareFunc = (itemA: any, itemB: any) => number;
    interface DeprecateOptions {
        id: string;
        until: string;
    }
    // ReSharper disable once DuplicatingLocalDeclaration

    type ComputedPropertyGetterFunction<T> = (this: any, key: string) => T;

    interface ComputedPropertyGet<T> {
        get(this: any, key: string): T;
    }

    interface ComputedPropertySet<T> {
        set(this: any, key: string, value: T): T;
    }

    type ComputedPropertyCallback<T> =
        ComputedPropertyGetterFunction<T> |
        ComputedPropertyGet<T> |
        ComputedPropertySet<T> |
        (ComputedPropertyGet<T> & ComputedPropertySet<T>);

    type ComputedPropertyReturn<T> = ComputedProperty<T>;

    const computed: {
        <T>(cb: ComputedPropertyCallback<T>): ComputedProperty<T>;
        <T>(k1: string, cb: ComputedPropertyCallback<T>): ComputedProperty<T>;
        <T>(k1: string, k2: string, cb: ComputedPropertyCallback<T>): ComputedProperty<T>;
        <T>(k1: string, k2: string, k3: string, cb: ComputedPropertyCallback<T>): ComputedProperty<T>;
        <T>(k1: string, k2: string, k3: string, k4: string, cb: ComputedPropertyCallback<T>): ComputedProperty<T>;
        <T>(k1: string, k2: string, k3: string, k4: string, k5: string, cb: ComputedPropertyCallback<T>): ComputedProperty<T>;
        <T>(k1: string, k2: string, k3: string, k4: string, k5: string, k6: string, cb: ComputedPropertyCallback<T>): ComputedProperty<T>;
        (k1: string, k2: string, k3: string, k4: string, k5: string, k6: string, k7: string, ...rest: any[]): ComputedProperty<any>;

        alias(dependentKey: string): ComputedProperty<any>;
        and(...args: string[]): ComputedProperty<any>;
        any(...args: string[]): ComputedProperty<any>;
        bool(dependentKey: string): ComputedProperty<any>;
        collect(...dependentKeys: string[]): ComputedProperty<any>;
        defaultTo(defaultPath: string): ComputedProperty<any>;
        deprecatingAlias(dependentKey: string, options: DeprecateOptions): ComputedProperty<any>;
        empty(dependentKey: string): ComputedProperty<any>;
        equal(dependentKey: string, value: any): ComputedProperty<any>;
        filter(
            dependentKey: string,
            callback: (item: any, index?: number, array?: any[]) => boolean
        ): ComputedProperty<any>;
        filterBy(dependentKey: string, propertyKey: string, value?: any): ComputedProperty<any>;
        filterProperty(key: string, value?: string): any[];
        gt(dependentKey: string, value: number): ComputedProperty<any>;
        gte(dependentKey: string, value: number): ComputedProperty<any>;
        intersect(...args: string[]): ComputedProperty<any>;
        lt(dependentKey: string, value: number): ComputedProperty<any>;
        lte(dependentKey: string, value: number): ComputedProperty<any>;
        map(dependentKey: string, callback: <T>(item: any, index: number) => T): ComputedProperty<any>;
        mapBy(dependentKey: string, propertyKey: string): ComputedProperty<any>;
        mapProperty(key: string): any[];
        match(dependentKey: string, regexp: RegExp): ComputedProperty<any>;
        max(dependentKey: string): ComputedProperty<any>;
        min(dependentKey: string): ComputedProperty<any>;
        none(dependentKey: string): ComputedProperty<any>;
        not(dependentKey: string): ComputedProperty<any>;
        notEmpty(dependentKey: string): ComputedProperty<any>;
        oneWay(dependentKey: string): ComputedProperty<any>;
        or(...args: string[]): ComputedProperty<any>;
        readOnly(dependentString: string): ComputedProperty<any>;
        reads(dependentKey: string): ComputedProperty<any>;
        setDiff(setAProperty: string, setBProperty: string): ComputedProperty<any>;
        sort(itemsKey: string, sortDefinition: string | compareFunc): ComputedProperty<any>;
        sum(dependentKey: string): ComputedProperty<any>;
        union(...args: string[]): ComputedProperty<any>;
        uniq(...args: string[]): ComputedProperty<any>;
        uniqBy(dependentKey: string, propertyKey: string): ComputedProperty<any>;
    };
    function get<T, K extends keyof T>(obj: ComputedProperties<T>, key: K): T[K];
    function getProperties<T, K extends keyof T>(obj: ComputedProperties<T>, list: K[]): Pick<T, K>;
    function getProperties<T, K extends keyof T>(obj: ComputedProperties<T>, ...list: K[]): Pick<T, K>;
    function set<T, K extends keyof T, V extends T[K]>(obj: ComputedProperties<T>, key: K, value: V): V;
    function setProperties<T, K extends keyof T>(obj: ComputedProperties<T>, hash: Pick<T, K>): Pick<T, K>;
    // ReSharper restore DuplicatingLocalDeclaration
    function controllerFor(
        container: Container,
        controllerName: string,
        lookupOptions?: {}
    ): Controller;
    function copy(obj: any, deep: boolean): any;
    /**
    Creates an instance of the CoreObject class.
    @param arguments A hash containing values with which to initialize the newly instantiated object.
    **/
    function create(arguments?: {}): CoreObject;
    function debug(message: string): void;
    function defineProperty(obj: any, keyName: string, desc: {}): void;
    function deprecate(message: string, test?: boolean): void;
    function deprecateFunc(message: string, func: Function): Function;
    function destroy(obj: any): void;
    function endPropertyChanges(): void;
    function expandProperties(pattern: string, callback: Function): void;
    function finishChains(obj: any): void;
    function generateController(
        container: Container,
        controllerName: string,
        context: any
    ): Controller;
    function generateGuid(obj: any, prefix?: string): string;
    function getEngineParent(engine: EngineInstance): EngineInstance;
    function getWithDefault(root: string, key: string, defaultValue: any): any;
    function guidFor(obj: any): string;
    function handleErrors(func: Function, context: any): any;
    function hasListeners(context: any, name: string): boolean;
    function hasOwnProperty(prop: string): boolean;
    function immediateObserver(func: Function, ...propertyNames: any[]): Function;
    function inspect(obj: any): string;
    function instrument(name: string, payload: any, callback: Function, binding: any): void;
    function isArray(obj: any): boolean;
    function isBlank(obj: any): boolean;
    function isEmpty(obj: any): boolean;
    function isEqual(a: any, b: any): boolean;
    function isGlobalPath(path: string): boolean;
    const isNamespace: boolean;
    function isNone(obj: any): obj is null | undefined;
    function isPresent(obj: any): boolean;
    function isPrototypeOf(obj: {}): boolean;
    function isWatching(obj: any, key: string): boolean;
    function keys(obj: any): any[];
    function listenersDiff(obj: any, eventName: string, otherActions: any[]): any[];
    function listenersFor(obj: any, eventName: string): any[];
    function listenersUnion(obj: any, eventName: string, otherActions: any[]): void;
    // ReSharper disable once DuplicatingLocalDeclaration
    const lookup: {}; // TODO: define interface
    function makeArray(obj: any): any[];
    function merge(original: any, updates: any): any;
    function meta(obj: any): {};
    function mixin(obj: any, ...args: any[]): any;
    function observer(...args: any[]): Function;
    function observersFor(obj: any, path: string): any[];
    function on(eventNames: string, func: Function): Function;
    function onLoad(name: string, callback: Function): void;
    const onError: Error;
    function onerror(error: any): void;
    function overrideChains(obj: any, keyName: string, m: any): boolean;
    // ReSharper disable once DuplicatingLocalDeclaration
    const platform: {
        defineProperty: boolean;
        hasPropertyAccessors: boolean;
    };
    function propertyDidChange(obj: any, keyName: string): void;
    function propertyIsEnumerable(prop: string): boolean;
    function propertyWillChange(obj: any, keyName: string): void;
    function removeChainWatcher(obj: any, keyName: string, node: any): void;
    function removeListener(
        obj: any,
        eventName: string,
        target: Function | any,
        method: Function | string
    ): void;
    function removeObserver(obj: any, path: string, target: any, method: Function): any;

    /**
     * @deprecated Ember.required is deprecated as its behavior is inconsistent and unreliable
     */
    function required(): ComputedProperty<any>;
    function reset(): void;
    function rewatch(obj: any): void;

    type RunMethod<Target, Ret = any> = ((this: Target, ...args: any[]) => Ret) | keyof Target;
    type EmberRunQueues = "sync" | "actions" | "routerTransitions" | "render"| "afterRender" | "destroy";

    interface EmberRunTimer {
        __ember_run_timer_brand__: any;
    }

    const run: {
        /**
         * Runs the passed target and method inside of a RunLoop, ensuring any
         * deferred actions including bindings and views updates are flushed at the
         * end.
         */
        <Ret>(method: (...args: any[]) => Ret): Ret;
        <Target, Ret>(target: Target, method: RunMethod<Target, Ret>): Ret;
        /**
         * If no run-loop is present, it creates a new one. If a run loop is
         * present it will queue itself to run on the existing run-loops action
         * queue.
         */
        join<Ret>(method: (...args: any[]) => Ret, ...args: any[]): Ret | undefined;
        join<Target, Ret>(target: Target, method: RunMethod<Target, Ret>, ...args: any[]): Ret | undefined;
        /**
         * Allows you to specify which context to call the specified function in while
         * adding the execution of that function to the Ember run loop. This ability
         * makes this method a great way to asynchronously integrate third-party libraries
         * into your Ember application.
         */
        bind<Target, Ret>(target: Target, method: RunMethod<Target, Ret>, ...args: any[]): (...args: any[]) => Ret;
        /**
         * Begins a new RunLoop. Any deferred actions invoked after the begin will
         * be buffered until you invoke a matching call to `run.end()`. This is
         * a lower-level way to use a RunLoop instead of using `run()`.
         */
        begin(): void;
        /**
         * Ends a RunLoop. This must be called sometime after you call
         * `run.begin()` to flush any deferred actions. This is a lower-level way
         * to use a RunLoop instead of using `run()`.
         */
        end(): void;
        /**
         * Adds the passed target/method and any optional arguments to the named
         * queue to be executed at the end of the RunLoop. If you have not already
         * started a RunLoop when calling this method one will be started for you
         * automatically.
         */
        schedule<Target>(queue: EmberRunQueues, target: Target, method: RunMethod<Target>, ...args: any[]): EmberRunTimer;
        schedule(queue: EmberRunQueues, method: (args: any[]) => any, ...args: any[]): EmberRunTimer;
        /**
         * Invokes the passed target/method and optional arguments after a specified
         * period of time. The last parameter of this method must always be a number
         * of milliseconds.
         */
        later(method: (...args: any[]) => any, wait: number): EmberRunTimer;
        later<Target>(target: Target, method: RunMethod<Target>, wait: number): EmberRunTimer;
        later<Target>(target: Target, method: RunMethod<Target>, arg0: any, wait: number): EmberRunTimer;
        later<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, wait: number): EmberRunTimer;
        later<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, wait: number): EmberRunTimer;
        later<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, wait: number): EmberRunTimer;
        later<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, wait: number): EmberRunTimer;
        later<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, wait: number): EmberRunTimer;
        /**
         * Schedule a function to run one time during the current RunLoop. This is equivalent
         * to calling `scheduleOnce` with the "actions" queue.
         */
        once<Target>(target: Target, method: RunMethod<Target>, ...args: any[]): EmberRunTimer;
        /**
         * Schedules a function to run one time in a given queue of the current RunLoop.
         * Calling this method with the same queue/target/method combination will have
         * no effect (past the initial call).
         */
        scheduleOnce<Target>(queue: EmberRunQueues, target: Target, method: RunMethod<Target>, ...args: any[]): EmberRunTimer;
        /**
         * Schedules an item to run from within a separate run loop, after
         * control has been returned to the system. This is equivalent to calling
         * `run.later` with a wait time of 1ms.
         */
        next<Target>(target: Target, method: RunMethod<Target>, ...args: any[]): EmberRunTimer;
        /**
         * Cancels a scheduled item. Must be a value returned by `run.later()`,
         * `run.once()`, `run.scheduleOnce()`, `run.next()`, `run.debounce()`, or
         * `run.throttle()`.
         */
        cancel(timer: EmberRunTimer): boolean;
        /**
         * Delay calling the target method until the debounce period has elapsed
         * with no additional debounce calls. If `debounce` is called again before
         * the specified time has elapsed, the timer is reset and the entire period
         * must pass again before the target method is called.
         */
        debounce(method: (...args: any[]) => any, wait: number, immediate?: boolean): EmberRunTimer;
        debounce<Target>(target: Target, method: RunMethod<Target>, wait: number, immediate?: boolean): EmberRunTimer;
        debounce<Target>(target: Target, method: RunMethod<Target>, arg0: any, wait: number, immediate?: boolean): EmberRunTimer;
        debounce<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, wait: number, immediate?: boolean): EmberRunTimer;
        debounce<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, wait: number, immediate?: boolean): EmberRunTimer;
        debounce<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, wait: number, immediate?: boolean): EmberRunTimer;
        debounce<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, wait: number, immediate?: boolean): EmberRunTimer;
        debounce<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, wait: number, immediate?: boolean): EmberRunTimer;
        /**
         * Ensure that the target method is never called more frequently than
         * the specified spacing period. The target method is called immediately.
         */
        throttle(method: (...args: any[]) => any, spacing: number, immediate?: boolean): EmberRunTimer;
        throttle<Target>(target: Target, method: RunMethod<Target>, spacing: number, immediate?: boolean): EmberRunTimer;
        throttle<Target>(target: Target, method: RunMethod<Target>, arg0: any, spacing: number, immediate?: boolean): EmberRunTimer;
        throttle<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, spacing: number, immediate?: boolean): EmberRunTimer;
        throttle<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, spacing: number, immediate?: boolean): EmberRunTimer;
        throttle<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, spacing: number, immediate?: boolean): EmberRunTimer;
        throttle<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, spacing: number, immediate?: boolean): EmberRunTimer;
        throttle<Target>(target: Target, method: RunMethod<Target>, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, spacing: number, immediate?: boolean): EmberRunTimer;

        queues: EmberRunQueues[];
    };
    function runInDebug(fn: Function): void;
    function runLoadHooks(name: string, object: any): void;
    function sendEvent(obj: any, eventName: string, params?: any[], actions?: any[]): boolean;
    function subscribe(pattern: string, object: any): void;
    function toLocaleString(): string;
    function toString(): string;
    function tryCatchFinally(
        tryable: Function,
        catchable: Function,
        finalizer: Function,
        binding?: any
    ): any;
    function tryInvoke(obj: any, methodName: string, args?: any[]): any;
    function trySet(obj: any, path: string, value: any): void;
    function typeOf(item: any): string;
    function unsubscribe(subscriber: any): void;
    function unwatch(obj: any, keyPath: string): void;
    function unwatchKey(obj: any, keyName: string): void;
    function unwatchPath(obj: any, keyPath: string): void;
    // ReSharper disable once DuplicatingLocalDeclaration
    const uuid: number;
    function valueOf(): {};
    function warn(message: string, test?: boolean): void;
    function watch(obj: any, keyPath: string): void;
    function watchKey(obj: any, keyName: string): void;
    function watchPath(obj: any, keyPath: string): void;
    function watchedEvents(obj: {}): any[];
    function wrap(func: Function, superFunc: Function): Function;
    const _ContainerProxyMixin: Mixin<Object>;
    const _RegistryProxyMixin: Mixin<Object>;
    function getOwner(object: any): any;
    function setOwner(object: any, owner: any): void;
    const testing: boolean;
    const MODEL_FACTORY_INJECTIONS: boolean;
    function assign(original: any, ...sources: any[]): any;
}

export default Ember;
}

declare module '@ember/application' {
    import Ember from 'ember';
    export default Ember.Application;
    export const getOwner: typeof Ember.getOwner;
    export const onLoad: typeof Ember.onLoad;
    export const runLoadHooks: typeof Ember.runLoadHooks;
    export const setOwner: typeof Ember.setOwner;
}

declare module '@ember/application/deprecations' {
    import Ember from 'ember';
    export const deprecate: typeof Ember.deprecate;
    export const deprecateFunc: typeof Ember.deprecateFunc;
}

declare module '@ember/application/globals-resolver' {
    import Ember from 'ember';
    export default Ember.DefaultResolver;
}

declare module '@ember/application/instance' {
    import Ember from 'ember';
    export default Ember.ApplicationInstance;
}

declare module '@ember/application/resolver' {
    import Ember from 'ember';
    export default Ember.Resolver;
}

declare module '@ember/array' {
    import Ember from 'ember';
    export default Ember.Array;
    export const A: typeof Ember.A;
    export const isArray: typeof Ember.isArray;
    export const makeArray: typeof Ember.makeArray;
}

declare module '@ember/array/mutable' {
    import Ember from 'ember';
    export default Ember.MutableArray;
}

declare module '@ember/array/proxy' {
    import Ember from 'ember';
    export default Ember.ArrayProxy;
}

declare module '@ember/component' {
    import Ember from 'ember';
    export default Ember.Component;
}

declare module '@ember/component/checkbox' {
    import Ember from 'ember';
    export default Ember.Checkbox;
}

declare module '@ember/component/helper' {
    import Ember from 'ember';
    export default Ember.Helper;
    export const helper: typeof Ember.Helper.helper;
}

declare module '@ember/component/text-area' {
    import Ember from 'ember';
    export default Ember.TextArea;
}

declare module '@ember/component/text-field' {
    import Ember from 'ember';
    export default Ember.TextField;
}

declare module '@ember/controller' {
    import Ember from 'ember';
    export default Ember.Controller;
    export const inject: typeof Ember.inject.controller;
}

declare module '@ember/debug' {
    import Ember from 'ember';
    export const assert: typeof Ember.assert;
    export const debug: typeof Ember.debug;
    export const inspect: typeof Ember.inspect;
    export const registerDeprecationHandler: typeof Ember.Debug.registerDeprecationHandler;
    export const registerWarnHandler: typeof Ember.Debug.registerWarnHandler;
    export const runInDebug: typeof Ember.runInDebug;
    export const warn: typeof Ember.warn;
}

declare module '@ember/debug/container-debug-adapter' {
    import Ember from 'ember';
    export default Ember.ContainerDebugAdapter;
}

declare module '@ember/debug/data-adapter' {
    import Ember from 'ember';
    export default Ember.DataAdapter;
}

declare module '@ember/engine' {
    import Ember from 'ember';
    export default Ember.Engine;
    export const getEngineParent: typeof Ember.getEngineParent;
}

declare module '@ember/engine/instance' {
    import Ember from 'ember';
    export default Ember.EngineInstance;
}

declare module '@ember/enumerable' {
    import Ember from 'ember';
    export default Ember.Enumerable;
}

declare module '@ember/instrumentation' {
    import Ember from 'ember';
    export const instrument: typeof Ember.instrument;
    export const reset: typeof Ember.reset;
    export const subscribe: typeof Ember.subscribe;
    export const unsubscribe: typeof Ember.unsubscribe;
}

declare module '@ember/map' {
    import Ember from 'ember';
    export default Ember.Map;
}

declare module '@ember/map/with-default' {
    import Ember from 'ember';
    export default Ember.MapWithDefault;
}

declare module '@ember/object' {
    import Ember from 'ember';
    export default Ember.Object;
    export const aliasMethod: typeof Ember.aliasMethod;
    export const computed: typeof Ember.computed;
    export const defineProperty: typeof Ember.defineProperty;
    export const get: typeof Ember.get;
    export const getProperties: typeof Ember.getProperties;
    export const getWithDefault: typeof Ember.getWithDefault;
    export const observer: typeof Ember.observer;
    export const set: typeof Ember.set;
    export const setProperties: typeof Ember.setProperties;
    export const trySet: typeof Ember.trySet;
}

declare module '@ember/object/computed' {
    import Ember from 'ember';
    export default Ember.ComputedProperty;
    export const alias: typeof Ember.computed.alias;
    export const and: typeof Ember.computed.and;
    export const bool: typeof Ember.computed.bool;
    export const collect: typeof Ember.computed.collect;
    export const deprecatingAlias: typeof Ember.computed.deprecatingAlias;
    export const empty: typeof Ember.computed.empty;
    export const equal: typeof Ember.computed.equal;
    export const expandProperties: typeof Ember.expandProperties;
    export const filter: typeof Ember.computed.filter;
    export const filterBy: typeof Ember.computed.filterBy;
    export const filterProperty: typeof Ember.computed.filterProperty;
    export const gt: typeof Ember.computed.gt;
    export const gte: typeof Ember.computed.gte;
    export const intersect: typeof Ember.computed.intersect;
    export const lt: typeof Ember.computed.lt;
    export const lte: typeof Ember.computed.lte;
    export const map: typeof Ember.computed.map;
    export const mapBy: typeof Ember.computed.mapBy;
    export const mapProperty: typeof Ember.computed.mapProperty;
    export const match: typeof Ember.computed.match;
    export const max: typeof Ember.computed.max;
    export const min: typeof Ember.computed.min;
    export const none: typeof Ember.computed.none;
    export const not: typeof Ember.computed.not;
    export const notEmpty: typeof Ember.computed.notEmpty;
    export const oneWay: typeof Ember.computed.oneWay;
    export const or: typeof Ember.computed.or;
    export const readOnly: typeof Ember.computed.readOnly;
    export const reads: typeof Ember.computed.reads;
    export const setDiff: typeof Ember.computed.setDiff;
    export const sort: typeof Ember.computed.sort;
    export const sum: typeof Ember.computed.sum;
    export const union: typeof Ember.computed.union;
    export const uniq: typeof Ember.computed.uniq;
    export const uniqBy: typeof Ember.computed.uniqBy;
}

declare module '@ember/object/core' {
    import Ember from 'ember';
    export default Ember.CoreObject;
}

declare module '@ember/object/evented' {
    import Ember from 'ember';
    export default Ember.Evented;
    export const on: typeof Ember.on;
}

declare module '@ember/object/events' {
    import Ember from 'ember';
    export const addListener: typeof Ember.addListener;
    export const removeListener: typeof Ember.removeListener;
    export const sendEvent: typeof Ember.sendEvent;
}

declare module '@ember/object/internals' {
    import Ember from 'ember';
    export const cacheFor: typeof Ember.cacheFor;
    export const copy: typeof Ember.copy;
    export const guidFor: typeof Ember.guidFor;
}

declare module '@ember/object/mixin' {
    import Ember from 'ember';
    export default Ember.Mixin;
}

declare module '@ember/object/observable' {
    import Ember from 'ember';
    export default Ember.Observable;
}

declare module '@ember/object/observers' {
    import Ember from 'ember';
    export const addObserver: typeof Ember.addObserver;
    export const removeObserver: typeof Ember.removeObserver;
}

declare module '@ember/object/promise-proxy-mixin' {
    import Ember from 'ember';
    export default Ember.PromiseProxyMixin;
}

declare module '@ember/object/proxy' {
    import Ember from 'ember';
    export default Ember.ObjectProxy;
}

declare module '@ember/polyfills' {
    import Ember from 'ember';
    export const assign: typeof Ember.assign;
    export const create: typeof Ember.create;
    export const hasPropertyAccessors: typeof Ember.platform.hasPropertyAccessors;
    export const keys: typeof Ember.keys;
    export const merge: typeof Ember.merge;
}

declare module '@ember/routing/auto-location' {
    import Ember from 'ember';
    export default Ember.AutoLocation;
}

declare module '@ember/routing/hash-location' {
    import Ember from 'ember';
    export default Ember.HashLocation;
}

declare module '@ember/routing/history-location' {
    import Ember from 'ember';
    export default Ember.HistoryLocation;
}

declare module '@ember/routing/link-component' {
    import Ember from 'ember';
    export default Ember.LinkComponent;
}

declare module '@ember/routing/location' {
    import Ember from 'ember';
    export default Ember.Location;
}

declare module '@ember/routing/none-location' {
    import Ember from 'ember';
    export default Ember.NoneLocation;
}

declare module '@ember/routing/route' {
    import Ember from 'ember';
    export default Ember.Route;
}

declare module '@ember/routing/router' {
    import Ember from 'ember';
    export default Ember.Router;
}

declare module '@ember/runloop' {
    import Ember from 'ember';
    export const begin: typeof Ember.run.begin;
    export const bind: typeof Ember.run.bind;
    export const cancel: typeof Ember.run.cancel;
    export const debounce: typeof Ember.run.debounce;
    export const end: typeof Ember.run.end;
    export const join: typeof Ember.run.join;
    export const later: typeof Ember.run.later;
    export const next: typeof Ember.run.next;
    export const once: typeof Ember.run.once;
    export const run: typeof Ember.run;
    export const schedule: typeof Ember.run.schedule;
    export const scheduleOnce: typeof Ember.run.scheduleOnce;
    export const throttle: typeof Ember.run.throttle;
}

declare module '@ember/service' {
    import Ember from 'ember';
    export default Ember.Service;
    export const inject: typeof Ember.inject.service;
}

declare module '@ember/string' {
    import Ember from 'ember';
    export const camelize: typeof Ember.String.camelize;
    export const capitalize: typeof Ember.String.capitalize;
    export const classify: typeof Ember.String.classify;
    export const dasherize: typeof Ember.String.dasherize;
    export const decamelize: typeof Ember.String.decamelize;
    export const fmt: typeof Ember.String.fmt;
    export const htmlSafe: typeof Ember.String.htmlSafe;
    export const isHTMLSafe: typeof Ember.String.isHTMLSafe;
    export const loc: typeof Ember.String.loc;
    export const underscore: typeof Ember.String.underscore;
    export const w: typeof Ember.String.w;
}

declare module '@ember/test' {
    import Ember from 'ember';
    export const registerAsyncHelper: typeof Ember.Test.registerAsyncHelper;
    export const registerHelper: typeof Ember.Test.registerHelper;
    export const registerWaiter: typeof Ember.Test.registerWaiter;
    export const unregisterHelper: typeof Ember.Test.unregisterHelper;
    export const unregisterWaiter: typeof Ember.Test.unregisterWaiter;
}

declare module '@ember/test/adapter' {
    import Ember from 'ember';
    export default Ember.Test.Adapter;
}

declare module '@ember/utils' {
    import Ember from 'ember';
    export const compare: typeof Ember.compare;
    export const isBlank: typeof Ember.isBlank;
    export const isEmpty: typeof Ember.isEmpty;
    export const isEqual: typeof Ember.isEqual;
    export const isNone: typeof Ember.isNone;
    export const isPresent: typeof Ember.isPresent;
    export const tryInvoke: typeof Ember.tryInvoke;
    export const typeOf: typeof Ember.typeOf;
}

declare module 'htmlbars-inline-precompile' {
    interface TemplateFactory {
        __htmlbars_inline_precompile_template_factory: any;
    }
    export default function hbs(tagged: TemplateStringsArray): TemplateFactory;
}
