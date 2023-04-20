declare function upsertItem(store: any, cacheKey: string, item: any): void;
declare function deleteItems(store: any, cacheKey: string, ids: number[]): void;
declare function getFromStore(store: any, cacheKey: string): any;
declare function getFromStoreWhereKeyMatchesValues(store: any, cacheKey: string, key: string, values: any[]): any[];
declare function setInStore(store: any, cacheKey: string, data: any[]): void;
export { upsertItem, deleteItems, getFromStore, setInStore, getFromStoreWhereKeyMatchesValues };
