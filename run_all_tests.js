// Comprehensive test runner for all quantum computing tests
import { runAllTests } from './tests/core_quantum_tests.js';
import { runAllEncodingMathTests } from './tests/encoding_math_tests.js';

console.log("Starting comprehensive quantum computing tests...\n");

console.log("=== QUANTUM CIRCUIT TESTS ===");
const quantumResult = runAllTests();

console.log("\n" + "=".repeat(50) + "\n");

console.log("=== ENCODING MATH TESTS ===");
const encodingResult = runAllEncodingMathTests();

console.log("\n" + "=".repeat(50));
console.log("=== FINAL SUMMARY ===");
console.log(`Quantum Circuit Tests: ${quantumResult ? 'PASSED' : 'FAILED'}`);
console.log(`Encoding Math Tests: ${encodingResult ? 'PASSED' : 'FAILED'}`);
console.log("=".repeat(50));

const allPassed = quantumResult && encodingResult;
process.exit(allPassed ? 0 : 1); 