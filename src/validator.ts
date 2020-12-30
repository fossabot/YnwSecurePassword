// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

import { ArgsGeneratorType, CharacterRuleI, ConfigI, ResultValidatorI } from './interfaces';
import { getValidConfig } from './config';

const validator = (password: string, arg?: ArgsGeneratorType): ResultValidatorI => {
	if (arg === 0) {
		return {
			isValid: false,
			error: 'Error length',
		};
	}
	const config: ConfigI = getValidConfig(arg);
	if (password.length < config.length) {
		return {
			isValid: false,
			error: 'Error length',
		};
	} else {
		for (const rule of config.rules) {
			const isValidRule: boolean = isValidCharacterRule(password, rule);
			if (!isValidRule) {
				return {
					isValid: false,
					error: 'Error rules',
				};
			}
		}
	}
	return {
		isValid: true,
	};
};

const isValidCharacterRule = (password: string, rule: CharacterRuleI): boolean => {
	if (!rule.min) return true;
	let contain: number = 0;
	for (const c of password) {
		if (rule.chars.includes(c)) {
			contain++;
			if (contain >= rule.min) return true;
		}
	}
	return false;
};

export default validator;
