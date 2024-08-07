import { InterfaceToken } from "../../src/token/InterfaceToken"

describe("InterfaceToken", () => {
	describe("getInterfaceAttributes", () => {
		const token = new InterfaceToken(0)
		test("one attribute", () => {
			const interfaceContent = ["key: string"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([{
				context: "variable",
				name: "key",
				type: "string",
				accessModifyer: "public"
			}])
		})

		test("two attributes", () => {
			const interfaceContent = ["key: string", "other: number"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "string",
					accessModifyer: "public"
				},
				{
					context: "variable",
					name: "other",
					type: "number",
					accessModifyer: "public"
				}
			])
		})

		test("three attributes", () => {
			const interfaceContent = ["key: string", "other: number", "thirdKey: boolean"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "string",
					accessModifyer: "public"
				},
				{
					context: "variable",
					name: "other",
					type: "number",
					accessModifyer: "public"
				},
				{
					context: "variable",
					name: "thirdKey",
					type: "boolean",
					accessModifyer: "public"
				}
			])
		})

		test("attribute of type array", () => {
			const interfaceContent = ["key: string[]"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "string[]",
					accessModifyer: "public"
				}
			])
		})

		test("attribute of type object with one key", () => {
			const interfaceContent = ["key: {some: number}"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "{some: number}",
					accessModifyer: "public"
				}
			])
		})

		test("attribute of type object with multiple keys", () => {
			const interfaceContent = ["key: {some: number, other: boolean, nested: {k: number}}"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "{some: number, other: boolean, nested: {k: number}}",
					accessModifyer: "public"
				},
			])
		})

		test("one function", () => {
			const interfaceContent = ["key: () => number"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "() => number",
					accessModifyer: "public"
				},
			])
		})

		test("two functions", () => {
			const interfaceContent = ["key: () => number", "otherFunc: () => {someType: string}"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "() => number",
					accessModifyer: "public"
				},
				{
					context: "variable",
					name: "otherFunc",
					type: "() => {someType: string}",
					accessModifyer: "public"
				}
			])
		})

		test("three functions", () => {
			const interfaceContent = ["key: () => number", "otherFunc: () => {someType: string}", "foo: () => void"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "key",
					type: "() => number",
					accessModifyer: "public"
				},
				{
					context: "variable",
					name: "otherFunc",
					type: "() => {someType: string}",
					accessModifyer: "public"
				},
				{
					context: "variable",
					name: "foo",
					type: "() => void",
					accessModifyer: "public"
				}
			])
		})

		test("attribute and function", () => {
			const interfaceContent = ["name: string", "key: () => number"]
			expect(token["getInterfaceAttributes"](interfaceContent)).toEqual([
				{
					context: "variable",
					name: "name",
					type: "string",
					accessModifyer: "public"
				},
				{
					context: "variable",
					name: "key",
					type: "() => number",
					accessModifyer: "public"
				},
			])
		})
	})
})
