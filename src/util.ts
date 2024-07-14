import { Command } from "commander"

export function getClosingBracketIndex(startIndex: number, content: string) {
	let bracketsCounter = 1

	let regex = /".*[{}].*"/g
	let regexMatch = content.match(regex)

	if (regexMatch) {
		regexMatch.forEach(hit => {
			content = content.replace(hit, "-".repeat(hit.length))
		})
	}

	regex = /'.*[{}].*'/g
	regexMatch = content.match(regex)

	if (regexMatch) {
		regexMatch.forEach(hit => {
			content = content.replace(hit, "-".repeat(hit.length))
		})
	}

	regex = /`.*[{}].*`/g
	regexMatch = content.match(regex)

	if (regexMatch) {
		regexMatch.forEach(hit => {
			content = content.replace(hit, "-".repeat(hit.length))
		})
	}

	while (bracketsCounter > 0) {
		startIndex++
		if (startIndex > content.length) return -1
		if (content[startIndex] === "}") bracketsCounter--
		if (content[startIndex] === "{") bracketsCounter++
	}

	return startIndex
}

export function getRoundClosingBracketIndex(startIndex: number, content: string) {
	let bracketsCounter = 1

	while (bracketsCounter > 0) {
		startIndex++
		if (startIndex > content.length) return -1
		if (content[startIndex] === ")") bracketsCounter--
		if (content[startIndex] === "(") bracketsCounter++
	}

	return startIndex
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
			return true
		default:
			return false
	}
}

export function getCliOptions() {
	const program = new Command()
	program.version("1.0.0").option("-d --dir <value> ", "Directory to parse").option("-f --file <value>", "File to parse").parse(process.argv)
	const cliOptions = program.opts()

	return cliOptions
}
