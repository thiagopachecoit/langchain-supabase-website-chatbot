import { BasePromptTemplate, BaseStringPromptTemplate, BasePromptTemplateInput, InputValues, PartialValues } from "./base.js";
import { TemplateFormat } from "./template.js";
import { SerializedOutputParser } from "./parser.js";
import { BaseChatMessage, BasePromptValue } from "../schema/index.js";
/** Serialized Chat prompt template */
export type SerializedChatPromptTemplate = {
    _type?: "chat_prompt";
    input_variables: string[];
    output_parser?: SerializedOutputParser;
    template_format?: TemplateFormat;
    prompt_messages: BaseMessagePromptTemplate[];
};
export declare abstract class BaseMessagePromptTemplate {
    abstract inputVariables: string[];
    abstract formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
}
export declare class MessagesPlaceholder extends BaseMessagePromptTemplate {
    variableName: string;
    constructor(variableName: string);
    get inputVariables(): string[];
    formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
}
export declare abstract class BaseMessageStringPromptTemplate extends BaseMessagePromptTemplate {
    prompt: BaseStringPromptTemplate;
    protected constructor(prompt: BaseStringPromptTemplate);
    get inputVariables(): string[];
    abstract format(values: InputValues): Promise<BaseChatMessage>;
    formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
}
export declare class ChatMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    role: string;
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate, role: string);
    static fromTemplate(template: string, role: string): ChatMessagePromptTemplate;
}
export declare class HumanMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate);
    static fromTemplate(template: string): HumanMessagePromptTemplate;
}
export declare class AIMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate);
    static fromTemplate(template: string): AIMessagePromptTemplate;
}
export declare class SystemMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate);
    static fromTemplate(template: string): SystemMessagePromptTemplate;
}
export declare class ChatPromptValue extends BasePromptValue {
    messages: BaseChatMessage[];
    constructor(messages: BaseChatMessage[]);
    toString(): string;
    toChatMessages(): BaseChatMessage[];
}
export interface ChatPromptTemplateInput extends BasePromptTemplateInput {
    /**
     * The prompt messages
     */
    promptMessages: BaseMessagePromptTemplate[];
    /**
     * The format of the prompt template. Options are 'f-string', 'jinja-2'
     *
     * @defaultValue 'f-string'
     */
    templateFormat?: TemplateFormat;
    /**
     * Whether to try validating the template on initialization
     *
     * @defaultValue `true`
     */
    validateTemplate?: boolean;
}
export declare class ChatPromptTemplate extends BasePromptTemplate implements ChatPromptTemplateInput {
    promptMessages: BaseMessagePromptTemplate[];
    templateFormat: TemplateFormat;
    validateTemplate: boolean;
    constructor(input: ChatPromptTemplateInput);
    _getPromptType(): "chat";
    format(values: InputValues): Promise<string>;
    formatPromptValue(values: InputValues): Promise<BasePromptValue>;
    serialize(): SerializedChatPromptTemplate;
    partial(_: PartialValues): Promise<BasePromptTemplate>;
    static fromPromptMessages(promptMessages: BaseMessagePromptTemplate[]): ChatPromptTemplate;
}
