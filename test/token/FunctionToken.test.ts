import { MainContext } from "../../src/Context"
import { FunctionToken } from "../../src/token/FunctionToken"

describe("FunctionToken", () => {
	describe("processToken", () => {
		test("function without parameter", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc() {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [], return: "any" }])
		})

		test("function with 1 parameter", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: number) {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "number" }], return: "any" }])
		})

		test("function with 2 parameters", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: number, otherParam: string| number){console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "number" }, { context: "variable", name: "otherParam", type: "string| number" }], return: "any" }])
		})

		test("function with 3 parameters", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: number, otherParam: string| number, thirdParam: boolean){console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "number" }, { context: "variable", name: "otherParam", type: "string| number" }, { context: "variable", name: "thirdParam", type: "boolean" }], return: "any" }])
		})

		test("function with optional parameter", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam?: number) {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam?", type: "number" }], return: "any" }])
		})

		test("function with parameter having default value", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: number = 3) {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "number = 3" }], return: "any" }])
		})

		test("function without return-annotation", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: number): number {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "number" }], return: "number" }])
		})

		test("function with object as parameter type", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: {key: number}): number {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }], return: "number" }])
		})

		test("function with object as return with whitespace", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: {key: number}):     {someKey: someType} {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }], return: "{someKey: someType}" }])
		})

		test("function without object as return with whitespace", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: {key: number}):{someKey: someType} {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }], return: "{someKey: someType}" }])
		})

		test("array as return type", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: {key: number}): number[] {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }], return: "number[]" }])
		})

		test("object-array as return type", () => {
			const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
			const content = "function someFunc(someParam: {key: number}): {somekey: type}[] {console.log('something');}"

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content)
			expect(context.functions).toEqual([{ context: "function", name: "someFunc", parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }], return: "{somekey: type}[]" }])
		})
	})
})
