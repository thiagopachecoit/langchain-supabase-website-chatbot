import { csvParse } from "d3-dsv";
import { TextLoader } from "./text.js";
export class CSVLoader extends TextLoader {
    constructor(filePath, column) {
        super(filePath);
        Object.defineProperty(this, "column", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: column
        });
    }
    async parse(raw) {
        const parsed = csvParse(raw.trim());
        if (!parsed.columns.includes(this.column)) {
            throw new Error(`Column ${this.column} not found in CSV file.`);
        }
        // Note TextLoader will raise an exception if the value is null.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return parsed.map((row) => row[this.column]);
    }
}
//# sourceMappingURL=csv.js.map