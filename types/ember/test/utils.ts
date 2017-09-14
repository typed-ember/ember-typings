import * as utils from '@ember/utils';

function testIsNoneType() {
    const maybeUndefined: string | undefined = 'not actually undefined';
    if (utils.isNone(maybeUndefined)) {
        return;
    }

    const anotherString = maybeUndefined + 'another string';
}
