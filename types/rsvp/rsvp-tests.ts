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
    const promiseOfString = new RSVP.Promise((resolve: any, reject: any) => resolve('some string'));
    assertType<RSVP.Promise<number>>(promiseOfString.then((s: string) => s.length));
}

function testAll() {
    const empty = RSVP.Promise.all([]);

    const everyPromise = RSVP.all(
        ['string', RSVP.resolve(42), RSVP.resolve({ hash: 'with values' })]
    );

    assertType<RSVP.Promise<[string, number, { hash: string }]>>(everyPromise);

    const anyFailure = RSVP.all([12, 'strings', RSVP.reject('anywhere')]);
    assertType<RSVP.Promise<{}>>(anyFailure);

    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.resolve('2');
    let promise3 = RSVP.resolve({ key: 13 });
    RSVP.Promise.all([ promise1, promise2, promise3 ], 'my label').then(function(array) {
        assertType<number>(array[0]);
        assertType<string>(array[1]);
        assertType<{ key: number }>(array[2]);
    });
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
    const firstPromise = RSVP.race([{ notAPromise: true }, RSVP.resolve({ some: 'value' })]);
    assertType<RSVP.Promise<{ notAPromise: boolean } | { some: string }>>(firstPromise);

    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.resolve('2');
    RSVP.Promise.race([promise1, promise2], 'my label').then(function(result){
        assertType<string | number>(result);
    });
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
