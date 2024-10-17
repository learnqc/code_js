import { add_gate, create_circuit, apply_gate, last_step, get_state, no_arg_gates, control_gates, arg_gates } from '../lib/algos/quantum_circuit.js';
import { QuantumRegister, QuantumCircuit } from '../lib/simulator/circuit.js';
import { circuit_to_string, draw_circuit, state_table_to_tabulator, state_table_to_html } from '../lib/utils/common.js';

// Declare `qc` as a global variable
let qc;

function update_target_options(num_qubits) {
    const target = document.getElementById('target');
    target.innerHTML = ''; // Clear existing options

    for (let i = 0; i < num_qubits; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = `${i}`;
        target.appendChild(option);
    }
}

async function update_visualization() {
    const target = parseInt(document.getElementById('target').value);
    const gate = document.getElementById('gate').value;
    const angle = document.getElementById('angle').value;
    const controlsInput = document.getElementById('controls').value;
    const controls = controlsInput ? controlsInput.split(' ').map(c => parseInt(c.trim())) : [];

    if (!qc) {
        console.error('Quantum circuit (qc) is not defined.');
        return;
    }

    apply_gate(qc, target, gate, angle, controls);

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

    document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';
    draw_circuit(circuit_to_string(qc), document.getElementById('circuit'));
    document.getElementById('table_title').innerHTML = '<u>State</u>';
    const state = get_state(qc);
    await state_table_to_html(state, 'table');
}

function update_angle() {
    const gate = document.getElementById('gate').value;
    const angle = document.getElementById('angle');
    const controlsInput = document.getElementById('controls');

    if (arg_gates.includes(gate) || no_arg_gates.includes(gate)) {
        controlsInput.disabled = true;
    } else {
        controlsInput.disabled = false;
    }

    if (no_arg_gates.includes(gate) || control_gates.includes(gate)) {
        angle.disabled = true;
        angle.value = ''; // Clear the angle value
    } else {
        angle.disabled = false;
    }
}

update_qc();
update_angle();

document.getElementById('apply').addEventListener('click', update_visualization);
document.getElementById('num_qubits').addEventListener('change', update_qc);
document.getElementById('gate').addEventListener('change', update_angle);