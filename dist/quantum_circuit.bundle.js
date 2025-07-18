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

/***/ "./src/js/quantum_circuit.js":
/*!***********************************!*\
  !*** ./src/js/quantum_circuit.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algos/quantum_circuit.js */ \"./src/lib/algos/quantum_circuit.js\");\n/* harmony import */ var _lib_simulator_circuit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/simulator/circuit.js */ \"./src/lib/simulator/circuit.js\");\n/* harmony import */ var _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/common.js */ \"./src/lib/utils/common.js\");\n\n\n\n\n// Declare `qc` as a global variable\nlet qc;\n\nfunction update_target_options(num_qubits) {\n    const target = document.getElementById('target');\n    const controlsContainer = document.getElementById('controls-container');\n    target.innerHTML = ''; // Clear existing options\n    controlsContainer.innerHTML = ''; // Clear existing visual selectors\n\n    for (let i = 0; i < num_qubits; i++) {\n        // Create target option\n        const option = document.createElement('option');\n        option.value = i;\n        option.text = `${i}`;\n        target.appendChild(option);\n\n        // Create visual qubit selector\n        const qubitSelector = document.createElement('div');\n        qubitSelector.className = 'qubit-selector';\n        qubitSelector.textContent = i;\n        qubitSelector.dataset.qubitIndex = i;\n        qubitSelector.disabled = true; // Initially disabled\n        \n        // Add click event listener for selection\n        qubitSelector.addEventListener('click', function() {\n            if (!this.disabled) {\n                const gate = document.getElementById('gate').value;\n                const target = parseInt(document.getElementById('target').value);\n                const currentQubitIndex = parseInt(this.dataset.qubitIndex);\n                \n                // Prevent selecting target qubit as control\n                if (currentQubitIndex === target) {\n                    return; // Don't allow selection\n                }\n                \n                if (_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.control_gates.includes(gate)) {\n                    // For single control gates, only allow one selection\n                    if (this.classList.contains('selected')) {\n                        // If already selected, deselect it\n                        this.classList.remove('selected');\n                    } else {\n                        // If not selected, deselect all others and select this one\n                        const allSelectors = document.querySelectorAll('#controls-container .qubit-selector');\n                        allSelectors.forEach(selector => selector.classList.remove('selected'));\n                        this.classList.add('selected');\n                    }\n                } else if (_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.multiple_control_gates.includes(gate)) {\n                    // For multiple control gates, allow multiple selections\n                    this.classList.toggle('selected');\n                }\n            }\n        });\n        \n        controlsContainer.appendChild(qubitSelector);\n    }\n}\n\nasync function update_visualization() {\n    const target = parseInt(document.getElementById('target').value);\n    const gate = document.getElementById('gate').value;\n    const angleRadians = document.getElementById('angle').value;\n    \n    // Validate angle input for gates that require it\n    if (_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.degree_gates.includes(gate)) {\n        const angleNum = parseFloat(angleRadians);\n        if (angleRadians === '' || isNaN(angleNum)) {\n            alert(\"Please enter a valid value for angle (radians).\\nIt must be a number.\");\n            return;\n        }\n    }\n    \n    // Convert radians to degrees for the quantum circuit library\n    const angleDegrees = angleRadians === '' ? '' : (parseFloat(angleRadians) * 180 / Math.PI).toString();\n    \n    // Retrieve selected control qubits from the visual selectors\n    const selectedSelectors = document.querySelectorAll('#controls-container .qubit-selector.selected');\n    const controls = Array.from(selectedSelectors).map(selector => parseInt(selector.dataset.qubitIndex));\n\n    if (!qc) {\n        console.error('Quantum circuit (qc) is not defined.');\n        return;\n    }\n\n    (0,_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.apply_gate)(qc, target, gate, angleDegrees, controls);\n\n    document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';\n    (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.draw_circuit)((0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.circuit_to_string)(qc), document.getElementById('circuit'));\n\n    document.getElementById('table_title').innerHTML = '<u>State</u>';\n    const state = (0,_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.get_state)(qc);\n    await (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.state_table_to_html)(state, 'table');\n}\n\nasync function update_qc() {\n    const num_qubits = parseInt(document.getElementById('num_qubits').value);\n\n    qc = (0,_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.create_circuit)(num_qubits);\n\n    update_target_options(num_qubits); // Update the target dropdown options\n    \n    // Reset gate selection to H gate when qubit count changes\n    document.getElementById('gate').value = 'h';\n    \n    // Update the UI to reflect the new gate selection\n    update_angle_and_controls();\n\n    document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';\n    (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.draw_circuit)((0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.circuit_to_string)(qc), document.getElementById('circuit'));\n    document.getElementById('table_title').innerHTML = '<u>State</u>';\n    const state = (0,_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.get_state)(qc);\n    await (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_2__.state_table_to_html)(state, 'table');\n}\n\nfunction update_angle_and_controls() {\n    const gate = document.getElementById('gate').value;\n    const angleInput = document.getElementById('angle');\n    const controlsInputGroup = document.getElementById('controls-input-group');\n    const controlsContainer = document.getElementById('controls-container');\n    \n    // Show/hide angle input\n    if (_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.degree_gates.includes(gate)) {\n        angleInput.disabled = false;\n        angleInput.parentElement.style.display = '';\n    } else {\n        angleInput.disabled = true;\n        angleInput.value = '';\n        angleInput.parentElement.style.display = 'none';\n    }\n\n    // Show/hide and enable/disable visual qubit selectors\n    const qubitSelectors = controlsContainer.querySelectorAll('.qubit-selector');\n    \n    if (_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.multiple_control_gates.includes(gate)) {\n        controlsInputGroup.style.display = '';\n        qubitSelectors.forEach(selector => {\n            selector.disabled = false;\n            selector.classList.remove('disabled');\n        });\n        // Update visual states only when controls are shown\n        update_qubit_selector_states();\n    } else if (_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.control_gates.includes(gate)) {\n        controlsInputGroup.style.display = '';\n        qubitSelectors.forEach(selector => {\n            selector.disabled = false;\n            selector.classList.remove('disabled');\n        });\n        // Update visual states only when controls are shown\n        update_qubit_selector_states();\n    } else {\n        controlsInputGroup.style.display = 'none';\n        qubitSelectors.forEach(selector => {\n            selector.disabled = true;\n            selector.classList.add('disabled');\n            selector.classList.remove('selected');\n        });\n    }\n}\n\n// Function to update visual state of qubit selectors\nfunction update_qubit_selector_states() {\n    const gate = document.getElementById('gate').value;\n    const target = parseInt(document.getElementById('target').value);\n    const qubitSelectors = document.querySelectorAll('#controls-container .qubit-selector');\n    \n    qubitSelectors.forEach(selector => {\n        const qubitIndex = parseInt(selector.dataset.qubitIndex);\n        \n        // Clear any target highlighting\n        selector.classList.remove('target-qubit');\n        \n        // If this is the target qubit, mark it visually\n        if (qubitIndex === target) {\n            selector.classList.add('target-qubit');\n        }\n        \n        // If this is a single control gate and target is selected as control, deselect it\n        if (_lib_algos_quantum_circuit_js__WEBPACK_IMPORTED_MODULE_0__.control_gates.includes(gate) && qubitIndex === target && selector.classList.contains('selected')) {\n            selector.classList.remove('selected');\n        }\n    });\n}\n\n// Reset function to clear circuit and reset interface\nasync function reset_circuit() {\n    // Reset gate selection to H\n    document.getElementById('gate').value = 'h';\n    \n    // Reset target to 0\n    document.getElementById('target').value = '0';\n    \n    // Clear angle input\n    document.getElementById('angle').value = '';\n    \n    // Clear all control selections\n    const qubitSelectors = document.querySelectorAll('#controls-container .qubit-selector');\n    qubitSelectors.forEach(selector => {\n        selector.classList.remove('selected');\n    });\n    \n    // Update the interface state\n    update_angle_and_controls();\n    update_qubit_selector_states();\n    \n    // Create a fresh circuit\n    await update_qc();\n}\n\nupdate_qc();\nupdate_angle_and_controls();\n\ndocument.getElementById('apply').addEventListener('click', update_visualization);\ndocument.getElementById('reset').addEventListener('click', reset_circuit);\ndocument.getElementById('num_qubits').addEventListener('change', function() {\n    update_qc();\n});\ndocument.getElementById('gate').addEventListener('change', update_angle_and_controls);\ndocument.getElementById('target').addEventListener('change', update_qubit_selector_states);\ndocument.addEventListener('DOMContentLoaded', update_angle_and_controls);\n\n//# sourceURL=webpack://humejs/./src/js/quantum_circuit.js?");

/***/ }),

/***/ "./src/lib/algos/quantum_circuit.js":
/*!******************************************!*\
  !*** ./src/lib/algos/quantum_circuit.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   add_gate: () => (/* binding */ add_gate),\n/* harmony export */   apply_gate: () => (/* binding */ apply_gate),\n/* harmony export */   arg_gates: () => (/* binding */ arg_gates),\n/* harmony export */   control_gates: () => (/* binding */ control_gates),\n/* harmony export */   create_circuit: () => (/* binding */ create_circuit),\n/* harmony export */   degree_gates: () => (/* binding */ degree_gates),\n/* harmony export */   gates: () => (/* binding */ gates),\n/* harmony export */   get_state: () => (/* binding */ get_state),\n/* harmony export */   last_step: () => (/* binding */ last_step),\n/* harmony export */   multiple_control_gates: () => (/* binding */ multiple_control_gates),\n/* harmony export */   no_arg_gates: () => (/* binding */ no_arg_gates)\n/* harmony export */ });\n/* harmony import */ var _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../simulator/circuit.js */ \"./src/lib/simulator/circuit.js\");\n\n\nconst no_arg_gates = ['h', 'x', 'y', 'z'];\nconst arg_gates = ['p', 'rx', 'ry', 'rz'];\nconst control_gates = ['cx', 'cy', 'cz', 'cp', 'cry'];\nconst multiple_control_gates = ['mcx', 'mcp'];\nconst gates = no_arg_gates.concat(arg_gates, control_gates, multiple_control_gates);\nconst degree_gates = ['p', 'rx', 'ry', 'rz', 'cp', 'cry', 'mcp'];\n\nfunction add_gate(qc, cs, target, gate, angle = null) {\n    console.log(cs);\n    if (no_arg_gates.includes(gate)) {\n        if (cs.length !== 0) {\n            throw new Error(`Gate ${gate} should not have control qubits.`);\n        }\n        qc[gate](parseInt(target));\n    }\n    else if (arg_gates.includes(gate) && angle !== null) {\n        if (cs.length !== 0) {\n            throw new Error(`Gate ${gate} should not have control qubits.`);\n        }\n        qc[gate](angle, parseInt(target));\n    }\n    else if (control_gates.includes(gate)) {\n        if (cs.length !== 1) {\n            throw new Error(`Gate ${gate} requires exactly 1 control qubit.`);\n        }\n        qc[gate](parseInt(cs[0]), parseInt(target));\n    }\n    else if (multiple_control_gates.includes(gate) && angle !== null) {\n        if (cs.length < 2) {\n            throw new Error(`Gate ${gate} requires at least 2 control qubits.`);\n        }\n        if(gate == \"mcx\") {\n            qc.mcx(cs, target);\n        } else {\n            qc[gate](angle, cs.map(c => parseInt(c)), parseInt(target));\n        }\n    }\n    else {\n        console.error(`Invalid gate or missing parameters for gate: ${gate}`);\n    }\n}\n\nfunction create_circuit(qubits) {\n    const q = new _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_0__.QuantumRegister(qubits);\n    const qc = new _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_0__.QuantumCircuit(q);\n    return qc;\n}\n\nfunction apply_gate(qc, target, gate, angle = null, controls = [], report = true) {\n    console.log(controls);\n    gate = gate.toLowerCase();\n    const argGates = ['rx', 'ry', 'rz', 'p', 'cp', 'cry', 'mcp'];  \n\n    if (argGates.includes(gate) && angle === null) {\n        throw new Error(\"Angle is required for argument gates.\");\n    }\n    \n    if (argGates.includes(gate)) {\n        angle = angle / 180 * Math.PI;\n    } else {\n        angle = null;\n    }\n    \n    add_gate(qc, controls, target, gate, angle);\n    \n    if (report) {\n        const len = Object.keys(qc.reports).length;\n        qc.report(`Step ${len + 1}`);\n    }\n\n    \n\n}\n\nfunction last_step(qc) {\n    return qc.reports.length;\n}\n\nfunction get_state(qc) {\n    let state;\n    const len = Object.keys(qc.reports).length;\n    if (len > 0) {\n        state = qc.reports[`Step ${len}`][2];\n    } else {\n        state = qc.state;\n    }\n\n    return state;\n}\n\n\n\n\n\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/quantum_circuit.js?");

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
/******/ 			"quantum_circuit": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_mathjs_lib_esm_entry_pureFunctionsAny_generated_js","vendors-node_modules_microsoft_quantum-viz_js_dist_qviz_min_js-node_modules_d3_src_index_js","src_lib_simulator_core_js","src_lib_simulator_circuit_js"], () => (__webpack_require__("./src/js/quantum_circuit.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;