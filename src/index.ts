import { Main } from "./Main";
import { readFile } from "./Reader";
import { Tokenizer } from "./Tokenizer";

const content = readFile("/home/noah/Documents/prog/TS-Analyzer/src/Main.ts")
console.log("content-lengt:", content.length)
console.log("")

const tokenizer = new Tokenizer()
const main = new Main("Main.ts", content, tokenizer)
main.main()
console.log("====================\n Main-Context:\n==================")
console.log(main["context"])
