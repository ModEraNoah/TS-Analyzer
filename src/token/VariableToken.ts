import { Context } from "../Context";
import { Token } from "./Token";

export class VariableToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "variable name";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		if (this.endIdx !== -1) return this.endIdx;
		let newlineIdx = content.indexOf("\n", this.startIdx) > 0 ? content.indexOf("\n", this.startIdx) : Infinity;
		let semicolonIdx = content.indexOf(";", this.startIdx) > 0 ? content.indexOf(";", this.startIdx) : Infinity;
		let idx = Math.min(newlineIdx, semicolonIdx);
		this.endIdx = idx;
		return this.endIdx;
	}

	public processToken(context: Context[], content: string, previousToken: Token | undefined): void {
		//TODO
		//throw new Error("Not implemented yet")
	}
}
