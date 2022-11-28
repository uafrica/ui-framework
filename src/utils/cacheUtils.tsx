function upsertItem(store: any, cacheKey: string, item: any) {
  let items = store.cache[cacheKey];
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

    store.set(cacheKey, items);
  }
}

function deleteItems(store: any, cacheKey: string, ids: number[]) {
  let items = store.cache[cacheKey];

  if (items) {
    ids.forEach((id: number) => {
      items.forEach((t: any, i: number) => {
        if (t.id === id) {
          items.splice(i, 1);
        }
      });
    });
    store.set(cacheKey, items);
  }
}

function getFromStore(store: any, cacheKey: string) {
  return store?.cache[cacheKey] ?? [];
}

function setInStore(store: any, cacheKey: string, data: any[]) {
  let cacheData = store.cache ?? {};
  cacheData[cacheKey] = data ?? [];
  store.set("cache", cacheData);
}

export { upsertItem, deleteItems, getFromStore, setInStore };
