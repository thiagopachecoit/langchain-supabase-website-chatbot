import { Configuration, OpenAIApi } from "openai";
import { backOff } from "exponential-backoff";
import fetchAdapter from "../util/axios-fetch-adapter.js";
import { chunkArray } from "../util/index.js";
import { Embeddings } from "./base.js";
export class OpenAIEmbeddings extends Embeddings {
    constructor(fields) {
        super();
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text-embedding-ada-002"
        });
        Object.defineProperty(this, "batchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 20
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 6
        });
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apiKey = fields?.openAIApiKey ?? process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("OpenAI API key not found");
        }
        this.modelName = fields?.modelName ?? this.modelName;
        this.batchSize = fields?.batchSize ?? this.batchSize;
        this.apiKey = apiKey;
        this.maxRetries = fields?.maxRetries ?? this.maxRetries;
    }
    async embedDocuments(texts) {
        const subPrompts = chunkArray(texts, this.batchSize);
        const embeddings = [];
        for (let i = 0; i < subPrompts.length; i += 1) {
            const input = subPrompts[i];
            const { data } = await this.embeddingWithRetry({
                model: this.modelName,
                input,
            });
            for (let j = 0; j < input.length; j += 1) {
                embeddings.push(data.data[j].embedding);
            }
        }
        return embeddings;
    }
    async embedQuery(text) {
        const { data } = await this.embeddingWithRetry({
            model: this.modelName,
            input: text,
        });
        return data.data[0].embedding;
    }
    async embeddingWithRetry(request) {
        if (!this.client) {
            const clientConfig = new Configuration({
                apiKey: this.apiKey,
                baseOptions: { adapter: fetchAdapter },
            });
            this.client = new OpenAIApi(clientConfig);
        }
        const makeCompletionRequest = () => this.client.createEmbedding(request);
        return backOff(makeCompletionRequest, {
            startingDelay: 4,
            maxDelay: 10,
            numOfAttempts: this.maxRetries,
        });
    }
}
//# sourceMappingURL=openai.js.map