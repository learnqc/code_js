# humejs

humejs is a JavaScript-based application for encoding and visualizing quantum circuits. The project includes various modules for function encoding, frequency encoding, and quantum circuit visualization, using a variety of libraries and tools for computation and rendering.

## Features
- **Quantum Transformation Simulator:** Interactive visualization of quantum states and transformations, with step-by-step pair processing
- **Function Encoding:** Encodes mathematical functions for quantum processing.
- **Frequency Encoding:** Encodes frequencies to simulate quantum systems.
- **Quantum Circuit Visualization:** Visualizes quantum circuits and their state transitions.

## Technologies Used
- **JavaScript ES6+**
- **D3.js**: For visualizing data.
- **Math.js**: For performing mathematical operations.
- **Nerdamer**: For symbolic mathematics.
- **Tabulator**: For displaying data tables.
- **@microsoft/quantum-viz.js**: For visualizing quantum circuits.
- **Webpack**: For bundling JavaScript files and assets.
- **Babel**: For transpiling modern JavaScript.
- **gh-pages**: For deploying to GitHub Pages.
- **Lit**: For building web components.

## Project Structure
```
humejs/
├── dist/                     # Build output
│   └── index.html            # Main entry point to run the program
├── public/                   # Static HTML files
│   ├── chapter04.html
│   ├── frequency_encoding.html
│   ├── function_encoding.html
│   ├── index.html
│   ├── quantum_circuit.html
│   └── primer.html         # Tutorial with quantum transformation simulator
├── src/
│   ├── js/
│   │   ├── chapter03.js
│   │   ├── chapter04.js
│   │   ├── frequency_encoding.js
│   │   ├── function_encoding.js
│   │   ├── quantum_circuit.js
│   │   └── primer.js
│   └── lib/
│       ├── algos/
│       │   ├── component.js      # Quantum gate simulator component
│       │   ├── component2.js     # Quantum state viewer component
│       │   ├── frequency_encoding.js
│       │   ├── function_encoding.js
│       │   └── quantum_circuit.js
│       ├── simulator/
│       │   ├── circuit.js
│       │   ├── core.js
│       │   └── gates.js
│       └── utils/
│           ├── colormap.json
│           ├── common.js
│           └── matrix.js
├── webpack.config.cjs        # Webpack configuration file
├── package.json              # Project dependencies
├── package-lock.json         # Lockfile for npm
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/humejs.git
    ```
2. Navigate to the project directory:
    ```bash
    cd humejs
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. **Build the project**:
    ```bash
    npm run build
    ```
    This will bundle the JavaScript files and output them to the `dist/` folder.
   
2. **Run the program**:
   Open the `index.html` file located in the `dist/` folder in your web browser.

3. **Compile changes**:
   Changes automatically compiled with `webpack --watch`

4. **Deploy to GitHub Pages**:
    ```bash
    npm run deploy
    ```
    This will deploy the `dist/` folder to the `gh-pages` branch on GitHub.

## Webpack Configuration

- Entry Points:
    - `chapter03.js`, `chapter04.js`: Logic for individual chapters
    - `function_encoding.js`: Function encoding logic
    - `frequency_encoding.js`: Frequency encoding logic
    - `quantum_circuit.js`: Quantum circuit logic
    - `primer.js`: Tutorial page with quantum transformation simulator
    
- Output:
    - Bundled files are output to the `dist/` folder, cleaned before each build
    
- Plugins:
    - `HtmlWebpackPlugin`: Generates HTML files for all pages
    - `CopyWebpackPlugin`: Copies static assets like `colormap.json`
    - `Lit`: For building web components used in the quantum transformation simulator

## License

This project is licensed under the ISC License.
