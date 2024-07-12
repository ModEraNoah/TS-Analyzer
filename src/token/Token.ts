import { Context } from "../Context";

export interface Token {
	name: string;
	startIdx: number;
	endIdx: number;
	getTokenEnd: (content: string) => number;
	processToken: (context: Context[], content: string) => void
}


