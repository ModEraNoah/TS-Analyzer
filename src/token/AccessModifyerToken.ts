import { AttributeContext, ClassContext, Context, MethodContext } from "../Context";
import { getClosingBracketIndex, getFunctionMetaData } from "../util";
import { Token } from "./Token";


export class AccessModifyerToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;
	private type: "method" | "attribute" = "attribute";

	constructor(startIdx: number) {
		this.name = "classname";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		if (this.type === "method") {
			let idx = content.indexOf("{", this.startIdx);
			this.endIdx = getClosingBracketIndex(idx, content);
			return this.endIdx
		} else {
			let newlineIdx = content.indexOf("\n", this.startIdx) > 0 ? content.indexOf("\n", this.startIdx) : Infinity
			let semicolonIdx = content.indexOf(";", this.startIdx) > 0 ? content.indexOf(";", this.startIdx) : Infinity
			let idx = Math.min(newlineIdx, semicolonIdx)
			this.endIdx = idx
			return this.endIdx
		}
	}

	public processToken(context: Context[], content: string): void {

		this.specifyType(content);

		if (this.type === "method") {
			this.handleMethod(context, content)
		} else {
			this.handleVariable(context, content)
		}
	}

	private specifyType(content: string) {
		let nextAssignment = content.indexOf("=", this.startIdx);
		let nextBracket = content.indexOf("(", this.startIdx);
		let nextSemicolon = content.indexOf(";", this.startIdx);

		nextAssignment = nextAssignment === -1 ? Infinity : nextAssignment;
		nextBracket = nextBracket === -1 ? Infinity : nextBracket;
		nextSemicolon = nextSemicolon === -1 ? Infinity : nextSemicolon;

		if (nextSemicolon < nextAssignment && nextSemicolon < nextBracket) {
			this.type = "attribute";
		} else if (nextAssignment < nextBracket) {
			this.type = "attribute";
		} else {
			this.type = "method";
		}
	}

	private handleMethod(context: Context[], content: string) {
		const { parameters, returnType, paramsOpeningBracketIdx } = getFunctionMetaData(content, this.startIdx)

		const fullFunctionName = content.substring(this.startIdx, paramsOpeningBracketIdx).trim().split(" ")
		let accessModifyer = ""
		for (let i = 0; i < fullFunctionName.length - 1; i++) accessModifyer += (fullFunctionName[i] + " ")

		let functionName = fullFunctionName[fullFunctionName.length - 1]


		const currentMethodContext: MethodContext = {
			context: "function",
			name: functionName,
			parameters: parameters,
			return: returnType,
			accessModifyer: accessModifyer.trim()
		};

		let co = context as ClassContext[]
		co[co.length - 1].methods.push(currentMethodContext);
	}

	private handleVariable(context: Context[], content: string) {
		const equalSign = content.indexOf("=", this.startIdx) > 0 ? content.indexOf("=", this.startIdx) : Infinity
		const semiColon = content.indexOf(";", this.startIdx) > 0 ? content.indexOf(";", this.startIdx) : Infinity
		const attributeSignatureEnd = Math.min(equalSign, semiColon)

		const colon = content.indexOf(":", this.startIdx)
		const bracket = content.indexOf("{", this.startIdx)

		let attName = ""
		let attType = "any"
		let accessModifyer = ""
		// if has type annotation and is not an object
		if (colon !== -1 && colon < bracket && colon < attributeSignatureEnd) {
			const fullAttName = content.substring(this.startIdx, colon).trim().split(" ")
			for (let i = 0; i < fullAttName.length - 1; i++) accessModifyer += (fullAttName[i] + " ")

			attName = fullAttName[fullAttName.length - 1]
			attType = content.substring(colon + 1, attributeSignatureEnd)

			//does not have type annotation and but initialisation
		} else {
			const fullAttName = content.substring(this.startIdx, colon).trim().split(" ")
			for (let i = 0; i < fullAttName.length - 1; i++) accessModifyer += (fullAttName[i] + " ")

			attName = fullAttName[fullAttName.length - 1]
		}

		const currentAttributeContext: AttributeContext = {
			context: "variable",
			name: attName.trim(),
			type: attType.trim(),
			accessModifyer: accessModifyer.trim()
		}
		let co = context as ClassContext[]
		co[co.length - 1].attributes.push(currentAttributeContext)
	}
}

