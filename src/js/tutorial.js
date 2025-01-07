import '../lib/algos/component.js';

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
});
