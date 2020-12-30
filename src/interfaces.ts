// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

export interface CharacterRuleI {
	chars: string;
	min?: number;
}

export interface ConfigI {
	length: number;
	rules: CharacterRuleI[];
}

export type ArgsGeneratorType = ConfigI | number;

export interface ResultValidatorI {
	isValid: boolean;
	error?: string;
}
