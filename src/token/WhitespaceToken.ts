import { Context } from "../Context";
import { Token } from "./Token";

export class WhitespaceToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "variable name";
		this.startIdx = startIdx;
		this.endIdx = startIdx + 1;
	}

	public getTokenEnd(content: string): number {
		return this.endIdx;
	}

	public processToken(context: Context[], content: string): void {
		// EOF
	}
}
