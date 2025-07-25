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

/***/ "./src/js/frequency_encoding.js":
/*!**************************************!*\
  !*** ./src/js/frequency_encoding.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_algos_frequency_encoding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algos/frequency_encoding.js */ \"./src/lib/algos/frequency_encoding.js\");\n/* harmony import */ var _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/common.js */ \"./src/lib/utils/common.js\");\n\n\n\n// Function to show error message\nfunction showError(message) {\n    const errorDisplay = document.getElementById('error-display');\n    const errorMessage = document.getElementById('error-message');\n    errorMessage.textContent = message;\n    errorDisplay.style.display = 'block';\n}\n\n// Function to hide error message\nfunction hideError() {\n    document.getElementById('error-display').style.display = 'none';\n}\n\n// Function to validate and clamp qubit count\nfunction validateQubitCount() {\n    let qubits = parseInt(document.getElementById('qubits').value);\n    \n    // Clamp qubits to allowed range (1-6)\n    if (isNaN(qubits) || qubits < 1) qubits = 1;\n    if (qubits > 6) qubits = 6;\n    document.getElementById('qubits').value = qubits;\n    \n    return qubits;\n}\n\n// Function to validate frequency input\nfunction validateFrequency() {\n    const frequency = parseFloat(document.getElementById('frequency').value);\n    \n    if (isNaN(frequency)) {\n        return { valid: false, error: 'Frequency must be a valid number' };\n    }\n    \n    if (frequency < -100 || frequency > 100) {\n        return { valid: false, error: 'Frequency must be between -100 and 100' };\n    }\n    \n    return { valid: true, frequency };\n}\n\n// Function to update the circuit and state table\nasync function update_visualization() {\n    try {\n        hideError();\n        \n        // Validate qubit count\n        const qubits = validateQubitCount();\n        \n        // Validate frequency\n        const freqValidation = validateFrequency();\n        if (!freqValidation.valid) {\n            showError(freqValidation.error);\n            return;\n        }\n        \n        const frequency = freqValidation.frequency;\n\n        // Note: frequency is a dimensionless parameter used in the phase gate calculation:\n        // Math.PI * Math.pow(2, -j) * frequency\n        let qc;\n        try {\n            qc = (0,_lib_algos_frequency_encoding_js__WEBPACK_IMPORTED_MODULE_0__.encode_frequency)(qubits, frequency);\n        } catch (error) {\n            showError(`Failed to encode frequency: ${error.message}`);\n            return;\n        }\n\n        // Validate that the circuit has the expected report\n        if (!qc.reports || !qc.reports[\"iqft\"] || !qc.reports[\"iqft\"][2]) {\n            showError('Circuit did not produce expected output state');\n            return;\n        }\n\n        document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';\n        document.getElementById('table_title').innerHTML = '<u>State</u>';\n\n        (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.draw_circuit)((0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.circuit_to_string)(qc), document.getElementById('circuit'));\n        await (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.state_table_to_html)(qc.reports[\"iqft\"][2], 'table');\n        \n    } catch (error) {\n        showError(`Unexpected error: ${error.message}`);\n        console.error('Error in update_visualization:', error);\n    }\n}\n\n// Initial setup on page load\nupdate_visualization();\n\n// Event listener for the Apply button\ndocument.getElementById('apply').addEventListener('click', update_visualization);\n\n// Event listener for qubit input validation\ndocument.getElementById('qubits').addEventListener('change', function() {\n    update_visualization();\n});\n\n// Event listener for frequency input\ndocument.getElementById('frequency').addEventListener('change', update_visualization);\n\n//# sourceURL=webpack://humejs/./src/js/frequency_encoding.js?");

/***/ }),

/***/ "./src/lib/algos/frequency_encoding.js":
/*!*********************************************!*\
  !*** ./src/lib/algos/frequency_encoding.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   encode_frequency: () => (/* binding */ encode_frequency)\n/* harmony export */ });\n/* harmony import */ var _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../simulator/circuit.js */ \"./src/lib/simulator/circuit.js\");\n\n\nfunction encode_frequency(n, v) {\n    const q = new _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_0__.QuantumRegister(n);\n    const qc = new _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_0__.QuantumCircuit(q);\n\n    for (let j = 0; j < n; j++) {\n        qc.h(q.get(j));\n        qc.p(Math.PI * Math.pow(2, -j) * v, q.get(j));\n    }\n\n    qc.report('signal');\n    qc.append_iqft(q, true, false);\n    qc.report('iqft');\n\n    return qc;\n}\n\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/frequency_encoding.js?");

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
/******/ 			"frequency_encoding": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_mathjs_lib_esm_entry_pureFunctionsAny_generated_js","vendors-node_modules_microsoft_quantum-viz_js_dist_qviz_min_js-node_modules_d3_src_index_js","src_lib_simulator_core_js","src_lib_simulator_circuit_js"], () => (__webpack_require__("./src/js/frequency_encoding.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;