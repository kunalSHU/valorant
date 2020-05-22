module.exports = {
  verbose: true,
  roots: ["./tests"],
  modulePaths: ["<rootDir>"],
  collectCoverage: true,
  coverageReporters: ["json", "html", "text"],
  coverageDirectory: "./tests/report/test-coverage-report",
  testPathIgnorePatterns: ["/node_modules/", "package*", "yarn*"],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./tests/report/test-runner-report",
      },
    ],
  ],
};
