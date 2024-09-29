import {
    transform,
    init_state,
    c_transform,
    mc_transform,
    measure,
    transform_u,
    c_transform_u
} from './core.js';

import { x, y, z, h, phase, rx, ry, rz } from './gates.js';
import { dagger } from '../utils/matrix.js';

const pi = Math.PI;

class Swap {
    constructor(i, j) {
        this.name = 'swap';
        this.i = i;
        this.j = j;
    }

    toString() {
        return `swap ${this.i} ${this.j}`;
    }
}

class QuantumRegister {
    constructor(size, shift = 0) {
        this.size = size;
        this.shift = shift;
    }

    get(key) {
        if (typeof key === 'number') {
            if (key < 0) {
                key += this.size;
            }
            if (key >= 0 && key < this.size) {
                return this.shift + key;
            }
        } else if (Array.isArray(key)) {
            return key.map(k => this.get(k));
        }
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.size; i++) {
            yield this.shift + i;
        }
    }

    reverse() {
        return [...this].reverse();
    }

    length() {
        return this.size;
    }
}

class QuantumTransformation {
    constructor(gate, target, controls = [], name = null, arg = null) {
        this.gate = gate;
        this.target = target;
        this.controls = controls;
        this.name = name;
        this.arg = arg;
    }

    toString() {
        return `${this.name} ${this.arg !== null ? Math.round(this.arg * 100) / 100 : ""} ${this.controls} ${this.target}`;
    }

    clone() {
        return new QuantumTransformation(this.gate, this.target, [...this.controls], this.name, this.arg);
    }
}

class QuantumCircuit {
    constructor(...args) {
        let bits = 0;
        let regs = [];

        for (let reg of args) {
            if (typeof reg === 'number') {

                reg = { size: reg, shift: bits };
            } else if (typeof reg.size === 'number') {
  
                reg.shift = bits;
            } else {
                throw new Error('Invalid argument passed to QuantumCircuit constructor');
            }

            bits += reg.size;
            regs.push(reg.size);
        }

        this.state = init_state(bits);
        this.transformations = [];
        this.regs = regs;
        this.reports = {};
    }

    initialize(state) {
        this.state = state;
    }

    x(t) { this.transformations.push(new QuantumTransformation(x, t, [], 'x')); }
    y(t) { this.transformations.push(new QuantumTransformation(y, t, [], 'y')); }
    z(t) { this.transformations.push(new QuantumTransformation(z, t, [], 'z')); }
    h(t) { this.transformations.push(new QuantumTransformation(h, t, [], 'h')); }
    p(theta, t) { this.transformations.push(new QuantumTransformation(phase(theta), t, [], 'p', theta)); }
    rx(theta, t) { this.transformations.push(new QuantumTransformation(rx(theta), t, [], 'rx', theta)); }
    ry(theta, t) { this.transformations.push(new QuantumTransformation(ry(theta), t, [], 'ry', theta)); }
    rz(theta, t) { this.transformations.push(new QuantumTransformation(rz(theta), t, [], 'rz', theta)); }
    cx(c, t) { this.transformations.push(new QuantumTransformation(x, t, [c], 'cx')); }
    cy(c, t) { this.transformations.push(new QuantumTransformation(y, t, [c], 'cy')); }
    cz(c, t) { this.transformations.push(new QuantumTransformation(z, t, [c], 'cz')); }
    cp(theta, c, t) { this.transformations.push(new QuantumTransformation(phase(theta), t, [c], 'cp', theta)); }
    cry(theta, c, t) { this.transformations.push(new QuantumTransformation(ry(theta), t, [c], 'cry', theta)); }
    mcx(cs, t) { this.transformations.push(new QuantumTransformation(x, t, cs, 'mcx')); }
    mcp(theta, cs, t) { this.transformations.push(new QuantumTransformation(phase(theta), t, cs, 'mcp', theta)); }

    measure(shots = 0) {
        const state = this.run();
        const samples = measure(state, shots);
        return { 'state vector': state, 'counts': samples };
    }

    report(name = null) {
        let start_state = init_state(this.regs.reduce((acc, reg) => acc + reg, 0));
        let tr_count = 0;

        for (let report of Object.values(this.reports)) {
            if (report[3] > tr_count) {
                tr_count = report[3];
                start_state = report[2];
            }
        }

        const qc = new QuantumCircuit();
        qc.regs = [...this.regs];
        qc.initialize([...start_state]);
        qc.transformations = this.transformations.slice(tr_count);

        const end_state = qc.run();
        if (!name) {
            name = Object.keys(this.reports).length;
        }
        this.reports[name] = [start_state, this.transformations.slice(tr_count), end_state, this.transformations.length];

        return this.reports[name];
    }

    run() {
        for (let tr of this.transformations) {
            if (tr.name === 'unitary') {
                const cs = tr.controls;
                if (cs.length === 0) {
                    transform_u(this.state, tr.gate, tr.target);
                } else if (cs.length === 1) {
                    c_transform_u(this.state, tr.gate, cs[0], tr.target);
                }
            } else if (tr instanceof Swap) {
                c_transform(this.state, tr.i, tr.j, x);
                c_transform(this.state, tr.j, tr.i, x);
                c_transform(this.state, tr.i, tr.j, x);
            } else {
                const cs = tr.controls;
                if (cs.length === 0) {
                    transform(this.state, tr.target, tr.gate);
                } else if (cs.length === 1) {
                    c_transform(this.state, cs[0], tr.target, tr.gate);
                } else {
                    mc_transform(this.state, cs, tr.target, tr.gate);
                }
            }
        }
        this.transformations = [];
        return this.state;
    }

    swap(i, j) {
        this.transformations.push(new Swap(i, j));
    }

    mswap(targets) {
        for (let j = 0; j < Math.floor(targets.length / 2); j++) {
            this.swap(targets[j], targets[targets.length - 1 - j]);
        }
    }

    inverse() {
        const qs = this.regs.map(size => new QuantumRegister(size));
        const qc = new QuantumCircuit(...qs);

        for (let tr of this.transformations.reverse()) {
            if (tr instanceof Swap) {
                qc.swap(tr.i, tr.j);
            } else if (tr.name === 'unitary') {
                const cs = tr.controls;
                if (cs.length === 0) {
                    qc.unitary(dagger(tr.gate), tr.target);
                } else if (cs.length === 1) {
                    qc.c_unitary(dagger(tr.gate), cs[0], tr.target);
                }
            } else {
                const prefix = tr.controls.length === 0 ? '' : tr.controls.length === 1 ? 'c' : 'mc';
                const method = qc[prefix + tr.name].bind(qc);
                const t = tr.target;

                if (tr.arg) {
                    method(-tr.arg, ...tr.controls, t);
                } else {
                    method(...tr.controls, t);
                }
            }
        }
        return qc;
    }

    qft(targets, swap = true) {
        qft(this, targets, swap);
    }

    append_qft(reg, reversed = false, swap = true) {
        this.append(new QFT(reg.size, reversed, swap), reg);
    }

    iqft(targets, swap = true) {
        iqft(this, targets, swap);
    }

    append_iqft(reg, reversed = false, swap = true) {
        this.append(new IQFT(reg.size, reversed, swap), reg);
    }

    append(circuit, reg) {
        if (reg.size !== circuit.regs.reduce((acc, size) => acc + size, 0)) {
            throw new Error("Mismatched register sizes.");
        }

        for (let tr of circuit.transformations) {
            if (tr instanceof Swap) {
                this.transformations.push(new Swap(reg.shift + tr.i, reg.shift + tr.j));
            } else {
                this.transformations.push(new QuantumTransformation(
                    tr.gate,
                    reg.shift + tr.target,
                    tr.controls.map(c => reg.shift + c),
                    tr.name,
                    tr.arg
                ));
            }
        }
    }

    c_append(circuit, c, reg) {
        if (reg.size <= circuit.regs.reduce((acc, size) => acc + size, 0)) {
            throw new Error("Mismatched register sizes.");
        }

        for (let tr of circuit.transformations) {
            if (tr instanceof Swap) {
                this.transformations.push(new Swap(reg.shift + tr.i, reg.shift + tr.j));
            } else {
                this.transformations.push(new QuantumTransformation(
                    tr.gate,
                    reg.shift + tr.target,
                    [c].concat(tr.controls.map(c => reg.shift + c)),
                    tr.name,
                    tr.arg
                ));
            }
        }
    }

    mc_append(circuit, cs, reg) {
        if (new Set(cs).size !== cs.length) {
            throw new Error("Control qubits must be unique.");
        }

        for (let c of cs) {
            if (c >= reg.shift && c < reg.shift + reg.size) {
                throw new Error("Control qubits must be outside the target register.");
            }
        }

        for (let tr of circuit.transformations) {
            if (tr instanceof Swap) {
                this.transformations.push(new Swap(reg.shift + tr.i, reg.shift + tr.j));
            } else {
                this.transformations.push(new QuantumTransformation(
                    tr.gate,
                    reg.shift + tr.target,
                    cs.concat(tr.controls.map(c => reg.shift + c)),
                    tr.name,
                    tr.arg
                ));
            }
        }
    }

    unitary(U, t) {
        this.transformations.push(new QuantumTransformation(U, t, [], 'unitary'));
    }

    append_u(U, q) {
        if (U.length !== U[0].length || U.length !== 2 ** q.length()) {
            throw new Error("Invalid unitary matrix size.");
        }
        this.unitary(U, q.shift);
    }

    c_unitary(U, c, t) {
        this.transformations.push(new QuantumTransformation(U, t, [c], 'unitary'));
    }

    c_append_u(U, c, q) {
        if (U.length !== U[0].length || U.length !== 2 ** q.length()) {
            throw new Error("Invalid unitary matrix size.");
        }
        this.c_unitary(U, c, q.shift);
    }
}

class QFT extends QuantumCircuit {
    constructor(m, reversed = false, swap = true) {
        super(new QuantumRegister(m));
        const targets = reversed ? [...Array(m).keys()].reverse() : [...Array(m).keys()];
        qft(this, targets, swap);
    }
}

class IQFT extends QuantumCircuit {
    constructor(m, reversed = false, swap = true) {
        super(new QuantumRegister(m));
        const targets = reversed ? [...Array(m).keys()].reverse() : [...Array(m).keys()];
        iqft(this, targets, swap);
    }
}

function qft(qc, targets, swap = true) {
    for (let j = targets.length - 1; j >= 0; j--) {
        qc.h(targets[j]);
        for (let k = j - 1; k >= 0; k--) {
            qc.cp(pi * 2 ** (k - j), targets[j], targets[k]);
        }
    }
    if (swap) {
        qc.mswap(targets);
    }
}

function iqft(qc, targets, swap = true) {
    for (let j = targets.length - 1; j >= 0; j--) {
        qc.h(targets[j]);
        for (let k = j - 1; k >= 0; k--) {
            qc.cp(-pi * 2 ** (k - j), targets[j], targets[k]);
        }
    }
    if (swap) {
        qc.mswap(targets);
    }
}

export { QuantumCircuit, QuantumRegister, QuantumTransformation, Swap, QFT, IQFT };