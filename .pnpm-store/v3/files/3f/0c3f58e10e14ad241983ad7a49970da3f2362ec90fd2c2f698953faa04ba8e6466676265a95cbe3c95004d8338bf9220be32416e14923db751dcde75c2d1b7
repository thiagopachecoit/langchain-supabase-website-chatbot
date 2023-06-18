/**
 * Class to parse the output of an LLM call.
 */
export class BaseOutputParser {
    /**
     * Return the string type key uniquely identifying this class of parser
     */
    _type() {
        throw new Error("_type not implemented");
    }
    /**
     * Load an output parser from a json-like object describing the parser.
     */
    static deserialize(data) {
        switch (data._type) {
            case "regex_parser":
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                return RegexParser.deserialize(data);
            default:
                throw new Error(`Unknown parser type: ${data._type}`);
        }
    }
}
/**
 * Class to parse the output of an LLM call to a list.
 * @augments BaseOutputParser
 */
export class ListOutputParser extends BaseOutputParser {
}
/**
 * Class to parse the output of an LLM call as a comma-separated list.
 * @augments ListOutputParser
 */
export class CommaSeparatedListOutputParser extends ListOutputParser {
    parse(text) {
        return text.trim().split(", ");
    }
    serialize() {
        return {
            _type: "comma_separated_list",
        };
    }
    static deserialize(_) {
        return new CommaSeparatedListOutputParser();
    }
}
/**
 * Class to parse the output of an LLM call into a dictionary.
 * @augments BaseOutputParser
 */
export class RegexParser extends BaseOutputParser {
    constructor(regex, outputKeys, defaultOutputKey) {
        super();
        Object.defineProperty(this, "regex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultOutputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.regex = regex;
        this.outputKeys = outputKeys;
        this.defaultOutputKey = defaultOutputKey;
    }
    _type() {
        return "regex_parser";
    }
    parse(text) {
        const match = text.match(this.regex);
        if (match) {
            return this.outputKeys.reduce((acc, key, index) => {
                acc[key] = match[index + 1];
                return acc;
            }, {});
        }
        if (this.defaultOutputKey === undefined) {
            throw new Error(`Could not parse output: ${text}`);
        }
        return this.outputKeys.reduce((acc, key) => {
            acc[key] = key === this.defaultOutputKey ? text : "";
            return acc;
        }, {});
    }
    serialize() {
        return {
            _type: "regex_parser",
            regex: typeof this.regex === "string" ? this.regex : this.regex.source,
            output_keys: this.outputKeys,
            default_output_key: this.defaultOutputKey,
        };
    }
    static deserialize(data) {
        return new RegexParser(data.regex, data.output_keys, data.default_output_key);
    }
}
//# sourceMappingURL=parser.js.map