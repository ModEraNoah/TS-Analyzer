import { Context } from "../Context";
import { Token } from "./Token"

export class UnknownToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1

	constructor(startIdx: number) {
		this.name = "async"
		this.startIdx = startIdx
		this.endIdx =
			this.startIdx + 1
	}

	public getTokenEnd(content: string): number {
		return this.startIdx + 1
	}

	public processToken(context: Context[], content: string): void {
		//TODO
		console.error("unknown token with startIdx", this.startIdx)
	}
}
