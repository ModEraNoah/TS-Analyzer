import { AttributeContext, ClassContext, Context } from "../Context";
import { getClosingBracketIndex } from "../util";
import { Token } from "./Token";

export class InterfaceToken implements Token {
	public name: string;
	public startIdx: number;
	public endIdx: number = -1;

	constructor(startIdx: number) {
		this.name = "interface";
		this.startIdx = startIdx;
	}

	public getTokenEnd(content: string): number {
		const interfaceStart = content.indexOf("{", this.startIdx);
		this.endIdx = getClosingBracketIndex(interfaceStart, content);
		return this.endIdx;
	}

	public processToken(context: Context[], content: string, previousToken: Token | undefined): void {
		const interfaceStart = content.indexOf("{", this.startIdx);
		const interfaceEnd = this.getTokenEnd(content);

		const interfaceSignature: string[] = content
			.substring(this.startIdx, interfaceStart)
			.trim()
			.split(" ")
			.filter((el) => el);
		const interfaceName = interfaceSignature[1];

		let interfaceParent: string = "";
		if (interfaceSignature.length > 2) {
			interfaceParent = interfaceSignature[3];
		}

		const interfaceContent: string[] = content
			.substring(interfaceStart + 1, interfaceEnd)
			.replaceAll(/(\/\/.*\n)/g, "")
			.replaceAll("\n", "")
			.split(";")
			.map((el) => el.trim().replaceAll("  ", "").replaceAll(",)", ")"))
			.filter((el) => el);
		let attributes: AttributeContext[] = this.getInterfaceAttributes(interfaceContent);

		context.push({
			context: "class",
			name: interfaceName,
			parent: interfaceParent,
			attributes: attributes,
			methods: [],
		});
	}

	private getInterfaceAttributes(interfaceContent: string[]): AttributeContext[] {
		const attributes: AttributeContext[] = [];
		for (const attribute of interfaceContent) {
			const [name, ...type] = attribute.split(":");
			const att: AttributeContext = {
				context: "variable",
				name: name.trim(),
				type: type.join(":").trim(),
				accessModifyer: "public",
			};
			attributes.push(att);
		}
		return attributes;
	}
}
