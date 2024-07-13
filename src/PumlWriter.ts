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
}
