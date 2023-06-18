import { AgentExecutor } from "./executor.js";
import { ZeroShotAgent } from "./mrkl/index.js";
import { ChatAgent } from "./chat/index.js";
export const initializeAgentExecutor = async (tools, llm, agentType = "zero-shot-react-description") => {
    switch (agentType) {
        case "zero-shot-react-description":
            return AgentExecutor.fromAgentAndTools({
                agent: ZeroShotAgent.fromLLMAndTools(llm, tools),
                tools,
                returnIntermediateSteps: true,
            });
        case "chat-zero-shot-react-description":
            return AgentExecutor.fromAgentAndTools({
                agent: ChatAgent.fromLLMAndTools(llm, tools),
                tools,
                returnIntermediateSteps: true,
            });
        default:
            throw new Error("Unknown agent type");
    }
};
//# sourceMappingURL=initialize.js.map