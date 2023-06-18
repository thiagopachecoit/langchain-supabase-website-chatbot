import jsonpointer from "jsonpointer";
import { TextLoader } from "./text.js";
export class JSONLoader extends TextLoader {
    constructor(filePath, pointer = "") {
        super(filePath);
        Object.defineProperty(this, "pointer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pointer
        });
    }
    async parse(raw) {
        const json = JSON.parse(raw.trim());
        const pointer = jsonpointer.compile(this.pointer);
        const value = pointer.get(json);
        return Array.isArray(value) ? value : [value];
    }
}
//# sourceMappingURL=json.js.map