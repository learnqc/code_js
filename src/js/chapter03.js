import {state_table_to_html, is_close, cis, print_state, choices, squaredMagnitude} from "../lib/utils/common.js";
import { init_state, prepare_state, is_power_of_two, process_pair} from "../lib/simulator/core.js";
import { x, z, phase, h, rz, y, rx, ry } from "../lib/simulator/gates.js"

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
    squaredMagnitude: squaredMagnitude
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
            let { math, state, state_table_to_html, init_state, is_close, prepare_state, is_power_of_two, cis, print_state, x, z, phase, h, rz, y, rx, ry, process_pair, choices, squaredMagnitude } = sharedContext;
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
    titleEl.textContent = "Building Quantum Software: Chapter 3";
    tutorialDiv.appendChild(titleEl);

    tutorialDiv = document.getElementById("tutorial");
    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Encoding single-qubit states with lists (section 3.1.3)";
    tutorialDiv.appendChild(titleEl);
    // Step 1: Define a quantum state using complex numbers
    displayStepAndEditor(
      `In JavaScript, we use the mathjs library to work with complex numbers. 
       We can represent single-qubit quantum states using a list of complex numbers.`,
      "let state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n" +
      "let output = state[0].toString();\noutput;"
    );
  
    // Step 2: Modify the state in the context
    displayStepAndEditor(
      "We can update the quantum state. Let's redefine it.",
      "state = [math.complex(1, 0), math.complex(0, 0)];\n" +
      "output = state[0].toString();\noutput;"
    );
  
    // Step 3: Get the real and imaginary parts of the state
    displayStepAndEditor(
      "We can get the real and imaginary parts of the state in the context.",
      "let realPart = math.re(state[0]);\nlet imaginaryPart = math.im(state[0]);\n" +
      "`${realPart}, ${imaginaryPart}`;"
    );
  
    // Step 4: Verify the sum of squared magnitudes of the quantum state
    displayStepAndEditor(
      "The sum of the squared magnitudes must be 1 for a valid quantum state.",
      "let magnitude = math.abs(state[0]) ** 2 + math.abs(state[1]) ** 2;\nmagnitude;"
    );
  
    // Step 5: Show an example of a quantum state with a negative real number amplitude
    displayStepAndEditor(
      "Example of a negative real number amplitude, whose angle is 180 degrees, or pi radians.",
      "state = [math.complex(math.sqrt(0.3)), math.complex(-math.sqrt(0.7))];\n" +
      "state[0].toString();"
    );
  
    // Step 6: Get the direction (angle) of an amplitude in radians
    displayStepAndEditor(
      "Get the direction of an amplitude in radians using math.atan2()",
      "let direction = math.atan2(math.im(state[1]), math.re(state[1]));\ndirection;"
    );
  
    // Step 7: Convert the direction from radians to degrees
    displayStepAndEditor(
      "Convert from radians to degrees",
      "let directionInDegrees = direction * (180 / Math.PI);\ndirectionInDegrees;"
    );
  
    // Step 8: Example quantum state with amplitude directions 5pi/7 and pi/5 radians
    displayStepAndEditor(
      "Example state with amplitude directions 5pi/7 and pi/5 radians",
      "state = [\n" +
      "    math.complex(math.sqrt(0.3) * math.cos(5*Math.PI/7), math.sqrt(0.3) * math.sin(5*Math.PI/7)),\n" +
      "    math.complex(math.sqrt(0.7) * math.cos(Math.PI/5), math.sqrt(0.7) * math.sin(Math.PI/5))\n" +
      "];"
    );
  
    // Step 9: Get the magnitude of an amplitude
    displayStepAndEditor(
      "Get the magnitude of an amplitude",
      "magnitude = math.abs(state[0]);\nmagnitude;"
    );
  
    // Step 10: Get the probability of an outcome by squaring the magnitude
    displayStepAndEditor(
      "Get the probability of an outcome by squaring the magnitude",
      "let probability = math.abs(state[0]) ** 2;\nprobability;"
    );
    

    displayStepAndEditor(
        "In this tutorial, we will use the state_table_to_html(state, div_id) from common.js",
        `(async () => {
    await state_table_to_html(state, "state_table");
})();`
    )

    let table = document.createElement("div");
    table.id = "state_table";
    document.getElementById("tutorial").appendChild(table);

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Writing a single-qubit quantum computing simulator in Python (section 3.1.4)";
    tutorialDiv.appendChild(titleEl);
    displayStepAndEditor(
        "Function to create a default single-qubit state",
        `function init_state(n) {
    const state = Array(Math.pow(2, n)).fill(null).map(() => math.complex(0, 0));

    state[0] = math.complex(1, 0);

    return state;
}
        `
    )

    displayStepAndEditor(
        "",
        `state = init_state(1);\nstate;`
    )

    displayStepAndEditor(
        "Function for validating a list of complex numbers is a valid single-qubit state",
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
    )

    displayStepAndEditor(
        "",
        `let list = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];
state = prepare_state(...list);\nstate;`
    )
    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Rotation shortcut (section 3.2.1)";
    tutorialDiv.appendChild(titleEl);
    displayStepAndEditor(
        "Shortcut function for rotations",
        `function cis(theta) {
    return math.complex(math.cos(theta), math.sin(theta));
}`
    )
    
    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Basic single-qubit gates (section 3.2.2)";
    tutorialDiv.appendChild(titleEl);
    displayStepAndEditor(
        "X-gate",
        `state = [state[1], state[0]];`
    )


    displayStepAndEditor(
        "Example:",
        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];
(async () => {
    await state_table_to_html(state, "state_table_2");
})();

state = [state[1], state[0]];
(async () => {
    await state_table_to_html(state, "state_table_3");
})();
        `
    )

    let table2 = document.createElement("div");
    table2.id = "state_table_2";
    document.getElementById("tutorial").appendChild(table2);

    let table3 = document.createElement("div");
    table3.id = "state_table_3";
    document.getElementById("tutorial").appendChild(table3);

    // Z-gate
    displayStepAndEditor(
        "Z-gate",
        `state = [state[0], math.complex(-state[1].re, -state[1].im)];`
    )


    displayStepAndEditor(
        "Example:",
        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];
(async () => {
    await state_table_to_html(state, "state_table_4");
})();

state = [state[0], math.complex(-state[1].re, -state[1].im)];
(async () => {
    await state_table_to_html(state, "state_table_5");
})();
        `
    )

    let table4 = document.createElement("div");
    table4.id = "state_table_4";
    document.getElementById("tutorial").appendChild(table4);

    let table5 = document.createElement("div");
    table5.id = "state_table_5";
    document.getElementById("tutorial").appendChild(table5);


    // phase gate
    displayStepAndEditor(
        "Phase gate",
        `let phi = Math.PI / 3;
state = [state[0], math.multiply(cis(phi), state[1])];`
    )


    displayStepAndEditor(
        "Example:",
        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];
(async () => {
    await state_table_to_html(state, "state_table_6");
})();

phi = Math.PI / 3;
state = [state[0], math.multiply(cis(phi), state[1])];

(async () => {
    await state_table_to_html(state, "state_table_7");
})();
        `
    )
    let table6 = document.createElement("div");
    table6.id = "state_table_6";
    document.getElementById("tutorial").appendChild(table6);

    let table7 = document.createElement("div");
    table7.id = "state_table_7";
    document.getElementById("tutorial").appendChild(table7);

    // hadamard gate
    displayStepAndEditor(
        "Hadamard gate",
        `state = [
    math.multiply(math.sqrt(0.5), math.add(state[0], state[1])),
    math.multiply(math.sqrt(0.5), math.subtract(state[0], state[1]))
];
        `
    )


    displayStepAndEditor(
        "Example:",
        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];
(async () => {
    await state_table_to_html(state, "state_table_8");
})();

state = [
    math.multiply(math.sqrt(0.5), math.add(state[0], state[1])),
    math.multiply(math.sqrt(0.5), math.subtract(state[0], state[1]))
];

(async () => {
    await state_table_to_html(state, "state_table_9");
})();
        `
    )
    let table8 = document.createElement("div");
    table8.id = "state_table_8";
    document.getElementById("tutorial").appendChild(table8);

    let table9 = document.createElement("div");
    table9.id = "state_table_9";
    document.getElementById("tutorial").appendChild(table9);

    // Rz gate
    displayStepAndEditor(
        "Rz gate",
        `let theta = math.PI / 3;
state = [
    math.multiply(cis(-theta / 2), state[0]),
    math.multiply(cis(theta / 2), state[1])
];
        `
    )

    displayStepAndEditor(
        "Example:",
        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];
(async () => {
    await state_table_to_html(state, "state_table_10");
})();

theta = math.PI / 3;
state = [
    math.multiply(cis(-theta / 2), state[0]),
    math.multiply(cis(theta / 2), state[1])
];

(async () => {
    await state_table_to_html(state, "state_table_11");
})();
        `
    )
    let table10 = document.createElement("div");
    table10.id = "state_table_10";
    document.getElementById("tutorial").appendChild(table10);

    let table11 = document.createElement("div");
    table11.id = "state_table_11";
    document.getElementById("tutorial").appendChild(table11);


    // Y gate
    displayStepAndEditor(
        "Y gate",
        `state = [
    math.multiply(math.complex(0, -1), state[1]),
    math.multiply(math.complex(0, 1), state[0])
];`
    )

    displayStepAndEditor(
        "Example:",
        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];
(async () => {
    await state_table_to_html(state, "state_table_12");
})();

state = [
    math.multiply(math.complex(0, -1), state[1]),
    math.multiply(math.complex(0, 1), state[0])
];

(async () => {
    await state_table_to_html(state, "state_table_13");
})();
        `
    )
    let table12 = document.createElement("div");
    table12.id = "state_table_12";
    document.getElementById("tutorial").appendChild(table12);

    let table13 = document.createElement("div");
    table13.id = "state_table_13";
    document.getElementById("tutorial").appendChild(table13);
    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "The general form of a single-qubit gate (section 3.2.3)";
    tutorialDiv.appendChild(titleEl);
    displayStepAndEditor(
        "Applying a Hadamard gate to a single qubit state using the general form of single-qubit gates:",
`let [a, b, c, d] = [1/math.sqrt(2), 1/math.sqrt(2), 1/math.sqrt(2), -1/math.sqrt(2)];
state = [
    math.add(math.multiply(a, state[0]), math.multiply(b, state[1])),
    math.add(math.multiply(c, state[0]), math.multiply(d, state[1]))
];`
    );

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "More basic single-qubit gates (section 3.2.4)";
    tutorialDiv.appendChild(titleEl);

    displayStepAndEditor(
        "Try changing theta to see how the Rx gate works: (recommended values: 0, Math.PI, Math.PI/2, 2*Math.PI, 3*Math.PI/2)",
        `state = init_state(1);
(async () => {
    await state_table_to_html(state, "state_table_14");
})();

theta = 0;

[a, b, c, d] = [math.cos(theta/2), math.complex(0, -math.sin(theta/2)), math.complex(0, -math.sin(theta/2)), math.cos(theta/2)];
state = [
    math.add(math.multiply(a, state[0]), math.multiply(b, state[1])),
    math.add(math.multiply(c, state[0]), math.multiply(d, state[1]))
];

(async () => {
    await state_table_to_html(state, "state_table_15");
})();
        `
    )

    let table14 = document.createElement("div");
    table14.id = "state_table_14";
    document.getElementById("tutorial").appendChild(table14);

    let table15 = document.createElement("div");
    table15.id = "state_table_15";
    document.getElementById("tutorial").appendChild(table15);

    displayStepAndEditor(
        "Try changing theta to see how the Ry gate works: (recommended values: 0, Math.PI, Math.PI/2, 2*Math.PI, 3*Math.PI/2)",
        `state = init_state(1);
(async () => {
    await state_table_to_html(state, "state_table_16");
})();

theta = 0;

[a, b, c, d] = [math.cos(theta/2), -math.sin(theta/2), math.sin(theta/2), math.cos(theta/2)];
state = [
    math.add(math.multiply(a, state[0]), math.multiply(b, state[1])),
    math.add(math.multiply(c, state[0]), math.multiply(d, state[1]))
];

(async () => {
    await state_table_to_html(state, "state_table_17");
})();
        `
    )

    let table16 = document.createElement("div");
    table16.id = "state_table_16";
    document.getElementById("tutorial").appendChild(table16);

    let table17 = document.createElement("div");
    table17.id = "state_table_17";
    document.getElementById("tutorial").appendChild(table17);




    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Single-qubit gate inverses (section 3.2.5)";
    tutorialDiv.appendChild(titleEl);
    displayStepAndEditor(
        "",
        `init_state(1);

state = [state[1], state[0]];
state;
        `
    )

    displayStepAndEditor(
        "",
        `init_state(1);

state = [state[1], state[0]];
state;
        `
    )

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Printing and visualizing the state (section 3.3.1)";
    tutorialDiv.appendChild(titleEl);
    displayStepAndEditor(
        "",
        "function format_value(value, decimals) {\n" +
        "    const valueString = value.toString();\n" +
        "    const currentDecimals = valueString.includes('.') ? valueString.split('.')[1].length : 0;\n" +
        "\n" +
        "    const roundedDecimals = Math.min(currentDecimals, decimals);\n" +
        "    return value.toFixed(roundedDecimals);\n" +
        "}\n" +
        "\n" +
        "function to_table(state, decimals = 5) {\n" +
        "    const table = [];\n" +
        "    for (let k = 0; k < state.length; k++) {\n" +
        "        const row = [];\n" +
        "        const value = state[k];\n" +
        "        row.push(k);\n" +
        "        row.push(value.toString());\n" +
        "        const direction = Math.atan2(value.im, value.re) / (2 * Math.PI) * 360;\n" +
        "        row.push(format_value(direction, decimals));\n" +
        "        const magnitude = Math.sqrt(value.re ** 2 + value.im ** 2);\n" +
        "        row.push(format_value(magnitude, decimals));\n" +
        "        const probability = magnitude ** 2;\n" +
        "        row.push(format_value(probability, decimals));\n" +
        "        table.push(row);\n" +
        "    }\n" +
        "    return table;\n" +
        "}\n" +
        "\n" +
        "function print_state(state, decimals = 5) {\n" +
        "    const table = to_table(state, decimals);\n" +
        "    let out = \"\\n\";\n" +
        "    table.forEach(row => {\n" +
        "        out += (`[${row.join(', ')}]\n`);\n" +
        "    });\n" +
        "    return out;\n" +
        "}"
    
    );

    displayStepAndEditor(
        "",
        `state = init_state(1);
let out = print_state(state);
out;
        `
    );

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Transforming a single-qubit state (section 3.3.2)";
    tutorialDiv.appendChild(titleEl);

    displayStepAndEditor(
        "We can use nested lists to encode the four values of a gate:",
        `let gate = [[a, b], [c, d]];`
    );

    displayStepAndEditor(
        "Code implementations of basic single-qubit gates",
        `const x = [
    [0, 1],
    [1, 0]
];

const z = [
    [1, 0],
    [0, -1]
];

function phase(theta) {
    return [
        [1, 0],
        [0, math.complex(Math.cos(theta), Math.sin(theta))]
    ];
}

const h = [
    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
    [1 / Math.sqrt(2), -1 / Math.sqrt(2)]
];

function rz(theta) {
    return [
        [math.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],
        [0, math.complex(Math.cos(theta / 2), Math.sin(theta / 2))]
    ];
}

const y = [
    [0, math.complex(0, -1)],
    [math.complex(0, 1), 0]
];

function rx(theta) {
    return [
        [Math.cos(theta / 2), math.complex(0, -Math.sin(theta / 2))],
        [math.complex(0, -Math.sin(theta / 2)), Math.cos(theta / 2)]
    ];
}

function ry(theta) {
    return [
        [Math.cos(theta / 2), -Math.sin(theta / 2)],
        [Math.sin(theta / 2), Math.cos(theta / 2)]
    ];
};
        `
    );

    displayStepAndEditor(
        "We can compute the new amplitude for outcome 0 with:",
        `state = init_state(1);
theta = 3*Math.PI/2
[a, b, c, d] = [math.cos(theta/2), -math.sin(theta/2), math.sin(theta/2), math.cos(theta/2)];
gate = [[a, b], [c, d]];

math.multiply(gate[0][0], state[0]) + math.multiply(gate[0][1], state[1]);`
    );

    displayStepAndEditor(
        "We can compute the new amplitude for outcome 1 with:",
        `math.multiply(gate[1][0], state[0]) + math.multiply(gate[0][1], state[1]);`
    );

    displayStepAndEditor(
        "Function for simulating applying gate transformations to a single-qubit gate",
        `function process_pair(state, gate, k0=0, k1=1) {
    const x = state[k0];
    const y = state[k1];
    state[k0] = math.add(math.multiply(x, gate[0][0]), math.multiply(y, gate[0][1]));
    state[k1] = math.add(math.multiply(x, gate[1][0]), math.multiply(y, gate[1][1]));
}`
    );

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Single-qubit circuits (section 3.3.3)";
    tutorialDiv.appendChild(titleEl);

    displayStepAndEditor(
        "Example single-qubit circuit",
        `let s = init_state(1);
process_pair(s, ry(2*Math.PI/3));
process_pair(s, x);
process_pair(s, phase(Math.PI/3));
process_pair(s, h);
out = print_state(s);

(async () => {
    await state_table_to_html(s, "state_table_18");
})();

out;
`
    );

    let table18 = document.createElement("div");
    table18.id = "state_table_18";
    document.getElementById("tutorial").appendChild(table18);

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Simulating measurement of single-qubit states (section 3.4)";
    tutorialDiv.appendChild(titleEl);

    displayStepAndEditor(
        "Simulate 10 runs of the circuit above: ",
        `let prob = [s[0].re ** 2 + s[0].im ** 2, s[1].re ** 2 + s[1].im ** 2];

let samples = [];
for (let i = 0; i < 10; i++) {
        let randomValue = Math.random();
        if(randomValue < prob[0]) {
            samples.push(0);
        } else {
            samples.push(1);
        }
}

samples;
        `
    )

    displayStepAndEditor(
        "",
        `let count0 = 0;
let count1 = 0;
for(let i of samples) {
        if (i == 0) {
            count0++;
        }
        else {
            count1++
        }
}

output = '0 -> ' + count0 + '\\n' + '1 -> ' + count1;
output;

        `
    )

    displayStepAndEditor(
        "Simulate 1000 runs: ",
        `prob = [s[0].re ** 2 + s[0].im ** 2, s[1].re ** 2 + s[1].im ** 2];

samples = [];
for (let i = 0; i < 1000; i++) {
        let randomValue = Math.random();
        if(randomValue < prob[0]) {
            samples.push(0);
        } else {
            samples.push(1);
        }
}

samples;

count0 = 0;
count1 = 0;
for(let i of samples) {
        if (i == 0) {
            count0++;
        }
        else {
            count1++
        }
}

output = '0 -> ' + count0 + '\\n' + '1 -> ' + count1;
output;`
    )

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Encoding the uniform distribution in a single-qubit quantum state (section 3.4.1)";
    tutorialDiv.appendChild(titleEl);

    displayStepAndEditor(
        "Encoding the uniform distribution in a single-qubit quantum state",
        `state = init_state(1);
process_pair(state, h);
out = print_state(state);
out;
        `
    )

    displayStepAndEditor(
        "",
        `prob = [state[0].re ** 2 + state[0].im ** 2, state[1].re ** 2 + state[1].im ** 2];

samples = [];
for (let i = 0; i < 10; i++) {
        let randomValue = Math.random();
        if(randomValue < prob[0]) {
            samples.push(0);
        } else {
            samples.push(1);
        }
}

samples;

count0 = 0;
count1 = 0;
for(let i of samples) {
        if (i == 0) {
            count0++;
        }
        else {
            count1++
        }
}

output = '0 -> ' + count0 + '\\n' + '1 -> ' + count1;
output;`
    )

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Encoding a Bernoulli distribution in a single-qubit quantum state (section 3.5.1)";
    tutorialDiv.appendChild(titleEl);

    displayStepAndEditor(
        "",
        `let p = 0.7;
theta = 2 * math.acos(math.sqrt(p));
s = init_state(1);
process_pair(s, ry(theta));

output = print_state(s);

(async () => {
    await state_table_to_html(s, "state_table_19");
})();

output;
        `
    )

    let table19 = document.createElement("div");
    table19.id = "state_table_19";
    document.getElementById("tutorial").appendChild(table19);

    titleEl = document.createElement("h1");
    titleEl.className = "subheading";
    titleEl.textContent = "Encoding a number with a single-qubit (section 3.5.2)";
    tutorialDiv.appendChild(titleEl);

    displayStepAndEditor(
        "Encoding the value x = 273.5 in the magnitude of an amplitude:",
        `let x = 273.5;
theta = 2 * math.acos(x/1000);
s = init_state(1);
process_pair(s, ry(theta));

output = print_state(s);

(async () => {
    await state_table_to_html(s, "state_table_20");
})();

output;
        `
    )

    let table20 = document.createElement("div");
    table20.id = "state_table_20";
    document.getElementById("tutorial").appendChild(table20);


    displayStepAndEditor(
        "Encoding the value x = 273.5 in the phase of an amplitude:",
        `x = 273.5;
theta = Math.PI*x/1000;
s = init_state(1);
process_pair(s, h)
process_pair(s, phase(theta));

output = print_state(s);

(async () => {
    await state_table_to_html(s, "state_table_21");
})();

output;
        `
    )

    let table21 = document.createElement("div");
    table21.id = "state_table_21";
    document.getElementById("tutorial").appendChild(table21);

  });
  