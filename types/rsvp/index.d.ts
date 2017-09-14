declare module 'rsvp' {
    type OnFulfilled<T, F = T> =
        | ((value: T) => F | PromiseLike<F>)
        | undefined
        | null;

    type OnRejected<R> =
        | ((reason: any) => R | PromiseLike<R>)
        | undefined
        | null;

    namespace RSVP {
        class Promise<T> implements PromiseLike<T> {
            then<TResolved = T, TRejected = never>(
                onfulfilled?: OnFulfilled<T, TResolved>,
                onrejected?: OnRejected<TRejected>,
                label?: string
            ): PromiseLike<TResolved | TRejected>;

            catch<TRejected = never>(
                onrejected?: OnRejected<TRejected>,
                label?: string
            ): PromiseLike<TRejected>;
        }

        function resolve(): PromiseLike<void>;
        function resolve<T>(t: T): PromiseLike<T>;
    }

    export default RSVP;
}
