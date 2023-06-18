import crypto from "crypto";
// Takes in an arbitrary number of strings and returns a hash of them
// that can be used as a key in a cache.
export const getKey = (...strings) => {
    const hash = crypto.createHash("sha256");
    strings.forEach((s) => hash.update(s));
    return hash.digest("hex");
};
export class BaseCache {
}
export class InMemoryCache extends BaseCache {
    constructor() {
        super();
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cache = {};
    }
    lookup(key) {
        return this.cache[key];
    }
    update(key, value) {
        this.cache[key] = value;
    }
}
//# sourceMappingURL=cache.js.map