// Encoding Test Suite
// Tests for function encoding and frequency encoding

import { encode_frequency } from '../src/lib/algos/frequency_encoding.js';
import { build_polynomial_circuit, terms_from_poly } from '../src/lib/algos/function_encoding.js';

// Helper function to compare complex numbers (with tolerance)
function complexEquals(a, b, tolerance = 1e-10) {
    return Math.abs(a.real - b.real) < tolerance && Math.abs(a.imag - b.imag) < tolerance;
}

// Helper function to check if state is normalized
function isStateNormalized(state, tolerance = 1e-10) {
    let normSquared = 0;
    for (let amplitude of state) {
        normSquared += amplitude.real * amplitude.real + amplitude.imag * amplitude.imag;
    }
    return Math.abs(normSquared - 1) < tolerance;
}

// Test 1: Frequency Encoding - Basic functionality
function testFrequencyEncodingBasic() {
    console.log("Testing frequency encoding basic functionality...");
    
    try {
        const qc = encode_frequency(2, 1.0);
        
        // Check that circuit was created
        if (!qc) {
            console.log("✗ Frequency encoding failed - no circuit returned");
            return false;
        }
        
        // Check that reports exist
        if (!qc.reports || !qc.reports["iqft"]) {
            console.log("✗ Frequency encoding failed - missing reports");
            return false;
        }
        
        // Check that state exists
        const state = qc.reports["iqft"][2];
        if (!state || !Array.isArray(state)) {
            console.log("✗ Frequency encoding failed - invalid state");
            return false;
        }
        
        // Check state normalization
        if (!isStateNormalized(state)) {
            console.log("✗ Frequency encoding failed - state not normalized");
            return false;
        }
        
        console.log("✓ Frequency encoding basic test passed");
        return true;
        
    } catch (error) {
        console.log("✗ Frequency encoding basic test failed:", error.message);
        return false;
    }
}

// Test 2: Frequency Encoding - Different qubit counts
function testFrequencyEncodingQubitCounts() {
    console.log("Testing frequency encoding with different qubit counts...");
    
    const testCases = [1, 2, 3, 4];
    let passed = 0;
    
    for (let qubits of testCases) {
        try {
            const qc = encode_frequency(qubits, 2.5);
            const state = qc.reports["iqft"][2];
            
            // Check state size
            const expectedSize = Math.pow(2, qubits);
            if (state.length !== expectedSize) {
                console.log(`✗ Qubit count ${qubits}: expected ${expectedSize} states, got ${state.length}`);
                continue;
            }
            
            // Check normalization
            if (!isStateNormalized(state)) {
                console.log(`✗ Qubit count ${qubits}: state not normalized`);
                continue;
            }
            
            passed++;
            
        } catch (error) {
            console.log(`✗ Qubit count ${qubits} failed:`, error.message);
        }
    }
    
    if (passed === testCases.length) {
        console.log("✓ Frequency encoding qubit count test passed");
        return true;
    } else {
        console.log(`✗ Frequency encoding qubit count test failed: ${passed}/${testCases.length} passed`);
        return false;
    }
}

// Test 3: Function Encoding - Basic polynomial parsing
function testFunctionEncodingBasic() {
    console.log("Testing function encoding basic functionality...");
    
    try {
        // Test simple polynomial
        const terms = terms_from_poly("x^2", 2, true);
        
        if (!terms || !Array.isArray(terms)) {
            console.log("✗ Function encoding failed - invalid terms");
            return false;
        }
        
        // Build circuit
        const qc = build_polynomial_circuit(2, 4, terms);
        
        // Check that circuit was created
        if (!qc) {
            console.log("✗ Function encoding failed - no circuit returned");
            return false;
        }
        
        // Check that reports exist
        if (!qc.reports || !qc.reports["qpe"]) {
            console.log("✗ Function encoding failed - missing reports");
            return false;
        }
        
        console.log("✓ Function encoding basic test passed");
        return true;
        
    } catch (error) {
        console.log("✗ Function encoding basic test failed:", error.message);
        return false;
    }
}

// Test 4: Function Encoding - Different polynomial types
function testFunctionEncodingPolynomials() {
    console.log("Testing function encoding with different polynomials...");
    
    const testCases = [
        { poly: "x^2", input_qubits: 2, isInteger: true },
        { poly: "x0 + x1", input_qubits: 2, isInteger: false },
        { poly: "2*x^3", input_qubits: 2, isInteger: true },
        { poly: "x0 * x1", input_qubits: 2, isInteger: false }
    ];
    
    let passed = 0;
    
    for (let testCase of testCases) {
        try {
            const terms = terms_from_poly(testCase.poly, testCase.input_qubits, testCase.isInteger);
            const qc = build_polynomial_circuit(testCase.input_qubits, 4, terms);
            
            if (qc && qc.reports && qc.reports["qpe"]) {
                passed++;
            } else {
                console.log(`✗ Polynomial "${testCase.poly}" failed - invalid circuit`);
            }
            
        } catch (error) {
            console.log(`✗ Polynomial "${testCase.poly}" failed:`, error.message);
        }
    }
    
    if (passed === testCases.length) {
        console.log("✓ Function encoding polynomial test passed");
        return true;
    } else {
        console.log(`✗ Function encoding polynomial test failed: ${passed}/${testCases.length} passed`);
        return false;
    }
}

// Test 5: Function Encoding - State validation
function testFunctionEncodingStateValidation() {
    console.log("Testing function encoding state validation...");
    
    try {
        const terms = terms_from_poly("x^2", 2, true);
        const qc = build_polynomial_circuit(2, 4, terms);
        const state = qc.reports["qpe"][2];
        
        // Check state exists and is array
        if (!state || !Array.isArray(state)) {
            console.log("✗ Function encoding state validation failed - invalid state");
            return false;
        }
        
        // Check state normalization
        if (!isStateNormalized(state)) {
            console.log("✗ Function encoding state validation failed - state not normalized");
            return false;
        }
        
        // Check state size (should be 2^(input_qubits + output_qubits))
        const expectedSize = Math.pow(2, 2 + 4); // 2 input + 4 output qubits
        if (state.length !== expectedSize) {
            console.log(`✗ Function encoding state validation failed - expected ${expectedSize} states, got ${state.length}`);
            return false;
        }
        
        console.log("✓ Function encoding state validation test passed");
        return true;
        
    } catch (error) {
        console.log("✗ Function encoding state validation test failed:", error.message);
        return false;
    }
}

// Test 6: Error handling - Invalid inputs
function testErrorHandling() {
    console.log("Testing error handling for invalid inputs...");
    
    let passed = 0;
    let total = 0;
    
    // Test frequency encoding with invalid inputs
    try {
        encode_frequency(0, 1.0); // Invalid qubit count
        console.log("✗ Frequency encoding should fail with 0 qubits");
    } catch (error) {
        passed++;
        console.log("✓ Frequency encoding correctly rejected 0 qubits");
    }
    total++;
    
    try {
        encode_frequency(10, 1.0); // Too many qubits
        console.log("✗ Frequency encoding should fail with 10 qubits");
    } catch (error) {
        passed++;
        console.log("✓ Frequency encoding correctly rejected 10 qubits");
    }
    total++;
    
    // Test function encoding with invalid inputs
    try {
        terms_from_poly("invalid_polynomial", 2, true);
        console.log("✗ Function encoding should fail with invalid polynomial");
    } catch (error) {
        passed++;
        console.log("✓ Function encoding correctly rejected invalid polynomial");
    }
    total++;
    
    try {
        build_polynomial_circuit(0, 4, []); // Invalid qubit count
        console.log("✗ Function encoding should fail with 0 input qubits");
    } catch (error) {
        passed++;
        console.log("✓ Function encoding correctly rejected 0 input qubits");
    }
    total++;
    
    if (passed === total) {
        console.log("✓ Error handling test passed");
        return true;
    } else {
        console.log(`✗ Error handling test failed: ${passed}/${total} passed`);
        return false;
    }
}

// Run all tests
function runAllEncodingTests() {
    console.log("=== Encoding Test Suite ===\n");
    
    const tests = [
        testFrequencyEncodingBasic,
        testFrequencyEncodingQubitCounts,
        testFunctionEncodingBasic,
        testFunctionEncodingPolynomials,
        testFunctionEncodingStateValidation,
        testErrorHandling
    ];
    
    let passed = 0;
    let total = tests.length;
    
    for (let test of tests) {
        if (test()) {
            passed++;
        }
        console.log("");
    }
    
    console.log(`=== Test Results: ${passed}/${total} tests passed ===`);
    
    if (passed === total) {
        console.log("🎉 All encoding tests passed! The encoding algorithms are working correctly.");
    } else {
        console.log("⚠️  Some encoding tests failed. Please review the implementation.");
    }
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runAllEncodingTests();
}

export { runAllEncodingTests }; 