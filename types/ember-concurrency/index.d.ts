// Type definitions for ember-concurrency 0.8
// Project: https://github.com/machty/ember-concurrency#readme
// Definitions by: Arnav Gupta <https://github.com/championswimmer>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
import * as T from './Task';
import Evented from '@ember/object/evented';
import RSVP from 'rsvp';

declare module 'ember-concurrency' {
    type Task = typeof T.Task;
    type TaskInstance = typeof T.TaskInstance;
    type TaskProperty = typeof T.TaskProperty;
    const all: typeof RSVP.all;
    const allSettled: typeof RSVP.allSettled;
    const hash: typeof RSVP.hash;
    const race: typeof RSVP.race;

    /**
     * Returns true if the object passed to it is a
     * TaskCancelation error. If you call someTask.perform().catch(...)
     * or otherwise treat a TaskInstance like a promise, you may need
     * to handle the cancelation of a TaskInstance differently from
     * other kinds of errors it might throw, and you can use this
     * convenience function to distinguish cancelation from errors.
     *
     * @param {Error} error
     * @returns {boolean}
     */
    function didCancel(error?: Error): boolean;
    function task(generatorFunction: (...args: any[]) => Generator): T.TaskProperty;
    function taskGroup(...args: any[]): any;
    function timeout(ms: number): any;
    function waitForEvent(object: Evented | RSVP.EventTarget | EventTarget, eventName: string): any;
    function waitForProperty(object: any, key: string, callback: (...args: any[]) => any): any;
    function waitForQueue(queueName: string): any;
}
