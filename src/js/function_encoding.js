import { build_polynomial_circuit, terms_from_poly } from '../lib/algos/function_encoding.js';
import { circuit_to_string, draw_circuit, grid_state_to_html } from '../lib/utils/common.js';

// Function to show error message
function showError(message) {
    const errorDisplay = document.getElementById('error-display');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorDisplay.style.display = 'block';
}

// Function to hide error message
function hideError() {
    document.getElementById('error-display').style.display = 'none';
}

// Function to validate polynomial input
function validatePolynomial(poly, input_qubits, isInteger) {
    if (!poly || poly.trim() === '') {
        return { valid: false, error: 'Polynomial cannot be empty' };
    }

    // Basic syntax validation
    const trimmedPoly = poly.trim();
    
    if (isInteger) {
        // For integer variables, check for valid polynomial syntax
        const validPattern = /^[0-9x\s\+\-\*\(\)\^]+$/;
        if (!validPattern.test(trimmedPoly)) {
            return { valid: false, error: 'Invalid characters in polynomial. Use only: numbers, x, +, -, *, ^, (, )' };
        }
        
        // Check for balanced parentheses
        let parenCount = 0;
        for (let char of trimmedPoly) {
            if (char === '(') parenCount++;
            if (char === ')') parenCount--;
            if (parenCount < 0) {
                return { valid: false, error: 'Unmatched closing parenthesis' };
            }
        }
        if (parenCount !== 0) {
            return { valid: false, error: 'Unmatched opening parenthesis' };
        }
        
        // Check for valid exponent syntax
        if (/\^[^0-9]/.test(trimmedPoly)) {
            return { valid: false, error: 'Invalid exponent. Use format: x^n where n is a number' };
        }
        
    } else {
        // For binary variables, check for valid binary polynomial syntax
        const validPattern = /^[0-9x\s\+\-\*\(\)]+$/;
        if (!validPattern.test(trimmedPoly)) {
            return { valid: false, error: 'Invalid characters in binary polynomial. Use only: numbers, x, +, -, *, (, )' };
        }
        
        // Check for valid variable names (x0, x1, x2, etc.)
        const varPattern = /x[0-9]+/g;
        const variables = trimmedPoly.match(varPattern) || [];
        for (let variable of variables) {
            const index = parseInt(variable.substring(1));
            if (index >= input_qubits) {
                return { valid: false, error: `Variable ${variable} exceeds input qubit count (${input_qubits})` };
            }
        }
    }
    
    return { valid: true };
}

// Function to validate and clamp qubit counts
function validateQubitCounts() {
    let input_qubits = parseInt(document.getElementById('input_qubits').value);
    let output_qubits = parseInt(document.getElementById('output_qubits').value);
    
    // Clamp input qubits to 1-4
    if (isNaN(input_qubits) || input_qubits < 1) input_qubits = 1;
    if (input_qubits > 4) input_qubits = 4;
    document.getElementById('input_qubits').value = input_qubits;
    
    // Clamp output qubits to 2-6
    if (isNaN(output_qubits) || output_qubits < 2) output_qubits = 2;
    if (output_qubits > 6) output_qubits = 6;
    document.getElementById('output_qubits').value = output_qubits;
    
    return { input_qubits, output_qubits };
}

async function update_visualization() {
    try {
        hideError();
        
        // Validate qubit counts
        const { input_qubits, output_qubits } = validateQubitCounts();
        const poly = document.getElementById('poly').value;
        const isPoly = document.getElementById('variable_type').value === 'integer'; 
        const showNegative = document.getElementById('show_negative').checked; 

        // Validate polynomial
        const polyValidation = validatePolynomial(poly, input_qubits, isPoly);
        if (!polyValidation.valid) {
            showError(polyValidation.error);
            return;
        }

        // Try to parse the polynomial
        let terms;
        try {
            terms = terms_from_poly(poly, input_qubits, isPoly);
        } catch (error) {
            showError(`Failed to parse polynomial: ${error.message}`);
            return;
        }

        // Build the circuit
        let qc;
        try {
            qc = build_polynomial_circuit(input_qubits, output_qubits, terms);
        } catch (error) {
            showError(`Failed to build circuit: ${error.message}`);
            return;
        }

        // Update the display
        document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';
        draw_circuit(circuit_to_string(qc), document.getElementById('circuit'));

        document.getElementById('table_title').innerHTML = '<u>State</u>';
        
        // Validate that the circuit has the expected report
        if (!qc.reports || !qc.reports['qpe'] || !qc.reports['qpe'][2]) {
            showError('Circuit did not produce expected output state');
            return;
        }
        
        document.getElementById('table').innerHTML = await grid_state_to_html(qc.reports['qpe'][2], input_qubits, showNegative, true);
        
    } catch (error) {
        showError(`Unexpected error: ${error.message}`);
        console.error('Error in update_visualization:', error);
    }
}

// Initial load - run once when page loads
update_visualization();

// Only update when Apply is clicked - NO AUTOMATIC UPDATES
document.getElementById('apply').addEventListener('click', update_visualization);

// Input validation only - NO visualization updates
document.getElementById('input_qubits').addEventListener('change', function() {
    // NO update_visualization() call here
});

document.getElementById('output_qubits').addEventListener('change', function() {
    // NO update_visualization() call here
});

// Polynomial validation only - NO visualization updates
document.getElementById('poly').addEventListener('input', function() {
    clearTimeout(this.validationTimeout);
    this.validationTimeout = setTimeout(() => {
        const poly = this.value;
        const input_qubits = parseInt(document.getElementById('input_qubits').value);
        const isPoly = document.getElementById('variable_type').value === 'integer';
        const polyValidation = validatePolynomial(poly, input_qubits, isPoly);
        if (!polyValidation.valid) {
            showError(polyValidation.error);
        } else {
            hideError();
        }
        // NO update_visualization() call here
    }, 500);
});

document.getElementById('variable_type').addEventListener('change', function() {
    const polyInput = document.getElementById('poly');
    if (this.value === 'binary') {
        polyInput.value = 'x0 + x1';
    } else {
        polyInput.value = 'x^2'; 
    }
    // NO update_visualization() call here
});

document.getElementById('show_negative').addEventListener('change', function() {
    // NO update_visualization() call here
});