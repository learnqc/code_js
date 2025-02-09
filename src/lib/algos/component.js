import { LitElement, html, css } from 'lit';
// Make sure you have math.js or similar library available
// so that 'math' is recognized (e.g., import * as math from 'mathjs';)

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
  [46, 221, 192], [45, 223, 197], [44, 225, 202], [44, 225, 202], [43, 227, 206], [42, 228, 211], [40, 230, 215], [40, 230, 215],
];

// Convert a complex amplitude to an RGB color (from our colormap) based on the phase.
function complex_to_rgb(c, ints = false) {
  const a = math.re(c);
  const b = math.im(c);

  let hue = (Math.atan2(b, a) / Math.PI) * 180;
  if (hue < 0) hue += 360;

  const hueIndex = Math.round(hue);
  const boundedIndex = Math.min(hueIndex, colormap.length - 1);

  const rgb = colormap[boundedIndex];
  if (ints) {
    return rgb;  // [r, g, b] in integer form
  } else {
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]; // [r, g, b] in float
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
      gap: 20px;
      margin-top: 20px;
      justify-content: center;
    }
    .wheel-container {
      text-align: center;
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
        yellow,
        orange,
        red,
        magenta,
        blue,
        cyan,
        lime,
        yellow 
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
      math.add(
        math.pow(math.abs(amplitude0), 2),
        math.pow(math.abs(amplitude1), 2)
      )
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
    const getArrow = (amplitude) => {
      let directionDeg = (math.arg(amplitude) * 180) / Math.PI;
      if (directionDeg < 0) directionDeg += 360;
      // Shift so 0 deg is at 12 o'clock
      const directionFromTop = (directionDeg - 90 + 360) % 360;
      const magnitude = math.abs(amplitude);
      const radius = 75; // half of 150
      const cx = 75;
      const cy = 75;
      const arrowLength = magnitude * radius;
      const rad = (directionFromTop * Math.PI) / 180;
      const x2 = cx + arrowLength * Math.cos(rad);
      const y2 = cy + arrowLength * Math.sin(rad);
      return { x2, y2, rad };
    };
  
    const offset = 20; // offset in pixels
    const arrow0 = getArrow(amplitude0);
    const arrow1 = getArrow(amplitude1);
  
    // Compute text positions with offset applied in the arrow's direction
    const text0X = arrow0.x2 + offset * Math.cos(arrow0.rad);
    const text0Y = arrow0.y2 + offset * Math.sin(arrow0.rad);
    const text1X = arrow1.x2 + offset * Math.cos(arrow1.rad);
    const text1Y = arrow1.y2 + offset * Math.sin(arrow1.rad);
  
    return html`
      <div class="color-wheel-container">
        <!-- Conic gradient background -->
        <div class="color-wheel"></div>
  
        <!-- Arrow overlay -->
        <svg class="arrow-overlay" width="150" height="150" viewBox="0 0 150 150" style="overflow: visible;">
          <!-- Arrow for Outcome 0 -->
          <line x1="75" y1="75" x2="${arrow0.x2}" y2="${arrow0.y2}" stroke="black" stroke-width="3"/>
          <text x="${text0X}" y="${text0Y}" text-anchor="middle" font-size="20" fill="black" font-weight="bold">0</text>
  
          <!-- Arrow for Outcome 1 -->
          <line x1="75" y1="75" x2="${arrow1.x2}" y2="${arrow1.y2}" stroke="black" stroke-width="3"/>
          <text x="${text1X}" y="${text1Y}" text-anchor="middle" font-size="20" fill="black" font-weight="bold">1</text>
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
            const magnitude = math.abs(amplitude).toFixed(4);
            const direction = ((math.arg(amplitude) * 180) / Math.PI).toFixed(1);
            const rgb = complex_to_rgb(amplitude, true);

            return html`
              <tr>
                <td>${outcome}</td>
                <td>${outcome.toString(2)}</td>
                <td>
                  ${math.format(amplitude, { notation: 'fixed', precision: 4 })}
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
        <div>
          <!-- State tables for Before / After -->
          ${this.renderTable(this.originalState, 'Original State')}
          ${this.gateApplied ? this.renderTable(this.state, 'After Applying Gate') : ''}
        </div>

        <!-- Buttons to apply gate and reset -->
        <div class="buttons">
          <button @click="${this.applyGate}" ?disabled="${this.gateApplied}">
            Apply ${this.gate} Gate
          </button>
          <button @click="${this.initializeState}">Reset</button>
        </div>

        <!-- Color Wheels for Before / After -->
        <div class="color-wheels">
          <!-- Original State Wheels -->
          <div class="wheel-container">
            <div class="wheel-title">Before Gate</div>
            ${this.renderColorWheel(this.originalState[0].amplitude, this.originalState[1].amplitude)}
          </div>

          <!-- (Conditional) After State Wheels -->
          ${this.gateApplied
            ? html`
                <div class="wheel-container">
                  <div class="wheel-title">After Gate</div>
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
