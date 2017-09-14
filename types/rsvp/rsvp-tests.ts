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
    // TODO: add test
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
    // TODO: add test
}

function testResolve() {
    // TODO: add test
}

function testRethrow() {
    // TODO: add test
}
