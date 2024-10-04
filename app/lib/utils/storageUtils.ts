/**
 * The function `getFromLocalStorage` retrieves a value from the local storage
 * based on the provided key.
 * @param {string} key - The `key` parameter in the `getFromLocalStorage` function
 * is a string that represents the key under which the value is stored in the local
 * storage. When you call this function with a specific key, it will attempt to
 * retrieve the corresponding value from the local storage.
 * @returns The function `getFromLocalStorage` returns the value stored in the
 * localStorage corresponding to the provided key if `window` is defined (i.e., if
 * the code is running in a browser environment). If `window` is not defined, it
 * returns `null`.
 */
export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

/**
 * The function retrieves a value from the session storage based on a
 * given key.
 * @param {string} key - The `key` parameter in the `getFromSessionStorage`
 * function is a string that represents the key under which the value is stored in
 * the session storage. When you call this function with a specific key, it will
 * retrieve the corresponding value from the session storage if it exists.
 * @returns The function `getFromSessionStorage` returns the value associated with
 * the specified key from the sessionStorage if sessionStorage is available,
 * otherwise it returns `null`.
 */
export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}
