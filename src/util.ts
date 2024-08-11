import { Command } from "commander";
import { VariableContext } from "./Context";

export function getClosingBracketIndex(startIndex: number, content: string) {
	let bracketsCounter = 1;

	let regex = /".*[{}].*"/g;
	let regexMatch = content.match(regex);

	if (regexMatch) {
		regexMatch.forEach((hit) => {
			content = content.replace(hit, "-".repeat(hit.length));
		});
	}

	regex = /'.*[{}].*'/g;
	regexMatch = content.match(regex);

	if (regexMatch) {
		regexMatch.forEach((hit) => {
			content = content.replace(hit, "-".repeat(hit.length));
		});
	}

	regex = /`.*[{}].*`/g;
	regexMatch = content.match(regex);

	if (regexMatch) {
		regexMatch.forEach((hit) => {
			content = content.replace(hit, "-".repeat(hit.length));
		});
	}

	while (bracketsCounter > 0) {
		startIndex++;
		if (startIndex > content.length) return -1;
		if (content[startIndex] === "}") bracketsCounter--;
		if (content[startIndex] === "{") bracketsCounter++;
	}

	return startIndex;
}

export function getRoundClosingBracketIndex(startIndex: number, content: string) {
	let bracketsCounter = 1;

	while (bracketsCounter > 0) {
		startIndex++;
		if (startIndex > content.length) return -1;
		if (content[startIndex] === ")") bracketsCounter--;
		if (content[startIndex] === "(") bracketsCounter++;
	}

	return startIndex;
}

export function isNativeType(type: string) {
	switch (type.split("[")[0]) {
		case "number":
		case "string":
		case "boolean":
		case "void":
		case "any":
		case "unknown":
		case "bigint":
		case "undefined":
		case "never":
			return true;
		default:
			return false;
	}
}

export function getCliOptions() {
	const program = new Command();
	program
		.version("1.0.0")
		.option("-d --dir <value> ", "Directory to parse")
		.option("-f --file <value>", "File to parse")
		.parse(process.argv);
	const cliOptions = program.opts();

	return cliOptions;
}

export function getFunctionMetaData(
	content: string,
	startIdx: number,
): { parameters: VariableContext[]; returnType: string; paramsOpeningBracketIdx: number } {
	const paramsOpeningBracketIdx = content.indexOf("(", startIdx);
	const paramsClosingBracketIdx = getRoundClosingBracketIndex(paramsOpeningBracketIdx, content);
	const paramsString = content.substring(paramsOpeningBracketIdx + 1, paramsClosingBracketIdx);

	let returnType = "";
	// if not '): someType ...' ==> if it is of scheme ') "{"console.log(...)"}"'
	if (
		content.substring(paramsClosingBracketIdx + 1, content.indexOf("{", paramsClosingBracketIdx)).trim()[0] !== ":"
	) {
		returnType = "any";
		// :   "{"key: value"}" "{"console.log"}" => takes substring from : (+1) until the first "{"key => '   '
	} else if (
		content
			.substring(content.indexOf(":", paramsClosingBracketIdx) + 1, content.indexOf("{", paramsClosingBracketIdx))
			.trim().length === 0
	) {
		// return type is object
		const typeOpeningBracket = content.indexOf("{", paramsClosingBracketIdx);
		const typeClosingBracket = getClosingBracketIndex(typeOpeningBracket, content);

		returnType = content.substring(typeOpeningBracket, content.indexOf("{", typeClosingBracket)).trim();
		// : someTypeNotObject "{"console.log"}"
	} else {
		// return type is not object
		returnType = content
			.substring(content.indexOf(":", paramsClosingBracketIdx) + 1, content.indexOf("{", paramsClosingBracketIdx))
			.trim();
	}
	const parameters: VariableContext[] = [];

	if (paramsString.length > 0) {
		const paramsArray: string[] = paramsString
			.replaceAll("\n", "")
			.split(",")
			.map((el) => el.trim())
			.filter((el) => el);

		for (const param of paramsArray) {
			// desctructor to seperate the first part from all others - later on, the rest (pr) will be joined by ":"
			const [p1, ...pr] = param.trim().split(":");

			parameters.push({
				context: "variable",
				name: p1.trim(),
				type: pr.join(":").trim(),
			});
		}
	}
	return { parameters, returnType, paramsOpeningBracketIdx };
}
