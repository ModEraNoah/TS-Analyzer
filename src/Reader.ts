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

export function getFilesOfDir(dirPath: string): string[] {
	const filePaths: string[] = []
	fs.readdirSync(dirPath).forEach(element => {
		const filePath = fs.realpathSync(dirPath + "/" + element)
		if (fs.lstatSync(filePath).isFile()) {
			filePaths.push(filePath)
		} else {
			filePaths.push(...getFilesOfDir(filePath))
		}
	})
	return filePaths
}
