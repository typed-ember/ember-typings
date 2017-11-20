import { DbCollection, SchemaCollection } from './collection';

export interface ModelRegistry {
    // string -> Model
    // e.g. 'blog-post': typeof BlogPost
}

export interface ModelRegistryPlural {
    // string -> Model
    // e.g. blogPosts: typeof BlogPost
}

export type ModelNames = keyof ModelRegistry;
export type ModelNamesPlural = keyof ModelRegistryPlural;

export type DbCollections = {
    [P in keyof ModelRegistryPlural]: DbCollection<ModelRegistryPlural[P]>
};

export type SchemaCollections = {
    [P in keyof ModelRegistryPlural]: SchemaCollection<ModelRegistryPlural[P]>
};
