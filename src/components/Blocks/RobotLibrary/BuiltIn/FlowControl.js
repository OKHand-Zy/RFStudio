import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import {PythonGenerator, pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
const block_color = 10;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// BuiltIn: Continue For Loop
Blockly.Blocks['rb_builtin_continue_for_loop'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Continue For Loop")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Continue For Loop");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Continue%20For%20Loop");
  }
};

pythonGenerator.forBlock['rb_builtin_continue_for_loop'] = function(block) {
  let code = `${split_mark}Continue For Loop\n`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

// BuiltIn: Continue For Loop If
Blockly.Blocks['rb_builtin_continue_for_loop_if'] = {
  init: function() {
    this.appendValueInput("condition")
      .appendField("Continue For Loop If")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Continue For Loop If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Continue%20For%20Loop%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_continue_for_loop_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', robot_indent)
  let code = `Continue For Loop If${robot_indent}${condition}\n`;
  return code;
};

// BuiltIn: Exit For Loop
Blockly.Blocks['rb_builtin_exit_for_loop'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Exit For Loop")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Exit For Loop");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Exit%20For%20Loop");
  }
};

pythonGenerator.forBlock['rb_builtin_exit_for_loop'] = function(block) {
  let code = `${split_mark}Exit For Loop\n`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

// BuiltIn: Exit For Loop If
Blockly.Blocks['rb_builtin_exit_for_loop_if'] = {
  init: function() {
    this.appendValueInput("condition")
      .appendField("Exit For Loop If")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Exit For Loop If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Exit%20For%20Loop%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_exit_for_loop_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', robot_indent)
  let code = `Exit For Loop If${robot_indent}${condition}\n`;
  return code;
};

// BuiltIn: Pass Execution
Blockly.Blocks['rb_builtin_pass_execution'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Pass Execution")
    
    this.appendValueInput("message")
      .appendField("Message=")
      .setCheck(null);
    
    this.appendValueInput("tags")
      .appendField("Tag=")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Pass Execution");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Pass%20Execution");
  }
};

pythonGenerator.forBlock['rb_builtin_pass_execution'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)
  
  let tags = pythonGenerator.valueToCode(block, 'tags', pythonGenerator.ORDER_ATOMIC) || '';
  tags = robotFormate(tags, '|', '  ')

  let code = `Pass Execution${message ? `${robot_indent}${message}` : ''}${tags ? `${robot_indent}${tags}` : ''}\n`;
  return code;
};

// BuiltIn: Pass Execution If
Blockly.Blocks['rb_builtin_pass_execution_if'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Pass Execution If")
    
    this.appendValueInput("condition")
      .appendField("Condition=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField("Message=")
      .setCheck(null);
    
    this.appendValueInput("tags")
      .appendField("Tag=")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Pass Execution If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Pass%20Execution%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_pass_execution_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)
  
  let tags = pythonGenerator.valueToCode(block, 'tags', pythonGenerator.ORDER_ATOMIC) || '';
  tags = robotFormate(tags, '|', '  ')

  let code = `Pass Execution If${condition ? `${robot_indent}${condition}` : ''}${message ? `${robot_indent}${message}` : ''}${tags ? `${robot_indent}${tags}` : ''}\n`;
  return code;
}

// BuiltIn: Skip
Blockly.Blocks['rb_builtin_skip'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Skip")
    
    this.appendValueInput("message")
      .appendField(" msg= ")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Skip");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Skip");
  }
};

pythonGenerator.forBlock['rb_builtin_skip'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)
  let code = `Skip`;
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Skip If
Blockly.Blocks['rb_builtin_skip_if'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Skip If")
    
    this.appendValueInput("condition")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg= ")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Skip If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Skip%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_skip_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Skip If`
  code += `${condition ? `${robot_indent}${condition}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Wait Until Keyword Succeeds
Blockly.Blocks['rb_builtin_wait_until_keyword_succeeds'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Wait Until Keyword Succeeds")
    
    this.appendValueInput("retry")
      .appendField("retry：")
      .setCheck(null);
    
    this.appendValueInput("retry_interval")
      .appendField("retry_interval：")
      .setCheck(null);
    
    this.appendValueInput("keyword")
      .appendField("Keyword：")
      .setCheck(null);

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Wait Until Keyword Succeeds");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Wait%20Until%20Keyword%20Succeeds");
  }
};

pythonGenerator.forBlock['rb_builtin_wait_until_keyword_succeeds'] = function(block) {
  let retry = pythonGenerator.valueToCode(block, 'retry', pythonGenerator.ORDER_ATOMIC) || '';
  retry = robotFormate(retry, '|', default_indent)

  let retry_interval = pythonGenerator.valueToCode(block, 'retry_interval', pythonGenerator.ORDER_ATOMIC) || '';
  retry_interval = robotFormate(retry_interval, '|', default_indent)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Wait Until Keyword Succeeds`;
  code += `${retry ? `${robot_indent}retry=${retry}`:``}`;
  code += `${retry_interval ? `${robot_indent}retry_interval=${retry_interval}`:``}`;
  code += `${keyword ? `${robot_indent}${keyword}`:``}`;
  code += '\n'
  return code;
};