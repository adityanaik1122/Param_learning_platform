/**
 * Validation Engine
 * Runs student code against test cases to validate correctness
 */

import { executePythonCode } from './pyodideRunner';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  input?: string;
  expectedOutput?: string;
  testCode?: string;  // Custom test code to run
  hidden?: boolean;   // Hidden test cases not shown to students
}

export interface ValidationResult {
  success: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: TestCase[];
  executionTime: number;
  error?: string;
}

export interface TestCaseResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput?: string;
  expectedOutput?: string;
  error?: string;
}

/**
 * Run student code against test cases
 */
export async function validateCode(
  studentCode: string,
  testCases: TestCase[]
): Promise<ValidationResult> {
  const startTime = performance.now();
  const results: TestCaseResult[] = [];

  try {
    // Run each test case
    for (const testCase of testCases) {
      const result = await runTestCase(studentCode, testCase);
      results.push(result);
    }

    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results
      .filter(r => !r.passed)
      .map(r => r.testCase);

    const executionTime = (performance.now() - startTime) / 1000;

    return {
      success: passedTests === testCases.length,
      totalTests: testCases.length,
      passedTests,
      failedTests,
      executionTime,
    };

  } catch (error: any) {
    return {
      success: false,
      totalTests: testCases.length,
      passedTests: 0,
      failedTests: testCases,
      executionTime: (performance.now() - startTime) / 1000,
      error: error.message || String(error),
    };
  }
}

/**
 * Run a single test case
 */
async function runTestCase(
  studentCode: string,
  testCase: TestCase
): Promise<TestCaseResult> {
  try {
    let codeToRun = studentCode;

    // If test case has custom test code, append it
    if (testCase.testCode) {
      codeToRun = `${studentCode}\n\n# Test Case: ${testCase.name}\n${testCase.testCode}`;
    }
    // If test case has input, add it
    else if (testCase.input) {
      codeToRun = `${studentCode}\n\n# Test Input\n${testCase.input}`;
    }

    // Execute the code
    const result = await executePythonCode(codeToRun);

    // Check if execution had errors
    if (result.error) {
      return {
        testCase,
        passed: false,
        error: result.error,
      };
    }

    // Check output against expected output
    if (testCase.expectedOutput !== undefined) {
      const actualOutput = result.output.trim();
      const expectedOutput = testCase.expectedOutput.trim();
      
      const passed = actualOutput === expectedOutput;

      return {
        testCase,
        passed,
        actualOutput,
        expectedOutput,
      };
    }

    // If no expected output specified, just check for no errors
    return {
      testCase,
      passed: true,
      actualOutput: result.output,
    };

  } catch (error: any) {
    return {
      testCase,
      passed: false,
      error: error.message || String(error),
    };
  }
}

/**
 * Validate code with function-based testing
 * Tests if specific functions exist and work correctly
 */
export async function validateFunctions(
  studentCode: string,
  functionTests: {
    functionName: string;
    tests: { args: any[]; expected: any }[];
  }[]
): Promise<ValidationResult> {
  const testCases: TestCase[] = [];
  
  // Convert function tests to test cases
  for (const funcTest of functionTests) {
    for (let i = 0; i < funcTest.tests.length; i++) {
      const test = funcTest.tests[i];
      testCases.push({
        id: `${funcTest.functionName}_${i}`,
        name: `${funcTest.functionName}(${test.args.join(', ')})`,
        description: `Test ${funcTest.functionName} with args: ${test.args.join(', ')}`,
        testCode: `
# Test function
result = ${funcTest.functionName}(${test.args.map(arg => 
  typeof arg === 'string' ? `"${arg}"` : arg
).join(', ')})
expected = ${typeof test.expected === 'string' ? `"${test.expected}"` : test.expected}
assert result == expected, f"Expected {expected}, got {result}"
print(f"✓ Test passed: {result}")
        `,
      });
    }
  }

  return validateCode(studentCode, testCases);
}

/**
 * Create test cases from lesson JSON
 */
export function parseTestCases(testCasesJson: any[]): TestCase[] {
  return testCasesJson.map((tc, index) => ({
    id: tc.id || `test_${index}`,
    name: tc.name || `Test ${index + 1}`,
    description: tc.description || '',
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    testCode: tc.testCode,
    hidden: tc.hidden || false,
  }));
}

/**
 * Format validation result for display
 */
export function formatValidationResult(result: ValidationResult): string {
  if (result.success) {
    return `✅ All tests passed! (${result.passedTests}/${result.totalTests})`;
  }

  let message = `❌ ${result.failedTests.length} test(s) failed:\n\n`;
  
  result.failedTests.forEach((test, index) => {
    if (!test.hidden) {
      message += `${index + 1}. ${test.name}\n`;
      message += `   ${test.description}\n\n`;
    }
  });

  return message;
}
