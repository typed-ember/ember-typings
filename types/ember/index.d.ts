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

type ObserverMethod<Target, Sender> =
    (keyof Target) |
    ((this: Target, sender: Sender, key: keyof Sender, value: any, rev: number) => void);

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

interface EventDispatcherEvents {
    touchstart?: string | null;
    touchmove?: string | null;
    touchend?: string | null;
    touchcancel?: string | null;
    keydown?: string | null;
    keyup?: string | null;
    keypress?: string | null;
    mousedown?: string | null;
    mouseup?: string | null;
    contextmenu?: string | null;
    click?: string | null;
    dblclick?: string | null;
    mousemove?: string | null;
    focusin?: string | null;
    focusout?: string | null;
    mouseenter?: string | null;
    mouseleave?: string | null;
    submit?: string | null;
    input?: string | null;
    change?: string | null;
    dragstart?: string | null;
    drag?: string | null;
    dragenter?: string | null;
    dragleave?: string | null;
    dragover?: string | null;
    drop?: string | null;
    dragend?: string | null;
    [event: string]: string | null | undefined;
}

interface ViewMixin {
    /**
     * A list of properties of the view to apply as attributes. If the property
     * is a string value, the value of that string will be applied as the value
     * for an attribute of the property's name.
     */
    attributeBindings: string[];
    /**
     * Returns the current DOM element for the view.
     */
    element: Element;
    /**
     * Returns a jQuery object for this view's element. If you pass in a selector
     * string, this method will return a jQuery object, using the current element
     * as its buffer.
     */
    $: JQueryStatic;
    /**
     * The HTML `id` of the view's element in the DOM. You can provide this
     * value yourself but it must be unique (just as in HTML):
     */
    elementId: string;
    /**
     * Tag name for the view's outer element. The tag name is only used when an
     * element is first created. If you change the `tagName` for an element, you
     * must destroy and recreate the view element.
     */
    tagName: string;
    /**
     * Renders the view again. This will work regardless of whether the
     * view is already in the DOM or not. If the view is in the DOM, the
     * rendering process will be deferred to give bindings a chance
     * to synchronize.
     */
    rerender(): void;
    /**
     * Called when a view is going to insert an element into the DOM.
     */
    willInsertElement(): void;
    /**
     * Called when the element of the view has been inserted into the DOM.
     * Override this function to do any set up that requires an element
     * in the document body.
     */
    didInsertElement(): void;
    /**
     * Called when the view is about to rerender, but before anything has
     * been torn down. This is a good opportunity to tear down any manual
     * observers you have installed based on the DOM state
     */
    willClearRender(): void;
    /**
     * Called when the element of the view is going to be destroyed. Override
     * this function to do any teardown that requires an element, like removing
     * event listeners.
     */
    willDestroyElement(): void;
}
const ViewMixin: Ember.Mixin<ViewMixin>;

/**
Ember.CoreView is an abstract class that exists to give view-like behavior to both Ember's main
view class Ember.Component and other classes that don't need the full functionality of Ember.Component.

Unless you have specific needs for CoreView, you will use Ember.Component in your applications.
**/
class CoreView extends Ember.Object.extend(Ember.Evented, Ember.ActionHandler) {}
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
        customEvents: EventDispatcherEvents;
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
     * The `EngineInstance` encapsulates all of the stateful aspects of a
     * running `Engine`.
     */
    class EngineInstance extends Ember.Object.extend(_RegistryProxyMixin, _ContainerProxyMixin) {
        /**
         * Unregister a factory.
         */
        unregister(fullName: string): any;
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
    const Error: ErrorConstructor;
    /**
     * `Ember.EventDispatcher` handles delegating browser events to their
     * corresponding `Ember.Views.` For example, when you click on a view,
     * `Ember.EventDispatcher` ensures that that view's `mouseDown` method gets
     * called.
     * @private
     */
    class EventDispatcher extends Object {
        /**
         * The set of events names (and associated handler function names) to be setup
         * and dispatched by the `EventDispatcher`. Modifications to this list can be done
         * at setup time, generally via the `Ember.Application.customEvents` hash.
         */
        events: EventDispatcherEvents;
    }
    /**
     * This mixin allows for Ember objects to subscribe to and emit events.
     */
    interface Evented {
        /**
         * Subscribes to a named event with given function.
         */
        on(name: string, target: {}, method: Function): void;
        /**
         * Subscribes a function to a named event and then cancels the subscription
         * after the first time the event is triggered. It is good to use ``one`` when
         * you only care about the first time an event has taken place.
         */
        one(name: string, target: {}, method: Function): void;
        /**
         * Triggers a named event for the object. Any additional arguments
         * will be passed as parameters to the functions that are subscribed to the
         * event.
         */
        trigger(name: string, ...args: any[]): any;
        /**
         * Cancels subscription for given name, target, and method.
         */
        off(name: string, target: {}, method: Function): void;
        /**
         * Checks to see if object has any subscriptions for named event.
         */
        has(name: string): boolean;
    }
    const Evented: Mixin<Evented>;
    const FROZEN_ERROR: string;

    /**
     * The `Ember.Freezable` mixin implements some basic methods for marking an
     * object as frozen. Once an object is frozen it should be read only. No changes
     * may be made the internal state of the object.
     * @private
     * @deprecated Use `Object.freeze` instead.
     */
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
    /**
     * `Ember.HashLocation` implements the location API using the browser's
     * hash. At present, it relies on a `hashchange` event existing in the
     * browser.
     * @protected
     */
    class HashLocation extends Object {
    }
    /**
     * Ember.HistoryLocation implements the location API using the browser's
     * history.pushState API.
     * @protected
     */
    class HistoryLocation extends Object {
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
    /**
     * Ember Helpers are functions that can compute values, and are used in templates.
     * For example, this code calls a helper named `format-currency`:
     */
    class Helper extends Object {
        /**
         * In many cases, the ceremony of a full `Ember.Helper` class is not required.
         * The `helper` method create pure-function helpers without instances. For
         * example:
         */
        static helper(helper: (params: any[], hash?: object) => any): Helper;
        /**
         * Override this function when writing a class-based helper.
         */
        compute(params: any[], hash: object): any;
        /**
         * On a class-based helper, it may be useful to force a recomputation of that
         * helpers value. This is akin to `rerender` on a component.
         */
        recompute(): any;
    }
    /**
     * The purpose of the Ember Instrumentation module is
     * to provide efficient, general-purpose instrumentation
     * for Ember.
     * @private
     */
    const Instrumentation: {
        instrument(name: string, payload: any, callback: Function, binding: any): void;
        reset(): void;
        subscribe(pattern: string, object: any): void;
        unsubscribe(subscriber: any): void;
    };
    /**
     * @deprecated https://emberjs.com/deprecations/v2.x/#toc_code-ember-k-code
     */
    const K: () => any;
    /**
     * `Ember.LinkComponent` renders an element whose `click` event triggers a
     * transition of the application's instance of `Ember.Router` to
     * a supplied route by name.
     */
    class LinkComponent extends Component {
        /**
         * Used to determine when this `LinkComponent` is active.
         */
        currentWhen: any;
        /**
         * Sets the `title` attribute of the `LinkComponent`'s HTML element.
         */
        title: string | null;
        /**
         * Sets the `rel` attribute of the `LinkComponent`'s HTML element.
         */
        rel: string | null;
        /**
         * Sets the `tabindex` attribute of the `LinkComponent`'s HTML element.
         */
        tabindex: string | null;
        /**
         * Sets the `target` attribute of the `LinkComponent`'s HTML element.
         */
        target: string | null;
        /**
         * The CSS class to apply to `LinkComponent`'s element when its `active`
         * property is `true`.
         */
        activeClass: string;
        /**
         * Determines whether the `LinkComponent` will trigger routing via
         * the `replaceWith` routing strategy.
         */
        replace: boolean;
    }
    const LOG_BINDINGS: boolean;
    const LOG_STACKTRACE_ON_DEPRECATION: boolean;
    const LOG_VERSION: boolean;
    /**
     * Ember.Location returns an instance of the correct implementation of
     * the `location` API.
     */
    const Location: {
        /**
         * This is deprecated in favor of using the container to lookup the location
         * implementation as desired.
         * @deprecated Use the container to lookup the location implementation that you need.
         */
        create(options?: {}): any;
    };
    /**
     * Inside Ember-Metal, simply uses the methods from `imports.console`.
     * Override this to provide more robust logging functionality.
     */
    const Logger: {
        /**
         * If the value passed into `Ember.Logger.assert` is not truthy it will throw an error with a stack trace.
         */
        assert(test: boolean, message?: string): void;
        /**
         * Logs the arguments to the console in blue text.
         */
        debug(...args: any[]): void;
        /**
         * Prints the arguments to the console with an error icon, red text and a stack trace.
         */
        error(...args: any[]): void;
        /**
         * Logs the arguments to the console.
         */
        info(...args: any[]): void;
        /**
         * Logs the arguments to the console.
         */
        log(...args: any[]): void;
        /**
         * Prints the arguments to the console with a warning icon.
         */
        warn(...args: any[]): void;
    };
    /**
     * A Map stores values indexed by keys. Unlike JavaScript's
     * default Objects, the keys of a Map can be any JavaScript
     * object.
     * @deprecated
     */
    class Map {
        copy(): Map;
        static create(): Map;
        forEach(callback: Function, self: any): void;
        get(key: any): any;
        has(key: any): boolean;
        set(key: any, value: any): void;
        length: number;
    }
    /**
     * @deprecated
     */
    class MapWithDefault extends Map {
        copy(): MapWithDefault;
        static create(): MapWithDefault;
    }
    /**
     * The `Ember.Mixin` class allows you to create mixins, whose properties can be
     * added to other classes.
     */
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
    /**
     * A Namespace is an object usually used to contain other objects or methods
     * such as an application or framework. Create a namespace anytime you want
     * to define one of these new containers.
     */
    class Namespace extends Object {
    }
    /**
     * The NativeArray mixin contains the properties needed to make the native
     * Array support Ember.MutableArray and all of its dependent APIs. Unless you
     * have `EmberENV.EXTEND_PROTOTYPES` or `EmberENV.EXTEND_PROTOTYPES.Array` set to
     * false, this will be applied automatically. Otherwise you can apply the mixin
     * at anytime by calling `Ember.NativeArray.apply(Array.prototype)`.
     */
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
    /**
     * Ember.NoneLocation does not interact with the browser. It is useful for
     * testing, or when you need to manage state with your Router, but temporarily
     * don't want it to muck with the URL (for example when you embed your
     * application in a larger page).
     * @private
     */
    class NoneLocation extends Object {
    }
    const ORDER_DEFINITION: string[];
    /**
     * `Ember.Object` is the main base class for all Ember objects. It is a subclass
     * of `Ember.CoreObject` with the `Ember.Observable` mixin applied. For details,
     * see the documentation for each of these.
     */
    class Object extends CoreObject.extend(Observable) {
    }
    /**
     * `Ember.ObjectProxy` forwards all properties not defined by the proxy itself
     * to a proxied `content` object.
     */
    class ObjectProxy extends Object {
        /**
        The object whose properties will be forwarded.
        **/
        content: Object;
    }
    /**
     * This mixin provides properties and property observing functionality, core features of the Ember object model.
     */
    interface Observable {
        /**
         * Retrieves the value of a property from the object.
         */
        get<T, K extends keyof T>(this: ComputedProperties<T>, key: K): T[K];
        /**
         * To get the values of multiple properties at once, call `getProperties`
         * with a list of strings or an array:
         */
        getProperties<T, K extends keyof T>(this: ComputedProperties<T>, list: K[]): Pick<T, K>;
        getProperties<T, K extends keyof T>(this: ComputedProperties<T>, ...list: K[]): Pick<T, K>;
        /**
         * Sets the provided key or path to the value.
         */
        set<T, K extends keyof T>(this: ComputedProperties<T>, key: K, value: T[K]): T[K];
        /**
         * Sets a list of properties at once. These properties are set inside
         * a single `beginPropertyChanges` and `endPropertyChanges` batch, so
         * observers will be buffered.
         */
        setProperties<T, K extends keyof T>(this: ComputedProperties<T>, hash: Pick<T, K>): Pick<T, K>;
        /**
         * Convenience method to call `propertyWillChange` and `propertyDidChange` in
         * succession.
         */
        notifyPropertyChange(keyName: string): this;
        /**
         * Adds an observer on a property.
         */
        addObserver<Target>(key: keyof this, target: Target, method: ObserverMethod<Target, this>): void;
        /**
         * Remove an observer you have previously registered on this object. Pass
         * the same key, target, and method you passed to `addObserver()` and your
         * target will no longer receive notifications.
         */
        removeObserver<Target>(key: keyof this, target: Target, method: ObserverMethod<Target, this>): any;
        /**
         * Retrieves the value of a property, or a default value in the case that the
         * property returns `undefined`.
         */
        getWithDefault<T, K extends keyof T>(this: ComputedProperties<T>, key: K, defaultValue: T[K]): T[K];
        /**
         * Set the value of a property to the current value plus some amount.
         */
        incrementProperty(keyName: keyof this, increment?: number): number;
        /**
         * Set the value of a property to the current value minus some amount.
         */
        decrementProperty(keyName: keyof this, decrement?: number): number;
        /**
         * Set the value of a boolean property to the opposite of its
         * current value.
         */
        toggleProperty(keyName: keyof this): boolean;
        /**
         * Returns the cached value of a computed property, if it exists.
         * This allows you to inspect the value of a computed property
         * without accidentally invoking it if it is intended to be
         * generated lazily.
         */
        cacheFor<T, K extends keyof T>(this: ComputedProperties<T>, key: K): T[K] | undefined;
    }
    const Observable: Mixin<Observable, Ember.CoreObject>;
    /**
     * This class is used internally by Ember and Ember Data.
     * Please do not use it at this time. We plan to clean it up
     * and add many tests soon.
     * @deprecated
     */
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
    /**
     * A registry used to store factory and option information keyed
     * by type.
     * @private
     */
    class Registry {
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
    /**
     * The `Ember.Router` class manages the application state and URLs. Refer to
     * the [routing guide](http://emberjs.com/guides/routing/) for documentation.
     */
    class Router extends Object.extend(Evented) {
        /**
         * The `Router.map` function allows you to define mappings from URLs to routes
         * in your application. These mappings are defined within the
         * supplied callback function using `this.route`.
         */
        static map(callback: (this: RouterDSL) => void): void;
        /**
         * The `location` property determines the type of URL's that your
         * application will use.
         */
        location: string;
        /**
         * Represents the URL of the root of the application, often '/'. This prefix is
         * assumed on all routes defined on this router.
         */
        rootURL: string;
        /**
         * Handles updating the paths and notifying any listeners of the URL
         * change.
         */
        didTransition(): any;
        /**
         * Handles notifying any listeners of an impending URL
         * change.
         */
        willTransition(): any;
        /**
         * Transition the application into another route. The route may
         * be either a single route or route path:
         */
        transitionTo(name: string, ...models: any[]): Transition;
        transitionTo(name: string, options: {}): Transition;
    }
    class RouterDSL {
        constructor(name: string, options: object);
        route(name: string, callback: (this: RouterDSL) => void): void;
        route(name: string, options?: { path?: string, resetNamespace?: boolean }, callback?: (this: RouterDSL) => void): void;
        mount(name: string): void;
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
    /**
     * The internal class used to create textarea element when the `{{textarea}}`
     * helper is used.
     */
    class TextArea extends Component.extend(TextSupport) {
    }
    /**
     * The internal class used to create text inputs when the `{{input}}`
     * helper is used with `type` of `text`.
     */
    class TextField extends Component.extend(TextSupport) {
        /**
         * The `value` attribute of the input element. As the user inputs text, this
         * property is updated live.
         */
        value: string;
        /**
         * The `type` attribute of the input element.
         */
        type: string;
        /**
         * The `size` of the text field in characters.
         */
        size: string;
        /**
         * The `pattern` attribute of input element.
         */
        pattern: string;
        /**
         * The `min` attribute of input element used with `type="number"` or `type="range"`.
         */
        min: string;
        /**
         * The `max` attribute of input element used with `type="number"` or `type="range"`.
         */
        max: string;
    }
    /**
     * `TextSupport` is a shared mixin used by both `Ember.TextField` and
     * `Ember.TextArea`. `TextSupport` adds a number of methods that allow you to
     * specify a controller action to invoke when a certain event is fired on your
     * text field or textarea. The specifed controller action would get the current
     * value of the field passed in as the only argument unless the value of
     * the field is empty. In that case, the instance of the field itself is passed
     * in as the only argument.
     */
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
    interface Transition {
        /**
         Aborts the Transition. Note you can also implicitly abort a transition
         by initiating another transition while a previous one is underway.
        */
        abort(): Transition;
        /**
         Retries a previously-aborted transition (making sure to abort the
         transition if it's still active). Returns a new transition that
         represents the new attempt to transition.
        */
        retry(): Transition;
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

    function addObserver<Context, Target>(obj: Context, key: keyof Context, target: Target, method: ObserverMethod<Target, Context>): void;
    function aliasMethod(methodName: string): ComputedProperty<any>;
    function assert(desc: string, test: boolean): void;
    function beginPropertyChanges(): void;

    /**
     * @deprecated https://emberjs.com/deprecations/v2.x#toc_ember-binding
     */
    function bind(obj: any, to: string, from: string): Binding;
    function canInvoke(obj: any, methodName: string): boolean;
    function changeProperties(callback: Function, binding?: any): void;
    function compare(v: any, w: any): number;
    type compareFunc = (itemA: any, itemB: any) => number;
    interface DeprecateOptions {
        id: string;
        until: string;
    }

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
    function getWithDefault<T, K extends keyof T>(obj: ComputedProperties<T>, key: K, defaultValue: T[K]): T[K];
    function cacheFor<T, K extends keyof T>(obj: ComputedProperties<T>, key: K): T[K] | undefined;

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
    function removeObserver<Context, Target>(obj: Context, key: keyof Context, target: Target, method: ObserverMethod<Target, Context>): any;

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
    const uuid: number;
    function valueOf(): {};
    function warn(message: string, test?: boolean): void;
    function watch(obj: any, keyPath: string): void;
    function watchKey(obj: any, keyName: string): void;
    function watchPath(obj: any, keyPath: string): void;
    function watchedEvents(obj: {}): any[];
    function wrap(func: Function, superFunc: Function): Function;
    /**
     * Given a fullName return a factory manager.
     */
    interface _ContainerProxyMixin {
        /**
         * Returns an object that can be used to provide an owner to a
         * manually created instance.
         */
        ownerInjection(): {};
        /**
         * Given a fullName return a corresponding instance.
         */
        lookup(fullName: string, options: {}): any;
    }
    const _ContainerProxyMixin: Mixin<_ContainerProxyMixin>;

    /**
     * RegistryProxyMixin is used to provide public access to specific
     * registry functionality.
     */
    interface _RegistryProxyMixin {
        /**
         * Given a fullName return the corresponding factory.
         */
        resolveRegistration(fullName: string): Function;
        /**
         * Registers a factory that can be used for dependency injection (with
         * `inject`) or for service lookup. Each factory is registered with
         * a full name including two parts: `type:name`.
         */
        register(fullName: string, factory: Function, options: {}): any;
        /**
         * Unregister a factory.
         */
        unregister(fullName: string): any;
        /**
         * Check if a factory is registered.
         */
        hasRegistration(fullName: string): boolean;
        /**
         * Register an option for a particular factory.
         */
        registerOption(fullName: string, optionName: string, options: {}): any;
        /**
         * Return a specific registered option for a particular factory.
         */
        registeredOption(fullName: string, optionName: string): {};
        /**
         * Register options for a particular factory.
         */
        registerOptions(fullName: string, options: {}): any;
        /**
         * Return registered options for a particular factory.
         */
        registeredOptions(fullName: string): {};
        /**
         * Allow registering options for all factories of a type.
         */
        registerOptionsForType(type: string, options: {}): any;
        /**
         * Return the registered options for all factories of a type.
         */
        registeredOptionsForType(type: string): {};
        /**
         * Define a dependency injection onto a specific factory or all factories
         * of a type.
         */
        inject(factoryNameOrType: string, property: string, injectionName: string): any;
    }
    const _RegistryProxyMixin: Mixin<_RegistryProxyMixin>;
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
