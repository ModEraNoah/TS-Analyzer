import { Context } from "../Context";
import { getClosingBracketIndex } from "../util";
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
		const interfaceStart = content.indexOf("{", this.startIdx)
		this.endIdx = getClosingBracketIndex(interfaceStart, content)
		return this.endIdx
	}

	public processToken(context: Context[], content: string): void {
		//TODO
	}
}
