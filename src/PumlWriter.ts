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

}
