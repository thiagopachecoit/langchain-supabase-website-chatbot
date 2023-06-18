import { Document } from "../document.js";
import { getEnv } from "../util/env.js";
import { BaseDocumentLoader } from "./base.js";
export class TextLoader extends BaseDocumentLoader {
    constructor(filePath) {
        super();
        Object.defineProperty(this, "filePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePath
        });
    }
    async parse(raw) {
        return [raw];
    }
    async load() {
        const { readFile } = await TextLoader.imports();
        const text = await readFile(this.filePath, "utf8");
        const metadata = { source: this.filePath };
        const parsed = await this.parse(text);
        parsed.forEach((pageContent, i) => {
            if (typeof pageContent !== "string") {
                throw new Error(`Expected string, at position ${i} got ${typeof pageContent}`);
            }
        });
        return parsed.map((pageContent) => new Document({ pageContent, metadata }));
    }
    static async imports() {
        try {
            const { readFile } = await import("fs/promises");
            return { readFile };
        }
        catch (e) {
            console.error(e);
            throw new Error(`Failed to load fs/promises. TextLoader available only on environment 'node'. It appears you are running environment '${getEnv()}'. See https://<link to docs> for alternatives.`);
        }
    }
}
//# sourceMappingURL=text.js.map