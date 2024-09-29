import * as math from 'mathjs';

function argmax(array) {
    return array.indexOf(Math.max(...array));
}

function asArray(l) {
    return Array.isArray(l) ? l : Array.from(l);
}

function shape(U) {
    return math.size(U)._data;
}

function dagger(U) {
    return math.transpose(math.conj(U));
}

function eig(U) {
    return math.eigs(U);
}

// function rvs(dim) {
//     let random_state = Math.random;
//     let H = math.identity(dim)._data;
//     let D = Array(dim).fill(1);

//     for (let n = 1; n < dim; n++) {
//         let x = Array(dim - n + 1).fill(0).map(() => math.randomNormal());
//         D[n - 1] = Math.sign(x[0]);
//         x[0] -= D[n - 1] * Math.sqrt(math.sum(math.square(x)));
        
//         let Hx = math.subtract(
//             math.identity(dim - n + 1)._data,
//             math.multiply(2, math.divide(math.multiply(x, math.transpose(x)), math.sum(math.square(x))))
//         );

//         let mat = math.identity(dim)._data;
//         for (let i = n - 1; i < dim; i++) {
//             for (let j = n - 1; j < dim; j++) {
//                 mat[i][j] = Hx[i - (n - 1)][j - (n - 1)];
//             }
//         }

//         H = math.multiply(H, mat);
//     }

//     D[dim - 1] = Math.pow(-1, 1 - (dim % 2)) * D.reduce((a, b) => a * b, 1);
    
//     H = math.multiply(D, math.transpose(H));
    
//     return H;
// }

function random_transformation(n) {
    let U = rvs(Math.pow(2, n));

    function fDirect(state) {
        if (state.length !== Math.pow(2, n)) {
            throw new Error('State vector length must be 2^n');
        }
        let s = math.multiply(U, state);
        for (let k = 0; k < s.length; k++) {
            state[k] = s[k];
        }
    }

    function f_inverse(state) {
        if (state.length !== Math.pow(2, n)) {
            throw new Error('State vector length must be 2^n');
        }
        let s = math.multiply(dagger(U), state);
        for (let k = 0; k < s.length; k++) {
            state[k] = s[k];
        }
    }

    return { fDirect, f_inverse };
}

export {
    argmax,
    asArray,
    shape,
    dagger,
    eig,
    random_transformation
};
