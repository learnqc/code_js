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

/***/ "./src/js/chapter03.js":
/*!*****************************!*\
  !*** ./src/js/chapter03.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils/common.js */ \"./src/lib/utils/common.js\");\n/* harmony import */ var _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/simulator/core.js */ \"./src/lib/simulator/core.js\");\n/* harmony import */ var _lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/simulator/gates.js */ \"./src/lib/simulator/gates.js\");\n\n\n\n\nlet sharedContext = {\n    math: math,  \n    state: [],  \n    state_table_to_html: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.state_table_to_html,\n    init_state: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_1__.init_state,\n    is_close: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.is_close,\n    prepare_state: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_1__.prepare_state,\n    is_power_of_two: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_1__.is_power_of_two,\n    cis: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.cis,\n    print_state: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.print_state,\n    x:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.x,z:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.z,phase:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.phase,h:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.h,rz:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.rz,y:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.y,rx:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.rx,ry:_lib_simulator_gates_js__WEBPACK_IMPORTED_MODULE_2__.ry,\n    process_pair: _lib_simulator_core_js__WEBPACK_IMPORTED_MODULE_1__.process_pair,\n    choices: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.choices,\n    squaredMagnitude: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.squaredMagnitude\n  };\n  \n  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.37.0/min/vs' }});\n  \n  require(['vs/editor/editor.main'], function() {\n  \n    let codeHistory = [];  \n  \n    function displayStepAndEditor(title, code) {\n      const tutorialDiv = document.getElementById(\"tutorial\");\n  \n      const stepDiv = document.createElement(\"div\");\n      stepDiv.className = \"step-container\";\n  \n      const titleEl = document.createElement(\"p\");\n      titleEl.className = \"step-title\";\n      titleEl.textContent = title;\n  \n      const editorContainer = document.createElement('div');\n      editorContainer.className = 'editor-container';\n      const outputContainer = document.createElement('div');\n      outputContainer.className = 'output';\n  \n      const runButton = document.createElement('button');\n      runButton.className = 'run-button';\n      runButton.innerText = 'Run Code';\n  \n      stepDiv.appendChild(titleEl);\n      stepDiv.appendChild(editorContainer);\n      stepDiv.appendChild(outputContainer);\n      stepDiv.appendChild(runButton);\n  \n      tutorialDiv.appendChild(stepDiv);\n  \n      const editor = monaco.editor.create(editorContainer, {\n        value: code,\n        language: 'javascript',\n        theme: \"vs-light\"\n      });\n  \n      // Run the code when the button is clicked\n      runButton.onclick = function() {\n        runCode(editor, outputContainer);\n      };\n    }\n  \n    function runCode(editor, outputContainer) {\n        const code = editor.getValue();\n        outputContainer.innerText = ''; // Clear previous output\n      \n        // Combine previous code with the current editor's code\n        const fullCode = codeHistory.join('\\n') + '\\n' + code;\n      \n        try {\n          let result = (function() {\n            // Pass the context (math, state) into the function, but avoid reassigning 'state'\n            let { math, state, state_table_to_html, init_state, is_close, prepare_state, is_power_of_two, cis, print_state, x, z, phase, h, rz, y, rx, ry, process_pair, choices, squaredMagnitude } = sharedContext;\n            return eval(fullCode);  // Execute the accumulated code with the shared context\n          })();\n      \n          // If result is undefined, return a default message\n          if (result === undefined) {\n            result = \"No return value from the code.\";\n          }\n      \n          // Update the shared output and display it\n          sharedContext.output = result;\n          outputContainer.innerText = result;\n      \n          // Save the current code for the next step\n          codeHistory.push(code);\n      \n        } catch (error) {\n          outputContainer.innerText = error.message;\n        }\n      }\n      \n      \n    \n    let tutorialDiv = document.getElementById(\"tutorial\");\n    let titleEl = document.createElement(\"h1\");\n    titleEl.textContent = \"Building Quantum Software: Chapter 3\";\n    tutorialDiv.appendChild(titleEl);\n\n    tutorialDiv = document.getElementById(\"tutorial\");\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Encoding single-qubit states with lists (section 3.1.3)\";\n    tutorialDiv.appendChild(titleEl);\n    // Step 1: Define a quantum state using complex numbers\n    displayStepAndEditor(\n      `In JavaScript, we use the mathjs library to work with complex numbers. \n       We can represent single-qubit quantum states using a list of complex numbers.`,\n      \"let state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\\n\" +\n      \"let output = state[0].toString();\\noutput;\"\n    );\n  \n    // Step 2: Modify the state in the context\n    displayStepAndEditor(\n      \"We can update the quantum state. Let's redefine it.\",\n      \"state = [math.complex(1, 0), math.complex(0, 0)];\\n\" +\n      \"output = state[0].toString();\\noutput;\"\n    );\n  \n    // Step 3: Get the real and imaginary parts of the state\n    displayStepAndEditor(\n      \"We can get the real and imaginary parts of the state in the context.\",\n      \"let realPart = math.re(state[0]);\\nlet imaginaryPart = math.im(state[0]);\\n\" +\n      \"`${realPart}, ${imaginaryPart}`;\"\n    );\n  \n    // Step 4: Verify the sum of squared magnitudes of the quantum state\n    displayStepAndEditor(\n      \"The sum of the squared magnitudes must be 1 for a valid quantum state.\",\n      \"let magnitude = math.abs(state[0]) ** 2 + math.abs(state[1]) ** 2;\\nmagnitude;\"\n    );\n  \n    // Step 5: Show an example of a quantum state with a negative real number amplitude\n    displayStepAndEditor(\n      \"Example of a negative real number amplitude, whose angle is 180 degrees, or pi radians.\",\n      \"state = [math.complex(math.sqrt(0.3)), math.complex(-math.sqrt(0.7))];\\n\" +\n      \"state[0].toString();\"\n    );\n  \n    // Step 6: Get the direction (angle) of an amplitude in radians\n    displayStepAndEditor(\n      \"Get the direction of an amplitude in radians using math.atan2()\",\n      \"let direction = math.atan2(math.im(state[1]), math.re(state[1]));\\ndirection;\"\n    );\n  \n    // Step 7: Convert the direction from radians to degrees\n    displayStepAndEditor(\n      \"Convert from radians to degrees\",\n      \"let directionInDegrees = direction * (180 / Math.PI);\\ndirectionInDegrees;\"\n    );\n  \n    // Step 8: Example quantum state with amplitude directions 5pi/7 and pi/5 radians\n    displayStepAndEditor(\n      \"Example state with amplitude directions 5pi/7 and pi/5 radians\",\n      \"state = [\\n\" +\n      \"    math.complex(math.sqrt(0.3) * math.cos(5*Math.PI/7), math.sqrt(0.3) * math.sin(5*Math.PI/7)),\\n\" +\n      \"    math.complex(math.sqrt(0.7) * math.cos(Math.PI/5), math.sqrt(0.7) * math.sin(Math.PI/5))\\n\" +\n      \"];\"\n    );\n  \n    // Step 9: Get the magnitude of an amplitude\n    displayStepAndEditor(\n      \"Get the magnitude of an amplitude\",\n      \"magnitude = math.abs(state[0]);\\nmagnitude;\"\n    );\n  \n    // Step 10: Get the probability of an outcome by squaring the magnitude\n    displayStepAndEditor(\n      \"Get the probability of an outcome by squaring the magnitude\",\n      \"let probability = math.abs(state[0]) ** 2;\\nprobability;\"\n    );\n    \n\n    displayStepAndEditor(\n        \"In this tutorial, we will use the state_table_to_html(state, div_id) from common.js\",\n        `(async () => {\n    await state_table_to_html(state, \"state_table\");\n})();`\n    )\n\n    let table = document.createElement(\"div\");\n    table.id = \"state_table\";\n    document.getElementById(\"tutorial\").appendChild(table);\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Writing a single-qubit quantum computing simulator in Python (section 3.1.4)\";\n    tutorialDiv.appendChild(titleEl);\n    displayStepAndEditor(\n        \"Function to create a default single-qubit state\",\n        `function init_state(n) {\n    const state = Array(Math.pow(2, n)).fill(null).map(() => math.complex(0, 0));\n\n    state[0] = math.complex(1, 0);\n\n    return state;\n}\n        `\n    )\n\n    displayStepAndEditor(\n        \"\",\n        `state = init_state(1);\\nstate;`\n    )\n\n    displayStepAndEditor(\n        \"Function for validating a list of complex numbers is a valid single-qubit state\",\n        `function prepare_state(...a) {\n    const state = [...a];\n    if (!is_power_of_two(state.length)) {\n        throw new Error(\"Length of state must be a power of two\");\n    }\n    const norm = state.reduce((acc, val) => acc + math.pow(math.abs(val), 2), 0);\n    if (!is_close(norm, 1.0)) {\n        throw new Error(\"State is not normalized\");\n    }\n    return state;\n}`\n    )\n\n    displayStepAndEditor(\n        \"\",\n        `let list = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\nstate = prepare_state(...list);\\nstate;`\n    )\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Rotation shortcut (section 3.2.1)\";\n    tutorialDiv.appendChild(titleEl);\n    displayStepAndEditor(\n        \"Shortcut function for rotations\",\n        `function cis(theta) {\n    return math.complex(math.cos(theta), math.sin(theta));\n}`\n    )\n    \n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Basic single-qubit gates (section 3.2.2)\";\n    tutorialDiv.appendChild(titleEl);\n    displayStepAndEditor(\n        \"X-gate\",\n        `state = [state[1], state[0]];`\n    )\n\n\n    displayStepAndEditor(\n        \"Example:\",\n        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n(async () => {\n    await state_table_to_html(state, \"state_table_2\");\n})();\n\nstate = [state[1], state[0]];\n(async () => {\n    await state_table_to_html(state, \"state_table_3\");\n})();\n        `\n    )\n\n    let table2 = document.createElement(\"div\");\n    table2.id = \"state_table_2\";\n    document.getElementById(\"tutorial\").appendChild(table2);\n\n    let table3 = document.createElement(\"div\");\n    table3.id = \"state_table_3\";\n    document.getElementById(\"tutorial\").appendChild(table3);\n\n    // Z-gate\n    displayStepAndEditor(\n        \"Z-gate\",\n        `state = [state[0], math.complex(-state[1].re, -state[1].im)];`\n    )\n\n\n    displayStepAndEditor(\n        \"Example:\",\n        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n(async () => {\n    await state_table_to_html(state, \"state_table_4\");\n})();\n\nstate = [state[0], math.complex(-state[1].re, -state[1].im)];\n(async () => {\n    await state_table_to_html(state, \"state_table_5\");\n})();\n        `\n    )\n\n    let table4 = document.createElement(\"div\");\n    table4.id = \"state_table_4\";\n    document.getElementById(\"tutorial\").appendChild(table4);\n\n    let table5 = document.createElement(\"div\");\n    table5.id = \"state_table_5\";\n    document.getElementById(\"tutorial\").appendChild(table5);\n\n\n    // phase gate\n    displayStepAndEditor(\n        \"Phase gate\",\n        `let phi = Math.PI / 3;\nstate = [state[0], math.multiply(cis(phi), state[1])];`\n    )\n\n\n    displayStepAndEditor(\n        \"Example:\",\n        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n(async () => {\n    await state_table_to_html(state, \"state_table_6\");\n})();\n\nphi = Math.PI / 3;\nstate = [state[0], math.multiply(cis(phi), state[1])];\n\n(async () => {\n    await state_table_to_html(state, \"state_table_7\");\n})();\n        `\n    )\n    let table6 = document.createElement(\"div\");\n    table6.id = \"state_table_6\";\n    document.getElementById(\"tutorial\").appendChild(table6);\n\n    let table7 = document.createElement(\"div\");\n    table7.id = \"state_table_7\";\n    document.getElementById(\"tutorial\").appendChild(table7);\n\n    // hadamard gate\n    displayStepAndEditor(\n        \"Hadamard gate\",\n        `state = [\n    math.multiply(math.sqrt(0.5), math.add(state[0], state[1])),\n    math.multiply(math.sqrt(0.5), math.subtract(state[0], state[1]))\n];\n        `\n    )\n\n\n    displayStepAndEditor(\n        \"Example:\",\n        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n(async () => {\n    await state_table_to_html(state, \"state_table_8\");\n})();\n\nstate = [\n    math.multiply(math.sqrt(0.5), math.add(state[0], state[1])),\n    math.multiply(math.sqrt(0.5), math.subtract(state[0], state[1]))\n];\n\n(async () => {\n    await state_table_to_html(state, \"state_table_9\");\n})();\n        `\n    )\n    let table8 = document.createElement(\"div\");\n    table8.id = \"state_table_8\";\n    document.getElementById(\"tutorial\").appendChild(table8);\n\n    let table9 = document.createElement(\"div\");\n    table9.id = \"state_table_9\";\n    document.getElementById(\"tutorial\").appendChild(table9);\n\n    // Rz gate\n    displayStepAndEditor(\n        \"Rz gate\",\n        `let theta = math.PI / 3;\nstate = [\n    math.multiply(cis(-theta / 2), state[0]),\n    math.multiply(cis(theta / 2), state[1])\n];\n        `\n    )\n\n    displayStepAndEditor(\n        \"Example:\",\n        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n(async () => {\n    await state_table_to_html(state, \"state_table_10\");\n})();\n\ntheta = math.PI / 3;\nstate = [\n    math.multiply(cis(-theta / 2), state[0]),\n    math.multiply(cis(theta / 2), state[1])\n];\n\n(async () => {\n    await state_table_to_html(state, \"state_table_11\");\n})();\n        `\n    )\n    let table10 = document.createElement(\"div\");\n    table10.id = \"state_table_10\";\n    document.getElementById(\"tutorial\").appendChild(table10);\n\n    let table11 = document.createElement(\"div\");\n    table11.id = \"state_table_11\";\n    document.getElementById(\"tutorial\").appendChild(table11);\n\n\n    // Y gate\n    displayStepAndEditor(\n        \"Y gate\",\n        `state = [\n    math.multiply(math.complex(0, -1), state[1]),\n    math.multiply(math.complex(0, 1), state[0])\n];`\n    )\n\n    displayStepAndEditor(\n        \"Example:\",\n        `state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n(async () => {\n    await state_table_to_html(state, \"state_table_12\");\n})();\n\nstate = [\n    math.multiply(math.complex(0, -1), state[1]),\n    math.multiply(math.complex(0, 1), state[0])\n];\n\n(async () => {\n    await state_table_to_html(state, \"state_table_13\");\n})();\n        `\n    )\n    let table12 = document.createElement(\"div\");\n    table12.id = \"state_table_12\";\n    document.getElementById(\"tutorial\").appendChild(table12);\n\n    let table13 = document.createElement(\"div\");\n    table13.id = \"state_table_13\";\n    document.getElementById(\"tutorial\").appendChild(table13);\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"The general form of a single-qubit gate (section 3.2.3)\";\n    tutorialDiv.appendChild(titleEl);\n    displayStepAndEditor(\n        \"Applying a Hadamard gate to a single qubit state using the general form of single-qubit gates:\",\n`let [a, b, c, d] = [1/math.sqrt(2), 1/math.sqrt(2), 1/math.sqrt(2), -1/math.sqrt(2)];\nstate = [\n    math.add(math.multiply(a, state[0]), math.multiply(b, state[1])),\n    math.add(math.multiply(c, state[0]), math.multiply(d, state[1]))\n];`\n    );\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"More basic single-qubit gates (section 3.2.4)\";\n    tutorialDiv.appendChild(titleEl);\n\n    displayStepAndEditor(\n        \"Try changing theta to see how the Rx gate works: (recommended values: 0, Math.PI, Math.PI/2, 2*Math.PI, 3*Math.PI/2)\",\n        `state = init_state(1);\n(async () => {\n    await state_table_to_html(state, \"state_table_14\");\n})();\n\ntheta = 0;\n\n[a, b, c, d] = [math.cos(theta/2), math.complex(0, -math.sin(theta/2)), math.complex(0, -math.sin(theta/2)), math.cos(theta/2)];\nstate = [\n    math.add(math.multiply(a, state[0]), math.multiply(b, state[1])),\n    math.add(math.multiply(c, state[0]), math.multiply(d, state[1]))\n];\n\n(async () => {\n    await state_table_to_html(state, \"state_table_15\");\n})();\n        `\n    )\n\n    let table14 = document.createElement(\"div\");\n    table14.id = \"state_table_14\";\n    document.getElementById(\"tutorial\").appendChild(table14);\n\n    let table15 = document.createElement(\"div\");\n    table15.id = \"state_table_15\";\n    document.getElementById(\"tutorial\").appendChild(table15);\n\n    displayStepAndEditor(\n        \"Try changing theta to see how the Ry gate works: (recommended values: 0, Math.PI, Math.PI/2, 2*Math.PI, 3*Math.PI/2)\",\n        `state = init_state(1);\n(async () => {\n    await state_table_to_html(state, \"state_table_16\");\n})();\n\ntheta = 0;\n\n[a, b, c, d] = [math.cos(theta/2), -math.sin(theta/2), math.sin(theta/2), math.cos(theta/2)];\nstate = [\n    math.add(math.multiply(a, state[0]), math.multiply(b, state[1])),\n    math.add(math.multiply(c, state[0]), math.multiply(d, state[1]))\n];\n\n(async () => {\n    await state_table_to_html(state, \"state_table_17\");\n})();\n        `\n    )\n\n    let table16 = document.createElement(\"div\");\n    table16.id = \"state_table_16\";\n    document.getElementById(\"tutorial\").appendChild(table16);\n\n    let table17 = document.createElement(\"div\");\n    table17.id = \"state_table_17\";\n    document.getElementById(\"tutorial\").appendChild(table17);\n\n\n\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Single-qubit gate inverses (section 3.2.5)\";\n    tutorialDiv.appendChild(titleEl);\n    displayStepAndEditor(\n        \"\",\n        `init_state(1);\n\nstate = [state[1], state[0]];\nstate;\n        `\n    )\n\n    displayStepAndEditor(\n        \"\",\n        `init_state(1);\n\nstate = [state[1], state[0]];\nstate;\n        `\n    )\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Printing and visualizing the state (section 3.3.1)\";\n    tutorialDiv.appendChild(titleEl);\n    displayStepAndEditor(\n        \"\",\n        \"function format_value(value, decimals) {\\n\" +\n        \"    const valueString = value.toString();\\n\" +\n        \"    const currentDecimals = valueString.includes('.') ? valueString.split('.')[1].length : 0;\\n\" +\n        \"\\n\" +\n        \"    const roundedDecimals = Math.min(currentDecimals, decimals);\\n\" +\n        \"    return value.toFixed(roundedDecimals);\\n\" +\n        \"}\\n\" +\n        \"\\n\" +\n        \"function to_table(state, decimals = 5) {\\n\" +\n        \"    const table = [];\\n\" +\n        \"    for (let k = 0; k < state.length; k++) {\\n\" +\n        \"        const row = [];\\n\" +\n        \"        const value = state[k];\\n\" +\n        \"        row.push(k);\\n\" +\n        \"        row.push(value.toString());\\n\" +\n        \"        const direction = Math.atan2(value.im, value.re) / (2 * Math.PI) * 360;\\n\" +\n        \"        row.push(format_value(direction, decimals));\\n\" +\n        \"        const magnitude = Math.sqrt(value.re ** 2 + value.im ** 2);\\n\" +\n        \"        row.push(format_value(magnitude, decimals));\\n\" +\n        \"        const probability = magnitude ** 2;\\n\" +\n        \"        row.push(format_value(probability, decimals));\\n\" +\n        \"        table.push(row);\\n\" +\n        \"    }\\n\" +\n        \"    return table;\\n\" +\n        \"}\\n\" +\n        \"\\n\" +\n        \"function print_state(state, decimals = 5) {\\n\" +\n        \"    const table = to_table(state, decimals);\\n\" +\n        \"    let out = \\\"\\\\n\\\";\\n\" +\n        \"    table.forEach(row => {\\n\" +\n        \"        out += (`[${row.join(', ')}]\\n`);\\n\" +\n        \"    });\\n\" +\n        \"    return out;\\n\" +\n        \"}\"\n    \n    );\n\n    displayStepAndEditor(\n        \"\",\n        `state = init_state(1);\nlet out = print_state(state);\nout;\n        `\n    );\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Transforming a single-qubit state (section 3.3.2)\";\n    tutorialDiv.appendChild(titleEl);\n\n    displayStepAndEditor(\n        \"We can use nested lists to encode the four values of a gate:\",\n        `let gate = [[a, b], [c, d]];`\n    );\n\n    displayStepAndEditor(\n        \"Code implementations of basic single-qubit gates\",\n        `const x = [\n    [0, 1],\n    [1, 0]\n];\n\nconst z = [\n    [1, 0],\n    [0, -1]\n];\n\nfunction phase(theta) {\n    return [\n        [1, 0],\n        [0, math.complex(Math.cos(theta), Math.sin(theta))]\n    ];\n}\n\nconst h = [\n    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],\n    [1 / Math.sqrt(2), -1 / Math.sqrt(2)]\n];\n\nfunction rz(theta) {\n    return [\n        [math.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],\n        [0, math.complex(Math.cos(theta / 2), Math.sin(theta / 2))]\n    ];\n}\n\nconst y = [\n    [0, math.complex(0, -1)],\n    [math.complex(0, 1), 0]\n];\n\nfunction rx(theta) {\n    return [\n        [Math.cos(theta / 2), math.complex(0, -Math.sin(theta / 2))],\n        [math.complex(0, -Math.sin(theta / 2)), Math.cos(theta / 2)]\n    ];\n}\n\nfunction ry(theta) {\n    return [\n        [Math.cos(theta / 2), -Math.sin(theta / 2)],\n        [Math.sin(theta / 2), Math.cos(theta / 2)]\n    ];\n};\n        `\n    );\n\n    displayStepAndEditor(\n        \"We can compute the new amplitude for outcome 0 with:\",\n        `state = init_state(1);\ntheta = 3*Math.PI/2\n[a, b, c, d] = [math.cos(theta/2), -math.sin(theta/2), math.sin(theta/2), math.cos(theta/2)];\ngate = [[a, b], [c, d]];\n\nmath.multiply(gate[0][0], state[0]) + math.multiply(gate[0][1], state[1]);`\n    );\n\n    displayStepAndEditor(\n        \"We can compute the new amplitude for outcome 1 with:\",\n        `math.multiply(gate[1][0], state[0]) + math.multiply(gate[0][1], state[1]);`\n    );\n\n    displayStepAndEditor(\n        \"Function for simulating applying gate transformations to a single-qubit gate\",\n        `function process_pair(state, gate, k0=0, k1=1) {\n    const x = state[k0];\n    const y = state[k1];\n    state[k0] = math.add(math.multiply(x, gate[0][0]), math.multiply(y, gate[0][1]));\n    state[k1] = math.add(math.multiply(x, gate[1][0]), math.multiply(y, gate[1][1]));\n}`\n    );\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Single-qubit circuits (section 3.3.3)\";\n    tutorialDiv.appendChild(titleEl);\n\n    displayStepAndEditor(\n        \"Example single-qubit circuit\",\n        `let s = init_state(1);\nprocess_pair(s, ry(2*Math.PI/3));\nprocess_pair(s, x);\nprocess_pair(s, phase(Math.PI/3));\nprocess_pair(s, h);\nout = print_state(s);\n\n(async () => {\n    await state_table_to_html(s, \"state_table_18\");\n})();\n\nout;\n`\n    );\n\n    let table18 = document.createElement(\"div\");\n    table18.id = \"state_table_18\";\n    document.getElementById(\"tutorial\").appendChild(table18);\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Simulating measurement of single-qubit states (section 3.4)\";\n    tutorialDiv.appendChild(titleEl);\n\n    displayStepAndEditor(\n        \"Simulate 10 runs of the circuit above: \",\n        `let prob = [s[0].re ** 2 + s[0].im ** 2, s[1].re ** 2 + s[1].im ** 2];\n\nlet samples = [];\nfor (let i = 0; i < 10; i++) {\n        let randomValue = Math.random();\n        if(randomValue < prob[0]) {\n            samples.push(0);\n        } else {\n            samples.push(1);\n        }\n}\n\nsamples;\n        `\n    )\n\n    displayStepAndEditor(\n        \"\",\n        `let count0 = 0;\nlet count1 = 0;\nfor(let i of samples) {\n        if (i == 0) {\n            count0++;\n        }\n        else {\n            count1++\n        }\n}\n\noutput = '0 -> ' + count0 + '\\\\n' + '1 -> ' + count1;\noutput;\n\n        `\n    )\n\n    displayStepAndEditor(\n        \"Simulate 1000 runs: \",\n        `prob = [s[0].re ** 2 + s[0].im ** 2, s[1].re ** 2 + s[1].im ** 2];\n\nsamples = [];\nfor (let i = 0; i < 1000; i++) {\n        let randomValue = Math.random();\n        if(randomValue < prob[0]) {\n            samples.push(0);\n        } else {\n            samples.push(1);\n        }\n}\n\nsamples;\n\ncount0 = 0;\ncount1 = 0;\nfor(let i of samples) {\n        if (i == 0) {\n            count0++;\n        }\n        else {\n            count1++\n        }\n}\n\noutput = '0 -> ' + count0 + '\\\\n' + '1 -> ' + count1;\noutput;`\n    )\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Encoding the uniform distribution in a single-qubit quantum state (section 3.4.1)\";\n    tutorialDiv.appendChild(titleEl);\n\n    displayStepAndEditor(\n        \"Encoding the uniform distribution in a single-qubit quantum state\",\n        `state = init_state(1);\nprocess_pair(state, h);\nout = print_state(state);\nout;\n        `\n    )\n\n    displayStepAndEditor(\n        \"\",\n        `prob = [state[0].re ** 2 + state[0].im ** 2, state[1].re ** 2 + state[1].im ** 2];\n\nsamples = [];\nfor (let i = 0; i < 10; i++) {\n        let randomValue = Math.random();\n        if(randomValue < prob[0]) {\n            samples.push(0);\n        } else {\n            samples.push(1);\n        }\n}\n\nsamples;\n\ncount0 = 0;\ncount1 = 0;\nfor(let i of samples) {\n        if (i == 0) {\n            count0++;\n        }\n        else {\n            count1++\n        }\n}\n\noutput = '0 -> ' + count0 + '\\\\n' + '1 -> ' + count1;\noutput;`\n    )\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Encoding a Bernoulli distribution in a single-qubit quantum state (section 3.5.1)\";\n    tutorialDiv.appendChild(titleEl);\n\n    displayStepAndEditor(\n        \"\",\n        `let p = 0.7;\ntheta = 2 * math.acos(math.sqrt(p));\ns = init_state(1);\nprocess_pair(s, ry(theta));\n\noutput = print_state(s);\n\n(async () => {\n    await state_table_to_html(s, \"state_table_19\");\n})();\n\noutput;\n        `\n    )\n\n    let table19 = document.createElement(\"div\");\n    table19.id = \"state_table_19\";\n    document.getElementById(\"tutorial\").appendChild(table19);\n\n    titleEl = document.createElement(\"h1\");\n    titleEl.className = \"subheading\";\n    titleEl.textContent = \"Encoding a number with a single-qubit (section 3.5.2)\";\n    tutorialDiv.appendChild(titleEl);\n\n    displayStepAndEditor(\n        \"Encoding the value x = 273.5 in the magnitude of an amplitude:\",\n        `let x = 273.5;\ntheta = 2 * math.acos(x/1000);\ns = init_state(1);\nprocess_pair(s, ry(theta));\n\noutput = print_state(s);\n\n(async () => {\n    await state_table_to_html(s, \"state_table_20\");\n})();\n\noutput;\n        `\n    )\n\n    let table20 = document.createElement(\"div\");\n    table20.id = \"state_table_20\";\n    document.getElementById(\"tutorial\").appendChild(table20);\n\n\n    displayStepAndEditor(\n        \"Encoding the value x = 273.5 in the phase of an amplitude:\",\n        `x = 273.5;\ntheta = Math.PI*x/1000;\ns = init_state(1);\nprocess_pair(s, h)\nprocess_pair(s, phase(theta));\n\noutput = print_state(s);\n\n(async () => {\n    await state_table_to_html(s, \"state_table_21\");\n})();\n\noutput;\n        `\n    )\n\n    let table21 = document.createElement(\"div\");\n    table21.id = \"state_table_21\";\n    document.getElementById(\"tutorial\").appendChild(table21);\n    \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    \n\n\n\n\n\n  \n  });\n  \n\n//# sourceURL=webpack://humejs/./src/js/chapter03.js?");

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
/******/ 			"chapter03": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_microsoft_quantum-viz_js_dist_qviz_min_js-node_modules_d3_src_index_js-n-46cfdf","src_lib_simulator_core_js-src_lib_simulator_gates_js"], () => (__webpack_require__("./src/js/chapter03.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;