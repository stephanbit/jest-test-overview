
# jest-test-overview

`jest-test-overview` is a simple Node.js script that generates a Markdown overview of all test files within a specified directory. The script scans for `describe` and `test` blocks in your Jest test files, including skipped tests, and outputs a structured Markdown file.

## Features

- **Extracts Descriptions:** Collects and lists `describe` and `test` blocks found in your test files.
- **Supports Skipped Tests:** Highlights skipped tests and `describe` blocks with a warning.
- **Additional Documentation:** Allows embedding of additional documentation using special comments in your test files.
- **Generates Markdown:** Creates a Markdown file that provides an overview of your test suite.

## Installation

You can install this package locally in your project using npm:

```bash
npm install jest-test-overview
```

## Usage

### Command-Line Usage

After installing, you can use the script via the command line in your project directory:

```bash
npx jest-test-overview [testDir] [outputFilePath]
```

### Arguments

- **`testDir` (optional):** The directory containing the test files. Defaults to `__tests__` in the current working directory.
- **`outputFilePath` (optional):** The file path for the generated overview. Defaults to `documentation/test_overview.md` in the current working directory.

### Example

To generate an overview of the test files in the default `__tests__` directory and save it to `documentation/test_overview.md`, run:

```bash
npx jest-test-overview
```

If your test files are located in a different directory and you want to specify a custom output file, you could use:

```bash
npx jest-test-overview ./src/tests ./output/test_overview.md
```

This will generate a Markdown file with an overview of the test files in `./src/tests` and save it to `./output/test_overview.md`.

### Additional Documentation

You can add custom documentation to specific `describe` or `test` blocks by including a special comment in your test files. This comment should be formatted as:

```javascript
// @doc: This is a custom documentation comment that will be included in the overview.
```

For example:

```javascript
// @doc: This suite tests the user login functionality.
describe('User Login', () => {
  // @doc: This test checks if a user can log in with valid credentials.
  test('logs in successfully with correct credentials', () => {
    // Test code here
  });
});
```

The content following `@doc:` will be included in the generated Markdown file as additional documentation for the corresponding `describe` or `test` block.

## Programmatic Usage

You can also use `jest-test-overview` programmatically in your Node.js scripts:

```javascript
const generateOverview = require('jest-test-overview');

generateOverview('./src/tests', './output/test_overview.md');
```

## Output

The generated Markdown file will have the following structure:

- **Test suite name**: The name of each `describe` block is shown as a section title.
- **Test cases**: Each `test` block is listed under its corresponding `describe` block.
- **Skipped tests**: Skipped `describe` and `test` blocks are clearly marked with a warning icon.
- **Additional Documentation**: Any `@doc:` comments are included as additional documentation under the relevant `describe` or `test` block.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or suggestions.

## Author

Created by Stephan Bitomsky.
