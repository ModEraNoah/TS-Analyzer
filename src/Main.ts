import { ClassContext, Context, MainContext } from "./Context";
import { ClassToken } from "./token/ClassToken";
import { Token } from "./token/Token";
import { UnknownToken } from "./token/UnknownToken";
import { Tokenizer } from "./Tokenizer";

export class Main {
	private fileName: string;
	private fileContent: string;
	private tokenizer: Tokenizer;
	private context: MainContext;

	constructor(fileName: string, fileContent: string, tokenizer: Tokenizer) {
		this.fileName = fileName;
		this.fileContent = fileContent;
		this.tokenizer = tokenizer;
		this.context = {
			context: "main",
			fileName: fileName,
			functions: [],
			classes: [],
			variables: [],
		};
	}

	public main() {
		let currentCharIndex = 0;
		let currentToken: Token;
		let previousToken: Token | undefined = undefined;

		// push classes, functions and variables into context
		while (currentCharIndex >= 0 && currentCharIndex < this.fileContent.length - 1) {
			currentToken = this.tokenizer.getNextToken(currentCharIndex, this.fileContent);

			let contextArray = this.getContextArrayToUse(currentToken);
			currentToken.processToken(contextArray, this.fileContent, previousToken);

			currentCharIndex = currentToken.getTokenEnd(this.fileContent) + 1;

			if (currentToken instanceof ClassToken) {
				this.processClass(currentToken);
			}
			previousToken = currentToken;
		}
	}

	private getContextArrayToUse(token: Token): Context[] {
		switch (token.constructor.name) {
			case "AccessModifyerToken":
				return this.context.classes;
			case "AsyncToken":
			//
			case "ClassToken":
			case "InterfaceToken":
			case "UnknownToken":
				return this.context.classes;
			case "ExportToken":
			case "FunctionToken":
				return this.context.functions;
			case "ImportToken":
			case "MlCommentToken":
			case "ObjectToken":
			case "SlCommentToken":
			case "VariableToken":
			default:
				return [];
		}
	}

	private processClass(currentToken: ClassToken) {
		const bodyStartIdx = this.fileContent.indexOf("{", currentToken.startIdx);
		const bodyEndIdx = currentToken.endIdx;

		const classBody = this.fileContent.substring(bodyStartIdx + 1, bodyEndIdx);

		let currentCharIndex = 0;
		let subToken: Token;
		let previousSubToken: Token | undefined = undefined;
		while (currentCharIndex >= 0 && currentCharIndex < classBody.length) {
			subToken = this.tokenizer.getNextToken(currentCharIndex, classBody);

			let contextArray = this.getContextArrayToUse(subToken);
			if (subToken.constructor.name === "UnknownToken") {
				const unknownToken = subToken as UnknownToken;
				unknownToken.processToken(contextArray, classBody, previousSubToken, true);
			} else {
				subToken.processToken(contextArray, classBody, previousSubToken);
			}

			currentCharIndex = subToken.getTokenEnd(classBody) + 1;
			previousSubToken = subToken;
		}
	}
}
