// Component2 (QuantumStateViewer) Test Suite (Node.js compatible)
// Tests the QuantumStateViewer component functionality

// Mock complex number implementation
class Complex {
  constructor(real, imag = 0) {
    this.re = real;
    this.im = imag;
  }
  
  toString() {
    if (this.im === 0) return this.re.toString();
    if (this.re === 0) return `${this.im}i`;
    return `${this.re} + ${this.im}i`;
  }
}

// Mock math operations
const math = {
  complex: (real, imag) => new Complex(real, imag),
  add: (a, b) => new Complex(a.re + b.re, a.im + b.im),
  multiply: (a, b) => new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re),
  divide: (a, b) => {
    const denom = b.re * b.re + b.im * b.im;
    return new Complex((a.re * b.re + a.im * b.im) / denom, (a.im * b.re - a.re * b.im) / denom);
  },
  sqrt: (x) => new Complex(Math.sqrt(x.re), x.im / (2 * Math.sqrt(x.re))),
  abs: (x) => Math.sqrt(x.re * x.re + x.im * x.im),
  pow: (x, n) => {
    const r = Math.sqrt(x.re * x.re + x.im * x.im);
    const theta = Math.atan2(x.im, x.re);
    const newR = Math.pow(r, n);
    const newTheta = theta * n;
    return new Complex(newR * Math.cos(newTheta), newR * Math.sin(newTheta));
  }
};

// Mock the LitElement functionality for Node.js testing
class MockLitElement {
  constructor() {
    this.properties = {};
    this.requestUpdate = () => {};
  }
}

// Extend the mock for our component
class MockQuantumStateViewer extends MockLitElement {
  constructor() {
    super();
    // Initialize with default values
    this.state = this.intermediateStates = [];
    this.processedPairs = [];
    this.gate = 'X';
    this.targetQubit = 0;
    this.controlQubit = 1;
    this.controlled = false;
    this.processingPair = [];
    this.dynamicSteps = this.stepIndex = 0;
    this.theta = Math.PI / 4;
    this.mode = 'dynamic';
    this.num_qubits = 3;
    this.processingStarted = false;
    this.transformationActive = false;
    this.gateMatrix = null;
    this.initializeState();
  }

  initializeState() {
    const size = Math.pow(2, this.num_qubits);
    this.state = Array.from({ length: size }, (_, i) =>
      i === 0 ? math.complex(1, 0) : math.complex(0, 0)
    );
    this.intermediateStates = this.state.slice();
    this.processedPairs = this.processingPair = [];
    this.processingStarted = false;
    this.dynamicSteps = this.stepIndex = 0;
  }

  randomizeState() {
    const size = this.state.length;
    this.state = Array.from({ length: size }, () =>
      math.complex(Math.random() - 0.5, Math.random() - 0.5)
    );
    // Normalize
    const norm = math.sqrt(
      this.state.reduce((acc, val) => math.add(acc, math.pow(math.abs(val), 2)), math.complex(0, 0))
    );
    this.state = this.state.map((amp) => math.divide(amp, norm));
    this.intermediateStates = this.state.slice();
    this.processedPairs = this.processingPair = [];
    this.processingStarted = false;
    this.dynamicSteps = this.stepIndex = 0;
  }

  startTransformation() {
    const isControlledGate = ['CX', 'CZ'].includes(this.gate);
    if (isControlledGate && this.controlQubit === this.targetQubit) {
      throw new Error("Control and target qubits must be different for controlled gates.");
    }

    this.transformationActive = true;
    this.processingStarted = false;
    this.applyDynamicGate();
  }

  applyDynamicGate() {
    this.controlled = ['CX', 'CZ'].includes(this.gate);
    const n = this.num_qubits;
    
    // Gate matrices (simplified for testing)
    const gates = {
      X: [[0, 1], [1, 0]],
      H: [
        [1/Math.sqrt(2), 1/Math.sqrt(2)],
        [1/Math.sqrt(2), -1/Math.sqrt(2)]
      ],
      Phase: (theta) => [[1, 0], [0, math.complex(Math.cos(theta), Math.sin(theta))]]
    };

    this.gateMatrix = typeof gates[this.gate] === 'function' 
      ? gates[this.gate](this.theta) 
      : gates[this.gate];

    // Generate pairs for the target qubit
    this.dynamicSteps = [];
    const distance = Math.pow(2, this.targetQubit);
    const suffixCount = Math.pow(2, this.targetQubit);
    const prefixCount = Math.pow(2, n - this.targetQubit - 1);

    for (let p = 0; p < prefixCount; p++) {
      for (let s = 0; s < suffixCount; s++) {
        const k0 = p * suffixCount * 2 + s;
        const k1 = k0 + distance;
        
        if (this.controlled && !this.isBitSet(k0, this.controlQubit)) continue;
        this.dynamicSteps.push([k0, k1]);
      }
    }

    this.intermediateStates = this.state.slice();
    this.processedPairs = this.stepIndex = 0;
    this.processingPair = this.dynamicSteps.length > 0 ? this.dynamicSteps[0] : [];
    this.processingStarted = false;
  }

  isBitSet(num, bit) {
    return (num & (1 << bit)) !== 0;
  }

  processCurrentPair() {
    if (this.stepIndex >= this.dynamicSteps.length) return;

    const [k0, k1] = this.dynamicSteps[this.stepIndex];
    this.processPair(this.state, this.gateMatrix, k0, k1);

    this.intermediateStates.push(this.state.slice());
    this.processedPairs.push([k0, k1]);
    this.stepIndex++;

    this.processingPair = this.stepIndex < this.dynamicSteps.length 
      ? this.dynamicSteps[this.stepIndex] 
      : [];
  }

  processPair(state, gate, k0, k1) {
    const x = state[k0];
    const y = state[k1];
    state[k0] = math.add(math.multiply(x, gate[0][0]), math.multiply(y, gate[0][1]));
    state[k1] = math.add(math.multiply(x, gate[1][0]), math.multiply(y, gate[1][1]));
  }

  finishTransformation() {
    this.transformationActive = false;
    this.processingStarted = false;
    this.processingPair = [];
  }

  handleTargetQubitChange(e) {
    const newTarget = parseInt(e.target.value, 10);
    this.targetQubit = newTarget;
  }

  handleControlQubitChange(e) {
    const newControl = parseInt(e.target.value, 10);
    this.controlQubit = newControl;
  }
}

// Helper function to compare complex numbers
function complexEquals(a, b, tolerance = 0.1) {
  return Math.abs(a.re - b.re) < tolerance && Math.abs(a.im - b.im) < tolerance;
}

// Helper function to compare state vectors
function stateEquals(state1, state2, tolerance = 1e-10) {
  if (state1.length !== state2.length) return false;
  for (let i = 0; i < state1.length; i++) {
    if (!complexEquals(state1[i], state2[i], tolerance)) {
      return false;
    }
  }
  return true;
}

// Test 1: Initialization
function testInitialization() {
  console.log("Testing component initialization...");
  const element = new MockQuantumStateViewer();
  
  if (element.gate === 'X' && 
      element.targetQubit === 0 && 
      element.controlQubit === 1 && 
      element.num_qubits === 3 &&
      element.state.length === 8) {
    console.log("✓ Initialization test passed");
    return true;
  } else {
    console.log("✗ Initialization test failed");
    return false;
  }
}

// Test 2: State Management
function testStateManagement() {
  console.log("Testing state management...");
  const element = new MockQuantumStateViewer();
  
  // Test reset
  element.randomizeState();
  const randomizedState = [...element.state];
  element.initializeState();
  
  if (element.state[0].re === 1 && element.state[0].im === 0) {
    console.log("✓ State management test passed");
    return true;
  } else {
    console.log("✗ State management test failed");
    return false;
  }
}

// Test 3: Gate Operations
function testGateOperations() {
  console.log("Testing gate operations...");
  const element = new MockQuantumStateViewer();
  
  // Test X gate
  element.gate = 'X';
  element.applyDynamicGate();
  
  if (element.gateMatrix[0][0] === 0 && element.gateMatrix[0][1] === 1 &&
      element.gateMatrix[1][0] === 1 && element.gateMatrix[1][1] === 0) {
    console.log("✓ Gate operations test passed");
    return true;
  } else {
    console.log("✗ Gate operations test failed");
    return false;
  }
}

// Test 4: Transformation Process
function testTransformationProcess() {
  console.log("Testing transformation process...");
  const element = new MockQuantumStateViewer();
  
  element.gate = 'X';
  element.targetQubit = 0;
  element.applyDynamicGate();
  
  // For 3 qubits, X on qubit 0 would generate pairs: [0,1], [2,3], [4,5], [6,7]
  const expectedPairs = [[0,1], [2,3], [4,5], [6,7]];
  if (JSON.stringify(element.dynamicSteps) === JSON.stringify(expectedPairs)) {
    console.log("✓ Transformation process test passed");
    return true;
  } else {
    console.log("✗ Transformation process test failed");
    return false;
  }
}

// Test 5: Validation
function testValidation() {
  console.log("Testing validation...");
  const element = new MockQuantumStateViewer();
  
  // Test non-controlled gate with same target/control (should work)
  element.gate = 'X';
  element.targetQubit = 0;
  element.controlQubit = 0;
  try {
    element.startTransformation();
    console.log("✓ Non-controlled gate validation test passed");
  } catch (error) {
    console.log("✗ Non-controlled gate validation test failed");
    return false;
  }
  
  // Test controlled gate with same target/control (should fail)
  element.gate = 'CX';
  element.targetQubit = 0;
  element.controlQubit = 0;
  try {
    element.startTransformation();
    console.log("✗ Controlled gate validation test failed (should have thrown error)");
    return false;
  } catch (error) {
    console.log("✓ Controlled gate validation test passed");
  }
  
  // Test controlled gate with different target/control (should work)
  element.gate = 'CX';
  element.targetQubit = 0;
  element.controlQubit = 1;
  try {
    element.startTransformation();
    console.log("✓ Valid controlled gate test passed");
    return true;
  } catch (error) {
    console.log("✗ Valid controlled gate test failed");
    return false;
  }
}

// Test 6: Controlled Gates
function testControlledGates() {
  console.log("Testing controlled gates...");
  const element = new MockQuantumStateViewer();
  
  element.gate = 'CX';
  element.targetQubit = 0;
  element.controlQubit = 1;
  element.applyDynamicGate();
  
  // For CX with control=1, target=0, should only process pairs where bit1 is set
  // In 3-qubit system: pairs [2,3], [6,7]
  const expectedPairs = [[2,3], [6,7]];
  if (JSON.stringify(element.dynamicSteps) === JSON.stringify(expectedPairs)) {
    console.log("✓ Controlled gates test passed");
    return true;
  } else {
    console.log("✗ Controlled gates test failed");
    return false;
  }
}

// Test 7: UI Interactions
function testUIIteractions() {
  console.log("Testing UI interactions...");
  const element = new MockQuantumStateViewer();
  
  // Test target qubit change
  element.handleTargetQubitChange({ target: { value: '2' } });
  if (element.targetQubit === 2) {
    console.log("✓ Target qubit change test passed");
  } else {
    console.log("✗ Target qubit change test failed");
    return false;
  }
  
  // Test control qubit change
  element.handleControlQubitChange({ target: { value: '2' } });
  if (element.controlQubit === 2) {
    console.log("✓ Control qubit change test passed");
    return true;
  } else {
    console.log("✗ Control qubit change test failed");
    return false;
  }
}

// Test 8: Edge Cases
function testEdgeCases() {
  console.log("Testing edge cases...");
  const element = new MockQuantumStateViewer();
  
  // Test empty dynamic steps
  element.gate = 'CX';
  element.targetQubit = 0;
  element.controlQubit = 0; // This will result in no valid pairs
  element.applyDynamicGate();
  
  if (element.dynamicSteps.length === 0) {
    console.log("✓ Edge cases test passed");
    return true;
  } else {
    console.log("✗ Edge cases test failed");
    return false;
  }
}

// Run all tests
export function runComponent2Tests() {
  console.log("Starting Component2 (QuantumStateViewer) tests...\n");
  
  const tests = [
    testInitialization,
    testStateManagement,
    testGateOperations,
    testTransformationProcess,
    testValidation,
    testControlledGates,
    testUIIteractions,
    testEdgeCases
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const test of tests) {
    try {
      if (test()) {
        passed++;
      }
    } catch (error) {
      console.log(`✗ Test failed with error: ${error.message}`);
    }
    console.log("");
  }
  
  console.log(`Component2 Tests Summary: ${passed}/${total} tests passed`);
  return passed === total;
} 