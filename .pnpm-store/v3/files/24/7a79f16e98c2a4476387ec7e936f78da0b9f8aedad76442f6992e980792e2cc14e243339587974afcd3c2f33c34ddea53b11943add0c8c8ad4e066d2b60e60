/// <reference types="node" resolution-mode="require"/>
import type { readFile as ReadFileT } from "fs/promises";
import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
export declare class PDFLoader extends BaseDocumentLoader {
    filePath: string;
    constructor(filePath: string);
    load(): Promise<Document[]>;
    static imports(): Promise<{
        readFile: typeof ReadFileT;
    }>;
}
