/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	modulePathIgnorePatterns: [ '<rootDir>/lib' ],
	transform: {
		'^.+\\.[t]s$': [
			'ts-jest', { tsconfig: 'src/tsconfig.json' }
		]
	}
};