import { Context } from "../Context";
import { Token } from "./Token";

export class SlCommentToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "single line comment";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		//TODO
		// throw new Error("Not implemented yet")
		if (this.endIdx !== -1) return this.endIdx;

		this.endIdx = content.indexOf("\n", this.startIdx);
		return this.endIdx;
	}

	public processToken(context: Context[], content: string, previousToken: Token | undefined): void {
		//TODO
		// throw new Error("Not implemented yet")
	}
}
