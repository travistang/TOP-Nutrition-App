const getFromStore = (storeKey: string) => {
  try {
    const data = JSON.parse(localStorage.getItem(storeKey) ?? '');
    return data;
  } catch {
    return null;
  }
};

const setStore = (storeKey: string, obj: any) => {
  localStorage.setItem(storeKey, JSON.stringify(obj));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFromStore,
  setStore,
};