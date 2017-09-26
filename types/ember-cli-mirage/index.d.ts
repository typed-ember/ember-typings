// Type definitions for ember-cli-mirage 0.1.14
// Project: Ember-CLI-Mirage
// Definitions by: Chris Krycho <github.com/chriskrycho>
// Definitions: https://github.com/ololabs/mobile-web-client

import Ember from 'ember';
import * as Registry from './registry';

type EmberObject = Ember.Object;

interface MirageResponse {
    new (status: number, headers?: any[], payload?: any): MirageResponse;
}

interface MirageFactory extends EmberObject {}

export const Response: MirageResponse;
export const Factory: MirageFactory;

/**
 * Your Mirage server has a database which you can interact with in your route
 * handlers. You retrieve or modify data from the database, then return what you
 * want for that route.
 */
export interface Database extends Registry.Collections {
    createCollection(name: string): void;
}

export interface Request<QP> {
    requestBody: string;
    params: QP;
}

export type RouteHandler<QP = any, T = any> = (
    db: Database,
    request: Request<QP>
) => T;

type ResponseCode = number | string;
type Shorthand =
    | Registry.ModelNames
    | Registry.CollectionNames
    | Array<Registry.ModelNames | Registry.CollectionNames>;

export interface Server {
    /** Set the base namespace used for all routes defined with get, post, put or del. */
    namespace: string;

    /**
     * Generates a single model of type `type`, inserts it into the database
     * (giving it an id), and returns the data that was added. You can override
     * the attributes from the factory definition with a hash passed in as the
     * second parameter.
     */
    create<N extends Registry.ModelNames>(
        type: N,
        attrs?: Partial<Registry.Models[N]>
    ): Registry.Models[N];

    /**
     * Creates amount models of type `type`, optionally overriding the attributes
     * from the factory with attrs.
     *
     * Returns the array of records that were added to the database.
     */
    createList<N extends Registry.ModelNames>(
        type: N,
        count: number,
        attrs?: Partial<Registry.Models[N]>
    ): Registry.Models[N][];

    // Route handlers
    get(route: string): void;
    get(route: string, object: object, responseCode?: ResponseCode): void;
    get(route: string, shorthand: Shorthand, responseCode?: ResponseCode): void;
    get<QP = void, T = void>(
        route: string,
        handler: RouteHandler<QP, T>,
        responseCode?: ResponseCode
    ): void;

    post(route: string): void;
    post(route: string, object: object, responseCode?: ResponseCode): void;
    post(
        route: string,
        shorthand: Shorthand,
        responseCode?: ResponseCode
    ): void;
    post<QP = void, T = void>(
        route: string,
        handler: RouteHandler<QP, T>,
        responseCode?: ResponseCode
    ): void;

    put(route: string): void;
    put(route: string, object: object, responseCode?: ResponseCode): void;
    put(route: string, shorthand: Shorthand, responseCode?: ResponseCode): void;
    put<QP = void, T = void>(
        route: string,
        handler: RouteHandler<QP, T>,
        responseCode?: ResponseCode
    ): void;

    del(route: string): void;
    del(route: string, object: object, responseCode?: ResponseCode): void;
    del(route: string, shorthand: Shorthand, responseCode?: ResponseCode): void;
    del<QP = void, T = void>(
        route: string,
        handler: RouteHandler<QP, T>,
        responseCode?: ResponseCode
    ): void;

    /**
     * By default, all the data files under `/fixtures` will be loaded during
     * testing if you don’t have factories defined, and during development if you
     * don’t have `/scenarios/default.js` defined. You can use `loadFixtures()` to
     * also load fixture files in either of these environments, in addition to
     * using factories to seed your database.
     *
     * `server.loadFixtures()` loads all the files, and
     * `server.loadFixtures(file1, file2...)` loads selective fixture files.
     *
     * For example, in a test you may want to start out with all your fixture data
     * loaded, or in development, you may want to load a few reference fixture
     * files, and use factories to define the rest of your data.
     */
    loadFixtures(): void;
    loadFixtures(...files: string[]): void;

    /**
     * By default, if your Ember app makes a request that is not defined in your
     * server config, Mirage will throw an error. You can use passthrough to
     * whitelist requests, and allow them to pass through your Mirage server to
     * the actual network layer.
     *
     * _**Tip:** Put all passthrough config at the bottom of your `config.js`
     * file, to give your route handlers precedence._
     *
     * You can also pass a list of paths, or call `passthrough` multiple times.
     *
     * If you want only certain verbs to pass through, pass an array as the last
     * argument with the specified verbs.
     *
     * If you want all requests on the current domain to pass through, simply
     * invoke the method with no arguments. Note again that the current namespace
     * (i.e. any `namespace` property defined above this call) will be applied.
     *
     * You can also allow other-origin hosts to passthrough. If you use a
     * fully-qualified domain name, the `namespace` property will be ignored.
     * Use two * wildcards to match all requests under a path.
     *
     * Be aware that currently, passthrough only works with jQuery >= 2.x. See [this issue] for details.
     *
     * [this issue]: https://github.com/pretenderjs/pretender/issues/85
     */
    passthrough(): void;
    passthrough(route: string, methods?: string[]): void;
    passthrough(route: string, route1: string, methods?: string[]): void;
    passthrough(
        route: string,
        route1: string,
        route2: string,
        methods?: string[]
    ): void;
    passthrough(
        route: string,
        route1: string,
        route2: string,
        route3: string,
        methods?: string[]
    ): void;
    passthrough(
        route: string,
        route1: string,
        route2: string,
        route3: string,
        route4: string,
        methods?: string[]
    ): void;
    passthrough(
        route: string,
        route1: string,
        route2: string,
        route3: string,
        route4: string,
        route5: string,
        methods?: string[]
    ): void;
    passthrough(route: string, ...moreRoutes: string[]): void;

    shutdown(): void;

    /**
     * Mirage uses [pretender.js] as its xhttp interceptor. In your Mirage config,
     * `this.pretender` refers to the actual pretender instance, so any config
     * options that work there will work here as well. By default, content
     * returned is json stringified, so you can just return js objects.
     *
     * [pretender.js]: https://github.com/trek/pretender
     *
     * Refer to [pretender’s docs] if you want to change this or any other options
     * on your pretender instance.
     *
     * [pretender's docs]: https://github.com/trek/pretender#mutating-the-body
     */
    pretender: any;

    /**
     * If your entire Ember app uses an external (other-origin) API, you can
     * globally configure the domain via `urlPrefix`.
     */
    urlPrefix: string;

    db: Database;
}

declare global {
    export const server: Server;
}

declare namespace Mirage {
    const Response: MirageResponse;
    const Factory: MirageFactory;
}

export namespace faker {
    const address: {
        city(): string;
        countryCode(): string;
        latitude(): string;
        longitude(): string;
        state(): string;
        streetAddress(): string;
        zipCode(): string;
    };

    const commerce: {
        price(): number;
        product(): string;
        productName(): string;
        productAdjective(): string;
        productMaterial(): string;
    };

    const hacker: {
        noun(): string;
    };

    const internet: {
        email(): string;
        password(): string;
    };

    const lorem: {
        sentence(): string;
    };

    const name: {
        firstName(): string;
        lastName(): string;
    };

    const phone: {
        phoneNumber(): string;
    };

    const random: {
        number(): number;
    };
}

export default Mirage;
