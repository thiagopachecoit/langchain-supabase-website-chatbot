import { BaseLanguageModel } from "../../schema/index.js";
import { Agent, Tool, AgentInput, SerializedAgentT } from "../index.js";
import { PromptTemplate } from "../../prompts/index.js";
type SerializedFromLLMAndTools = {
    suffix?: string;
    prefix?: string;
    input_variables?: string[];
};
export type SerializedZeroShotAgent = SerializedAgentT<"zero-shot-react-description", SerializedFromLLMAndTools, AgentInput>;
export type CreatePromptArgs = {
    /** String to put after the list of tools. */
    suffix?: string;
    /** String to put before the list of tools. */
    prefix?: string;
    /** List of input variables the final prompt will expect. */
    inputVariables?: string[];
};
type ZeroShotAgentInput = AgentInput;
/**
 * Agent for the MRKL chain.
 * @augments Agent
 * @augments StaticAgent
 */
export declare class ZeroShotAgent extends Agent {
    constructor(input: ZeroShotAgentInput);
    _agentType(): "zero-shot-react-description";
    observationPrefix(): string;
    llmPrefix(): string;
    static validateTools(tools: Tool[]): void;
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     * @param args.inputVariables - List of input variables the final prompt will expect.
     */
    static createPrompt(tools: Tool[], args?: CreatePromptArgs): PromptTemplate;
    static fromLLMAndTools(llm: BaseLanguageModel, tools: Tool[], args?: CreatePromptArgs): ZeroShotAgent;
    extractToolAndInput(text: string): {
        tool: string;
        input: string;
    } | null;
    static deserialize(data: SerializedZeroShotAgent & {
        llm?: BaseLanguageModel;
        tools?: Tool[];
    }): Promise<ZeroShotAgent>;
}
export {};
