import { add_gate, create_circuit, apply_gate, last_step, get_state, no_arg_gates, control_gates, arg_gates, multiple_control_gates, degree_gates } from '../lib/algos/quantum_circuit.js';
import { QuantumRegister, QuantumCircuit } from '../lib/simulator/circuit.js';
import { circuit_to_string, draw_circuit, state_table_to_tabulator, state_table_to_html } from '../lib/utils/common.js';

// Declare `qc` as a global variable
let qc;

function update_target_options(num_qubits) {
    const target = document.getElementById('target');
    const controlsContainer = document.getElementById('controls-container');
    target.innerHTML = ''; // Clear existing options
    controlsContainer.innerHTML = ''; // Clear existing visual selectors

    for (let i = 0; i < num_qubits; i++) {
        // Create target option
        const option = document.createElement('option');
        option.value = i;
        option.text = `${i}`;
        target.appendChild(option);

        // Create visual qubit selector
        const qubitSelector = document.createElement('div');
        qubitSelector.className = 'qubit-selector';
        qubitSelector.textContent = i;
        qubitSelector.dataset.qubitIndex = i;
        qubitSelector.disabled = true; // Initially disabled
        
        // Add click event listener for selection
        qubitSelector.addEventListener('click', function() {
            if (!this.disabled) {
                const gate = document.getElementById('gate').value;
                const target = parseInt(document.getElementById('target').value);
                const currentQubitIndex = parseInt(this.dataset.qubitIndex);
                
                // Prevent selecting target qubit as control
                if (currentQubitIndex === target) {
                    return; // Don't allow selection
                }
                
                if (control_gates.includes(gate)) {
                    // For single control gates, only allow one selection
                    if (this.classList.contains('selected')) {
                        // If already selected, deselect it
                        this.classList.remove('selected');
                    } else {
                        // If not selected, deselect all others and select this one
                        const allSelectors = document.querySelectorAll('#controls-container .qubit-selector');
                        allSelectors.forEach(selector => selector.classList.remove('selected'));
                        this.classList.add('selected');
                    }
                } else if (multiple_control_gates.includes(gate)) {
                    // For multiple control gates, allow multiple selections
                    this.classList.toggle('selected');
                }
            }
        });
        
        controlsContainer.appendChild(qubitSelector);
    }
}

async function update_visualization() {
    const target = parseInt(document.getElementById('target').value);
    const gate = document.getElementById('gate').value;
    const angleRadians = document.getElementById('angle').value;
    
    // Validate angle input for gates that require it
    if (degree_gates.includes(gate)) {
        const angleNum = parseFloat(angleRadians);
        if (angleRadians === '' || isNaN(angleNum)) {
            alert("Please enter a valid value for angle (radians).\nIt must be a number.");
            return;
        }
    }
    
    // Convert radians to degrees for the quantum circuit library
    const angleDegrees = angleRadians === '' ? '' : (parseFloat(angleRadians) * 180 / Math.PI).toString();
    
    // Retrieve selected control qubits from the visual selectors
    const selectedSelectors = document.querySelectorAll('#controls-container .qubit-selector.selected');
    const controls = Array.from(selectedSelectors).map(selector => parseInt(selector.dataset.qubitIndex));

    if (!qc) {
        console.error('Quantum circuit (qc) is not defined.');
        return;
    }

    apply_gate(qc, target, gate, angleDegrees, controls);

    document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';
    draw_circuit(circuit_to_string(qc), document.getElementById('circuit'));

    document.getElementById('table_title').innerHTML = '<u>State</u>';
    const state = get_state(qc);
    await state_table_to_html(state, 'table');
}

async function update_qc() {
    const num_qubits = parseInt(document.getElementById('num_qubits').value);

    qc = create_circuit(num_qubits);

    update_target_options(num_qubits); // Update the target dropdown options
    
    // Reset gate selection to H gate when qubit count changes
    document.getElementById('gate').value = 'h';
    
    // Update the UI to reflect the new gate selection
    update_angle_and_controls();

    document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';
    draw_circuit(circuit_to_string(qc), document.getElementById('circuit'));
    document.getElementById('table_title').innerHTML = '<u>State</u>';
    const state = get_state(qc);
    await state_table_to_html(state, 'table');
}

function update_angle_and_controls() {
    const gate = document.getElementById('gate').value;
    const angleInput = document.getElementById('angle');
    const controlsInputGroup = document.getElementById('controls-input-group');
    const controlsContainer = document.getElementById('controls-container');
    
    // Show/hide angle input
    if (degree_gates.includes(gate)) {
        angleInput.disabled = false;
        angleInput.parentElement.style.display = '';
    } else {
        angleInput.disabled = true;
        angleInput.value = '';
        angleInput.parentElement.style.display = 'none';
    }

    // Show/hide and enable/disable visual qubit selectors
    const qubitSelectors = controlsContainer.querySelectorAll('.qubit-selector');
    
    if (multiple_control_gates.includes(gate)) {
        controlsInputGroup.style.display = '';
        qubitSelectors.forEach(selector => {
            selector.disabled = false;
            selector.classList.remove('disabled');
        });
        // Update visual states only when controls are shown
        update_qubit_selector_states();
    } else if (control_gates.includes(gate)) {
        controlsInputGroup.style.display = '';
        qubitSelectors.forEach(selector => {
            selector.disabled = false;
            selector.classList.remove('disabled');
        });
        // Update visual states only when controls are shown
        update_qubit_selector_states();
    } else {
        controlsInputGroup.style.display = 'none';
        qubitSelectors.forEach(selector => {
            selector.disabled = true;
            selector.classList.add('disabled');
            selector.classList.remove('selected');
        });
    }
}

// Function to update visual state of qubit selectors
function update_qubit_selector_states() {
    const gate = document.getElementById('gate').value;
    const target = parseInt(document.getElementById('target').value);
    const qubitSelectors = document.querySelectorAll('#controls-container .qubit-selector');
    
    qubitSelectors.forEach(selector => {
        const qubitIndex = parseInt(selector.dataset.qubitIndex);
        
        // Clear any target highlighting
        selector.classList.remove('target-qubit');
        
        // If this is the target qubit, mark it visually
        if (qubitIndex === target) {
            selector.classList.add('target-qubit');
        }
        
        // If this is a single control gate and target is selected as control, deselect it
        if (control_gates.includes(gate) && qubitIndex === target && selector.classList.contains('selected')) {
            selector.classList.remove('selected');
        }
    });
}

// Reset function to clear circuit and reset interface
async function reset_circuit() {
    // Reset gate selection to H
    document.getElementById('gate').value = 'h';
    
    // Reset target to 0
    document.getElementById('target').value = '0';
    
    // Clear angle input
    document.getElementById('angle').value = '';
    
    // Clear all control selections
    const qubitSelectors = document.querySelectorAll('#controls-container .qubit-selector');
    qubitSelectors.forEach(selector => {
        selector.classList.remove('selected');
    });
    
    // Update the interface state
    update_angle_and_controls();
    update_qubit_selector_states();
    
    // Create a fresh circuit
    await update_qc();
}

update_qc();
update_angle_and_controls();

document.getElementById('apply').addEventListener('click', update_visualization);
document.getElementById('reset').addEventListener('click', reset_circuit);
document.getElementById('num_qubits').addEventListener('change', function() {
    update_qc();
});
document.getElementById('gate').addEventListener('change', update_angle_and_controls);
document.getElementById('target').addEventListener('change', update_qubit_selector_states);
document.addEventListener('DOMContentLoaded', update_angle_and_controls);