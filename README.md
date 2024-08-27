# Generate Test Suite Overview for Jest

This script generates a Markdown overview of all test files within a specified directory. The overview includes descriptions of `describe` and `test` blocks found in the JavaScript test files. The script can be installed and used within any project.

## Features

- **Extracts Descriptions:** Collects descriptions from `describe` and `test` blocks in the test files.
- **Supports Skipped Tests:** Identifies and marks skipped tests and `describe` blocks.
- **Generates Markdown:** Outputs the collected information into a well-structured Markdown file.

## Installation

To use this script in a specific project, you can install it locally via npm.

### Step 1: Install the Package Locally

Navigate to your project directory and run:

```bash
npm install jest-test-overview
```

This will install the package in the `node_modules` directory of your project and add it as a dependency in your `package.json`.

### Step 2: Run the Script

You can run the script using `npx`, which allows you to execute binaries from your local `node_modules`:

```bash
npx generate-test-overview [testDir] [outputFilePath]
```

Alternatively, you can add a script entry to your project's `package.json` for convenience:

```json
{
  "scripts": {
    "build:overview": "generate-test-overview [testDir] [outputFilePath]"
  }
}
```

Then, you can run the script with:

```bash
npm run generate-overview
```

### Example

```bash
npx generate-test-overview ./test-directory ./output/overview.md
```

This command generates a Markdown overview of the test files located in `./test-directory` and saves it to `./output/overview.md`.

## Usage

### Command-Line Arguments

+ `testDir` (optional): The directory containing the test files. Defaults to the `__tests__` directory if not specified.
+ `outputFilePath` (optional): The file path where the generated overview should be saved. Defaults to overview.md if not specified.

### Using in Code

If your package exports functions or modules, you can require and use it in your project’s code:

```javascript
const generateOverview = require('your-package-name');

generateOverview([testDir], [outputFilePath]);
```

## Script Overview

The script does the following:

1. **Traverse the Directory**: It scans the specified directory (or the default `__tests__` directory) for JavaScript files.
1. **Extract Descriptions**: It reads each file, extracts descriptions from `describe`, `describe.skip`, `test`, and `test.skip` blocks, and collects them.
1. **Generate Markdown**: It formats the collected information into a Markdown structure and writes it to the specified output file.

## Error Handling
The script includes basic error handling to manage issues such as missing directories or files. If an error occurs, it will log the error message to the console.

## License
This project is licensed under the MIT License.

## Contributing
Feel free to submit issues or pull requests if you have any improvements or suggestions.

## Author
Created by Stephan Bitomsky.