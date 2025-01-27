/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/tutorial.js":
/*!****************************!*\
  !*** ./src/js/tutorial.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_algos_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algos/component.js */ \"./src/lib/algos/component.js\");\n/* harmony import */ var _lib_algos_component2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/algos/component2.js */ \"./src/lib/algos/component2.js\");\n/* harmony import */ var _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/common.js */ \"./src/lib/utils/common.js\");\n/* harmony import */ var _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/simulator/core.js */ \"./src/lib/simulator/core.js\");\n/* harmony import */ var _lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/simulator/gates.js */ \"./src/lib/simulator/gates.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const gates = [\n        { id: 'X', title: 'X Gate', gateType: 'X' },\n        { id: 'Y', title: 'Y Gate', gateType: 'Y' },\n        { id: 'Z', title: 'Z Gate', gateType: 'Z' },\n        { id: 'H', title: 'Hadamard Gate', gateType: 'H' },\n        { id: 'Phase', title: 'Phase Gate', gateType: 'Phase' },\n        { id: 'RZ', title: 'RZ Gate', gateType: 'RZ' }\n    ];\n\n    gates.forEach(({ id, title, gateType }) => {\n        const container = document.getElementById(id);\n\n        const gateContainer = document.createElement('div');\n        gateContainer.style.marginBottom = '30px';\n\n        const titleElement = document.createElement('h2');\n        titleElement.textContent = title;\n        titleElement.style.marginBottom = '10px';\n\n        const quantumGateElement = document.createElement('quantum-gate-simulator');\n        quantumGateElement.gate = gateType; // Assign the gate type dynamically\n\n        gateContainer.appendChild(quantumGateElement);\n\n        container.appendChild(gateContainer);\n    });\n\n    const viewerContainer = document.getElementById('quantum-viewer-container');\n\n    // Create an instance of the Quantum State Viewer\n    const quantumViewer = document.createElement('quantum-state-viewer');\n  \n    // Set the initial properties (if needed)\n    quantumViewer.gate = 'X'; // Example: setting the X-gate\n  \n    // Append the Quantum State Viewer to the container\n    viewerContainer.appendChild(quantumViewer);\n\n    const container2 = document.getElementById('quantum-viewer-container-2');\n    const viewer2 = document.createElement('quantum-state-viewer');\n    viewer2.gate = 'X';\n    viewer2.controlled = true;\n    viewer2.controlQubit = '1';\n    viewer2.targetQubit = '0';\n\n    container2.appendChild(viewer2);\n});\n\n\n\n\n\n\n\nlet sharedContext = {\n    math: math,  \n    state: [],  \n    state_table_to_html: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.state_table_to_html,\n    init_state: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_3__.init_state,\n    is_close: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.is_close,\n    prepare_state: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_3__.prepare_state,\n    is_power_of_two: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_3__.is_power_of_two,\n    cis: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.cis,\n    print_state: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.print_state,\n    x:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.x,z:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.z,phase:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.phase,h:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.h,rz:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.rz,y:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.y,rx:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.rx,ry:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_4__.ry,\n    process_pair: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_3__.process_pair,\n    choices: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.choices,\n    squaredMagnitude: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.squaredMagnitude\n  };\n  \n  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.37.0/min/vs' }});\n  \n  require(['vs/editor/editor.main'], function() {\n  \n    let codeHistory = [];\n\n    function displayStepAndEditor(title, code) {\n  const tutorialDiv = document.getElementById(\"tutorial\");\n\n  // Step container\n  const stepDiv = document.createElement(\"div\");\n  stepDiv.className = \"step-container\";\n\n\n  // Editor container\n  const editorContainer = document.createElement(\"div\");\n  editorContainer.className = \"editor-container\";\n\n  // Run Button\n  const runButton = document.createElement(\"button\");\n  runButton.className = \"run-button\";\n  runButton.innerText = \"Run Code\";\n\n  // Output container\n  const outputContainer = document.createElement(\"div\");\n  outputContainer.className = \"output\";\n\n  // Append elements\n  editorContainer.appendChild(runButton);\n  stepDiv.appendChild(editorContainer);\n  stepDiv.appendChild(outputContainer);\n  tutorialDiv.appendChild(stepDiv);\n\n  // Monaco Editor setup\n  const editor = monaco.editor.create(editorContainer, {\n    value: code,\n    language: \"javascript\",\n    theme: \"vs-light\",\n    automaticLayout: true // Dynamically adjust to container size\n  });\n\n  // Run Code Button Logic\n  runButton.onclick = function () {\n    runCode(editor, outputContainer);\n  };\n}\n  \nfunction runCode(editor, outputContainer) {\n    const code = editor.getValue();\n    outputContainer.innerText = ''; // Clear previous output\n\n    // Combine previous code with the current editor's code\n    const fullCode = codeHistory.join('\\n') + '\\n' + code;\n\n    // Override console.log\n    const originalConsoleLog = console.log; // Preserve original console.log\n    console.log = function (...args) {\n        const message = args\n            .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))\n            .join(' ');\n        outputContainer.innerText += message + '\\n'; // Append to the output container\n        originalConsoleLog.apply(console, args); // Call the original console.log\n    };\n\n    try {\n        const result = (function () {\n            const { math, state, state_table_to_html, init_state, is_close, prepare_state, is_power_of_two, cis, print_state, x, z, phase, h, rz, y, rx, ry, process_pair, choices, squaredMagnitude } = sharedContext;\n            return eval(fullCode); // Execute the accumulated code with the shared context\n        })();\n\n        // If result is not undefined, append it to the output\n        if (result !== undefined) {\n            outputContainer.innerText += `Result: ${result}\\n`;\n        }\n    } catch (error) {\n        outputContainer.innerText += `Error: ${error.message}\\n`;\n    } finally {\n        // Restore original console.log\n        console.log = originalConsoleLog;\n    }\n\n    // Save the current code for the next step\n}\n\n\n\n      \n      \n    \n \n    // Step 1: Define a quantum state using complex numbers\n    displayStepAndEditor(\n      ``,\n`\nconst x = [[0, 1], [1, 0]];\nconst z = [[1, 0], [0, -1]];\n\nfunction phase(theta) {\n  return [[1, 0], [0, math.complex(Math.cos(theta), Math.sin(theta))]];\n}\n\nconst h = [[1 / Math.sqrt(2), 1 / Math.sqrt(2)], [1 / Math.sqrt(2), -1 / Math.sqrt(2)]];\n\nfunction rz(theta) {\n  return [\n    [math.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],\n    [0, math.complex(Math.cos(theta / 2), Math.sin(theta / 2))]\n  ];\n}\n\nconst y = [[0, math.complex(0, -1)], [math.complex(0, 1), 0]];\n\nfunction rx(theta) {\n  return [\n    [Math.cos(theta / 2), math.complex(0, -Math.sin(theta / 2))],\n    [math.complex(0, -Math.sin(theta / 2)), Math.cos(theta / 2)]\n  ];\n}\n\nfunction ry(theta) {\n  return [\n    [Math.cos(theta / 2), -Math.sin(theta / 2)],\n    [Math.sin(theta / 2), Math.cos(theta / 2)]\n  ];\n}\n\nfunction initState(n) {\n  const state = Array(2 ** n).fill(0);\n  state[0] = 1;\n  return state;\n}\n\nfunction isBitSet(m, k) {\n  return (m & (1 << k)) !== 0;\n}\n\nfunction* pairGenerator(n, t) {\n  const distance = 2 ** t;\n  for (let j = 0; j < 2 ** (n - t - 1); j++) {\n    for (let k0 = 2 * j * distance; k0 < (2 * j + 1) * distance; k0++) {\n      const k1 = k0 + distance;\n      yield [k0, k1];\n    }\n  }\n}\n\nfunction processPair(state, gate, k0, k1) {\n  const x = state[k0];\n  const y = state[k1];\n  state[k0] = x * gate[0][0] + y * gate[0][1];\n  state[k1] = x * gate[1][0] + y * gate[1][1];\n}\n\nfunction transform(state, t, gate) {\n  const n = Math.log2(state.length);\n  for (const [k0, k1] of pairGenerator(n, t)) {\n    processPair(state, gate, k0, k1);\n  }\n}\n\nfunction cTransform(state, c, t, gate) {\n  const n = Math.log2(state.length);\n  for (const [k0, k1] of pairGenerator(n, t)) {\n    if (isBitSet(k0, c)) {\n      processPair(state, gate, k0, k1);\n    }\n  }\n}\n\nfunction mcTransform(state, cs, t, gate) {\n  const n = Math.log2(state.length);\n  for (const [k0, k1] of pairGenerator(n, t)) {\n    if (cs.every((c) => isBitSet(k0, c))) {\n      processPair(state, gate, k0, k1);\n    }\n  }\n}\n\nfunction measure(state, shots) {\n  const probabilities = state.map((amp) => Math.abs(amp) ** 2);\n  const samples = math.pickRandom(state.map((_, i) => i), probabilities, shots);\n  const counts = {};\n  samples.forEach((sample) => {\n    counts[sample] = (counts[sample] || 0) + 1;\n  });\n  return counts;\n}\n\nfunction testSimulator() {\n  const state = initState(3);\n  transform(state, 0, h);\n  transform(state, 1, h);\n  mcTransform(state, [0, 1], 2, x);\n  const samples = measure(state, 1000);\n  console.log(state);\n  console.log(samples);\n}\n\ntestSimulator();`\n    );\n\n\n  });\n  \n\n//# sourceURL=webpack://humejs/./src/js/tutorial.js?");

/***/ }),

/***/ "./src/lib/algos/component.js":
/*!************************************!*\
  !*** ./src/lib/algos/component.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QuantumGateSimulator: () => (/* binding */ QuantumGateSimulator)\n/* harmony export */ });\n/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ \"./node_modules/lit/index.js\");\n\n\n// Hardcoding the colormap directly into the script\nconst colormap = [\n  [247, 55, 26], [247, 55, 26], [246, 56, 23], [246, 58, 21], [246, 58, 21], [246, 61, 18], [247, 64, 16], \n  [247, 64, 16], [247, 68, 14], [247, 72, 12], [248, 76, 10], [248, 76, 10], [248, 80, 8], [248, 85, 7], [248, 85, 7], \n  [249, 89, 6], [249, 94, 5], [250, 98, 4], [250, 98, 4], [251, 103, 3], [251, 107, 2], [251, 107, 2], [252, 112, 2], \n  [252, 116, 1], [253, 120, 1], [253, 120, 1], [253, 125, 0], [254, 129, 0], [254, 129, 0], [254, 133, 0], [254, 137, 0], \n  [255, 141, 0], [255, 141, 0], [255, 145, 0], [255, 149, 0], [255, 149, 0], [255, 153, 0], [255, 157, 0], [255, 161, 0], \n  [255, 161, 0], [255, 165, 0], [255, 168, 0], [255, 168, 0], [255, 172, 0], [255, 176, 0], [255, 179, 0], [255, 179, 0], \n  [255, 183, 0], [255, 186, 0], [255, 186, 0], [255, 189, 0], [254, 193, 0], [254, 193, 0], [253, 195, 0], [252, 198, 0], \n  [251, 201, 0], [251, 201, 0], [249, 203, 0], [247, 205, 0], [247, 205, 0], [245, 206, 0], [242, 208, 0], [239, 208, 0], \n  [239, 208, 0], [236, 209, 0], [233, 209, 0], [233, 209, 0], [229, 209, 0], [225, 209, 0], [221, 208, 0], [221, 208, 0], \n  [217, 208, 0], [213, 207, 0], [213, 207, 0], [209, 205, 0], [204, 204, 0], [200, 203, 0], [200, 203, 0], [195, 201, 0], \n  [191, 199, 0], [191, 199, 0], [186, 197, 0], [181, 196, 0], [177, 194, 0], [177, 194, 0], [172, 192, 0], [167, 190, 0], \n  [167, 190, 0], [162, 188, 0], [158, 186, 0], [153, 184, 0], [153, 184, 0], [148, 182, 0], [143, 180, 0], [143, 180, 0], \n  [138, 178, 1], [134, 176, 1], [134, 176, 1], [129, 174, 2], [124, 172, 2], [119, 170, 3], [119, 170, 3], [114, 169, 3], \n  [109, 167, 4], [109, 167, 4], [104, 165, 6], [100, 163, 7], [95, 161, 9], [95, 161, 9], [90, 160, 11], [85, 158, 13], \n  [85, 158, 13], [81, 157, 16], [76, 156, 18], [72, 155, 21], [72, 155, 21], [68, 154, 24], [64, 154, 27], [64, 154, 27], \n  [60, 153, 30], [57, 153, 34], [54, 153, 38], [54, 153, 38], [51, 154, 41], [49, 155, 45], [49, 155, 45], [47, 155, 49], \n  [45, 157, 54], [44, 158, 58], [44, 158, 58], [43, 160, 62], [43, 161, 67], [43, 161, 67], [43, 163, 72], [43, 165, 76], \n  [44, 167, 81], [44, 167, 81], [44, 170, 86], [45, 172, 91], [45, 172, 91], [46, 174, 96], [46, 177, 101], [46, 177, 101], \n  [47, 179, 106], [48, 181, 111], [48, 184, 116], [48, 184, 116], [49, 186, 121], [49, 189, 126], [49, 189, 126], [50, 191, 131], \n  [50, 194, 136], [50, 196, 141], [50, 196, 141], [50, 199, 146], [50, 202, 151], [50, 202, 151], [50, 204, 156], [50, 207, 161], \n  [50, 209, 166], [50, 209, 166], [49, 212, 171], [48, 214, 177], [48, 214, 177], [48, 216, 182], [47, 219, 187], [46, 221, 192], \n  [46, 221, 192], [45, 223, 197], [44, 225, 202], [44, 225, 202], [43, 227, 206], [42, 228, 211], [40, 230, 215], [40, 230, 215]\n];\n\n// Function to convert complex number to RGB\nfunction complex_to_rgb(c, ints = false) {\n  const a = math.re(c);\n  const b = math.im(c);\n\n  const magnitude = Math.sqrt(a * a + b * b);\n  let hue = Math.atan2(b, a) / Math.PI * 180;\n\n  if (hue < 0) {\n    hue += 360;\n  }\n\n  const hueIndex = Math.round(hue);\n  const boundedIndex = Math.min(hueIndex, colormap.length - 1);\n\n  const rgb = colormap[boundedIndex];\n\n  if (ints) {\n    return rgb;\n  } else {\n    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];\n  }\n}\n\nclass QuantumGateSimulator extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {\n  static styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)`\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  margin: 20px 0;\n  overflow-x: auto;\n}\n\nth,\ntd {\n  border: 1px solid #ddd;\n  text-align: center;\n  padding: 8px;\n  word-wrap: break-word;\n}\n\nth {\n  background-color: #f2f2f2;\n}\n\n.amplitude-bar {\n  display: flex;\n  align-items: left;\n  height: 100%;\n}\n\n.bar {\n  height: 25px\n}\n\n.buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  margin: 15px 0;\n  justify-content: center;\n}\n\nbutton,\nselect,\ninput {\n  padding: 10px 15px;\n  font-size: 1rem;\n  cursor: pointer;\n}\n\nbutton:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\n.highlight {\n  background-color: lightyellow;\n}\n\n.theta-container {\n  margin-top: 10px;\n}\n\n/* Responsive styles for smaller screens */\n@media (max-width: 600px) {\n  table {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n  }\n\n  th,\n  td {\n    font-size: 0.9rem;\n  }\n\n  .buttons {\n    flex-direction: column;\n    align-items: center;\n    gap: 10px;\n  }\n\n  .theta-container {\n    text-align: center;\n  }\n\n  .amplitude-bar {\n    display: flex;\n    align-items: center; /* Keeps bars horizontally aligned */\n    justify-content: flex-start; /* Left-aligns the bars on mobile */\n    height: 100%;\n  }\n\n  .bar {\n    width: 100%; /* Ensures full-width bars */\n    height: 100%;\n  }\n}\n  `;\n\n  static properties = {\n    state: { type: Array },\n    originalState: { type: Array },\n    gate: { type: String },\n    gateApplied: { type: Boolean },\n  };\n\n  constructor() {\n    super();\n    this.state = [];\n    this.originalState = [];\n    this.gate = 'X'; // Default gate\n    this.gateApplied = false;\n    this.initializeState();\n  }\n\n  initializeState() {\n    const amplitude0 = math.complex(Math.random() - 0.5, Math.random() - 0.5);\n    const amplitude1 = math.complex(Math.random() - 0.5, Math.random() - 0.5);\n    const norm = math.sqrt(\n      math.add(math.pow(math.abs(amplitude0), 2), math.pow(math.abs(amplitude1), 2))\n    );\n    this.originalState = [\n      { outcome: 0, amplitude: math.divide(amplitude0, norm) },\n      { outcome: 1, amplitude: math.divide(amplitude1, norm) },\n    ];\n    this.state = [...this.originalState];\n    this.gateApplied = false;\n  }\n\n  applyGate() {\n    if (this.gateApplied) return;\n\n    const [state0, state1] = this.state;\n\n    switch (this.gate) {\n      case 'X': // Pauli-X (NOT gate)\n        this.state = [\n          { ...state0, amplitude: state1.amplitude },\n          { ...state1, amplitude: state0.amplitude },\n        ];\n        break;\n      case 'Y': // Pauli-Y gate\n        this.state = [\n          { ...state0, amplitude: math.multiply(state1.amplitude, math.complex(0, -1)) },\n          { ...state1, amplitude: math.multiply(state0.amplitude, math.complex(0, 1)) },\n        ];\n        break;\n      case 'Z': // Pauli-Z gate\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          { ...state1, amplitude: math.multiply(state1.amplitude, -1) },\n        ];\n        break;\n      case 'H': // Hadamard gate\n        this.state = [\n          {\n            ...state0,\n            amplitude: math.divide(\n              math.add(state0.amplitude, state1.amplitude),\n              math.sqrt(2)\n            ),\n          },\n          {\n            ...state1,\n            amplitude: math.divide(\n              math.subtract(state0.amplitude, state1.amplitude),\n              math.sqrt(2)\n            ),\n          },\n        ];\n        break;\n      case 'Phase': // Phase gate (π/2 phase)\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          {\n            ...state1,\n            amplitude: math.multiply(state1.amplitude, math.exp(math.complex(0, Math.PI / 2))),\n          },\n        ];\n        break;\n      case 'RZ': // RZ gate (rotation around Z-axis)\n        const theta = Math.PI / 4; // Example rotation angle\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          {\n            ...state1,\n            amplitude: math.multiply(state1.amplitude, math.exp(math.complex(0, theta))),\n          },\n        ];\n        break;\n    }\n\n    this.gateApplied = true;\n    this.requestUpdate();\n  }\n\n  renderTable(state, title) {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <h4>${title}</h4>\n      <table>\n        <thead>\n          <tr>\n            <th>Outcome</th>\n            <th>Binary</th>\n            <th>Amplitude</th>\n            <th>Direction</th>\n            <th>Magnitude</th>\n            <th>Amplitude Bar</th>\n          </tr>\n        </thead>\n        <tbody>\n          ${state.map(({ outcome, amplitude }) => {\n            const magnitude = math.abs(amplitude).toFixed(4);\n            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);\n            const rgb = complex_to_rgb(amplitude, true);\n            return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <tr>\n                <td>${outcome}</td>\n                <td>${outcome.toString(2)}</td>\n                <td>${math.format(amplitude, { notation: 'fixed', precision: 4 })}</td>\n                <td>${direction}°</td>\n                <td>${magnitude}</td>\n                <td>\n                  <div class=\"amplitude-bar\">\n                    <div\n                      class=\"bar\"\n                      style=\"width: ${magnitude * 100}%; background-color: rgb(${rgb.join(',')});\"\n                    ></div>\n                  </div>\n                </td>\n              </tr>\n            `;\n          })}\n        </tbody>\n      </table>\n    `;\n  }\n\n  render() {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <div>\n        <h3>${this.gate} Gate Simulator</h3>\n        <div>\n          ${this.renderTable(this.originalState, 'Original State')}\n          ${this.gateApplied ? this.renderTable(this.state, 'After Applying Gate') : ''}\n        </div>\n        <div class=\"buttons\">\n          <button @click=\"${this.applyGate}\" ?disabled=\"${this.gateApplied}\">\n            Apply ${this.gate} Gate\n          </button>\n          <button @click=\"${this.initializeState}\">Reset</button>\n        </div>\n      </div>\n    `;\n  }\n}\n\ncustomElements.define('quantum-gate-simulator', QuantumGateSimulator);\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/component.js?");

/***/ }),

/***/ "./src/lib/algos/component2.js":
/*!*************************************!*\
  !*** ./src/lib/algos/component2.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QuantumStateViewer: () => (/* binding */ QuantumStateViewer)\n/* harmony export */ });\n/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ \"./node_modules/lit/index.js\");\n/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mathjs */ \"./node_modules/mathjs/lib/esm/entry/pureFunctionsAny.generated.js\");\n\n\n\nconst gates = {\n  X: [\n    [0, 1],\n    [1, 0],\n  ],\n  Z: [\n    [1, 0],\n    [0, -1],\n  ],\n  Y: [\n    [0, mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(0, -1)],\n    [mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(0, 1), 0],\n  ],\n  H: [\n    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],\n    [1 / Math.sqrt(2), -1 / Math.sqrt(2)],\n  ],\n  Phase: (theta) => [\n    [1, 0],\n    [0, mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.cos(theta), Math.sin(theta))],\n  ],\n  RZ: (theta) => [\n    [mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],\n    [0, mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.cos(theta / 2), Math.sin(theta / 2))],\n  ],\n  RX: (theta) => [\n    [Math.cos(theta / 2), mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(0, -Math.sin(theta / 2))],\n    [mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(0, -Math.sin(theta / 2)), Math.cos(theta / 2)],\n  ],\n  RY: (theta) => [\n    [Math.cos(theta / 2), -Math.sin(theta / 2)],\n    [Math.sin(theta / 2), Math.cos(theta / 2)],\n  ],\n};\n\nfunction complex_to_rgb(c, ints = false) {\n  const a = mathjs__WEBPACK_IMPORTED_MODULE_1__.re(c);\n  const b = mathjs__WEBPACK_IMPORTED_MODULE_1__.im(c);\n  const magnitude = Math.sqrt(a * a + b * b);\n  let hue = Math.atan2(b, a) / Math.PI * 180;\n\n  if (hue < 0) {\n    hue += 360;\n  }\n\n  const hueIndex = Math.round(hue);\n  const boundedIndex = Math.min(hueIndex, 255);\n\n  const rgb = [hueIndex, 200, 255]; // Adjust colors as needed\n\n  if (ints) {\n    return rgb;\n  } else {\n    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];\n  }\n}\n\nfunction* pair_generator(n, t) {\n  const distance = 2 ** t;\n  const suffix_count = 2 ** t;\n  const prefix_count = 2 ** (n - t - 1);\n\n  for (let p = 0; p < prefix_count; p++) {\n    for (let s = 0; s < suffix_count; s++) {\n      const k0 = p * suffix_count * 2 + s;\n      const k1 = k0 + distance;\n      yield [k0, k1];\n    }\n  }\n}\n\nfunction is_bit_set(num, bit) {\n  return (num & (1 << bit)) !== 0;\n}\n\nfunction process_pair(state, gate, k0 = 0, k1 = 1) {\n  const x = state[k0];\n  const y = state[k1];\n  state[k0] = mathjs__WEBPACK_IMPORTED_MODULE_1__.add(mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(x, gate[0][0]), mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(y, gate[0][1]));\n  state[k1] = mathjs__WEBPACK_IMPORTED_MODULE_1__.add(mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(x, gate[1][0]), mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(y, gate[1][1]));\n}\n\nfunction c_transform(state, c, t, gate) {\n  const n = Math.log2(state.length);\n  for (const [k0, k1] of Array.from(pair_generator(n, t)).filter((p) =>\n    is_bit_set(p[0], c)\n  )) {\n    process_pair(state, gate, k0, k1);\n  }\n}\n\nclass QuantumStateViewer extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {\n  static styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)`\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  margin: 20px 0;\n  overflow-x: auto;\n}\n\nth,\ntd {\n  border: 1px solid #ddd;\n  text-align: center;\n  padding: 8px;\n  word-wrap: break-word;\n}\n\nth {\n  background-color: #f2f2f2;\n}\n\n.amplitude-bar {\n  display: flex;\n  align-items: center; /* Ensures bars stay horizontally aligned */\n  justify-content: flex-start; /* Left-aligns the bars */\n}\n\n.bar {\n  height: 10px;\n}\n\n.buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  margin: 15px 0;\n  justify-content: center;\n}\n\nbutton,\nselect,\ninput {\n  padding: 10px 15px;\n  font-size: 1rem;\n  cursor: pointer;\n}\n\nbutton:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\n.highlight {\n  background-color: lightyellow;\n}\n\n.theta-container {\n  margin-top: 10px;\n}\n\n/* Responsive styles for smaller screens */\n@media (max-width: 600px) {\n  table {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n  }\n\n  th,\n  td {\n    font-size: 0.9rem;\n  }\n\n  .buttons {\n    flex-direction: column;\n    align-items: center;\n    gap: 10px;\n  }\n\n  .theta-container {\n    text-align: center;\n  }\n\n  .amplitude-bar {\n    display: flex;\n    align-items: center; /* Keeps bars horizontally aligned */\n    justify-content: flex-start; /* Left-aligns the bars on mobile */\n    height: 100%;\n  }\n\n  .bar {\n    width: 100%; /* Ensures full-width bars */\n    height: 100%;\n  }\n}\n  `;\n\n  static properties = {\n    state: { type: Array },\n    intermediateStates: { type: Array },\n    processedPairs: { type: Array },\n    gate: { type: String },\n    gateMatrix: { type: Array },\n    targetQubit: { type: Number },\n    controlQubit: { type: Number },\n    controlled: { type: Boolean },\n    processingPair: { type: Array },\n    theta: { type: Number },\n    delay: { type: Number },\n    mode: { type: String },\n  };\n\n  constructor() {\n    super();\n    this.state = [];\n    this.intermediateStates = [];\n    this.processedPairs = [];\n    this.gate = 'X';\n    this.targetQubit = 0;\n    this.controlQubit = 0;\n    this.controlled = false;\n    this.processingPair = [];\n    this.theta = Math.PI / 4;\n    this.delay = 750; // Set default delay to 750ms\n    this.mode = 'dynamic';\n    this.initializeState();\n  }\n\n  initializeState() {\n    const size = 8;\n    this.state = Array.from({ length: size }, () =>\n      mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.random() - 0.5, Math.random() - 0.5)\n    );\n    const norm = mathjs__WEBPACK_IMPORTED_MODULE_1__.sqrt(\n      this.state.reduce((acc, val) => mathjs__WEBPACK_IMPORTED_MODULE_1__.add(acc, mathjs__WEBPACK_IMPORTED_MODULE_1__.pow(mathjs__WEBPACK_IMPORTED_MODULE_1__.abs(val), 2)), 0)\n    );\n    this.state = this.state.map((amp) => mathjs__WEBPACK_IMPORTED_MODULE_1__.divide(amp, norm));\n    this.intermediateStates = [this.state.slice()];\n    this.processedPairs = [[]];\n    this.processingPair = [];\n  }\n\n  async applyDynamicGate() {\n    const n = Math.log2(this.state.length);\n    const generator = pair_generator(n, this.targetQubit);\n\n    this.gateMatrix =\n      typeof gates[this.gate] === 'function'\n        ? gates[this.gate](this.theta)\n        : gates[this.gate];\n\n    for (const [k0, k1] of generator) {\n      if (this.controlled && !is_bit_set(k0, this.controlQubit)) continue;\n\n      this.processingPair = [k0, k1];\n      this.requestUpdate();\n      await new Promise((resolve) => setTimeout(resolve, this.delay / 2));\n\n      process_pair(this.state, this.gateMatrix, k0, k1);\n\n      this.intermediateStates.push(this.state.slice());\n      this.processedPairs.push([k0, k1]);\n      this.requestUpdate();\n      await new Promise((resolve) => setTimeout(resolve, this.delay));\n    }\n\n    this.processingPair = [];\n  }\n\n  applyStaticGate() {\n    const n = Math.log2(this.state.length);\n\n    this.gateMatrix =\n      typeof gates[this.gate] === 'function'\n        ? gates[this.gate](this.theta)\n        : gates[this.gate];\n\n    if (this.controlled) {\n      c_transform(this.state, this.controlQubit, this.targetQubit, this.gateMatrix);\n    } else {\n      for (const [k0, k1] of pair_generator(n, this.targetQubit)) {\n        process_pair(this.state, this.gateMatrix, k0, k1);\n        this.intermediateStates.push(this.state.slice());\n        this.processedPairs.push([k0, k1]);\n      }\n    }\n\n    this.requestUpdate();\n  }\n\n  renderTable(state, title, highlightIndices = []) {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <h4>${title}</h4>\n      <table>\n        <thead>\n          <tr>\n            <th>Outcome</th>\n            <th>Binary</th>\n            <th>Amplitude</th>\n            <th>Direction</th>\n            <th>Magnitude</th>\n            <th>Amplitude Bar</th>\n          </tr>\n        </thead>\n        <tbody>\n          ${state.map((amplitude, index) => {\n            const magnitude = mathjs__WEBPACK_IMPORTED_MODULE_1__.abs(amplitude).toFixed(4);\n            const direction = ((mathjs__WEBPACK_IMPORTED_MODULE_1__.arg(amplitude) * 180) / Math.PI).toFixed(1);\n            const rgb = complex_to_rgb(amplitude, true);\n            const isHighlighted = highlightIndices.includes(index);\n            return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <tr class=\"${isHighlighted ? 'highlight' : ''}\">\n                <td>${index}</td>\n                <td>${index\n                  .toString(2)\n                  .padStart(Math.log2(state.length), '0')}</td>\n                <td>${mathjs__WEBPACK_IMPORTED_MODULE_1__.format(amplitude, {\n                  notation: 'fixed',\n                  precision: 4,\n                })}</td>\n                <td>${direction}°</td>\n                <td>${magnitude}</td>\n                <td>\n                  <div class=\"amplitude-bar\">\n                    <div\n                      class=\"bar\"\n                      style=\"width: ${magnitude * 100}%; background-color: rgb(${rgb.join(\n                        ','\n                      )});\"\n                    ></div>\n                  </div>\n                </td>\n              </tr>\n            `;\n          })}\n        </tbody>\n      </table>\n    `;\n  }\n\n  render() {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <div>\n        <h3>Quantum State Visualizer</h3>\n        <div>\n          ${this.mode === 'dynamic'\n            ? this.renderTable(\n                this.intermediateStates[this.intermediateStates.length - 1],\n                `Current State`,\n                this.processingPair\n              )\n            : this.intermediateStates.map((state, idx) =>\n                this.renderTable(state, `Step ${idx + 1}`, this.processedPairs[idx] || [])\n              )}\n        </div>\n        <div class=\"buttons\">\n          <label>\n            Mode:\n            <select @change=\"${(e) => (this.mode = e.target.value)}\">\n              <option value=\"dynamic\" ?selected=\"${this.mode === 'dynamic'}\">\n                Dynamic\n              </option>\n              <option value=\"static\" ?selected=\"${this.mode === 'static'}\">\n                Static\n              </option>\n            </select>\n          </label>\n          <label>\n            Gate:\n            <select @change=\"${(e) => (this.gate = e.target.value)}\">\n              ${Object.keys(gates).map(\n                (key) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<option value=\"${key}\">${key}</option>`\n              )}\n            </select>\n          </label>\n          ${this.controlled\n            ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n                <label>\n                  Control Qubit:\n                  <input\n                    type=\"number\"\n                    min=\"0\"\n                    max=\"${Math.log2(this.state.length) - 1}\"\n                    value=\"${this.controlQubit}\"\n                    @input=\"${(e) => (this.controlQubit = Number(e.target.value))}\"\n                  />\n                </label>\n              `\n            : ''}\n          <label>\n            Target Qubit:\n            <input\n              type=\"number\"\n              min=\"0\"\n              max=\"${Math.log2(this.state.length) - 1}\"\n              value=\"${this.targetQubit}\"\n              @input=\"${(e) => (this.targetQubit = Number(e.target.value))}\"\n            />\n          </label>\n          <button\n            @click=\"${\n              this.mode === 'dynamic'\n                ? this.applyDynamicGate\n                : this.applyStaticGate\n            }\"\n          >\n            Apply Gate\n          </button>\n          <button @click=\"${this.initializeState}\">Reset</button>\n        </div>\n\n        ${['Phase', 'RZ'].includes(this.gate)\n          ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <div class=\"theta-container\">\n                <label>\n                  θ (radians):\n                  <input\n                    type=\"number\"\n                    step=\"0.1\"\n                    .value=\"${this.theta}\"\n                    @input=\"${(e) => (this.theta = Number(e.target.value))}\"\n                  />\n                </label>\n              </div>\n            `\n          : ''}\n      </div>\n    `;\n  }\n}\n\ncustomElements.define('quantum-state-viewer', QuantumStateViewer);\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/component2.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"tutorial": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhumejs"] = self["webpackChunkhumejs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_microsoft_quantum-viz_js_dist_qviz_min_js-node_modules_d3_src_index_js-n-46cfdf","vendors-node_modules_lit_index_js","src_lib_simulator_core_js-src_lib_simulator_gates_js"], () => (__webpack_require__("./src/js/tutorial.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;