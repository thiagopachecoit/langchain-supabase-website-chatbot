/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { extname as ExtnameT, resolve as ResolveT } from "path";
import type { readdir as ReaddirT } from "fs/promises";
import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
export declare enum UnknownHandling {
    Ignore = "ignore",
    Warn = "warn",
    Error = "error"
}
export declare class DirectoryLoader extends BaseDocumentLoader {
    directoryPath: string;
    loaders: {
        [extension: string]: (filePath: string) => BaseDocumentLoader;
    };
    recursive: boolean;
    unknown: UnknownHandling;
    constructor(directoryPath: string, loaders: {
        [extension: string]: (filePath: string) => BaseDocumentLoader;
    }, recursive?: boolean, unknown?: UnknownHandling);
    load(): Promise<Document[]>;
    static imports(): Promise<{
        readdir: typeof ReaddirT;
        extname: typeof ExtnameT;
        resolve: typeof ResolveT;
    }>;
}
