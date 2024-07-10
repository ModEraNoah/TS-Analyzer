import { ClassContext, Context } from "../Context";
import { getClosingBracketIndex } from "../util";

export interface Token {
	name: string;
	startIdx: number;
	endIdx: number;
	getTokenEnd: (content: string) => number;
	processToken: (context: Context, content: string) => void
}

export class ClassToken implements Token {
	public name: string
	public startIdx: number
	public endIdx: number = -1

	constructor(startIdx: number) {
		this.name = "classname"
		this.startIdx = startIdx
	}

	public getTokenEnd(content: string): number {
		let idx = content.indexOf("{", this.startIdx)
		return getClosingBracketIndex(idx, content)
	}

	public processToken(context: Context, content: string): void {
		if (context.context !== "main") throw new Error("Wrong context passed to ClassToken")

		let bracketIdx = content.indexOf("{", this.startIdx)
		const classSignature = content.substring(this.startIdx, bracketIdx)
		const splittedClassSignature: string[] = classSignature.split(" ").filter(el => el)
		const className = splittedClassSignature[1]
		let parent = ""

		if (splittedClassSignature.length > 2) {
			parent = splittedClassSignature[3]
		}

		const currentClassContext: ClassContext = {
			context: "class",
			name: className,
			parent: parent,
			attributes: [],
			methods: []
		}

		context.classes.push(currentClassContext)
	}
}

export class AccessModifyerToken implements Token {
	public name: string
	public startIdx: number
	public endIdx: number = -1
	private type: "method" | "attribute" = "attribute"

	constructor(startIdx: number) {
		this.name = "classname"
		this.startIdx = startIdx
	}

	public getTokenEnd(content: string): number {
		return 0
	}

	public processToken(context: Context, content: string): void {
		if (context.context !== "class") throw new Error("Wrong context passed to ClassToken")
		this.specifyType(content)

		if (this.type === "method") {
			const bracketIdx = content.indexOf("{", this.startIdx)
			const methodSignature = content.substring(this.startIdx, bracketIdx)
		} else {
			//attribute
		}
	}

	private specifyType(content: string) {
		let nextAssignment = content.indexOf("=", this.startIdx)
		let nextBracket = content.indexOf("(", this.startIdx)
		let nextSemicolon = content.indexOf(";", this.startIdx)

		nextAssignment = nextAssignment === -1 ? Infinity : nextAssignment
		nextBracket = nextBracket === -1 ? Infinity : nextBracket
		nextSemicolon = nextSemicolon === -1 ? Infinity : nextSemicolon

		if (nextSemicolon < nextAssignment && nextSemicolon < nextBracket) {
			this.type = "attribute"
		} else if (nextAssignment < nextBracket) {
			this.type = "attribute"
		} else {
			this.type = "method"
		}
	}
}
