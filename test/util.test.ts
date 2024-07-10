import { getClosingBracketIndex } from "../src/util"

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
})
