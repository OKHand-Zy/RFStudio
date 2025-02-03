// https://github.com/google/blockly-samples/blob/243cbee076af7d44f0958367e6c624e8dd141bfc/codelabs/custom_generator/custom_generator.md
import { pythonGenerator } from 'blockly/python';

// Create custom Robot Framework generator
export const robotframeworkGenerator = new pythonGenerator();


// Override the scrub_ method to handle Robot Framework indentation
robotGenerator.scrub_ = function(block, code, opt_thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = '';
  
  if (nextBlock) {
    nextCode = opt_thisOnly ? '' : '\n' + this.blockToCode(nextBlock);
  }
  
  // Add proper indentation for Robot Framework (4 spaces)
  return code.split('\n')
    .map(line => line.trim() ? '    ' + line : line)
    .join('\n') + nextCode;
};

// Add support for basic Robot Framework commands
robotGenerator.forBlock['robot_log'] = function(block) {
  const message = block.getFieldValue('MESSAGE');
  return `Log    ${message}\n`;
};

robotGenerator.forBlock['robot_run_keyword'] = function(block) {
  const keyword = robotGenerator.formatKeyword(block.getFieldValue('KEYWORD'));
  const args = block.getFieldValue('ARGUMENTS') || '';
  return `Run Keyword    ${keyword}    ${args}\n`;
};

robotGenerator.forBlock['robot_should_be_equal'] = function(block) {
  const actual = block.getFieldValue('ACTUAL');
  const expected = block.getFieldValue('EXPECTED');
  return `Should Be Equal    ${actual}    ${expected}\n`;
};

// Format condition for Robot Framework syntax
robotGenerator.formatCondition = function(condition) {
  // Replace Python operators with Robot Framework operators
  return condition
    .replace(/==/g, '==')
    .replace(/!=/g, '!=')
    .replace(/>/g, '>')
    .replace(/>=/g, '>=')
    .replace(/</g, '<')
    .replace(/<=/g, '<=')
    .replace(/\band\b/gi, 'and')
    .replace(/\bor\b/gi, 'or')
    .replace(/\bnot\b/gi, 'not')
    .trim();
};

// Handle IF blocks
robotGenerator.forBlock['controls_if'] = function(block) {
  let code = '';
  let conditionCode;
  
  // IF block
  conditionCode = robotGenerator.valueToCode(block, 'IF0', robotGenerator.ORDER_NONE) || 'True';
  const branch0 = robotGenerator.statementToCode(block, 'DO0');
  code += `IF    ${robotGenerator.formatCondition(conditionCode)}\n${branch0}`;
  
  // ELSE IF blocks
  for (let i = 1; i <= block.elseifCount_; i++) {
    conditionCode = robotGenerator.valueToCode(block, 'IF' + i, robotGenerator.ORDER_NONE) || 'True';
    const branchCode = robotGenerator.statementToCode(block, 'DO' + i);
    code += `ELSE IF    ${robotGenerator.formatCondition(conditionCode)}\n${branchCode}`;
  }
  
  // ELSE block
  if (block.elseCount_) {
    const branchCode = robotGenerator.statementToCode(block, 'ELSE');
    code += `ELSE\n${branchCode}`;
  }
  
  code += 'END\n';
  return code;
};

// Handle comparison blocks
robotGenerator.forBlock['logic_compare'] = function(block) {
  const operator = block.getFieldValue('OP');
  const argument0 = robotGenerator.valueToCode(block, 'A', robotGenerator.ORDER_ATOMIC) || '0';
  const argument1 = robotGenerator.valueToCode(block, 'B', robotGenerator.ORDER_ATOMIC) || '0';
  
  const operators = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  
  return [`${argument0} ${operators[operator]} ${argument1}`, robotGenerator.ORDER_RELATIONAL];
};

// Handle logical operation blocks
robotGenerator.forBlock['logic_operation'] = function(block) {
  const operator = block.getFieldValue('OP').toLowerCase();
  const argument0 = robotGenerator.valueToCode(block, 'A', robotGenerator.ORDER_ATOMIC) || 'True';
  const argument1 = robotGenerator.valueToCode(block, 'B', robotGenerator.ORDER_ATOMIC) || 'True';
  
  return [`${argument0} ${operator} ${argument1}`, robotGenerator.ORDER_LOGICAL_AND];
};

// Add error handling wrapper
const generateRobotCode = (workspace) => {
  try {
    return robotGenerator.workspaceToCode(workspace);
  } catch (e) {
    console.error('Error generating Robot Framework code:', e);
    return '*** Error generating code ***\n' + e.toString();
  }
};

export { generateRobotCode };