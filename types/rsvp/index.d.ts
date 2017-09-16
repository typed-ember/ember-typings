// Type definitions for RSVP 4.0
// Project: https://github.com/tildeio/rsvp.js
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.5

// These types are derived in large part from the Microsoft-supplied types for
// ES2015 Promises. They have been tweaked to support RSVP's extensions to the
// Promises A+ spec and the additional helper functions it supplies.

declare module 'rsvp' {
    class RSVPPromise<T> implements PromiseLike<T> {
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
        ): RSVPPromise<T>;

        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
            label?: string
        ): RSVPPromise<TResult1 | TResult2>;

        catch<TResult = never>(
            onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
            label?: string
        ): RSVPPromise<T | TResult>;

        reject<T>(reason?: any, label?: string): RSVPPromise<T>;

        resolve<T>(value?: RSVP.Arg<T>, label?: string): RSVPPromise<T>;
        resolve(): RSVPPromise<void>;

        finally<U>(onFinally?: U | PromiseLike<U>): RSVPPromise<T>;
    }

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
        }

        type Rejected<T = any> = {
            state: State.rejected;
            reason: T;
        }

        type Pending = {
            state: State.pending;
        }

        type PromiseState<T> = Resolved<T> | Rejected | Pending;

        class Promise<T> extends RSVPPromise<T> {}
        namespace Promise {
            function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
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
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
            function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
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
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
            function all<T1, T2, T3, T4, T5, T6, T7, T8>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>, Arg<T8>],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
            function all<T1, T2, T3, T4, T5, T6, T7>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7]>;
            function all<T1, T2, T3, T4, T5, T6>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6]>;
            function all<T1, T2, T3, T4, T5>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5]>;
            function all<T1, T2, T3, T4>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4]>;
            function all<T1, T2, T3>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>],
                label?: string
            ): RSVPPromise<[T1, T2, T3]>;
            function all<T1, T2>(values: [Arg<T1>, Arg<T2>], label?: string): Promise<[T1, T2]>;
            function all<T>(values: (Arg<T>)[], label?: string): RSVPPromise<T[]>;

            function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
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
            ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
            function race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
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
            ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
            function race<T1, T2, T3, T4, T5, T6, T7, T8>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>, Arg<T8>],
                label?: string
            ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
            function race<T1, T2, T3, T4, T5, T6, T7>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>],
                label?: string
            ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
            function race<T1, T2, T3, T4, T5, T6>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>],
                label?: string
            ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6>;
            function race<T1, T2, T3, T4, T5>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>],
                label?: string
            ): RSVPPromise<T1 | T2 | T3 | T4 | T5>;
            function race<T1, T2, T3, T4>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>],
                label?: string
            ): RSVPPromise<T1 | T2 | T3 | T4>;
            function race<T1, T2, T3>(
                values: [Arg<T1>, Arg<T2>, Arg<T3>],
                label?: string
            ): RSVPPromise<T1 | T2 | T3>;
            function race<T1, T2>(values: [Arg<T1>, Arg<T2>], label?: string): RSVPPromise<T1 | T2>;
            function race<T>(values: (Arg<T>)[], label?: string): RSVPPromise<T>;

            function reject(reason?: any, label?: string): RSVPPromise<never>;

            function resolve<T>(value?: Arg<T>, label?: string): RSVPPromise<T>;
            function resolve(): RSVPPromise<void>;
        }

        const all: typeof Promise.all;
        const race: typeof Promise.race;
        const reject: typeof Promise.reject;
        const resolve: typeof Promise.resolve;

        function hash<T>(object: { [P in keyof T]: Arg<T[P]> }, label?: string): RSVPPromise<T>;

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
        ): RSVPPromise<
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
        ): RSVPPromise<
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
        ): RSVPPromise<
            [PromiseState<T1>, PromiseState<T2>, PromiseState<T3>, PromiseState<T4>, PromiseState<T5>, PromiseState<T6>, PromiseState<T7>, PromiseState<T8>]
        >;
        function allSettled<T1, T2, T3, T4, T5, T6, T7>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>, Arg<T7>],
            label?: string
        ): RSVPPromise<
            [PromiseState<T1>, PromiseState<T2>, PromiseState<T3>, PromiseState<T4>, PromiseState<T5>, PromiseState<T6>, PromiseState<T7>]
        >;
        function allSettled<T1, T2, T3, T4, T5, T6>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>, Arg<T6>],
            label?: string
        ): RSVPPromise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>, PromiseState<T4>, PromiseState<T5>, PromiseState<T6>]>;
        function allSettled<T1, T2, T3, T4, T5>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>, Arg<T5>],
            label?: string
        ): RSVPPromise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>, PromiseState<T4>, PromiseState<T5>]>;
        function allSettled<T1, T2, T3, T4>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>, Arg<T4>],
            label?: string
        ): RSVPPromise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>, PromiseState<T4>]>;
        function allSettled<T1, T2, T3>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>],
            label?: string
        ): RSVPPromise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>]>;
        function allSettled<T1, T2, T3>(
            entries: [Arg<T1>, Arg<T2>, Arg<T3>],
            label?: string
        ): RSVPPromise<[PromiseState<T1>, PromiseState<T2>, PromiseState<T3>]>;
        function allSettled<T1, T2>(
            entries: [Arg<T1>, Arg<T2>],
            label?: string
        ): RSVPPromise<[PromiseState<T1>, PromiseState<T2>]>;
        function allSettled<T>(entries: (Arg<T>)[], label?: string): RSVPPromise<[PromiseState<T>]>;
    }

    export default RSVP;
}
