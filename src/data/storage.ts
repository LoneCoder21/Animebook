export function getLocalStorage<T>(key: string, normal: T): T {
    try {
        let storage = localStorage.getItem(key);
        if (storage == null) return normal;
        const json = JSON.parse(storage) as T;
        if (!json) return normal;
        return json;
    } catch (e) {
        return normal;
    }
}

export function setLocalStorage<T>(key: string, value: T): void {
    try {
        const json_str = JSON.stringify(value);
        localStorage.setItem(key, json_str);
    } catch (e) {}
}
