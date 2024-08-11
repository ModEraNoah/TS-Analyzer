import { AccessModifyerToken } from "../../src/token/AccessModifyerToken";

describe("AccessModifyer", () => {
	describe("specifyType", () => {
		test("method", () => {
			const content = "public someMethod(): string { console.log ('test') }";
			const token = new AccessModifyerToken(0);
			token["specifyType"](content);
			expect(token["type"]).toEqual("method");
		});

		describe("attribute", () => {
			test("without initiation & without type", () => {
				const content = "public params;";
				const token = new AccessModifyerToken(0);
				token["specifyType"](content);
				expect(token["type"]).toEqual("attribute");
			});
			test("without initation & with type", () => {
				const content = "public params: string;";
				const token = new AccessModifyerToken(0);
				token["specifyType"](content);
				expect(token["type"]).toEqual("attribute");
			});
			test("with initiation & without type", () => {
				const content = "public params = 3";
				const token = new AccessModifyerToken(0);
				token["specifyType"](content);
				expect(token["type"]).toEqual("attribute");
			});
			test("with initation & with type", () => {
				const content = "public params: string = 'hallo'";
				const token = new AccessModifyerToken(0);
				token["specifyType"](content);
				expect(token["type"]).toEqual("attribute");
			});
		});
	});
});
