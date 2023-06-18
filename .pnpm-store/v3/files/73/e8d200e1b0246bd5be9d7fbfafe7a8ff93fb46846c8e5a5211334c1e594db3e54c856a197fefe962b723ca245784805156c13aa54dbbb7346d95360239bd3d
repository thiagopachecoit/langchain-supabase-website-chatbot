import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export class SupabaseVectorStore extends VectorStore {
    constructor(client, embeddings, options = {}) {
        super(embeddings);
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        Object.defineProperty(this, "tableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queryName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tableName = options.tableName || "documents";
        this.queryName = options.queryName || "match_documents";
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    async addVectors(vectors, documents) {
        const rows = vectors.map((embedding, idx) => ({
            content: documents[idx].pageContent,
            embedding,
            metadata: documents[idx].metadata,
        }));
        // upsert returns 500/502/504 (yes really any of them) if given too many rows/characters
        // ~2000 trips it, but my data is probably smaller than average pageContent and metadata
        const chunkSize = 500;
        for (let i = 0; i < rows.length; i += chunkSize) {
            const chunk = rows.slice(i, i + chunkSize);
            const res = await this.client.from(this.tableName).insert(chunk);
            if (res.error) {
                throw new Error(`Error inserting: ${res.error.message} ${res.status} ${res.statusText}`);
            }
        }
    }
    async similaritySearchVectorWithScore(query, k) {
        const matchDocumentsParams = {
            query_embedding: query,
            match_count: k,
        };
        const { data: searches, error } = await this.client.rpc(this.queryName, matchDocumentsParams);
        if (error) {
            throw new Error(`Error searching for documents: ${error}`);
        }
        const result = searches.map((resp) => [
            new Document({
                metadata: resp.metadata,
                pageContent: resp.content,
            }),
            resp.similarity,
        ]);
        return result;
    }
    static async fromTexts(texts, metadatas, embeddings, { client, }) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const newDoc = new Document({
                pageContent: texts[i],
                metadata: metadatas[i],
            });
            docs.push(newDoc);
        }
        return SupabaseVectorStore.fromDocuments(client, docs, embeddings);
    }
    static async fromDocuments(client, docs, embeddings) {
        const instance = new this(client, embeddings);
        await instance.addDocuments(docs);
        return instance;
    }
    static async fromExistingIndex(client, embeddings) {
        const instance = new this(client, embeddings);
        return instance;
    }
}
//# sourceMappingURL=supabase.js.map