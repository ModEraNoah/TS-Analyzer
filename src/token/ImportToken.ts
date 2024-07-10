import { Context } from "../Context";
import { Token } from "./Token";

export class ImportToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1

	constructor(startIdx: number) {
		this.name = "import name"
		this.startIdx = startIdx
	}

	public getTokenEnd(content: string): number {
		//TODO
		return -1
	}

	public processToken(context: Context, content: string): void {
		//TODO
		throw new Error("Not implemented yet")
	}
}
