
export function getClosingBracketIndex(startIndex: number, content: string) {
	let bracketsCounter = 1

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
