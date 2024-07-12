import { Context, FunctionContext, VariableContext } from "../Context";
import { getClosingBracketIndex, getRoundClosingBracketIndex } from "../util";
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
		this.endIdx = getClosingBracketIndex(idx, content);
		return this.endIdx
	}


	public processToken(context: Context[], content: string): void {

		const paramsOpeningBracketIdx = content.indexOf("(", this.startIdx)
		const paramsClosingBracketIdx = getRoundClosingBracketIndex(paramsOpeningBracketIdx, content)
		const paramsString = content.substring(paramsOpeningBracketIdx + 1, paramsClosingBracketIdx)


		let returnType = ""

		// if not '): someType ...' ==> if it is of scheme ') {console.log(...)}'
		if (content.substring(paramsClosingBracketIdx + 1, content.indexOf("{", paramsClosingBracketIdx)).trim()[0] !== ":") {
			returnType = "any"
			// :   {key: value} {console.log} => takes substring from : (+1) until the first {key => '   '
		} else if (content.substring(content.indexOf(":", paramsClosingBracketIdx) + 1, content.indexOf("{", paramsClosingBracketIdx)).trim().length === 0) {
			// return type is object
			const typeOpeningBracket = content.indexOf("{", paramsClosingBracketIdx)
			const typeClosingBracket = getClosingBracketIndex(typeOpeningBracket, content)

			returnType = content.substring(typeOpeningBracket, content.indexOf("{", typeClosingBracket)).trim()
			// : someTypeNotObject {console.log}
		} else {
			// return type is not object
			returnType = content.substring(content.indexOf(":", paramsClosingBracketIdx) + 1, content.indexOf("{", paramsClosingBracketIdx)).trim()
		}

		const parameters: VariableContext[] = []

		if (paramsString.length > 0) {
			const paramsArray = paramsString.split(",")

			for (const param of paramsArray) {
				// desctructor to seperate the first part from all others - later on, the rest (pr) will be joined by ":"
				const [p1, ...pr] = param.split(":")

				parameters.push({
					context: "variable",
					name: p1.trim(),
					type: pr.join(":").trim()
				})
			}
		}

		const functionName = content.substring(this.startIdx, paramsOpeningBracketIdx).split("function")[1].trim()


		const currentFunctionContext: FunctionContext = {
			context: "function",
			name: functionName,
			parameters: parameters,
			return: returnType
		};

		context.push(currentFunctionContext);
	}
}
