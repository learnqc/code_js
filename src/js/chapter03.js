import {state_table_to_html} from "../lib/utils/common.js";

let sharedContext = {
    math: math,  
    state: [],  
    state_table_to_html: state_table_to_html 
  };
  
  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.37.0/min/vs' }});
  
  require(['vs/editor/editor.main'], function() {
  
    let codeHistory = [];  
  
    function displayStepAndEditor(title, code) {
      const tutorialDiv = document.getElementById("tutorial");
  
      const stepDiv = document.createElement("div");
      stepDiv.className = "step-container";
  
      const titleEl = document.createElement("p");
      titleEl.className = "step-title";
      titleEl.textContent = title;
  
      const editorContainer = document.createElement('div');
      editorContainer.className = 'editor-container';
      const outputContainer = document.createElement('div');
      outputContainer.className = 'output';
  
      const runButton = document.createElement('button');
      runButton.className = 'run-button';
      runButton.innerText = 'Run Code';
  
      stepDiv.appendChild(titleEl);
      stepDiv.appendChild(editorContainer);
      stepDiv.appendChild(outputContainer);
      stepDiv.appendChild(runButton);
  
      tutorialDiv.appendChild(stepDiv);
  
      const editor = monaco.editor.create(editorContainer, {
        value: code,
        language: 'javascript'
      });
  
      // Run the code when the button is clicked
      runButton.onclick = function() {
        runCode(editor, outputContainer);
      };
    }
  
    function runCode(editor, outputContainer) {
        const code = editor.getValue();
        outputContainer.innerText = ''; // Clear previous output
      
        // Combine previous code with the current editor's code
        const fullCode = codeHistory.join('\n') + '\n' + code;
      
        try {
          let result = (function() {
            // Pass the context (math, state) into the function, but avoid reassigning 'state'
            let { math, state, state_table_to_html } = sharedContext;
            return eval(fullCode);  // Execute the accumulated code with the shared context
          })();
      
          // If result is undefined, return a default message
          if (result === undefined) {
            result = "No return value from the code.";
          }
      
          // Update the shared output and display it
          sharedContext.output = result;
          outputContainer.innerText = 'Output: ' + result;
      
          // Save the current code for the next step
          codeHistory.push(code);
      
        } catch (error) {
          outputContainer.innerText = 'Error: ' + error.message;
        }
      }
      
  
    // Step 1: Define a quantum state using complex numbers
    displayStepAndEditor(
      `In JavaScript, we use the mathjs library to work with complex numbers. 
       We can represent single-qubit quantum states using a list of complex numbers.`,
      "let state = [math.complex(0.2958, 0.51235), math.complex(-0.40311, 0.69821)];\n" +
      "let output = state[0].toString();\noutput;"
    );
  
    // Step 2: Modify the state in the context
    displayStepAndEditor(
      "We can update the quantum state. Let's redefine it.",
      "state = [math.complex(1, 0), math.complex(0, 0)];\n" +
      "output = state[0].toString();\noutput;"
    );
  
    // Step 3: Get the real and imaginary parts of the state
    displayStepAndEditor(
      "We can get the real and imaginary parts of the state in the context.",
      "let realPart = math.re(state[0]);\nlet imaginaryPart = math.im(state[0]);\n" +
      "`${realPart}, ${imaginaryPart}`;"
    );
  
    // Step 4: Verify the sum of squared magnitudes of the quantum state
    displayStepAndEditor(
      "The sum of the squared magnitudes must be 1 for a valid quantum state.",
      "let magnitude = math.abs(state[0]) ** 2 + math.abs(state[1]) ** 2;\nmagnitude;"
    );
  
    // Step 5: Show an example of a quantum state with a negative real number amplitude
    displayStepAndEditor(
      "Example of a negative real number amplitude, whose angle is 180 degrees, or pi radians.",
      "state = [math.complex(math.sqrt(0.3)), math.complex(-math.sqrt(0.7))];\n" +
      "state[0].toString();"
    );
  
    // Step 6: Get the direction (angle) of an amplitude in radians
    displayStepAndEditor(
      "Get the direction of an amplitude in radians using math.atan2()",
      "let direction = math.atan2(math.im(state[1]), math.re(state[1]));\ndirection;"
    );
  
    // Step 7: Convert the direction from radians to degrees
    displayStepAndEditor(
      "Convert from radians to degrees",
      "let directionInDegrees = direction * (180 / Math.PI);\ndirectionInDegrees;"
    );
  
    // Step 8: Example quantum state with amplitude directions 5pi/7 and pi/5 radians
    displayStepAndEditor(
      "Example state with amplitude directions 5pi/7 and pi/5 radians",
      "state = [\n" +
      "    math.complex(math.sqrt(0.3) * math.cos(5*Math.PI/7), math.sqrt(0.3) * math.sin(5*Math.PI/7)),\n" +
      "    math.complex(math.sqrt(0.7) * math.cos(Math.PI/5), math.sqrt(0.7) * math.sin(Math.PI/5))\n" +
      "];"
    );
  
    // Step 9: Get the magnitude of an amplitude
    displayStepAndEditor(
      "Get the magnitude of an amplitude",
      "magnitude = math.abs(state[0]);\nmagnitude;"
    );
  
    // Step 10: Get the probability of an outcome by squaring the magnitude
    displayStepAndEditor(
      "Get the probability of an outcome by squaring the magnitude",
      "let probability = math.abs(state[0]) ** 2;\nprobability;"
    );
    

    displayStepAndEditor(
        "In this tutorial, we will use the state_table_to_html from common.js",
        `(async () => {
            await state_table_to_html(state, "state_table");
        })();`
    )
    
    let table = document.createElement("div");
    table.id = "state_table";
    document.getElementById("tutorial").appendChild(table);


  
  });
  