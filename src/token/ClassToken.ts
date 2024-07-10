import { Context, ClassContext } from "../Context";
import { getClosingBracketIndex } from "../util";
import { Token } from "./Token";


export class ClassToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "classname";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		let idx = content.indexOf("{", this.startIdx);
		return getClosingBracketIndex(idx, content);
	}

	public processToken(context: Context, content: string): void {
		if (context.context !== "main") throw new Error("Wrong context passed to ClassToken");

		let bracketIdx = content.indexOf("{", this.startIdx);
		const classSignature = content.substring(this.startIdx, bracketIdx);
		const splittedClassSignature: string[] = classSignature.split(" ").filter(el => el);
		const className = splittedClassSignature[1];
		let parent = "";

		if (splittedClassSignature.length > 2) {
			parent = splittedClassSignature[3];
		}

		const currentClassContext: ClassContext = {
			context: "class",
			name: className,
			parent: parent,
			attributes: [],
			methods: []
		};

		context.classes.push(currentClassContext);
	}
}

