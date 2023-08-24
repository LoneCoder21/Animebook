export function getLocalStorage<T>(key: string, normal: T): T {
    let storage = localStorage.getItem(key);
    if (storage == null) return normal;
    const json = JSON.parse(storage) as T;
    if (!json) return normal;
    return json;
}

export function setLocalStorage<T>(key: string, value: T): void {
    const json_str = JSON.stringify(value);
    localStorage.setItem(key, json_str);
}
