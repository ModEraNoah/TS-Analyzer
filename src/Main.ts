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

		while (currentCharIndex >= 0 && currentCharIndex < this.fileContent.length) {
			currentToken = this.tokenizer.getNextToken(currentCharIndex, this.fileContent)

			let context = this.getContextToUse(currentToken)
			currentToken.processToken(context, this.fileContent)

			currentCharIndex = currentToken.endIdx + 1
		}
	}

	private getContextToUse(token: Token): Context {
		switch (token.constructor.name) {
			case "ClassToken":
				return this.context
			case "AccessModifyerToken":
				return this.getLastClassContext()
			default:
				return this.context
		}

	}

	private getLastClassContext(): ClassContext {
		return this.context.classes[this.context.classes.length - 1]
	}

}
