import { MainContext } from "../src/Context";
import { ClassToken } from "../src/token/ClassToken";
import { FunctionToken } from "../src/token/FunctionToken";

describe("Token", () => {
	describe("ClassToken", () => {
		describe("getTokenEnd", () => {
			//
		});

		describe("processToken", () => {
			test("class without parent", () => {
				const context: MainContext = {
					context: "main",
					fileName: "filename",
					functions: [],
					classes: [],
					variables: [],
				};
				const content = "class SomeTestClass {xxx}";

				const classToken = new ClassToken(0);
				classToken.processToken(context.classes, content, undefined);
				expect(context.classes).toEqual([
					{ context: "class", name: "SomeTestClass", parent: "", attributes: [], methods: [] },
				]);
			});
			test("class implements interface", () => {
				const context: MainContext = {
					context: "main",
					fileName: "filename",
					functions: [],
					classes: [],
					variables: [],
				};
				const content = "class SomeTestClass implements ISomeClass {xxx}";

				const classToken = new ClassToken(0);
				classToken.processToken(context.classes, content, undefined);
				expect(context.classes).toEqual([
					{ context: "class", name: "SomeTestClass", parent: "ISomeClass", attributes: [], methods: [] },
				]);
			});
			test("class extends parent", () => {
				const context: MainContext = {
					context: "main",
					fileName: "filename",
					functions: [],
					classes: [],
					variables: [],
				};
				const content = "class SomeTestClass extends ISomeClass {xxx}";

				const classToken = new ClassToken(0);
				classToken.processToken(context.classes, content, undefined);
				expect(context.classes).toEqual([
					{ context: "class", name: "SomeTestClass", parent: "ISomeClass", attributes: [], methods: [] },
				]);
			});
		});
	});

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
		});
	});
});
