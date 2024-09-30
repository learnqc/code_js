import { parse } from "mathjs";
import {QuantumCircuit, QuantumRegister} from "../simulator/circuit.js";

const no_arg_gates = ['h', 'x', 'y', 'z']
const arg_gates = ['p', 'rx', 'ry', 'rz']
const gates = no_arg_gates.concat(arg_gates);

function add_gate(qc, cs, target, gate, angle = null) {
    if (no_arg_gates.includes(gate)) {
        qc[gate](parseInt(target));
    }
    else if (arg_gates.includes(gate) && angle !== null) {
        qc[gate](angle, parseInt(target));
    }
    else {
        console.error(`Invalid gate or missing angle for gate: ${gate}`);
    }
}

function create_circuit(qubits) {
    const q = new QuantumRegister(qubits);
    const qc = new QuantumCircuit(q);
    return qc;
}

function apply_gate(qc, target, gate, angle = null, report = true) {
    gate = gate.toLowerCase();
    const argGates = ['rx', 'ry', 'rz', 'p'];  

    if (argGates.includes(gate)) {
        if (angle === null) {
            throw new Error("Angle is required for argument gates.");
        }
        angle = angle / 180 * Math.PI;
    } else {
        angle = null;
    }
    add_gate(qc, [], target, gate, angle);
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

export { add_gate, create_circuit, apply_gate, last_step, get_state, gates, arg_gates, no_arg_gates };



