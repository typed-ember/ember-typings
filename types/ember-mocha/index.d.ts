// Type definitions for ember-mocha 0.12
// Project: https://github.com/emberjs/ember-mocha#readme
// Definitions by: Derek Wickern <https://github.com/dwickern>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

declare module 'ember-mocha' {
    import Ember from 'ember';
    import { it as mochaIt, SuiteCallbackContext } from 'mocha';

    interface ModuleCallbacks {
        integration?: boolean;
        unit?: boolean;
        needs?: string[];

        beforeSetup?(): void;
        setup?(): void;
        teardown?(): void;
        afterTeardown?(): void;

        [key: string]: any;
    }

    interface ContextDefinitionFunction {
        (name: string, description: string, callbacks: ModuleCallbacks, tests: (this: SuiteCallbackContext) => void): void;
        (name: string, description: string, tests: (this: SuiteCallbackContext) => void): void;
        (name: string, callbacks: ModuleCallbacks, tests: (this: SuiteCallbackContext) => void): void;
        (name: string, tests: (this: SuiteCallbackContext) => void): void;
    }

    interface ContextDefinition extends ContextDefinitionFunction {
        only: ContextDefinitionFunction;
        skip: ContextDefinitionFunction;
    }

    interface SetupTest {
        (name?: string, callbacks?: ModuleCallbacks): void;
        (callbacks: ModuleCallbacks): void;
    }

    /**
     *
     * @param {string} fullName The full name of the unit, ie controller:application, route:index.
     * @param {string} description The description of the module
     * @param {ModuleCallbacks} callbacks
     * @deprecated Use setupTest instead
     */
    export const describeModule: ContextDefinition;

    /**
     *
     * @param {string} fullName the short name of the component that you'd use in a template, ie x-foo, ic-tabs, etc.
     * @param {string} description The description of the module
     * @param {ModuleCallbacks} callbacks
     * @deprecated Use setupComponentTest instead
     */
    export const describeComponent: ContextDefinition;

    /**
     *
     * @param {string} fullName the short name of the model you'd use in store operations ie user, assignmentGroup, etc.
     * @param {string} description The description of the module
     * @param {ModuleCallbacks} callbacks
     * @deprecated Use setupModelTest instead
     */
    export const describeModel: ContextDefinition;

    export const setupTest: SetupTest;
    export const setupAcceptanceTest: SetupTest;
    export const setupComponentTest: SetupTest;
    export const setupModelTest: SetupTest;

    export const it: typeof mochaIt;

    /**
     * Sets a Resolver globally which will be used to look up objects from each test's container.
     */
    export function setResolver(resolver: Ember.Resolver): void;
}

declare module 'mocha' {
    import Ember from 'ember';
    import { TemplateFactory } from 'htmlbars-inline-precompile';

    interface Runnable {
        title: string;
        fn(...args: any[]): any;
        async: boolean;
        sync: boolean;
        timedOut: boolean;
        timeout(n: number): this;
    }

    interface Suite {
        parent: Suite;
        title: string;

        fullTitle(): string;
    }

    interface Test extends Runnable {
        parent: Suite;
        pending: boolean;
        state: 'failed' | 'passed' | undefined;

        fullTitle(): string;
    }

    interface TestContext {
        skip(): this;
        timeout(ms: number): this;
        get(key: string): any;
        getProperties<K extends string>(...keys: K[]): Pick<any, K>;
        set<V>(key: string, value: V): V;
        setProperties<P extends { [key: string]: any }>(hash: P): P;
        on(actionName: string, handler: (this: TestContext, ...args: any[]) => any): void;
        send(actionName: string): void;
        $: JQueryStatic;
        subject(options?: {}): any;
        render(template?: string | string[] | TemplateFactory): void;
        clearRender(): void;
        registry: Ember.Registry;
        container: Ember.Container;
        dispatcher: Ember.EventDispatcher;
        register(fullName: string, factory: any): void;
        factory(fullName: string): any;
        inject: {
            controller(name: string, options?: { as: string }): any;
            service(name: string, options?: { as: string }): any;
        };
    }

    interface BeforeAndAfterContext extends TestContext {
        currentTest: Test;
    }

    interface TestDefinition {
        (expectation: string, callback?: (this: TestContext, done: MochaDone) => any): Test;
        only(expectation: string, callback?: (this: TestContext, done: MochaDone) => any): Test;
        skip(expectation: string, callback?: (this: TestContext, done: MochaDone) => any): void;
        timeout(ms: number): void;
        state: "failed" | "passed";
    }

    type MochaDone = (error?: any) => any;

    interface SuiteCallbackContext {
        timeout(ms: number): this;
        retries(n: number): this;
        slow(ms: number): this;
    }

    interface ContextDefinition {
        (description: string, callback: (this: SuiteCallbackContext) => void): Suite;
        only(description: string, callback: (this: SuiteCallbackContext) => void): Suite;
        skip(description: string, callback: (this: SuiteCallbackContext) => void): void;
    }

    // export const mocha: Mocha;
    export const describe: ContextDefinition;
    export const context: ContextDefinition;
    export const it: TestDefinition;
    export function before(callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
    export function before(description: string, callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
    export function after(callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
    export function after(description: string, callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
    export function beforeEach(callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
    export function beforeEach(description: string, callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
    export function afterEach(callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
    export function afterEach(description: string, callback: (this: BeforeAndAfterContext, done: MochaDone) => any): void;
}
