import fs from "fs"
import { getCliOptions } from "./util";

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


export function getAnalysingContent() {
	const cliOptions = getCliOptions()

	const defaultPath: string = __dirname + "/.."

	let content: string = "";

	let path = fs.realpathSync(defaultPath)
	if (cliOptions.file) {
		path = fs.realpathSync(cliOptions.file)
		content = readFile(path)
	} else if (cliOptions.dir) {
		const dirPath = fs.realpathSync(cliOptions.dir)
		const files: string[] = getFilesOfDir(dirPath)
		console.log("Analyzing the following files:")
		files.forEach(file => {
			console.log(`\t ${file}`)
			content += readFile(file)
		})
	}

	return content
}
