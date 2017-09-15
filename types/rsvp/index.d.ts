// Type definitions for RSVP 4.0
// Project: https://github.com/tildeio/rsvp.js
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

// These types are derived in large part from the Microsoft-supplied types for
// ES2015 Promises. They have been tweaked to support RSVP's extensions to the
// Promises A+ spec and the additional helper functions it supplies.

declare module 'rsvp' {
    class RSVPPromise<T> implements PromiseLike<T> {
        constructor(
            executor: (
                resolve: (value?: T | PromiseLike<T>) => void,
                reject: (reason?: any) => void
            ) => void
        );

        new<T>(
            executor: (
                resolve: (value?: T | PromiseLike<T>) => void,
                reject: (reason?: any) => void
            ) => void
        ): RSVPPromise<T>;

        then<TResult1 = T, TResult2 = never>(
            onfulfilled?:
                | ((value: T) => TResult1 | PromiseLike<TResult1>)
                | undefined
                | null,
            onrejected?:
                | ((reason: any) => TResult2 | PromiseLike<TResult2>)
                | undefined
                | null,
            label?: string
        ): RSVPPromise<TResult1 | TResult2>;

        catch<TResult = never>(
            onrejected?:
                | ((reason: any) => TResult | PromiseLike<TResult>)
                | undefined
                | null,
            label?: string
        ): RSVPPromise<T | TResult>;

        reject<T>(reason?: any, label?: string): RSVPPromise<T>;

        resolve<T>(value?: T | PromiseLike<T>, label?: string): RSVPPromise<T>;
        resolve(): RSVPPromise<void>;

        finally<U>(onFinally?: U | PromiseLike<U>): RSVPPromise<T>;
    }

    namespace RSVP {
        class Promise<T> extends RSVPPromise<T> {}
        namespace Promise {
            function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>,
                    T4 | PromiseLike<T4>,
                    T5 | PromiseLike<T5>,
                    T6 | PromiseLike<T6>,
                    T7 | PromiseLike<T7>,
                    T8 | PromiseLike<T8>,
                    T9 | PromiseLike<T9>,
                    T10 | PromiseLike<T10>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
            function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>,
                    T4 | PromiseLike<T4>,
                    T5 | PromiseLike<T5>,
                    T6 | PromiseLike<T6>,
                    T7 | PromiseLike<T7>,
                    T8 | PromiseLike<T8>,
                    T9 | PromiseLike<T9>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
            function all<T1, T2, T3, T4, T5, T6, T7, T8>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>,
                    T4 | PromiseLike<T4>,
                    T5 | PromiseLike<T5>,
                    T6 | PromiseLike<T6>,
                    T7 | PromiseLike<T7>,
                    T8 | PromiseLike<T8>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
            function all<T1, T2, T3, T4, T5, T6, T7>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>,
                    T4 | PromiseLike<T4>,
                    T5 | PromiseLike<T5>,
                    T6 | PromiseLike<T6>,
                    T7 | PromiseLike<T7>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6, T7]>;
            function all<T1, T2, T3, T4, T5, T6>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>,
                    T4 | PromiseLike<T4>,
                    T5 | PromiseLike<T5>,
                    T6 | PromiseLike<T6>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5, T6]>;
            function all<T1, T2, T3, T4, T5>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>,
                    T4 | PromiseLike<T4>,
                    T5 | PromiseLike<T5>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4, T5]>;
            function all<T1, T2, T3, T4>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>,
                    T4 | PromiseLike<T4>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3, T4]>;
            function all<T1, T2, T3>(
                values: [
                    T1 | PromiseLike<T1>,
                    T2 | PromiseLike<T2>,
                    T3 | PromiseLike<T3>
                ],
                label?: string
            ): RSVPPromise<[T1, T2, T3]>;
            function all<T1, T2>(
                values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>],
                label?: string
            ): Promise<[T1, T2]>;
            function all<T>(
                values: (T | PromiseLike<T>)[],
                label?: string
            ): RSVPPromise<T[]>;
        }

        function reject<T>(reason?: any, label?: string): RSVPPromise<T>;

        function resolve<T>(
            value?: T | PromiseLike<T>,
            label?: string
        ): RSVPPromise<T>;
        function resolve(): RSVPPromise<void>;

        const all: typeof Promise.all;

        function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>,
                T10 | PromiseLike<T10>
            ]
        ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
        function race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>
            ]
        ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
        function race<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>
            ]
        ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
        function race<T1, T2, T3, T4, T5, T6, T7>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>
            ]
        ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
        function race<T1, T2, T3, T4, T5, T6>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>
            ]
        ): RSVPPromise<T1 | T2 | T3 | T4 | T5 | T6>;
        function race<T1, T2, T3, T4, T5>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>
            ]
        ): RSVPPromise<T1 | T2 | T3 | T4 | T5>;
        function race<T1, T2, T3, T4>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>
            ]
        ): RSVPPromise<T1 | T2 | T3 | T4>;
        function race<T1, T2, T3>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>
            ]
        ): RSVPPromise<T1 | T2 | T3>;
        function race<T1, T2>(
            values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]
        ): RSVPPromise<T1 | T2>;
        function race<T>(values: (T | PromiseLike<T>)[]): RSVPPromise<T>;
    }

    export default RSVP;
}
