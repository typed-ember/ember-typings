import Collection from './collection';

export interface Models {
    // string -> Model
}

export type ModelNames = keyof Models;

export interface Collections {
    // string -> Collection<Model>
}

export type CollectionNames = keyof Collections;
