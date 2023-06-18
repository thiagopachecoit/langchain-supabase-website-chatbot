// the main entrypoint has some debug code that we don't want to import
import pdf from "pdf-parse/lib/pdf-parse.js";
import { Document } from "../document.js";
import { getEnv } from "../util/env.js";
import { BaseDocumentLoader } from "./base.js";
export class PDFLoader extends BaseDocumentLoader {
    constructor(filePath) {
        super();
        Object.defineProperty(this, "filePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePath
        });
    }
    async load() {
        const { readFile } = await PDFLoader.imports();
        const buffer = await readFile(this.filePath);
        const parsed = await pdf(buffer);
        const metadata = { source: this.filePath };
        return [new Document({ pageContent: parsed.text, metadata })];
    }
    static async imports() {
        try {
            const { readFile } = await import("fs/promises");
            return { readFile };
        }
        catch (e) {
            console.error(e);
            throw new Error(`Failed to load fs/promises. PDFLoader available only on environment 'node'. It appears you are running environment '${getEnv()}'. See https://<link to docs> for alternatives.`);
        }
    }
}
//# sourceMappingURL=pdf.js.map