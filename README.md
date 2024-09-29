# humejs

humejs is a JavaScript-based application for encoding and visualizing quantum circuits. The project includes various modules for function encoding, frequency encoding, and quantum circuit visualization, using a variety of libraries and tools for computation and rendering.

## Features
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

## Project Structure
```
humejs/
├── dist/               # Build output
├── public/             # Static HTML files
│   ├── function_encoding.html
│   ├── frequency_encoding.html
│   └── quantum_circuit.html
├── src/
│   ├── js/
│   │   ├── function_encoding.js   # Handles function encoding logic
│   │   ├── frequency_encoding.js  # Handles frequency encoding logic
│   │   └── quantum_circuit.js     # Quantum circuit simulation logic
│   └── lib/
│       └── utils/
│           └── colormap.json      # Color map for visualizations
└── webpack.config.js   # Webpack configuration file
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
   
2. **Development Mode**:
    ```bash
    npm run build
    ```
    This will keep Webpack running in watch mode, rebuilding on file changes.

3. **Run the Application**:
    Use a local server to serve files from the `dist/` folder. You can use a tool like `live-server` or `http-server`:
    ```bash
    npm install -g live-server
    live-server dist/
    ```

4. **Deploy to GitHub Pages**:
    ```bash
    npm run deploy
    ```
    This will deploy the `dist/` folder to GitHub Pages.

## Webpack Configuration

- Entry Points:
    - `function_encoding.js`: Function encoding logic.
    - `frequency_encoding.js`: Frequency encoding logic.
    - `quantum_circuit.js`: Quantum circuit logic.
    
- Output:
    - Bundled files are output to the `dist/` folder, cleaned before each build.
    
- Plugins:
    - `HtmlWebpackPlugin`: Generates HTML files for function encoding, frequency encoding, and quantum circuit pages.
    - `CopyWebpackPlugin`: Copies `colormap.json` for use in visualizations.

## License

This project is licensed under the ISC License.
