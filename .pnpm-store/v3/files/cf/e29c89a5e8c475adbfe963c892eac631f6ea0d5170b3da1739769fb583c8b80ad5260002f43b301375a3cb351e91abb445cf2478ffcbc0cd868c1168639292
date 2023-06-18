import { BaseChain } from "../chains/index.js";
/**
 * A chain managing an agent using tools.
 * @augments BaseChain
 */
export class AgentExecutor extends BaseChain {
    get inputKeys() {
        return this.agent.inputKeys;
    }
    constructor(input) {
        super();
        Object.defineProperty(this, "agent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnIntermediateSteps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "maxIterations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15
        });
        Object.defineProperty(this, "earlyStoppingMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "force"
        });
        this.agent = input.agent;
        this.tools = input.tools;
        this.returnIntermediateSteps =
            input.returnIntermediateSteps ?? this.returnIntermediateSteps;
        this.maxIterations = input.maxIterations ?? this.maxIterations;
        this.earlyStoppingMethod =
            input.earlyStoppingMethod ?? this.earlyStoppingMethod;
    }
    /** Create from agent and a list of tools. */
    static fromAgentAndTools(fields) {
        return new AgentExecutor(fields);
    }
    shouldContinue(iterations) {
        return this.maxIterations === undefined || iterations < this.maxIterations;
    }
    async _call(inputs) {
        this.agent.prepareForNewCall();
        const toolsByName = Object.fromEntries(this.tools.map((t) => [t.name.toLowerCase(), t]));
        const steps = [];
        let iterations = 0;
        const getOutput = (finishStep) => {
            const { returnValues } = finishStep;
            if (this.returnIntermediateSteps) {
                return { ...returnValues, intermediateSteps: steps };
            }
            return returnValues;
        };
        while (this.shouldContinue(iterations)) {
            const action = await this.agent.plan(steps, inputs);
            if ("returnValues" in action) {
                return getOutput(action);
            }
            const tool = toolsByName[action.tool.toLowerCase()];
            const observation = tool
                ? await tool.call(action.toolInput)
                : `${action.tool} is not a valid tool, try another one.`;
            steps.push({ action, observation });
            if (tool?.returnDirect) {
                return getOutput({
                    returnValues: { [this.agent.returnValues[0]]: observation },
                    log: "",
                });
            }
            iterations += 1;
        }
        const finish = await this.agent.returnStoppedResponse(this.earlyStoppingMethod, steps, inputs);
        return getOutput(finish);
    }
    _chainType() {
        return "agent_executor";
    }
    serialize() {
        throw new Error("Cannot serialize an AgentExecutor");
    }
}
//# sourceMappingURL=executor.js.map