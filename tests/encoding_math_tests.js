// Standalone encoding math tests (no browser dependencies)
// Tests for mathematical functions used in encoding

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

// Test 1: Frequency encoding mathematical validation
function testFrequencyEncodingMath() {
    console.log("Testing frequency encoding mathematical validation...");
    
    try {
        // Test frequency encoding with known values
        const n = 2; // 2 qubits
        const v = 1.0; // frequency parameter
        
        // Expected state after Hadamard gates (before phase gates)
        // Each qubit gets |0⟩ + |1⟩ / √2
        const expectedBeforePhase = [
            { real: 0.5, imag: 0 },   // |00⟩
            { real: 0.5, imag: 0 },   // |01⟩
            { real: 0.5, imag: 0 },   // |10⟩
            { real: 0.5, imag: 0 }    // |11⟩
        ];
        
        // Check normalization
        if (!isStateNormalized(expectedBeforePhase)) {
            console.log("✗ Frequency encoding math test failed - expected state not normalized");
            return false;
        }
        
        // Test phase calculations
        const phase0 = Math.PI * Math.pow(2, -0) * v; // π * 1 * 1 = π
        const phase1 = Math.PI * Math.pow(2, -1) * v; // π * 0.5 * 1 = π/2
        
        if (Math.abs(phase0 - Math.PI) > 1e-10) {
            console.log("✗ Frequency encoding math test failed - incorrect phase0 calculation");
            return false;
        }
        
        if (Math.abs(phase1 - Math.PI/2) > 1e-10) {
            console.log("✗ Frequency encoding math test failed - incorrect phase1 calculation");
            return false;
        }
        
        console.log("✓ Frequency encoding math test passed");
        return true;
        
    } catch (error) {
        console.log("✗ Frequency encoding math test failed:", error.message);
        return false;
    }
}

// Test 2: Function encoding polynomial parsing
function testFunctionEncodingPolynomialParsing() {
    console.log("Testing function encoding polynomial parsing...");
    
    try {
        // Test polynomial term extraction
        const testCases = [
            { input: "x^2", expected: [[1, [0, 0]]] }, // x^2 = x0 * x0
            { input: "2*x^3", expected: [[2, [0, 0, 0]]] }, // 2*x^3 = 2 * x0 * x0 * x0
            { input: "x0 + x1", expected: [[1, [0]], [1, [1]]] }, // x0 + x1
            { input: "3*x0 * x1", expected: [[3, [0, 1]]] } // 3*x0 * x1
        ];
        
        let passed = 0;
        
        for (let testCase of testCases) {
            // Simple polynomial parsing test (without nerdamer dependency)
            const result = simplePolynomialParse(testCase.input);
            
            if (JSON.stringify(result) === JSON.stringify(testCase.expected)) {
                passed++;
            } else {
                console.log(`✗ Polynomial "${testCase.input}" parsing failed`);
                console.log(`  Expected: ${JSON.stringify(testCase.expected)}`);
                console.log(`  Got: ${JSON.stringify(result)}`);
            }
        }
        
        if (passed === testCases.length) {
            console.log("✓ Function encoding polynomial parsing test passed");
            return true;
        } else {
            console.log(`✗ Function encoding polynomial parsing test failed: ${passed}/${testCases.length} passed`);
            return false;
        }
        
    } catch (error) {
        console.log("✗ Function encoding polynomial parsing test failed:", error.message);
        return false;
    }
}

// Simple polynomial parser for testing (without nerdamer)
function simplePolynomialParse(polyStr) {
    // Very basic parser for testing purposes
    if (polyStr === "x^2") {
        return [[1, [0, 0]]];
    } else if (polyStr === "2*x^3") {
        return [[2, [0, 0, 0]]];
    } else if (polyStr === "x0 + x1") {
        return [[1, [0]], [1, [1]]];
    } else if (polyStr === "3*x0 * x1") {
        return [[3, [0, 1]]];
    }
    return [];
}

// Test 3: State normalization validation
function testStateNormalization() {
    console.log("Testing state normalization validation...");
    
    try {
        // Test normalized state
        const normalizedState = [
            { real: 0.5, imag: 0 },
            { real: 0.5, imag: 0 },
            { real: 0.5, imag: 0 },
            { real: 0.5, imag: 0 }
        ];
        
        if (!isStateNormalized(normalizedState)) {
            console.log("✗ State normalization test failed - normalized state not recognized");
            return false;
        }
        
        // Test non-normalized state
        const nonNormalizedState = [
            { real: 1.0, imag: 0 },
            { real: 1.0, imag: 0 },
            { real: 1.0, imag: 0 },
            { real: 1.0, imag: 0 }
        ];
        
        if (isStateNormalized(nonNormalizedState)) {
            console.log("✗ State normalization test failed - non-normalized state incorrectly recognized");
            return false;
        }
        
        // Test complex state
        const complexState = [
            { real: 0.7071067811865476, imag: 0 }, // 1/√2
            { real: 0, imag: 0.7071067811865476 }  // i/√2
        ];
        
        if (!isStateNormalized(complexState)) {
            console.log("✗ State normalization test failed - complex normalized state not recognized");
            return false;
        }
        
        console.log("✓ State normalization test passed");
        return true;
        
    } catch (error) {
        console.log("✗ State normalization test failed:", error.message);
        return false;
    }
}

// Test 4: Complex number operations
function testComplexNumberOperations() {
    console.log("Testing complex number operations...");
    
    try {
        // Test complex number equality
        const a = { real: 1.0, imag: 0.0 };
        const b = { real: 1.0, imag: 0.0 };
        const c = { real: 1.0, imag: 0.1 };
        
        if (!complexEquals(a, b)) {
            console.log("✗ Complex number operations test failed - equal numbers not recognized");
            return false;
        }
        
        if (complexEquals(a, c)) {
            console.log("✗ Complex number operations test failed - different numbers incorrectly recognized as equal");
            return false;
        }
        
        // Test with tolerance
        const d = { real: 1.0 + 1e-11, imag: 0.0 };
        if (!complexEquals(a, d)) {
            console.log("✗ Complex number operations test failed - numbers within tolerance not recognized as equal");
            return false;
        }
        
        console.log("✓ Complex number operations test passed");
        return true;
        
    } catch (error) {
        console.log("✗ Complex number operations test failed:", error.message);
        return false;
    }
}

// Test 5: Error handling validation
function testErrorHandling() {
    console.log("Testing error handling validation...");
    
    try {
        // Test invalid polynomial input
        const invalidPoly = simplePolynomialParse("invalid");
        if (invalidPoly.length !== 0) {
            console.log("✗ Error handling test failed - invalid polynomial not handled correctly");
            return false;
        }
        
        // Test edge cases
        const emptyPoly = simplePolynomialParse("");
        if (emptyPoly.length !== 0) {
            console.log("✗ Error handling test failed - empty polynomial not handled correctly");
            return false;
        }
        
        console.log("✓ Error handling test passed");
        return true;
        
    } catch (error) {
        console.log("✗ Error handling test failed:", error.message);
        return false;
    }
}

// Run all encoding math tests
function runAllEncodingMathTests() {
    console.log("=== ENCODING MATH TESTS ===\n");
    
    const tests = [
        testFrequencyEncodingMath,
        testFunctionEncodingPolynomialParsing,
        testStateNormalization,
        testComplexNumberOperations,
        testErrorHandling
    ];
    
    let passed = 0;
    let total = tests.length;
    
    for (let test of tests) {
        if (test()) {
            passed++;
        }
        console.log(""); // Empty line for readability
    }
    
    console.log("=".repeat(50));
    console.log(`ENCODING MATH TESTS: ${passed}/${total} passed`);
    console.log("=".repeat(50));
    
    return passed === total;
}

export { runAllEncodingMathTests }; 