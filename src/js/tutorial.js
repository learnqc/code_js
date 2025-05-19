import '../lib/algos/component.js';
import '../lib/algos/component2.js';

document.addEventListener('DOMContentLoaded', () => {
    const gates = [
        { id: 'X', title: 'X Gate', gateType: 'X' },
        { id: 'Y', title: 'Y Gate', gateType: 'Y' },
        { id: 'Z', title: 'Z Gate', gateType: 'Z' },
        { id: 'H', title: 'Hadamard Gate', gateType: 'H' },
        { id: 'Phase', title: 'Phase Gate', gateType: 'Phase' },
        { id: 'RZ', title: 'RZ Gate', gateType: 'RZ' }
    ];

    gates.forEach(({ id, title, gateType }) => {
        const container = document.getElementById(id);

        const gateContainer = document.createElement('div');
        gateContainer.style.marginBottom = '30px';

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.style.marginBottom = '10px';

        const quantumGateElement = document.createElement('quantum-gate-simulator');
        quantumGateElement.gate = gateType; // Assign the gate type dynamically

        gateContainer.appendChild(quantumGateElement);

        container.appendChild(gateContainer);
    });

    const viewerContainer = document.getElementById('quantum-viewer-container');

    // Create an instance of the Quantum State Viewer
    const quantumViewer = document.createElement('quantum-state-viewer');
  
    // Set the initial properties (if needed)
    quantumViewer.gate = 'X'; // Example: setting the X-gate
  
    // Append the Quantum State Viewer to the container
    viewerContainer.appendChild(quantumViewer);

    const container2 = document.getElementById('quantum-viewer-container-2');
    const viewer2 = document.createElement('quantum-state-viewer');
    viewer2.gate = 'X';
    viewer2.controlled = true;
    viewer2.controlQubit = '1';
    viewer2.targetQubit = '0';

    container2.appendChild(viewer2);
});



import {state_table_to_html, is_close, cis, print_state, choices, squaredMagnitude} from "../lib/utils/common.js";
import { init_state, prepare_state, is_power_of_two, process_pair} from "../lib/simulator/core.js";

// Default Simulator Context definitions:
const x = [[0, 1], [1, 0]];
const z = [[1, 0], [0, -1]];

function phase(theta) {
  return [[1, 0], [0, math.complex(Math.cos(theta), Math.sin(theta))]];
}

const h = [[1 / Math.sqrt(2), 1 / Math.sqrt(2)], [1 / Math.sqrt(2), -1 / Math.sqrt(2)]];

function rz(theta) {
  return [
    [math.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],
    [0, math.complex(Math.cos(theta / 2), Math.sin(theta / 2))]
  ];
}

const y = [[0, math.complex(0, -1)], [math.complex(0, 1), 0]];

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
}

function initState(n) {
  const state = Array(2 ** n).fill(0);
  state[0] = 1;
  return state;
}

function isBitSet(m, k) {
  return (m & (1 << k)) !== 0;
}

function* pairGenerator(n, t) {
  const distance = 2 ** t;
  for (let j = 0; j < 2 ** (n - t - 1); j++) {
    for (let k0 = 2 * j * distance; k0 < (2 * j + 1) * distance; k0++) {
      const k1 = k0 + distance;
      yield [k0, k1];
    }
  }
}

function processPair(state, gate, k0, k1) {
  const a = state[k0];
  const b = state[k1];
  state[k0] = a * gate[0][0] + b * gate[0][1];
  state[k1] = a * gate[1][0] + b * gate[1][1];
}

function transform(state, t, gate) {
  const n = Math.log2(state.length);
  for (const [k0, k1] of pairGenerator(n, t)) {
    processPair(state, gate, k0, k1);
  }
}

function cTransform(state, c, t, gate) {
  const n = Math.log2(state.length);
  for (const [k0, k1] of pairGenerator(n, t)) {
    if (isBitSet(k0, c)) {
      processPair(state, gate, k0, k1);
    }
  }
}

function mcTransform(state, cs, t, gate) {
  const n = Math.log2(state.length);
  for (const [k0, k1] of pairGenerator(n, t)) {
    if (cs.every(c => isBitSet(k0, c))) {
      processPair(state, gate, k0, k1);
    }
  }
}

function measure(state, shots) {
  const probabilities = state.map(amp => Math.abs(amp) ** 2);
  const samples = math.pickRandom(state.map((_, i) => i), probabilities, shots);
  const counts = {};
  samples.forEach(sample => {
    counts[sample] = (counts[sample] || 0) + 1;
  });
  return counts;
}

// Extend the shared context for evaluation
let sharedContext = {
  math: math,
  x: x,
  z: z,
  phase: phase,
  h: h,
  rz: rz,
  y: y,
  rx: rx,
  ry: ry,
  state_table_to_html: state_table_to_html,
  initState: initState,
  isBitSet: isBitSet,
  pairGenerator: pairGenerator,
  processPair: processPair,
  transform: transform,
  cTransform: cTransform,
  mcTransform: mcTransform,
  measure: measure,
  state: []
};
  
  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.37.0/min/vs' }});
  
  require(['vs/editor/editor.main'], function() {
  
    let codeHistory = [];

function displayStepAndEditor(title, code) {
  const tutorialDiv = document.getElementById("tutorial");

  // Step container
  const stepDiv = document.createElement("div");
  stepDiv.className = "step-container";


  // Editor container
  const editorContainer = document.createElement("div");
  editorContainer.className = "editor-container";
  editorContainer.style.height = "400px";
  editorContainer.style.resize = "vertical";
  editorContainer.style.overflow = "auto";


  // Run Button
  const runButton = document.createElement("button");
  runButton.className = "run-button";
  runButton.innerText = "Run Code";

  // Output container
  const outputContainer = document.createElement("div");
  outputContainer.className = "output";
  outputContainer.style.height = "200px";
  outputContainer.style.resize = "vertical";
  outputContainer.style.overflow = "auto";
  


  // Append elements
  editorContainer.appendChild(runButton);
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

  window.addEventListener("resize", () => {
    editor.layout();
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

    // Override console.log
    const originalConsoleLog = console.log; // Preserve original console.log
    console.log = function (...args) {
        const message = args
            .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
            .join(' ');
        outputContainer.innerText += message + '\n'; // Append to the output container
        originalConsoleLog.apply(console, args); // Call the original console.log
        // Auto-resize output
        outputContainer.style.height = 'auto';
        outputContainer.style.height = outputContainer.scrollHeight + 'px';
    };

    try {
        const result = (function () {
            const { math, state, state_table_to_html, init_state, is_close, prepare_state, is_power_of_two, cis, print_state, x, z, phase, h, rz, y, rx, ry, process_pair, choices, squaredMagnitude } = sharedContext;
            return eval(fullCode); // Execute the accumulated code with the shared context
        })();

        // If result is not undefined, append it to the output
        if (result !== undefined) {
            outputContainer.innerText += `Result: ${result}\n`;
        }
    } catch (error) {
        outputContainer.innerText += `Error: ${error.message}\n`;
    } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
        // Auto-resize output after all output is set
        outputContainer.style.height = 'auto';
        outputContainer.style.height = outputContainer.scrollHeight + 'px';
    }

    // Save the current code for the next step
}



      
      
    
 
    // Step 1: Define a quantum state using complex numbers
    displayStepAndEditor(
      ``,
`function testSimulator() 
{
  const state = initState(3);
  transform(state, 0, h);
  transform(state, 1, h);
  mcTransform(state, [0, 1], 2, x);
  const samples = measure(state, 1000);
  console.log(state);
  console.log(samples);
}

testSimulator();`
    );

  });
  