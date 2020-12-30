// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

import { ConfigI } from './interfaces';

// Constants Math
export const INFINITY = 999999;
export const MATH = { INFINITY };

// Constants CHARACTERS
export const ALPHABET_UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ALPHABET_LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
export const SPECIAL = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
export const DIGITS = '0123456789';
export const ALPHABET_UPPER_LOWER_CASE = ALPHABET_UPPER_CASE + ALPHABET_UPPER_CASE;
export const ALPHABET_NUMBERS = ALPHABET_UPPER_LOWER_CASE + DIGITS;
export const ALL = ALPHABET_NUMBERS + SPECIAL;

export const CHARACTERS = {
	ALPHABET_UPPER_CASE,
	ALPHABET_LOWER_CASE,
	SPECIAL,
	DIGITS,
	ALPHABET_UPPER_LOWER_CASE,
	ALPHABET_NUMBERS,
	ALL,
};

// Constants Config
export const DEFAULT_CONFIG: ConfigI = {
	length: 8,
	rules: [
		{ chars: ALPHABET_UPPER_CASE, min: 1 },
		{ chars: ALPHABET_LOWER_CASE, min: 1 },
		{ chars: SPECIAL, min: 1 },
		{ chars: DIGITS, min: 1 },
	],
};

export const ALL_CHARACTER_CONFIG: ConfigI = {
	length: 8,
	rules: [{ chars: ALL }],
};

export const ONLY_ALPHABET_CONFIG: ConfigI = {
	length: 8,
	rules: [{ chars: ALPHABET_UPPER_LOWER_CASE }],
};

export const ALPHABET_NUMBERS_CONFIG: ConfigI = {
	length: 8,
	rules: [{ chars: ALPHABET_NUMBERS }],
};

export const CONFIG = { DEFAULT_CONFIG, ALL_CHARACTER_CONFIG, ONLY_ALPHABET_CONFIG, ALPHABET_NUMBERS_CONFIG };

// Default
export const CONSTANTS = {
	CHARACTERS,
	MATH,
	CONFIG,
};

export default CONSTANTS;
