import RSVP from 'rsvp';

async function testAsync() {
    let awaitedNothing = await RSVP.resolve();
    let awaitedValue = await RSVP.resolve('just a value');
}
