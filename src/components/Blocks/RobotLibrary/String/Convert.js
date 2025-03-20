import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import {PythonGenerator, pythonGenerator} from 'blockly/python';

// image
const plusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
  '9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMT' +
  'ggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNz' +
  'FjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MW' +
  'MwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS' +
  '44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';
const minusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw' +
  'MC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPS' +
  'JNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAw' +
  'IDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K';

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

// String: Convert To Lower Case
Blockly.Blocks['rb_string_convert_to_lower_case'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Convert To Lower Case");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Convert To Lower Case");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Convert%20To%20Lower%20Case");
  }
};

pythonGenerator.forBlock['rb_string_convert_to_lower_case'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let code = `Convert To Lower Case`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Convert To Title Case
Blockly.Blocks['rb_string_convert_to_title_case'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Convert To Title Case");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("exclude_container")
      .appendField("exclude:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Convert To Title Case");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Convert%20To%20Title%20Case");
  }
};

pythonGenerator.forBlock['rb_string_convert_to_title_case'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let exclude = pythonGenerator.valueToCode(block, 'exclude_container', pythonGenerator.ORDER_ATOMIC) || '';
  exclude = robotFormate(exclude, '|', default_indent)

  let code = `Convert To Title Case`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${exclude ? `${robot_indent}exclude=${exclude}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Convert To Upper Case
Blockly.Blocks['rb_string_convert_to_upper_case'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Convert To Upper Case");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Convert To Upper Case");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Convert%20To%20Upper%20Case");
  }
};

pythonGenerator.forBlock['rb_string_convert_to_upper_case'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let code = `Convert To Upper Case`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Should Be Lower Case
Blockly.Blocks['rb_string_should_be_lower_case'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Be Lower Case");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Should Be Lower Case");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Should%20Be%20Lower%20Case");
  }
};

pythonGenerator.forBlock['rb_string_should_be_lower_case'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Should Be Lower Case`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// String: Should Be Title Case
Blockly.Blocks['rb_string_should_be_title_case'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Be Title Case");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("exclude_container")
      .appendField("exclude:")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Should Be Title Case");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Should%20Be%20Title%20Case");
  }
};

pythonGenerator.forBlock['rb_string_should_be_title_case'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let exclude = pythonGenerator.valueToCode(block, 'exclude_container', pythonGenerator.ORDER_ATOMIC) || '';
  exclude = robotFormate(exclude, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Should Be Title Case`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += `${exclude ? `${robot_indent}exclude=${exclude}` : ''}`;
  code += '\n';
  return code;
};

// String: Should Be Upper Case
Blockly.Blocks['rb_string_should_be_upper_case'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Be Upper Case");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Should Be Upper Case");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Should%20Be%20Upper%20Case");
  }
};

pythonGenerator.forBlock['rb_string_should_be_upper_case'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Should Be Upper Case`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};