// Type definitions for ember-inflector 2.0
// Project: https://github.com/emberjs/ember-inflector#readme
// Definitions by: Derek Wickern <https://github.com/dwickern>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

declare module 'ember-inflector' {
    type Mapping = Array<string | RegExp>;

    interface RuleSet {
        plurals?: Mapping[];
        singular?: Mapping[];
        irregularPairs?: Mapping[];
        uncountable?: string[];
    }

    /**
     * Inflector.Ember provides a mechanism for supplying inflection rules for your
     * application. Ember includes a default set of inflection rules, and provides an
     * API for providing additional rules.
     */
    class Inflector {
        static inflector: Inflector;
        static defaultRules: RuleSet;

        constructor(ruleSet?: RuleSet);

        enableCache(): void;
        purgeCache(): void;
        disableCache(): void;
        plural(regex: RegExp, string: string): void;
        singular(regex: RegExp, string: string): void;
        uncountable(regex: string): void;
        irregular(singular: string, plural: string): void;
        pluralize(word: string): string;
        singularize(word: string): string;
        inflect(word: string, typeRules: {}, irregular: {}): string;
    }

    export function pluralize(word: string): string;
    export function singularize(word: string): string;
    export const defaultRules: RuleSet;
    export default Inflector;
}

declare module 'ember' {
    import EmberInflector, { singularize } from 'ember-inflector';

    namespace Ember {
        export const Inflector: typeof EmberInflector;

        namespace String {
            export function pluralize(word: string): string;
            export function singularize(word: string): string;
        }

        namespace HTMLBars {
            class helpers {
                /**
                 * If you have Ember Inflector (such as if Ember Data is present),
                 * pluralize a word. For example, turn "ox" into "oxen".
                 * Example:
                 * {{pluralize count myProperty}}
                 * {{pluralize 1 "oxen"}}
                 * {{pluralize myProperty}}
                 * {{pluralize "ox"}}
                 */
                pluralize(count: number, word: string): any;
                /**
                 * If you have Ember Inflector (such as if Ember Data is present),
                 * singularize a word. For example, turn "oxen" into "ox".
                 * Example:
                 * {{singularize myProperty}}
                 * {{singularize "oxen"}}
                 */
                singularize(word: string): any;
            }
        }
    }
}
