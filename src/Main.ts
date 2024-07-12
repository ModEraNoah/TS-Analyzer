import { ClassContext, Context, MainContext } from "./Context";
import { ClassToken } from "./token/ClassToken";
import { Token } from "./token/Token";
import { Tokenizer } from "./Tokenizer";

export class Main {
	private fileName: string;
	private fileContent: string;
	private tokenizer: Tokenizer;
	private context: MainContext;

	constructor(fileName: string, fileContent: string, tokenizer: Tokenizer) {
		this.fileName = fileName;
		this.fileContent = fileContent
		this.tokenizer = tokenizer;
		this.context = {
			context: "main",
			fileName: fileName,
			functions: [],
			classes: [],
			variables: []
		}
	}

	public main() {
		let currentCharIndex = 0;
		let currentToken: Token;

		// push classes, functions and variables into context
		while (currentCharIndex >= 0 && currentCharIndex < this.fileContent.length - 1) {
			currentToken = this.tokenizer.getNextToken(currentCharIndex, this.fileContent)

			let contextArray = this.getContextArrayToUse(currentToken)
			currentToken.processToken(contextArray, this.fileContent)

			currentCharIndex = currentToken.getTokenEnd(this.fileContent) + 1

			if (currentToken instanceof ClassToken) {
				this.processClass(currentToken)
			}

		}

	}

	private getContextArrayToUse(token: Token): Context[] {
		switch (token.constructor.name) {
			case "AccessModifyerToken":
				return this.context.classes
			case "AsyncToken":
			//
			case "ClassToken":
				return this.context.classes
			case "ExportToken":
			case "FunctionToken":
				return this.context.functions
			case "ImportToken":
			case "InterfaceToken":
			case "MlCommentToken":
			case "ObjectToken":
			case "SlCommentToken":
			case "UnkownToken":
			case "VariableToken":
			default:
				return []
		}

	}

	private processClass(currentToken: ClassToken) {
		const bodyStartIdx = this.fileContent.indexOf("{", currentToken.startIdx);
		const bodyEndIdx = currentToken.endIdx

		const classBody = this.fileContent.substring(bodyStartIdx + 1, bodyEndIdx)

		let currentCharIndex = 0;
		let subToken: Token;
		while (currentCharIndex >= 0 && currentCharIndex < classBody.length) {
			subToken = this.tokenizer.getNextToken(currentCharIndex, classBody)

			let contextArray = this.getContextArrayToUse(subToken)
			subToken.processToken(contextArray, classBody)

			currentCharIndex = subToken.getTokenEnd(classBody) + 1
		}
	}
}
