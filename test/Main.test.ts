import { ClassContext } from "../src/Context"
import { Main } from "../src/Main"
import { Tokenizer } from "../src/Tokenizer"

describe("Main", () => {
	describe("main", () => {
		test("only 1 class", () => {
			const tokenizer = new Tokenizer()
			const fileName = "someFile";
			const fileContent = `class SomeClass { public att: number = 3; public testing(): void {console.log('something') }}`

			const main = new Main(fileName, fileContent, tokenizer)
			main.main()

			expect(main["context"]).toEqual({ context: "main", fileName: fileName, functions: [], variables: [], classes: [{ context: "class", name: "SomeClass", parent: "", attributes: [{ context: "variable", name: "att", type: "number", accessModifyer: "public" }], methods: [{ context: "function", name: "testing", parameters: [], return: "void", accessModifyer: "public" }] }] })
		})

		test("multiple classes", () => {
			const tokenizer = new Tokenizer()
			const fileName = "someFile";
			const fileContent = `class SomeClass { public testing(): void { console.log('something')}} class Another { private someDo(): void {}}`

			const main = new Main(fileName, fileContent, tokenizer)
			main.main()

			expect(main["context"]).toEqual({ context: "main", fileName: fileName, functions: [], variables: [], classes: [{ context: "class", name: "SomeClass", parent: "", attributes: [], methods: [{ context: "function", name: "testing", parameters: [], return: "void", accessModifyer: "public" }] }, { context: "class", name: "Another", parent: "", attributes: [], methods: [{ context: "function", name: "someDo", parameters: [], return: "void", accessModifyer: "private" }] }] })
		})

		test("only 1 function", () => {
			const tokenizer = new Tokenizer()
			const fileName = "someFile";
			const fileContent = `function someFunctionName(para1: string): number {console.log("something")}`

			const main = new Main(fileName, fileContent, tokenizer)
			main.main()

			expect(main["context"]).toEqual({ context: "main", fileName: fileName, functions: [{ context: "function", name: "someFunctionName", parameters: [{ context: "variable", name: "para1", type: "string" }], return: "number" }], variables: [], classes: [] })
		})

		test("multiple functions", () => {
			const tokenizer = new Tokenizer()
			const fileName = "someFile";
			const fileContent = `function someFunctionName(para1: string): number {console.log("something")}   function another(): void {}`

			const main = new Main(fileName, fileContent, tokenizer)
			main.main()

			expect(main["context"]).toEqual({ context: "main", fileName: fileName, functions: [{ context: "function", name: "someFunctionName", parameters: [{ context: "variable", name: "para1", type: "string" }], return: "number" }, { context: "function", name: "another", parameters: [], return: "void" }], variables: [], classes: [] })
		})

		test("1 class and 1 function", () => {
			const tokenizer = new Tokenizer()
			const fileName = "someFile";
			const fileContent = `function someFunctionName(para1: string): number {console.log("something")} class SomeClass extends OtherClass { public testing(): void {console.log('something') } }`

			const main = new Main(fileName, fileContent, tokenizer)
			main.main()


			expect(main["context"]).toEqual({ context: "main", fileName: fileName, functions: [{ context: "function", name: "someFunctionName", parameters: [{ context: "variable", name: "para1", type: "string" }], return: "number" }], variables: [], classes: [{ context: "class", name: "SomeClass", parent: "OtherClass", attributes: [], methods: [{ context: "function", name: "testing", parameters: [], return: "void", accessModifyer: "public" }] }] })
		})
	})
})
