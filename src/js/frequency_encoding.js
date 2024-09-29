import { encode_frequency } from '../lib/algos/frequency_encoding.js';
import { circuit_to_string, draw_circuit, state_table_to_html } from '../lib/utils/common.js';

// Function to update the circuit and state table
async function update_visualization() {
    const qubits = parseInt(document.getElementById('qubits').value);
    const frequency = parseFloat(document.getElementById('frequency').value);

    const qc = encode_frequency(qubits, frequency);

    document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';
    document.getElementById('table_title').innerHTML = '<u>State</u>';

    draw_circuit(circuit_to_string(qc), document.getElementById('circuit'));
    await state_table_to_html(qc.reports["iqft"][2], 'table');
}

// Initial setup on page load
update_visualization();

// Event listener for the Apply button
document.getElementById('apply').addEventListener('click', update_visualization);