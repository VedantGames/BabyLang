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
                console.log(variables, variables[value]);
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
            console.log("aa", i,block[i]);
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
                    //console.log("cc", evaluateCondition(condition), condition);
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
                    console.log(i, block[i], openB);
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
                console.log(condition, evaluateCondition(condition));
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