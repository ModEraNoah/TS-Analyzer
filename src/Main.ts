import { ClassContext, Context, MainContext } from "./Context";
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
		while (currentCharIndex >= 0 && currentCharIndex < this.fileContent.length) {
			currentToken = this.tokenizer.getNextToken(currentCharIndex, this.fileContent)

			let context = this.getContextToUse(currentToken)
			currentToken.processToken(context, this.fileContent)

			currentCharIndex = currentToken.getTokenEnd(this.fileContent) + 1
		}

		// TODO: iterate through classes and functions ti recursively also resolve them
	}

	private getContextToUse(token: Token): Context {
		switch (token.constructor.name) {
			case "AccessModifyerToken":
			case "AsyncToken":
			//
			case "ClassToken":
				return this.context
			case "ExportToken":
			case "FunctionToken":
			case "ImportToken":
			case "InterfaceToken":
			case "MlCommentToken":
			case "ObjectToken":
			case "SlCommentToken":
			case "UnkownToken":
			case "VariableToken":
			default:
				return this.context
		}

	}

	private getLastClassContext(): ClassContext {
		if (this.context.classes.length > 0) {
			return this.context.classes[this.context.classes.length - 1]
		}
		throw new Error("No class context pushed to stack yet")
	}

}
