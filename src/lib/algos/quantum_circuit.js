import {QuantumCircuit, QuantumRegister} from "../simulator/circuit.js";

const no_arg_gates = ['h', 'x', 'y', 'z'];
const arg_gates = ['p', 'rx', 'ry', 'rz'];
const control_gates = ['cx', 'cy', 'cz', 'cp', 'cry'];
const multiple_control_gates = ['mcx', 'mcp'];
const gates = no_arg_gates.concat(arg_gates, control_gates, multiple_control_gates);
const degree_gates = ['p', 'rx', 'ry', 'rz', 'cp', 'cry', 'mcp'];

function add_gate(qc, cs, target, gate, angle = null) {
    console.log(cs);
    if (no_arg_gates.includes(gate)) {
        if (cs.length !== 0) {
            throw new Error(`Gate ${gate} should not have control qubits.`);
        }
        qc[gate](parseInt(target));
    }
    else if (arg_gates.includes(gate) && angle !== null) {
        if (cs.length !== 0) {
            throw new Error(`Gate ${gate} should not have control qubits.`);
        }
        qc[gate](angle, parseInt(target));
    }
    else if (control_gates.includes(gate)) {
        if (cs.length !== 1) {
            throw new Error(`Gate ${gate} requires exactly 1 control qubit.`);
        }
        qc[gate](parseInt(cs[0]), parseInt(target));
    }
    else if (multiple_control_gates.includes(gate) && angle !== null) {
        if (cs.length < 2) {
            throw new Error(`Gate ${gate} requires at least 2 control qubits.`);
        }
        if(gate == "mcx") {
            qc.mcx(cs, target);
        } else {
            qc[gate](angle, cs.map(c => parseInt(c)), parseInt(target));
        }
    }
    else {
        console.error(`Invalid gate or missing parameters for gate: ${gate}`);
    }
}

function create_circuit(qubits) {
    const q = new QuantumRegister(qubits);
    const qc = new QuantumCircuit(q);
    return qc;
}

function apply_gate(qc, target, gate, angle = null, controls = [], report = true) {
    console.log(controls);
    gate = gate.toLowerCase();
    const argGates = ['rx', 'ry', 'rz', 'p', 'cp', 'cry', 'mcp'];  

    if (argGates.includes(gate) && angle === null) {
        throw new Error("Angle is required for argument gates.");
    }
    
    if (argGates.includes(gate)) {
        angle = angle / 180 * Math.PI;
    } else {
        angle = null;
    }
    
    add_gate(qc, controls, target, gate, angle);
    
    if (report) {
        const len = Object.keys(qc.reports).length;
        qc.report(`Step ${len + 1}`);
    }

    

}

function last_step(qc) {
    return qc.reports.length;
}

function get_state(qc) {
    let state;
    const len = Object.keys(qc.reports).length;
    if (len > 0) {
        state = qc.reports[`Step ${len}`][2];
    } else {
        state = qc.state;
    }

    return state;
}

export { add_gate, create_circuit, apply_gate, last_step, get_state, gates, arg_gates, no_arg_gates, control_gates, multiple_control_gates, degree_gates };



