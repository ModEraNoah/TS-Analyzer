import { AttributeContext, ClassContext, Context, MethodContext } from "../Context";
import { getClosingBracketIndex, getFunctionMetaData } from "../util";
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
			// remove comments out of interface
			.replaceAll(/(\/\/.*\n)/g, "")
			.replaceAll("\n", "")
			.split(";")
			.map((el) => el.trim().replaceAll("  ", "").replaceAll(",)", ")"))
			.filter((el) => el);
		let { attributes, methods } = this.getInterfaceAttributesAndMethods(interfaceContent);

		context.push({
			context: "class",
			name: interfaceName,
			parent: interfaceParent,
			attributes: attributes,
			methods: methods,
		});
	}

	private getInterfaceAttributesAndMethods(interfaceContent: string[]): {
		attributes: AttributeContext[];
		methods: MethodContext[];
	} {
		const attributes: AttributeContext[] = [];
		const methods: MethodContext[] = [];
		for (const attribute of interfaceContent) {
			if (this.isMethod(attribute)) {
				const { parameters, returnType } = getFunctionMetaData(attribute, 0);
				const [name] = attribute.split("(");
				const method: MethodContext = {
					context: "function",
					name: name,
					parameters: parameters,
					return: returnType,
					async: attribute.trim().startsWith("async"),
					accessModifyer: "public",
				};
				methods.push(method);
			} else {
				const [name, ...type] = attribute.split(":");
				const att: AttributeContext = {
					context: "variable",
					name: name.trim(),
					type: type.join(":").trim(),
					accessModifyer: "public",
				};
				attributes.push(att);
			}
		}
		return { attributes, methods };
	}

	private isMethod(attribute: string): boolean {
		const nextRoundBracketIdx: number = attribute.indexOf("(");
		if (nextRoundBracketIdx !== -1 && nextRoundBracketIdx < attribute.indexOf(":")) {
			return true;
		}

		return false;
	}
}
