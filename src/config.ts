// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

import { ArgsGeneratorType, CharacterRuleI, ConfigI } from './interfaces';
import { DEFAULT_CONFIG, INFINITY } from './constants';

export const getValidConfig = (arg?: ArgsGeneratorType): ConfigI => {
	let config;
	if (arg === undefined) {
		config = DEFAULT_CONFIG;
	} else if (typeof arg === 'number') {
		if (arg === 0) {
			config = { ...DEFAULT_CONFIG, length: Math.floor(Math.random() * 17) + 8 };
		} else {
			checkValidLength(arg, 4);
			config = { ...DEFAULT_CONFIG, length: arg };
		}
	} else {
		checkValidConfig(arg);
		config = arg;
	}
	return config;
};

export const checkValidConfig = (config: ConfigI): void => {
	checkValidLength(config.length);
	checkValidRules(config);
};

export const checkValidLength = (length: number, min: number = 1): void => {
	if (Math.floor(length) !== length) throw new Error('Config Invalid: ' + length + ' must be an integer');
	if (length < min) throw new Error('Config Invalid: ' + length + ' must be greater than or equal ' + min);
	if (length > INFINITY) throw new Error('Config Invalid: ' + length + ' must be less than or equal ' + INFINITY);
};

const checkValidRules = (config: ConfigI): void => {
	const rules: CharacterRuleI[] = config.rules;
	if (rules.length === 0) throw new Error('Config Invalid: rules must be not empty');
	const length: number = config.length;
	let minimum = 0;
	rules.map((r: CharacterRuleI) => {
		checkValidRule(r, length);
		if (!!r.min) minimum += r.min;
		if (minimum > length) throw new Error('Config Invalid: minimum of rules must be less than or equal ' + length);
	});
};

const checkValidRule = (rule: CharacterRuleI, length: number): void => {
	if (!rule.chars) throw new Error('Config Invalid: must pass one or more character');
	if (!!rule.min) {
		checkValidLength(rule.min);
		if (rule.min > length) throw new Error('Config Invalid: ' + rule.min + ' of rule must be less than or equal ' + length);
	}
};
