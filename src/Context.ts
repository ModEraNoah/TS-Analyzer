export type Context = MainContext | ClassContext | FunctionContext | VariableContext;

export interface MainContext {
	context: "main";
	fileName: string;
	functions: FunctionContext[];
	classes: ClassContext[];
	variables: VariableContext[];
}

export interface FunctionContext {
	context: "function";
	name: string;
	parameters: VariableContext[];
	return: string;
	async: boolean;
}

export interface ClassContext {
	context: "class";
	name: string;
	parent: string;
	attributes: AttributeContext[];
	methods: MethodContext[];
}

export type MethodContext = { accessModifyer: string } & FunctionContext;
export type AttributeContext = { accessModifyer: string } & VariableContext;

export interface VariableContext {
	context: "variable";
	name: string;
	type: string;
}
