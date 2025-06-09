import { LitElement, html, css } from 'lit';
// Make sure you have math.js or similar library available
// so that 'math' is recognized (e.g., import * as math from 'mathjs';)

const colormap = [[247, 55, 26], [247, 55, 26], [246, 56, 23], [246, 58, 21], [246, 58, 21], [246, 61, 18], [247, 64, 16], [247, 64, 16], [247, 68, 14], [247, 72, 12], [248, 76, 10], [248, 76, 10], [248, 80, 8], [248, 85, 7], [248, 85, 7], [249, 89, 6], [249, 94, 5], [250, 98, 4], [250, 98, 4], [251, 103, 3], [251, 107, 2], [251, 107, 2], [252, 112, 2], [252, 116, 1], [253, 120, 1], [253, 120, 1], [253, 125, 0], [254, 129, 0], [254, 129, 0], [254, 133, 0], [254, 137, 0], [255, 141, 0], [255, 141, 0], [255, 145, 0], [255, 149, 0], [255, 149, 0], [255, 153, 0], [255, 157, 0], [255, 161, 0], [255, 161, 0], [255, 165, 0], [255, 168, 0], [255, 168, 0], [255, 172, 0], [255, 176, 0], [255, 179, 0], [255, 179, 0], [255, 183, 0], [255, 186, 0], [255, 186, 0], [255, 189, 0], [254, 193, 0], [254, 193, 0], [253, 195, 0], [252, 198, 0], [251, 201, 0], [251, 201, 0], [249, 203, 0], [247, 205, 0], [247, 205, 0], [245, 206, 0], [242, 208, 0], [239, 208, 0], [239, 208, 0], [236, 209, 0], [233, 209, 0], [233, 209, 0], [229, 209, 0], [225, 209, 0], [221, 208, 0], [221, 208, 0], [217, 208, 0], [213, 207, 0], [213, 207, 0], [209, 205, 0], [204, 204, 0], [200, 203, 0], [200, 203, 0], [195, 201, 0], [191, 199, 0], [191, 199, 0], [186, 197, 0], [181, 196, 0], [177, 194, 0], [177, 194, 0], [172, 192, 0], [167, 190, 0], [167, 190, 0], [162, 188, 0], [158, 186, 0], [153, 184, 0], [153, 184, 0], [148, 182, 0], [143, 180, 0], [143, 180, 0], [138, 178, 1], [134, 176, 1], [134, 176, 1], [129, 174, 2], [124, 172, 2], [119, 170, 3], [119, 170, 3], [114, 169, 3], [109, 167, 4], [109, 167, 4], [104, 165, 6], [100, 163, 7], [95, 161, 9], [95, 161, 9], [90, 160, 11], [85, 158, 13], [85, 158, 13], [81, 157, 16], [76, 156, 18], [72, 155, 21], [72, 155, 21], [68, 154, 24], [64, 154, 27], [64, 154, 27], [60, 153, 30], [57, 153, 34], [54, 153, 38], [54, 153, 38], [51, 154, 41], [49, 155, 45], [49, 155, 45], [47, 155, 49], [45, 157, 54], [44, 158, 58], [44, 158, 58], [43, 160, 62], [43, 161, 67], [43, 161, 67], [43, 163, 72], [43, 165, 76], [44, 167, 81], [44, 167, 81], [44, 170, 86], [45, 172, 91], [45, 172, 91], [46, 174, 96], [46, 177, 101], [46, 177, 101], [47, 179, 106], [48, 181, 111], [48, 184, 116], [48, 184, 116], [49, 186, 121], [49, 189, 126], [49, 189, 126], [50, 191, 131], [50, 194, 136], [50, 196, 141], [50, 196, 141], [50, 199, 146], [50, 202, 151], [50, 202, 151], [50, 204, 156], [50, 207, 161], [50, 209, 166], [50, 209, 166], [49, 212, 171], [48, 214, 177], [48, 214, 177], [48, 216, 182], [47, 219, 187], [46, 221, 192], [46, 221, 192], [45, 223, 197], [44, 225, 202], [44, 225, 202], [43, 227, 206], [42, 228, 211], [40, 230, 215], [40, 230, 215], [39, 231, 220], [39, 232, 224], [39, 232, 224], [38, 232, 228], [37, 232, 231], [37, 232, 235], [37, 232, 235], [37, 232, 238], [38, 231, 240], [38, 231, 240], [38, 230, 243], [39, 228, 245], [39, 228, 245], [40, 227, 247], [41, 225, 249], [42, 223, 250], [42, 223, 250], [43, 220, 251], [44, 218, 252], [44, 218, 252], [45, 215, 253], [46, 212, 254], [47, 209, 254], [47, 209, 254], [47, 206, 255], [48, 203, 255], [48, 203, 255], [49, 200, 255], [49, 197, 255], [49, 194, 255], [49, 194, 255], [49, 191, 255], [49, 188, 255], [49, 188, 255], [49, 184, 255], [49, 181, 255], [48, 178, 255], [48, 178, 255], [48, 175, 255], [47, 172, 255], [47, 172, 255], [46, 169, 255], [45, 166, 255], [44, 163, 255], [44, 163, 255], [43, 160, 255], [42, 157, 255], [42, 157, 255], [41, 154, 255], [40, 151, 255], [40, 148, 255], [40, 148, 255], [39, 145, 255], [40, 143, 255], [40, 143, 255], [40, 140, 255], [41, 138, 255], [41, 138, 255], [43, 136, 255], [46, 134, 255], [49, 132, 255], [49, 132, 255], [53, 131, 255], [57, 130, 255], [57, 130, 255], [62, 129, 255], [67, 128, 255], [72, 128, 255], [72, 128, 255], [77, 128, 255], [83, 129, 255], [83, 129, 255], [89, 129, 255], [94, 130, 255], [100, 131, 255], [100, 131, 255], [105, 132, 255], [111, 134, 255], [111, 134, 255], [116, 136, 255], [122, 137, 255], [127, 139, 255], [127, 139, 255], [132, 141, 255], [137, 143, 255], [137, 143, 255], [142, 145, 255], [147, 147, 255], [152, 150, 255], [152, 150, 255], [157, 152, 255], [161, 154, 255], [161, 154, 255], [166, 156, 255], [170, 159, 255], [174, 161, 255], [174, 161, 255], [179, 163, 255], [183, 165, 255], [183, 165, 255], [187, 168, 255], [191, 170, 255], [191, 170, 255], [196, 172, 255], [200, 174, 255], [204, 177, 255], [204, 177, 255], [208, 179, 255], [212, 181, 255], [212, 181, 255], [216, 183, 255], [219, 184, 255], [223, 186, 255], [223, 186, 255], [227, 188, 255], [231, 189, 253], [231, 189, 253], [234, 190, 252], [238, 191, 250], [241, 191, 247], [241, 191, 247], [244, 191, 245], [247, 191, 242], [247, 191, 242], [250, 190, 238], [252, 189, 234], [255, 188, 231], [255, 188, 231], [255, 187, 226], [255, 185, 222], [255, 185, 222], [255, 183, 217], [255, 180, 212], [255, 178, 207], [255, 178, 207], [255, 175, 202], [255, 172, 197], [255, 172, 197], [255, 169, 191], [255, 165, 186], [255, 162, 180], [255, 162, 180], [255, 158, 175], [255, 155, 169], [255, 155, 169], [255, 151, 164], [255, 148, 158], [255, 148, 158], [255, 144, 153], [255, 140, 147], [255, 136, 142], [255, 136, 142], [255, 133, 137], [255, 129, 131], [255, 129, 131], [255, 125, 126], [255, 121, 121], [255, 117, 115], [255, 117, 115], [255, 113, 110], [255, 109, 105], [255, 109, 105], [255, 105, 100], [255, 101, 94], [255, 97, 89], [255, 97, 89], [255, 92, 84], [255, 88, 79], [255, 88, 79], [255, 84, 74], [255, 80, 69], [254, 76, 65], [254, 76, 65], [253, 72, 60], [252, 68, 56], [252, 68, 56], [251, 65, 51], [250, 61, 47], [249, 59, 43], [249, 59, 43], [248, 56, 39], [248, 55, 36], [248, 55, 36], [247, 54, 32], [247, 54, 29]];

// Convert a complex amplitude to an RGB color (from our colormap) based on the phase.
function complex_to_rgb(c, ints = false) {
  const a = math.re(c);
  const b = math.im(c);
  
  let hue = (Math.atan2(b, a) / Math.PI) * 180;
  if (hue < 0) hue += 360;
  
  // Scale hue (0-360) to an index from 0 to colormap.length-1
  const index = Math.floor((hue / 360) * (colormap.length - 1));
  const rgb = colormap[index];
  
  return ints ? rgb : rgb.map((c) => c / 255);
}

export class QuantumGateSimulator extends LitElement {
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
    .color-wheels {
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      margin-top: 0;
      justify-content: center;
    }
    .wheel-container {
      text-align: center;
      margin: 0;
    }
    .wheel-title {
      margin: 5px 0;
      font-weight: bold;
      margin-bottom: 30px;
    }

    /* Container to hold the conic gradient and the arrow overlay */
    .color-wheel-container {
      position: relative;
      width: 150px;
      height: 150px;
    }
    /* The conic gradient color wheel */
.color-wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from -30deg,
    rgba(0, 255, 0, 0.7),
    rgba(255, 255, 0, 0.7),
    rgba(255, 165, 0, 0.7),
    rgba(255, 0, 0, 0.7),
    rgba(255, 0, 255, 0.7),
    rgba(0, 0, 255, 0.7),
    rgba(0, 255, 255, 0.7),
    rgba(0, 255, 0, 0.7)
  );
}
    /* SVG overlay for the arrow line */
    .arrow-overlay {
      position: absolute;
      top: 0;
      left: 0;
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

    .legend {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 10px;
      font-size: 1rem;
    }
  `;

  static properties = {
    state: { type: Array },
    originalState: { type: Array },
    gate: { type: String },
    gateApplied: { type: Boolean },
    // other properties...
  };

  constructor() {
    super();
    this.state = [];
    this.originalState = [];
    this.gate = 'X'; // Default gate
    this.gateApplied = false;
    this.num_qubits = 1; // example: 3 qubits
    // Initialize default state
    this.initializeState();
  }

  // New initializeState that creates the default state:
  initializeState() {
    const n = this.num_qubits;
    const size = Math.pow(2, n);
    const defaultState = [];
    for (let i = 0; i < size; i++) {
      defaultState.push({ outcome: i, amplitude: math.complex(0, 0) });
    }
    // Set |0> state:
    defaultState[0] = { outcome: 0, amplitude: math.complex(1, 0) };

    this.originalState = defaultState;
    this.state = [...defaultState];
    this.gateApplied = false;
  }

  // Rename the current initializeState to randomizeState:
  randomizeState() {
    const size = Math.pow(2, this.num_qubits);
    const randomState = [];
    for (let i = 0; i < size; i++) {
      const amp = math.complex(Math.random() - 0.5, Math.random() - 0.5);
      randomState.push({ outcome: i, amplitude: amp });
    }
    // Normalize: compute norm = sqrt(sum_i |amp|^2)
    const norm = math.sqrt(
      randomState.reduce((acc, s) => math.add(acc, math.pow(math.abs(s.amplitude), 2)), 0)
    );
    randomState.forEach((s, i) => {
      randomState[i].amplitude = math.divide(s.amplitude, norm);
    });
    this.originalState = randomState;
    this.state = [...randomState];
    this.gateApplied = false;
  }

  applyGate() {
    if (this.gateApplied) return;

    const [state0, state1] = this.state;

    switch (this.gate) {
      case 'X': // Pauli-X (NOT gate)
        this.state = [
          { ...state0, amplitude: state1.amplitude },
          { ...state1, amplitude: state0.amplitude },
        ];
        break;
      case 'Y': // Pauli-Y gate
        this.state = [
          {
            ...state0,
            amplitude: math.multiply(state1.amplitude, math.complex(0, -1)),
          },
          {
            ...state1,
            amplitude: math.multiply(state0.amplitude, math.complex(0, 1)),
          },
        ];
        break;
      case 'Z': // Pauli-Z gate
        this.state = [
          { ...state0, amplitude: state0.amplitude },
          {
            ...state1,
            amplitude: math.multiply(state1.amplitude, -1),
          },
        ];
        break;
      case 'H': // Hadamard gate
        this.state = [
          {
            ...state0,
            amplitude: math.divide(
              math.add(state0.amplitude, state1.amplitude),
              math.sqrt(2)
            ),
          },
          {
            ...state1,
            amplitude: math.divide(
              math.subtract(state0.amplitude, state1.amplitude),
              math.sqrt(2)
            ),
          },
        ];
        break;
      case 'Phase': // Phase gate (π/2 phase)
        this.state = [
          { ...state0, amplitude: state0.amplitude },
          {
            ...state1,
            amplitude: math.multiply(
              state1.amplitude,
              math.exp(math.complex(0, Math.PI / 2))
            ),
          },
        ];
        break;
      case 'RZ': // RZ gate (rotation around Z-axis)
        const theta = Math.PI / 4; // Example rotation angle
        this.state = [
          { ...state0, amplitude: state0.amplitude },
          {
            ...state1,
            amplitude: math.multiply(
              state1.amplitude,
              math.exp(math.complex(0, theta))
            ),
          },
        ];
        break;
    }

    this.gateApplied = true;
    this.requestUpdate();
  }

  /**
   * Render a color wheel for a single amplitude, but using a conic gradient
   * from red → orange → yellow → lime → cyan → blue → magenta → red.
   * We draw an arrow from the center to indicate the phase (direction)
   * and magnitude (length).
   */
  renderColorWheel(amplitude0, amplitude1) {
    const cx = 75, cy = 75, radius = 75; // Center and radius of the circle
    const labelOffset = 18; // Offset for label from line end

    const getLine = (amplitude) => {
      const x2 = cx + math.re(amplitude) * radius;
      const y2 = cy - math.im(amplitude) * radius;
      // Compute direction vector for offset
      const dx = x2 - cx;
      const dy = y2 - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      // Offset label further out in the same direction
      const lx = x2 + (dx / len) * labelOffset;
      const ly = y2 + (dy / len) * labelOffset;
      return { x2, y2, lx, ly };
    };

    const line0 = getLine(amplitude0);
    const line1 = getLine(amplitude1);

    return html`
      <div class="color-wheel-container">
        <div class="color-wheel"></div>
        <svg class="arrow-overlay" width="150" height="150" viewBox="0 0 150 150" style="overflow: visible;">
          <!-- Line for Outcome 0 -->
          <line
            x1="${cx}" y1="${cy}" x2="${line0.x2}" y2="${line0.y2}"
            stroke="black" stroke-width="2.5"
          />
          <!-- Line for Outcome 1 -->
          <line
            x1="${cx}" y1="${cy}" x2="${line1.x2}" y2="${line1.y2}"
            stroke="black" stroke-width="2.5"
          />
          <!-- Labels for the lines, offset from the line ends -->
          <text x="${line0.lx}" y="${line0.ly}" fill="black" font-size="15" alignment-baseline="middle" text-anchor="middle">0</text>
          <text x="${line1.lx}" y="${line1.ly}" fill="black" font-size="15" alignment-baseline="middle" text-anchor="middle">1</text>
        </svg>
      </div>
    `;
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
          ${state.map(({ outcome, amplitude }) => {
            const magnitude = math.abs(amplitude).toFixed(3);
            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);
            const rgb = complex_to_rgb(amplitude, true);

            return html`
              <tr>
                <td>${outcome}</td>
                <td>${outcome.toString(2)}</td>
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
    return html`
      <div>
        <h3>${this.gate} Gate Simulator</h3>
        <!-- Buttons to apply gate, randomize state and reset state -->
        <div class="buttons">
          <button @click="${this.applyGate}" ?disabled="${this.gateApplied}">
            Apply ${this.gate} Gate
          </button>
          <button @click="${this.initializeState}">
            Reset
          </button>
          <button @click="${this.randomizeState}">
            Randomize
          </button>
        </div>

        <!-- Theta input for Phase and RZ gates with placeholder "pi radians" -->
        ${['Phase', 'RZ'].includes(this.gate)
          ? html`
              <div class="theta-container">
                <input
                  type="number"
                  placeholder="Angle (radians)"
                  step="0.1"
                  .value="${this.theta}"
                  @input="${(e) => (this.theta = Number(e.target.value))}"
                />
              </div>
            `
          : ''}

        <!-- State tables for Before / After -->
        <div>
          ${this.renderTable(this.originalState, 'Initial State Table')}
          ${this.gateApplied ? this.renderTable(this.state, 'Final State Table') : ''}
        </div>

        <h4>Clock Representation</h4>
        <!-- Color Wheels for Before / After -->
        <div class="color-wheels">
          <!-- Original State Wheels -->
          <div class="wheel-container">
            <div class="wheel-title">Initial State</div>
            ${this.renderColorWheel(this.originalState[0].amplitude, this.originalState[1].amplitude)}
          </div>

          <!-- Arrow and label between wheels, only if gate applied -->
          ${this.gateApplied ? html`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 80px;">
              <svg width="60" height="40" style="margin-bottom: 0; margin-top: 20px;">
                <!-- Draw the line up to the base of the arrowhead -->
                <line x1="8" y1="20" x2="42" y2="20" stroke="black" stroke-width="2.5" />
                <!-- Draw the arrowhead as a polygon at the end of the line -->
                <polygon points="48,20 42,16 42,24" fill="black" />
              </svg>
              <div style="font-size: 1.3em; font-weight: bold; margin-top: 0;">${this.gate}</div>
            </div>
          ` : ''}

          <!-- (Conditional) After State Wheels -->
          ${this.gateApplied
            ? html`
                <div class="wheel-container">
                  <div class="wheel-title">Final State</div>
                  ${this.renderColorWheel(this.state[0].amplitude, this.state[1].amplitude)}
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('quantum-gate-simulator', QuantumGateSimulator);
