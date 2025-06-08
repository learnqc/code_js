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
  CX: [
    [0, 1],
    [1, 0],
  ],
  CY: [
    [0, math.complex(0, -1)],
    [math.complex(0, 1), 0],
  ],
  CZ: [
    [1, 0],
    [0, -1],
  ],
};

const colormap = [[247, 55, 26], [247, 55, 26], [246, 56, 23], [246, 58, 21], [246, 58, 21], [246, 61, 18], [247, 64, 16], [247, 64, 16], [247, 68, 14], [247, 72, 12], [248, 76, 10], [248, 76, 10], [248, 80, 8], [248, 85, 7], [248, 85, 7], [249, 89, 6], [249, 94, 5], [250, 98, 4], [250, 98, 4], [251, 103, 3], [251, 107, 2], [251, 107, 2], [252, 112, 2], [252, 116, 1], [253, 120, 1], [253, 120, 1], [253, 125, 0], [254, 129, 0], [254, 129, 0], [254, 133, 0], [254, 137, 0], [255, 141, 0], [255, 141, 0], [255, 145, 0], [255, 149, 0], [255, 149, 0], [255, 153, 0], [255, 157, 0], [255, 161, 0], [255, 161, 0], [255, 165, 0], [255, 168, 0], [255, 168, 0], [255, 172, 0], [255, 176, 0], [255, 179, 0], [255, 179, 0], [255, 183, 0], [255, 186, 0], [255, 186, 0], [255, 189, 0], [254, 193, 0], [254, 193, 0], [253, 195, 0], [252, 198, 0], [251, 201, 0], [251, 201, 0], [249, 203, 0], [247, 205, 0], [247, 205, 0], [245, 206, 0], [242, 208, 0], [239, 208, 0], [239, 208, 0], [236, 209, 0], [233, 209, 0], [233, 209, 0], [229, 209, 0], [225, 209, 0], [221, 208, 0], [221, 208, 0], [217, 208, 0], [213, 207, 0], [213, 207, 0], [209, 205, 0], [204, 204, 0], [200, 203, 0], [200, 203, 0], [195, 201, 0], [191, 199, 0], [191, 199, 0], [186, 197, 0], [181, 196, 0], [177, 194, 0], [177, 194, 0], [172, 192, 0], [167, 190, 0], [167, 190, 0], [162, 188, 0], [158, 186, 0], [153, 184, 0], [153, 184, 0], [148, 182, 0], [143, 180, 0], [143, 180, 0], [138, 178, 1], [134, 176, 1], [134, 176, 1], [129, 174, 2], [124, 172, 2], [119, 170, 3], [119, 170, 3], [114, 169, 3], [109, 167, 4], [109, 167, 4], [104, 165, 6], [100, 163, 7], [95, 161, 9], [95, 161, 9], [90, 160, 11], [85, 158, 13], [85, 158, 13], [81, 157, 16], [76, 156, 18], [72, 155, 21], [72, 155, 21], [68, 154, 24], [64, 154, 27], [64, 154, 27], [60, 153, 30], [57, 153, 34], [54, 153, 38], [54, 153, 38], [51, 154, 41], [49, 155, 45], [49, 155, 45], [47, 155, 49], [45, 157, 54], [44, 158, 58], [44, 158, 58], [43, 160, 62], [43, 161, 67], [43, 161, 67], [43, 163, 72], [43, 165, 76], [44, 167, 81], [44, 167, 81], [44, 170, 86], [45, 172, 91], [45, 172, 91], [46, 174, 96], [46, 177, 101], [46, 177, 101], [47, 179, 106], [48, 181, 111], [48, 184, 116], [48, 184, 116], [49, 186, 121], [49, 189, 126], [49, 189, 126], [50, 191, 131], [50, 194, 136], [50, 196, 141], [50, 196, 141], [50, 199, 146], [50, 202, 151], [50, 202, 151], [50, 204, 156], [50, 207, 161], [50, 209, 166], [50, 209, 166], [49, 212, 171], [48, 214, 177], [48, 214, 177], [48, 216, 182], [47, 219, 187], [46, 221, 192], [46, 221, 192], [45, 223, 197], [44, 225, 202], [44, 225, 202], [43, 227, 206], [42, 228, 211], [40, 230, 215], [40, 230, 215], [39, 231, 220], [39, 232, 224], [39, 232, 224], [38, 232, 228], [37, 232, 231], [37, 232, 235], [37, 232, 235], [37, 232, 238], [38, 231, 240], [38, 231, 240], [38, 230, 243], [39, 228, 245], [39, 228, 245], [40, 227, 247], [41, 225, 249], [42, 223, 250], [42, 223, 250], [43, 220, 251], [44, 218, 252], [44, 218, 252], [45, 215, 253], [46, 212, 254], [47, 209, 254], [47, 209, 254], [47, 206, 255], [48, 203, 255], [48, 203, 255], [49, 200, 255], [49, 197, 255], [49, 194, 255], [49, 194, 255], [49, 191, 255], [49, 188, 255], [49, 188, 255], [49, 184, 255], [49, 181, 255], [48, 178, 255], [48, 178, 255], [48, 175, 255], [47, 172, 255], [47, 172, 255], [46, 169, 255], [45, 166, 255], [44, 163, 255], [44, 163, 255], [43, 160, 255], [42, 157, 255], [42, 157, 255], [41, 154, 255], [40, 151, 255], [40, 148, 255], [40, 148, 255], [39, 145, 255], [40, 143, 255], [40, 143, 255], [40, 140, 255], [41, 138, 255], [41, 138, 255], [43, 136, 255], [46, 134, 255], [49, 132, 255], [49, 132, 255], [53, 131, 255], [57, 130, 255], [57, 130, 255], [62, 129, 255], [67, 128, 255], [72, 128, 255], [72, 128, 255], [77, 128, 255], [83, 129, 255], [83, 129, 255], [89, 129, 255], [94, 130, 255], [100, 131, 255], [100, 131, 255], [105, 132, 255], [111, 134, 255], [111, 134, 255], [116, 136, 255], [122, 137, 255], [127, 139, 255], [127, 139, 255], [132, 141, 255], [137, 143, 255], [137, 143, 255], [142, 145, 255], [147, 147, 255], [152, 150, 255], [152, 150, 255], [157, 152, 255], [161, 154, 255], [161, 154, 255], [166, 156, 255], [170, 159, 255], [174, 161, 255], [174, 161, 255], [179, 163, 255], [183, 165, 255], [183, 165, 255], [187, 168, 255], [191, 170, 255], [191, 170, 255], [196, 172, 255], [200, 174, 255], [204, 177, 255], [204, 177, 255], [208, 179, 255], [212, 181, 255], [212, 181, 255], [216, 183, 255], [219, 184, 255], [223, 186, 255], [223, 186, 255], [227, 188, 255], [231, 189, 253], [231, 189, 253], [234, 190, 252], [238, 191, 250], [241, 191, 247], [241, 191, 247], [244, 191, 245], [247, 191, 242], [247, 191, 242], [250, 190, 238], [252, 189, 234], [255, 188, 231], [255, 188, 231], [255, 187, 226], [255, 185, 222], [255, 185, 222], [255, 183, 217], [255, 180, 212], [255, 178, 207], [255, 178, 207], [255, 175, 202], [255, 172, 197], [255, 172, 197], [255, 169, 191], [255, 165, 186], [255, 162, 180], [255, 162, 180], [255, 158, 175], [255, 155, 169], [255, 155, 169], [255, 151, 164], [255, 148, 158], [255, 148, 158], [255, 144, 153], [255, 140, 147], [255, 136, 142], [255, 136, 142], [255, 133, 137], [255, 129, 131], [255, 129, 131], [255, 125, 126], [255, 121, 121], [255, 117, 115], [255, 117, 115], [255, 113, 110], [255, 109, 105], [255, 109, 105], [255, 105, 100], [255, 101, 94], [255, 97, 89], [255, 97, 89], [255, 92, 84], [255, 88, 79], [255, 88, 79], [255, 84, 74], [255, 80, 69], [254, 76, 65], [254, 76, 65], [253, 72, 60], [252, 68, 56], [252, 68, 56], [251, 65, 51], [250, 61, 47], [249, 59, 43], [249, 59, 43], [248, 56, 39], [248, 55, 36], [248, 55, 36], [247, 54, 32], [247, 54, 29]];

function complex_to_rgb(c, ints = false) {
  const a = math.re(c);
  const b = math.im(c);
  const magnitude = Math.sqrt(a * a + b * b);
  let hue = (Math.atan2(b, a) / Math.PI) * 180;

  if (hue < 0) {
    hue += 360;
  }

  // For example, map hue (0-360) to an index in the colormap array:
  const index = Math.floor((hue / 360) * (colormap.length - 1));
  const rgb = colormap[index];

  if (ints) {
    return rgb;
  } else {
    return rgb.map((c) => c / 255);
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

    num_qubits: { type: Number },

    // Flag to indicate that processing has begun (first pair already highlighted)
    processingStarted: { type: Boolean },

    // New transformation-related properties
    transformationActive: { type: Boolean },
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
    this.num_qubits = 3;
    this.processingStarted = false;
    this.transformationActive = false;
    this.initializeState();
  }

  initializeState() {
    const size = Math.pow(2, this.num_qubits);
    this.state = Array.from({ length: size }, (_, i) =>
      i === 0 ? math.complex(1, 0) : math.complex(0, 0)
    );
    this.intermediateStates = [this.state.slice()];
    this.processedPairs = [[]];
    this.processingPair = [];
    this.processingStarted = false;
    this.dynamicSteps = [];
    this.stepIndex = 0;
    this.requestUpdate();
  }

  randomizeState() {
    const size = this.state.length;
    this.state = Array.from({ length: size }, () =>
      math.complex(Math.random() - 0.5, Math.random() - 0.5)
    );
    // Normalize
    const norm = math.sqrt(
      this.state.reduce((acc, val) => math.add(acc, math.pow(math.abs(val), 2)), 0)
    );
    this.state = this.state.map((amp) => math.divide(amp, norm));
    this.intermediateStates = [this.state.slice()];
    this.processedPairs = [[]];
    this.processingPair = [];
    this.processingStarted = false;
    this.dynamicSteps = [];
    this.stepIndex = 0;
    this.requestUpdate();
  }

  // Begin a new transformation: compute pairs, highlight first one, lock controls
  startTransformation() {
    // Validate inputs before starting
    const isControlledGate = ['CX', 'CY', 'CZ'].includes(this.gate);
    if (isControlledGate && this.controlQubit === this.targetQubit) {
      alert("Control and target qubits must be different for controlled gates.");
      return; // Abort if invalid
    }

    // Prepare the pairs to be processed
    this.transformationActive = true;
    this.processingStarted = false;
    this.applyDynamicGate(); // computes dynamicSteps & highlights first pair
  }

  // Skip processing – run through all remaining pairs automatically
  skip() {
    if (!this.transformationActive) return; // nothing to do

    // Ensure we process from the current pointer onward
    if (!this.processingStarted) {
      this.processingStarted = true; // consider first pair as already highlighted, now process it
    }

    while (this.stepIndex < this.dynamicSteps.length) {
      this.processCurrentPair();
    }

    // Finish transformation
    this.finishTransformation();
  }

  applyDynamicGate() {
    this.controlled = ['CX', 'CY', 'CZ'].includes(this.gate);
    const n = 3;
    const generator = pair_generator(n, this.targetQubit);

    this.gateMatrix =
      typeof gates[this.gate] === 'function'
        ? gates[this.gate](this.theta)
        : gates[this.gate];

    // Collect all the pairs we will process
    this.dynamicSteps = [];
    for (const [k0, k1] of generator) {
      console.log(this.controlled, this.controlQubit, k0, k1);
      if (this.controlled && !is_bit_set(k0, this.controlQubit)) continue;
      this.dynamicSteps.push([k0, k1]);
    }

    // Reset any previous step info, but keep current state as the start
    this.intermediateStates = [this.state.slice()];
    this.processedPairs = [[]];
    this.stepIndex = 0;

    // Set the first pair to highlight (if any)
    this.processingPair = this.dynamicSteps.length > 0 ? this.dynamicSteps[0] : [];
    this.processingStarted = false;
    this.requestUpdate();
  }

  processCurrentPair() {
    // Process the pair at current stepIndex
    if (this.stepIndex >= this.dynamicSteps.length) return;

    const [k0, k1] = this.dynamicSteps[this.stepIndex];
    process_pair(this.state, this.gateMatrix, k0, k1);

    // Track state and processed pair
    this.intermediateStates.push(this.state.slice());
    this.processedPairs.push([k0, k1]);

    this.stepIndex++;

    // Update highlighted pair
    this.processingPair =
      this.stepIndex < this.dynamicSteps.length ? this.dynamicSteps[this.stepIndex] : [];
  }

  nextStep() {
    if (!this.transformationActive) return;

    // If processing hasn't started yet, process the first pair
    if (!this.processingStarted) {
      this.processingStarted = true;
      this.processCurrentPair();
      this.requestUpdate();
      return;
    }

    // Process one pair
    this.processCurrentPair();

    // If done, finish transformation
    if (this.stepIndex >= this.dynamicSteps.length) {
      this.finishTransformation();
    } else {
      this.requestUpdate();
    }
  }

  finishTransformation() {
    this.transformationActive = false;
    this.processingStarted = false;
    // Keep final state & highlight cleared
    this.processingPair = [];
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
            const magnitude = math.abs(amplitude).toFixed(3);
            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);
            const rgb = complex_to_rgb(amplitude, true);
            const isHighlighted = highlightIndices.includes(index);
            return html`
              <tr class="${isHighlighted ? 'highlight' : ''}">
                <td>${index}</td>
                <td>
                  ${index.toString(2).padStart(Math.log2(state.length), '0')}
                </td>
                <td>
                  ${math.format(amplitude, {
                    notation: 'fixed',
                    precision: 3,
                  })}
                </td>
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
    // Always use dynamic mode
    const currentState = this.intermediateStates[this.stepIndex];
    const gateRequiresTarget = ['X', 'Y', 'Z', 'H', 'CX', 'CY', 'CZ', 'RX', 'RY', 'RZ', 'Phase'].includes(this.gate);
    const gateRequiresControl = ['CX', 'CY', 'CZ'].includes(this.gate);
    const gateRequiresAngle = ['Phase', 'RZ', 'RX', 'RY'].includes(this.gate);

    // Log the target qubit value when it changes
    console.log('Target Qubit:', this.targetQubit);

    const controlsLocked = this.transformationActive;

    return html`
      <div>
        <h3>Quantum State Visualizer</h3>

        <!-- Controls at the top: first row -->
        <div class="buttons" style="margin-bottom: 0;">
          <label>
            Gate:
            <select @change="${(e) => { this.gate = e.target.value; this.dynamicSteps = []; this.stepIndex = 0; this.processingStarted = false; }}" ?disabled="${controlsLocked}">
              <option value="X" ?selected="${this.gate === 'X'}">X</option>
              <option value="Y" ?selected="${this.gate === 'Y'}">Y</option>
              <option value="Z" ?selected="${this.gate === 'Z'}">Z</option>
              <option value="H" ?selected="${this.gate === 'H'}">H</option>
              <option value="CX" ?selected="${this.gate === 'CX'}">CX</option>
              <option value="CY" ?selected="${this.gate === 'CY'}">CY</option>
              <option value="CZ" ?selected="${this.gate === 'CZ'}">CZ</option>
              <option value="Phase" ?selected="${this.gate === 'Phase'}">Phase</option>
              <option value="RX" ?selected="${this.gate === 'RX'}">RX</option>
              <option value="RY" ?selected="${this.gate === 'RY'}">RY</option>
              <option value="RZ" ?selected="${this.gate === 'RZ'}">RZ</option>
            </select>
          </label>

          ${gateRequiresTarget ? html`
            <label>
              Target Qubit:
              <input
                type="number"
                min="0"
                max="${Math.log2(this.state.length) - 1}"
                .value="${this.targetQubit}"
                @input="${(e) => { this.targetQubit = Number(e.target.value); this.dynamicSteps = []; this.stepIndex = 0; this.processingStarted = false; }}"
                ?disabled="${controlsLocked}"
              />
            </label>
          ` : ''}

          ${gateRequiresControl ? html`
            <label>
              Control Qubit:
              <input
                type="number"
                min="0"
                max="${Math.log2(this.state.length) - 1}"
                .value="${this.controlQubit}"
                @input="${(e) => { this.controlQubit = Number(e.target.value); this.dynamicSteps = []; this.stepIndex = 0; this.processingStarted = false; }}"
                ?disabled="${controlsLocked}"
              />
            </label>
          ` : ''}

          ${gateRequiresAngle ? html`
            <label>
              θ (radians):
              <input
                type="number"
                step="0.1"
                .value="${this.theta}"
                @input="${(e) => { this.theta = Number(e.target.value); this.dynamicSteps = []; this.stepIndex = 0; this.processingStarted = false; }}"
                ?disabled="${controlsLocked}"
                style="width: 60px;"
              />
            </label>
          ` : ''}
        </div>

        <!-- Second row: action buttons -->
        <div style="height: 24px;"></div>
        <div class="buttons" style="margin-top: 0; margin-bottom: 25px;">
          ${this.transformationActive ? html`
            <button
              @click="${this.nextStep}"
              ?disabled="${this.dynamicSteps.length > 0 && this.stepIndex >= this.dynamicSteps.length}"
            >
              Process Next (Highlighted) Pair
            </button>
            <button @click="${this.skip}">
              Process All (Remaining) Pairs
            </button>
          ` : html`
            <button @click="${this.startTransformation}">Start Transformation</button>
          `}

          <button @click="${this.initializeState}" ?disabled="${controlsLocked}">Reset</button>
          <button @click="${this.randomizeState}" ?disabled="${controlsLocked}">Randomize</button>
        </div>

        <!-- Render table -->
        <div>
          ${this.renderTable(currentState, `Current State`, this.processingPair)}
        </div>
      </div>
    `;
  }
}

customElements.define('quantum-state-viewer', QuantumStateViewer);
