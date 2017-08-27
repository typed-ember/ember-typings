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

interface Function {
    observes(...args: string[]): Function;
    on(...args: string[]): Function;
    property(...args: string[]): Function;
}

interface String {
    camelize(): string;
    capitalize(): string;
    classify(): string;
    dasherize(): string;
    decamelize(): string;
    fmt(...args: string[]): string;
    htmlSafe(): typeof Handlebars.SafeString;
    loc(...args: string[]): string;
    underscore(): string;
    w(): string[];
}

type EmberClassArguments<T> = Partial<T> & {
    [key: string]: any
};

type EmberMixin<T> = Ember.Mixin<T> | T;

interface EmberClassConstructor<T> {
    new (...args: any[]): T;
    prototype: T;

    create<Instance, Extensions extends EmberClassArguments<T>>(
        this: EmberClassConstructor<Instance>,
        args?: Extensions & ThisType<Extensions & Instance>): Extensions & Instance;

    createWithMixins<Instance, M1, Extensions extends EmberClassArguments<T>>(
        this: EmberClassConstructor<Instance>,
        mixin1: EmberMixin<M1>,
        args?: Extensions & ThisType<Extensions & Instance & M1>): Extensions & Instance & M1;
}

interface EmberClass<T> extends EmberClassConstructor<T> {
    extend<Statics, Instance, Extensions extends EmberClassArguments<T>>(
        this: EmberClass<Instance> & Statics,
        args?: Extensions & ThisType<Extensions & Instance>): EmberClass<Extensions & Instance>;

    extend<Statics, Instance, M1, Extensions extends EmberClassArguments<T>>(
        this: EmberClass<Instance> & Statics,
        mixin1: EmberMixin<M1>,
        args?: Extensions & ThisType<Extensions & Instance & M1>): EmberClass<Extensions & Instance & M1>;

    extend<Statics, Instance, M1, M2, Extensions extends EmberClassArguments<T>>(
        this: EmberClass<Instance> & Statics,
        mixin1: EmberMixin<M1>, mixin2: EmberMixin<M2>,
        args?: Extensions & ThisType<Extensions & Instance & M1 & M2>): EmberClass<Extensions & Instance & M1 & M2>;

    extend<Statics, Instance, M1, M2, M3, Extensions extends EmberClassArguments<T>>(
        this: EmberClass<Instance> & Statics,
        mixin1: EmberMixin<M1>, mixin2: EmberMixin<M2>, mixin3: EmberMixin<M3>,
        args?: Extensions & ThisType<Extensions & Instance & M1 & M2 & M3>): EmberClass<Extensions & Instance & M1 & M2 & M3>;

    reopen<Extra>(args?: Extra & ThisType<T & Extra>): EmberClass<T & Extra>;

    reopenClass<Extra>(args?: Extra): EmberClass<T> & Extra;

    // TODO: remove private API?

    detect(obj: any): obj is EmberClass<T>;
    detectInstance(obj: any): obj is T;
    /**
     Iterate over each computed property for the class, passing its name and any
     associated metadata (see metaForProperty) to the callback.
     **/
    eachComputedProperty(callback: Function, binding: {}): void;
    /**
     Returns the original hash that was passed to meta().
     @param key property name
     **/
    metaForProperty(key: string): {};
    isClass: boolean;
    isMethod: boolean;
}

interface EnumerableConfigurationOptions {
    willChange?: boolean;
    didChange?: boolean;
}

type ItemIndexEnumerableCallback = (item: any, index: number, enumerable: Ember.Enumerable) => void;

type ReduceCallback = (
    previousValue: any,
    item: any,
    index: number,
    enumerable: Ember.Enumerable
) => void;

interface TransitionsHash {
    contexts: any[];
    exitStates: Ember.State[];
    enterStates: Ember.State[];
    resolveState: Ember.State;
}

interface ActionsHash {
    [index: string]: (...params: any[]) => any;
}

interface DisconnectOutletOptions {
    outlet?: string;
    parentView?: string;
}

interface RenderOptions {
    into?: string;
    controller?: string;
    model?: any;
    outlet?: string;
    view?: string;
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

interface ActionSupport {
    sendAction(action: string, ...params: any[]): void;
}

interface ClassNamesSupport {
    classNameBindings: string[];
    classNames: string[];
}
/**
Ember.CoreView is an abstract class that exists to give view-like behavior to both Ember's main
view class Ember.Component and other classes that don't need the full functionality of Ember.Component.

Unless you have specific needs for CoreView, you will use Ember.Component in your applications.
**/
interface CoreView extends Ember.Object, Ember.Evented, ActionHandler {}
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
/**
Ember.TargetActionSupport is a mixin that can be included in a class to add a triggerAction method
with semantics similar to the Handlebars {{action}} helper. In normal Ember usage, the {{action}}
helper is usually the best choice. This mixin is most often useful when you are doing more
complex event handling in Components.
**/
interface TargetActionSupport extends Ember.Mixin {}

/**
Additional methods for the Controller.
**/
interface ControllerMixin extends ActionHandler {
    replaceRoute(name: string, ...args: any[]): void;
    transitionToRoute(name: string, ...args: any[]): void;
    model: any;
    queryParams: any;
    target: any;
}

namespace Ember {
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
    function A(arr?: any[]): any[];
    /**
    An instance of Ember.Application is the starting point for every Ember application. It helps to
    instantiate, initialize and coordinate the many objects that make up your app.
    **/
    interface Application extends Namespace {
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
    const Application: EmberClass<Application>;
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
    interface Array extends Enumerable {
        addArrayObserver(target: any, opts?: EnumerableConfigurationOptions): any[];
        arrayContentDidChange(startIdx: number, removeAmt: number, addAmt: number): any[];
        arrayContentWillChange(startIdx: number, removeAmt: number, addAmt: number): any[];
        indexOf(object: any, startAt: number): number;
        lastIndexOf(object: any, startAt: number): number;
        objectAt(idx: number): any;
        objectsAt(...args: number[]): any[];
        removeArrayObserver(target: any, opts: EnumerableConfigurationOptions): any[];
        slice(beginIndex?: number, endIndex?: number): any[];
        '@each': EachProxy;
        length: number;
    }
    const Array: Mixin<Array>;
    /**
    An ArrayProxy wraps any other object that implements Ember.Array and/or Ember.MutableArray,
    forwarding all requests. This makes it very useful for a number of binding use cases or other cases
    where being able to swap out the underlying array is useful.
    **/
    interface ArrayProxy extends Object, MutableArray {
        content: NativeArray;
        objectAtContent(idx: number): any;
        replaceContent(idx: number, amt: number, objects: any[]): void;
    }
    const ArrayProxy: EmberClass<ArrayProxy>;
    /**
    AutoLocation will select the best location option based off browser support with the priority order: history, hash, none.
    **/
    class AutoLocation extends Object {
    }
    const BOOTED: boolean;
    /**
    Connects the properties of two objects so that whenever the value of one property changes,
    the other property will be changed also.
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
    interface Button extends Component, TargetActionSupport {
        triggerAction(opts: {}): boolean;
    }
    const Button: EmberClass<Button>;
    /**
    The internal class used to create text inputs when the {{input}} helper is used
    with type of checkbox. See Handlebars.helpers.input for usage details.
    **/
    interface Checkbox extends Component {
    }
    const Checkbox: EmberClass<Checkbox>;
    /**
    Implements some standard methods for comparing objects. Add this mixin to any class
    you create that can compare its instances.
    **/
    class Comparable {
        compare(a: any, b: any): number;
    }
    /**
    A view that is completely isolated. Property access in its templates go to the view object
    and actions are targeted at the view object. There is no access to the surrounding context or
    outer controller; all contextual information is passed in.
    **/
    interface Component extends CoreView, ViewMixin, ActionSupport, ClassNamesSupport {
        // methods
        readDOMAttr(name: string): string;
        // properties
        /**
        The WAI-ARIA role of the control represented by this view. For example, a button may have a
        role of type 'button', or a pane may have a role of type 'alertdialog'. This property is
        used by assistive software to help visually challenged users navigate rich web applications.
        **/
        ariaRole: string;
        /**
        The HTML id of the component's element in the DOM. You can provide this value yourself but
        it must be unique (just as in HTML):

        If not manually set a default value will be provided by the framework. Once rendered an
        element's elementId is considered immutable and you should never change it. If you need
        to compute a dynamic value for the elementId, you should do this when the component or
        element is being instantiated:
        **/
        elementId: string;
        /**
        If false, the view will appear hidden in DOM.
         */
        isVisible: boolean;
        /**
        A component may contain a layout. A layout is a regular template but supersedes the template
        property during rendering. It is the responsibility of the layout template to retrieve the
        template property from the component (or alternatively, call Handlebars.helpers.yield,
        {{yield}}) to render it in the correct location. This is useful for a component that has a
        shared wrapper, but which delegates the rendering of the contents of the wrapper to the
        template property on a subclass.
        **/
        layout: string; // @todo: https://github.com/emberjs/ember.js/blob/v2.14.1/packages/ember-glimmer/lib/component.js#L811
        /**
        Enables components to take a list of parameters as arguments.
        **/
        positionalParams: string[] | string;
        // events
        /**
        Called when the attributes passed into the component have been updated. Called both during the
        initial render of a container and during a rerender. Can be used in place of an observer; code
        placed here will be executed every time any attribute updates.
        **/
        didReceiveAttrs(): void;
        /**
        Called after a component has been rendered, both on initial render and in subsequent rerenders.
        **/
        didRender(): void;
        /**
        Called when the component has updated and rerendered itself. Called only during a rerender,
        not during an initial render.
        **/
        didUpdate(): void;
        /**
        Called when the attributes passed into the component have been changed. Called only during a
        rerender, not during an initial render.
        **/
        didUpdateAttrs(): void;
        /**
        Called before a component has been rendered, both on initial render and in subsequent rerenders.
        **/
        willRender(): void;
        /**
        Called when the component is about to update and rerender itself. Called only during a rerender,
        not during an initial render.
        **/
        willUpdate(): void;
    }
    const Component: EmberClass<Component>;
    /**
    A computed property transforms an objects function into a property.
    By default the function backing the computed property will only be called once and the result
    will be cached. You can specify various properties that your computed property is dependent on.
    This will force the cached result to be recomputed if the dependencies are modified.
    **/
    class ComputedProperty {
        get(keyName: string): any;
        meta(meta: {}): ComputedProperty;
        property(...args: string[]): ComputedProperty;
        readOnly(): ComputedProperty;
        set(keyName: string, newValue: any, oldValue: string): any;
        // ReSharper disable UsingOfReservedWord
        volatile(): ComputedProperty;
        // ReSharper restore UsingOfReservedWord
    }
    class Container {
        constructor(parent: Container);
        parent: Container;
        children: any[];
        owner: any;
        ownerInjection(): any;
        resolver: Function;
        registry: Registry;
        cache: {};
        typeInjections: {};
        injections: {};
        child(): Container;
        set(object: {}, key: string, value: any): void;
        /**
        registers a factory for later injection
        @param fullName type:name (e.g., 'model:user')
        @param factory (e.g., App.Person)
        **/
        describe(fullName: string): string;
        makeToString(factory: any, fullName: string): Function;
        lookup(fullName: string, options?: {}): any;
        lookupFactory(fullName: string, options?: {}): any;
        destroy(): void;
        reset(): void;
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

    interface Controller extends Object, ControllerMixin {
        replaceRoute(name: string, ...args: any[]): void;
        transitionToRoute(name: string, ...args: any[]): void;
        controllers: {};
        model: any;
        needs: string[];
        queryParams: any;
        target: any;
        send(name: string, ...args: any[]): void;
        actions: ActionsHash;
    }
    const Controller: EmberClass<Controller>;
    /**
    Implements some standard methods for copying an object. Add this mixin to any object you
    create that can create a copy of itself. This mixin is added automatically to the built-in array.
    You should generally implement the copy() method to return a copy of the receiver.
    Note that frozenCopy() will only work if you also implement Ember.Freezable.
    **/
    class Copyable {
        copy(deep: boolean): Copyable;
        frozenCopy(): Copyable;
    }
    interface CoreObject {
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
    }
    const CoreObject: EmberClass<CoreObject>;
    class DAG {
        add(name: string): any;
        map(name: string, value: any): void;
        addEdge(fromName: string, toName: string): void;
        topsort(fn: Function): void;
        addEdges(name: string, value: any, before: any, after: any): void;
        names: any[];
        vertices: {};
    }
    /**
    The DataAdapter helps a data persistence library interface with tools
     that debug Ember such as the Ember Extension for Chrome and Firefox.
    */
    class DataAdapter extends Object {
        acceptsModelName: any;
        containerDebugAdapter: ContainerDebugAdapter;
        getFilters(): any[];
        watchModelTypes(typesAdded: any, typesUpdated: any): Function;
        watchRecords(modelName: any, recordsAdded: any, recordsUpdated: any, recordsRemoved: any): Function;
    }
    const Debug: {
        registerDeprecationHandler(handler: Function): void;
        registerWarnHandler(handler: Function): void;
    };
    function DEFAULT_GETTER_FUNCTION(name: string): Function;
    /**
    The DefaultResolver defines the default lookup rules to resolve container lookups before consulting
    the container for registered items:
    templates are looked up on Ember.TEMPLATES
    other names are looked up on the application after converting the name.
    For example, controller:post looks up App.PostController by default.
    **/
    class DefaultResolver {
        resolve(fullName: string): {};
        namespace: Application;
    }
    /**
    Objects of this type can implement an interface to respond to requests to get and set.
    The default implementation handles simple properties.
    You generally won't need to create or subclass this directly.
    **/
    class Descriptor {}
    namespace ENV {
        const EXTEND_PROTOTYPES: typeof ExtendPrototypes;
        const LOG_BINDINGS: boolean;
        const LOG_STACKTRACE_ON_DEPRECATION: boolean;
        const LOG_VERSION: boolean;
        const MODEL_FACTORY_INJECTIONS: boolean;
        const RAISE_ON_DEPRECATION: boolean;
    }
    namespace ExtendPrototypes {
        const Array: boolean;
        const Function: boolean;
        const String: boolean;
    }
    /**
    This is the object instance returned when you get the @each property on an array. It uses
    the unknownProperty handler to automatically create EachArray instances for property names.
    **/
    class EachProxy extends Object {
        unknownProperty(keyName: string, value: any): any[];
    }
    /**
    The Engine class contains core functionality for both applications and engines.
    **/
    class Engine extends Namespace {
      resolver: Resolver;
      initializer(initializer: Object): any;
      instanceInitializer(instanceInitializer: Object): any;
    }
    /**
     The `EngineInstance` encapsulates all of the stateful aspects of a
     running `Engine`.
     **/
    class EngineInstance extends Object {
      unregister(fullName: string): void;
    }
    /**
    This mixin defines the common interface implemented by enumerable objects in Ember. Most of these
    methods follow the standard Array iteration API defined up to JavaScript 1.8 (excluding language-specific
    features that cannot be emulated in older versions of JavaScript).
    This mixin is applied automatically to the Array class on page load, so you can use any of these methods
    on simple arrays. If Array already implements one of these methods, the mixin will not override them.
    **/
    interface Enumerable {
        addEnumerableObserver(target: any, opts: EnumerableConfigurationOptions): Enumerable;
        any(callback: ItemIndexEnumerableCallback, target?: any): boolean;
        anyBy(key: string, value?: string): boolean;
        isAny(key: string, value?: boolean): boolean;
        someProperty(key: string, value?: string): boolean;
        compact(): any[];
        contains(obj: any): boolean;
        enumerableContentDidChange(
            start: number,
            removing: Enumerable | number,
            adding: Enumerable | number
        ): any;
        enumerableContentDidChange(removing: Enumerable | number, adding: Enumerable | number): any;
        enumerableContentWillChange(
            removing: Enumerable | number,
            adding: Enumerable | number
        ): Enumerable;
        every(callback: ItemIndexEnumerableCallback, target?: any): boolean;
        isEvery(key: string, value?: boolean): boolean;
        everyBy(key: string, value?: string): boolean;
        everyProperty(key: string, value?: string): boolean;
        filter(callback: ItemIndexEnumerableCallback, target: any): any[];
        filterBy(key: string, value?: string): any[];
        find(callback: ItemIndexEnumerableCallback, target: any): any;
        findBy(key: string, value?: string): any;
        forEach(callback: ItemIndexEnumerableCallback, target?: any): any;
        getEach(key: string): any[];
        invoke(methodName: string, ...args: any[]): any[];
        map(callback: ItemIndexEnumerableCallback, target?: any): any[];
        mapBy(key: string): any[];
        nextObject(index: number, previousObject: any, context: any): any;
        reduce(callback: ReduceCallback, initialValue: any, reducerProperty: string): any;
        reject(callback: ItemIndexEnumerableCallback, target?: any): any[];
        rejectBy(key: string, value?: string): any[];
        removeEnumerableObserver(target: any, opts: EnumerableConfigurationOptions): Enumerable;
        setEach(key: string, value?: any): any;
        some(callback: ItemIndexEnumerableCallback, target?: any): boolean;
        toArray(): any[];
        uniq(): Enumerable;
        without(value: any): Enumerable;
        '[]': any[];
        firstObject: any;
        hasEnumerableObservers: boolean;
        lastObject: any;
    }
    const Enumerable: Mixin<Enumerable>;
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
    class Evented {
        has(name: string): boolean;
        off(name: string, target: any, method: Function): Evented;
        on(name: string, target: any, method: Function): Evented;
        one(name: string, target: any, method: Function): Evented;
        trigger(name: string, ...args: string[]): void;
    }
    const FROZEN_ERROR: string;
    class Freezable {
        freeze(): Freezable;
        isFrozen: boolean;
    }
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
        const logger: typeof Logger;
        function log(level: string, str: string): void;
    }
    class HashLocation extends Object {
    }
    class HistoryLocation extends Object {
        rootURL: string;
    }
    const IS_BINDING: RegExp;
    const inject: {
        controller(name?: string): Controller;
        service(name?: string): Service;
    };
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
    class Mixin<T = {}> {
        static create<T>(args?: T): Mixin<T>;
    }
    interface MutableArray extends Array, MutableEnumberable {
        clear(): any[];
        insertAt(idx: number, object: any): any[];
        popObject(): any;
        pushObject(obj: any): any;
        pushObjects(...args: any[]): any[];
        removeAt(start: number, len: number): any;
        replace(idx: number, amt: number, objects: any[]): any;
        reverseObjects(): any[];
        setObjects(objects: any[]): any[];
        shiftObject(): any;
        unshiftObject(object: any): any;
        unshiftObjects(objects: any[]): any[];
    }
    const MutableArray: Mixin<MutableArray>;
    interface MutableEnumberable extends Enumerable {
        addObject(object: any): any;
        addObjects(objects: Enumerable): MutableEnumberable;
        removeObject(object: any): any;
        removeObjects(objects: Enumerable): MutableEnumberable;
    }
    const MutableEnumerable: Mixin<MutableEnumberable>;
    const NAME_KEY: string;
    interface Namespace extends Object {
    }
    const Namespace: EmberClass<Namespace>;
    interface NativeArray extends MutableArray, Observable, Copyable {
    }
    const NativeArray: Mixin<NativeArray>;
    class NoneLocation extends Object {
    }
    const ORDER_DEFINITION: string[];
    interface Object extends CoreObject, Observable {
    }
    const Object: EmberClass<Object>;
    interface ObjectProxy extends Object {
        /**
        The object whose properties will be forwarded.
        **/
        content: Object;
    }
    const ObjectProxy: EmberClass<ObjectProxy>;
    interface Observable {
        addObserver(obj: any, path: string | null, target: Function | any, method?: Function | string): void;
        beginPropertyChanges(): Observable;
        cacheFor(keyName: string): any;
        decrementProperty(keyName: string, decrement?: number): number;
        endPropertyChanges(): Observable;
        get<K extends keyof this>(key: K): this[K];
        getProperties<K extends keyof this>(list: K[]): Pick<this, K>;
        getProperties<K extends keyof this>(...list: K[]): Pick<this, K>;
        getWithDefault(keyName: string, defaultValue: any): any;
        hasObserverFor(key: string): boolean;
        incrementProperty(keyName: string, increment?: number): number;
        notifyPropertyChange(keyName: string): Observable;
        propertyDidChange(keyName: string): Observable;
        propertyWillChange(keyName: string): Observable;
        removeObserver(key: string, target: {}, method: Function | string): void;
        set<K extends keyof this>(key: K, value: this[K]): this[K];
        setProperties<K extends keyof this>(hash: Pick<this, K>): Pick<this, K>;
        /**
        Set the value of a boolean property to the opposite of its current value.
        */
        toggleProperty(keyName: string): boolean;
    }
    const Observable: Mixin<Observable>;
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
    A low level mixin making ObjectProxy promise-aware.
    */
    class PromiseProxyMixin {
      catch(callback: Function): Rsvp.Promise<any, any>;
      finally(callback: Function): Rsvp.Promise<any, any>;
      then(callback: Function): Rsvp.Promise<any, any>;
    }
    class Registry {
        constructor(options: any);
        static set: typeof Ember.set;
    }
    class Resolver {
    }

    // FYI - RSVP source comes from https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/promise.js
    const RSVP: typeof Rsvp;
    namespace RSVP {
        type Promise<T, C> = Rsvp.Promise<T, C>;
    }

    /**
      The `Ember.Route` class is used to define individual routes. Refer to
      the [routing guide](http://emberjs.com/guides/routing/) for documentation.
    */
    interface Route extends Object, ActionHandler, Evented {
        /**
        This hook is executed when the router enters the route. It is not executed
        when the model for the route changes.
        @method activate
        */
        activate: Function;

        /**
        This hook is called after this route's model has resolved.
        It follows identical async/promise semantics to `beforeModel`
        but is provided the route's resolved model in addition to
        the `transition`, and is therefore suited to performing
        logic that can only take place after the model has already
        resolved.

        Refer to documentation for `beforeModel` for a description
        of transition-pausing semantics when a promise is returned
        from this hook.
        @method afterModel
        @param {Object} resolvedModel the value returned from `model`,
            or its resolved value if it was a promise
        @param {Transition} transition
        @return {Promise} if the value returned from this hook is
            a promise, the transition will pause until the transition
            resolves. Otherwise, non-promise return values are not
            utilized in any way.
        */
        afterModel(resolvedModel: any, transition: Transition): Rsvp.Promise<any, any>;

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

        @method beforeModel
        @param {Transition} transition
        @return {Promise} if the value returned from this hook is
            a promise, the transition will pause until the transition
            resolves. Otherwise, non-promise return values are not
            utilized in any way.
        */
        beforeModel(transition: Transition): Rsvp.Promise<any, any>;

        /**
        The controller associated with this route.

        @property controller
        @type Ember.Controller
        @since 1.6.0
        */
        controller: Controller;

        /**
        Returns the controller for a particular route or name.
        The controller instance must already have been created, either through entering the
        associated route or using `generateController`.

        @method controllerFor
        @param {String} name the name of the route or controller
        @return {Ember.Controller}
        */
        controllerFor(name: string): Controller;

        /**
        The name of the controller to associate with this route.
        By default, Ember will lookup a route's controller that matches the name
        of the route (i.e. `App.PostController` for `App.PostRoute`). However,
        if you would like to define a specific controller to use, you can do so
        using this property.
        This is useful in many ways, as the controller specified will be:
        * passed to the `setupController` method.
        * used as the controller for the view being rendered by the route.
        * returned from a call to `controllerFor` for the route.
        @property controllerName
        @type String
        @default null
        @since 1.4.0
        */
        controllerName: string;

        /**
        This hook is executed when the router completely exits this route. It is
        not executed when the model for the route changes.
        @method deactivate
        */
        deactivate: Function;

        /**
        Deserializes value of the query parameter based on defaultValueType
        @method deserializeQueryParam
        @param {Object} value
        @param {String} urlKey
        @param {String} defaultValueType
        */
        deserializeQueryParam(value: any, urlKey: string, defaultValueType: string): any;

        /**
        Disconnects a view that has been rendered into an outlet.
        You may pass any or all of the following options to `disconnectOutlet`:
        * `outlet`: the name of the outlet to clear (default: 'main')
        * `parentView`: the name of the view containing the outlet to clear
            (default: the view rendered by the parent route)

        @method disconnectOutlet
        @param {Object|String} options the options hash or outlet name
        */
        disconnectOutlet(options: DisconnectOutletOptions | string): void;

        /**
        @method findModel
        @param {String} type the model type
        @param {Object} value the value passed to find
        */
        findModel(type: string, value: any): any;

        /**
        Generates a controller for a route.
        If the optional model is passed then the controller type is determined automatically,
        e.g., an ArrayController for arrays.

        @method generateController
        @param {String} name the name of the controller
        @param {Object} model the model to infer the type of the controller (optional)
        */
        generateController(name: string, model: {}): Controller;

        /**
        Perform a synchronous transition into another route without attempting
        to resolve promises, update the URL, or abort any currently active
        asynchronous transitions (i.e. regular transitions caused by
        `transitionTo` or URL changes).
        This method is handy for performing intermediate transitions on the
        way to a final destination route, and is called internally by the
        default implementations of the `error` and `loading` handlers.
        @method intermediateTransitionTo
        @param {String} name the name of the route
        @param {...Object} models the model(s) to be used while transitioning
        to the route.
        @since 1.2.0
        */
        intermediateTransitionTo(name: string, ...models: any[]): void;

        /**
        A hook you can implement to convert the URL into the model for
        this route.

        @method model
        @param {Object} params the parameters extracted from the URL
        @param {Transition} transition
        @return {Object|Promise} the model for this route. If
            a promise is returned, the transition will pause until
            the promise resolves, and the resolved value of the promise
            will be used as the model for this route.
        */
        model(params: {}, transition: Transition): any | Rsvp.Promise<any, any>;

        /**
        Returns the model of a parent (or any ancestor) route
        in a route hierarchy.  During a transition, all routes
        must resolve a model object, and if a route
        needs access to a parent route's model in order to
        resolve a model (or just reuse the model from a parent),
        it can call `this.modelFor(theNameOfParentRoute)` to
        retrieve it.

        @method modelFor
        @param {String} name the name of the route
        @return {Object} the model object
        */
        modelFor(name: string): {};

        /**
        Retrieves parameters, for current route using the state.params
        variable and getQueryParamsFor, using the supplied routeName.
        @method paramsFor
        @param {String} name
        */
        paramsFor(name: string): any;

        /**
        Configuration hash for this route's queryParams.
        @property queryParams
        @for Ember.Route
        @type Hash
        */
        queryParams: {};

        /**
        Refresh the model on this route and any child routes, firing the
        `beforeModel`, `model`, and `afterModel` hooks in a similar fashion
        to how routes are entered when transitioning in from other route.
        The current route params (e.g. `article_id`) will be passed in
        to the respective model hooks, and if a different model is returned,
        `setupController` and associated route hooks will re-fire as well.
        An example usage of this method is re-querying the server for the
        latest information using the same parameters as when the route
        was first entered.
        Note that this will cause `model` hooks to fire even on routes
        that were provided a model object when the route was initially
        entered.
        @method refresh
        @return {Transition} the transition object associated with this
            attempted transition
        @since 1.4.0
        */
        redirect(): Transition;

        /**
        Refresh the model on this route and any child routes, firing the
        `beforeModel`, `model`, and `afterModel` hooks in a similar fashion
        to how routes are entered when transitioning in from other route.
        The current route params (e.g. `article_id`) will be passed in
        to the respective model hooks, and if a different model is returned,
        `setupController` and associated route hooks will re-fire as well.
        An example usage of this method is re-querying the server for the
        latest information using the same parameters as when the route
        was first entered.
        Note that this will cause `model` hooks to fire even on routes
        that were provided a model object when the route was initially
        entered.
        @method refresh
        @return {Transition} the transition object associated with this
            attempted transition
        @since 1.4.0
        */
        refresh(): Transition;

        /**
        `render` is used to render a template into a region of another template
        (indicated by an `{{outlet}}`). `render` is used both during the entry
        phase of routing (via the `renderTemplate` hook) and later in response to
        user interaction.

        @method render
        @param {String} name the name of the template to render
        @param {Object} [options] the options
        @param {String} [options.into] the template to render into,
                        referenced by name. Defaults to the parent template
        @param {String} [options.outlet] the outlet inside `options.template` to render into.
                        Defaults to 'main'
        @param {String|Object} [options.controller] the controller to use for this template,
                        referenced by name or as a controller instance. Defaults to the Route's paired controller
        @param {Object} [options.model] the model object to set on `options.controller`.
                        Defaults to the return value of the Route's model hook
        */
        render(name: string, options?: RenderOptions): void;

        /**
        A hook you can use to render the template for the current route.
        This method is called with the controller for the current route and the
        model supplied by the `model` hook. By default, it renders the route's
        template, configured with the controller for the route.
        This method can be overridden to set up and render additional or
        alternative templates.

        @method renderTemplate
        @param {Object} controller the route's controller
        @param {Object} model the route's model
        */
        renderTemplate(controller: Controller, model: {}): void;

        /**
        Transition into another route while replacing the current URL, if possible.
        This will replace the current history entry instead of adding a new one.
        Beside that, it is identical to `transitionTo` in all other respects. See
        'transitionTo' for additional information regarding multiple models.

        @method replaceWith
        @param {String} name the name of the route or a URL
        @param {...Object} models the model(s) or identifier(s) to be used while
            transitioning to the route.
        @return {Transition} the transition object associated with this
            attempted transition
        */
        replaceWith(name: string, ...models: any[]): void;

        /**
        A hook you can use to reset controller values either when the model
        changes or the route is exiting.

        @method resetController
        @param {Controller} controller instance
        @param {Boolean} isExiting
        @param {Object} transition
        @since 1.7.0
        */
        resetController(controller: Controller, isExiting: boolean, transition: any): void;

        /**
        A hook you can implement to convert the route's model into parameters
        for the URL.

        The default `serialize` method will insert the model's `id` into the
        route's dynamic segment (in this case, `:post_id`) if the segment contains '_id'.
        If the route has multiple dynamic segments or does not contain '_id', `serialize`
        will return `Ember.getProperties(model, params)`
        This method is called when `transitionTo` is called with a context
        in order to populate the URL.
        @method serialize
        @param {Object} model the route's model
        @param {Array} params an Array of parameter names for the current
            route (in the example, `['post_id']`.
        @return {Object} the serialized parameters
        */
        serialize(model: {}, params: string[]): string;

        /**
        Serializes value of the query parameter based on defaultValueType
        @method serializeQueryParam
        @param {Object} value
        @param {String} urlKey
        @param {String} defaultValueType
        */
        serializeQueryParam(value: any, urlKey: string, defaultValueType: string): string;

        /**
        Serializes the query parameter key
        @method serializeQueryParamKey
        @param {String} controllerPropertyName
        */
        serializeQueryParamKey(controllerPropertyName: string): string;

        /**
        A hook you can use to setup the controller for the current route.
        This method is called with the controller for the current route and the
        model supplied by the `model` hook.
        By default, the `setupController` hook sets the `model` property of
        the controller to the `model`.
        If you implement the `setupController` hook in your Route, it will
        prevent this default behavior. If you want to preserve that behavior
        when implementing your `setupController` function, make sure to call
        `_super`
        @method setupController
        @param {Controller} controller instance
        @param {Object} model
        */
        setupController(controller: Controller, model: {}): void;

        /**
        Store property provides a hook for data persistence libraries to inject themselves.
        By default, this store property provides the exact same functionality previously
        in the model hook.
        Currently, the required interface is:
        `store.find(modelName, findArguments)`
        @method store
        @param {Object} store
        */
        store(store: any): any;

        /**
        The name of the template to use by default when rendering this routes
        template.
        This is similar with `viewName`, but is useful when you just want a custom
        template without a view.

        @property templateName
        @type String
        @default null
        @since 1.4.0
        */
        templateName: string;

        /**
        Transition the application into another route. The route may
        be either a single route or route path

        @method transitionTo
        @param {String} name the name of the route or a URL
        @param {...Object} models the model(s) or identifier(s) to be used while
        transitioning to the route.
        @param {Object} [options] optional hash with a queryParams property
        containing a mapping of query parameters
        @return {Transition} the transition object associated with this
        attempted transition
        */
        transitionTo(name: string, ...object: any[]): Transition;

        /**
        The name of the view to use by default when rendering this routes template.
        When rendering a template, the route will, by default, determine the
        template and view to use from the name of the route itself. If you need to
        define a specific view, set this property.
        This is useful when multiple routes would benefit from using the same view
        because it doesn't require a custom `renderTemplate` method.
        @property viewName
        @type String
        @default null
        @since 1.4.0
        */
        viewName: string;

        // ActionHandlerMixin methods

        /**
        Sends an action to the router, which will delegate it to the currently
        active route hierarchy per the bubbling rules explained under actions

        @method send
        @param {String} actionName The action to trigger
        @param {*} context a context to send with the action
        */
        send(name: string, ...args: any[]): void;

        /**
        The collection of functions, keyed by name, available on this
        `ActionHandler` as action targets.
        These functions will be invoked when a matching `{{action}}` is triggered
        from within a template and the application's current route is this route.
        Actions can also be invoked from other parts of your application
        via `ActionHandler#send`.
        The `actions` hash will inherit action handlers from
        the `actions` hash defined on extended parent classes
        or mixins rather than just replace the entire hash.

        Within a Controller, Route, View or Component's action handler,
        the value of the `this` context is the Controller, Route, View or
        Component object:

        It is also possible to call `this._super.apply(this, arguments)` from within an
        action handler if it overrides a handler defined on a parent
        class or mixin.

        ## Bubbling
        By default, an action will stop bubbling once a handler defined
        on the `actions` hash handles it. To continue bubbling the action,
        you must return `true` from the handler

        @property actions
        @type Hash
        @default null
        */
        actions: ActionsHash;

        // Evented methods

        /**
        Subscribes to a named event with given function.

        An optional target can be passed in as the 2nd argument that will
        be set as the "this" for the callback. This is a good way to give your
        function access to the object triggering the event. When the target
        parameter is used the callback becomes the third argument.

        @method on
        @param {String} name The name of the event
        @param {Object} [target] The "this" binding for the callback
        @param {Function} method The callback to execute
        @return this
        */
        on(name: string, target: any, method: Function): Evented;

        /**
        Subscribes a function to a named event and then cancels the subscription
        after the first time the event is triggered. It is good to use ``one`` when
        you only care about the first time an event has taken place.
        This function takes an optional 2nd argument that will become the "this"
        value for the callback. If this argument is passed then the 3rd argument
        becomes the function.

        @method one
        @param {String} name The name of the event
        @param {Object} [target] The "this" binding for the callback
        @param {Function} method The callback to execute
        @return this
        */
        one(name: string, target: any, method: Function): Evented;

        /**
        Triggers a named event for the object. Any additional arguments
        will be passed as parameters to the functions that are subscribed to the
        event.

        @method trigger
        @param {String} name The name of the event
        @param {Object...} args Optional arguments to pass on
        */
        trigger(name: string, ...args: string[]): void;

        /**
        Cancels subscription for given name, target, and method.

        @method off
        @param {String} name The name of the event
        @param {Object} target The target of the subscription
        @param {Function} method The function of the subscription
        @return this
        */
        off(name: string, target: any, method: Function): Evented;

        /**
        Checks to see if object has any subscriptions for named event.

        @method has
        @param {String} name The name of the event
        @return {Boolean} does the object have a subscription for event
        */
        has(name: string): boolean;
    }
    const Route: EmberClass<Route>;

    interface Router extends Object {
        map(callback: Function): Router;
    }
    const Router: EmberClass<Router>;
    class RouterDSL {
        resource(name: string, options?: {}, callback?: Function): void;
        resource(name: string, callback: Function): void;
        route(name: string, options?: {}): void;
        explicitIndex: boolean;
        router: Router;
        options: any;
    }
    interface Service extends Object {
    }
    const Service: EmberClass<Service>;
    const STRINGS: boolean;
    class State extends Object implements Evented {
        has(name: string): boolean;
        off(name: string, target: any, method: Function): State;
        on(name: string, target: any, method: Function): State;
        one(name: string, target: any, method: Function): State;
        trigger(name: string, ...args: string[]): void;
        getPathsCache(stateManager: {}, path: string): {};
        init(): void;
        setPathsCache(stateManager: {}, path: string, transitions: any): void;
        static transitionTo(target: string): void;
        hasContext: boolean;
        isLeaf: boolean;
        name: string;
        parentState: State;
        path: string;
        enter: Function;
        exit: Function;
        setup: Function;
    }
    class StateManager extends State {
        contextFreeTransition(currentState: State, path: string): TransitionsHash;
        enterState(transition: TransitionsHash): void;
        getState(name: string): State;
        getStateByPath(root: State, path: string): State;
        getStateMeta(state: State, key: string): any;
        getStatesInPath(root: State, path: string): State[];
        goToState(path: string, context: any): void;
        send(event: string): void;
        setStateMeta(state: State, key: string, value: any): any;
        stateMetaFor(state: State): {};
        transitionTo(path: string, context: any): void;
        triggerSetupContext(transitions: TransitionsHash): void;
        unhandledEvent(manager: StateManager, event: string): any;
        currentPath: string;
        currentState: State;
        errorOnUnhandledEvents: boolean;
        transitionEvent: string;
    }
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
        class Adapter extends Object {
            constructor();
        }
        class Promise<T, U> extends Rsvp.Promise<T, U> {
            constructor();
        }
        function oninjectHelpers(callback: Function): void;
        function promise<T, U>(resolver: (a: T) => any, label: string): Test.Promise<T, U>;
        function unregisterHelper(name: string): void;
        function registerHelper(name: string, helperMethod: Function): void;
        function registerAsyncHelper(name: string, helperMethod: Function): void;

        const adapter: Object;
        const QUnitAdapter: Object;

        function registerWaiter(callback: Function): void;
        function registerWaiter(context: any, callback: Function): void;
        function unregisterWaiter(callback: Function): void;
        function unregisterWaiter(context: any, callback: Function): void;

        function resolve<T>(result: T): Test.Promise<T, void>;
    }
    interface TextArea extends Component, TextSupport {
        cancel(event: Function): void;
        focusIn(event: Function): void;
        focusOut(event: Function): void;
        insertNewLine(event: Function): void;
        keyPress(event: Function): void;
        action: string;
        bubbles: boolean;
        onEvent: string;
    }
    const TextArea: EmberClass<TextArea>;
    interface TextField extends Component, TextSupport {
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
    const TextField: EmberClass<TextField>;
    class TextSupport {
        cancel(event: Function): void;
        focusIn(event: Function): void;
        focusOut(event: Function): void;
        insertNewLine(event: Function): void;
        keyPress(event: Function): void;
        action: string;
        bubbles: boolean;
        onEvent: string;
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
        promise: Rsvp.Promise<any, any>;

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
        then(onFulfilled: Function, onRejected?: Function, label?: string): Rsvp.Promise<any, any>;

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
        catch(onRejection: Function, label?: string): Rsvp.Promise<any, any>;

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
        finally(callback: Function, label?: string): Rsvp.Promise<any, any>;

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
        followRedirects(): Rsvp.Promise<any, any>;
    }
    const VERSION: string;
    class ViewTargetActionSupport extends Mixin {
        target: any;
        actionContext: any;
    }
    const ViewUtils: {}; // TODO: define interface
    function addListener(
        obj: any,
        eventName: string,
        target: Function | any,
        method: Function | string,
        once?: boolean
    ): void;
    function addObserver(obj: any, path: string | null, target: Function | any, method?: Function | string): void;
    /**
    Ember.alias is deprecated. Please use Ember.aliasMethod or Ember.computed.alias instead.
    **/
    const alias: typeof deprecateFunc;
    function aliasMethod(methodName: string): Descriptor;
    function assert(desc: string, test: boolean): void;
    function beginPropertyChanges(): void;
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

    type ComputedPropertyGet<T> = (this: any, key: string) => T;

    interface ComputedPropertyGetSet<T> {
        get(this: any, key: string): T;
        set(this: any, key: string, value: T): T;
    }

    type ComputedPropertyFunction<T> = ComputedPropertyGet<T> | ComputedPropertyGetSet<T>;
    type ComputedPropertyReturn<T> = ComputedProperty & T;

    const computed: {
        <T>(cb: ComputedPropertyFunction<T>): ComputedPropertyReturn<T>;
        <T>(k1: string, cb: ComputedPropertyFunction<T>): ComputedPropertyReturn<T>;
        <T>(k1: string, k2: string, cb: ComputedPropertyFunction<T>): ComputedPropertyReturn<T>;
        <T>(k1: string, k2: string, k3: string, cb: ComputedPropertyFunction<T>): ComputedPropertyReturn<T>;
        <T>(k1: string, k2: string, k3: string, k4: string, cb: ComputedPropertyFunction<T>): ComputedPropertyReturn<T>;
        <T>(k1: string, k2: string, k3: string, k4: string, k5: string, cb: ComputedPropertyFunction<T>): ComputedPropertyReturn<T>;
        <T>(k1: string, k2: string, k3: string, k4: string, k5: string, k6: string, cb: ComputedPropertyFunction<T>): ComputedPropertyReturn<T>;
        (k1: string, k2: string, k3: string, k4: string, k5: string, k6: string, k7: string, ...rest: any[]): ComputedProperty;

        alias(dependentKey: string): ComputedProperty;
        and(...args: string[]): ComputedProperty;
        any(...args: string[]): ComputedProperty;
        bool(dependentKey: string): ComputedProperty;
        collect(...dependentKeys: string[]): ComputedProperty;
        defaultTo(defaultPath: string): ComputedProperty;
        deprecatingAlias(dependentKey: string, options: DeprecateOptions): ComputedProperty;
        empty(dependentKey: string): ComputedProperty;
        equal(dependentKey: string, value: any): ComputedProperty;
        filter(
            dependentKey: string,
            callback: (item: any, index?: number, array?: any[]) => boolean
        ): ComputedProperty;
        filterBy(dependentKey: string, propertyKey: string, value?: any): ComputedProperty;
        filterProperty(key: string, value?: string): any[];
        gt(dependentKey: string, value: number): ComputedProperty;
        gte(dependentKey: string, value: number): ComputedProperty;
        intersect(...args: string[]): ComputedProperty;
        lt(dependentKey: string, value: number): ComputedProperty;
        lte(dependentKey: string, value: number): ComputedProperty;
        map(dependentKey: string, callback: <T>(item: any, index: number) => T): ComputedProperty;
        mapBy(dependentKey: string, propertyKey: string): ComputedProperty;
        mapProperty(key: string): any[];
        match(dependentKey: string, regexp: RegExp): ComputedProperty;
        max(dependentKey: string): ComputedProperty;
        min(dependentKey: string): ComputedProperty;
        none(dependentKey: string): ComputedProperty;
        not(dependentKey: string): ComputedProperty;
        notEmpty(dependentKey: string): ComputedProperty;
        oneWay(dependentKey: string): ComputedProperty;
        or(...args: string[]): ComputedProperty;
        readOnly(dependentString: string): ComputedProperty;
        reads(dependentKey: string): ComputedProperty;
        setDiff(setAProperty: string, setBProperty: string): ComputedProperty;
        sort(itemsKey: string, sortDefinition: string | compareFunc): ComputedProperty;
        sum(dependentKey: string): ComputedProperty;
        union(...args: string[]): ComputedProperty;
        uniq(...args: string[]): ComputedProperty;
        uniqBy(dependentKey: string, propertyKey: string): ComputedProperty;
    };
    function get<T, K extends keyof T>(obj: T, key: K): T[K];
    function getProperties<T, K extends keyof T>(obj: T, list: K[]): Pick<T, K>;
    function getProperties<T, K extends keyof T>(obj: T, ...list: K[]): Pick<T, K>;
    function set<T, K extends keyof T, V extends T[K]>(obj: T, key: K, value: V): V;
    function setProperties<T, K extends keyof T>(obj: T, hash: Pick<T, K>): Pick<T, K>;
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
    /**
    Ember.empty is deprecated. Please use Ember.isEmpty instead.
    **/
    // ReSharper disable once DuplicatingLocalDeclaration
    const empty: typeof deprecateFunc;
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
    /**
    getPath is deprecated since get now supports paths.
    **/
    const getPath: typeof deprecateFunc;
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
    function isNone(obj: any): boolean;
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
    /**
    Ember.none is deprecated. Please use Ember.isNone instead.
    **/
    const none: typeof deprecateFunc;
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
    function required(): Descriptor;
    function reset(): void;
    function rewatch(obj: any): void;

    type RunMethod<T> = (...args: any[]) => T;
    const run: {
        <T>(method: RunMethod<T> | string): T;
        <T>(target: any, method: RunMethod<T> | string): T;
        begin(): void;
        cancel(timer: any): void;
        debounce(target: any, method: Function | string, ...args: any[]): void;
        end(): void;
        join(target: any, method: Function | string, ...args: any[]): any;
        later(target: any, method: Function | string, ...args: any[]): string;
        next(target: any, method: Function | string, ...args: any[]): number;
        once(target: any, method: Function | string, ...args: any[]): number;
        schedule(queue: string, target: any, method: Function | string, ...args: any[]): void;
        scheduleOnce(queue: string, target: any, method: Function | string, ...args: any[]): void;
        sync(): void;
        throttle(target: any, method: Function | string, ...args: any[]): void;
        queues: any[];
    };
    function runInDebug(fn: Function): void;
    function runLoadHooks(name: string, object: any): void;
    function sendEvent(obj: any, eventName: string, params?: any[], actions?: any[]): boolean;
    /**
    setPath is deprecated since set now supports paths.
    **/
    const setPath: typeof deprecateFunc;
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
    /**
    trySetPath has been renamed to trySet.
    **/
    const trySetPath: typeof deprecateFunc;
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
    const _ContainerProxyMixin: Mixin;
    const _RegistryProxyMixin: Mixin;
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
