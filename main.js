function interpret() {
    const input = document.getElementById('input').value.split('\n');
    let output = '<span style="color: green;">Yee Baby, That Works!!!</span>';
    const variables = {};

    function evaluateCondition(condition) {
        const parts = condition.match(/([^=<>!]+)|([=<>!]+)/g).map(part => part.trim());
  
        if (parts.length !== 3) {
            console.error(`Invalid condition format: ${condition}`);
            return false;
        }
  
        const value1 = parseInt(evaluateArithmetic(parts[0]));
        const operator = parts[1];
        const value2 = parseInt(evaluateArithmetic(parts[2]));
  
        if (value1 === null || value2 === null) {
            console.error(`Error evaluating operands in condition: ${condition}`);
            return false;
        }
  
        switch (operator) {
            case '==':
                return value1 == value2;
            case '!=':
                return value1 != value2;
            case '>':
                return value1 > value2;
            case '<':
                return value1 < value2;
            case '>=':
                return value1 >= value2;
            case '<=':
                return value1 <= value2;
            default:
                console.error(`Invalid operator: ${operator}`);
                return false;
        }
    }
  
    function evaluateArithmetic(value) {
      const variableRegex = /[a-zA-Z]+/g;
  
      const replacedValue = value.replace(variableRegex, match => variables[match] || match);
  
      if (replacedValue.includes('+') || replacedValue.includes('-') || replacedValue.includes('*') || replacedValue.includes('/')) {
          try {
              return eval(replacedValue);
          } catch (error) {
              console.error(`Error evaluating arithmetic expression: ${value}`);
              return NaN;
          }
      } else if (replacedValue in variables) {
          return variables[replacedValue];
      }
      return replacedValue;
    }
  
    function babyBolo(values, i) {
      output += "<br>> ";
      values.forEach(value => {
            if (value.includes('+') || value.includes('-') || value.includes('*') || value.includes('/')) {
                output += evaluateArithmetic(value, i + 1) + ' ';
            } else if (value in variables) {
                output += variables[value] + ' ';
            } else {
                output += value + ' ';
            }
        });
    }

    function interpretBlock(block) {
        let conditionMet = false;
        let i = 0;
        while (i < block.length) {
            const subStatement = block[i].trim();
            if (subStatement.split(' ')[0] in variables) { 
                const parts = subStatement.split('=')
                const variable = parts[0].trim();
                let value = parts[1].trim();
                variables[variable] = evaluateArithmetic(value);
            } else if (subStatement.startsWith('baby ye h')) {
                const parts = subStatement.split('=');
                const variable = parts[0].split(' ')[3].trim();
                let value = parts[1].trim();
                variables[variable] = evaluateArithmetic(value);
            } else if (subStatement.startsWith('baby bolo')) {
                const values = subStatement.substring(9).trim().split(',');
                babyBolo(values, i);
            } else if (subStatement.startsWith('baby agar')) {
                const condition = subStatement.substring(9).trim();
                
                if (!conditionMet) {
                    if (evaluateCondition(condition)) {
                        conditionMet = true;
                        let bracketLineCount = 1;
                        let openB = 0;
                        while (bracketLineCount+i < block.length -1) {
                            if (block[i+bracketLineCount].includes('}')) {
                                if (openB == 0) {
                                    break
                                }
                                openB--;
                            } else if (block[i+bracketLineCount].includes('{'))
                                openB++;
                            bracketLineCount++;
                        }
                        interpretBlock(block.slice(i + 1, i+bracketLineCount));
                        i += bracketLineCount;
                    } else {

                        let openB = -1;
                        while (i < block.length) {
                            if (block[i].includes("}")) {
                                if (openB == 0) {
                                    break
                                }
                                openB--;
                            } else if (block[i].includes("{")) 
                            openB++;
                            i++;
                        }
                    }
                }
            } else if (subStatement.startsWith('nahi to baby')) {
                const condition = subStatement.substring(12).trim();

                if (!conditionMet) {
                    if (evaluateCondition(condition)) {
                        conditionMet = true;
                        let bracketLineCount = 0;
                        let openB = -1;
                        while (bracketLineCount < block.length) { 
                            if (block[i+bracketLineCount].includes("}")) {
                                if (openB == 0) {
                                    break
                                }
                                openB--;
                            } else if (block[i+bracketLineCount].includes("{"))
                                openB++;
                            bracketLineCount++;
                        }
                        interpretBlock(block.slice(i + 1, i+bracketLineCount));
                        i += bracketLineCount;
                    } else {
                        let openB = -1;
                        while (i < block.length) { 
                            if (block[i].includes("}")) {
                                if (openB == 0) {
                                    break
                                }
                                openB--;
                            } else if (block[i].includes("{")) 
                                openB++;
                            i++;
                        }
                    }
                } else {
                    let openB = -1;
                    while (i < block.length) {
                        if (block[i].includes("}")) {
                            if (openB == 0) {
                                break
                            }
                            openB--;
                        } else if (block[i].includes("{")) {
                            openB++;
                        }
                        i++;
                    }
                }
            } else if (subStatement.startsWith('warna') && conditionMet) {
                let openB = -1;
                while (i < block.length) {
                    if (block[i].includes("}")) {
                        if (openB == 0) {
                            break
                        }
                        openB--;
                    } else if (block[i].includes("{")) 
                        openB++;
                    i++;
                }
            } else if (subStatement.startsWith('baby jab tak')) {
                const condition = subStatement.substring(12).trim();
                if (evaluateCondition(condition)) {
                    let bracketLineCount = 0;
                    while (evaluateCondition(condition)) {
                        bracketLineCount = 0;
                        let found = false
                        let openB = -1;
                        while (!found && i+bracketLineCount < block.length) { 
                            if (block[i+bracketLineCount].includes("}")) {
                                if (openB == 0) {
                                    found = true;
                                    break
                                }
                                openB--;
                            } else if (block[i+bracketLineCount].includes("{")) {
                                openB++;
                                }
                            bracketLineCount++;
                        }
                        interpretBlock(block.slice(i + 1, i+bracketLineCount));
                    }
                    i += bracketLineCount;
                } else {
                    let openB = -1;
                    while (i < block.length) { 
                        if (block[i].includes("}")) {
                            if (openB == 0) {
                                break
                            }
                            openB--;
                        } else if (block[i].includes("{")) 
                            openB++;
                        i++;
                    }
                }
            }
            i++;
        }
    }

    interpretBlock(input);

    document.getElementById('output').style.visibility = "visible";
    document.getElementById('output').style.display = "block";
    document.getElementById('output').innerHTML = output;
}

function syntaxHighlighting() {
    editor = document.getElementById('input');
    code = editor.value.split('\n');
    output = document.getElementById('stxHighlighter');

    var e = [];

    output.innerHTML = "";
    let n = 0;
    while (n < code.length) {
        line = code[n];
        trimmed = line.trim();
        splitted = trimmed.split(' ');
        var maxReached = 0;

        e.push("<span class='numberLine'>" + (n+1) + "   </span><span>");
        let m = 0;
        while (line.split(' ')[m] == '') {
            e.push(' ');
            m++;
        }
        e.push("</span>");
        if (trimmed.startsWith('baby chalo shuru karte h')) {
            e.push("<span class='keyword'>baby chalo shuru karte h </span>");
            maxReached = 5;
        } else if (line.startsWith('bas baby ab ho gya')) {
            e.push("<span class='keyword'>bas baby ab ho gya </span>");
            maxReached = 5;
        } else if (trimmed.startsWith('baby ye h')) {
            maxReached = 6;
            e.push("<span class='keyword'>baby ye h </span>");
            e.push((splitted[3] == undefined) ? '' : splitted[3] + ' ');
            if (splitted[4] == '=') 
                e.push("<span class='operator'>= </span>");
            else 
                maxReached = 4;
            let variable = splitted[5];
            if (variable == undefined) {
                console.log("asd");
            } else if (parseInt(variable) == variable || variable == 'sahi' || variable == 'galat') {
                e.push("<span class='number'>" + variable + " </span>");
            } else if (variable == 'nalla') {
                e.push("<span class='keyword'>" + variable + " </span>");
            } else {
                e.push("<span>" + variable + " </span>");
            }
        } else if (trimmed.startsWith('baby bolo')) {
            maxReached = 3;
            e.push("<span class='keyword'>baby bolo </span>");
            let variable = splitted[2];
            if (variable == undefined) {
                console.log("asd");
            } else if (parseInt(variable) == variable || variable == 'sahi' || variable == 'galat') {
                e.push("<span class='number'>" + variable + " </span>");
            } else if (variable == 'nalla') {
                e.push("<span class='keyword'>" + variable + " </span>");
            } else if (variable.startsWith('"') && line.endsWith('"')) {
                var p = 3;
                e.push("<span class='string'>" + variable + " </span>");
                while (!splitted[p].endsWith('"') && p < splitted.length) {
                    e.push("<span class='string'>" + splitted[p] + " </span>");
                    p++;
                    maxReached++;
                }
                maxReached++;
                e.push("<span class='string'>" + splitted[p] + " </span>");
            } else {
                e.push("<span>" + variable + " </span>");
            }
        } else if (trimmed.startsWith('baby agar')) {
            maxReached = 2;
            e.push("<span class='keyword'>baby agar </span>");
            for (let x = 2; x < splitted.length; x++) {
                maxReached++;
                if (splitted[x] == '+' || splitted[x] == '-' || splitted[x] == '*' || splitted[x] == '/' || splitted[x] == '==' || splitted[x] == '<' || splitted[x] == '>' || splitted[x] == '<=' || splitted[x] == '>=' || splitted[x] == '!=') {
                    e.push("<span class='operator'>" + splitted[x] + " </span>");
                } else if (parseInt(splitted[x]) == splitted[x] || splitted[x] == 'sahi' || splitted[x] == 'galat') {
                    e.push("<span class='number'>" + splitted[x] + " </span>");
                } else if (splitted[x] == 'nalla') {
                    e.push("<span class='keyword'>nalla </span>");
                }
                 else {
                    e.push("<span>" + splitted[x] + " </span>");
                }
            }
        } else if (trimmed.startsWith('nahi to baby')) {
            maxReached = 3;
            e.push("<span class='keyword'>nahi to baby </span>");
            for (let x = 3; x < splitted.length; x++) {
                maxReached++;
                if (splitted[x] == '+' || splitted[x] == '-' || splitted[x] == '*' || splitted[x] == '/' || splitted[x] == '==' || splitted[x] == '<' || splitted[x] == '>' || splitted[x] == '<=' || splitted[x] == '>=' || splitted[x] == '!=') {
                    e.push("<span class='operator'>" + splitted[x] + " </span>");
                } else if (parseInt(splitted[x]) == splitted[x] || splitted[x] == 'sahi' || splitted[x] == 'galat') {
                    e.push("<span class='number'>" + splitted[x] + " </span>");
                } else if (splitted[x] == 'nalla') {
                    e.push("<span class='keyword'>nalla </span>");
                }
                 else {
                    e.push("<span>" + splitted[x] + " </span>");
                }
            }
        } else if (trimmed.startsWith('baby jab tak')) {
            maxReached = 3;
            e.push("<span class='keyword'>baby jab tak </span>");
            for (let x = 3; x < splitted.length; x++) {
                maxReached++;
                if (splitted[x] == '+' || splitted[x] == '-' || splitted[x] == '*' || splitted[x] == '/' || splitted[x] == '==' || splitted[x] == '<' || splitted[x] == '>' || splitted[x] == '<=' || splitted[x] == '>=' || splitted[x] == '!=') {
                    e.push("<span class='operator'>" + splitted[x] + " </span>");
                } else if (parseInt(splitted[x]) == splitted[x] || splitted[x] == 'sahi' || splitted[x] == 'galat') {
                    e.push("<span class='number'>" + splitted[x] + " </span>");
                } else if (splitted[x] == 'nalla') {
                    e.push("<span class='keyword'>nalla </span>");
                }
                 else {
                    e.push("<span>" + splitted[x] + " </span>");
                }
            } 
        } else if (trimmed.startsWith('warna')) {
            maxReached = 1;
            e.push("<span class='keyword'>warna </span>");
        }
        for (let x = maxReached; x < splitted.length; x++) {
            e.push(splitted[x] + ' ');
        }
        e.push('<br>');
        n++;
    }
    output.innerHTML += e.join('');
}

const textarea = document.getElementById('input');
const outputDiv = document.getElementById('stxHighlighter');
textarea.addEventListener('scroll', function() {
    outputDiv.scrollTop = textarea.scrollTop;
});

document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        var textarea = event.target;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;

        textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);

        textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
});