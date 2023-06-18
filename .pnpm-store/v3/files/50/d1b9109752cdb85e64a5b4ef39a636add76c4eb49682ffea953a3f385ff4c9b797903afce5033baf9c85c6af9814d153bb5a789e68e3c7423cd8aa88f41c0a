/// <reference types="node" resolution-mode="require"/>
import type { readFile as ReadFileT } from "fs/promises";
import type SRTParserT from "srt-parser-2";
import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
export declare class SRTLoader extends BaseDocumentLoader {
    filePath: string;
    constructor(filePath: string);
    load(): Promise<Document[]>;
    static imports(): Promise<{
        readFile: typeof ReadFileT;
        SRTParser2: typeof SRTParserT.default;
    }>;
}
