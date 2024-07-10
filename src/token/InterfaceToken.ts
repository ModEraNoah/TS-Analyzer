import { Context } from "../Context";
import { Token } from "./Token"

export class InterfaceToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1

	constructor(startIdx: number) {
		this.name = "interface"
		this.startIdx = startIdx
	}

	public getTokenEnd(content: string): number {
		//TODO
		throw new Error("Not implemented yet")
	}

	public processToken(context: Context, content: string): void {
		//TODO
		throw new Error("Not implemented yet")
	}
}
