import { Command } from "commander";
import { Main } from "./Main";
import { PumlWriter } from "./PumlWriter";
import { getAnalysingContent, getFilesOfDir, readFile } from "./Reader";
import { RelationSolver } from "./RelationSolver";
import { Tokenizer } from "./Tokenizer";


const content = getAnalysingContent()

/*
// const path = "/home/noah/Documents/prog/TS-Analyzer/src/Tokenizer.ts"
let path = "/home/noah/Documents/prog/TS-Analyzer/src/Main.ts"
let content = readFile(path)

path = "/home/noah/Documents/prog/TS-Analyzer/src/util.ts"
content += readFile(path)
*/

console.log("content-lengt:", content.length)
console.log("")

const tokenizer = new Tokenizer()
const main = new Main("some file name in main instance", content, tokenizer)
main.main()
console.log("====================\n Main-Context:\n==================")
// console.log(main["context"])

const relationSolver = new RelationSolver()

const classRelations = relationSolver.getClassDependencies(main["context"].classes)
const functionRelations = relationSolver.getFunctionDependencies(main["context"].functions)
const puml = new PumlWriter()
puml.startWriting()

main["context"].classes.forEach(cl => puml.writeClassMetaData(cl))
classRelations.forEach((rel) => puml.writeClassDependencies(rel))

main["context"].functions.forEach(fu => puml.writeFunctionMetaData(fu))
functionRelations.forEach((rel) => puml.writeFunctionDependencies(rel))

puml.stopWriting()
