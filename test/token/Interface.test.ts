import { InterfaceToken } from "../../src/token/InterfaceToken";

describe("InterfaceToken", () => {
	describe("getInterfaceAttributesAndMethods", () => {
		const token = new InterfaceToken(0);
		test("one attribute", () => {
			const interfaceContent = ["key: string"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "string",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("two attributes", () => {
			const interfaceContent = ["key: string", "other: number"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "string",
						accessModifyer: "public",
					},
					{
						context: "variable",
						name: "other",
						type: "number",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("three attributes", () => {
			const interfaceContent = ["key: string", "other: number", "thirdKey: boolean"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "string",
						accessModifyer: "public",
					},
					{
						context: "variable",
						name: "other",
						type: "number",
						accessModifyer: "public",
					},
					{
						context: "variable",
						name: "thirdKey",
						type: "boolean",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("attribute of type array", () => {
			const interfaceContent = ["key: string[]"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "string[]",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("attribute of type object with one key", () => {
			const interfaceContent = ["key: {some: number}"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "{some: number}",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("attribute of type object with multiple keys", () => {
			const interfaceContent = ["key: {some: number, other: boolean, nested: {k: number}}"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "{some: number, other: boolean, nested: {k: number}}",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("one anonymous function", () => {
			const interfaceContent = ["key: () => number"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "() => number",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("two anonymous functions", () => {
			const interfaceContent = ["key: () => number", "otherFunc: () => {someType: string}"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "() => number",
						accessModifyer: "public",
					},
					{
						context: "variable",
						name: "otherFunc",
						type: "() => {someType: string}",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("three anonymous functions", () => {
			const interfaceContent = ["key: () => number", "otherFunc: () => {someType: string}", "foo: () => void"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "key",
						type: "() => number",
						accessModifyer: "public",
					},
					{
						context: "variable",
						name: "otherFunc",
						type: "() => {someType: string}",
						accessModifyer: "public",
					},
					{
						context: "variable",
						name: "foo",
						type: "() => void",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});

		test("attribute and anonymous function", () => {
			const interfaceContent = ["name: string", "key: () => number"];
			expect(token["getInterfaceAttributesAndMethods"](interfaceContent)).toEqual({
				attributes: [
					{
						context: "variable",
						name: "name",
						type: "string",
						accessModifyer: "public",
					},
					{
						context: "variable",
						name: "key",
						type: "() => number",
						accessModifyer: "public",
					},
				],
				methods: [],
			});
		});
	});
});
