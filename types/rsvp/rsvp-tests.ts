import RSVP from 'rsvp';
import { assertType } from '../ember/test/lib/assert';

async function testAsyncAwait() {
    const awaitedNothing = await RSVP.resolve();
    const awaitedValue = await RSVP.resolve('just a value');

    async function returnsAPromise(): RSVP.Promise<string> {
        return RSVP.resolve('look, a string');
    }

    assertType<RSVP.Promise<string>>(returnsAPromise());
    assertType<string>(await returnsAPromise());
}

function testPromise() {
    const promiseOfString = new RSVP.Promise<string>((resolve, reject) => resolve('some string'));
    assertType<RSVP.Promise<number>>(promiseOfString.then(s => s.length));
}

function testAll() {
    // TODO: add test
}

function testAllSettled() {
    // TODO: add test
}

function testDefer() {
    // TODO: add test
}

function testDenodeify() {
    // TODO: add test
}

function testFilter() {
    // TODO: add test
}

function testHash() {
    // TODO: add test
}

function testHashSettled() {
    // TODO: add test
}

function testMap() {
    // TODO: add test
}

function testRace() {
    // TODO: add test
}

function testReject() {
    assertType<RSVP.Promise<never>>(RSVP.reject());
    assertType<RSVP.Promise<never>>(RSVP.reject('this is a string'));

    RSVP.reject({ ok: false }).catch(reason => { console.log(`${reason} could be anything`); });
    RSVP.reject({ ok: false }, 'some label').catch((reason: any) => reason.ok)
}

function testResolve() {
    assertType<RSVP.Promise<void>>(RSVP.resolve());
    assertType<RSVP.Promise<string>>(RSVP.resolve('this is a string'));
}

function testRethrow() {
    // TODO: add test
}
