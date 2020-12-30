// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

import generator from '../src/generator';
import { ConfigI } from '../src/interfaces';
import { getValidConfig } from '../src/config';
import { ALL_CHARACTER_CONFIG, DEFAULT_CONFIG, INFINITY } from '../src';
import validator from '../src/validator';

describe('Test generator', () => {
	describe('Tests generator [arg undefined]', () => {
		it('generator [without arg]; should generate a password [length 8]', () => {
			const password: string = generator();
			expect(password.length).toBe(8);
			expect(validator(password).isValid).toBeTruthy();
		});

		it('generator [without undefined]; should generate a password [length 8]', () => {
			const password: string = generator(undefined);
			expect(password.length).toBe(8);
			expect(validator(password).isValid).toBeTruthy();
		});
	});

	describe('Tests generator [arg number]', () => {
		it('generator [arg = 0]; should generate a password with [length between 8 and 25]', () => {
			const password: string = generator(0);
			const config: ConfigI = getValidConfig(password.length);
			expect(config.rules).toBe(DEFAULT_CONFIG.rules);
			expect(password.length).toBeGreaterThanOrEqual(8);
			expect(password.length).toBeLessThanOrEqual(25);
			expect(validator(password, config).isValid).toBeTruthy();
		});

		it('generator [arg = 4]; should generate a password with [length 4]', () => {
			const config: ConfigI = getValidConfig(4);
			const password: string = generator(4);
			expect(password.length).toBe(4);
			expect(validator(password, config).isValid).toBeTruthy();
		});

		it('generator [arg = 25]; should generate a password with [length 25]', () => {
			const config: ConfigI = getValidConfig(25);
			const password: string = generator(25);
			expect(password.length).toBe(25);
			expect(validator(password, config).isValid).toBeTruthy();
		});

		it('generator [arg = 100]; should generate a password with [length 100]', () => {
			const config: ConfigI = getValidConfig(100);
			const password: string = generator(100);
			expect(password.length).toBe(100);
			expect(validator(password, config).isValid).toBeTruthy();
		});

		it('generator [arg = INFINITY]; should generate a password with [length INFINITY]', () => {
			const config: ConfigI = getValidConfig(INFINITY);
			const password: string = generator(INFINITY);
			expect(password.length).toBe(INFINITY);
			expect(validator(password, config).isValid).toBeTruthy();
		});
	});

	describe('Tests getValidConfig [arg ConfigI]', () => {
		it('generator [arg = DEFAULT_CONFIG]; should generate a password [length 8]', () => {
			const password: string = generator(DEFAULT_CONFIG);
			expect(password.length).toBe(8);
			expect(validator(password, DEFAULT_CONFIG).isValid).toBeTruthy();
		});

		it('generator [arg = ALL_CHARACTER_CONFIG]; should generate a password [length 8]', () => {
			const password: string = generator(ALL_CHARACTER_CONFIG);
			expect(password.length).toBe(8);
			expect(validator(password, ALL_CHARACTER_CONFIG).isValid).toBeTruthy();
		});

		it('getValidConfig [arg = custom config]; should generate password with [length 2]', () => {
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
			const password: string = generator(configInput);
			expect(password.length).toBe(2);
			expect(validator(password, configInput).isValid).toBeTruthy();
		});

		it('getValidConfig [arg = custom config all rules have min attribute]; should generate password with [length 20]', () => {
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
			const password: string = generator(configInput);
			expect(password.length).toBe(20);
			expect(validator(password, configInput).isValid).toBeTruthy();
		});

		it('getValidConfig [arg = custom config sum(min) == length]; should generate password with [length 20]', () => {
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
			const password: string = generator(configInput);
			expect(password.length).toBe(20);
			expect(validator(password, configInput).isValid).toBeTruthy();
		});

		it("getValidConfig [arg = custom config all rules haven't min attribute]; should generate password with [length 10]", () => {
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
			const password: string = generator(configInput);
			expect(password.length).toBe(10);
			expect(validator(password, configInput).isValid).toBeTruthy();
		});
	});
});
