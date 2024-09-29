import { build_polynomial_circuit, terms_from_poly } from '../lib/algos/function_encoding.js';
import { circuit_to_string, draw_circuit, grid_state_to_html } from '../lib/utils/common.js';


async function update_visualization() {
    const input_qubits = parseInt(document.getElementById('input_qubits').value);
    const output_qubits = parseInt(document.getElementById('output_qubits').value);
    const poly = document.getElementById('poly').value;

    const isPoly = document.getElementById('variable_type').value === 'integer'; 
    const showNegative = document.getElementById('show_negative').checked; 

    const terms = terms_from_poly(poly, input_qubits, isPoly);
    const qc = build_polynomial_circuit(input_qubits, output_qubits, terms)

    document.getElementById('circuit_title').innerHTML = '<u>Circuit</u>';
    draw_circuit(circuit_to_string(qc), document.getElementById('circuit'));

    document.getElementById('table_title').innerHTML = '<u>State</u>';
    console.log(`length of qc.reports: ${Object.keys(qc.reports).length}`);
    console.log(qc.reports);
    document.getElementById('table').innerHTML = await grid_state_to_html(qc.reports['qpe'][2], input_qubits, showNegative, true);
}

update_visualization();

document.getElementById('apply').addEventListener('click', update_visualization);

document.getElementById('variable_type').addEventListener('change', function() {
    const polyInput = document.getElementById('poly');
    if (this.value === 'binary') {
        polyInput.value = 'x0 + x1';
    } else {
        polyInput.value = 'x^2'; 
    }
});