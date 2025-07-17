import { encode_frequency } from '../lib/algos/frequency_encoding.js';
import { circuit_to_string, draw_circuit, state_table_to_html } from '../lib/utils/common.js';

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

// Function to validate and clamp qubit count
function validateQubitCount() {
    let qubits = parseInt(document.getElementById('qubits').value);
    
    // Clamp qubits to allowed range (1-6)
    if (isNaN(qubits) || qubits < 1) qubits = 1;
    if (qubits > 6) qubits = 6;
    document.getElementById('qubits').value = qubits;
    
    return qubits;
}

// Function to validate frequency input
function validateFrequency() {
    const frequency = parseFloat(document.getElementById('frequency').value);
    
    if (isNaN(frequency)) {
        return { valid: false, error: 'Frequency must be a valid number' };
    }
    
    if (frequency < -100 || frequency > 100) {
        return { valid: false, error: 'Frequency must be between -100 and 100' };
    }
    
    return { valid: true, frequency };
}

// Function to update the circuit and state table
async function update_visualization() {
    try {
        hideError();
        
        // Validate qubit count
        const qubits = validateQubitCount();
        
        // Validate frequency
        const freqValidation = validateFrequency();
        if (!freqValidation.valid) {
            showError(freqValidation.error);
            return;
        }
        
        const frequency = freqValidation.frequency;

        // Note: frequency is a dimensionless parameter used in the phase gate calculation:
        // Math.PI * Math.pow(2, -j) * frequency
        let qc;
        try {
            qc = encode_frequency(qubits, frequency);
        } catch (error) {
            showError(`Failed to encode frequency: ${error.message}`);
            return;
        }

        // Validate that the circuit has the expected report
        if (!qc.reports || !qc.reports["iqft"] || !qc.reports["iqft"][2]) {
            showError('Circuit did not produce expected output state');
            return;
        }

        document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';
        document.getElementById('table_title').innerHTML = '<u>State</u>';

        draw_circuit(circuit_to_string(qc), document.getElementById('circuit'));
        await state_table_to_html(qc.reports["iqft"][2], 'table');
        
    } catch (error) {
        showError(`Unexpected error: ${error.message}`);
        console.error('Error in update_visualization:', error);
    }
}

// Initial setup on page load
update_visualization();

// Event listener for the Apply button
document.getElementById('apply').addEventListener('click', update_visualization);

// Event listener for qubit input validation
document.getElementById('qubits').addEventListener('change', function() {
    update_visualization();
});

// Event listener for frequency input
document.getElementById('frequency').addEventListener('change', update_visualization);