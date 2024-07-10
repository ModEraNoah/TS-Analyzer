import { ClassToken, Token } from "./token/Token";

export interface ITokenizer {
	getNextToken: (currentIndex: number, content: string) => Token
}

export class Tokenizer implements ITokenizer {

	constructor() {
	}

	public getNextToken(currentIndex: number, content: string): Token {
		const nextWordStart: number = this.getNextWordStartIdx(currentIndex, content)
		const nextWordEnd: number = this.getNextWordEndIdx(currentIndex, content)

		const currentWord = content.substring(nextWordStart, nextWordEnd)
		switch (currentWord) {
			case "import":
				return new ImportToken(nextWordStart)
			case "export":
				return new ExportToken(nextWordStart)
			case "class":
				return new ClassToken(nextWordStart)
			case "function":
				return new FunctionToken(nextWordStart)
			case "//":
				return new SlCommentToken(nextWordStart)
			case "/*":
				return new MlCommentToken(nextWordStart)
			case "public":
			case "private":
			case "protected":
				return new AccessModifyerToken(nextWordStart)
			case "var":
			case "const":
			case "let":
				return new VariableToken(nextWordStart)
			case "new":
				return new ObjectToken(nextWordStart)
			case "async":
				return new AsyncToken(nextWordStart)
			default:
				return new UnknownToken(nextWordStart)
		}
	}


	/**
	* Returns the index of the next word (0-based index)
	* If the index is out of bounce, the method returns __-1__
	*/
	private getNextWordStartIdx(currentIndex: number, content: string): number {
		if (currentIndex >= content.length) return -1

		while (this.isWhitespace(content[currentIndex])) {
			currentIndex++
		}
		return currentIndex
	}

	private getNextWordEndIdx(currentIndex: number, content: string): number {
		if (currentIndex >= content.length) return -1
		do {
			if (currentIndex >= content.length) break;
			currentIndex++
		}
		while (!this.isWhitespace(content[currentIndex]))
		return currentIndex
	}

	private isWhitespace(character: string): boolean {
		return character === " " || character === "\n" || character === "\r" || character === "\r\n"
	}
}
