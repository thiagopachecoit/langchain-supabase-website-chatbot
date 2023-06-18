import { BaseChain, ChainValues } from "../base.js";
import { BaseMemory } from "../../memory/index.js";
import { BaseLLM, SerializedLLM } from "../../llms/index.js";
import { SqlDatabase } from "../../sql_db.js";
import { SerializedSqlDatabase } from "../../util/sql_utils.js";
export type SerializedSqlDatabaseChain = {
    sql_database: SerializedSqlDatabase;
    _type: "sql_database_chain";
    llm: SerializedLLM;
    sql_database_chain_path?: string;
};
export declare class SqlDatabaseChain extends BaseChain {
    llm: BaseLLM;
    database: SqlDatabase;
    prompt: import("../../index.js").PromptTemplate;
    topK: number;
    inputKey: string;
    outputKey: string;
    returnDirect: boolean;
    constructor(fields: {
        llm: BaseLLM;
        database: SqlDatabase;
        inputKey?: string;
        outputKey?: string;
        memory?: BaseMemory;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): "sql_database_chain";
    get inputKeys(): string[];
    static deserialize(data: SerializedSqlDatabaseChain): Promise<SqlDatabaseChain>;
    serialize(): SerializedSqlDatabaseChain;
}
