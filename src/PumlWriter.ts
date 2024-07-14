import { ClassContext, FunctionContext } from "./Context"
import { ClassRelations, FunctionRelations } from "./RelationSolver"
import { isNativeType } from "./util"

export class PumlWriter {
	public startWriting(): void {
		console.log("@startuml")
	}
	public stopWriting(): void {
		console.log("@enduml")
	}

	public writeClassDependencies(classRelations: ClassRelations): void {
		if (classRelations.parent) {
			console.log(`${classRelations.className} --|> ${classRelations.parent}`)
		}

		for (let i = 0; i < classRelations.dependencies.length; i++) {
			if (!isNativeType(classRelations.dependencies[i])) {
				console.log(`${classRelations.className} -> ${classRelations.dependencies[i].replace("[]", "").replace("(", "").replace(")", "").replaceAll("|", "_").replace("[", "").replace("]", "").replaceAll(" ", "").replaceAll('"', "")}`)
			}
		}
	}

	public writeClassMetaData(classContext: ClassContext): void {
		console.log(`class ${classContext.name} {`)

		classContext.methods.forEach(method => {
			let parameterString = ""
			for (let i = 0; i < method.parameters.length; i++) {
				if (i === 0) {
					parameterString += `${method.parameters[i].name}: ${method.parameters[i].type}`
				} else {
					parameterString += `, ${method.parameters[i].name}: ${method.parameters[i].type}`
				}
			}
			console.log(`${this.translateAccessModifyer(method.accessModifyer)} ${method.name} (${parameterString}): ${method.return}`)
		})

		console.log("}")
	}

	private translateAccessModifyer(access: string): string {
		const relevantModifyer = access.split(" ")[0]
		switch (relevantModifyer) {
			case "private":
				return "-"
			case "public":
				return "+"
			case "protected":
				return "#"
			default:
				return access
		}
	}

	public writeFunctionDependencies(functionRelations: FunctionRelations): void {
		for (let i = 0; i < functionRelations.dependencies.length; i++) {
			if (!isNativeType(functionRelations.dependencies[i])) {
				console.log(`${functionRelations.funcName} -> ${functionRelations.dependencies[i].replace("[]", "")}`)
			}
		}
	}

	public writeFunctionMetaData(functionContext: FunctionContext): void {
		console.log(`class ${functionContext.name} <<function>> {`)
		let parameterString = ""
		for (let i = 0; i < functionContext.parameters.length; i++) {
			if (i === 0) {
				parameterString += `${functionContext.parameters[i].name}: ${functionContext.parameters[i].type}`
			} else {
				parameterString += `, ${functionContext.parameters[i].name}: ${functionContext.parameters[i].type}`
			}
		}
		console.log(`+ ${functionContext.name} (${parameterString}): ${functionContext.return}`)
		console.log("}")
	}
}
