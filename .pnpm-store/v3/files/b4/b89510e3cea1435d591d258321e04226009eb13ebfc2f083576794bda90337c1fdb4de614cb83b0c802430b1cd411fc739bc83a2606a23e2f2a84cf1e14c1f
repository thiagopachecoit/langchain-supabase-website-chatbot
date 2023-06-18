import { BaseChain, ChainValues, SerializedBaseChain } from "./index.js";
import { VectorStore } from "../vectorstores/base.js";
import { BaseLLM } from "../llms/index.js";
export type LoadValues = Record<string, any>;
export interface VectorDBQAChainInput {
    vectorstore: VectorStore;
    k: number;
    combineDocumentsChain: BaseChain;
    outputKey: string;
    inputKey: string;
}
export type SerializedVectorDBQAChain = {
    _type: "vector_db_qa";
    k: number;
    combine_documents_chain: SerializedBaseChain;
    combine_documents_chain_path?: string;
};
export declare class VectorDBQAChain extends BaseChain implements VectorDBQAChainInput {
    k: number;
    inputKey: string;
    get inputKeys(): string[];
    outputKey: string;
    vectorstore: VectorStore;
    combineDocumentsChain: BaseChain;
    returnSourceDocuments: boolean;
    constructor(fields: {
        vectorstore: VectorStore;
        combineDocumentsChain: BaseChain;
        inputKey?: string;
        outputKey?: string;
        k?: number;
        returnSourceDocuments?: boolean;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): "vector_db_qa";
    static deserialize(data: SerializedVectorDBQAChain, values: LoadValues): Promise<VectorDBQAChain>;
    serialize(): SerializedVectorDBQAChain;
    static fromLLM(llm: BaseLLM, vectorstore: VectorStore): VectorDBQAChain;
}
