import nerdamer from "nerdamer";
import {QuantumCircuit, QuantumRegister} from "../simulator/circuit.js";

function encodeTerm(coeff, vars, circuit, key, value) {
    // Ensure coeff is a number
    if (typeof coeff !== 'number') {
        coeff = coeff.value;
    }

    // Loop through value qubits
    for (let i = 0; i < value.size; i++) {
        if (vars.length > 1) {
            // Apply multi-controlled phase gate (mcp)
            circuit.mcp(Math.PI * 2 ** -i * coeff, vars.map(j => key.get(j)), value.get(i));
        } else if (vars.length > 0) {
            // Apply controlled phase gate (cp)
            circuit.cp(Math.PI * 2 ** -i * coeff, key.get(vars[0]), value.get(i));
        } else {
            // Apply phase gate (p)
            circuit.p(Math.PI * 2 ** -i * coeff, value.get(i));
        }
    }
}

function build_polynomial_circuit(keySize, valueSize, terms) {
    const key = new QuantumRegister(keySize);
    const value = new QuantumRegister(valueSize);
    const circuit = new QuantumCircuit(key, value);

    for (let i = 0; i < keySize; i++) {
        circuit.h(key.get(i));
    }

    for (let i = 0; i < valueSize; i++) {
        circuit.h(value.get(i));
    }

    terms.forEach(([coeff, vars]) => {
        encodeTerm(coeff, vars, circuit, key, value);
    });

    circuit.iqft(value.reverse(), false); // Assuming swap=false is the second argument

    circuit.report('qpe');

    return circuit;
}


function terms_from_poly(poly_str, num_bits, is_poly) {
    //generate bin var list
    const var_list = Array.from({ length: num_bits }, (_, i) => `x${i}`);

    let expanded_expr_str;

    if (is_poly) {
        try {
            const bin_var_terms = Array.from({ length: num_bits }, (_, i) => `${Math.pow(2, i)}*x${i}`);
            const bin_var_str = bin_var_terms.join('+');

            //replace w bin var expr
            const new_poly = poly_str.replace(/x/g, `(${bin_var_str})`);

            const s = nerdamer(new_poly).expand();
            expanded_expr_str = s.toString();
        } catch (error) {
            return "Error: Polynomial should be in the form of a*x^n + b*x^(n-1) + ... + z*x + c";
        }
    } else {
        try {
            const s = nerdamer(poly_str).expand();

            //check if var in var_list
            const free_symbols = s.variables();
            for (let symbol of free_symbols) {
                if (!var_list.includes(symbol)) {
                    return "Error: Invalid symbol";
                }
            }

            expanded_expr_str = s.toString();
        } catch (error) {
            return "Error: Invalid input for binary variables.";
        }
    }

    return binary_expression_to_list(expanded_expr_str, var_list);
}

function binary_expression_to_list(expr_str, var_list) {
    //split by +
    const terms = expr_str.split('+').map(term => term.trim());
    const result = [];

    for (const term of terms) {
        const { coefficient, variables } = extract_coefficient_and_variables(term, var_list);

        result.push([coefficient, variables]);
    }
    return result;
}

function extract_coefficient_and_variables(termStr, varList) {
    let coefficient = 1;
    const variables = [];

    // Improved regex to capture coefficients and variables with exponents
    const regex = /([+-]?\d*\.?\d+)?(?:\*?([a-zA-Z]+\d*)(?:\^(\d+))?)/g;

    let match;
    let foundVariable = false;

    while ((match = regex.exec(termStr)) !== null) {
        const coeffPart = match[1];
        const varPart = match[2];
        const exponentPart = match[3] ? parseInt(match[3]) : 1; // Default exponent is 1

        // Handle coefficient part
        if (coeffPart && !isNaN(parseFloat(coeffPart))) {
            coefficient = parseFloat(coeffPart);
        } else if (termStr.trim().startsWith('-') && !foundVariable) {
            coefficient = -1;
        }

        // Handle variable part and exponent
        if (varPart) {
            varList.forEach((variable, idx) => {
                if (varPart.startsWith(variable)) {
                    // Add the variable index as many times as the exponent
                    for (let i = 0; i < exponentPart; i++) {
                        variables.push(idx);
                    }
                    foundVariable = true;
                }
            });
        }
    }

    // If no variable found, treat it as a constant
    if (!foundVariable) {
        coefficient = parseFloat(termStr);
    }

    return { coefficient, variables };
}


export {
    build_polynomial_circuit,
    terms_from_poly
};