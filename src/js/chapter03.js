import * as math from 'mathjs';
import {state_table_to_html} from "../lib/utils/common.js";

function radiansToDegrees(rad) {
    return (rad * 180 / Math.PI).toFixed(2) + "°";
}

// Display helper
function displayStep(title, code, output) {
    const tutorialDiv = document.getElementById("tutorial");

    const stepDiv = document.createElement("div");
    stepDiv.style.marginBottom = "20px";

    const titleEl = document.createElement("p");
    titleEl.textContent = title;

    const codeEl = document.createElement("pre");
    codeEl.textContent = code;
    codeEl.style.backgroundColor = "#f9f9f9";
    codeEl.style.padding = "10px";
    codeEl.style.border = "1px solid #ccc";
    codeEl.style.marginBottom = "2px";

    const outputEl = document.createElement("div");
    outputEl.innerHTML = output;
    outputEl.style.fontFamily = "Roboto, sans-serif";
    outputEl.style.fontSize = "14px";


    stepDiv.appendChild(titleEl);
    stepDiv.appendChild(codeEl);
    stepDiv.appendChild(outputEl);
    tutorialDiv.appendChild(stepDiv);
}

let state = [math.complex(0.2958, 0.51235), math.complex(-0.40311+0.69821)];
let output = state[0].toString();
displayStep(
    `In JavaScript, we use the mathjs library to use complex numbers. "i" is the imaginary unit in JavaScript. 
    We can represent single-qubit quantum states using a list of these complex numbers.`,
    "let state = [math.complex(0.2958, 0.51235), math.complex(-0.40311+0.69821)];\n" +
    "let output = state[0].toString();",
    output
);

let state1 = [math.complex(1), math.complex(0)];
let state2 = [math.complex(0), math.complex(1)];
let state3 = [math.complex(math.sqrt(1/2)), math.complex(math.sqrt(1/2))];
let state4 = [math.complex(math.sqrt(0.3)), math.complex(math.sqrt(0.3))];
displayStep(
    "A few single-qubit state examples",
    "let state1 = [math.complex(1), math.complex(0)];\n" +
    "let state2 = [math.complex(0), math.complex(1)];\n" +
    "let state3 = [math.complex(math.sqrt(1/2)), math.complex(math.sqrt(1/2))];\n" +
    "let state4 = [math.complex(math.sqrt(0.3)), math.complex(math.sqrt(0.3))];",
    ""
);

state = [math.complex(1), math.complex(0)];
output = `${parseFloat(math.re(state[0]))} ${parseFloat(math.im(state[0]))}`;
displayStep(
    "We can get the real and imaginary parts using math.re() and math.im()",
    "state = [math.complex(1), math.complex(0)];\n" +
    "output = `${parseFloat(math.re(state[0]))} ${parseFloat(math.im(state[0]))}`;\n",
    output
);

state = [math.complex(1), math.complex(0)];
let magnitude = math.abs(state[0]) ** 2 + math.abs(state[1]) ** 2;
displayStep(
    "The sum of the squared magnitudes must be 1 for a valid quantum state.",
    "state = [math.complex(1), math.complex(0)];\n" +
    "let magnitude = math.abs(state[0]) ** 2 + math.abs(state[1]) ** 2;",
    magnitude
);

state = [math.complex(math.sqrt(0.3)), math.complex(-math.sqrt(0.7))];
displayStep(
    "Example of a negative real number amplitude, whose angle is 180 degrees, or pi radians.",
    "state = [math.complex(math.sqrt(0.3)), math.complex(-math.sqrt(0.7))];\n",
    ""
);

let direction = math.atan2(parseFloat(math.im(state[1])), parseFloat(math.re(state[1])));
displayStep(
    "Get the direction of an amplitude in radians using math.atan2()",
    "let direction = math.atan2(parseFloat(math.im(state[1])), parseFloat(math.re(state[1])));\n",
    direction
);

direction = direction * (180/Math.PI);
displayStep(
    "Convert from radians to degrees",
    "direction = direction * (180/Math.PI);\n",
    direction
);

state = [
    math.complex(math.sqrt(0.3) * math.cos((5*Math.PI)/7), math.sqrt(0.3) * math.sin((5*Math.PI)/7)),
    math.complex(math.sqrt(0.7) * math.cos(Math.PI/5), math.sqrt(0.7) * math.sin(Math.PI/5))
];
output = "";
for(let i = 0; i < state.length; i++) { output += `[${state[i].toString()}]<br>`}
displayStep(
    "Example state with amplitude directions 5pi/7 and pi/5 radians",
    "state = [\n" +
    "    math.complex(math.sqrt(0.3) * math.cos((5*Math.PI)/7), math.sqrt(0.3) * math.cos((5*Math.PI)/7)),\n" +
    "    math.complex(math.sqrt(0.7) * math.cos(Math.PI/5), math.sqrt(0.7) * math.cos(Math.PI/5))\n" +
    "];\n" +
    "output = \"\";",
    output
);

magnitude = math.abs(state[0]);
displayStep(
    "Get the magnitude of an amplitude",
    "magnitude = math.abs(state[0]);\n",
    magnitude
);

magnitude = math.abs(state[0]) ** 2;
displayStep(
    "Get the probability of an outcome by squaring the magnitude",
    "magnitude = math.abs(state[0]) ** 2;",
    magnitude
);

displayStep(
    "In this tutorial, we will use the state_table_to_html from common.js",
    "// import {state_table_to_html} from \"../lib/utils/common.js\";\n" +
    "(async () => {\n" +
    "    let table = document.createElement(\"div\");\n" +
    "    table.id = \"state_table\";\n" +
    "    document.getElementById(\"tutorial\").appendChild(table);\n" +
    "\n" +
    "    await state_table_to_html(state, \"state_table\");\n" +
    "})();",
    ""
);
// import {state_table_to_html} from "../lib/utils/common.js";
(async () => {
    let table = document.createElement("div");
    table.id = "state_table";
    document.getElementById("tutorial").appendChild(table);

    await state_table_to_html(state, "state_table");
})();














