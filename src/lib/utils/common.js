import * as math from 'mathjs';
import * as d3 from 'd3';
import * as qviz from '@microsoft/quantum-viz.js';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

function is_close_float(a, b, rtol = 1e-5, atol = 1e-8) {
    return Math.abs(a - b) < atol + rtol * Math.abs(b);
}

function is_close(a, b) {
    if (typeof a === 'number') {
        a = math.complex(a, 0);
    }

    if (typeof b === 'number') {
        b = math.complex(b, 0);
    }

    return is_close_float(math.re(a), math.re(b)) && is_close_float(math.im(a), math.im(b));
}

function all_close(state1, state2) {
    for (let i = 0; i < state1.length; i++) {
        if (!is_close(state1[i], state2[i])) {
            return false;
        }
    }
    return true;
}

let colormapCache = null;
async function loadColormap() {
    if (!colormapCache) {
        const response = await fetch('./colormap.json');
        colormapCache = await response.json();
    }
    return colormapCache;
}

async function complex_to_rgb(c, ints = false) {
    const colormap = await loadColormap();  
    const a = math.re(c);
    const b = math.im(c);

    const magnitude = Math.sqrt(a * a + b * b);
    let hue = Math.atan2(b, a) / Math.PI * 180;

    if (hue < 0) {
        hue += 360;
    }

    const hueIndex = Math.round(hue);
    const boundedIndex = Math.min(hueIndex, colormap.length - 1);

    const rgb = colormap[boundedIndex];

    if (ints) {
        return rgb;  
    } else {
        return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
    }
}

async function state_table_to_html(state, id, decimals = 4, symbol = '█') {
    const n = Math.log2(state.length);
    const roundState = state.map(c => math.complex(
        parseFloat(math.re(c).toFixed(decimals)),
        parseFloat(math.im(c).toFixed(decimals))
    ));

    const maxProbability = Math.max(...roundState.map(c => math.pow(math.abs(c), 2)));

    const tableData = await Promise.all(roundState.map(async (c, k) => {
        const direction = Math.round(Math.atan2(math.im(c), math.re(c)) * 180 / Math.PI * 100) / 100;
        const amplitude = `${(math.re(c) >= 0 ? ' ' : '-')}${Math.abs(math.re(c)).toFixed(decimals)} ${
            math.im(c) >= 0 ? '+ ' : '- '}i${Math.abs(math.im(c)).toFixed(decimals)}`;

        const magnitude = math.abs(c).toFixed(decimals);
        const directionStr = magnitude > 0
            ? `${(direction >= 0 ? ' ' : '-')}${Math.floor(Math.abs(direction))}.${(Math.abs(direction) % 1).toFixed(2).substring(2)}°`
            : '';

        const rgb = await complex_to_rgb(c, true);
        const probability = math.pow(math.abs(c), 2).toFixed(decimals);

        let amplitudeBar = '';
        if (probability > 0) {
            const normalizedBarLength = Math.round((probability / maxProbability) * 50); // Reduced to 50 max
            amplitudeBar = `<span style="color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}); max-width: 50px; display: inline-block; overflow: hidden; text-align: left;">${symbol.repeat(Math.max(1, normalizedBarLength))}</span>`;
        }

        return {
            outcome: k,
            binary: k.toString(2).padStart(n, '0'),
            amplitude: amplitude,
            magnitude: magnitude,
            direction: directionStr,
            amplitudeBar: amplitudeBar,
            probability: probability,
        };
    }));

    let htmlTable = `
        <style>
            table {
                max-width: 100%;
                border-collapse: collapse;
                margin: 25px 0;
                font-size: 0.9em;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            thead tr {
                background-color: #3F72AF;
                color: #ffffff;
                text-align: left;
                font-weight: bold;
            }
            th, td {
                padding: 12px 15px;
                text-align: left; /* Left aligned */
            }
            tbody tr {
                border-bottom: 1px solid #DBE2EF;
            }
            tbody tr:nth-of-type(even) {
                background-color: #F9F7F7;
            }
            tbody tr:last-of-type {
                border-bottom: 2px solid #3F72AF;
            }
            tbody tr:hover {
                background-color: #DBE2EF;
            }
        </style>

        <table>
            <thead>
                <tr>
                    <th>Outcome</th>
                    <th>Binary</th>
                    <th>Amplitude</th>
                    <th>Magnitude</th>
                    <th>Direction</th>
                    <th>Amplitude Bar</th>
                    <th>Probability</th>
                </tr>
            </thead>
            <tbody>
    `;

    tableData.forEach(row => {
        htmlTable += `
            <tr>
                <td>${row.outcome}</td>
                <td>${row.binary}</td>
                <td>${row.amplitude}</td>
                <td>${row.magnitude}</td>
                <td>${row.direction}</td>
                <td>${row.amplitudeBar}</td>
                <td>${row.probability}</td>
            </tr>
        `;
    });

    htmlTable += `
            </tbody>
        </table>
    `;

    document.getElementById(id).innerHTML = htmlTable;
}


async function grid_state_to_html(state, m = 1, neg = false, showProbs = false, symbol = '\u2588') {
    const n = Math.log2(state.length) - m;
    const cols = 2 ** m;
    const rows = Math.floor(state.length / cols);

    let htmlTable = `
        <style>
            table {
                max-width: 100%;
                border-collapse: collapse;
                margin: 25px 0;
                font-size: 0.9em;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                text-align: center;
            }
            thead tr {
                background-color: #3F72AF;
                color: #ffffff;
                font-weight: bold;
            }
            th, td {
                padding: 12px 15px;
                white-space: nowrap; /* Ensure text doesn't wrap */
                text-overflow: ellipsis; /* Add ellipsis if text is too long */
            }
            tbody tr {
                border-bottom: 1px solid #DBE2EF;
            }
            tbody tr:nth-of-type(even) {
                background-color: #F9F7F7;
            }
            tbody tr:last-of-type {
                border-bottom: 2px solid #3F72AF;
            }
            tbody tr:hover {
                background-color: #DBE2EF;
            }
        </style>
    `;

    htmlTable += '<table><thead><tr><th></th>';

    for (let l = 0; l < cols; l++) {
        htmlTable += `<th>${l} = ${l.toString(2).padStart(m, '0')}</th>`;
    }
    htmlTable += '</tr></thead><tbody>';

    const rangeFunc = neg
        ? (x) => [...Array(x / 2).keys()].reverse().concat([...Array(x / 2).keys()].map(i => i + x / 2).reverse())
        : (x) => [...Array(x).keys()].reverse();

    for (let k of rangeFunc(rows)) {
        const rowLabel = neg
            ? `${(k < rows / 2 ? k : k - rows)} = ${k.toString(2).padStart(n, '0')}`
            : `${k} = ${k.toString(2).padStart(n, '0')}`;

        let row = `<tr><td>${rowLabel}</td>`;

        for (let l = 0; l < cols; l++) {
            const index = k * cols + l;
            const re = state[index].re !== undefined ? state[index].re : state[index];
            const im = state[index].im !== undefined ? state[index].im : 0;
            const magnitude = Math.sqrt(re * re + im * im);
            const complexValue = math.complex(re, im);
            const color = await complex_to_rgb(complexValue, true);
            const magnitudeForDisplay = Math.floor(magnitude * 10);
            const probability = showProbs && magnitude > 0.01 ? (magnitude ** 2).toFixed(2) : '';

            row += `<td><font style="color: rgb(${color[0]}, ${color[1]}, ${color[2]});">${symbol.repeat(magnitudeForDisplay)}</font>&nbsp;${probability}</td>`;
        }

        htmlTable += row + '</tr>';
    }

    htmlTable += '</tbody></table>';

    return htmlTable;
}



function circuit_to_string(qc) {
    const qs = Array.from({ length: qc.regs.reduce((a, b) => a + b, 0) }, (_, i) => ({ id: i }));

    const ops = qc.transformations.map(tr => ({
        gate: tr.arg === undefined ? tr.name.toUpperCase() : `${tr.name.toUpperCase()}(${Math.round(tr.arg * 100) / 100})`,
        isControlled: tr.controls.length > 0,
        controls: tr.controls.map(c => ({ qId: c })),
        targets: [{ qId: tr.target }]
    }));

    const circ = { qubits: qs, operations: ops };

    return JSON.stringify(circ).replace(/"true"/g, 'true').replace(/"false"/g, 'false');
}

function draw_circuit(circuit_string, circuit_div) {
    circuit_string = JSON.parse(circuit_string);
    if (circuit_div != null) {
        qviz.draw(circuit_string, circuit_div, qviz.STYLES['Default'])
    }
}

export {
    is_close_float,
    is_close,
    all_close,
    complex_to_rgb,
    circuit_to_string,
    draw_circuit,
    grid_state_to_html,
    state_table_to_html
};