import type { SupabaseClient } from "@supabase/supabase-js";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
export declare class SupabaseVectorStore extends VectorStore {
    client: SupabaseClient;
    tableName: string;
    queryName: string;
    constructor(client: SupabaseClient, embeddings: Embeddings, options?: {
        tableName?: string;
        queryName?: string;
        withMetadata?: boolean;
    });
    addDocuments(documents: Document[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[], embeddings: Embeddings, { client, }: {
        client: SupabaseClient;
    }): Promise<SupabaseVectorStore>;
    static fromDocuments(client: SupabaseClient, docs: Document[], embeddings: Embeddings): Promise<SupabaseVectorStore>;
    static fromExistingIndex(client: SupabaseClient, embeddings: Embeddings): Promise<SupabaseVectorStore>;
}
