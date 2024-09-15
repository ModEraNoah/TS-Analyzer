import { ClassContext, Context, MethodContext } from "../Context";
import { getClosingBracketIndex, getFunctionMetaData } from "../util";
import { Token } from "./Token";

export class UnknownToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "async";
		this.startIdx = startIdx;
		this.endIdx = -1;
	}

	public getTokenEnd(content: string): number {
		if (this.endIdx !== -1) return this.endIdx;
		return this.startIdx + 1;
	}

	public processToken(
		context: Context[],
		content: string,
		previousToken: Token | undefined,
		isClass?: boolean,
	): void {
		if (isClass) {
			const nextSemiColon: number =
				content.indexOf(";", this.startIdx) !== -1 ? content.indexOf(";", this.startIdx) : Infinity;
			const nextBracket: number =
				content.indexOf("(", this.startIdx) !== -1 ? content.indexOf("(", this.startIdx) : Infinity;
			//const nextColon: number =content.indexOf(":", this.startIdx) !== -1 ? content.indexOf(":", this.startIdx) : Infinity;

			if (nextSemiColon < nextBracket) {
				this.endIdx = nextSemiColon;
				const substring = content.substring(this.startIdx, this.endIdx);
				const [name, ...type] = substring
					.trim()
					.split(":")
					.filter((el) => el);
				const co = context as ClassContext[];
				co[co.length - 1].attributes.push({
					context: "variable",
					name: name,
					type: type.join(":"),
					accessModifyer: "public",
				});
			} else if (nextSemiColon != Infinity && nextBracket != Infinity) {
				// is a method
				this.handleMethod(content, context);
				this.endIdx = getClosingBracketIndex(content.indexOf("{", this.startIdx), content);
			} else {
				//this.endIdx =
				//TODO: wenn funktion ohne accessmodifyer, dann nicht nach ";" suchen, sondern ob { vor ; kommt und ob vielleicht kein ";" vorkommt sondern newline
				if (this.endIdx === -1) return;
			}
		} else {
			//TODO
			console.error(
				"unknown token with startIdx",
				this.startIdx,
				":",
				content[this.startIdx],
				"previous token:",
				previousToken,
			);
		}
	}

	private handleMethod(content: string, context: Context[]) {
		const { parameters, returnType, paramsOpeningBracketIdx } = getFunctionMetaData(content, this.startIdx);

		const fullFunctionName: string[] = content.substring(this.startIdx, paramsOpeningBracketIdx).trim().split(" ");
		let accessModifyer = "";
		for (let i = 0; i < fullFunctionName.length - 1; i++) {
			accessModifyer += fullFunctionName[i] + " ";
		}
		if (accessModifyer.length === 0) accessModifyer = "public";

		let functionName = fullFunctionName[fullFunctionName.length - 1];

		const isAsync: boolean = fullFunctionName.indexOf("async") !== -1;

		const currentMethodContext: MethodContext = {
			context: "function",
			name: functionName,
			parameters: parameters,
			return: returnType,
			accessModifyer: accessModifyer.trim(),
			async: isAsync,
		};

		let co = context as ClassContext[];
		co[co.length - 1].methods.push(currentMethodContext);
	}
}
