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

async function getFromStoreOrRefresh(
  store: any,
  cacheKey: string,
  refreshFunction: () => Promise<any>
) {
  let value = store?.cache[cacheKey] ?? [];
  if (value?.length === 0) {
    value = await refreshFunction();
    setInStore(store, cacheKey, value);
  }
  return value;
}

function getFromStoreWhereKeyMatchesValues(
  store: any,
  cacheKey: string,
  key: string,
  values: any[]
) {
  let data = store?.cache[cacheKey] ?? [];
  let filteredData: any[] = [];
  data.forEach((d: any) => {
    if (values.indexOf(d[key]) > -1) {
      filteredData.push(d);
    }
  });
  return filteredData;
}

function setInStore(store: any, cacheKey: string, data: any[]) {
  let cacheData = store.cache ?? {};
  cacheData[cacheKey] = data ?? [];
  store.set("cache", { ...cacheData });
}

export {
  upsertItem,
  deleteItems,
  getFromStore,
  getFromStoreOrRefresh,
  setInStore,
  getFromStoreWhereKeyMatchesValues,
};
