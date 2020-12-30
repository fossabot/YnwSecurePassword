// ynw-secure-password
// version : 0.1.0
// authors : Youssef Hamlili, YNW-Team
// license : MIT

import validator from '../src/validator';
import { ResultValidatorI } from '../src/interfaces';
import { ALL_CHARACTER_CONFIG } from '../src';

describe('Test validator', () => {
	describe('Tests validator [arg undefined]', () => {
		it('validator [password = Test@2020, without arg]; should return true', () => {
			const result: ResultValidatorI = validator('Test@2020');
			expect(result.isValid).toBeTruthy();
		});
		it('validator [password = Test, without arg]; should return false', () => {
			const result: ResultValidatorI = validator('Test');
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error length');
		});
		it('validator [password = TT-@2020, without arg]; should return false', () => {
			const result: ResultValidatorI = validator('TT-@2020');
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test@2020, without arg]; should return false', () => {
			const result: ResultValidatorI = validator('test@2020');
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test2020, without arg]; should return false', () => {
			const result: ResultValidatorI = validator('test2020');
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});

		it('validator [password = Test@2020, arg = undefined]; should return true', () => {
			const result: ResultValidatorI = validator('Test@2020', undefined);
			expect(result.isValid).toBeTruthy();
		});
		it('validator [password = Test, arg = undefined]; should return false', () => {
			const result: ResultValidatorI = validator('Test', undefined);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error length');
		});
		it('validator [password = TT-@2020, arg = undefined]; should return false', () => {
			const result: ResultValidatorI = validator('TT-@2020', undefined);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test@2020, arg = undefined]; should return false', () => {
			const result: ResultValidatorI = validator('test@2020', undefined);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test2020, arg = undefined]; should return false', () => {
			const result: ResultValidatorI = validator('test2020', undefined);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
	});

	describe('Tests validator [arg number]', () => {
		it('validator [password = Tst, arg = 0]; should return false', () => {
			const result: ResultValidatorI = validator('Tst', 0);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error length');
		});
		it('validator [password= Test@2020, arg = 4]; should return true', () => {
			const result: ResultValidatorI = validator('Test@2020', 4);
			expect(result.isValid).toBeTruthy();
		});
		it('validator [password = Tst, arg = 4]; should return false', () => {
			const result: ResultValidatorI = validator('Tst', 4);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error length');
		});
		it('validator [password = TT-@2020, arg = 4]; should return false', () => {
			const result: ResultValidatorI = validator('TT-@2020', 4);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test@2020, arg = 4]; should return false', () => {
			const result: ResultValidatorI = validator('test@2020', 4);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test2020, arg = 4]; should return false', () => {
			const result: ResultValidatorI = validator('test2020', 4);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});

		it('validator [password= Test@2020-test, arg = 10]; should return true', () => {
			const result: ResultValidatorI = validator('Test@2020-test', 10);
			expect(result.isValid).toBeTruthy();
		});
		it('validator [password = Test@2020, arg = 10]; should return false', () => {
			const result: ResultValidatorI = validator('Test@2020', 10);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error length');
		});
		it('validator [password = TT-@2020TT, arg = 10]; should return false', () => {
			const result: ResultValidatorI = validator('TT-@2020TT', 10);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test@2020, arg = 10]; should return false', () => {
			const result: ResultValidatorI = validator('test@2020-test', 10);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
		it('validator [password = test2020, arg = 10]; should return false', () => {
			const result: ResultValidatorI = validator('test2020Test', 10);
			expect(result.isValid).toBeFalsy();
			expect(result.error).toBe('Error rules');
		});
	});

	describe('Tests validator [arg ConfigI]', () => {
		it('validator [password = Tst10893, arg = ALL_CHARACTER_CONFIG]; should return true', () => {
			const result: ResultValidatorI = validator('Tst10893', ALL_CHARACTER_CONFIG);
			expect(result.isValid).toBeTruthy();
		});
	});
});
