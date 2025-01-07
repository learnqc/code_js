import {state_table_to_html, is_close, cis, print_state, choices, squaredMagnitude} from "../lib/utils/common.js";
import { init_state, prepare_state, is_power_of_two, process_pair, pair_generator_pattern, transform, is_bit_set, c_transform, measure} from "../lib/simulator/core.js";
import { x, z, phase, h, rz, y, rx, ry } from "../lib/simulator/gates.js"
import { QuantumRegister, QuantumTransformation, QuantumCircuit } from "../lib/simulator/circuit.js";
function uniform(n) {
    let q = new QuantumRegister(n);
    let qc = new QuantumCircuit(q);

    for (let i = 0; i < q.length; i++) {
        qc.h(i); // Apply Hadamard gate
    }

    return qc;
}

function binomial(n, theta) {
    let q = new QuantumRegister(n);
    let qc = new QuantumCircuit(q);

    for (let i = 0; i < q.length; i++) {
        qc.ry(theta, i); // Apply Ry gate with specified angle theta
    }

    return qc;
}

let sharedContext = {
    math: math,
    state: [],
    state_table_to_html: state_table_to_html,
    init_state: init_state,
    is_close: is_close,
    prepare_state: prepare_state,
    is_power_of_two: is_power_of_two,
    cis: cis,
    print_state: print_state,
    x:x,z:z,phase:phase,h:h,rz:rz,y:y,rx:rx,ry:ry,
    process_pair: process_pair,
    choices: choices,
    squaredMagnitude: squaredMagnitude,
    pair_generator_pattern: pair_generator_pattern,
    transform: transform,
    is_bit_set: is_bit_set,
    c_transform: c_transform,
    measure: measure,
    QuantumCircuit: QuantumCircuit,
    QuantumRegister: QuantumRegister,
    QuantumTransformation: QuantumTransformation,
    uniform: uniform,
    binomial: binomial
  };

require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.37.0/min/vs' }});

require(['vs/editor/editor.main'], function() {
    let codeHistory = [];

    function displayStepAndEditor(title, code) {
        const tutorialDiv = document.getElementById("tutorial");

        // Step container
        const stepDiv = document.createElement("div");
        stepDiv.className = "step-container";

        // Title
        const titleEl = document.createElement("p");
        titleEl.className = "step-title";
        titleEl.textContent = title;

        // Editor container
        const editorContainer = document.createElement("div");
        editorContainer.className = "editor-container";

        // Run Button
        const runButton = document.createElement("button");
        runButton.className = "run-button";
        runButton.innerText = "Run Code";

        // Output container
        const outputContainer = document.createElement("div");
        outputContainer.className = "output";

        // Append elements
        editorContainer.appendChild(runButton);
        stepDiv.appendChild(titleEl);
        stepDiv.appendChild(editorContainer);
        stepDiv.appendChild(outputContainer);
        tutorialDiv.appendChild(stepDiv);

        // Monaco Editor setup
        const editor = monaco.editor.create(editorContainer, {
        value: code,
        language: "javascript",
        theme: "vs-light",
        automaticLayout: true // Dynamically adjust to container size
        });

        // Run Code Button Logic
        runButton.onclick = function () {
        runCode(editor, outputContainer);
        };
    }


    function runCode(editor, outputContainer) {
        const code = editor.getValue();
        outputContainer.innerText = ''; // Clear previous output

        // Combine previous code with the current editor's code
        const fullCode = codeHistory.join('\n') + '\n' + code;

        try {
          let result = (function() {
            // Pass the context (math, state) into the function, but avoid reassigning 'state'
            let { math, state, state_table_to_html, init_state, is_close, prepare_state, 
                is_power_of_two, cis, print_state, x, z, phase, h, rz, y, rx, ry, process_pair, 
                choices, squaredMagnitude, pair_generator_pattern, transform, is_bit_set, 
                c_transform, measure, QuantumRegister, QuantumTransformation, QuantumCircuit,
                uniform, binomial } = sharedContext;
            return eval(fullCode);  // Execute the accumulated code with the shared context
          })();

          // If result is undefined, return a default message
          if (result === undefined) {
            result = "No return value from the code.";
          }

          // Update the shared output and display it
          sharedContext.output = result;
          outputContainer.innerText = result;

          // Save the current code for the next step
          codeHistory.push(code);

        } catch (error) {
          outputContainer.innerText = error.message;
        }
      }

    let tutorialDiv = document.getElementById("tutorial");
    let titleEl = document.createElement("h1");
    titleEl.textContent = "Building Quantum Software: Chapter 4";
    tutorialDiv.appendChild(titleEl);

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Two-qubit states (section 4.2.1)";
    tutorialDiv.appendChild(titleEl);

displayStepAndEditor(
    "A two-qubit quantum state can be represented as a list of four complex numbers.",
    `let [p0, p1, p2, p3] = [1, 0, 0, 0];
let [theta0, theta1, theta2, theta3] = [0, 0, 0, 0];

let state = [
    math.complex(math.sqrt(p0) * math.cos(theta0), math.sqrt(p0) * math.sin(theta0)),
    math.complex(math.sqrt(p1) * math.cos(theta1), math.sqrt(p1) * math.sin(theta1)),
    math.complex(math.sqrt(p2) * math.cos(theta2), math.sqrt(p2) * math.sin(theta2)),
    math.complex(math.sqrt(p3) * math.cos(theta3), math.sqrt(p3) * math.sin(theta3)),
];`
);

displayStepAndEditor(
    "Generate normalized random probabilities and angles.",
    `let probs = Array(4).fill(0).map(() => Math.random());
let total = probs.reduce((sum, val) => sum + val, 0);
let normalizedProbs = probs.map(p => p / total);

let angles = Array(4).fill(0).map(() => Math.random() * 2 * Math.PI);

state = normalizedProbs.map((p, i) => 
    math.complex(math.sqrt(p) * math.cos(angles[i]), math.sqrt(p) * math.sin(angles[i]))
);`
);

displayStepAndEditor(
    "Display the quantum state table using state_table_to_html.",
    `(async () => {
    await state_table_to_html(state, "t1");
})();`
);

// Create a placeholder for the table display
const t1 = document.createElement("div");
t1.id = "t1";
document.getElementById("tutorial").appendChild(t1);

tutorialDiv = document.getElementById("tutorial");
titleEl = document.createElement("h1");
titleEl.textContent = "Product states: composing a state from two independent single-qubit states";
tutorialDiv.appendChild(titleEl);

displayStepAndEditor(
        "Shortcut cis function",
        `function cis(theta) {
    return math.complex(math.cos(theta), math.sin(theta));
}`
    )

// Step 1: Define the first quantum state
displayStepAndEditor(
  "Define the first quantum state with p = 0.75 and directions θ₀ = 0° and θ₁ = 60°.",
  `let p = 0.75;
let theta0 = 0;
let theta1 = 60 * (Math.PI / 180); // Convert to radians

let first_state = [
  math.complex(math.sqrt(p) * math.cos(theta0), math.sqrt(p) * math.sin(theta0)),
  math.complex(math.sqrt(1 - p) * math.cos(theta1), math.sqrt(1 - p) * math.sin(theta1))
];

first_state.map(amp => amp.toString());`
);

// Step 2: Define the second quantum state
displayStepAndEditor(
  "Define the second quantum state with q = 0.5 and directions ϕ₀ = 0° and ϕ₁ = -120°.",
  `let q = 0.5;
let phi0 = 0;
let phi1 = -120 * (Math.PI / 180); // Convert to radians

let second_state = [
  math.complex(math.sqrt(q) * math.cos(phi0), math.sqrt(q) * math.sin(phi0)),
  math.complex(math.sqrt(1 - q) * math.cos(phi1), math.sqrt(1 - q) * math.sin(phi1))
];

second_state.map(amp => amp.toString());`
);

// Step 3: Combine two states to form a two-qubit state
displayStepAndEditor(
  "Create a two-qubit state by combining the two single-qubit states.",
  `let new_state = [
  math.multiply(first_state[0], second_state[0]),
  math.multiply(first_state[0], second_state[1]),
  math.multiply(first_state[1], second_state[0]),
  math.multiply(first_state[1], second_state[1])
];

new_state.map(amp => amp.toString());`
);

// Step 4: Alternate definition for the two-qubit state
displayStepAndEditor(
  "Alternative definition of the two-qubit state using probabilities and angles.",
  `new_state = [
  math.complex(math.sqrt(p * q) * math.cos(theta0 + phi0), math.sqrt(p * q) * math.sin(theta0 + phi0)),
  math.complex(math.sqrt(p * (1 - q)) * math.cos(theta0 + phi1), math.sqrt(p * (1 - q)) * math.sin(theta0 + phi1)),
  math.complex(math.sqrt((1 - p) * q) * math.cos(theta1 + phi0), math.sqrt((1 - p) * q) * math.sin(theta1 + phi0)),
  math.complex(math.sqrt((1 - p) * (1 - q)) * math.cos(theta1 + phi1), math.sqrt((1 - p) * (1 - q)) * math.sin(theta1 + phi1))
];

new_state.map(amp => amp.toString());`
);


titleEl = document.createElement("h1");
titleEl.textContent = "Examples of non-product states: Bell states";
tutorialDiv.appendChild(titleEl);

displayStepAndEditor(
    "Define Bell states 1 and 2",
    `let bell_state1 = [math.sqrt(0.5), math.complex(0, 0), math.complex(0, 0), math.sqrt(0.5)];
let bell_state2 = [math.sqrt(0.5), math.complex(0, 0), math.complex(0, 0), math.complex(-math.sqrt(0.5), 0)];

(async () => {
    await state_table_to_html(bell_state1, "t2");
    await state_table_to_html(bell_state2, "t3");
})();`
);

let table2 = document.createElement("div");
table2.id = "t2";
document.getElementById("tutorial").appendChild(table2);

let table3 = document.createElement("div");
table3.id = "t3";
document.getElementById("tutorial").appendChild(table3);

displayStepAndEditor(
    "Define Bell states 3 and 4",
    `let bell_state3 = [math.complex(0, 0), math.sqrt(0.5), math.sqrt(0.5), math.complex(0, 0)];
let bell_state4 = [math.complex(0, 0), math.sqrt(0.5), math.complex(-math.sqrt(0.5), 0), math.complex(0, 0)];

(async () => {
    await state_table_to_html(bell_state3, "t4");
    await state_table_to_html(bell_state4, "t5");
})();`
);

let table4 = document.createElement("div");
table4.id = "t4";
document.getElementById("tutorial").appendChild(table4);

let table5 = document.createElement("div");
table5.id = "t5";
document.getElementById("tutorial").appendChild(table5);


titleEl = document.createElement("h1");
titleEl.textContent = "Two-qubit states (section 4.2.2)";
document.getElementById("tutorial").appendChild(titleEl);

// Step 1: Define the amplitude list
displayStepAndEditor(
    "Let's define a state with the following eight complex numbers",
    `let amplitude_list = [
    math.complex(0.09858, 0.03637), 
    math.complex(0.07478, 0.06912), 
    math.complex(0.04852, 0.10526), 
    math.complex(0.00641, 0.16322), 
    math.complex(-0.12895, 0.34953), 
    math.complex(0.58403, -0.6318), 
    math.complex(0.18795, -0.08665), 
    math.complex(0.12867, -0.00506)
];`
);

// Step 2: Prepare the state (no implementation for `is_power_of_two`)
displayStepAndEditor(
    "Function for validating a list of complex numbers as a valid quantum state",
    `function prepare_state(...a) {
    const state = [...a];
    if (!is_power_of_two(state.length)) {
        throw new Error("Length of state must be a power of two");
    }
    const norm = state.reduce((acc, val) => acc + math.pow(math.abs(val), 2), 0);
    if (!is_close(norm, 1.0)) {
        throw new Error("State is not normalized");
    }
    return state;
}`
);

displayStepAndEditor(
    "",
    `state = prepare_state(...amplitude_list);`
);

titleEl = document.createElement("h1");
titleEl.textContent = "Building state tables";
document.getElementById("tutorial").appendChild(titleEl);


// Step 1: List for outcomes and corresponding amplitudes
displayStepAndEditor(
    "List outcomes and their corresponding amplitudes",
    `let outcome_amplitudes = state.map((amp, index) => [index, amp]);

let output1 = "";
outcome_amplitudes.forEach(row => {
    output1 += \`[\${row[0]}, \${row[1]}]\\n\`;
});
output1;`
);

// Step 2: Add probabilities with direction, derived from amplitudes
displayStepAndEditor(
    "Add probabilities with direction, derived from amplitudes",
    `let table1 = state.map((amp, index) => [
    index,
    math.round((math.atan2(amp.im, amp.re) / (2 * math.PI)) * 360, 5), // Direction
    math.round(math.pow(math.abs(amp), 2), 5) // Probability
]);

let output2 = "";
table1.forEach(row => {
    output2 += \`[\${row[0]}, \${row[1]}, \${row[2]}]\\n\`;
});
output2;`
);

// Step 3: Expanded version with amplitude, direction, magnitude, and probability
displayStepAndEditor(
    "Build an expanded state table with amplitude, direction, magnitude, and probability",
    `let expanded_table = state.map((amp, index) => [
    index,
    amp,
    math.round((math.atan2(amp.im, amp.re) / (2 * math.PI)) * 360, 5), // Direction
    math.round(math.abs(amp), 5), // Magnitude
    math.round(math.pow(math.abs(amp), 2), 5) // Probability
]);

let output3 = "";
expanded_table.forEach(row => {
    output3 += \`[\${row[0]}, \${row[1]}, \${row[2]}, \${row[3]}, \${row[4]}]\\n\`;
});
output3;`
);

// Step 4: Get amplitudes back from directions and probabilities
displayStepAndEditor(
    "Get amplitudes back from directions and probabilities",
    `let table2 = table1.map(row => [
    row[0], // Outcome
    math.complex(
        math.round(math.sqrt(row[2]) * math.cos(row[1] * (math.PI / 180)), 5), 
        math.round(math.sqrt(row[2]) * math.sin(row[1] * (math.PI / 180)), 5)
    )
]);

let output4 = "";
table2.forEach(row => {
    output4 += \`[\${row[0]}, \${row[1]}]\\n\`;
});
output4;`
);

// Step 5: Visualize the expanded state table
displayStepAndEditor(
    "Visualize the expanded state table",
    `(async () => {
    await state_table_to_html(state, "t8");
})();`
);

// Create a new table div
let table8 = document.createElement("div");
table8.id = "t8";
document.getElementById("tutorial").appendChild(table8);

titleEl = document.createElement("h1");
titleEl.textContent = "Simulating multi-qubit states (section 4.2.3)";
document.getElementById("tutorial").appendChild(titleEl);

displayStepAndEditor(
    "Function to create a default quantum state",
    `function init_state(n) {
    const state = Array(Math.pow(2, n)).fill(null).map(() => math.complex(0, 0));

    state[0] = math.complex(1, 0);

    return state;
}
    `
)

displayStepAndEditor(
    "Initialize a two-qubit state",
    `state = init_state(2);
state;
    `
)

titleEl = document.createElement("h1");
titleEl.textContent = "Pair selection in Python (section 4.3.2)";
document.getElementById("tutorial").appendChild(titleEl);


displayStepAndEditor(
    "Listing 4.3 Traverse by chunk method selecting pairs",
`function* pair_generator_pattern(n, t) {
    const distance = 2 ** t;
    for (let j = 0; j < 2 ** (n - t - 1); j++) {
        for (let k0 = 2 * j * distance; k0 < (2 * j + 1) * distance; k0++) {
            const k1 = k0 + distance;
            yield [k0, k1];
        }
    }
}`
)

displayStepAndEditor(
    "Example of generate the pairs using this method for three qubits (n = 3) and target qubit 0 (t = 0)",
`let output = "";
for (const [k0, k1] of pair_generator_pattern(3, 0)) {
    output += \`\${k0} \${k1}\\n\`;
}
output;`
);

titleEl = document.createElement("h1");
titleEl.textContent = "Simulating amplitude changes (section 4.3.3)";
document.getElementById("tutorial").appendChild(titleEl);

displayStepAndEditor(
    "Listing 4.4 Functions for simulating a gate transformation on a multi-qubit state",
    `function process_pair(state, gate, k0=0, k1=1) {
const x = state[k0];
const y = state[k1];
state[k0] = math.add(math.multiply(x, gate[0][0]), math.multiply(y, gate[0][1]));
state[k1] = math.add(math.multiply(x, gate[1][0]), math.multiply(y, gate[1][1]));
}

function transform(state, t, gate) {
    const n = Math.log2(state.length);
    for (const [k0, k1] of pair_generator(n, t)) {
        if (k1 >= state.length) {
            continue;
        }
        process_pair(state, gate, k0, k1);
    }
}`
);

displayStepAndEditor(
    ``,
    `const pair_generator = pair_generator_pattern;
`
)

displayStepAndEditor(
    "Apply an X-gate to target qubit 0:",
`state = [
    math.complex(0.09858, 0.03637), math.complex(0.07478, 0.06912),
    math.complex(0.04852, 0.10526), math.complex(0.00641, 0.16322),
    math.complex(-0.12895, 0.34953), math.complex(0.58403, -0.6318),
    math.complex(0.18795, -0.08665), math.complex(0.12867, -0.00506)
];

transform(state, 0, x);
state;`
);

titleEl = document.createElement("h1");
titleEl.textContent = "Encoding a uniform distribution in a multi-qubit quantum system (section 4.3.4)";
document.getElementById("tutorial").appendChild(titleEl);

displayStepAndEditor(
    "First, we initialize a three-qubit state:",
`let state = init_state(3);
state;`
);

displayStepAndEditor(
    "Apply a Hadamard gate to target qubit 0:",
`transform(state, 0, h);
state;`
);

displayStepAndEditor(
    "Apply a Hadamard gate to target qubit 1:",
`state = init_state(3);
transform(state, 1, h);
state;`
);

displayStepAndEditor(
    "Apply a Hadamard gate to each qubit:",
`state = init_state(3);
transform(state, 0, h);
transform(state, 1, h);
transform(state, 2, h);
state;`
);

// Step 5: Visualize the expanded state table
displayStepAndEditor(
    "Visualize the uniform state table:",
`(async () => {
    await state_table_to_html(state, "t9");
})();`
);

// Create a new table div
let table9 = document.createElement("div");
table9.id = "t9";
document.getElementById("tutorial").appendChild(table9);

titleEl = document.createElement("h1");
titleEl.textContent = "Simulating controlled gates in Python (section 4.4.1)";
document.getElementById("tutorial").appendChild(titleEl);



displayStepAndEditor(
    "Listing 4.5 Function for applying controlled gate transformations to a state",
`function is_bit_set(m, k) {
    return (m & (1 << k)) !== 0;
}

function c_transform(state, c, t, gate) {
    const n = Math.log2(state.length);
    for (const [k0, k1] of Array.from(pair_generator(n, t)).filter(p => is_bit_set(p[0], c))) {
        process_pair(state, gate, k0, k1);
    }
}
`
);

displayStepAndEditor(
    "Example state:",
`state = [
    math.complex(0.09858, 0.03637), math.complex(0.07478, 0.06912),
    math.complex(0.04852, 0.10526), math.complex(0.00641, 0.16322),
    math.complex(-0.12895, 0.34953), math.complex(0.58403, -0.6318),
    math.complex(0.18795, -0.08665), math.complex(0.12867, -0.00506)
];
state;`
);

displayStepAndEditor(
    "Apply a controlled X-gate to target qubit 2 with control qubit 1:",
`c_transform(state, 1, 2, x);
state;`
);

titleEl = document.createElement("h1");
titleEl.textContent = "Simulating multi-control gates in Python (section 4.4.2)";
document.getElementById("tutorial").appendChild(titleEl);

displayStepAndEditor(
    "Listing 4.5 Function for applying controlled gate transformations to a state",
`function mc_transform(state, cs, t, gate) {
    if (cs.includes(t)) {
        throw new Error("Target qubit cannot be one of the control qubits");
    }
    const n = Math.log2(state.length);
    for (const [k0, k1] of Array.from(pair_generator(n, t)).filter(p => cs.every(c => is_bit_set(p[0], c)))) {
        process_pair(state, gate, k0, k1);
    }
}`
);

displayStepAndEditor(
    "Example state:",
`state = [
    math.complex(0.09858, 0.03637), math.complex(0.07478, 0.06912),
    math.complex(0.04852, 0.10526), math.complex(0.00641, 0.16322),
    math.complex(-0.12895, 0.34953), math.complex(0.58403, -0.6318),
    math.complex(0.18795, -0.08665), math.complex(0.12867, -0.00506)
];
state;`
);

displayStepAndEditor(
    "If we apply a controlled transformation with two control qubits to a three-qubit state, there will be only one pair. For example, if the target qubit is 0, and the control qubits are 1 and 2, the pair selected will be '110' and '111' (outcomes 6 and 7).",
`mc_transform(state, [1, 2], 0, x);
state;`
);


titleEl = document.createElement("h1");
titleEl.textContent = "Simulating measurement of multi-qubit states (section 4.5.1)";
document.getElementById("tutorial").appendChild(titleEl);

displayStepAndEditor(
    "Listing 4.7 Function for simulating measurement of a quantum state",
`function measure(state, shots) {
    const probabilities = state.map(c => Math.pow(math.abs(c), 2)); // Calculate probabilities
    const counts = {};

    for (let i = 0; i < shots; i++) {
        const r = Math.random(); // Random value between 0 and 1
        let cumulative = 0;

        // Determine the outcome based on cumulative probabilities
        for (let k = 0; k < probabilities.length; k++) {
            cumulative += probabilities[k];
            if (r <= cumulative) {
                counts[k] = (counts[k] || 0) + 1; // Increment the count for outcome k
                break;
            }
        }
    }

    return counts;
}`
);

displayStepAndEditor(
    "Example state:",
`state = [
    math.complex(0.09858, 0.03637), math.complex(0.07478, 0.06912),
    math.complex(0.04852, 0.10526), math.complex(0.00641, 0.16322),
    math.complex(-0.12895, 0.34953), math.complex(0.58403, -0.6318),
    math.complex(0.18795, -0.08665), math.complex(0.12867, -0.00506)
];
state;`
);

displayStepAndEditor(
    "Calculate and display the probabilities of each outcome:",
`let probabilities = state.map((amplitude, k) => [k, Math.pow(math.abs(amplitude), 2)]);
let output = "";
probabilities.forEach(([k, prob]) => {
    output += \`probability of outcome \${k} : \${prob.toFixed(3)}\\n\`;
});
output;`
);

displayStepAndEditor(
    "Let's simulate the outcomes of 100 executions of the computation which creates our example state:",
`let samples = measure(state, 100);
JSON.stringify(samples, null, 2);`
);

titleEl = document.createElement("h1");
titleEl.textContent = "Quantum registers and circuits in code (section 4.5.2)";
document.getElementById("tutorial").appendChild(titleEl);

displayStepAndEditor(
    "Listing 4.8 The quantum register class",
`class QuantumRegister {
    constructor(size, shift = 0) {
        this.size = size;
        this.shift = shift;
    }

    get(key) {
        if (typeof key === 'number') {
            if (key < 0) {
                key += this.size;
            }
            if (key >= 0 && key < this.size) {
                return this.shift + key;
            }
        } else if (Array.isArray(key)) {
            return key.map(k => this.get(k));
        }
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.size; i++) {
            yield this.shift + i;
        }
    }

    reverse() {
        return [...this].reverse();
    }

    length() {
        return this.size;
    }
}`
);


displayStepAndEditor(
    "Listing 4.9 The quantum transformation class:",
`class QuantumTransformation {
    constructor(gate, target, controls = [], name = null, arg = null) {
        this.gate = gate;
        this.target = target;
        this.controls = controls;
        this.name = name;
        this.arg = arg;
    }

    toString() {
        return \`\${this.name} \${this.arg !== null ? Math.round(this.arg * 100) / 100 : ""} \${this.controls} \${this.target}\`;
    }

    clone() {
        return new QuantumTransformation(this.gate, this.target, [...this.controls], this.name, this.arg);
    }
}`
);

displayStepAndEditor(
    "Listing 4.10 Partial implementation of the quantum circuit class",
`class QuantumCircuit {
    constructor(...args) {
        let bits = 0;
        let regs = [];

        for (let reg of args) {
            if (typeof reg === 'number') {
                reg = { size: reg, shift: bits };
            } else if (typeof reg.size === 'number') {
                reg.shift = bits;
            } else {
                throw new Error('Invalid argument passed to QuantumCircuit constructor');
            }

            bits += reg.size;
            regs.push(reg.size);
        }

        this.state = init_state(bits); // Initialize the quantum state
        this.transformations = [];     // List to store transformations
        this.regs = regs;              // Register sizes
    }

    initialize(state) {
        this.state = state;
    }

    x(t) {
        this.transformations.push(new QuantumTransformation(x, t, [], 'x'));
    }

    h(t) {
        this.transformations.push(new QuantumTransformation(h, t, [], 'h'));
    }

    ry(theta, t) {
        this.transformations.push(new QuantumTransformation(ry(theta), t, [], 'ry', theta));
    }

    cx(c, t) {
        this.transformations.push(new QuantumTransformation(x, t, [c], 'cx'));
    }

    mcx(cs, t) {
        this.transformations.push(new QuantumTransformation(x, t, cs, 'mcx'));
    }

    measure(shots = 0) {
        const state = this.run();
        const samples = measure(state, shots);
        return { 'state vector': state, counts: samples };
    }

    run() {
        for (let tr of this.transformations) {
            const cs = tr.controls;

            if (cs.length === 0) {
                transform(this.state, tr.target, tr.gate); // Single-qubit gate
            } else if (cs.length === 1) {
                c_transform(this.state, cs[0], tr.target, tr.gate); // Controlled gate
            } else {
                mc_transform(this.state, cs, tr.target, tr.gate); // Multi-controlled gate
            }
        }
        this.transformations = []; // Reset transformations after execution
        return this.state;
    }
}
`
);

displayStepAndEditor(
    "Example three-qubit circuit:",
`let q = new QuantumRegister(3);
let qc = new QuantumCircuit(q);

qc.h(0);            // Apply Hadamard gate to qubit 0
qc.h(1);            // Apply Hadamard gate to qubit 1
qc.mcx([0, 1], 2); // Multi-controlled X gate with q[0] and q[1] as controls, q[2] as target`
);

displayStepAndEditor(
    "",
`state = qc.run();`
);


// Step 1.2: Print the state table
displayStepAndEditor(
    "Print the state table:",
`(async () => {
    await state_table_to_html(state, "t10");
})();`
);

// Create a new table div
let table10 = document.createElement("div");
table10.id = "t10";
document.getElementById("tutorial").appendChild(table10);

// Step 2.1: Simulate measurements
displayStepAndEditor(
    "Simulate measurement on the resulting state with the measure function:",
`let samples = measure(state, 1000);
JSON.stringify(samples, null, 2);`
);


// Add section title in bold
titleEl = document.createElement("h1");
titleEl.textContent = "Reimplementing the uniform distribution with registers and circuits (section 4.5.3)";
document.getElementById("tutorial").appendChild(titleEl);

// Step 2.1: Apply Hadamard gates to all qubits
displayStepAndEditor(
    "",
`let q = new QuantumRegister(3);
let qc = new QuantumCircuit(q);

for (let i = 0; i < 3; i++) {
    qc.h(i); // Apply Hadamard gate to each qubit
}

state = qc.run();`
);

// Step 2.2: Print the state table
displayStepAndEditor(
    "Print the uniform distribution state table:",
`(async () => {
    await state_table_to_html(state, "t11");
})();`
);

// Create a new table div
let table11 = document.createElement("div");
table11.id = "t11";
document.getElementById("tutorial").appendChild(table11);

// Uniform Distribution Function
displayStepAndEditor(
    "Function for encoding the uniform distribution:",
`function uniform(n) {
    let q = new QuantumRegister(n);
    let qc = new QuantumCircuit(q);

    for (let i = 0; i < q.length; i++) {
        qc.h(i); // Apply Hadamard gate
    }

    return qc;
}`
);

// Add section title for Binomial Distribution
let titleEl2 = document.createElement("h1");
titleEl2.textContent = "Encoding the Binomial distribution in a multi-qubit state (section 4.5.4)";
document.getElementById("tutorial").appendChild(titleEl2);

// Binomial Distribution
displayStepAndEditor(
    "Apply Ry gates to encode the binomial distribution:",
`q = new QuantumRegister(3);
qc = new QuantumCircuit(q);

for (let i = 0; i < 3; i++) {
    qc.ry(Math.PI / 3, i); // Apply Ry gate with theta = π/3
}

state = qc.run();`
);

// Print state table
displayStepAndEditor(
    "Print the binomial distribution state table:",
`(async () => {
    await state_table_to_html(state, "t13");
})();`
);
let table13 = document.createElement("div");
table13.id = "t13";
document.getElementById("tutorial").appendChild(table13);

// Binomial Distribution Function
displayStepAndEditor(
    "Function for encoding the binomial distribution:",
`function binomial(n, theta) {
    let q = new QuantumRegister(n);
    let qc = new QuantumCircuit(q);

    for (let i = 0; i < q.length; i++) {
        qc.ry(theta, i); // Apply Ry gate with specified angle theta
    }

    return qc;
}`
);

// Add section title for Implementing the Bell States
let titleEl3 = document.createElement("h1");
titleEl3.textContent = "Implementing the Bell states (section 4.5.5)";
document.getElementById("tutorial").appendChild(titleEl3);

// First Bell State
displayStepAndEditor(
    "Create the first Bell state:",
`q = new QuantumRegister(2);
qc = new QuantumCircuit(q);

qc.h(0);        // Apply Hadamard gate to qubit 0
qc.cx(0, 1);    // Controlled-X gate (CNOT) with qubit 0 controlling qubit 1

state = qc.run();`
);

// Print state table for first Bell state
displayStepAndEditor(
    "Print the first Bell state table:",
`(async () => {
    await state_table_to_html(state, "t14");
})();`
);
let table14 = document.createElement("div");
table14.id = "t14";
document.getElementById("tutorial").appendChild(table14);

// Third Bell State
displayStepAndEditor(
    "Create the third Bell state:",
`q = new QuantumRegister(2);
qc = new QuantumCircuit(q);

qc.h(0);        // Apply Hadamard gate to qubit 0
qc.x(1);        // Apply Pauli-X gate to qubit 1
qc.cx(0, 1);    // Controlled-X gate (CNOT) with qubit 0 controlling qubit 1

state = qc.run();`
);

// Print state table for third Bell state
displayStepAndEditor(
    "Print the third Bell state table:",
`(async () => {
    await state_table_to_html(state, "t15");
})();`
);
let table15 = document.createElement("div");
table15.id = "t15";
document.getElementById("tutorial").appendChild(table15);

















});

