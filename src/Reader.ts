import fs from "fs"

export function readFile(path: string): string {
	const isFile = fs.statSync(path).isFile
	if (!isFile) throw new Error("Provided file path is not a path");

	let fileBuffer
	try {
		fileBuffer = fs.readFileSync(path)
	} catch (error) {
		console.error(`Error while reading file: ${error}`)
		fileBuffer = ""
	}

	return fileBuffer.toString()
}
