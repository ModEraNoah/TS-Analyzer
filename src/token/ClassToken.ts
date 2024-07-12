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
		if (this.endIdx !== -1) return this.endIdx;

		let idx = content.indexOf("{", this.startIdx);
		let closingIdx = getClosingBracketIndex(idx, content);
		this.endIdx = closingIdx// + 1
		return this.endIdx
	}

	public processToken(context: Context[], content: string): void {

		const openingBracketIdx = content.indexOf("{", this.startIdx);
		const closingBracketIdx = this.getTokenEnd(content)
		this.endIdx = closingBracketIdx

		const [className, parent] = this.processClassSignature(content, openingBracketIdx)

		const currentClassContext: ClassContext = {
			context: "class",
			name: className,
			parent: parent,
			attributes: [],
			methods: []
		};

		context.push(currentClassContext);
	}

	private processClassSignature(content: string, openingBracketIdx: number): [className: string, parent: string] {
		const classSignature = content.substring(this.startIdx, openingBracketIdx);
		const splittedClassSignature: string[] = classSignature.split(" ").filter(el => el);
		const className = splittedClassSignature[1];

		let parent = "";

		if (splittedClassSignature.length > 2) {
			parent = splittedClassSignature[3];
		}

		return [className, parent]
	}
}

