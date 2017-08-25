// Type definitions for ember-decorators 1.2
// Project: https://github.com/ember-decorators/ember-decorators
// Definitions by: Derek Wickern <dwickern@gmail.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

declare module 'ember-decorators/object/computed' {
    export function alias(dependentKey: string): PropertyDecorator;
    export function and(...keys: string[]): PropertyDecorator;
}

declare module 'ember-decorators/object' {
    export function computed(...keys: string[]): MethodDecorator;
}
