const isLocalStorageAvailable = () => {
  try {
    const testKey = 'test';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export default isLocalStorageAvailable;
