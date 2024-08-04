import { getClosingBracketIndex, getFunctionMetaData } from "../src/util"

describe("util functionalities", () => {
	describe("getClosingBracketIndex", () => {
		test("closing bracket directly after opening", () => {
			expect(getClosingBracketIndex(0, "{}")).toBe(1)
		})

		test("closing bracket not directly after opening", () => {
			expect(getClosingBracketIndex(0, "{some Content strings}")).toBe(21)
		})

		test("closing bracket not in content", () => {
			expect(getClosingBracketIndex(0, "{some Content string")).toBe(-1)
		})
	})

	describe("getFunctionMetaData", () => {
		test("no params", () => {
			const content = "function someFunc() { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [], returnType: "any", paramsOpeningBracketIdx: 17 })
		})
		test("one param", () => {
			const content = "function someFunc(someParam: string) { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "string" }], returnType: "any", paramsOpeningBracketIdx: 17 })
		})
		test("multiple params", () => {
			const content = "function someFunc(someParam: string, other: number) { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "string" }, { context: "variable", name: "other", type: "number" }], returnType: "any", paramsOpeningBracketIdx: 17 })
		})
		test("object as param", () => {
			const content = "function someFunc(someParam: {key: string}) { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "{key: string}" }], returnType: "any", paramsOpeningBracketIdx: 17 })
		})
		test("array as param", () => {
			const content = "function someFunc(someParam: string[]) { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "string[]" }], returnType: "any", paramsOpeningBracketIdx: 17 })
		})
		test("object as return", () => {
			const content = "function someFunc(someParam: string): {key: string} { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "string" }], returnType: "{key: string}", paramsOpeningBracketIdx: 17 })
		})
		test("array as return", () => {
			const content = "function someFunc(someParam: string): string[] { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "string" }], returnType: "string[]", paramsOpeningBracketIdx: 17 })
		})
		test("no return", () => {
			const content = "function someFunc(someParam: string): any { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "string" }], returnType: "any", paramsOpeningBracketIdx: 17 })
		})
		test("native return", () => {
			const content = "function someFunc(someParam: string): number { console.log('test'); }"
			const startIdx = 0

			expect(getFunctionMetaData(content, startIdx)).toEqual({ parameters: [{ context: "variable", name: "someParam", type: "string" }], returnType: "number", paramsOpeningBracketIdx: 17 })
		})
	})
})
