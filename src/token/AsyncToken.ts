import { Context } from "../Context";
import { Token } from "./Token";

export class AsyncToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "async";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		//TODO
		//throw new Error("Not implemented yet")
		const end = content.indexOf(" ", this.startIdx);
		this.endIdx = end;
		return end;
	}

	public processToken(context: Context[], content: string, previousToken: Token | undefined): void {
		//TODO
		// throw new Error("Not implemented yet")
	}
}
