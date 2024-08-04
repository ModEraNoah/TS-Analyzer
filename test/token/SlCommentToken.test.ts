import { SlCommentToken } from "../../src/token/SlCommentToken"

describe("SlCommentToken", () => {
	test("comment at beginning", () => {
		const content = `// some comment \n`
		const token = new SlCommentToken(0)
		expect(token.getTokenEnd(content)).toBe(16)
	})

	test("comment after valid code", () => {
		const content = `const n = 3 // some comment \n`
		const token = new SlCommentToken(12)
		expect(token.getTokenEnd(content)).toBe(28)
	})
})
