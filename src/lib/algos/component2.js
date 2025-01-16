import { LitElement, html, css } from 'lit';
import * as math from 'mathjs';

const gates = {
  X: [
    [0, 1],
    [1, 0],
  ],
  Z: [
    [1, 0],
    [0, -1],
  ],
  Y: [
    [0, math.complex(0, -1)],
    [math.complex(0, 1), 0],
  ],
  H: [
    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
    [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
  ],
  Phase: (theta) => [
    [1, 0],
    [0, math.complex(Math.cos(theta), Math.sin(theta))],
  ],
  RZ: (theta) => [
    [math.complex(Math.cos(theta / 2), -Math.sin(theta / 2)), 0],
    [0, math.complex(Math.cos(theta / 2), Math.sin(theta / 2))],
  ],
};

function complex_to_rgb(c, ints = false) {
  const a = math.re(c);
  const b = math.im(c);
  const magnitude = Math.sqrt(a * a + b * b);
  let hue = Math.atan2(b, a) / Math.PI * 180;

  if (hue < 0) {
    hue += 360;
  }

  const hueIndex = Math.round(hue);
  const boundedIndex = Math.min(hueIndex, 255);

  const rgb = [hueIndex, 200, 255]; // Adjust colors as needed

  if (ints) {
    return rgb;
  } else {
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
  }
}

function* pair_generator(n, t) {
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

function process_pair(state, gate, k0 = 0, k1 = 1) {
  const x = state[k0];
  const y = state[k1];
  state[k0] = math.add(math.multiply(x, gate[0][0]), math.multiply(y, gate[0][1]));
  state[k1] = math.add(math.multiply(x, gate[1][0]), math.multiply(y, gate[1][1]));
}

export class QuantumStateViewer extends LitElement {
  static styles = css`
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th,
    td {
      border: 1px solid #ddd;
      text-align: center;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
    }
    .amplitude-bar {
      display: flex;
      align-items: center;
    }
    .bar {
      height: 10px;
    }
    .buttons {
      margin: 10px 0;
    }
    button,
    select,
    input {
      margin-right: 10px;
      padding: 10px 15px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .highlight {
      background-color: lightyellow;
    }
    .slider-container {
      margin: 20px 0;
    }
    .slider {
      width: 100%;
      max-width: 300px;
    }
  `;

  static properties = {
    state: { type: Array },
    intermediateStates: { type: Array },
    gate: { type: String },
    gateMatrix: { type: Array },
    targetQubit: { type: Number },
    processingPair: { type: Array },
    theta: { type: Number },
    delay: { type: Number }, // Dynamic delay in milliseconds
  };

  constructor() {
    super();
    this.state = [];
    this.intermediateStates = [];
    this.gate = 'X';
    this.targetQubit = 0;
    this.processingPair = [];
    this.theta = Math.PI / 4; // Default angle for Phase and RZ gates
    this.delay = 1000; // Default delay
    this.initializeState();
  }

  initializeState() {
    const size = 8; // 3 qubits = 2^3 = 8 states
    this.state = Array.from({ length: size }, () =>
      math.complex(Math.random() - 0.5, Math.random() - 0.5)
    );
    const norm = math.sqrt(
      this.state.reduce((acc, val) => math.add(acc, math.pow(math.abs(val), 2)), 0)
    );
    this.state = this.state.map((amp) => math.divide(amp, norm));
    this.intermediateStates = [this.state.slice()]; // Store initial state
    this.processingPair = [];
  }

  async applyGate() {
    const n = Math.log2(this.state.length); // Number of qubits
    const generator = pair_generator(n, this.targetQubit);

    this.gateMatrix =
      typeof gates[this.gate] === 'function'
        ? gates[this.gate](this.theta)
        : gates[this.gate];

    for (const [k0, k1] of generator) {
      if (k1 >= this.state.length) continue;

      // Highlight the current pair
      this.processingPair = [k0, k1];
      this.requestUpdate();
      await new Promise((resolve) => setTimeout(resolve, this.delay / 2)); // Highlight delay

      // Process the current pair
      process_pair(this.state, this.gateMatrix, k0, k1);

      // Store a copy of the state after processing the pair
      this.intermediateStates.push(this.state.slice());

      // Trigger re-render
      this.requestUpdate();
      await new Promise((resolve) => setTimeout(resolve, this.delay)); // Post-processing delay
    }

    this.processingPair = []; // Clear highlights after processing
  }

  renderTable(state, title) {
    return html`
      <h4>${title}</h4>
      <table>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Binary</th>
            <th>Amplitude</th>
            <th>Direction</th>
            <th>Magnitude</th>
            <th>Amplitude Bar</th>
          </tr>
        </thead>
        <tbody>
          ${state.map((amplitude, index) => {
            const magnitude = math.abs(amplitude).toFixed(4);
            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);
            const rgb = complex_to_rgb(amplitude, true);
            const isHighlighted = this.processingPair.includes(index);
            return html`
              <tr class="${isHighlighted ? 'highlight' : ''}">
                <td>${index}</td>
                <td>${index.toString(2).padStart(Math.log2(state.length), '0')}</td>
                <td>${math.format(amplitude, { notation: 'fixed', precision: 4 })}</td>
                <td>${direction}°</td>
                <td>${magnitude}</td>
                <td>
                  <div class="amplitude-bar">
                    <div
                      class="bar"
                      style="width: ${magnitude * 100}%; background-color: rgb(${rgb.join(',')});"
                    ></div>
                  </div>
                </td>
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  render() {
    return html`
      <div>
        <h3>Quantum State Viewer</h3>
        <div>
          ${this.renderTable(
            this.intermediateStates[this.intermediateStates.length - 1],
            `Current State`
          )}
        </div>
        <div class="buttons">
          <label>
            Gate:
            <select @change="${(e) => (this.gate = e.target.value)}">
              ${Object.keys(gates).map(
                (key) => html`<option value="${key}">${key}</option>`
              )}
            </select>
          </label>
          <label>
            Target Qubit:
            <input
              type="number"
              min="0"
              max="${Math.log2(this.state.length) - 1}"
              value="${this.targetQubit}"
              @input="${(e) => (this.targetQubit = Number(e.target.value))}"
            />
          </label>
          <button @click="${this.applyGate}">
            Apply Gate
          </button>
          <button @click="${this.initializeState}">Reset</button>
        </div>
        ${['Phase', 'RZ'].includes(this.gate)
          ? html`
              <label>
                θ (radians):
                <input
                  type="number"
                  step="0.1"
                  .value="${this.theta}"
                  @input="${(e) => (this.theta = Number(e.target.value))}"
                />
              </label>
            `
          : ''}
        <div class="slider-container">
          <label>
            Visualization Delay:
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              .value="${this.delay}"
              @input="${(e) => (this.delay = Number(e.target.value))}"
              class="slider"
            />
            ${this.delay} ms
          </label>
        </div>
      </div>
    `;
  }
}

customElements.define('quantum-state-viewer', QuantumStateViewer);
