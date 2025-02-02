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
  RX: (theta) => [
    [Math.cos(theta / 2), math.complex(0, -Math.sin(theta / 2))],
    [math.complex(0, -Math.sin(theta / 2)), Math.cos(theta / 2)],
  ],
  RY: (theta) => [
    [Math.cos(theta / 2), -Math.sin(theta / 2)],
    [Math.sin(theta / 2), Math.cos(theta / 2)],
  ],
};

function complex_to_rgb(c, ints = false) {
  const a = math.re(c);
  const b = math.im(c);
  const magnitude = Math.sqrt(a * a + b * b);
  let hue = (Math.atan2(b, a) / Math.PI) * 180;

  if (hue < 0) {
    hue += 360;
  }

  // Simple mapping to an RGB hue-based color (this can be customized)
  const hueIndex = Math.round(hue);
  const rgb = [hueIndex, 200, 255]; // Adjust as desired

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

function is_bit_set(num, bit) {
  return (num & (1 << bit)) !== 0;
}

function process_pair(state, gate, k0 = 0, k1 = 1) {
  const x = state[k0];
  const y = state[k1];
  state[k0] = math.add(math.multiply(x, gate[0][0]), math.multiply(y, gate[0][1]));
  state[k1] = math.add(math.multiply(x, gate[1][0]), math.multiply(y, gate[1][1]));
}

function c_transform(state, c, t, gate) {
  const n = Math.log2(state.length);
  for (const [k0, k1] of Array.from(pair_generator(n, t)).filter((p) =>
    is_bit_set(p[0], c)
  )) {
    process_pair(state, gate, k0, k1);
  }
}

export class QuantumStateViewer extends LitElement {
  static styles = css`
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
      overflow-x: auto;
    }

    th,
    td {
      border: 1px solid #ddd;
      text-align: center;
      padding: 8px;
      word-wrap: break-word;
      height: 2vh;
    }

    th {
      background-color: #f2f2f2;
    }

    .amplitude-bar {
      display: flex;
      align-items: left;
      height: 100%;
    }

    .bar {
      height: 100%;
    }

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin: 15px 0;
      justify-content: center;
    }

    button,
    select,
    input {
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

    .theta-container {
      margin-top: 10px;
    }

    /* Responsive styles for smaller screens */
    @media (max-width: 600px) {
      table {
        display: block;
        width: 100%;
        overflow-x: auto;
      }

      th,
      td {
        font-size: 0.9rem;
      }

      .buttons {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .theta-container {
        text-align: center;
      }
    }
  `;

  static properties = {
    state: { type: Array },
    intermediateStates: { type: Array },
    processedPairs: { type: Array },

    // Gate-related
    gate: { type: String },
    gateMatrix: { type: Array },

    targetQubit: { type: Number },
    controlQubit: { type: Number },
    controlled: { type: Boolean },

    // For dynamic stepping
    processingPair: { type: Array },
    dynamicSteps: { type: Array },
    stepIndex: { type: Number },

    // Parameterized gates
    theta: { type: Number },

    // Visualization mode
    mode: { type: String },
  };

  constructor() {
    super();
    this.state = [];
    this.intermediateStates = [];
    this.processedPairs = [];
    this.gate = 'X';
    this.targetQubit = 0;
    this.controlQubit = 0;
    this.controlled = false;
    this.processingPair = [];
    this.dynamicSteps = [];
    this.stepIndex = 0;
    this.theta = Math.PI / 4;
    this.mode = 'dynamic';
    this.initializeState();
  }

  initializeState() {
    const size = 8; // Example: 3 qubits => 2^3 = 8 states
    this.state = Array.from({ length: size }, () =>
      math.complex(Math.random() - 0.5, Math.random() - 0.5)
    );

    // Normalize
    const norm = math.sqrt(
      this.state.reduce((acc, val) => math.add(acc, math.pow(math.abs(val), 2)), 0)
    );
    this.state = this.state.map((amp) => math.divide(amp, norm));

    // Reset stored steps for visualization
    this.intermediateStates = [this.state.slice()];
    this.processedPairs = [[]];
    this.processingPair = [];
    this.dynamicSteps = [];
    this.stepIndex = 0;
  }

  // ----------------------------
  // DYNAMIC MODE (step-by-step)
  // ----------------------------
  applyDynamicGate() {
    const n = Math.log2(this.state.length);
    const generator = pair_generator(n, this.targetQubit);

    this.gateMatrix =
      typeof gates[this.gate] === 'function'
        ? gates[this.gate](this.theta)
        : gates[this.gate];

    // Collect all the pairs we will process
    this.dynamicSteps = [];
    for (const [k0, k1] of generator) {
      if (this.controlled && !is_bit_set(k0, this.controlQubit)) continue;
      this.dynamicSteps.push([k0, k1]);
    }

    // Reset any previous step info, but keep current state as the start
    this.intermediateStates = [this.state.slice()];
    this.processedPairs = [[]];
    this.stepIndex = 0;

    // Set the first pair to highlight (if any)
    this.processingPair = this.dynamicSteps.length > 0 ? this.dynamicSteps[0] : [];
    this.requestUpdate();
  }

  nextStep() {
    // Process the next pair in the list
    if (this.stepIndex >= this.dynamicSteps.length) return;

    const [k0, k1] = this.dynamicSteps[this.stepIndex];
    process_pair(this.state, this.gateMatrix, k0, k1);

    // Keep track of intermediate states and which pair was processed
    this.intermediateStates.push(this.state.slice());
    this.processedPairs.push([k0, k1]);

    this.stepIndex++;

    // Highlight the next pair if there is one
    this.processingPair =
      this.stepIndex < this.dynamicSteps.length ? this.dynamicSteps[this.stepIndex] : [];

    this.requestUpdate();
  }

  // -------------------------
  // STATIC MODE (all at once)
  // -------------------------
  applyStaticGate() {
    const n = Math.log2(this.state.length);

    this.gateMatrix =
      typeof gates[this.gate] === 'function'
        ? gates[this.gate](this.theta)
        : gates[this.gate];

    // If controlled, only process pairs whose k0 has control-bit set
    if (this.controlled) {
      c_transform(this.state, this.controlQubit, this.targetQubit, this.gateMatrix);
    } else {
      for (const [k0, k1] of pair_generator(n, this.targetQubit)) {
        process_pair(this.state, this.gateMatrix, k0, k1);
        // For illustration, store each step (optional if you don't need every step)
        this.intermediateStates.push(this.state.slice());
        this.processedPairs.push([k0, k1]);
      }
    }
    this.requestUpdate();
  }

  renderTable(state, title, highlightIndices = []) {
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
            const isHighlighted = highlightIndices.includes(index);
            return html`
              <tr class="${isHighlighted ? 'highlight' : ''}">
                <td>${index}</td>
                <td>
                  ${index.toString(2).padStart(Math.log2(state.length), '0')}
                </td>
                <td>${math.format(amplitude, {
                  notation: 'fixed',
                  precision: 4,
                })}</td>
                <td>${direction}°</td>
                <td>${magnitude}</td>
                <td>
                  <div class="amplitude-bar">
                    <div
                      class="bar"
                      style="width: ${magnitude * 100}%;
                             background-color: rgb(${rgb.join(',')});"
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
    // In dynamic mode, show only the latest state
    // In static mode, show each intermediate state in a sequence
    const isDynamic = this.mode === 'dynamic';
    const currentState = isDynamic
      ? this.intermediateStates[this.intermediateStates.length - 1]
      : null;

    return html`
      <div>
        <h3>Quantum State Visualizer</h3>

        <!-- Render tables -->
        <div>
          ${isDynamic
            ? this.renderTable(currentState, `Current State`, this.processingPair)
            : this.intermediateStates.map((state, idx) =>
                this.renderTable(
                  state,
                  `Step ${idx + 1}`,
                  this.processedPairs[idx] || []
                )
              )}
        </div>

        <!-- Controls -->
        <div class="buttons">
          <label>
            Mode:
            <select @change="${(e) => (this.mode = e.target.value)}">
              <option value="dynamic" ?selected="${this.mode === 'dynamic'}">Dynamic</option>
              <option value="static" ?selected="${this.mode === 'static'}">Static</option>
            </select>
          </label>

          <label>
            Gate:
            <select @change="${(e) => (this.gate = e.target.value)}">
              ${Object.keys(gates).map(
                (key) => html`<option value="${key}">${key}</option>`
              )}
            </select>
          </label>

          ${this.controlled
            ? html`
                <label>
                  Control Qubit:
                  <input
                    type="number"
                    min="0"
                    max="${Math.log2(this.state.length) - 1}"
                    .value="${this.controlQubit}"
                    @input="${(e) => (this.controlQubit = Number(e.target.value))}"
                  />
                </label>
              `
            : ''}

          <label>
            Target Qubit:
            <input
              type="number"
              min="0"
              max="${Math.log2(this.state.length) - 1}"
              .value="${this.targetQubit}"
              @input="${(e) => (this.targetQubit = Number(e.target.value))}"
            />
          </label>

          <!-- Apply gate button(s) -->
          <button
            @click="${isDynamic ? this.applyDynamicGate : this.applyStaticGate}"
          >
            Apply Gate
          </button>

          <!-- Only show 'Next Step' button in dynamic mode -->
          ${isDynamic
            ? html`
                <button
                  @click="${this.nextStep}"
                  ?disabled="${this.stepIndex >= this.dynamicSteps.length}"
                >
                  Next Step
                </button>
              `
            : ''}

          <button @click="${this.initializeState}">Reset</button>
        </div>

        <!-- Theta input for gates that require an angle -->
        ${['Phase', 'RZ', 'RX', 'RY'].includes(this.gate)
          ? html`
              <div class="theta-container">
                <label>
                  θ (radians):
                  <input
                    type="number"
                    step="0.1"
                    .value="${this.theta}"
                    @input="${(e) => (this.theta = Number(e.target.value))}"
                  />
                </label>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('quantum-state-viewer', QuantumStateViewer);
