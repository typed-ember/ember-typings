// Type definitions for RSVP 4.0
// Project: https://github.com/tildeio/rsvp.js
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

// These types are derived in large part from the Microsoft-supplied types for
// ES2015 Promises. They have been tweaked to support RSVP's extensions to the
// Promises A+ spec and the additional helper functions it supplies.

declare module 'rsvp' {
    namespace RSVP {
        // All the Promise methods essentially flatten existing promises, so that
        // you don't end up with `Promise<Promise<Promise<string>>>` if you happen
        // to return another `Promise` from a `.then()` invocation, etc. So all of
        // them can take a type or a promise-like/then-able type.
        type Arg<T> = T | PromiseLike<T>;

        // RSVP supplies status for promises in certain places.
        enum State {
            fulfilled = 'fulfilled',
            rejected = 'rejected',
            pending = 'pending',
        }

        type Resolved<T> = {
            state: State.fulfilled;
            value: T;
        };

        type Rejected<T = any> = {
            state: State.rejected;
            reason: T;
        };

        type Pending = {
            state: State.pending;
        };

        type PromiseState<T> = Resolved<T> | Rejected | Pending;

        type Deferred<T> = {
            promise: Promise<T>;
            resolve: (value?: RSVP.Arg<T>) => void;
            reject: (reason?: any) => void;
        };

        interface InstrumentEvent {
            guid: string; // guid of promise. Must be globally unique, not just within the implementation
            childGuid: string; // child of child promise (for chained via `then`)
            eventName: string; // one of ['created', 'chained', 'fulfilled', 'rejected']
            detail: any; // fulfillment value or rejection reason, if applicable
            label: string; // label passed to promise's constructor
            timeStamp: number; // milliseconds elapsed since 1 January 1970 00:00:00 UTC up until now
        }

        interface ObjectWithEventMixins {
            on(
                eventName: 'created' | 'chained' | 'fulfilled' | 'rejected',
                listener: (event: InstrumentEvent) => void
            ): void;
            on(eventName: 'error', errorHandler: (reason: any) => void): void;
            on(eventName: string, callback: (value: any) => void): void;
            off(eventName: string, callback?: (value: any) => void): void;
            trigger(eventName: string, options?: any, label?: string): void;
        }

        export class EventTarget {
            /** `RSVP.EventTarget.mixin` extends an object with EventTarget methods. */
            static mixin(object: object): ObjectWithEventMixins;

            /** Registers a callback to be executed when `eventName` is triggered */
            static on(
                eventName: 'created' | 'chained' | 'fulfilled' | 'rejected',
                listener: (event: InstrumentEvent) => void
            ): void;
            static on(eventName: 'error', errorHandler: (reason: any) => void): void;
            static on(eventName: string, callback: (value: any) => void): void;

            /**
             * You can use `off` to stop firing a particular callback for an event.
             *
             * If you don't pass a `callback` argument to `off`, ALL callbacks for the
             * event will not be executed when the event fires.
             */
            static off(eventName: string, callback?: (value: any) => void): void;

            /**
             * Use `trigger` to fire custom events.
             *
             * You can also pass a value as a second argument to `trigger` that will be
             * passed as an argument to all event listeners for the event
             */
            static trigger(eventName: string, options?: any, label?: string): void;
        }

        class Promise<T> implements PromiseLike<T> {
            constructor(
                executor: (
                    resolve: (value?: RSVP.Arg<T>) => void,
                    reject: (reason?: any) => void
                ) => void
            );

            new<T>(
                executor: (
                    resolve: (value?: RSVP.Arg<T>) => void,
                    reject: (reason?: any) => void
                ) => void
            ): RSVP.Promise<T>;

            then<TResult1 = T, TResult2 = never>(
                onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
                onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
                label?: string
            ): RSVP.Promise<TResult1 | TResult2>;

            catch<TResult = never>(
                onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
                label?: string
            ): RSVP.Promise<T | TResult>;

            finally<U>(onFinally?: U | PromiseLike<U>): RSVP.Promise<T>;

            static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
                values: [
                    Arg<T1>,
                    Arg<T2>,
                    Arg<T3>,
                    Arg<T4>,
                    Arg<T5>,
                    Arg<T6>,
                    Arg<T7>,
                    Arg<T8>,
                    Arg<T9>,
                    T10 | PromiseLike<T10>
                ],
                label?: string
            ): RSVP.Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
            static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
                values: [
                    Arg<T1>,
                    Arg<T2>,
                    Arg<T3>,
                    Arg<T4>,
                    Arg<T5>,
                    Arg<T6>,
                    Arg<T7>,
                    Arg<T8>,
                    Arg<T9>
                ],
                label?: string
            ): RSVP.Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
            static all<T1, T2, T3, T4, T5, T6, T7, T8>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>, Arg<T8>],
                label?: string
            ): RSVP.Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
            static all<T1, T2, T3, T4, T5, T6, T7>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>],
                label?: string
            ): RSVP.Promise<[T1, T2, T3, T4, T5, T6, T7]>;
            static all<T1, T2, T3, T4, T5, T6>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>],
                label?: string
            ): RSVP.Promise<[T1, T2, T3, T4, T5, T6]>;
            static all<T1, T2, T3, T4, T5>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>],
                label?: string
            ): RSVP.Promise<[T1, T2, T3, T4, T5]>;
            static all<T1, T2, T3, T4>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>],
                label?: string
            ): RSVP.Promise<[T1, T2, T3, T4]>;
            static all<T1, T2, T3>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>],
                label?: string
            ): RSVP.Promise<[T1, T2, T3]>;
            static all<T1, T2>(values: [Arg<T1>, Arg<T2>], label?: string): Promise<[T1, T2]>;
            static all<T>(values: (Arg<T>)[], label?: string): RSVP.Promise<T[]>;

            static race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
                values: [
                    Arg<T1>,
                    Arg<T2>,
                    Arg<T3>,
                    Arg<T4>,
                    Arg<T5>,
                    Arg<T6>,
                    Arg<T7>,
                    Arg<T8>,
                    Arg<T9>,
                    T10 | PromiseLike<T10>
                ],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
            static race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
                values: [
                    Arg<T1>,
                    Arg<T2>,
                    Arg<T3>,
                    Arg<T4>,
                    Arg<T5>,
                    Arg<T6>,
                    Arg<T7>,
                    Arg<T8>,
                    Arg<T9>
                ],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
            static race<T1, T2, T3, T4, T5, T6, T7, T8>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>, Arg<T8>],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
            static race<T1, T2, T3, T4, T5, T6, T7>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
            static race<T1, T2, T3, T4, T5, T6>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3 | T4 | T5 | T6>;
            static race<T1, T2, T3, T4, T5>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3 | T4 | T5>;
            static race<T1, T2, T3, T4>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3 | T4>;
            static race<T1, T2, T3>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>],
                label?: string
            ): RSVP.Promise<T1 | T2 | T3>;
            static race<T1, T2>(values: [Arg<T1>, Arg<T2>], label?: string): RSVP.Promise<T1 | T2>;
            static race<T>(values: (Arg<T>)[], label?: string): RSVP.Promise<T>;

            static reject(reason?: any, label?: string): RSVP.Promise<never>;

            static resolve<T>(value?: Arg<T>, label?: string): RSVP.Promise<T>;
            static resolve(): RSVP.Promise<void>;

            /**
             * @deprecated
             */
            static cast: typeof RSVP.Promise.resolve;
        }

        const all: typeof Promise.all;
        const race: typeof Promise.race;
        const reject: typeof Promise.reject;
        const resolve: typeof Promise.resolve;

        const cast: typeof Promise.cast;

        const on: typeof EventTarget.on;
        const off: typeof EventTarget.off;

        // TODO: this is basically right for `NodeFunction`, but `denodeify`
        // needs to to return the right thing
        type NodeFunction<A, T> = (
            argument: A,
            callback: (err: any | undefined, ...data: T[]) => any
        ) => void;

        // TODO: version with no `options`
        // TODO: version with `options: false` and single T
        // TODO: version with `options: false` and multiple T
        // TODO: version with `options: true` and single T
        // TODO: version with `options: true` and multiple T
        // TODO: version with `options: string[]` and single T
        // TODO: version with `options: string[]` and multiple T
        function denodeify<A, T>(
            nodeFunc: NodeFunction<A, T>,
            options: boolean | string[]
        ): (argument: A) => RSVP.Promise<T>;

        function hash<T>(object: { [P in keyof T]: Arg<T[P]> }, label?: string): RSVP.Promise<T>;
        function hashSettled<T>(
            object: { [P in keyof T]: Arg<T[P]> },
            label?: string
        ): RSVP.Promise<{ [P in keyof T]: PromiseState<T[P]> }>;

        function allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            entries: [
                Arg<T1>,
                Arg<T2>,
                Arg<T3>,
                Arg<T4>,
                Arg<T5>,
                Arg<T6>,
                Arg<T7>,
                Arg<T8>,
                Arg<T9>,
                Arg<T10>
            ],
            label?: string
        ): RSVP.Promise<
            [
                PromiseState<T1>,
                PromiseState<T2>,
                PromiseState<T3>,
                PromiseState<T4>,
                PromiseState<T5>,
                PromiseState<T6>,
                PromiseState<T7>,
                PromiseState<T8>,
                PromiseState<T9>
            ]
        >;
        function allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            entries: [
                Arg<T1>,
                Arg<T2>,
                Arg<T3>,
                Arg<T4>,
                Arg<T5>,
                Arg<T6>,
                Arg<T7>,
                Arg<T8>,
                Arg<T9>
            ],
            label?: string
        ): RSVP.Promise<
            [
                PromiseState<T1>,
                PromiseState<T2>,
                PromiseState<T3>,
                PromiseState<T4>,
                PromiseState<T5>,
                PromiseState<T6>,
                PromiseState<T7>,
                PromiseState<T8>,
                PromiseState<T9>
            ]
        >;
        function allSettled<T1, T2, T3, T4, T5, T6, T7, T8>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>, Arg<T8>],
            label?: string
        ): RSVP.Promise<
            [
                PromiseState<T1>,
                PromiseState<T2>,
                PromiseState<T3>,
                PromiseState<T4>,
                PromiseState<T5>,
                PromiseState<T6>,
                PromiseState<T7>,
                PromiseState<T8>
            ]
        >;
        function allSettled<T1, T2, T3, T4, T5, T6, T7>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>],
            label?: string
        ): RSVP.Promise<
            [
                PromiseState<T1>,
                PromiseState<T2>,
                PromiseState<T3>,
                PromiseState<T4>,
                PromiseState<T5>,
                PromiseState<T6>,
                PromiseState<T7>
            ]
        >;
        function allSettled<T1, T2, T3, T4, T5, T6>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>],
            label?: string
        ): RSVP.Promise<
            [
                PromiseState<T1>,
                PromiseState<T2>,
                PromiseState<T3>,
                PromiseState<T4>,
                PromiseState<T5>,
                PromiseState<T6>
            ]
        >;
        function allSettled<T1, T2, T3, T4, T5>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>],
            label?: string
        ): RSVP.Promise<
            [
                PromiseState<T1>,
                PromiseState<T2>,
                PromiseState<T3>,
                PromiseState<T4>,
                PromiseState<T5>
            ]
        >;
        function allSettled<T1, T2, T3, T4>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>],
            label?: string
        ): RSVP.Promise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>, PromiseState<T4>]>;
        function allSettled<T1, T2, T3>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>],
            label?: string
        ): RSVP.Promise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>]>;
        function allSettled<T1, T2, T3>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>],
            label?: string
        ): RSVP.Promise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>]>;
        function allSettled<T1, T2>(
            entries: [Arg<T1>, Arg<T2>],
            label?: string
        ): RSVP.Promise<[PromiseState<T1>, PromiseState<T2>]>;
        function allSettled<T>(
            entries: (Arg<T>)[],
            label?: string
        ): RSVP.Promise<[PromiseState<T>]>;

        function defer<T>(label?: string): Deferred<T>;
    }

    // TODO: keep default export of this wrapping namespace for backwards
    // compatibility, but also export individual functions.
    export default RSVP;
}
