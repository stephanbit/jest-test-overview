#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const process = require('process');

/**
 * Script to generate a Markdown overview of all test files within a given directory.
 * 
 * Usage:
 *   node overviewTests.js [testDir] [outputFilePath]
 * 
 * Arguments:
 *   testDir (optional)        - The directory containing test files. Defaults to '__tests__' directory in the script's location.
 *   outputFilePath (optional) - The file path for the generated overview. Defaults to 'overview.md' in the script's location.
 */

const testDir = process.argv[2] || path.join(__dirname, '__tests__');
const outputFilePath = process.argv[3] || path.join(__dirname, 'documentation/test_overview.md');

// Function to extract descriptions from a single test file
async function extractDescriptionsFromFile(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  const docRegex = /\/\/\s*@doc:\s*(.*)/;
  const describeRegex = /describe(?:\.skip)?\(['"`](.*?)['"`]/;
  const testRegex = /test(?:\.skip)?\(['"`](.*?)['"`]/;

  const descriptions = [];
  let lastDoc = null;

  lines.forEach((line) => {
    let match;

    if ((match = docRegex.exec(line.trim())) !== null) {
      lastDoc = match[1];
    }

    if ((match = describeRegex.exec(line.trim())) !== null) {
      const isSkipped = line.includes('describe.skip');
      const prefix = isSkipped ? '### :warning: skip:' : '###';
      descriptions.push(`${prefix} ${match[1]}\n\n${lastDoc ? `> ${lastDoc}\n` : ''}`);
      lastDoc = null;
    }

    if ((match = testRegex.exec(line.trim())) !== null) {
      const isSkipped = line.includes('test.skip');
      const prefix = isSkipped ? '+ #### :warning: skip:' : '+ ####';
      descriptions.push(`${prefix} ${match[1]}`);
    }
  });

  return descriptions.length > 0 ? descriptions : ['  No describe or test blocks found.'];
}

// Function to traverse the test directory
async function traverseDir(dir, outputLines, indexLines, rootFolder = '', rootFoldersAdded = {}) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      const currentRootFolder = rootFolder || file;
      await traverseDir(filePath, outputLines, indexLines, currentRootFolder, rootFoldersAdded);
    } else if (file.endsWith('.js')) {
      const relativePath = path.relative(testDir, filePath);

      if (rootFolder && !rootFoldersAdded[rootFolder]) {
        outputLines.push(`# ${rootFolder}`);
        indexLines.push(`- [${rootFolder}](#${rootFolder.toLowerCase().replace(/\s+/g, '-')})`);
        rootFoldersAdded[rootFolder] = true;
      }

      outputLines.push(`\n## ${relativePath}`);
      const descriptions = await extractDescriptionsFromFile(filePath);
      outputLines.push(...descriptions);
    }
  }
}

// Function to write the final output to the markdown file
async function writeToOutputFile(outputFilePath, indexLines, outputLines) {
  const title = `# Test Suite Overview\n\nGenerated on: ${new Date().toLocaleString()}\n\n`;
  const indexTitle = `## Index\n\n`;
  const content = [title, indexTitle, indexLines.join('\n'), '\n\n', outputLines.join('\n')].join('');

  await fs.writeFile(outputFilePath, content, 'utf-8');
  console.log(`Overview written to ${outputFilePath}`);
}

// Main function
async function main() {
  try {
    const outputLines = [];
    const indexLines = [];
    const rootFoldersAdded = {};

    await traverseDir(testDir, outputLines, indexLines, '', rootFoldersAdded);
    await writeToOutputFile(outputFilePath, indexLines, outputLines);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
