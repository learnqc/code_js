import * as math from 'mathjs';
import { is_close } from '../utils/common.js';

function is_power_of_two(m) {
    return Math.ceil(Math.log2(m)) === Math.floor(Math.log2(m));
}

function prepare_state(...a) {
    const state = [...a];
    if (!is_power_of_two(state.length)) {
        throw new Error("Length of state must be a power of two");
    }
    const norm = state.reduce((acc, val) => acc + math.pow(math.abs(val), 2), 0);
    if (!is_close(norm, 1.0)) {
        throw new Error("State is not normalized");
    }
    return state;
}

function init_state(n) {
    const state = Array(Math.pow(2, n)).fill(null).map(() => math.complex(0, 0));

    state[0] = math.complex(1, 0);

    return state;
}

function is_bit_set(m, k) {
    return (m & (1 << k)) !== 0;
}

function* pair_generator_check_digit(n, t) {
    const distance = 2 ** t;
    for (let k0 = 0; k0 < 2 ** n; k0++) {
        if (!is_bit_set(k0, t)) {
            const k1 = k0 + distance;
            yield [k0, k1];
        }
    }
}

function* pair_generator_concatenate(n, t) {
    const distance = 2 ** t;
    const suffix_count = 2 ** t;
    const prefix_count = 2 ** (n - t - 1);

    for (let p = 0; p < prefix_count; p++) {
        for (let s = 0; s < suffix_count; s++) {
            const k0 = p * suffix_count * 2 + s;
            const k1 = k0 + distance;
            yield [k0, k1];
        }
    }
}

function* pair_generator_pattern(n, t) {
    const distance = 2 ** t;
    for (let j = 0; j < 2 ** (n - t - 1); j++) {
        for (let k0 = 2 * j * distance; k0 < (2 * j + 1) * distance; k0++) {
            const k1 = k0 + distance;
            yield [k0, k1];
        }
    }
}

const pair_generator = pair_generator_concatenate;


function process_pair(state, gate, k0=0, k1=1) {
    const x = state[k0];
    const y = state[k1];
    state[k0] = math.add(math.multiply(x, gate[0][0]), math.multiply(y, gate[0][1]));
    state[k1] = math.add(math.multiply(x, gate[1][0]), math.multiply(y, gate[1][1]));
}

function transform(state, t, gate) {
    const n = Math.log2(state.length);
    for (const [k0, k1] of pair_generator(n, t)) {
        if (k1 >= state.length) {
            continue;
        }
        process_pair(state, gate, k0, k1);
    }
}


function c_transform(state, c, t, gate) {
    const n = Math.log2(state.length);
    for (const [k0, k1] of Array.from(pair_generator(n, t)).filter(p => is_bit_set(p[0], c))) {
        process_pair(state, gate, k0, k1);
    }
}

function mc_transform(state, cs, t, gate) {
    if (cs.includes(t)) {
        throw new Error("Target qubit cannot be one of the control qubits");
    }
    const n = Math.log2(state.length);
    for (const [k0, k1] of Array.from(pair_generator(n, t)).filter(p => cs.every(c => is_bit_set(p[0], c)))) {
        process_pair(state, gate, k0, k1);
    }
}

function measure(state, shots) {
    const probabilities = state.map(c => math.pow(math.abs(c), 2));
    const samples = Array(shots).fill(0).map(() => math.random(probabilities.length));
    const counts = {};
    samples.forEach(s => {
        counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
}

function transform_u(state, U, t) {
    if (U.length !== U[0].length) {
        throw new Error("Matrix U must be square");
    }
    const m = Math.log2(U.length);
    const n = Math.log2(state.length);

    const vec = Array(2 ** m).fill(0);

    for (let suffix = 0; suffix < 2 ** t; suffix++) {
        for (let prefix = 0; prefix < 2 ** (n - m - t); prefix++) {
            for (let target = 0; target < 2 ** m; target++) {
                const k = prefix * 2 ** (t + m) + target * 2 ** t + suffix;
                vec[target] = state[k];
            }

            const vec_out = math.multiply(U, vec);

            for (let target = 0; target < 2 ** m; target++) {
                const k = prefix * 2 ** (t + m) + target * 2 ** t + suffix;
                state[k] = vec_out[target];
            }
        }
    }
}

function c_transform_u(state, U, c, t) {
    if (U.length !== U[0].length) {
        throw new Error("Matrix U must be square");
    }
    const m = Math.log2(U.length);
    const n = Math.log2(state.length);

    const vec = Array(2 ** m).fill(0);

    for (let suffix = 0; suffix < 2 ** t; suffix++) {
        for (let prefix = 0; prefix < 2 ** (n - m - t); prefix++) {
            const targets = [];
            for (let idx = 0; idx < 2 ** m; idx++) {
                const k = prefix * 2 ** (t + m) + idx * 2 ** t + suffix;
                if (is_bit_set(k, c)) {
                    vec[idx] = state[k];
                    targets.push(k);
                }
            }

            const vec_out = math.multiply(U, vec);

            for (let idx = 0; idx < 2 ** m; idx++) {
                const k = prefix * 2 ** (t + m) + idx * 2 ** t + suffix;
                if (is_bit_set(k, c)) {
                    state[k] = vec_out[idx];
                }
            }
        }
    }
}

export {
    is_power_of_two,
    prepare_state,
    init_state,
    is_bit_set,
    pair_generator_check_digit,
    pair_generator_concatenate,
    pair_generator_pattern,
    process_pair,
    transform,
    c_transform,
    mc_transform,
    measure,
    transform_u,
    c_transform_u
};
