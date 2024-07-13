import { AttributeContext, ClassContext, FunctionContext, MethodContext, VariableContext } from "./Context";

export class RelationSolver {

	public getVariableDependencies(context: (VariableContext | AttributeContext)[]) {
		const dependencies: { varName: string, dependency: string }[] = []

		for (let i = 0; i < context.length; i++) {
			const currentVar = context[i]
			const currentDependency: { varName: string, dependency: string } = { varName: currentVar.name, dependency: currentVar.type }
			dependencies.push(currentDependency)
		}

		return dependencies
	}

}
