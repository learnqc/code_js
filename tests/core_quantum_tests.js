// Core Quantum Circuit Test Suite (Node.js compatible)
// Tests the mathematical correctness of quantum operations

// Mock the complex number structure that would be used in the browser
class Complex {
    constructor(real, imag = 0) {
        this.real = real;
        this.imag = imag;
    }
    
    toString() {
        if (this.imag === 0) return this.real.toString();
        if (this.real === 0) return `${this.imag}i`;
        return `${this.real} + ${this.imag}i`;
    }
}

// Simple quantum state representation
class QuantumState {
    constructor(qubits) {
        this.size = Math.pow(2, qubits);
        this.state = new Array(this.size).fill(0).map((_, i) => 
            i === 0 ? new Complex(1) : new Complex(0)
        );
    }
    
    getState() {
        return this.state;
    }
    
    // Apply H gate to a qubit
    h(qubit) {
        const newState = new Array(this.size).fill(0).map(() => new Complex(0));
        const factor = 1 / Math.sqrt(2);
        
        for (let i = 0; i < this.size; i++) {
            const bit = (i >> qubit) & 1;
            const otherBits = i & ~(1 << qubit);
            
            if (bit === 0) {
                // |0⟩ → (|0⟩ + |1⟩)/√2
                newState[otherBits].real += this.state[i].real * factor;
                newState[otherBits].imag += this.state[i].imag * factor;
                newState[otherBits | (1 << qubit)].real += this.state[i].real * factor;
                newState[otherBits | (1 << qubit)].imag += this.state[i].imag * factor;
            } else {
                // |1⟩ → (|0⟩ - |1⟩)/√2
                newState[otherBits].real += this.state[i].real * factor;
                newState[otherBits].imag += this.state[i].imag * factor;
                newState[otherBits | (1 << qubit)].real -= this.state[i].real * factor;
                newState[otherBits | (1 << qubit)].imag -= this.state[i].imag * factor;
            }
        }
        
        this.state = newState;
    }
    
    // Apply X gate to a qubit
    x(qubit) {
        const newState = new Array(this.size).fill(0).map(() => new Complex(0));
        
        for (let i = 0; i < this.size; i++) {
            const bit = (i >> qubit) & 1;
            const otherBits = i & ~(1 << qubit);
            
            if (bit === 0) {
                // |0⟩ → |1⟩
                newState[otherBits | (1 << qubit)] = this.state[i];
            } else {
                // |1⟩ → |0⟩
                newState[otherBits] = this.state[i];
            }
        }
        
        this.state = newState;
    }
    
    // Apply CX gate (CNOT)
    cx(control, target) {
        const newState = new Array(this.size).fill(0).map(() => new Complex(0));
        
        for (let i = 0; i < this.size; i++) {
            const controlBit = (i >> control) & 1;
            const targetBit = (i >> target) & 1;
            const otherBits = i & ~(1 << control) & ~(1 << target);
            
            if (controlBit === 1) {
                // Control is 1, flip target
                const newTargetBit = 1 - targetBit;
                const newIndex = otherBits | (controlBit << control) | (newTargetBit << target);
                newState[newIndex] = this.state[i];
            } else {
                // Control is 0, no change
                newState[i] = this.state[i];
            }
        }
        
        this.state = newState;
    }
    
    // Apply MCX gate (multiple control X)
    mcx(controls, target) {
        const newState = new Array(this.size).fill(0).map(() => new Complex(0));
        
        for (let i = 0; i < this.size; i++) {
            let allControlsOne = true;
            for (const control of controls) {
                if (((i >> control) & 1) === 0) {
                    allControlsOne = false;
                    break;
                }
            }
            
            if (allControlsOne) {
                // All controls are 1, flip target
                const targetBit = (i >> target) & 1;
                const newTargetBit = 1 - targetBit;
                const otherBits = i & ~(1 << target);
                const newIndex = otherBits | (newTargetBit << target);
                newState[newIndex] = this.state[i];
            } else {
                // Not all controls are 1, no change
                newState[i] = this.state[i];
            }
        }
        
        this.state = newState;
    }
}

// Helper function to compare complex numbers (with tolerance)
function complexEquals(a, b, tolerance = 1e-10) {
    return Math.abs(a.real - b.real) < tolerance && Math.abs(a.imag - b.imag) < tolerance;
}

// Helper function to compare state vectors
function stateEquals(state1, state2, tolerance = 1e-10) {
    if (state1.length !== state2.length) return false;
    for (let i = 0; i < state1.length; i++) {
        if (!complexEquals(state1[i], state2[i], tolerance)) {
            console.log(`Mismatch at index ${i}: ${state1[i]} vs ${state2[i]}`);
            return false;
        }
    }
    return true;
}

// Test 1: Basic H gate on single qubit
function testHGate() {
    console.log("Testing H gate on single qubit...");
    const qs = new QuantumState(1);
    qs.h(0);
    const state = qs.getState();
    
    // H|0⟩ = (|0⟩ + |1⟩)/√2
    const expected = [
        new Complex(1/Math.sqrt(2)),
        new Complex(1/Math.sqrt(2))
    ];
    
    if (stateEquals(state, expected)) {
        console.log("✓ H gate test passed");
        return true;
    } else {
        console.log("✗ H gate test failed");
        console.log("Expected:", expected.map(c => c.toString()));
        console.log("Got:", state.map(c => c.toString()));
        return false;
    }
}

// Test 2: X gate (NOT gate)
function testXGate() {
    console.log("Testing X gate...");
    const qs = new QuantumState(1);
    qs.x(0);
    const state = qs.getState();
    
    // X|0⟩ = |1⟩
    const expected = [
        new Complex(0),
        new Complex(1)
    ];
    
    if (stateEquals(state, expected)) {
        console.log("✓ X gate test passed");
        return true;
    } else {
        console.log("✗ X gate test failed");
        return false;
    }
}

// Test 3: CX gate (CNOT)
function testCXGate() {
    console.log("Testing CX gate...");
    const qs = new QuantumState(2);
    qs.h(0); // Put first qubit in superposition
    qs.cx(0, 1); // Apply CX with control=0, target=1
    
    const state = qs.getState();
    
    // H|0⟩ ⊗ |0⟩ = (|0⟩ + |1⟩)/√2 ⊗ |0⟩ = (|00⟩ + |10⟩)/√2
    // Then CX: |00⟩ → |00⟩, |10⟩ → |11⟩
    // Result: (|00⟩ + |11⟩)/√2
    const expected = [
        new Complex(1/Math.sqrt(2)), // |00⟩
        new Complex(0),              // |01⟩
        new Complex(0),              // |10⟩
        new Complex(1/Math.sqrt(2))  // |11⟩
    ];
    
    if (stateEquals(state, expected)) {
        console.log("✓ CX gate test passed");
        return true;
    } else {
        console.log("✗ CX gate test failed");
        return false;
    }
}

// Test 4: Bell state creation
function testBellState() {
    console.log("Testing Bell state creation...");
    const qs = new QuantumState(2);
    qs.h(0);
    qs.cx(0, 1);
    
    const state = qs.getState();
    
    // Should create Bell state (|00⟩ + |11⟩)/√2
    const expected = [
        new Complex(1/Math.sqrt(2)),
        new Complex(0),
        new Complex(0),
        new Complex(1/Math.sqrt(2))
    ];
    
    if (stateEquals(state, expected)) {
        console.log("✓ Bell state test passed");
        return true;
    } else {
        console.log("✗ Bell state test failed");
        return false;
    }
}

// Test 5: Multiple qubit operations
function testMultipleQubits() {
    console.log("Testing multiple qubit operations...");
    const qs = new QuantumState(3);
    qs.h(0);
    qs.x(1);
    qs.mcx([0, 1], 2); // MCX with controls 0,1 and target 2
    
    const state = qs.getState();
    
    // |0⟩ → H → (|0⟩ + |1⟩)/√2
    // |0⟩ → X → |1⟩
    // |0⟩ → MCX(0,1) → |1⟩ only when both controls are 1
    // Result: (|010⟩ + |111⟩)/√2
    
    // Check that only |010⟩ and |111⟩ have non-zero amplitudes
    const zeroAmplitudes = [0, 1, 3, 4, 5, 6]; // Indices that should be zero
    const nonZeroAmplitudes = [2, 7]; // Indices that should be non-zero
    
    let testPassed = true;
    
    for (let i of zeroAmplitudes) {
        if (Math.abs(state[i].real) > 1e-10 || Math.abs(state[i].imag) > 1e-10) {
            console.log(`✗ Amplitude at index ${i} should be zero but is ${state[i]}`);
            testPassed = false;
        }
    }
    
    for (let i of nonZeroAmplitudes) {
        if (Math.abs(state[i].real) < 1e-10 && Math.abs(state[i].imag) < 1e-10) {
            console.log(`✗ Amplitude at index ${i} should be non-zero but is ${state[i]}`);
            testPassed = false;
        }
    }
    
    if (testPassed) {
        console.log("✓ Multiple qubit test passed");
        return true;
    } else {
        console.log("✗ Multiple qubit test failed");
        return false;
    }
}

// Test 6: State normalization
function testStateNormalization() {
    console.log("Testing state normalization...");
    const qs = new QuantumState(2);
    qs.h(0);
    qs.h(1);
    
    const state = qs.getState();
    
    // Calculate norm squared
    let normSquared = 0;
    for (let amplitude of state) {
        normSquared += amplitude.real * amplitude.real + amplitude.imag * amplitude.imag;
    }
    
    if (Math.abs(normSquared - 1) < 1e-10) {
        console.log("✓ State normalization test passed");
        return true;
    } else {
        console.log("✗ State normalization test failed");
        console.log(`Norm squared: ${normSquared}, expected: 1`);
        return false;
    }
}

// Run all tests
function runAllTests() {
    console.log("=== Core Quantum Circuit Test Suite ===\n");
    
    const tests = [
        testHGate,
        testXGate,
        testCXGate,
        testBellState,
        testMultipleQubits,
        testStateNormalization
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
        console.log("🎉 All tests passed! The quantum operations are mathematically correct.");
        return true;
    } else {
        console.log("⚠️  Some tests failed. Please review the implementation.");
        return false;
    }
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runAllTests();
}

export { runAllTests }; 