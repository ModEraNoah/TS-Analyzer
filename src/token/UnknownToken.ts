import { ClassContext, Context } from "../Context";
import { Token } from "./Token";

export class UnknownToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "async";
		this.startIdx = startIdx;
		this.endIdx = -1;
	}

	public getTokenEnd(content: string): number {
		if (this.endIdx !== -1) return this.endIdx;
		return this.startIdx + 1;
	}

	public processToken(
		context: Context[],
		content: string,
		previousToken: Token | undefined,
		isClass?: boolean,
	): void {
		if (isClass) {
			this.endIdx = content.indexOf(";", this.startIdx);
			//TODO: wenn funktion ohne accessmodifyer, dann nicht nach ";" suchen, sondern ob { vor ; kommt und ob vielleicht kein ";" vorkommt sondern newline
			if (this.endIdx === -1) return;

			const substring = content.substring(this.startIdx, this.endIdx);
			const [name, ...type] = substring
				.trim()
				.split(":")
				.filter((el) => el);
			const co = context as ClassContext[];
			co[co.length - 1].attributes.push({
				context: "variable",
				name: name,
				type: type.join(":"),
				accessModifyer: "public",
			});
		} else {
			//TODO
			console.error("unknown token with startIdx", this.startIdx, ":", content[this.startIdx]);
		}
	}
}
