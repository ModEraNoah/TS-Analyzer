import { Context } from "../Context";
import { Token } from "./Token"

export class ExportToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1

	constructor(startIdx: number) {
		this.name = "export name"
		this.startIdx = startIdx
	}

	public getTokenEnd(content: string): number {
		//TODO
		// return this.startIdx + 1
		this.endIdx = content.indexOf(" ", this.startIdx)
		return this.endIdx
	}

	public processToken(context: Context[], content: string): void {
		//TODO
		// throw new Error("Not implemented yet")
	}
}
