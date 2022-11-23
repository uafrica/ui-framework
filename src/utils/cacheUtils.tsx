function upsertItem(store: any, storeName: string, item: any) {
  let items = store.cache[storeName];
  if (items) {
    let updated = false;
    items.forEach((t: any, i: number) => {
      if (t.id === item.id) {
        items[i] = { ...item };
        updated = true;
      }
    });

    if (!updated) {
      items.push(item);
    }

    store.set(storeName, items);
  }
}

function deleteItems(store: any, storeName: string, ids: number[]) {
  let items = store.cache[storeName];

  if (items) {
    ids.forEach((id: number) => {
      items.forEach((t: any, i: number) => {
        if (t.id === id) {
          items.splice(i, 1);
        }
      });
    });
    store.set(storeName, items);
  }
}

function getFromStore(store: any, storeName: string) {
  return store?.cache[storeName] ?? [];
}

function setInStore(store: any, storeName: string, data: any[]) {
  let cacheData = store.cache ?? {};
  cacheData[storeName] = data ?? [];
  store.set("cache", cacheData);
}

export { upsertItem, deleteItems, getFromStore, setInStore };
