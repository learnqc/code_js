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

/***/ "./src/js/chapter03.js":
/*!*****************************!*\
  !*** ./src/js/chapter03.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils/common.js */ \"./src/lib/utils/common.js\");\n\n\nlet sharedContext = {\n    math: math,  \n    state: [],  \n    state_table_to_html: _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.state_table_to_html \n  };\n  \n  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.37.0/min/vs' }});\n  \n  require(['vs/editor/editor.main'], function() {\n  \n    let codeHistory = [];  \n  \n    function displayStepAndEditor(title, code) {\n      const tutorialDiv = document.getElementById(\"tutorial\");\n  \n      const stepDiv = document.createElement(\"div\");\n      stepDiv.className = \"step-container\";\n  \n      const titleEl = document.createElement(\"p\");\n      titleEl.className = \"step-title\";\n      titleEl.textContent = title;\n  \n      const editorContainer = document.createElement('div');\n      editorContainer.className = 'editor-container';\n      const outputContainer = document.createElement('div');\n      outputContainer.className = 'output';\n  \n      const runButton = document.createElement('button');\n      runButton.className = 'run-button';\n      runButton.innerText = 'Run Code';\n  \n      stepDiv.appendChild(titleEl);\n      stepDiv.appendChild(editorContainer);\n      stepDiv.appendChild(outputContainer);\n      stepDiv.appendChild(runButton);\n  \n      tutorialDiv.appendChild(stepDiv);\n  \n      const editor = monaco.editor.create(editorContainer, {\n        value: code,\n        language: 'javascript'\n      });\n  \n      // Run the code when the button is clicked\n      runButton.onclick = function() {\n        runCode(editor, outputContainer);\n      };\n    }\n  \n    function runCode(editor, outputContainer) {\n        const code = editor.getValue();\n        outputContainer.innerText = ''; // Clear previous output\n      \n        // Combine previous code with the current editor's code\n        const fullCode = codeHistory.join('\\n') + '\\n' + code;\n      \n        try {\n          let result = (function() {\n            // Pass the context (math, state) into the function, but avoid reassigning 'state'\n            let { math, state, state_table_to_html } = sharedContext;\n            return eval(fullCode);  // Execute the accumulated code with the shared context\n          })();\n      \n          // If result is undefined, return a default message\n          if (result === undefined) {\n            result = \"No return value from the code.\";\n          }\n      \n          // Update the shared output and display it\n          sharedContext.output = result;\n          outputContainer.innerText = 'Output: ' + result;\n      \n          // Save the current code for the next step\n          codeHistory.push(code);\n      \n        } catch (error) {\n          outputContainer.innerText = 'Error: ' + error.message;\n        }\n      }\n      \n  \n    // Step 1: Define a quantum state using complex numbers\n    displayStepAndEditor(\n      `In JavaScript, we use the mathjs library to work with complex numbers. \n       We can represent single-qubit quantum states using a list of complex numbers.`,\n      \"let state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\\n\" +\n      \"let output = state[0].toString();\\noutput;\"\n    );\n  \n    // Step 2: Modify the state in the context\n    displayStepAndEditor(\n      \"We can update the quantum state. Let's redefine it.\",\n      \"state = [math.complex(1, 0), math.complex(0, 0)];\\n\" +\n      \"output = state[0].toString();\\noutput;\"\n    );\n  \n    // Step 3: Get the real and imaginary parts of the state\n    displayStepAndEditor(\n      \"We can get the real and imaginary parts of the state in the context.\",\n      \"let realPart = math.re(state[0]);\\nlet imaginaryPart = math.im(state[0]);\\n\" +\n      \"`${realPart}, ${imaginaryPart}`;\"\n    );\n  \n    // Step 4: Verify the sum of squared magnitudes of the quantum state\n    displayStepAndEditor(\n      \"The sum of the squared magnitudes must be 1 for a valid quantum state.\",\n      \"let magnitude = math.abs(state[0]) ** 2 + math.abs(state[1]) ** 2;\\nmagnitude;\"\n    );\n  \n    // Step 5: Show an example of a quantum state with a negative real number amplitude\n    displayStepAndEditor(\n      \"Example of a negative real number amplitude, whose angle is 180 degrees, or pi radians.\",\n      \"state = [math.complex(math.sqrt(0.3)), math.complex(-math.sqrt(0.7))];\\n\" +\n      \"state[0].toString();\"\n    );\n  \n    // Step 6: Get the direction (angle) of an amplitude in radians\n    displayStepAndEditor(\n      \"Get the direction of an amplitude in radians using math.atan2()\",\n      \"let direction = math.atan2(math.im(state[1]), math.re(state[1]));\\ndirection;\"\n    );\n  \n    // Step 7: Convert the direction from radians to degrees\n    displayStepAndEditor(\n      \"Convert from radians to degrees\",\n      \"let directionInDegrees = direction * (180 / Math.PI);\\ndirectionInDegrees;\"\n    );\n  \n    // Step 8: Example quantum state with amplitude directions 5pi/7 and pi/5 radians\n    displayStepAndEditor(\n      \"Example state with amplitude directions 5pi/7 and pi/5 radians\",\n      \"state = [\\n\" +\n      \"    math.complex(math.sqrt(0.3) * math.cos(5*Math.PI/7), math.sqrt(0.3) * math.sin(5*Math.PI/7)),\\n\" +\n      \"    math.complex(math.sqrt(0.7) * math.cos(Math.PI/5), math.sqrt(0.7) * math.sin(Math.PI/5))\\n\" +\n      \"];\"\n    );\n  \n    // Step 9: Get the magnitude of an amplitude\n    displayStepAndEditor(\n      \"Get the magnitude of an amplitude\",\n      \"magnitude = math.abs(state[0]);\\nmagnitude;\"\n    );\n  \n    // Step 10: Get the probability of an outcome by squaring the magnitude\n    displayStepAndEditor(\n      \"Get the probability of an outcome by squaring the magnitude\",\n      \"let probability = math.abs(state[0]) ** 2;\\nprobability;\"\n    );\n    \n\n    displayStepAndEditor(\n        \"In this tutorial, we will use the state_table_to_html from common.js\",\n        `(async () => {\n            await state_table_to_html(state, \"state_table\");\n        })();`\n    )\n    \n    let table = document.createElement(\"div\");\n    table.id = \"state_table\";\n    document.getElementById(\"tutorial\").appendChild(table);\n\n\n  \n  });\n  \n\n//# sourceURL=webpack://humejs/./src/js/chapter03.js?");

/***/ }),

/***/ "./src/lib/utils/common.js":
/*!*********************************!*\
  !*** ./src/lib/utils/common.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   all_close: () => (/* binding */ all_close),\n/* harmony export */   circuit_to_string: () => (/* binding */ circuit_to_string),\n/* harmony export */   complex_to_rgb: () => (/* binding */ complex_to_rgb),\n/* harmony export */   draw_circuit: () => (/* binding */ draw_circuit),\n/* harmony export */   grid_state_to_html: () => (/* binding */ grid_state_to_html),\n/* harmony export */   is_close: () => (/* binding */ is_close),\n/* harmony export */   is_close_float: () => (/* binding */ is_close_float),\n/* harmony export */   state_table_to_html: () => (/* binding */ state_table_to_html)\n/* harmony export */ });\n/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mathjs */ \"./node_modules/mathjs/lib/esm/entry/pureFunctionsAny.generated.js\");\n/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ \"./node_modules/d3/src/index.js\");\n/* harmony import */ var _microsoft_quantum_viz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/quantum-viz.js */ \"./node_modules/@microsoft/quantum-viz.js/dist/qviz.min.js\");\n\n\n\n\nfunction is_close_float(a, b, rtol = 1e-5, atol = 1e-8) {\n    return Math.abs(a - b) < atol + rtol * Math.abs(b);\n}\n\nfunction is_close(a, b) {\n    if (typeof a === 'number') {\n        a = mathjs__WEBPACK_IMPORTED_MODULE_2__.complex(a, 0);\n    }\n\n    if (typeof b === 'number') {\n        b = mathjs__WEBPACK_IMPORTED_MODULE_2__.complex(b, 0);\n    }\n\n    return is_close_float(mathjs__WEBPACK_IMPORTED_MODULE_2__.re(a), mathjs__WEBPACK_IMPORTED_MODULE_2__.re(b)) && is_close_float(mathjs__WEBPACK_IMPORTED_MODULE_2__.im(a), mathjs__WEBPACK_IMPORTED_MODULE_2__.im(b));\n}\n\nfunction all_close(state1, state2) {\n    for (let i = 0; i < state1.length; i++) {\n        if (!is_close(state1[i], state2[i])) {\n            return false;\n        }\n    }\n    return true;\n}\n\nlet colormapCache = null;\nasync function loadColormap() {\n    if (!colormapCache) {\n        const response = await fetch('./colormap.json');\n        colormapCache = await response.json();\n    }\n    return colormapCache;\n}\n\nasync function complex_to_rgb(c, ints = false) {\n    const colormap = await loadColormap();  \n    const a = mathjs__WEBPACK_IMPORTED_MODULE_2__.re(c);\n    const b = mathjs__WEBPACK_IMPORTED_MODULE_2__.im(c);\n\n    const magnitude = Math.sqrt(a * a + b * b);\n    let hue = Math.atan2(b, a) / Math.PI * 180;\n\n    if (hue < 0) {\n        hue += 360;\n    }\n\n    const hueIndex = Math.round(hue);\n    const boundedIndex = Math.min(hueIndex, colormap.length - 1);\n\n    const rgb = colormap[boundedIndex];\n\n    if (ints) {\n        return rgb;  \n    } else {\n        return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];\n    }\n}\n\nasync function state_table_to_html(state, id, decimals = 4, symbol = '█') {\n    const n = Math.log2(state.length);\n    const roundState = state.map(c => mathjs__WEBPACK_IMPORTED_MODULE_2__.complex(\n        parseFloat(mathjs__WEBPACK_IMPORTED_MODULE_2__.re(c).toFixed(decimals)),\n        parseFloat(mathjs__WEBPACK_IMPORTED_MODULE_2__.im(c).toFixed(decimals))\n    ));\n\n    const maxProbability = Math.max(...roundState.map(c => mathjs__WEBPACK_IMPORTED_MODULE_2__.pow(mathjs__WEBPACK_IMPORTED_MODULE_2__.abs(c), 2)));\n\n    const tableData = await Promise.all(roundState.map(async (c, k) => {\n        const direction = Math.round(Math.atan2(mathjs__WEBPACK_IMPORTED_MODULE_2__.im(c), mathjs__WEBPACK_IMPORTED_MODULE_2__.re(c)) * 180 / Math.PI * 100) / 100;\n        const amplitude = `${(mathjs__WEBPACK_IMPORTED_MODULE_2__.re(c) >= 0 ? ' ' : '-')}${Math.abs(mathjs__WEBPACK_IMPORTED_MODULE_2__.re(c)).toFixed(decimals)} ${\n            mathjs__WEBPACK_IMPORTED_MODULE_2__.im(c) >= 0 ? '+ ' : '- '}i${Math.abs(mathjs__WEBPACK_IMPORTED_MODULE_2__.im(c)).toFixed(decimals)}`;\n\n        const magnitude = mathjs__WEBPACK_IMPORTED_MODULE_2__.abs(c).toFixed(decimals);\n        const directionStr = magnitude > 0\n            ? `${(direction >= 0 ? ' ' : '-')}${Math.floor(Math.abs(direction))}.${(Math.abs(direction) % 1).toFixed(2).substring(2)}°`\n            : '';\n\n        const rgb = await complex_to_rgb(c, true);\n        const probability = mathjs__WEBPACK_IMPORTED_MODULE_2__.pow(mathjs__WEBPACK_IMPORTED_MODULE_2__.abs(c), 2).toFixed(decimals);\n\n        let amplitudeBar = '' ;\n        if (probability > 0) {\n            const normalizedBarLength = Math.round((probability)*20) + 1;\n            console.log(normalizedBarLength);\n            amplitudeBar = `<span style=\"color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}); width: 200px; display: inline-block; overflow: hidden; text-align: left; font-size: 10px;\">${symbol.repeat(Math.max(1, normalizedBarLength))}</span>`;\n        }\n\n        return {\n            outcome: k,\n            binary: k.toString(2).padStart(n, '0'),\n            amplitude: amplitude,\n            magnitude: magnitude,\n            direction: directionStr,\n            amplitudeBar: amplitudeBar,\n            probability: probability,\n        };\n    }));\n\n    let htmlTable = `\n        <style>\n            table {\n                max-width: 100%;\n                border-collapse: collapse;\n                margin: 25px 0;\n                font-size: 0.9em;\n                border-radius: 10px;\n                overflow: hidden;\n                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n            }\n            thead tr {\n                background-color: #3F72AF;\n                color: #ffffff;\n                text-align: left;\n                font-weight: bold;\n            }\n            th, td {\n                padding: 12px 15px;\n                text-align: left; /* Left aligned */\n            }\n            tbody tr {\n                border-bottom: 1px solid #DBE2EF;\n            }\n            tbody tr:nth-of-type(even) {\n                background-color: #F9F7F7;\n            }\n            tbody tr:last-of-type {\n                border-bottom: 2px solid #3F72AF;\n            }\n            tbody tr:hover {\n                background-color: #DBE2EF;\n            }\n        </style>\n\n        <table>\n            <thead>\n                <tr>\n                    <th>Outcome</th>\n                    <th>Binary</th>\n                    <th>Amplitude</th>\n                    <th>Magnitude</th>\n                    <th>Direction</th>\n                    <th>Amplitude Bar</th>\n                    <th>Probability</th>\n                </tr>\n            </thead>\n            <tbody>\n    `;\n\n    tableData.forEach(row => {\n        htmlTable += `\n            <tr>\n                <td>${row.outcome}</td>\n                <td>${row.binary}</td>\n                <td>${row.amplitude}</td>\n                <td>${row.magnitude}</td>\n                <td>${row.direction}</td>\n                <td>${row.amplitudeBar}</td>\n                <td>${row.probability}</td>\n            </tr>\n        `;\n    });\n\n    htmlTable += `\n            </tbody>\n        </table>\n    `;\n\n    document.getElementById(id).innerHTML = htmlTable;\n}\n\n\nasync function grid_state_to_html(state, m = 1, neg = false, showProbs = false, symbol = '\\u2588') {\n    const n = Math.log2(state.length) - m;\n    const cols = 2 ** m;\n    const rows = Math.floor(state.length / cols);\n\n    let htmlTable = `\n        <style>\n            table {\n                max-width: 100%;\n                border-collapse: collapse;\n                margin: 25px 0;\n                font-size: 0.9em;\n                border-radius: 10px;\n                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n                text-align: center;\n            }\n            thead tr {\n                background-color: #3F72AF;\n                color: #ffffff;\n                font-weight: bold;\n            }\n            th, td {\n                padding: 12px 15px;\n                white-space: nowrap; /* Ensure text doesn't wrap */\n                text-overflow: ellipsis; /* Add ellipsis if text is too long */\n            }\n            tbody tr {\n                border-bottom: 1px solid #DBE2EF;\n            }\n            tbody tr:nth-of-type(even) {\n                background-color: #F9F7F7;\n            }\n            tbody tr:last-of-type {\n                border-bottom: 2px solid #3F72AF;\n            }\n            tbody tr:hover {\n                background-color: #DBE2EF;\n            }\n        </style>\n    `;\n\n    htmlTable += '<table><thead><tr><th></th>';\n\n    for (let l = 0; l < cols; l++) {\n        htmlTable += `<th>${l} = ${l.toString(2).padStart(m, '0')}</th>`;\n    }\n    htmlTable += '</tr></thead><tbody>';\n\n    const rangeFunc = neg\n        ? (x) => [...Array(x / 2).keys()].reverse().concat([...Array(x / 2).keys()].map(i => i + x / 2).reverse())\n        : (x) => [...Array(x).keys()].reverse();\n\n    for (let k of rangeFunc(rows)) {\n        const rowLabel = neg\n            ? `${(k < rows / 2 ? k : k - rows)} = ${k.toString(2).padStart(n, '0')}`\n            : `${k} = ${k.toString(2).padStart(n, '0')}`;\n\n        let row = `<tr><td>${rowLabel}</td>`;\n\n        for (let l = 0; l < cols; l++) {\n            const index = k * cols + l;\n            const re = state[index].re !== undefined ? state[index].re : state[index];\n            const im = state[index].im !== undefined ? state[index].im : 0;\n            const magnitude = Math.sqrt(re * re + im * im);\n            const complexValue = mathjs__WEBPACK_IMPORTED_MODULE_2__.complex(re, im);\n            const color = await complex_to_rgb(complexValue, true);\n            const magnitudeForDisplay = Math.floor(magnitude * 10);\n            const probability = showProbs && magnitude > 0.01 ? (magnitude ** 2).toFixed(2) : '';\n\n            row += `<td><font style=\"color: rgb(${color[0]}, ${color[1]}, ${color[2]});\">${symbol.repeat(magnitudeForDisplay)}</font>&nbsp;${probability}</td>`;\n        }\n\n        htmlTable += row + '</tr>';\n    }\n\n    htmlTable += '</tbody></table>';\n\n    return htmlTable;\n}\n\n\n\nfunction circuit_to_string(qc) {\n    const qs = Array.from({ length: qc.regs.reduce((a, b) => a + b, 0) }, (_, i) => ({ id: i }));\n\n    const ops = qc.transformations.map(tr => ({\n        gate: tr.arg === undefined ? tr.name.toUpperCase() : `${tr.name.toUpperCase()}(${Math.round(tr.arg * 100) / 100})`,\n        isControlled: tr.controls.length > 0,\n        controls: tr.controls.map(c => ({ qId: c })),\n        targets: [{ qId: tr.target }]\n    }));\n\n    const circ = { qubits: qs, operations: ops };\n\n    return JSON.stringify(circ).replace(/\"true\"/g, 'true').replace(/\"false\"/g, 'false');\n}\n\nfunction draw_circuit(circuit_string, circuit_div) {\n    circuit_string = JSON.parse(circuit_string);\n    if (circuit_div != null) {\n        _microsoft_quantum_viz_js__WEBPACK_IMPORTED_MODULE_1__.draw(circuit_string, circuit_div, _microsoft_quantum_viz_js__WEBPACK_IMPORTED_MODULE_1__.STYLES['Default'])\n    }\n}\n\n\n\n//# sourceURL=webpack://humejs/./src/lib/utils/common.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_microsoft_quantum-viz_js_dist_qviz_min_js-node_modules_d3_src_index_js-n-46cfdf"], () => (__webpack_require__("./src/js/chapter03.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;