import { Context, FunctionContext, VariableContext } from "../Context";
import { getClosingBracketIndex } from "../util";
import { Token } from "./Token"

export class FunctionToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1

	constructor(startIdx: number) {
		this.name = "function name"
		this.startIdx = startIdx
	}

	public getTokenEnd(content: string): number {
		let idx = content.indexOf("{", this.startIdx);
		return getClosingBracketIndex(idx, content);
	}


	public processToken(context: Context, content: string): void {
		if (context.context !== "main") throw new Error("Wrong context passed to ClassToken");

		let bracketIdx = content.indexOf("{", this.startIdx);

		const functionSignature = content.substring(this.startIdx, bracketIdx);

		const paramsOpeningBracketIdx = functionSignature.indexOf("(")
		const paramsClosingBracketIdx = functionSignature.lastIndexOf(")")
		const paramsString = functionSignature.substring(paramsOpeningBracketIdx + 1, paramsClosingBracketIdx)
		const paramsArray = paramsString.split(",")

		const parameters: VariableContext[] = []

		for (const param of paramsArray) {
			const p = param.split(":", 1)

			parameters.push({
				context: "variable",
				name: p[0],
				type: p[1]
			})
		}

		const functionName = functionSignature.substring(0, paramsOpeningBracketIdx).split("function")[1].trim()

		const returnType = (functionSignature.substring(paramsClosingBracketIdx + 1) ?? "void").trim()

		const currentFunctionContext: FunctionContext = {
			context: "function",
			name: functionName,
			parameters: parameters,
			return: returnType
		};

		context.functions.push(currentFunctionContext);
	}
}
