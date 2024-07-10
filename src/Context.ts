interface Context {
	fileName: string;
	functions: FunctionContext[];
	classes: ClassContext[];
	variables: VariableContext[];
}

interface FunctionContext {
	name: string;
	parameters: VariableContext
	return: string
}

interface ClassContext {
	name: string;
	parent: string
	attributes: VariableContext[]
	methods: ({ accessModifyer: string } & FunctionContext)[]
}

interface VariableContext {
	name: string;
	type: string
}
