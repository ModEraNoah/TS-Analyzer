import { Context } from "../Context";
import { Token } from "./Token";


export class AccessModifyerToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;
	private type: "method" | "attribute" = "attribute";

	constructor(startIdx: number) {
		this.name = "classname";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		return 0;
	}

	public processToken(context: Context, content: string): void {
		if (context.context !== "class") throw new Error("Wrong context passed to ClassToken");
		this.specifyType(content);

		if (this.type === "method") {
			const bracketIdx = content.indexOf("{", this.startIdx);
			const methodSignature = content.substring(this.startIdx, bracketIdx);
		} else {
			//attribute
		}
	}

	private specifyType(content: string) {
		let nextAssignment = content.indexOf("=", this.startIdx);
		let nextBracket = content.indexOf("(", this.startIdx);
		let nextSemicolon = content.indexOf(";", this.startIdx);

		nextAssignment = nextAssignment === -1 ? Infinity : nextAssignment;
		nextBracket = nextBracket === -1 ? Infinity : nextBracket;
		nextSemicolon = nextSemicolon === -1 ? Infinity : nextSemicolon;

		if (nextSemicolon < nextAssignment && nextSemicolon < nextBracket) {
			this.type = "attribute";
		} else if (nextAssignment < nextBracket) {
			this.type = "attribute";
		} else {
			this.type = "method";
		}
	}
}

