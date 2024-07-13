import { Main } from "./Main";
import { readFile } from "./Reader";
import { RelationSolver } from "./RelationSolver";
import { Tokenizer } from "./Tokenizer";

// const path = "/home/noah/Documents/prog/TS-Analyzer/src/Tokenizer.ts"
const path = "/home/noah/Documents/prog/TS-Analyzer/src/Main.ts"
const content = readFile(path)
console.log("content-lengt:", content.length)
console.log("")

const tokenizer = new Tokenizer()
const main = new Main("Main.ts", content, tokenizer)
main.main()
console.log("====================\n Main-Context:\n==================")
console.log(main["context"])

const relationSolver = new RelationSolver()
console.log(relationSolver.getClassDependencies(main["context"].classes))
