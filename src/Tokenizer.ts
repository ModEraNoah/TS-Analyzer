import { Token } from "./token/Token";
import { ClassToken } from "./token/ClassToken";
import { ImportToken } from "./token/ImportToken";
import { ExportToken } from "./token/ExportToken";
import { FunctionToken } from "./token/FunctionToken";
import { SlCommentToken } from "./token/SlCommentToken";
import { MlCommentToken } from "./token/MlCommentToken";
import { AccessModifyerToken } from "./token/AccessModifyerToken";
import { VariableToken } from "./token/VariableToken";
import { ObjectToken } from "./token/ObjectToken";
import { AsyncToken } from "./token/AsyncToken";
import { UnknownToken } from "./token/UnknownToken";
import { WhitespaceToken } from "./token/WhitespaceToken";
import { ConstructorToken } from "./token/Constructor";
import { InterfaceToken } from "./token/InterfaceToken";
import { TypeToken } from "./token/TypeToken";
import { AbstractToken } from "./token/AbstractToken";

export interface ITokenizer {
	getNextToken: (currentIndex: number, content: string) => Token;
}

export class Tokenizer implements ITokenizer {
	constructor() {}

	public getNextToken(currentIndex: number, content: string): Token {
		const nextWordStart: number = this.getNextWordStartIdx(currentIndex, content);
		let nextWordEnd: number = this.getNextWordEndIdx(nextWordStart, content);

		if (nextWordEnd === -1) nextWordEnd = content.length;

		const currentWord = content.substring(nextWordStart, nextWordEnd);
		if (currentWord.startsWith("/**")) return new MlCommentToken(nextWordStart);
		switch (currentWord) {
			case "import":
				return new ImportToken(nextWordStart);
			case "export":
				return new ExportToken(nextWordStart);
			case "class":
				return new ClassToken(nextWordStart);
			case "function":
				return new FunctionToken(nextWordStart);
			case "//":
				return new SlCommentToken(nextWordStart);
			case "/**":
			case "/*":
				return new MlCommentToken(nextWordStart);
			case "public":
			case "private":
			case "protected":
				return new AccessModifyerToken(nextWordStart);
			case "var":
			case "const":
			case "let":
				return new VariableToken(nextWordStart);
			case "new":
				return new ObjectToken(nextWordStart);
			case "async":
				return new AsyncToken(nextWordStart);
			case " ":
				return new WhitespaceToken(nextWordStart);
			case "constructor":
				return new ConstructorToken(nextWordStart);
			case "interface":
				return new InterfaceToken(nextWordStart);
			case "type":
				return new TypeToken(nextWordStart);
			case "abstract":
				return new AbstractToken(nextWordStart);
			default:
				return new UnknownToken(nextWordStart);
		}
	}

	/**
	 * Returns the index of the next word (0-based index)
	 * If the index is out of bounce, the method returns __-1__
	 */
	private getNextWordStartIdx(currentIndex: number, content: string): number {
		if (currentIndex >= content.length) return -1;

		while (this.isWhitespace(content[currentIndex])) {
			currentIndex++;
		}
		return currentIndex;
	}

	private getNextWordEndIdx(currentIndex: number, content: string): number {
		if (currentIndex >= content.length) return -1;
		do {
			if (currentIndex >= content.length) break;
			currentIndex++;
		} while (!this.isWhitespace(content[currentIndex]) && content[currentIndex] !== "(");
		return currentIndex;
	}

	private isWhitespace(character: string): boolean {
		return (
			character === " " || character === "\n" || character === "\r" || character === "\r\n" || character === "\t"
		);
	}
}
