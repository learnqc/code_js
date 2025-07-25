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

/***/ "./src/js/function_encoding.js":
/*!*************************************!*\
  !*** ./src/js/function_encoding.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_algos_function_encoding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algos/function_encoding.js */ \"./src/lib/algos/function_encoding.js\");\n/* harmony import */ var _lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/common.js */ \"./src/lib/utils/common.js\");\n\n\n\n// Function to show error message\nfunction showError(message) {\n    const errorDisplay = document.getElementById('error-display');\n    const errorMessage = document.getElementById('error-message');\n    errorMessage.textContent = message;\n    errorDisplay.style.display = 'block';\n}\n\n// Function to hide error message\nfunction hideError() {\n    document.getElementById('error-display').style.display = 'none';\n}\n\n// Function to validate polynomial input\nfunction validatePolynomial(poly, input_qubits, isInteger) {\n    if (!poly || poly.trim() === '') {\n        return { valid: false, error: 'Polynomial cannot be empty' };\n    }\n\n    // Basic syntax validation\n    const trimmedPoly = poly.trim();\n    \n    if (isInteger) {\n        // For integer variables, check for valid polynomial syntax\n        const validPattern = /^[0-9x\\s\\+\\-\\*\\(\\)\\^]+$/;\n        if (!validPattern.test(trimmedPoly)) {\n            return { valid: false, error: 'Invalid characters in polynomial. Use only: numbers, x, +, -, *, ^, (, )' };\n        }\n        \n        // Check for balanced parentheses\n        let parenCount = 0;\n        for (let char of trimmedPoly) {\n            if (char === '(') parenCount++;\n            if (char === ')') parenCount--;\n            if (parenCount < 0) {\n                return { valid: false, error: 'Unmatched closing parenthesis' };\n            }\n        }\n        if (parenCount !== 0) {\n            return { valid: false, error: 'Unmatched opening parenthesis' };\n        }\n        \n        // Check for valid exponent syntax\n        if (/\\^[^0-9]/.test(trimmedPoly)) {\n            return { valid: false, error: 'Invalid exponent. Use format: x^n where n is a number' };\n        }\n        \n    } else {\n        // For binary variables, check for valid binary polynomial syntax\n        const validPattern = /^[0-9x\\s\\+\\-\\*\\(\\)]+$/;\n        if (!validPattern.test(trimmedPoly)) {\n            return { valid: false, error: 'Invalid characters in binary polynomial. Use only: numbers, x, +, -, *, (, )' };\n        }\n        \n        // Check for valid variable names (x0, x1, x2, etc.)\n        const varPattern = /x[0-9]+/g;\n        const variables = trimmedPoly.match(varPattern) || [];\n        for (let variable of variables) {\n            const index = parseInt(variable.substring(1));\n            if (index >= input_qubits) {\n                return { valid: false, error: `Variable ${variable} exceeds input qubit count (${input_qubits})` };\n            }\n        }\n    }\n    \n    return { valid: true };\n}\n\n// Function to validate and clamp qubit counts\nfunction validateQubitCounts() {\n    let input_qubits = parseInt(document.getElementById('input_qubits').value);\n    let output_qubits = parseInt(document.getElementById('output_qubits').value);\n    \n    // Clamp input qubits to 1-4\n    if (isNaN(input_qubits) || input_qubits < 1) input_qubits = 1;\n    if (input_qubits > 4) input_qubits = 4;\n    document.getElementById('input_qubits').value = input_qubits;\n    \n    // Clamp output qubits to 2-6\n    if (isNaN(output_qubits) || output_qubits < 2) output_qubits = 2;\n    if (output_qubits > 6) output_qubits = 6;\n    document.getElementById('output_qubits').value = output_qubits;\n    \n    return { input_qubits, output_qubits };\n}\n\nasync function update_visualization() {\n    try {\n        hideError();\n        \n        // Validate qubit counts\n        const { input_qubits, output_qubits } = validateQubitCounts();\n        const poly = document.getElementById('poly').value;\n        const isPoly = document.getElementById('variable_type').value === 'integer'; \n        const showNegative = document.getElementById('show_negative').checked; \n\n        // Validate polynomial\n        const polyValidation = validatePolynomial(poly, input_qubits, isPoly);\n        if (!polyValidation.valid) {\n            showError(polyValidation.error);\n            return;\n        }\n\n        // Try to parse the polynomial\n        let terms;\n        try {\n            terms = (0,_lib_algos_function_encoding_js__WEBPACK_IMPORTED_MODULE_0__.terms_from_poly)(poly, input_qubits, isPoly);\n        } catch (error) {\n            showError(`Failed to parse polynomial: ${error.message}`);\n            return;\n        }\n\n        // Build the circuit\n        let qc;\n        try {\n            qc = (0,_lib_algos_function_encoding_js__WEBPACK_IMPORTED_MODULE_0__.build_polynomial_circuit)(input_qubits, output_qubits, terms);\n        } catch (error) {\n            showError(`Failed to build circuit: ${error.message}`);\n            return;\n        }\n\n        // Update the display\n        document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';\n        (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.draw_circuit)((0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.circuit_to_string)(qc), document.getElementById('circuit'));\n\n        document.getElementById('table_title').innerHTML = '<u>State</u>';\n        \n        // Validate that the circuit has the expected report\n        if (!qc.reports || !qc.reports['qpe'] || !qc.reports['qpe'][2]) {\n            showError('Circuit did not produce expected output state');\n            return;\n        }\n        \n        document.getElementById('table').innerHTML = await (0,_lib_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.grid_state_to_html)(qc.reports['qpe'][2], input_qubits, showNegative, true);\n        \n    } catch (error) {\n        showError(`Unexpected error: ${error.message}`);\n        console.error('Error in update_visualization:', error);\n    }\n}\n\n// Initial load - run once when page loads\nupdate_visualization();\n\n// Only update when Apply is clicked - NO AUTOMATIC UPDATES\ndocument.getElementById('apply').addEventListener('click', update_visualization);\n\n// Input validation only - NO visualization updates\ndocument.getElementById('input_qubits').addEventListener('change', function() {\n    // NO update_visualization() call here\n});\n\ndocument.getElementById('output_qubits').addEventListener('change', function() {\n    // NO update_visualization() call here\n});\n\n// Polynomial validation only - NO visualization updates\ndocument.getElementById('poly').addEventListener('input', function() {\n    clearTimeout(this.validationTimeout);\n    this.validationTimeout = setTimeout(() => {\n        const poly = this.value;\n        const input_qubits = parseInt(document.getElementById('input_qubits').value);\n        const isPoly = document.getElementById('variable_type').value === 'integer';\n        const polyValidation = validatePolynomial(poly, input_qubits, isPoly);\n        if (!polyValidation.valid) {\n            showError(polyValidation.error);\n        } else {\n            hideError();\n        }\n        // NO update_visualization() call here\n    }, 500);\n});\n\ndocument.getElementById('variable_type').addEventListener('change', function() {\n    const polyInput = document.getElementById('poly');\n    if (this.value === 'binary') {\n        polyInput.value = 'x0 + x1';\n    } else {\n        polyInput.value = 'x^2'; \n    }\n    // NO update_visualization() call here\n});\n\ndocument.getElementById('show_negative').addEventListener('change', function() {\n    // NO update_visualization() call here\n});\n\n//# sourceURL=webpack://humejs/./src/js/function_encoding.js?");

/***/ }),

/***/ "./src/lib/algos/function_encoding.js":
/*!********************************************!*\
  !*** ./src/lib/algos/function_encoding.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   build_polynomial_circuit: () => (/* binding */ build_polynomial_circuit),\n/* harmony export */   terms_from_poly: () => (/* binding */ terms_from_poly)\n/* harmony export */ });\n/* harmony import */ var nerdamer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nerdamer */ \"./node_modules/nerdamer/nerdamer.core.js\");\n/* harmony import */ var _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../simulator/circuit.js */ \"./src/lib/simulator/circuit.js\");\n\n\n\nfunction encodeTerm(coeff, vars, circuit, key, value) {\n    // Ensure coeff is a number\n    if (typeof coeff !== 'number') {\n        coeff = coeff.value;\n    }\n\n    // Loop through value qubits\n    for (let i = 0; i < value.size; i++) {\n        if (vars.length > 1) {\n            circuit.mcp(Math.PI * 2 ** -i * coeff, vars.map(j => key.get(j)), value.get(i));\n        } else if (vars.length > 0) {\n            circuit.cp(Math.PI * 2 ** -i * coeff, key.get(vars[0]), value.get(i));\n        } else {\n            circuit.p(Math.PI * 2 ** -i * coeff, value.get(i));\n        }\n    }\n}\n\nfunction build_polynomial_circuit(keySize, valueSize, terms) {\n    const key = new _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_1__.QuantumRegister(keySize);\n    const value = new _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_1__.QuantumRegister(valueSize);\n    const circuit = new _simulator_circuit_js__WEBPACK_IMPORTED_MODULE_1__.QuantumCircuit(key, value);\n\n    for (let i = 0; i < keySize; i++) {\n        circuit.h(key.get(i));\n    }\n\n    for (let i = 0; i < valueSize; i++) {\n        circuit.h(value.get(i));\n    }\n\n    terms.forEach(([coeff, vars]) => {\n        encodeTerm(coeff, vars, circuit, key, value);\n    });\n\n    circuit.iqft(value.reverse(), false); // Assuming swap=false is the second argument\n\n    circuit.report('qpe');\n\n    return circuit;\n}\n\n\nfunction terms_from_poly(poly_str, num_bits, is_poly) {\n    //generate bin var list\n    const var_list = Array.from({ length: num_bits }, (_, i) => `x${i}`);\n\n    let expanded_expr_str;\n\n    if (is_poly) {\n        try {\n            const bin_var_terms = Array.from({ length: num_bits }, (_, i) => `${Math.pow(2, i)}*x${i}`);\n            const bin_var_str = bin_var_terms.join('+');\n\n            //replace w bin var expr\n            const new_poly = poly_str.replace(/x/g, `(${bin_var_str})`);\n\n            const s = nerdamer__WEBPACK_IMPORTED_MODULE_0__(new_poly).expand();\n            expanded_expr_str = s.toString();\n        } catch (error) {\n            return \"Error: Polynomial should be in the form of a*x^n + b*x^(n-1) + ... + z*x + c\";\n        }\n    } else {\n        try {\n            const s = nerdamer__WEBPACK_IMPORTED_MODULE_0__(poly_str).expand();\n\n            //check if var in var_list\n            const free_symbols = s.variables();\n            for (let symbol of free_symbols) {\n                if (!var_list.includes(symbol)) {\n                    return \"Error: Invalid symbol\";\n                }\n            }\n\n            expanded_expr_str = s.toString();\n        } catch (error) {\n            return \"Error: Invalid input for binary variables.\";\n        }\n    }\n\n    return binary_expression_to_list(expanded_expr_str, var_list);\n}\n\nfunction binary_expression_to_list(expr_str, var_list) {\n    //split by +\n    const terms = expr_str.split('+').map(term => term.trim());\n    const result = [];\n\n    for (const term of terms) {\n        const { coefficient, variables } = extract_coefficient_and_variables(term, var_list);\n\n        result.push([coefficient, variables]);\n    }\n    return result;\n}\n\nfunction extract_coefficient_and_variables(termStr, varList) {\n    let coefficient = 1;\n    const variables = [];\n\n    // Improved regex to capture coefficients and variables with exponents\n    const regex = /([+-]?\\d*\\.?\\d+)?(?:\\*?([a-zA-Z]+\\d*)(?:\\^(\\d+))?)/g;\n\n    let match;\n    let foundVariable = false;\n\n    while ((match = regex.exec(termStr)) !== null) {\n        const coeffPart = match[1];\n        const varPart = match[2];\n        const exponentPart = match[3] ? parseInt(match[3]) : 1; // Default exponent is 1\n\n        // Handle coefficient part\n        if (coeffPart && !isNaN(parseFloat(coeffPart))) {\n            coefficient = parseFloat(coeffPart);\n        } else if (termStr.trim().startsWith('-') && !foundVariable) {\n            coefficient = -1;\n        }\n\n        // Handle variable part and exponent\n        if (varPart) {\n            varList.forEach((variable, idx) => {\n                if (varPart.startsWith(variable)) {\n                    // Add the variable index as many times as the exponent\n                    for (let i = 0; i < exponentPart; i++) {\n                        variables.push(idx);\n                    }\n                    foundVariable = true;\n                }\n            });\n        }\n    }\n\n    // If no variable found, treat it as a constant\n    if (!foundVariable) {\n        coefficient = parseFloat(termStr);\n    }\n\n    return { coefficient, variables };\n}\n\n\n\n\n//# sourceURL=webpack://humejs/./src/lib/algos/function_encoding.js?");

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
/******/ 			"function_encoding": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_mathjs_lib_esm_entry_pureFunctionsAny_generated_js","vendors-node_modules_microsoft_quantum-viz_js_dist_qviz_min_js-node_modules_d3_src_index_js","vendors-node_modules_nerdamer_nerdamer_core_js","src_lib_simulator_core_js","src_lib_simulator_circuit_js"], () => (__webpack_require__("./src/js/function_encoding.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;