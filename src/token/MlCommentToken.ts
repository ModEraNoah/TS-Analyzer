import { Context } from "../Context";
import { Token } from "./Token";

export class MlCommentToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "multi line comment";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		this.endIdx = content.indexOf("*/", this.startIdx) + 1;
		return this.endIdx;
	}

	public processToken(context: Context[], content: string): void {
		//
	}
}
