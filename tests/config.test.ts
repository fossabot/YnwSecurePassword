// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

import { ConfigI } from '../src/interfaces';
import { getValidConfig } from '../src/config';
import { ALL_CHARACTER_CONFIG, DEFAULT_CONFIG, INFINITY } from '../src';

describe('Tests getValidConfig function [Valid config]', () => {
	describe('Tests getValidConfig [arg undefined]', () => {
		it('getValidConfig [without arg]; should return default config', () => {
			const config: ConfigI = getValidConfig();
			expect(config).toBe(DEFAULT_CONFIG);
		});

		it('getValidConfig [arg = undefined]; should return default config', () => {
			const config: ConfigI = getValidConfig(undefined);
			expect(config).toBe(DEFAULT_CONFIG);
		});
	});
	describe('Tests getValidConfig [arg number]', () => {
		it('getValidConfig [arg = 0]; should return config [length between 8 and 25]', () => {
			const config: ConfigI = getValidConfig(0);
			expect(config.rules).toBe(DEFAULT_CONFIG.rules);
			expect(config.length).toBeGreaterThanOrEqual(8);
			expect(config.length).toBeLessThanOrEqual(25);
		});

		it('getValidConfig [arg = 4]; should return config [length 4]', () => {
			const config: ConfigI = getValidConfig(4);
			expect(config.rules).toBe(DEFAULT_CONFIG.rules);
			expect(config.length).toBe(4);
		});

		it('getValidConfig [arg = 25]; should return config [length 25]', () => {
			const config: ConfigI = getValidConfig(25);
			expect(config.rules).toBe(DEFAULT_CONFIG.rules);
			expect(config.length).toBe(25);
		});

		it('getValidConfig [arg = 100]; should return config [length 100]', () => {
			const config: ConfigI = getValidConfig(100);
			expect(config.rules).toBe(DEFAULT_CONFIG.rules);
			expect(config.length).toBe(100);
		});

		it('getValidConfig [arg = INFINITY]; should return config [length INFINITY]', () => {
			const config: ConfigI = getValidConfig(INFINITY);
			expect(config.rules).toBe(DEFAULT_CONFIG.rules);
			expect(config.length).toBe(INFINITY);
		});
	});
	describe('Tests getValidConfig [arg ConfigI]', () => {
		it('getValidConfig [arg = DEFAULT_CONFIG]; should return default config', () => {
			const config: ConfigI = getValidConfig(DEFAULT_CONFIG);
			expect(config).toBe(DEFAULT_CONFIG);
		});

		it('getValidConfig [arg = ALL_CHARACTER_CONFIG]; should return ALL_CHARACTER_CONFIG config', () => {
			const config: ConfigI = getValidConfig(ALL_CHARACTER_CONFIG);
			expect(config).toBe(ALL_CHARACTER_CONFIG);
		});

		it('getValidConfig [arg = custom config]; should return custom config', () => {
			const configInput: ConfigI = {
				length: 2,
				rules: [
					{
						chars: 'abc',
					},
					{
						chars: '01236',
						min: 1,
					},
				],
			};
			const config: ConfigI = getValidConfig(configInput);
			expect(config).toBe(configInput);
		});

		it('getValidConfig [arg = custom config all rules have min attribute]; should return custom config', () => {
			const configInput: ConfigI = {
				length: 20,
				rules: [
					{
						chars: 'abc',
						min: 12,
					},
					{
						chars: '01236',
						min: 5,
					},
					{
						chars: 'AZERTY',
						min: 2,
					},
				],
			};
			const config: ConfigI = getValidConfig(configInput);
			expect(config).toBe(configInput);
		});

		it('getValidConfig [arg = custom config sum(min) == length]; should return custom config', () => {
			const configInput: ConfigI = {
				length: 20,
				rules: [
					{
						chars: 'abc',
						min: 12,
					},
					{
						chars: '01236',
						min: 6,
					},
					{
						chars: 'AZERTY',
						min: 2,
					},
				],
			};
			const config: ConfigI = getValidConfig(configInput);
			expect(config).toBe(configInput);
		});

		it("getValidConfig [arg = custom config all rules haven't min attribute]; should return custom config", () => {
			const configInput: ConfigI = {
				length: 10,
				rules: [
					{
						chars: 'abc',
					},
					{
						chars: '01236',
					},
					{
						chars: 'AZERTY',
					},
				],
			};
			const config: ConfigI = getValidConfig(configInput);
			expect(config).toBe(configInput);
		});
	});
});

describe('Tests getValidConfig function [Invalid config]', () => {
	describe('Tests getValidConfig [arg number]', () => {
		it('getValidConfig [arg = 10.5]; should throw error with message: "Config Invalid: 10.5 must be an integer"', () => {
			expect(() => getValidConfig(10.5)).toThrowError('Config Invalid: 10.5 must be an integer');
		});

		it('getValidConfig [arg = -1.85]; should throw error with message: "Config Invalid: -1.85 must be an integer"', () => {
			expect(() => getValidConfig(-1.85)).toThrowError('Config Invalid: -1.85 must be an integer');
		});

		it('getValidConfig [arg = -15]; should throw error with message: "Config Invalid: -15 must be greater than or equal 4"', () => {
			expect(() => getValidConfig(-15)).toThrowError('Config Invalid: -15 must be greater than or equal 4');
		});

		it(
			'getValidConfig [arg = 9999999]; should throw error with message: "Config Invalid: 9999999 must be less than or equal "' + INFINITY,
			() => {
				expect(() => getValidConfig(9999999)).toThrowError('Config Invalid: 9999999 must be less than or equal ' + INFINITY);
			},
		);

		it('getValidConfig [arg = x] where (0<x<=3); should throw error with message: "Config Invalid: x must be greater than or equal 4"', () => {
			[1, 2, 3].forEach(i => expect(() => getValidConfig(i)).toThrowError('Config Invalid: ' + i + ' must be greater than or equal 4'));
		});
	});
	describe('Tests getValidConfig [arg ConfigI]', () => {
		it('getValidConfig [arg.length = 10.5]; should throw error with message: "Config Invalid: 10.5 must be an integer"', () => {
			const config: ConfigI = {
				length: 10.5,
				rules: DEFAULT_CONFIG.rules,
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: 10.5 must be an integer');
		});

		it('getValidConfig [arg.length = -1.85]; should throw error with message: "Config Invalid: -1.85 must be an integer"', () => {
			const config: ConfigI = {
				length: -1.85,
				rules: DEFAULT_CONFIG.rules,
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: -1.85 must be an integer');
		});

		it('getValidConfig [arg.length = -15]; should throw error with message: "Config Invalid: -15 must be greater than or equal 1"', () => {
			const config: ConfigI = {
				length: -15,
				rules: DEFAULT_CONFIG.rules,
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: -15 must be greater than or equal 1');
		});

		it(
			'getValidConfig [arg.length = 9999999]; should throw error with message: "Config Invalid: 9999999 must be less than or equal "' +
				INFINITY,
			() => {
				const config: ConfigI = {
					length: 9999999,
					rules: DEFAULT_CONFIG.rules,
				};
				expect(() => getValidConfig(config)).toThrowError('Config Invalid: 9999999 must be less than or equal ' + INFINITY);
			},
		);

		it('getValidConfig [arg.length = 0]; should throw error with message: "Config Invalid: 0 must be greater than or equal 1"', () => {
			const config: ConfigI = {
				length: 0,
				rules: DEFAULT_CONFIG.rules,
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: 0 must be greater than or equal 1');
		});

		it('getValidConfig [arg.rules = []]; should throw error with message: "Config Invalid: rules must be not empty"', () => {
			const config: ConfigI = {
				length: 8,
				rules: [],
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: rules must be not empty');
		});

		it('getValidConfig [arg = invalid sum(min)]; should throw error with message: "Config Invalid: minimum of rules must be less than or equal 4"', () => {
			const config: ConfigI = {
				length: 4,
				rules: [
					{
						chars: 'abcdef',
					},
					{
						chars: '0123456',
						min: 2,
					},
					{
						chars: 'ABCDE',
						min: 3,
					},
				],
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: minimum of rules must be less than or equal 4');
		});

		it('getValidConfig [arg = chars is empty]; should throw error with message: "Config Invalid: must pass one or more character"', () => {
			const config: ConfigI = {
				length: 17,
				rules: [
					{
						chars: 'abcdef',
						min: 10,
					},
					{
						chars: '',
						min: 2,
					},
					{
						chars: 'ABCDE',
						min: 3,
					},
				],
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: must pass one or more character');
		});

		it('getValidConfig [arg = min > length]; should throw error with message: "Config Invalid: 23 of rule must be less than or equal 17"', () => {
			const config: ConfigI = {
				length: 17,
				rules: [
					{
						chars: 'abcdef',
						min: 10,
					},
					{
						chars: '01',
						min: 2,
					},
					{
						chars: 'ABCDE',
						min: 23,
					},
				],
			};
			expect(() => getValidConfig(config)).toThrowError('Config Invalid: 23 of rule must be less than or equal 17');
		});
	});
});
