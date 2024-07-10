export type Context = MainContext | ClassContext | FunctionContext | VariableContext

export interface MainContext {
	context: "main"
	fileName: string;
	functions: FunctionContext[];
	classes: ClassContext[];
	variables: VariableContext[];
}

export interface FunctionContext {
	context: "function"
	name: string;
	parameters: VariableContext
	return: string
}

export interface ClassContext {
	context: "class"
	name: string;
	parent: string
	attributes: VariableContext[]
	methods: ({ accessModifyer: string } & FunctionContext)[]
}

export interface VariableContext {
	context: "variable"
	name: string;
	type: string
}
