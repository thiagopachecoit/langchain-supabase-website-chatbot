import type { ChromaClient as ChromaClientT } from "chromadb";
import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export interface ChromaLibArgs {
    url?: string;
    numDimensions?: number;
    collectionName?: string;
}
export declare class Chroma extends VectorStore {
    index?: ChromaClientT;
    args: ChromaLibArgs;
    collectionName: string;
    url: string;
    constructor(args: ChromaLibArgs, embeddings: Embeddings, index?: ChromaClientT);
    addDocuments(documents: Document[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[], embeddings: Embeddings, dbConfig: {
        collectionName?: string;
        url?: string;
    }): Promise<Chroma>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, collectionName?: string, url?: string): Promise<Chroma>;
    static imports(): Promise<{
        ChromaClient: typeof ChromaClientT;
    }>;
}
