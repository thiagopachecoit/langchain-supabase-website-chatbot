import { Embeddings } from "embeddings/base.js";
import { VectorStore } from "vectorstores/base.js";
import type { BaseExampleSelector, Example } from "../base.js";
export declare class SemanticSimilarityExampleSelector implements BaseExampleSelector {
    vectorStore: VectorStore;
    k: number;
    exampleKeys?: string[];
    inputKeys?: string[];
    constructor(data: {
        vectorStore: VectorStore;
        k?: number;
        exampleKeys?: string[];
        inputKeys?: string[];
    });
    addExample(example: Record<string, string>): Promise<void>;
    selectExamples<T>(inputVariables: Record<string, T>): Promise<Example[]>;
    static fromExamples(examples: Record<string, string>[], embeddings: Embeddings, vectorStoreCls: typeof VectorStore, options?: {
        k?: number;
        inputKeys?: string[];
        [key: string]: any;
    }): Promise<SemanticSimilarityExampleSelector>;
}
