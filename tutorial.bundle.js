/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "?d4c0":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://humejs/crypto_(ignored)?");

/***/ }),

/***/ "./src/js/tutorial.js":
/*!****************************!*\
  !*** ./src/js/tutorial.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_algos_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algos/component.js */ \"./src/lib/algos/component.js\");\n/* harmony import */ var _lib_algos_component2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/algos/component2.js */ \"./src/lib/algos/component2.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const gates = [\n        { id: 'X', title: 'X Gate', gateType: 'X' },\n        { id: 'Y', title: 'Y Gate', gateType: 'Y' },\n        { id: 'Z', title: 'Z Gate', gateType: 'Z' },\n        { id: 'H', title: 'Hadamard Gate', gateType: 'H' },\n        { id: 'Phase', title: 'Phase Gate', gateType: 'Phase' },\n        { id: 'RZ', title: 'RZ Gate', gateType: 'RZ' }\n    ];\n\n    gates.forEach(({ id, title, gateType }) => {\n        const container = document.getElementById(id);\n\n        const gateContainer = document.createElement('div');\n        gateContainer.style.marginBottom = '30px';\n\n        const titleElement = document.createElement('h2');\n        titleElement.textContent = title;\n        titleElement.style.marginBottom = '10px';\n\n        const quantumGateElement = document.createElement('quantum-gate-simulator');\n        quantumGateElement.gate = gateType; // Assign the gate type dynamically\n\n        gateContainer.appendChild(quantumGateElement);\n\n        container.appendChild(gateContainer);\n    });\n\n    const viewerContainer = document.getElementById('quantum-viewer-container');\n\n    // Create an instance of the Quantum State Viewer\n    const quantumViewer = document.createElement('quantum-state-viewer');\n  \n    // Set the initial properties (if needed)\n    quantumViewer.gate = 'X'; // Example: setting the X-gate\n  \n    // Append the Quantum State Viewer to the container\n    viewerContainer.appendChild(quantumViewer);\n\n});\n\n\n//# sourceURL=webpack://humejs/./src/js/tutorial.js?");

/***/ }),

/***/ "./src/lib/algos/component.js":
/*!************************************!*\
  !*** ./src/lib/algos/component.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QuantumGateSimulator: () => (/* binding */ QuantumGateSimulator)\n/* harmony export */ });\n/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ \"./node_modules/lit/index.js\");\n\n\n// Hardcoding the colormap directly into the script\nconst colormap = [\n  [247, 55, 26], [247, 55, 26], [246, 56, 23], [246, 58, 21], [246, 58, 21], [246, 61, 18], [247, 64, 16], \n  [247, 64, 16], [247, 68, 14], [247, 72, 12], [248, 76, 10], [248, 76, 10], [248, 80, 8], [248, 85, 7], [248, 85, 7], \n  [249, 89, 6], [249, 94, 5], [250, 98, 4], [250, 98, 4], [251, 103, 3], [251, 107, 2], [251, 107, 2], [252, 112, 2], \n  [252, 116, 1], [253, 120, 1], [253, 120, 1], [253, 125, 0], [254, 129, 0], [254, 129, 0], [254, 133, 0], [254, 137, 0], \n  [255, 141, 0], [255, 141, 0], [255, 145, 0], [255, 149, 0], [255, 149, 0], [255, 153, 0], [255, 157, 0], [255, 161, 0], \n  [255, 161, 0], [255, 165, 0], [255, 168, 0], [255, 168, 0], [255, 172, 0], [255, 176, 0], [255, 179, 0], [255, 179, 0], \n  [255, 183, 0], [255, 186, 0], [255, 186, 0], [255, 189, 0], [254, 193, 0], [254, 193, 0], [253, 195, 0], [252, 198, 0], \n  [251, 201, 0], [251, 201, 0], [249, 203, 0], [247, 205, 0], [247, 205, 0], [245, 206, 0], [242, 208, 0], [239, 208, 0], \n  [239, 208, 0], [236, 209, 0], [233, 209, 0], [233, 209, 0], [229, 209, 0], [225, 209, 0], [221, 208, 0], [221, 208, 0], \n  [217, 208, 0], [213, 207, 0], [213, 207, 0], [209, 205, 0], [204, 204, 0], [200, 203, 0], [200, 203, 0], [195, 201, 0], \n  [191, 199, 0], [191, 199, 0], [186, 197, 0], [181, 196, 0], [177, 194, 0], [177, 194, 0], [172, 192, 0], [167, 190, 0], \n  [167, 190, 0], [162, 188, 0], [158, 186, 0], [153, 184, 0], [153, 184, 0], [148, 182, 0], [143, 180, 0], [143, 180, 0], \n  [138, 178, 1], [134, 176, 1], [134, 176, 1], [129, 174, 2], [124, 172, 2], [119, 170, 3], [119, 170, 3], [114, 169, 3], \n  [109, 167, 4], [109, 167, 4], [104, 165, 6], [100, 163, 7], [95, 161, 9], [95, 161, 9], [90, 160, 11], [85, 158, 13], \n  [85, 158, 13], [81, 157, 16], [76, 156, 18], [72, 155, 21], [72, 155, 21], [68, 154, 24], [64, 154, 27], [64, 154, 27], \n  [60, 153, 30], [57, 153, 34], [54, 153, 38], [54, 153, 38], [51, 154, 41], [49, 155, 45], [49, 155, 45], [47, 155, 49], \n  [45, 157, 54], [44, 158, 58], [44, 158, 58], [43, 160, 62], [43, 161, 67], [43, 161, 67], [43, 163, 72], [43, 165, 76], \n  [44, 167, 81], [44, 167, 81], [44, 170, 86], [45, 172, 91], [45, 172, 91], [46, 174, 96], [46, 177, 101], [46, 177, 101], \n  [47, 179, 106], [48, 181, 111], [48, 184, 116], [48, 184, 116], [49, 186, 121], [49, 189, 126], [49, 189, 126], [50, 191, 131], \n  [50, 194, 136], [50, 196, 141], [50, 196, 141], [50, 199, 146], [50, 202, 151], [50, 202, 151], [50, 204, 156], [50, 207, 161], \n  [50, 209, 166], [50, 209, 166], [49, 212, 171], [48, 214, 177], [48, 214, 177], [48, 216, 182], [47, 219, 187], [46, 221, 192], \n  [46, 221, 192], [45, 223, 197], [44, 225, 202], [44, 225, 202], [43, 227, 206], [42, 228, 211], [40, 230, 215], [40, 230, 215]\n];\n\n// Function to convert complex number to RGB\nfunction complex_to_rgb(c, ints = false) {\n  const a = math.re(c);\n  const b = math.im(c);\n\n  const magnitude = Math.sqrt(a * a + b * b);\n  let hue = Math.atan2(b, a) / Math.PI * 180;\n\n  if (hue < 0) {\n    hue += 360;\n  }\n\n  const hueIndex = Math.round(hue);\n  const boundedIndex = Math.min(hueIndex, colormap.length - 1);\n\n  const rgb = colormap[boundedIndex];\n\n  if (ints) {\n    return rgb;\n  } else {\n    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];\n  }\n}\n\nclass QuantumGateSimulator extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {\n  static styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)`\n    table {\n      border-collapse: collapse;\n      width: 100%;\n      margin: 20px 0;\n    }\n    th,\n    td {\n      border: 1px solid #ddd;\n      text-align: center;\n      padding: 8px;\n    }\n    th {\n      background-color: #f2f2f2;\n    }\n    .amplitude-bar {\n      display: flex;\n      align-items: center;\n    }\n    .bar {\n      height: 10px;\n    }\n    .buttons {\n      margin: 10px 0;\n    }\n    button {\n      margin-right: 10px;\n      padding: 10px 15px;\n      font-size: 1rem;\n      cursor: pointer;\n    }\n    button:disabled {\n      background-color: #ccc;\n      cursor: not-allowed;\n    }\n  `;\n\n  static properties = {\n    state: { type: Array },\n    originalState: { type: Array },\n    gate: { type: String },\n    gateApplied: { type: Boolean },\n  };\n\n  constructor() {\n    super();\n    this.state = [];\n    this.originalState = [];\n    this.gate = 'X'; // Default gate\n    this.gateApplied = false;\n    this.initializeState();\n  }\n\n  initializeState() {\n    const amplitude0 = math.complex(Math.random() - 0.5, Math.random() - 0.5);\n    const amplitude1 = math.complex(Math.random() - 0.5, Math.random() - 0.5);\n    const norm = math.sqrt(\n      math.add(math.pow(math.abs(amplitude0), 2), math.pow(math.abs(amplitude1), 2))\n    );\n    this.originalState = [\n      { outcome: 0, amplitude: math.divide(amplitude0, norm) },\n      { outcome: 1, amplitude: math.divide(amplitude1, norm) },\n    ];\n    this.state = [...this.originalState];\n    this.gateApplied = false;\n  }\n\n  applyGate() {\n    if (this.gateApplied) return;\n\n    const [state0, state1] = this.state;\n\n    switch (this.gate) {\n      case 'X': // Pauli-X (NOT gate)\n        this.state = [\n          { ...state0, amplitude: state1.amplitude },\n          { ...state1, amplitude: state0.amplitude },\n        ];\n        break;\n      case 'Y': // Pauli-Y gate\n        this.state = [\n          { ...state0, amplitude: math.multiply(state1.amplitude, math.complex(0, -1)) },\n          { ...state1, amplitude: math.multiply(state0.amplitude, math.complex(0, 1)) },\n        ];\n        break;\n      case 'Z': // Pauli-Z gate\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          { ...state1, amplitude: math.multiply(state1.amplitude, -1) },\n        ];\n        break;\n      case 'H': // Hadamard gate\n        this.state = [\n          {\n            ...state0,\n            amplitude: math.divide(\n              math.add(state0.amplitude, state1.amplitude),\n              math.sqrt(2)\n            ),\n          },\n          {\n            ...state1,\n            amplitude: math.divide(\n              math.subtract(state0.amplitude, state1.amplitude),\n              math.sqrt(2)\n            ),\n          },\n        ];\n        break;\n      case 'Phase': // Phase gate (π/2 phase)\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          {\n            ...state1,\n            amplitude: math.multiply(state1.amplitude, math.exp(math.complex(0, Math.PI / 2))),\n          },\n        ];\n        break;\n      case 'RZ': // RZ gate (rotation around Z-axis)\n        const theta = Math.PI / 4; // Example rotation angle\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          {\n            ...state1,\n            amplitude: math.multiply(state1.amplitude, math.exp(math.complex(0, theta))),\n          },\n        ];\n        break;\n    }\n\n    this.gateApplied = true;\n    this.requestUpdate();\n  }\n\n  renderTable(state, title) {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <h4>${title}</h4>\n      <table>\n        <thead>\n          <tr>\n            <th>Outcome</th>\n            <th>Binary</th>\n            <th>Amplitude</th>\n            <th>Direction</th>\n            <th>Magnitude</th>\n            <th>Amplitude Bar</th>\n          </tr>\n        </thead>\n        <tbody>\n          ${state.map(({ outcome, amplitude }) => {\n            const magnitude = math.abs(amplitude).toFixed(4);\n            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);\n            const rgb = complex_to_rgb(amplitude, true);\n            return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <tr>\n                <td>${outcome}</td>\n                <td>${outcome.toString(2)}</td>\n                <td>${math.format(amplitude, { notation: 'fixed', precision: 4 })}</td>\n                <td>${direction}°</td>\n                <td>${magnitude}</td>\n                <td>\n                  <div class=\"amplitude-bar\">\n                    <div\n                      class=\"bar\"\n                      style=\"width: ${magnitude * 100}%; background-color: rgb(${rgb.join(',')});\"\n                    ></div>\n                  </div>\n                </td>\n              </tr>\n            `;\n          })}\n        </tbody>\n      </table>\n    `;\n  }\n\n  render() {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <div>\n        <h3>${this.gate} Gate Simulator</h3>\n        <div>\n          ${this.renderTable(this.originalState, 'Original State')}\n          ${this.gateApplied ? this.renderTable(this.state, 'After Applying Gate') : ''}\n        </div>\n        <div class=\"buttons\">\n          <button @click=\"${this.applyGate}\" ?disabled=\"${this.gateApplied}\">\n            Apply ${this.gate} Gate\n          </button>\n          <button @click=\"${this.initializeState}\">Reset</button>\n        </div>\n      </div>\n    `;\n  }\n}\n\ncustomElements.define('quantum-gate-simulator', QuantumGateSimulator);\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/component.js?");

/***/ }),

/***/ "./src/lib/algos/component2.js":
/*!*************************************!*\
  !*** ./src/lib/algos/component2.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QuantumStateViewer: () => (/* binding */ QuantumStateViewer)\n/* harmony export */ });\n/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ \"./node_modules/lit/index.js\");\n/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mathjs */ \"./node_modules/mathjs/lib/esm/entry/pureFunctionsAny.generated.js\");\n\n\n\nconst gates = {\n  X: [\n    [0, 1],\n    [1, 0],\n  ],\n  Z: [\n    [1, 0],\n    [0, -1],\n  ],\n  Y: [\n    [0, mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(0, -1)],\n    [mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(0, 1), 0],\n  ],\n  H: [\n    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],\n    [1 / Math.sqrt(2), -1 / Math.sqrt(2)],\n  ],\n  Phase: (theta) => [\n    [1, 0],\n    [0, mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.cos(theta), Math.sin(theta))],\n  ],\n  RZ: (theta) => [\n    [mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],\n    [0, mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.cos(theta / 2), Math.sin(theta / 2))],\n  ],\n};\n\nfunction complex_to_rgb(c, ints = false) {\n  const a = mathjs__WEBPACK_IMPORTED_MODULE_1__.re(c);\n  const b = mathjs__WEBPACK_IMPORTED_MODULE_1__.im(c);\n  const magnitude = Math.sqrt(a * a + b * b);\n  let hue = Math.atan2(b, a) / Math.PI * 180;\n\n  if (hue < 0) {\n    hue += 360;\n  }\n\n  const hueIndex = Math.round(hue);\n  const boundedIndex = Math.min(hueIndex, 255);\n\n  const rgb = [hueIndex, 200, 255]; // Adjust colors as needed\n\n  if (ints) {\n    return rgb;\n  } else {\n    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];\n  }\n}\n\nfunction* pair_generator(n, t) {\n  const distance = 2 ** t;\n  const suffix_count = 2 ** t;\n  const prefix_count = 2 ** (n - t - 1);\n\n  for (let p = 0; p < prefix_count; p++) {\n    for (let s = 0; s < suffix_count; s++) {\n      const k0 = p * suffix_count * 2 + s;\n      const k1 = k0 + distance;\n      yield [k0, k1];\n    }\n  }\n}\n\nfunction process_pair(state, gate, k0 = 0, k1 = 1) {\n  const x = state[k0];\n  const y = state[k1];\n  state[k0] = mathjs__WEBPACK_IMPORTED_MODULE_1__.add(mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(x, gate[0][0]), mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(y, gate[0][1]));\n  state[k1] = mathjs__WEBPACK_IMPORTED_MODULE_1__.add(mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(x, gate[1][0]), mathjs__WEBPACK_IMPORTED_MODULE_1__.multiply(y, gate[1][1]));\n}\n\nclass QuantumStateViewer extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {\n  static styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)`\n    table {\n      border-collapse: collapse;\n      width: 100%;\n      margin: 20px 0;\n    }\n    th,\n    td {\n      border: 1px solid #ddd;\n      text-align: center;\n      padding: 8px;\n    }\n    th {\n      background-color: #f2f2f2;\n    }\n    .amplitude-bar {\n      display: flex;\n      align-items: center;\n    }\n    .bar {\n      height: 10px;\n    }\n    .buttons {\n      margin: 10px 0;\n    }\n    button,\n    select,\n    input {\n      margin-right: 10px;\n      padding: 10px 15px;\n      font-size: 1rem;\n      cursor: pointer;\n    }\n    button:disabled {\n      background-color: #ccc;\n      cursor: not-allowed;\n    }\n    .highlight {\n      background-color: lightyellow;\n    }\n    .slider-container {\n      margin: 20px 0;\n    }\n    .slider {\n      width: 100%;\n      max-width: 300px;\n    }\n  `;\n\n  static properties = {\n    state: { type: Array },\n    intermediateStates: { type: Array },\n    gate: { type: String },\n    gateMatrix: { type: Array },\n    targetQubit: { type: Number },\n    processingPair: { type: Array },\n    theta: { type: Number },\n    delay: { type: Number }, // Dynamic delay in milliseconds\n  };\n\n  constructor() {\n    super();\n    this.state = [];\n    this.intermediateStates = [];\n    this.gate = 'X';\n    this.targetQubit = 0;\n    this.processingPair = [];\n    this.theta = Math.PI / 4; // Default angle for Phase and RZ gates\n    this.delay = 1000; // Default delay\n    this.initializeState();\n  }\n\n  initializeState() {\n    const size = 8; // 3 qubits = 2^3 = 8 states\n    this.state = Array.from({ length: size }, () =>\n      mathjs__WEBPACK_IMPORTED_MODULE_1__.complex(Math.random() - 0.5, Math.random() - 0.5)\n    );\n    const norm = mathjs__WEBPACK_IMPORTED_MODULE_1__.sqrt(\n      this.state.reduce((acc, val) => mathjs__WEBPACK_IMPORTED_MODULE_1__.add(acc, mathjs__WEBPACK_IMPORTED_MODULE_1__.pow(mathjs__WEBPACK_IMPORTED_MODULE_1__.abs(val), 2)), 0)\n    );\n    this.state = this.state.map((amp) => mathjs__WEBPACK_IMPORTED_MODULE_1__.divide(amp, norm));\n    this.intermediateStates = [this.state.slice()]; // Store initial state\n    this.processingPair = [];\n  }\n\n  async applyGate() {\n    const n = Math.log2(this.state.length); // Number of qubits\n    const generator = pair_generator(n, this.targetQubit);\n\n    this.gateMatrix =\n      typeof gates[this.gate] === 'function'\n        ? gates[this.gate](this.theta)\n        : gates[this.gate];\n\n    for (const [k0, k1] of generator) {\n      if (k1 >= this.state.length) continue;\n\n      // Highlight the current pair\n      this.processingPair = [k0, k1];\n      this.requestUpdate();\n      await new Promise((resolve) => setTimeout(resolve, this.delay / 2)); // Highlight delay\n\n      // Process the current pair\n      process_pair(this.state, this.gateMatrix, k0, k1);\n\n      // Store a copy of the state after processing the pair\n      this.intermediateStates.push(this.state.slice());\n\n      // Trigger re-render\n      this.requestUpdate();\n      await new Promise((resolve) => setTimeout(resolve, this.delay)); // Post-processing delay\n    }\n\n    this.processingPair = []; // Clear highlights after processing\n  }\n\n  renderTable(state, title) {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <h4>${title}</h4>\n      <table>\n        <thead>\n          <tr>\n            <th>Outcome</th>\n            <th>Binary</th>\n            <th>Amplitude</th>\n            <th>Direction</th>\n            <th>Magnitude</th>\n            <th>Amplitude Bar</th>\n          </tr>\n        </thead>\n        <tbody>\n          ${state.map((amplitude, index) => {\n            const magnitude = mathjs__WEBPACK_IMPORTED_MODULE_1__.abs(amplitude).toFixed(4);\n            const direction = ((mathjs__WEBPACK_IMPORTED_MODULE_1__.arg(amplitude) * 180) / Math.PI).toFixed(1);\n            const rgb = complex_to_rgb(amplitude, true);\n            const isHighlighted = this.processingPair.includes(index);\n            return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <tr class=\"${isHighlighted ? 'highlight' : ''}\">\n                <td>${index}</td>\n                <td>${index.toString(2).padStart(Math.log2(state.length), '0')}</td>\n                <td>${mathjs__WEBPACK_IMPORTED_MODULE_1__.format(amplitude, { notation: 'fixed', precision: 4 })}</td>\n                <td>${direction}°</td>\n                <td>${magnitude}</td>\n                <td>\n                  <div class=\"amplitude-bar\">\n                    <div\n                      class=\"bar\"\n                      style=\"width: ${magnitude * 100}%; background-color: rgb(${rgb.join(',')});\"\n                    ></div>\n                  </div>\n                </td>\n              </tr>\n            `;\n          })}\n        </tbody>\n      </table>\n    `;\n  }\n\n  render() {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <div>\n        <h3>Quantum State Viewer</h3>\n        <div>\n          ${this.renderTable(\n            this.intermediateStates[this.intermediateStates.length - 1],\n            `Current State`\n          )}\n        </div>\n        <div class=\"buttons\">\n          <label>\n            Gate:\n            <select @change=\"${(e) => (this.gate = e.target.value)}\">\n              ${Object.keys(gates).map(\n                (key) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<option value=\"${key}\">${key}</option>`\n              )}\n            </select>\n          </label>\n          <label>\n            Target Qubit:\n            <input\n              type=\"number\"\n              min=\"0\"\n              max=\"${Math.log2(this.state.length) - 1}\"\n              value=\"${this.targetQubit}\"\n              @input=\"${(e) => (this.targetQubit = Number(e.target.value))}\"\n            />\n          </label>\n          <button @click=\"${this.applyGate}\">\n            Apply Gate\n          </button>\n          <button @click=\"${this.initializeState}\">Reset</button>\n        </div>\n        ${['Phase', 'RZ'].includes(this.gate)\n          ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <label>\n                θ (radians):\n                <input\n                  type=\"number\"\n                  step=\"0.1\"\n                  .value=\"${this.theta}\"\n                  @input=\"${(e) => (this.theta = Number(e.target.value))}\"\n                />\n              </label>\n            `\n          : ''}\n        <div class=\"slider-container\">\n          <label>\n            Visualization Delay:\n            <input\n              type=\"range\"\n              min=\"500\"\n              max=\"3000\"\n              step=\"100\"\n              .value=\"${this.delay}\"\n              @input=\"${(e) => (this.delay = Number(e.target.value))}\"\n              class=\"slider\"\n            />\n            ${this.delay} ms\n          </label>\n        </div>\n      </div>\n    `;\n  }\n}\n\ncustomElements.define('quantum-state-viewer', QuantumStateViewer);\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/component2.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_mathjs_lib_esm_entry_pureFunctionsAny_generated_js","vendors-node_modules_lit_index_js"], () => (__webpack_require__("./src/js/tutorial.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;