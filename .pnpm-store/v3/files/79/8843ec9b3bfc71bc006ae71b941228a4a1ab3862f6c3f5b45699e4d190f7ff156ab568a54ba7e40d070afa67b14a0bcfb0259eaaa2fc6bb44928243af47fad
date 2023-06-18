import type { SerializedAgentT, AgentInput } from "./index.js";
import { Tool } from "./tools/index.js";
import { BaseLanguageModel } from "../schema/index.js";
export declare const deserializeHelper: <T extends string, U, V extends AgentInput, Z>(llm: BaseLanguageModel | undefined, tools: Tool[] | undefined, data: SerializedAgentT<T, U, V>, fromLLMAndTools: (llm: BaseLanguageModel, tools: Tool[], args: U) => Z, fromConstructor: (args: V) => Z) => Promise<Z>;
