declare module 'rsvp' {
    namespace RSVP {
        function resolve(): PromiseLike<void>;
        function resolve<T>(t: T): PromiseLike<T>;
    }

    export default RSVP;
}
