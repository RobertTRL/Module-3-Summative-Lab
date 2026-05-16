module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(css|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js'
    },
    clearMocks: true
}