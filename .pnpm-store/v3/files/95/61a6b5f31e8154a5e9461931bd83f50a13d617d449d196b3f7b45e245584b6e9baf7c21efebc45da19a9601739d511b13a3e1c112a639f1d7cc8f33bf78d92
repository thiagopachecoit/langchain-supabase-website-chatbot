import { BaseChatMessage, BaseLanguageModel, BasePromptValue, ChatResult, LLMCallbackManager, LLMResult } from "../schema/index.js";
export type SerializedChatModel = {
    _model: string;
    _type: string;
} & Record<string, any>;
export declare abstract class BaseChatModel extends BaseLanguageModel {
    callbackManager: LLMCallbackManager;
    verbose: boolean;
    protected constructor(callbackManager?: LLMCallbackManager, verbose?: boolean);
    generate(messages: BaseChatMessage[][], stop?: string[]): Promise<LLMResult>;
    /**
     * Get the identifying parameters of the LLM.
     */
    _identifyingParams(): Record<string, any>;
    _modelType(): string;
    abstract _llmType(): string;
    /**
     * Return a json-like object representing this Chat model.
     */
    serialize(): SerializedChatModel;
    private _tokenizer?;
    getNumTokens(text: string): number;
    generatePrompt(promptValues: BasePromptValue[], stop?: string[]): Promise<LLMResult>;
    abstract _generate(messages: BaseChatMessage[], stop?: string[]): Promise<ChatResult>;
    call(messages: BaseChatMessage[], stop?: string[]): Promise<BaseChatMessage>;
    callPrompt(promptValue: BasePromptValue, stop?: string[]): Promise<BaseChatMessage>;
}
export declare abstract class SimpleChatModel extends BaseChatModel {
    protected constructor(callbackManager?: LLMCallbackManager, verbose?: boolean);
    abstract _call(messages: BaseChatMessage[], stop?: string[]): Promise<string>;
    _generate(messages: BaseChatMessage[], stop?: string[]): Promise<ChatResult>;
}
