import { Context, FunctionContext } from "../Context";
import { getClosingBracketIndex, getFunctionMetaData } from "../util";
import { Token } from "./Token";

export class FunctionToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "function name";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		let idx = content.indexOf("{", this.startIdx);
		this.endIdx = getClosingBracketIndex(idx, content);
		return this.endIdx;
	}

	public processToken(context: Context[], content: string): void {
		const { parameters, returnType, paramsOpeningBracketIdx } = getFunctionMetaData(content, this.startIdx);

		const functionName = content.substring(this.startIdx, paramsOpeningBracketIdx).split("function")[1].trim();

		const currentFunctionContext: FunctionContext = {
			context: "function",
			name: functionName,
			parameters: parameters,
			return: returnType,
		};

		context.push(currentFunctionContext);
	}
}
