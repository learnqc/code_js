import {QuantumCircuit, QuantumRegister} from "../simulator/circuit.js";

function encode_frequency(n, v) {
    const q = new QuantumRegister(n);
    const qc = new QuantumCircuit(q);

    for (let j = 0; j < n; j++) {
        qc.h(q.get(j));
        qc.p(Math.PI * Math.pow(2, -j) * v, q.get(j));
    }

    qc.report('signal');
    qc.append_iqft(q, true, false);
    qc.report('iqft');

    return qc;
}

export {
    encode_frequency
};