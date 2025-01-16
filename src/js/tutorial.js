import '../lib/algos/component.js';
import '../lib/algos/component2.js';

document.addEventListener('DOMContentLoaded', () => {
    const gates = [
        { id: 'X', title: 'X Gate', gateType: 'X' },
        { id: 'Y', title: 'Y Gate', gateType: 'Y' },
        { id: 'Z', title: 'Z Gate', gateType: 'Z' },
        { id: 'H', title: 'Hadamard Gate', gateType: 'H' },
        { id: 'Phase', title: 'Phase Gate', gateType: 'Phase' },
        { id: 'RZ', title: 'RZ Gate', gateType: 'RZ' }
    ];

    gates.forEach(({ id, title, gateType }) => {
        const container = document.getElementById(id);

        const gateContainer = document.createElement('div');
        gateContainer.style.marginBottom = '30px';

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.style.marginBottom = '10px';

        const quantumGateElement = document.createElement('quantum-gate-simulator');
        quantumGateElement.gate = gateType; // Assign the gate type dynamically

        gateContainer.appendChild(quantumGateElement);

        container.appendChild(gateContainer);
    });

    const viewerContainer = document.getElementById('quantum-viewer-container');

    // Create an instance of the Quantum State Viewer
    const quantumViewer = document.createElement('quantum-state-viewer');
  
    // Set the initial properties (if needed)
    quantumViewer.gate = 'X'; // Example: setting the X-gate
  
    // Append the Quantum State Viewer to the container
    viewerContainer.appendChild(quantumViewer);

});
