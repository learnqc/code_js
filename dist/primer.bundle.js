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

/***/ "./src/js/primer.js":
/*!**************************!*\
  !*** ./src/js/primer.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_algos_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algos/component.js */ \"./src/lib/algos/component.js\");\n/* harmony import */ var _lib_algos_component2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/algos/component2.js */ \"./src/lib/algos/component2.js\");\n/* harmony import */ var _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/common.js */ \"./src/lib/utils/common.js\");\n/* harmony import */ var _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/simulator/core.js */ \"./src/lib/simulator/core.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const gates = [\n        { id: 'X', title: 'X Gate', gateType: 'X' },\n        { id: 'Y', title: 'Y Gate', gateType: 'Y' },\n        { id: 'Z', title: 'Z Gate', gateType: 'Z' },\n        { id: 'H', title: 'Hadamard Gate', gateType: 'H' },\n        { id: 'Phase', title: 'Phase Gate', gateType: 'Phase' },\n        { id: 'RZ', title: 'RZ Gate', gateType: 'RZ' }\n    ];\n\n    gates.forEach(({ id, title, gateType }) => {\n        const container = document.getElementById(id);\n\n        const gateContainer = document.createElement('div');\n        gateContainer.style.marginBottom = '30px';\n\n        const titleElement = document.createElement('h2');\n        titleElement.textContent = title;\n        titleElement.style.marginBottom = '10px';\n\n        const quantumGateElement = document.createElement('quantum-gate-simulator');\n        quantumGateElement.gate = gateType; // Assign the gate type dynamically\n\n        gateContainer.appendChild(quantumGateElement);\n\n        container.appendChild(gateContainer);\n    });\n\n    const viewerContainer = document.getElementById('quantum-viewer-container-1');\n    const quantumViewer = document.createElement('quantum-state-viewer');\n    quantumViewer.gate = 'X';\n    quantumViewer.targetQubit = 0;\n    quantumViewer.controlled = false;\n    viewerContainer.appendChild(quantumViewer);\n\n    quantumViewer.addEventListener('change', (e) => {\n      const gate = quantumViewer.gate;\n      quantumViewer.controlled = ['CX', 'CY', 'CZ'].includes(gate);\n    });\n\n    const container2 = document.getElementById('quantum-viewer-container-2');\n    const viewer2 = document.createElement('quantum-state-viewer');\n    viewer2.gate = 'CX';\n    viewer2.controlQubit = 0;\n    viewer2.targetQubit = 1;\n    viewer2.controlled = true;\n    container2.appendChild(viewer2);\n\n    viewer2.addEventListener('change', (e) => {\n      const gate = viewer2.gate;\n      viewer2.controlled = ['CX', 'CY', 'CZ'].includes(gate);\n    });\n});\n\n\n\n\n\n\n// Default Simulator Context definitions:\nconst x = [[0, 1], [1, 0]];\nconst z = [[1, 0], [0, -1]];\n\nfunction phase(theta) {\n  return [[1, 0], [0, math.complex(Math.cos(theta), Math.sin(theta))]];\n}\n\nconst h = [[1 / Math.sqrt(2), 1 / Math.sqrt(2)], [1 / Math.sqrt(2), -1 / Math.sqrt(2)]];\n\nfunction rz(theta) {\n  return [\n    [math.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],\n    [0, math.complex(Math.cos(theta / 2), Math.sin(theta / 2))]\n  ];\n}\n\nconst y = [[0, math.complex(0, -1)], [math.complex(0, 1), 0]];\n\nfunction rx(theta) {\n  return [\n    [Math.cos(theta / 2), math.complex(0, -Math.sin(theta / 2))],\n    [math.complex(0, -Math.sin(theta / 2)), Math.cos(theta / 2)]\n  ];\n}\n\nfunction ry(theta) {\n  return [\n    [Math.cos(theta / 2), -Math.sin(theta / 2)],\n    [Math.sin(theta / 2), Math.cos(theta / 2)]\n  ];\n}\n\nfunction initState(n) {\n  const state = Array(2 ** n).fill(0);\n  state[0] = 1;\n  return state;\n}\n\nfunction isBitSet(m, k) {\n  return (m & (1 << k)) !== 0;\n}\n\nfunction* pairGenerator(n, t) {\n  const distance = 2 ** t;\n  for (let j = 0; j < 2 ** (n - t - 1); j++) {\n    for (let k0 = 2 * j * distance; k0 < (2 * j + 1) * distance; k0++) {\n      const k1 = k0 + distance;\n      yield [k0, k1];\n    }\n  }\n}\n\nfunction processPair(state, gate, k0, k1) {\n  const a = state[k0];\n  const b = state[k1];\n  state[k0] = a * gate[0][0] + b * gate[0][1];\n  state[k1] = a * gate[1][0] + b * gate[1][1];\n}\n\nfunction transform(state, t, gate) {\n  const n = Math.log2(state.length);\n  for (const [k0, k1] of pairGenerator(n, t)) {\n    processPair(state, gate, k0, k1);\n  }\n}\n\nfunction cTransform(state, c, t, gate) {\n  const n = Math.log2(state.length);\n  for (const [k0, k1] of pairGenerator(n, t)) {\n    if (isBitSet(k0, c)) {\n      processPair(state, gate, k0, k1);\n    }\n  }\n}\n\nfunction mcTransform(state, cs, t, gate) {\n  const n = Math.log2(state.length);\n  for (const [k0, k1] of pairGenerator(n, t)) {\n    if (cs.every(c => isBitSet(k0, c))) {\n      processPair(state, gate, k0, k1);\n    }\n  }\n}\n\nfunction measure(state, shots) {\n  const probabilities = state.map(amp => Math.abs(amp) ** 2);\n  const samples = math.pickRandom(state.map((_, i) => i), probabilities, shots);\n  const counts = {};\n  samples.forEach(sample => {\n    counts[sample] = (counts[sample] || 0) + 1;\n  });\n  return counts;\n}\n\n// Extend the shared context for evaluation\nlet sharedContext = {\n  math: math,\n  x: x,\n  z: z,\n  phase: phase,\n  h: h,\n  rz: rz,\n  y: y,\n  rx: rx,\n  ry: ry,\n  state_table_to_html: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.state_table_to_html,\n  initState: initState,\n  isBitSet: isBitSet,\n  pairGenerator: pairGenerator,\n  processPair: processPair,\n  transform: transform,\n  cTransform: cTransform,\n  mcTransform: mcTransform,\n  measure: measure,\n  state: []\n};\n  \n  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.37.0/min/vs' }});\n  \n  require(['vs/editor/editor.main'], function() {\n  \n    let codeHistory = [];\n\nfunction displayStepAndEditor(title, code) {\n  const tutorialDiv = document.getElementById(\"tutorial\");\n\n  // Step container\n  const stepDiv = document.createElement(\"div\");\n  stepDiv.className = \"step-container\";\n\n\n  // Editor container\n  const editorContainer = document.createElement(\"div\");\n  editorContainer.className = \"editor-container\";\n  editorContainer.style.height = \"400px\";\n  editorContainer.style.resize = \"vertical\";\n  editorContainer.style.overflow = \"auto\";\n\n\n  // Run Button\n  const runButton = document.createElement(\"button\");\n  runButton.className = \"run-button\";\n  runButton.innerText = \"Run Code\";\n\n  // Output container\n  const outputContainer = document.createElement(\"div\");\n  outputContainer.className = \"output\";\n  outputContainer.style.height = \"200px\";\n  outputContainer.style.resize = \"vertical\";\n  outputContainer.style.overflow = \"auto\";\n  \n\n\n  // Append elements\n  editorContainer.appendChild(runButton);\n  stepDiv.appendChild(editorContainer);\n  stepDiv.appendChild(outputContainer);\n  tutorialDiv.appendChild(stepDiv);\n\n  // Monaco Editor setup\n  const editor = monaco.editor.create(editorContainer, {\n    value: code,\n    language: \"javascript\",\n    theme: \"vs-light\",\n    automaticLayout: true // Dynamically adjust to container size\n  });\n\n  window.addEventListener(\"resize\", () => {\n    editor.layout();\n  });\n\n  // Run Code Button Logic\n  runButton.onclick = function () {\n    runCode(editor, outputContainer);\n  };\n}\n  \nfunction runCode(editor, outputContainer) {\n    const code = editor.getValue();\n    outputContainer.innerText = ''; // Clear previous output\n\n    // Combine previous code with the current editor's code\n    const fullCode = codeHistory.join('\\n') + '\\n' + code;\n\n    // Override console.log\n    const originalConsoleLog = console.log; // Preserve original console.log\n    console.log = function (...args) {\n        const message = args\n            .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))\n            .join(' ');\n        outputContainer.innerText += message + '\\n'; // Append to the output container\n        originalConsoleLog.apply(console, args); // Call the original console.log\n        // Auto-resize output\n        outputContainer.style.height = 'auto';\n        outputContainer.style.height = outputContainer.scrollHeight + 'px';\n    };\n\n    try {\n        const result = (function () {\n            const { math, state, state_table_to_html, init_state, is_close, prepare_state, is_power_of_two, cis, print_state, x, z, phase, h, rz, y, rx, ry, process_pair, choices, squaredMagnitude } = sharedContext;\n            return eval(fullCode); // Execute the accumulated code with the shared context\n        })();\n\n        // If result is not undefined, append it to the output\n        if (result !== undefined) {\n            outputContainer.innerText += `Result: ${result}\\n`;\n        }\n    } catch (error) {\n        outputContainer.innerText += `Error: ${error.message}\\n`;\n    } finally {\n        // Restore original console.log\n        console.log = originalConsoleLog;\n        // Auto-resize output after all output is set\n        outputContainer.style.height = 'auto';\n        outputContainer.style.height = outputContainer.scrollHeight + 'px';\n    }\n\n    // Save the current code for the next step\n}\n\n\n\n      \n      \n    \n \n    // Step 1: Define a quantum state using complex numbers\n    displayStepAndEditor(\n      ``,\n`function testSimulator() \n{\n  const state = initState(3);\n  transform(state, 0, h);\n  transform(state, 1, h);\n  mcTransform(state, [0, 1], 2, x);\n  const samples = measure(state, 1000);\n  console.log(state);\n  console.log(samples);\n}\n\ntestSimulator();`\n    );\n\n  });\n  \n\n//# sourceURL=webpack://humejs/./src/js/primer.js?");

/***/ }),

/***/ "./src/lib/algos/component.js":
/*!************************************!*\
  !*** ./src/lib/algos/component.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QuantumGateSimulator: () => (/* binding */ QuantumGateSimulator)\n/* harmony export */ });\n/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ \"./node_modules/lit/index.js\");\n\n// Make sure you have math.js or similar library available\n// so that 'math' is recognized (e.g., import * as math from 'mathjs';)\n\nconst colormap = [[247, 55, 26], [247, 55, 26], [246, 56, 23], [246, 58, 21], [246, 58, 21], [246, 61, 18], [247, 64, 16], [247, 64, 16], [247, 68, 14], [247, 72, 12], [248, 76, 10], [248, 76, 10], [248, 80, 8], [248, 85, 7], [248, 85, 7], [249, 89, 6], [249, 94, 5], [250, 98, 4], [250, 98, 4], [251, 103, 3], [251, 107, 2], [251, 107, 2], [252, 112, 2], [252, 116, 1], [253, 120, 1], [253, 120, 1], [253, 125, 0], [254, 129, 0], [254, 129, 0], [254, 133, 0], [254, 137, 0], [255, 141, 0], [255, 141, 0], [255, 145, 0], [255, 149, 0], [255, 149, 0], [255, 153, 0], [255, 157, 0], [255, 161, 0], [255, 161, 0], [255, 165, 0], [255, 168, 0], [255, 168, 0], [255, 172, 0], [255, 176, 0], [255, 179, 0], [255, 179, 0], [255, 183, 0], [255, 186, 0], [255, 186, 0], [255, 189, 0], [254, 193, 0], [254, 193, 0], [253, 195, 0], [252, 198, 0], [251, 201, 0], [251, 201, 0], [249, 203, 0], [247, 205, 0], [247, 205, 0], [245, 206, 0], [242, 208, 0], [239, 208, 0], [239, 208, 0], [236, 209, 0], [233, 209, 0], [233, 209, 0], [229, 209, 0], [225, 209, 0], [221, 208, 0], [221, 208, 0], [217, 208, 0], [213, 207, 0], [213, 207, 0], [209, 205, 0], [204, 204, 0], [200, 203, 0], [200, 203, 0], [195, 201, 0], [191, 199, 0], [191, 199, 0], [186, 197, 0], [181, 196, 0], [177, 194, 0], [177, 194, 0], [172, 192, 0], [167, 190, 0], [167, 190, 0], [162, 188, 0], [158, 186, 0], [153, 184, 0], [153, 184, 0], [148, 182, 0], [143, 180, 0], [143, 180, 0], [138, 178, 1], [134, 176, 1], [134, 176, 1], [129, 174, 2], [124, 172, 2], [119, 170, 3], [119, 170, 3], [114, 169, 3], [109, 167, 4], [109, 167, 4], [104, 165, 6], [100, 163, 7], [95, 161, 9], [95, 161, 9], [90, 160, 11], [85, 158, 13], [85, 158, 13], [81, 157, 16], [76, 156, 18], [72, 155, 21], [72, 155, 21], [68, 154, 24], [64, 154, 27], [64, 154, 27], [60, 153, 30], [57, 153, 34], [54, 153, 38], [54, 153, 38], [51, 154, 41], [49, 155, 45], [49, 155, 45], [47, 155, 49], [45, 157, 54], [44, 158, 58], [44, 158, 58], [43, 160, 62], [43, 161, 67], [43, 161, 67], [43, 163, 72], [43, 165, 76], [44, 167, 81], [44, 167, 81], [44, 170, 86], [45, 172, 91], [45, 172, 91], [46, 174, 96], [46, 177, 101], [46, 177, 101], [47, 179, 106], [48, 181, 111], [48, 184, 116], [48, 184, 116], [49, 186, 121], [49, 189, 126], [49, 189, 126], [50, 191, 131], [50, 194, 136], [50, 196, 141], [50, 196, 141], [50, 199, 146], [50, 202, 151], [50, 202, 151], [50, 204, 156], [50, 207, 161], [50, 209, 166], [50, 209, 166], [49, 212, 171], [48, 214, 177], [48, 214, 177], [48, 216, 182], [47, 219, 187], [46, 221, 192], [46, 221, 192], [45, 223, 197], [44, 225, 202], [44, 225, 202], [43, 227, 206], [42, 228, 211], [40, 230, 215], [40, 230, 215], [39, 231, 220], [39, 232, 224], [39, 232, 224], [38, 232, 228], [37, 232, 231], [37, 232, 235], [37, 232, 235], [37, 232, 238], [38, 231, 240], [38, 231, 240], [38, 230, 243], [39, 228, 245], [39, 228, 245], [40, 227, 247], [41, 225, 249], [42, 223, 250], [42, 223, 250], [43, 220, 251], [44, 218, 252], [44, 218, 252], [45, 215, 253], [46, 212, 254], [47, 209, 254], [47, 209, 254], [47, 206, 255], [48, 203, 255], [48, 203, 255], [49, 200, 255], [49, 197, 255], [49, 194, 255], [49, 194, 255], [49, 191, 255], [49, 188, 255], [49, 188, 255], [49, 184, 255], [49, 181, 255], [48, 178, 255], [48, 178, 255], [48, 175, 255], [47, 172, 255], [47, 172, 255], [46, 169, 255], [45, 166, 255], [44, 163, 255], [44, 163, 255], [43, 160, 255], [42, 157, 255], [42, 157, 255], [41, 154, 255], [40, 151, 255], [40, 148, 255], [40, 148, 255], [39, 145, 255], [40, 143, 255], [40, 143, 255], [40, 140, 255], [41, 138, 255], [41, 138, 255], [43, 136, 255], [46, 134, 255], [49, 132, 255], [49, 132, 255], [53, 131, 255], [57, 130, 255], [57, 130, 255], [62, 129, 255], [67, 128, 255], [72, 128, 255], [72, 128, 255], [77, 128, 255], [83, 129, 255], [83, 129, 255], [89, 129, 255], [94, 130, 255], [100, 131, 255], [100, 131, 255], [105, 132, 255], [111, 134, 255], [111, 134, 255], [116, 136, 255], [122, 137, 255], [127, 139, 255], [127, 139, 255], [132, 141, 255], [137, 143, 255], [137, 143, 255], [142, 145, 255], [147, 147, 255], [152, 150, 255], [152, 150, 255], [157, 152, 255], [161, 154, 255], [161, 154, 255], [166, 156, 255], [170, 159, 255], [174, 161, 255], [174, 161, 255], [179, 163, 255], [183, 165, 255], [183, 165, 255], [187, 168, 255], [191, 170, 255], [191, 170, 255], [196, 172, 255], [200, 174, 255], [204, 177, 255], [204, 177, 255], [208, 179, 255], [212, 181, 255], [212, 181, 255], [216, 183, 255], [219, 184, 255], [223, 186, 255], [223, 186, 255], [227, 188, 255], [231, 189, 253], [231, 189, 253], [234, 190, 252], [238, 191, 250], [241, 191, 247], [241, 191, 247], [244, 191, 245], [247, 191, 242], [247, 191, 242], [250, 190, 238], [252, 189, 234], [255, 188, 231], [255, 188, 231], [255, 187, 226], [255, 185, 222], [255, 185, 222], [255, 183, 217], [255, 180, 212], [255, 178, 207], [255, 178, 207], [255, 175, 202], [255, 172, 197], [255, 172, 197], [255, 169, 191], [255, 165, 186], [255, 162, 180], [255, 162, 180], [255, 158, 175], [255, 155, 169], [255, 155, 169], [255, 151, 164], [255, 148, 158], [255, 148, 158], [255, 144, 153], [255, 140, 147], [255, 136, 142], [255, 136, 142], [255, 133, 137], [255, 129, 131], [255, 129, 131], [255, 125, 126], [255, 121, 121], [255, 117, 115], [255, 117, 115], [255, 113, 110], [255, 109, 105], [255, 109, 105], [255, 105, 100], [255, 101, 94], [255, 97, 89], [255, 97, 89], [255, 92, 84], [255, 88, 79], [255, 88, 79], [255, 84, 74], [255, 80, 69], [254, 76, 65], [254, 76, 65], [253, 72, 60], [252, 68, 56], [252, 68, 56], [251, 65, 51], [250, 61, 47], [249, 59, 43], [249, 59, 43], [248, 56, 39], [248, 55, 36], [248, 55, 36], [247, 54, 32], [247, 54, 29]];\n\n// Convert a complex amplitude to an RGB color (from our colormap) based on the phase.\nfunction complex_to_rgb(c, ints = false) {\n  const a = math.re(c);\n  const b = math.im(c);\n  \n  let hue = (Math.atan2(b, a) / Math.PI) * 180;\n  if (hue < 0) hue += 360;\n  \n  // Scale hue (0-360) to an index from 0 to colormap.length-1\n  const index = Math.floor((hue / 360) * (colormap.length - 1));\n  const rgb = colormap[index];\n  \n  return ints ? rgb : rgb.map((c) => c / 255);\n}\n\nclass QuantumGateSimulator extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {\n  static styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)`\n    table {\n      border-collapse: collapse;\n      width: 100%;\n      margin: 20px 0;\n      overflow-x: auto;\n    }\n    th,\n    td {\n      border: 1px solid #ddd;\n      text-align: center;\n      padding: 8px;\n      word-wrap: break-word;\n      height: 2vh;\n    }\n    th {\n      background-color: #f2f2f2;\n    }\n    .amplitude-bar {\n      display: flex;\n      align-items: left;\n      height: 100%;\n    }\n    .bar {\n      height: 100%;\n    }\n    .buttons {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 15px;\n      margin: 15px 0;\n      justify-content: center;\n    }\n    button,\n    select,\n    input {\n      padding: 10px 15px;\n      font-size: 1rem;\n      cursor: pointer;\n    }\n    button:disabled {\n      background-color: #ccc;\n      cursor: not-allowed;\n    }\n    .highlight {\n      background-color: lightyellow;\n    }\n    .theta-container {\n      margin-top: 10px;\n    }\n    .color-wheels {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 50px;\n      margin-top: 0;\n      justify-content: center;\n    }\n    .wheel-container {\n      text-align: center;\n      margin: 0;\n    }\n    .wheel-title {\n      margin: 5px 0;\n      font-weight: bold;\n      margin-bottom: 30px;\n    }\n\n    /* Container to hold the conic gradient and the arrow overlay */\n    .color-wheel-container {\n      position: relative;\n      width: 150px;\n      height: 150px;\n    }\n    /* The conic gradient color wheel */\n.color-wheel {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background: conic-gradient(\n    from -30deg,\n    rgba(0, 255, 0, 0.7),\n    rgba(255, 255, 0, 0.7),\n    rgba(255, 165, 0, 0.7),\n    rgba(255, 0, 0, 0.7),\n    rgba(255, 0, 255, 0.7),\n    rgba(0, 0, 255, 0.7),\n    rgba(0, 255, 255, 0.7),\n    rgba(0, 255, 0, 0.7)\n  );\n}\n    /* SVG overlay for the arrow line */\n    .arrow-overlay {\n      position: absolute;\n      top: 0;\n      left: 0;\n    }\n\n    /* Responsive styles for smaller screens */\n    @media (max-width: 600px) {\n      table {\n        display: block;\n        width: 100%;\n        overflow-x: auto;\n      }\n      th,\n      td {\n        font-size: 0.9rem;\n      }\n      .buttons {\n        flex-direction: column;\n        align-items: center;\n        gap: 10px;\n      }\n      .theta-container {\n        text-align: center;\n      }\n    }\n\n    .legend {\n      display: flex;\n      justify-content: center;\n      gap: 20px;\n      margin-top: 10px;\n      font-size: 1rem;\n    }\n  `;\n\n  static properties = {\n    state: { type: Array },\n    originalState: { type: Array },\n    gate: { type: String },\n    gateApplied: { type: Boolean },\n    // other properties...\n  };\n\n  constructor() {\n    super();\n    this.state = [];\n    this.originalState = [];\n    this.gate = 'X'; // Default gate\n    this.gateApplied = false;\n    this.num_qubits = 1; // example: 3 qubits\n    // Initialize default state\n    this.initializeState();\n  }\n\n  // New initializeState that creates the default state:\n  initializeState() {\n    const n = this.num_qubits;\n    const size = Math.pow(2, n);\n    const defaultState = [];\n    for (let i = 0; i < size; i++) {\n      defaultState.push({ outcome: i, amplitude: math.complex(0, 0) });\n    }\n    // Set |0> state:\n    defaultState[0] = { outcome: 0, amplitude: math.complex(1, 0) };\n\n    this.originalState = defaultState;\n    this.state = [...defaultState];\n    this.gateApplied = false;\n  }\n\n  // Rename the current initializeState to randomizeState:\n  randomizeState() {\n    const size = Math.pow(2, this.num_qubits);\n    const randomState = [];\n    for (let i = 0; i < size; i++) {\n      const amp = math.complex(Math.random() - 0.5, Math.random() - 0.5);\n      randomState.push({ outcome: i, amplitude: amp });\n    }\n    // Normalize: compute norm = sqrt(sum_i |amp|^2)\n    const norm = math.sqrt(\n      randomState.reduce((acc, s) => math.add(acc, math.pow(math.abs(s.amplitude), 2)), 0)\n    );\n    randomState.forEach((s, i) => {\n      randomState[i].amplitude = math.divide(s.amplitude, norm);\n    });\n    this.originalState = randomState;\n    this.state = [...randomState];\n    this.gateApplied = false;\n  }\n\n  applyGate() {\n    if (this.gateApplied) return;\n\n    const [state0, state1] = this.state;\n\n    switch (this.gate) {\n      case 'X': // Pauli-X (NOT gate)\n        this.state = [\n          { ...state0, amplitude: state1.amplitude },\n          { ...state1, amplitude: state0.amplitude },\n        ];\n        break;\n      case 'Y': // Pauli-Y gate\n        this.state = [\n          {\n            ...state0,\n            amplitude: math.multiply(state1.amplitude, math.complex(0, -1)),\n          },\n          {\n            ...state1,\n            amplitude: math.multiply(state0.amplitude, math.complex(0, 1)),\n          },\n        ];\n        break;\n      case 'Z': // Pauli-Z gate\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          {\n            ...state1,\n            amplitude: math.multiply(state1.amplitude, -1),\n          },\n        ];\n        break;\n      case 'H': // Hadamard gate\n        this.state = [\n          {\n            ...state0,\n            amplitude: math.divide(\n              math.add(state0.amplitude, state1.amplitude),\n              math.sqrt(2)\n            ),\n          },\n          {\n            ...state1,\n            amplitude: math.divide(\n              math.subtract(state0.amplitude, state1.amplitude),\n              math.sqrt(2)\n            ),\n          },\n        ];\n        break;\n      case 'Phase': // Phase gate (π/2 phase)\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          {\n            ...state1,\n            amplitude: math.multiply(\n              state1.amplitude,\n              math.exp(math.complex(0, Math.PI / 2))\n            ),\n          },\n        ];\n        break;\n      case 'RZ': // RZ gate (rotation around Z-axis)\n        const theta = Math.PI / 4; // Example rotation angle\n        this.state = [\n          { ...state0, amplitude: state0.amplitude },\n          {\n            ...state1,\n            amplitude: math.multiply(\n              state1.amplitude,\n              math.exp(math.complex(0, theta))\n            ),\n          },\n        ];\n        break;\n    }\n\n    this.gateApplied = true;\n    this.requestUpdate();\n  }\n\n  /**\n   * Render a color wheel for a single amplitude, but using a conic gradient\n   * from red → orange → yellow → lime → cyan → blue → magenta → red.\n   * We draw an arrow from the center to indicate the phase (direction)\n   * and magnitude (length).\n   */\n  renderColorWheel(amplitude0, amplitude1) {\n    const cx = 75, cy = 75, radius = 75; // Center and radius of the circle\n    const labelOffset = 18; // Offset for label from line end\n\n    const getLine = (amplitude) => {\n      const x2 = cx + math.re(amplitude) * radius;\n      const y2 = cy - math.im(amplitude) * radius;\n      // Compute direction vector for offset\n      const dx = x2 - cx;\n      const dy = y2 - cy;\n      const len = Math.sqrt(dx * dx + dy * dy) || 1;\n      // Offset label further out in the same direction\n      const lx = x2 + (dx / len) * labelOffset;\n      const ly = y2 + (dy / len) * labelOffset;\n      return { x2, y2, lx, ly };\n    };\n\n    const line0 = getLine(amplitude0);\n    const line1 = getLine(amplitude1);\n\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <div class=\"color-wheel-container\">\n        <div class=\"color-wheel\"></div>\n        <svg class=\"arrow-overlay\" width=\"150\" height=\"150\" viewBox=\"0 0 150 150\" style=\"overflow: visible;\">\n          <!-- Line for Outcome 0 -->\n          <line\n            x1=\"${cx}\" y1=\"${cy}\" x2=\"${line0.x2}\" y2=\"${line0.y2}\"\n            stroke=\"black\" stroke-width=\"2.5\"\n          />\n          <!-- Line for Outcome 1 -->\n          <line\n            x1=\"${cx}\" y1=\"${cy}\" x2=\"${line1.x2}\" y2=\"${line1.y2}\"\n            stroke=\"black\" stroke-width=\"2.5\"\n          />\n          <!-- Labels for the lines, offset from the line ends -->\n          <text x=\"${line0.lx}\" y=\"${line0.ly}\" fill=\"black\" font-size=\"15\" alignment-baseline=\"middle\" text-anchor=\"middle\">0</text>\n          <text x=\"${line1.lx}\" y=\"${line1.ly}\" fill=\"black\" font-size=\"15\" alignment-baseline=\"middle\" text-anchor=\"middle\">1</text>\n        </svg>\n      </div>\n    `;\n  }\n\n  renderTable(state, title) {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <h4>${title}</h4>\n      <table>\n        <thead>\n          <tr>\n            <th>Outcome</th>\n            <th>Binary</th>\n            <th>Amplitude</th>\n            <th>Direction</th>\n            <th>Magnitude</th>\n            <th>Amplitude Bar</th>\n          </tr>\n        </thead>\n        <tbody>\n          ${state.map(({ outcome, amplitude }) => {\n            const magnitude = math.abs(amplitude).toFixed(3);\n            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);\n            const rgb = complex_to_rgb(amplitude, true);\n\n            return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <tr>\n                <td>${outcome}</td>\n                <td>${outcome.toString(2)}</td>\n                <td>\n                  ${math.format(amplitude, {\n                    notation: 'fixed',\n                    precision: 3,\n                  })}\n                </td>\n                <td>${direction}°</td>\n                <td>${magnitude}</td>\n                <td>\n                  <div class=\"amplitude-bar\">\n                    <div\n                      class=\"bar\"\n                      style=\"width: ${magnitude * 100}%;\n                             background-color: rgb(${rgb.join(',')});\"\n                    ></div>\n                  </div>\n                </td>\n              </tr>\n            `;\n          })}\n        </tbody>\n      </table>\n    `;\n  }\n\n  render() {\n    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <div>\n        <h3>${this.gate} Gate Simulator</h3>\n        <!-- Buttons to apply gate, randomize state and reset state -->\n        <div class=\"buttons\">\n          <button @click=\"${this.applyGate}\" ?disabled=\"${this.gateApplied}\">\n            Apply ${this.gate} Gate\n          </button>\n          <button @click=\"${this.initializeState}\">\n            Reset\n          </button>\n          <button @click=\"${this.randomizeState}\">\n            Randomize\n          </button>\n        </div>\n\n        <!-- Theta input for Phase and RZ gates with placeholder \"pi radians\" -->\n        ${['Phase', 'RZ'].includes(this.gate)\n          ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n              <div class=\"theta-container\">\n                <input\n                  type=\"number\"\n                  placeholder=\"Angle (radians)\"\n                  step=\"0.1\"\n                  .value=\"${this.theta}\"\n                  @input=\"${(e) => (this.theta = Number(e.target.value))}\"\n                />\n              </div>\n            `\n          : ''}\n\n        <!-- State tables for Before / After -->\n        <div>\n          ${this.renderTable(this.originalState, 'Initial State Table')}\n          ${this.gateApplied ? this.renderTable(this.state, 'Final State Table') : ''}\n        </div>\n\n        <h4>Clock Representation</h4>\n        <!-- Color Wheels for Before / After -->\n        <div class=\"color-wheels\">\n          <!-- Original State Wheels -->\n          <div class=\"wheel-container\">\n            <div class=\"wheel-title\">Initial State</div>\n            ${this.renderColorWheel(this.originalState[0].amplitude, this.originalState[1].amplitude)}\n          </div>\n\n          <!-- Arrow and label between wheels, only if gate applied -->\n          ${this.gateApplied ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n            <div style=\"display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 80px;\">\n              <svg width=\"60\" height=\"40\" style=\"margin-bottom: 0; margin-top: 20px;\">\n                <!-- Draw the line up to the base of the arrowhead -->\n                <line x1=\"8\" y1=\"20\" x2=\"42\" y2=\"20\" stroke=\"black\" stroke-width=\"2.5\" />\n                <!-- Draw the arrowhead as a polygon at the end of the line -->\n                <polygon points=\"48,20 42,16 42,24\" fill=\"black\" />\n              </svg>\n              <div style=\"font-size: 1.3em; font-weight: bold; margin-top: 0;\">${this.gate}</div>\n            </div>\n          ` : ''}\n\n          <!-- (Conditional) After State Wheels -->\n          ${this.gateApplied\n            ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n                <div class=\"wheel-container\">\n                  <div class=\"wheel-title\">Final State</div>\n                  ${this.renderColorWheel(this.state[0].amplitude, this.state[1].amplitude)}\n                </div>\n              `\n            : ''}\n        </div>\n      </div>\n    `;\n  }\n}\n\ncustomElements.define('quantum-gate-simulator', QuantumGateSimulator);\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/component.js?");

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
/******/ 			"primer": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_mathjs_lib_esm_entry_pureFunctionsAny_generated_js","vendors-node_modules_microsoft_quantum-viz_js_dist_qviz_min_js-node_modules_d3_src_index_js","vendors-node_modules_lit_index_js","src_lib_simulator_core_js","src_lib_algos_component2_js"], () => (__webpack_require__("./src/js/primer.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;