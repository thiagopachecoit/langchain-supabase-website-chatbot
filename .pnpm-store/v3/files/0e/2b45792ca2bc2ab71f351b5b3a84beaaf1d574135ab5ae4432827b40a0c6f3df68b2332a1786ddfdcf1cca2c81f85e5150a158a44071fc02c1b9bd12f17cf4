import GPT3Tokenizer from "gpt3-tokenizer";
import PQueue from "p-queue";
import { getKey, InMemoryCache } from "../cache.js";
import { BaseLanguageModel, } from "../schema/index.js";
const getCallbackManager = () => ({
    handleStart: (..._args) => {
        // console.log(args);
    },
    handleEnd: (..._args) => {
        // console.log(args);
    },
    handleError: (..._args) => {
        // console.log(args);
    },
});
const getVerbosity = () => true;
const cache = new InMemoryCache();
/**
 * LLM Wrapper. Provides an {@link call} (an {@link generate}) function that takes in a prompt (or prompts) and returns a string.
 */
export class BaseLLM extends BaseLanguageModel {
    constructor(callbackManager, verbose, concurrency, cache) {
        super();
        /**
         * The name of the LLM class
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "callbackManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Maximum number of concurrent calls to this chain,
         * additional calls are queued up. Defaults to Infinity.
         */
        Object.defineProperty(this, "concurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether to print out response text.
         */
        Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_tokenizer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.callbackManager = callbackManager ?? getCallbackManager();
        this.verbose = verbose ?? getVerbosity();
        this.cache = cache;
        this.concurrency = concurrency ?? Infinity;
        this.queue = new PQueue({ concurrency: this.concurrency });
    }
    async generatePrompt(promptValues, stop) {
        const prompts = promptValues.map((promptValue) => promptValue.toString());
        return this.generate(prompts, stop);
    }
    /** @ignore */
    async _generateUncached(prompts, stop) {
        this.callbackManager.handleStart?.({ name: this.name }, prompts, this.verbose);
        let output;
        try {
            output = await this.queue.add(() => this._generate(prompts, stop), {
                throwOnTimeout: true,
            });
        }
        catch (err) {
            this.callbackManager.handleError?.(`${err}`, this.verbose);
            throw err;
        }
        this.callbackManager.handleEnd?.(output, this.verbose);
        return output;
    }
    /**
     * Run the LLM on the given propmts an input, handling caching.
     */
    async generate(prompts, stop) {
        if (!Array.isArray(prompts)) {
            throw new Error("Argument 'prompts' is expected to be a string[]");
        }
        if (this.cache === true && cache === null) {
            throw new Error("Requested cache, but no cache found");
        }
        if (cache === null || this.cache === false) {
            return this._generateUncached(prompts, stop);
        }
        const params = this.serialize();
        params.stop = stop;
        const llmStringKey = `${Object.entries(params).sort()}`;
        const missingPromptIndices = [];
        const generations = await Promise.all(prompts.map(async (prompt, index) => {
            const result = cache.lookup(await getKey(prompt, llmStringKey));
            if (!result) {
                missingPromptIndices.push(index);
            }
            return result;
        }));
        let llmOutput = {};
        if (missingPromptIndices.length > 0) {
            const results = await this._generateUncached(missingPromptIndices.map((i) => prompts[i]), stop);
            await Promise.all(results.generations.map(async (generation, index) => {
                const promptIndex = missingPromptIndices[index];
                generations[promptIndex] = generation;
                const key = await getKey(prompts[promptIndex], llmStringKey);
                cache.update(key, generation);
            }));
            llmOutput = results.llmOutput ?? {};
        }
        return { generations, llmOutput };
    }
    /**
     * Convenience wrapper for {@link generate} that takes in a single string prompt and returns a single string output.
     */
    async call(prompt, stop) {
        const { generations } = await this.generate([prompt], stop);
        return generations[0][0].text;
    }
    /**
     * Get the identifying parameters of the LLM.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _identifyingParams() {
        return {};
    }
    /**
     * Return a json-like object representing this LLM.
     */
    serialize() {
        return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType(),
        };
    }
    _modelType() {
        return "base_llm";
    }
    /**
     * Load an LLM from a json-like object describing it.
     */
    static async deserialize(data) {
        const { _type, _model, ...rest } = data;
        if (_model && _model !== "base_llm") {
            throw new Error(`Cannot load LLM with model ${_model}`);
        }
        const Cls = {
            openai: (await import("./openai.js")).OpenAI,
        }[_type];
        if (Cls === undefined) {
            throw new Error(`Cannot load  LLM with type ${_type}`);
        }
        return new Cls(rest);
    }
    getNumTokens(text) {
        // TODOs copied from py implementation
        // TODO: this method may not be exact.
        // TODO: this method may differ based on model (eg codex, gpt-3.5).
        if (this._tokenizer === undefined) {
            const Constructor = GPT3Tokenizer.default;
            this._tokenizer = new Constructor({ type: "gpt3" });
        }
        return this._tokenizer.encode(text).bpe.length;
    }
}
/**
 * LLM class that provides a simpler interface to subclass than {@link BaseLLM}.
 *
 * Requires only implementing a simpler {@link _call} method instead of {@link _generate}.
 *
 * @augments BaseLLM
 */
export class LLM extends BaseLLM {
    async _generate(prompts, stop) {
        const generations = [];
        for (let i = 0; i < prompts.length; i += 1) {
            const text = await this.queue.add(() => this._call(prompts[i], stop), {
                throwOnTimeout: true,
            });
            generations.push([{ text }]);
        }
        return { generations };
    }
}
//# sourceMappingURL=base.js.map