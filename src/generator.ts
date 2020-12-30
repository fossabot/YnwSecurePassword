// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

import { ConfigI, CharacterRuleI, ArgsGeneratorType } from './interfaces';
import { getValidConfig } from './config';

const generator = (arg?: ArgsGeneratorType): string => {
	const config: ConfigI = getValidConfig(arg);
	return generatePassword(config);
};

const generatePassword = (config: ConfigI): string => {
	let length: number = config.length;
	let allCharsAllowed: string = '';
	let password: string = '';
	config.rules.forEach((rule: CharacterRuleI) => {
		if (!!rule.min) {
			password += [...Array(rule.min)].map(_element => rule.chars[Math.floor(Math.random() * rule.chars.length)]).join('');
			length -= rule.min;
		}
		allCharsAllowed += rule.chars;
	});
	password += [...Array(length)].map(_element => allCharsAllowed[Math.floor(Math.random() * allCharsAllowed.length)]).join('');
	return randomize(password);
};

const randomize = (password: string): string => {
	const passwordRandomize = password.split('');
	for (let i = 0; i < passwordRandomize.length; i++) {
		const randomIndex: number = Math.floor(Math.random() * passwordRandomize.length);
		const randomChar: string = passwordRandomize[randomIndex];
		passwordRandomize[randomIndex] = passwordRandomize[i];
		passwordRandomize[i] = randomChar;
	}
	return passwordRandomize.join('');
};

export default generator;
