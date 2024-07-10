import { ClassToken } from "../src/token/Token"
import { Context, Tokenizer } from "../src/Tokenizer"

const tokenizer = new Tokenizer()
describe("Tokenizer", () => {

	describe("getNextToken", () => {
		test("Class-Token", () => {
			expect(tokenizer.getNextToken(0, " class SomeClassName ")).toBeInstanceOf(ClassToken)
		})
	})

	describe("getNextWordStartIdx", () => {
		test("currentIndex bigger than content length", () => {
			expect(tokenizer["getNextWordStartIdx"](100, "someContent")).toBe(-1)
		})
		test("currentIndex at index 0", () => {
			expect(tokenizer["getNextWordStartIdx"](0, "s")).toBe(0)
		})
		test("1 whitespace before next word", () => {
			expect(tokenizer["getNextWordStartIdx"](0, " someWord")).toBe(1)
		})
		test("multiple whitespaces before next word", () => {
			expect(tokenizer["getNextWordStartIdx"](0, "   someWord")).toBe(3)
		})
	})

	describe("getNextWordEndIdx", () => {
		test("currentIndex bigger than content length", () => {
			expect(tokenizer["getNextWordEndIdx"](100, "someContent")).toBe(-1)
		})
		test("no whitespace after word", () => {
			expect(tokenizer["getNextWordEndIdx"](0, "some")).toBe(4)
		})
		test("whitespace after word", () => {
			expect(tokenizer["getNextWordEndIdx"](0, "some ")).toBe(4)
		})
	})

	describe("isWhitespace", () => {
		test("is not a whitespace", () => {
			expect(tokenizer["isWhitespace"]("someWord")).toBeFalsy()
		})

		test("is ' '", () => {
			expect(tokenizer["isWhitespace"](" ")).toBeTruthy()
		})

		test("is \\n", () => {
			expect(tokenizer["isWhitespace"]("\n")).toBeTruthy()
		})

		test("is \\r", () => {
			expect(tokenizer["isWhitespace"]("\r")).toBeTruthy()
		})

		test("is \\r\\n", () => {
			expect(tokenizer["isWhitespace"]("\r\n")).toBeTruthy()
		})
	})
})
