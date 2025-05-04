/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
    "^src$": "<rootDir>/src/index.ts",
    "^(\\./.*)\\.js$": "$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
};