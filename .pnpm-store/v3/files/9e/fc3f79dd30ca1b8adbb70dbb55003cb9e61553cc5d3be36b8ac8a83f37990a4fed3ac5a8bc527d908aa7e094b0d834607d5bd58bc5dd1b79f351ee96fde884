import { v4 as uuidv4 } from "uuid";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export class PineconeStore extends VectorStore {
    constructor(pineconeClient, embeddings, textKey = "text", namespace = undefined) {
        super(embeddings);
        Object.defineProperty(this, "textKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pineconeClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pineconeClient = pineconeClient;
        this.embeddings = embeddings;
        this.textKey = textKey;
        this.namespace = namespace;
    }
    async addDocuments(documents, ids) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents, ids);
    }
    async addVectors(vectors, documents, ids) {
        const documentIds = ids == null ? documents.map(() => uuidv4()) : ids;
        await this.pineconeClient.upsert({
            upsertRequest: {
                vectors: vectors.map((values, idx) => ({
                    id: documentIds[idx],
                    metadata: {
                        ...documents[idx].metadata,
                        [this.textKey]: documents[idx].pageContent,
                    },
                    values,
                })),
                namespace: this.namespace,
            },
        });
    }
    async similaritySearchVectorWithScore(query, k) {
        const results = await this.pineconeClient.query({
            queryRequest: {
                topK: k,
                includeMetadata: true,
                vector: query,
                namespace: this.namespace,
            },
        });
        const result = [];
        if (results.matches) {
            for (const res of results.matches) {
                const { [this.textKey]: pageContent, ...metadata } = (res.metadata ??
                    {});
                if (res.score) {
                    result.push([new Document({ metadata, pageContent }), res.score]);
                }
            }
        }
        return result;
    }
    static async fromTexts(texts, metadatas, embeddings, dbConfig) {
        const textKey = dbConfig.textKey || "text";
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const newDoc = new Document({
                pageContent: texts[i],
                metadata: metadatas[i],
            });
            docs.push(newDoc);
        }
        return PineconeStore.fromDocuments(dbConfig.pineconeClient, docs, embeddings, textKey, dbConfig.namespace);
    }
    static async fromDocuments(pineconeClient, docs, embeddings, textKey = "text", namespace = undefined) {
        const instance = new this(pineconeClient, embeddings, textKey, namespace);
        await instance.addDocuments(docs);
        return instance;
    }
    static async fromExistingIndex(pineconeClient, embeddings, textKey = "text", namespace = undefined) {
        const instance = new this(pineconeClient, embeddings, textKey, namespace);
        return instance;
    }
}
//# sourceMappingURL=pinecone.js.map