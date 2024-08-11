import { Context } from "../Context";
import { getClosingBracketIndex, getRoundClosingBracketIndex } from "../util";
import { Token } from "./Token";

export class ConstructorToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "import name";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		if (this.endIdx !== -1) return this.endIdx;

		const openingBracketIdx = content.indexOf("(", this.startIdx);
		const closingBracketIdx = getRoundClosingBracketIndex(openingBracketIdx, content);

		const innerConstructorBegin = content.indexOf("{", closingBracketIdx);
		const constructorEnd = getClosingBracketIndex(innerConstructorBegin, content);
		this.endIdx = constructorEnd;
		return this.endIdx;
	}

	public processToken(context: Context[], content: string, previousToken: Token | undefined): void {
		//TODO
		// throw new Error("Not implemented yet")
	}
}
