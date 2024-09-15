import { AttributeContext, ClassContext, Context } from "../Context";
import { getClosingBracketIndex } from "../util";
import { Token } from "./Token";

export class TypeToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "type";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		const isObject: boolean =
			content
				.substring(content.indexOf("=", this.startIdx) + 1, content.indexOf("=", this.startIdx) + 20)
				.trimStart()
				.startsWith("{") && content.indexOf("&", this.startIdx) > content.indexOf(";", this.startIdx);

		if (isObject) {
			const interfaceStart = content.indexOf("{", this.startIdx);
			this.endIdx = getClosingBracketIndex(interfaceStart, content);
		} else {
			const nextSemi = content.indexOf(";", this.startIdx) > 0 ? content.indexOf(";", this.startIdx) : Infinity;
			const nextNewline =
				content.indexOf("\n", this.startIdx) > 0 ? content.indexOf("\n", this.startIdx) : Infinity;
			this.endIdx = Math.min(nextSemi, nextNewline);
		}
		return this.endIdx;
	}

	public processToken(context: Context[], content: string, previousToken: Token | undefined): void {
		const name = content.substring(this.startIdx, content.indexOf("=", this.startIdx)).trim().split(" ")[1].trim();
		this.getTokenEnd(content);
		const type = content.substring(content.indexOf("=", this.startIdx) + 1, this.endIdx);
		context.push({
			context: "class",
			name: name,
			parent: "",
			attributes: [
				{
					accessModifyer: "public",
					context: "variable",
					name: "type",
					type: type,
				},
			],
			methods: [],
		});
	}
}
