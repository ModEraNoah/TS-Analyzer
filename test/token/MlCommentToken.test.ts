import { MlCommentToken } from "../../src/token/MlCommentToken"

describe("MlCommentToken", () => {
	test("end in same line", () => {
		const content = "/* someComment */"
		const token = new MlCommentToken(0)
		expect(token.getTokenEnd(content)).toBe(16)
	})
	test("end in other line", () => {
		const content = "/* someComment \n \n */"
		const token = new MlCommentToken(0)
		expect(token.getTokenEnd(content)).toBe(20)
	})
})
