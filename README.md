# ember-typings

[![build status](https://travis-ci.org/typed-ember/ember-typings.svg?branch=master)](https://travis-ci.org/typed-ember/ember-typings)

Typescript type definitions for ember.js

The type definitions are perodically published to `@types/ember` through [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). You shouldn't depend on this package directly.

### Running Tests

```
yarn test
```

The tests do *not* run, the code is only type-checked.

### Testing in your project

To use `ember-typings` instead of `@types/ember`, first run:

```
yarn remove @types/ember @types/ember-testing-helpers
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
