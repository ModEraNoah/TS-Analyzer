import { ClassContext } from "../src/Context"
import { Main } from "../src/Main"
import { Tokenizer } from "../src/Tokenizer"

describe("Main", () => {
	describe("getLastClassContext", () => {
		test("class context exists", () => {
			const main = new Main("someFile", "some file content", {} as Tokenizer)
			main["context"].classes.push({ name: "classname" } as ClassContext)

			expect(main["getLastClassContext"]()).toEqual({ name: "classname" })
		})

		test("class context does not exist", () => {
			const main = new Main("someFile", "some file content", {} as Tokenizer)

			expect(() => main["getLastClassContext"]()).toThrow()
		})
	})

	describe("main", () => {
		test("only 1 class", () => {
			const tokenizer = new Tokenizer()
			const fileName = "someFile";
			const fileContent = `class SomeClass { public testing(): void { \n
					console.log('something')\n
				}\n
			}`

			const main = new Main(fileName, fileContent, tokenizer)
			main.main()

			expect(main["context"]).toEqual({ context: "main", fileName: fileName, functions: [], variables: [], classes: [{ context: "class", name: "SomeClass", parent: "", attributes: [], methods: [] }] })
		})

		test("only 1 function", () => {
			const tokenizer = new Tokenizer()
			const fileName = "someFile";
			const fileContent = `function someFunctionName(para1: string): number {console.log("something")}`

			const main = new Main(fileName, fileContent, tokenizer)
			main.main()

			expect(main["context"]).toEqual({ context: "main", fileName: fileName, functions: [{ context: "function", name: "someFunctionName", parameters: [{ context: "variable", name: "para1", type: "" }], return: "number" }], variables: [], classes: [] })
		})
	})
})
