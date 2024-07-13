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

	public getFunctionDependencies(context: (FunctionContext | MethodContext)[]) {
		const dependencies: { funcName: string, dependencies: string[] }[] = []

		for (let i = 0; i < context.length; i++) {
			const currentFunc = context[i]

			const dep: string[] = []
			const currentDependency: { funcName: string, dependencies: string[] } = { funcName: currentFunc.name, dependencies: dep }

			// return type
			dep.push(currentFunc.return)

			// parameter type
			const parameterDependencies = this.getVariableDependencies(currentFunc.parameters)
			parameterDependencies.forEach(el => dep.push(el.dependency))

			dependencies.push(currentDependency)
		}
		return dependencies
	}
}
