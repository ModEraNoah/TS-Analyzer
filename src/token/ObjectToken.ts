import { Context } from "../Context";
import { getRoundClosingBracketIndex } from "../util";
import { Token } from "./Token";

export class ObjectToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "object name";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		//TODO
		//		throw new Error("Not implemented yet")
		if (this.endIdx != -1) return this.endIdx;
		const openingBracket = content.indexOf("(", this.startIdx);
		const closingBracket = getRoundClosingBracketIndex(openingBracket, content);
		this.endIdx = closingBracket;
		return closingBracket;
	}

	public processToken(context: Context[], content: string): void {
		//TODO
	}
}
