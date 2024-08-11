import { AttributeContext, ClassContext, FunctionContext, MethodContext, VariableContext } from "./Context";

export interface ClassRelations {
	className: string;
	parent: string;
	dependencies: string[];
}
export interface VariableRelations {
	varName: string;
	dependency: string;
}
export interface FunctionRelations {
	funcName: string;
	dependencies: string[];
}

export class RelationSolver {
	public getClassDependencies(classContext: ClassContext[]): ClassRelations[] {
		const dependencies: ClassRelations[] = [];
		for (let i = 0; i < classContext.length; i++) {
			const currentClass = classContext[i];
			const currentDependencies: string[] = [];
			const dep: ClassRelations = { className: currentClass.name, parent: "", dependencies: currentDependencies };

			if (currentClass.parent) dep.parent = currentClass.parent;

			const varDep = this.getVariableDependencies(currentClass.attributes);
			varDep.forEach((el) => currentDependencies.push(el.dependency));

			const funcDep = this.getFunctionDependencies(currentClass.methods);
			funcDep.forEach((el) => currentDependencies.push(...el.dependencies));

			dependencies.push(dep);
		}

		return dependencies;
	}

	public getVariableDependencies(context: (VariableContext | AttributeContext)[]): VariableRelations[] {
		const dependencies: { varName: string; dependency: string }[] = [];

		for (let i = 0; i < context.length; i++) {
			const currentVar = context[i];
			const currentDependency: { varName: string; dependency: string } = {
				varName: currentVar.name,
				dependency: currentVar.type,
			};
			dependencies.push(currentDependency);
		}

		return dependencies;
	}

	public getFunctionDependencies(context: (FunctionContext | MethodContext)[]): FunctionRelations[] {
		const dependencies: { funcName: string; dependencies: string[] }[] = [];

		for (let i = 0; i < context.length; i++) {
			const currentFunc = context[i];

			const dep: string[] = [];
			const currentDependency: { funcName: string; dependencies: string[] } = {
				funcName: currentFunc.name,
				dependencies: dep,
			};

			// return type
			dep.push(currentFunc.return);

			// parameter type
			const parameterDependencies = this.getVariableDependencies(currentFunc.parameters);
			parameterDependencies.forEach((el) => dep.push(el.dependency));

			dependencies.push(currentDependency);
		}
		return dependencies;
	}
}
