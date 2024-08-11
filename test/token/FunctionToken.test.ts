import { MainContext } from "../../src/Context";
import { AsyncToken } from "../../src/token/AsyncToken";
import { FunctionToken } from "../../src/token/FunctionToken";

describe("FunctionToken", () => {
	describe("processToken", () => {
		test("function without parameter", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "function someFunc() {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{ context: "function", name: "someFunc", parameters: [], return: "any", async: false },
			]);
		});

		test("function with 1 parameter", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "function someFunc(someParam: number) {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "number" }],
					return: "any",
					async: false,
				},
			]);
		});

		test("function with 2 parameters", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content =
				"function someFunc(someParam: number, otherParam: string| number){console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [
						{ context: "variable", name: "someParam", type: "number" },
						{ context: "variable", name: "otherParam", type: "string| number" },
					],
					return: "any",
					async: false,
				},
			]);
		});

		test("function with 3 parameters", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content =
				"function someFunc(someParam: number, otherParam: string| number, thirdParam: boolean){console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [
						{ context: "variable", name: "someParam", type: "number" },
						{ context: "variable", name: "otherParam", type: "string| number" },
						{ context: "variable", name: "thirdParam", type: "boolean" },
					],
					return: "any",
					async: false,
				},
			]);
		});

		test("function with optional parameter", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "function someFunc(someParam?: number) {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam?", type: "number" }],
					return: "any",
					async: false,
				},
			]);
		});

		test("function with parameter having default value", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "function someFunc(someParam: number = 3) {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "number = 3" }],
					return: "any",
					async: false,
				},
			]);
		});

		test("function without return-annotation", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "function someFunc(someParam: number): number {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "number" }],
					return: "number",
					async: false,
				},
			]);
		});

		test("function with object as parameter type", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "function someFunc(someParam: {key: number}): number {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }],
					return: "number",
					async: false,
				},
			]);
		});

		test("function with object as return with whitespace", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content =
				"function someFunc(someParam: {key: number}):     {someKey: someType} {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }],
					return: "{someKey: someType}",
					async: false,
				},
			]);
		});

		test("function without object as return with whitespace", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content =
				"function someFunc(someParam: {key: number}):{someKey: someType} {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }],
					return: "{someKey: someType}",
					async: false,
				},
			]);
		});

		test("array as return type", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "function someFunc(someParam: {key: number}): number[] {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }],
					return: "number[]",
					async: false,
				},
			]);
		});

		test("object-array as return type", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content =
				"function someFunc(someParam: {key: number}): {somekey: type}[] {console.log('something');}";

			const functionToken = new FunctionToken(0);
			functionToken.processToken(context.functions, content, undefined);
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "{key: number}" }],
					return: "{somekey: type}[]",
					async: false,
				},
			]);
		});

		test("async function", () => {
			const context: MainContext = {
				context: "main",
				fileName: "filename",
				functions: [],
				classes: [],
				variables: [],
			};
			const content = "async function someFunc(someParam: number) {console.log('something');}";

			const functionToken = new FunctionToken(6);
			functionToken.processToken(context.functions, content, new AsyncToken(0));
			expect(context.functions).toEqual([
				{
					context: "function",
					name: "someFunc",
					parameters: [{ context: "variable", name: "someParam", type: "number" }],
					return: "any",
					async: true,
				},
			]);
		});
	});
});
