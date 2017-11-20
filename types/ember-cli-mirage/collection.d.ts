/**
 * A collection of db records i.e. a database table.
 */
export interface DbCollection<T> extends ArrayLike<T> {
    /**
     * Returns a single record from the collection if ids is a single id, or an
     * array of records if ids is an array of ids. Note each id can be an int or a
     * string, but integer ids as strings (e.g. the string “1”) will be treated as
     * integers.
     */
    find(id: number | string): T;
    find(ids: (number | string)[]): T[];

    /**
     * Returns the first model from `collection` that matches the
     * key-value pairs in the `query` object. Note that a string
     * comparison is used. `query` is a POJO.
     */
    findBy(query: object): T;

    /**
     * Finds the first record matching the provided query in `Collection`, or
     * creates a new record using a merge of the query and optional
     * `attributesForCreate`.
     */
    firstOrCreate(query?: Partial<T>, attributesForCreate?: Partial<T>): T;

    /**
     * Inserts `data` into the `Collection`. `Data` can be a single object or an
     * array of objects. Returns the inserted record.
     */
    insert(data: Partial<T> | Partial<T>[]): T;

    /**
     * Removes one or more records in collection.
     *
     * If `target` is undefined, removes all records. If `target` is a number or
     * string, removes a single record using `target` as id. If `target` is a
     * POJO, queries `Collection` for records that match the key-value pairs in
     * `target`, and removes them from the collection.
     */
    remove(target?: number | string | Partial<T>): this;

    /**
     * Updates one or more records in `Collection`.
     *
     * If `attrs` is the only arg present, updates all records in the collection
     * according to the key-value pairs in `attrs`.
     *
     * If `target` is present, restricts updates to those that match `target`. If
     * `target` is a number or string, finds a single record whose id is `target`
     * to update. If `target` is a POJO, queries collection for records that match
     * the key-value pairs in `target`, and updates their `attrs`.
     *
     * Returns the updated record or records.
     */
    update(...attrs: Partial<T>[]): this;
    update(target: number, ...attrs: Partial<T>[]): this;

    /**
     * Returns an array of models from `Collection` that match the key-value pairs
     * in the query object. Note that a string comparison is used. `query` is a
     * POJO.
     */
    where(query: Partial<T>): T[];
}

export interface SchemaCollection<T> {
    /**
     * The name of the model in the registry
     */
    camelizedModelName: string;

    /**
     * Create a model without saving it
     */
    'new'(attrs?: Partial<T>): T;

    /**
     * Create a model and save it to the database
     */
    create(attrs?: Partial<T>): T;

    /**
     * List all models in the collection
     */
    all(): Collection<T>;

    /**
     * Returns a single record from the collection if ids is a single id, or an
     * array of records if ids is an array of ids. Note each id can be an int or a
     * string, but integer ids as strings (e.g. the string “1”) will be treated as
     * integers.
     */
    find(id: number | string): T;
    find(ids: (number | string)[]): Collection<T>;

    /**
     * Returns the first model from `collection` that matches the
     * key-value pairs in the `query` object. Note that a string
     * comparison is used. `query` is a POJO.
     */
    findBy(query: object): T;

    /**
     * Returns an array of models from `Collection` that match the key-value pairs
     * in the query object. Note that a string comparison is used. `query` is a
     * POJO.
     */
    where(query: Partial<T>): Collection<T>;

    /**
     * Fetch the first model from the collection
     */
    first(): T | null;
}

/**
 * An array of models, returned from one of the schema query
 * methods (all, find, where). Knows how to update and destroy its models.
 */
export class Collection<T> {
    modelName: string;
    models: T[];
    /**
     * Number of models in the collection.
     */
    length: number;
    /**
     * Updates each model in the collection (persisting immediately to the db).
     */
    update(key: string, val: any): this;
    /**
     * Destroys the db record for all models in the collection.
     */
    destroy(): this;
    /**
     * Saves all models in the collection.
     */
    save(): this;
    /**
     * Reloads each model in the collection.
     */
    reload(): this;
    /**
     * Adds a model to this collection
     */
    add(model: T): this;
    /**
     * Removes a model to this collection
     */
    remove(model: T): this;
    /**
     * Checks if the collection includes the model
     */
    includes(model: T): boolean;
    filter(f: (item: T, index: number, models: T[]) => boolean): Collection<T>;
    sort(compareFn?: (a: T, b: T) => number): Collection<T>;
    slice(begin: number, end: number): Collection<T>;
    mergeCollection(collection: Collection<T>): this;
    /**
     * Simple string representation of the collection and id.
     */
    toString(): string;
}
