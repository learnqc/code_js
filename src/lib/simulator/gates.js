import * as math from 'mathjs';

const x = [
    [0, 1],
    [1, 0]
];

const z = [
    [1, 0],
    [0, -1]
];

function phase(theta) {
    return [
        [1, 0],
        [0, math.complex(Math.cos(theta), Math.sin(theta))]
    ];
}

const h = [
    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
    [1 / Math.sqrt(2), -1 / Math.sqrt(2)]
];

function rz(theta) {
    return [
        [math.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],
        [0, math.complex(Math.cos(theta / 2), Math.sin(theta / 2))]
    ];
}

const y = [
    [0, math.complex(0, -1)],
    [math.complex(0, 1), 0]
];

function rx(theta) {
    return [
        [Math.cos(theta / 2), math.complex(0, -Math.sin(theta / 2))],
        [math.complex(0, -Math.sin(theta / 2)), Math.cos(theta / 2)]
    ];
}

function ry(theta) {
    return [
        [Math.cos(theta / 2), -Math.sin(theta / 2)],
        [Math.sin(theta / 2), Math.cos(theta / 2)]
    ];
}

export {
    x,
    z,
    phase,
    h,
    rz,
    y,
    rx,
    ry
};
