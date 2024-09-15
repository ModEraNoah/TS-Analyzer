import { Context, FunctionContext } from "../Context";
import { getClosingBracketIndex, getFunctionMetaData, getRoundClosingBracketIndex } from "../util";
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
		const paramsBracketIdx = content.indexOf("(", this.startIdx);
		const paramsClosingBracketIdx = getRoundClosingBracketIndex(paramsBracketIdx, content);

		const typeColonIdx = content.indexOf(":", paramsClosingBracketIdx);
		if (typeColonIdx === -1) {
			let idx = content.indexOf("{", this.startIdx);
			this.endIdx = getClosingBracketIndex(idx, content);
		} else {
			const openBracketIdx = content.indexOf("{", paramsClosingBracketIdx);
			const temp = content.substring(typeColonIdx + 1, openBracketIdx).trim();
			if (temp.length === 0) {
				const functionStartIdx = content.indexOf("{", getClosingBracketIndex(openBracketIdx, content));
				this.endIdx = getClosingBracketIndex(functionStartIdx, content);
			} else {
				let idx = content.indexOf("{", this.startIdx);
				this.endIdx = getClosingBracketIndex(idx, content);
			}
		}
		return this.endIdx;
	}

	public processToken(context: Context[], content: string, previousToken: Token | undefined): void {
		const { parameters, returnType, paramsOpeningBracketIdx } = getFunctionMetaData(content, this.startIdx);

		const functionName = content.substring(this.startIdx, paramsOpeningBracketIdx).split("function")[1].trim();

		let isAsync: boolean = false;
		if (previousToken) {
			isAsync = previousToken.constructor.name === "AsyncToken";
		}

		const currentFunctionContext: FunctionContext = {
			context: "function",
			name: functionName,
			parameters: parameters,
			return: returnType,
			async: isAsync,
		};

		context.push(currentFunctionContext);
	}
}
