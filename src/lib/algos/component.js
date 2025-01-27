import { LitElement, html, css } from 'lit';

// Hardcoding the colormap directly into the script
const colormap = [
  [247, 55, 26], [247, 55, 26], [246, 56, 23], [246, 58, 21], [246, 58, 21], [246, 61, 18], [247, 64, 16], 
  [247, 64, 16], [247, 68, 14], [247, 72, 12], [248, 76, 10], [248, 76, 10], [248, 80, 8], [248, 85, 7], [248, 85, 7], 
  [249, 89, 6], [249, 94, 5], [250, 98, 4], [250, 98, 4], [251, 103, 3], [251, 107, 2], [251, 107, 2], [252, 112, 2], 
  [252, 116, 1], [253, 120, 1], [253, 120, 1], [253, 125, 0], [254, 129, 0], [254, 129, 0], [254, 133, 0], [254, 137, 0], 
  [255, 141, 0], [255, 141, 0], [255, 145, 0], [255, 149, 0], [255, 149, 0], [255, 153, 0], [255, 157, 0], [255, 161, 0], 
  [255, 161, 0], [255, 165, 0], [255, 168, 0], [255, 168, 0], [255, 172, 0], [255, 176, 0], [255, 179, 0], [255, 179, 0], 
  [255, 183, 0], [255, 186, 0], [255, 186, 0], [255, 189, 0], [254, 193, 0], [254, 193, 0], [253, 195, 0], [252, 198, 0], 
  [251, 201, 0], [251, 201, 0], [249, 203, 0], [247, 205, 0], [247, 205, 0], [245, 206, 0], [242, 208, 0], [239, 208, 0], 
  [239, 208, 0], [236, 209, 0], [233, 209, 0], [233, 209, 0], [229, 209, 0], [225, 209, 0], [221, 208, 0], [221, 208, 0], 
  [217, 208, 0], [213, 207, 0], [213, 207, 0], [209, 205, 0], [204, 204, 0], [200, 203, 0], [200, 203, 0], [195, 201, 0], 
  [191, 199, 0], [191, 199, 0], [186, 197, 0], [181, 196, 0], [177, 194, 0], [177, 194, 0], [172, 192, 0], [167, 190, 0], 
  [167, 190, 0], [162, 188, 0], [158, 186, 0], [153, 184, 0], [153, 184, 0], [148, 182, 0], [143, 180, 0], [143, 180, 0], 
  [138, 178, 1], [134, 176, 1], [134, 176, 1], [129, 174, 2], [124, 172, 2], [119, 170, 3], [119, 170, 3], [114, 169, 3], 
  [109, 167, 4], [109, 167, 4], [104, 165, 6], [100, 163, 7], [95, 161, 9], [95, 161, 9], [90, 160, 11], [85, 158, 13], 
  [85, 158, 13], [81, 157, 16], [76, 156, 18], [72, 155, 21], [72, 155, 21], [68, 154, 24], [64, 154, 27], [64, 154, 27], 
  [60, 153, 30], [57, 153, 34], [54, 153, 38], [54, 153, 38], [51, 154, 41], [49, 155, 45], [49, 155, 45], [47, 155, 49], 
  [45, 157, 54], [44, 158, 58], [44, 158, 58], [43, 160, 62], [43, 161, 67], [43, 161, 67], [43, 163, 72], [43, 165, 76], 
  [44, 167, 81], [44, 167, 81], [44, 170, 86], [45, 172, 91], [45, 172, 91], [46, 174, 96], [46, 177, 101], [46, 177, 101], 
  [47, 179, 106], [48, 181, 111], [48, 184, 116], [48, 184, 116], [49, 186, 121], [49, 189, 126], [49, 189, 126], [50, 191, 131], 
  [50, 194, 136], [50, 196, 141], [50, 196, 141], [50, 199, 146], [50, 202, 151], [50, 202, 151], [50, 204, 156], [50, 207, 161], 
  [50, 209, 166], [50, 209, 166], [49, 212, 171], [48, 214, 177], [48, 214, 177], [48, 216, 182], [47, 219, 187], [46, 221, 192], 
  [46, 221, 192], [45, 223, 197], [44, 225, 202], [44, 225, 202], [43, 227, 206], [42, 228, 211], [40, 230, 215], [40, 230, 215]
];

// Function to convert complex number to RGB
function complex_to_rgb(c, ints = false) {
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
  height: 25px
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

  .amplitude-bar {
    display: flex;
    align-items: center; /* Keeps bars horizontally aligned */
    justify-content: flex-start; /* Left-aligns the bars on mobile */
    height: 100%;
  }

  .bar {
    width: 100%; /* Ensures full-width bars */
    height: 100%;
  }
}
  `;

  static properties = {
    state: { type: Array },
    originalState: { type: Array },
    gate: { type: String },
    gateApplied: { type: Boolean },
  };

  constructor() {
    super();
    this.state = [];
    this.originalState = [];
    this.gate = 'X'; // Default gate
    this.gateApplied = false;
    this.initializeState();
  }

  initializeState() {
    const amplitude0 = math.complex(Math.random() - 0.5, Math.random() - 0.5);
    const amplitude1 = math.complex(Math.random() - 0.5, Math.random() - 0.5);
    const norm = math.sqrt(
      math.add(math.pow(math.abs(amplitude0), 2), math.pow(math.abs(amplitude1), 2))
    );
    this.originalState = [
      { outcome: 0, amplitude: math.divide(amplitude0, norm) },
      { outcome: 1, amplitude: math.divide(amplitude1, norm) },
    ];
    this.state = [...this.originalState];
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
          { ...state0, amplitude: math.multiply(state1.amplitude, math.complex(0, -1)) },
          { ...state1, amplitude: math.multiply(state0.amplitude, math.complex(0, 1)) },
        ];
        break;
      case 'Z': // Pauli-Z gate
        this.state = [
          { ...state0, amplitude: state0.amplitude },
          { ...state1, amplitude: math.multiply(state1.amplitude, -1) },
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
            amplitude: math.multiply(state1.amplitude, math.exp(math.complex(0, Math.PI / 2))),
          },
        ];
        break;
      case 'RZ': // RZ gate (rotation around Z-axis)
        const theta = Math.PI / 4; // Example rotation angle
        this.state = [
          { ...state0, amplitude: state0.amplitude },
          {
            ...state1,
            amplitude: math.multiply(state1.amplitude, math.exp(math.complex(0, theta))),
          },
        ];
        break;
    }

    this.gateApplied = true;
    this.requestUpdate();
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
            const magnitude = math.abs(amplitude).toFixed(4);
            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);
            const rgb = complex_to_rgb(amplitude, true);
            return html`
              <tr>
                <td>${outcome}</td>
                <td>${outcome.toString(2)}</td>
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
        <h3>${this.gate} Gate Simulator</h3>
        <div>
          ${this.renderTable(this.originalState, 'Original State')}
          ${this.gateApplied ? this.renderTable(this.state, 'After Applying Gate') : ''}
        </div>
        <div class="buttons">
          <button @click="${this.applyGate}" ?disabled="${this.gateApplied}">
            Apply ${this.gate} Gate
          </button>
          <button @click="${this.initializeState}">Reset</button>
        </div>
      </div>
    `;
  }
}

customElements.define('quantum-gate-simulator', QuantumGateSimulator);
