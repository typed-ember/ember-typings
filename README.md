<h1 style="text-align: center">:stop_sign: ARCHIVED :stop_sign:</p>

This repository is now in archival mode, having fulfilled its purpose. We now track type definition issues for the Ember project in the [ember-cli-typescript](https://github.com/typed-ember/ember-cli-typescript) repository.

---

# ember-typings

[![build status](https://travis-ci.org/typed-ember/ember-typings.svg?branch=master)](https://travis-ci.org/typed-ember/ember-typings)

Development repository for TypeScript type definitions for Ember.js.

The type definitions are perodically published to `@types/ember` through [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). You shouldn't depend on this package directly unless you're testing or helping develop new Ember.js ecosystem typings.

### Running Tests

```
yarn test
```

The tests do *not* run, the code is only type-checked.

### Testing in your project

To use `ember-typings` instead of `@types/ember`, first run:

```
yarn remove @types/ember @types/ember-testing-helpers @types/rsvp
yarn add typed-ember/ember-typings --dev
```

Then add a `paths` entry to your `tsconfig.json`:
```
{
  "compilerOptions": {
    "paths": {
      "*": [
        "node_modules/ember-typings/types/*"
      ]
    }
  }
  ...
}
```
