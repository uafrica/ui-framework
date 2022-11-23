declare function upsertItem(store: any, storeName: string, item: any): void;
declare function deleteItems(store: any, storeName: string, ids: number[]): void;
declare function getFromStore(store: any, storeName: string): any;
declare function setInStore(store: any, storeName: string, data: any[]): void;
export { upsertItem, deleteItems, getFromStore, setInStore };
