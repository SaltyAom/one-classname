module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['**/*.(test|spec).(ts|tsx)'],
    globals: {
        'ts-jest': {
            babelConfig: true,
            tsconfig: 'jest.tsconfig.json'
        }
    },
    coveragePathIgnorePatterns: ['/node_modules/']
}
