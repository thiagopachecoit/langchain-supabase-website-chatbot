import GPT3Tokenizer from "gpt3-tokenizer";
import { AIChatMessage, BaseLanguageModel, } from "../schema/index.js";
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
export class BaseChatModel extends BaseLanguageModel {
    constructor(callbackManager, verbose) {
        super();
        Object.defineProperty(this, "callbackManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // TODO deserialize
        Object.defineProperty(this, "_tokenizer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.callbackManager = callbackManager ?? getCallbackManager();
        this.verbose = verbose ?? getVerbosity();
    }
    async generate(messages, stop) {
        const generations = [];
        for (const message of messages) {
            const result = await this._generate(message, stop);
            generations.push(result.generations);
        }
        return {
            generations,
        };
    }
    /**
     * Get the identifying parameters of the LLM.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _identifyingParams() {
        return {};
    }
    _modelType() {
        return "base_chat_model";
    }
    /**
     * Return a json-like object representing this Chat model.
     */
    serialize() {
        return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType(),
        };
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
    async generatePrompt(promptValues, stop) {
        const promptMessages = promptValues.map((promptValue) => promptValue.toChatMessages());
        return this.generate(promptMessages, stop);
    }
    async call(messages, stop) {
        const { generations } = await this._generate(messages, stop);
        return generations[0].message;
    }
    async callPrompt(promptValue, stop) {
        const promptMessages = promptValue.toChatMessages();
        return this.call(promptMessages, stop);
    }
}
export class SimpleChatModel extends BaseChatModel {
    constructor(callbackManager, verbose) {
        super(callbackManager, verbose);
    }
    async _generate(messages, stop) {
        const text = await this._call(messages, stop);
        const message = new AIChatMessage(text);
        return {
            generations: [
                {
                    text: message.text,
                    message,
                },
            ],
        };
    }
}
//# sourceMappingURL=base.js.map