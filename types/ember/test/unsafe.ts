import Ember from 'ember';

declare module 'ember' {
    namespace Ember {
        function get(obj: any, key: string): any;
        function set(obj: any, key: string, value: any): any;
        function getProperties<K extends string>(obj: any, keys: K[]): Pick<K, any>;
        function getProperties<K extends string>(obj: any, ...keys: K[]): Pick<K, any>;
        function setProperties<K extends string>(obj: any, hash: Pick<any, K>): Pick<any, K>;

        interface CoreObject {
            get(key: string): any;
            set(key: string, value: any): any;
            getProperties<K extends string>(keys: K[]): Pick<K, any>;
            getProperties<K extends string>(...keys: K[]): Pick<K, any>;
            setProperties<K extends string>(hash: Pick<any, K>): Pick<any, K>;
        }

        interface Array<T> {
            getEach(key: string): any[];
            setEach(key: string, value: any): any;
            mapBy(key: string): any[];
            filterBy(key: string, value?: any): T[];
            rejectBy(key: string, value?: any): T[];
            findBy(key: string, value: any): T | undefined;
            isEvery(key: string, value?: boolean): boolean;
            isAny(key: string, value?: boolean): boolean;
            sortBy(...property: string[]): Enumerable<T>;
        }
    }
}

const obj = Ember.Object.create();
obj.get('path.to.something');
obj.set('path.to.something', 123);
obj.getProperties('path.to.something');
obj.setProperties({ 'path.to.something': 123 });
Ember.get(obj, 'path.to.something');
Ember.set(obj, 'path.to.something', 123);
Ember.getProperties(obj, 'path.to.something');
Ember.setProperties(obj, { 'path.to.something': 123 });

const arr = Ember.A<string>();
arr.mapBy('path.to.something');
arr.filterBy('path.to.something');
arr.isAny('path.to.something', true);
arr.isEvery('path.to.something');
