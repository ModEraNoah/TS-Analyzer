import { MainContext } from "../src/Context"
import { ClassToken } from "../src/token/ClassToken"

describe("Token", () => {
	describe("ClassToken", () => {
		describe("getTokenEnd", () => {
			//
		})

		describe("processToken", () => {
			test("class without parent", () => {
				const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
				const content = "class SomeTestClass {xxx}"

				const classToken = new ClassToken(0)
				classToken.processToken(context, content)
				expect(context.classes).toEqual([{ context: "class", name: "SomeTestClass", parent: "", attributes: [], methods: [] }])
			})
			test("class implements interface", () => {
				const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
				const content = "class SomeTestClass implements ISomeClass {xxx}"

				const classToken = new ClassToken(0)
				classToken.processToken(context, content)
				expect(context.classes).toEqual([{ context: "class", name: "SomeTestClass", parent: "ISomeClass", attributes: [], methods: [] }])
			})
			test("class extends parent", () => {
				const context: MainContext = { context: "main", fileName: "filename", functions: [], classes: [], variables: [] }
				const content = "class SomeTestClass extends ISomeClass {xxx}"

				const classToken = new ClassToken(0)
				classToken.processToken(context, content)
				expect(context.classes).toEqual([{ context: "class", name: "SomeTestClass", parent: "ISomeClass", attributes: [], methods: [] }])
			})
		})
	})
})
