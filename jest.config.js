/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
	// All imported modules in your tests should be mocked automatically

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},

	coverageThreshold: {
		global: {
			functions: 100,
			statements: 100,
			branches: 100,
			lines: 100,
		},
	},
};
