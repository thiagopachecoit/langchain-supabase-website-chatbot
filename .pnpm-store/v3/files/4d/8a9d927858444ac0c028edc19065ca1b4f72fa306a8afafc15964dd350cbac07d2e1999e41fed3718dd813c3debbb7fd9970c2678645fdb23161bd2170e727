import type { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
export declare class PineconeStore extends VectorStore {
    textKey: string;
    namespace: string | undefined;
    pineconeClient: VectorOperationsApi;
    constructor(pineconeClient: VectorOperationsApi, embeddings: Embeddings, textKey?: string, namespace?: string | undefined);
    addDocuments(documents: Document[], ids?: string[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[], ids?: string[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[], embeddings: Embeddings, dbConfig: {
        pineconeClient: VectorOperationsApi;
        textKey?: string;
        namespace?: string | undefined;
    }): Promise<PineconeStore>;
    static fromDocuments(pineconeClient: VectorOperationsApi, docs: Document[], embeddings: Embeddings, textKey?: string, namespace?: string | undefined): Promise<PineconeStore>;
    static fromExistingIndex(pineconeClient: VectorOperationsApi, embeddings: Embeddings, textKey?: string, namespace?: string | undefined): Promise<PineconeStore>;
}
