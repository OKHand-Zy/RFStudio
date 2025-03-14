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

// Telnet: Write
Blockly.Blocks['rb_telnet_write'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Write");

    this.appendValueInput("text_container")
      .setCheck("Variable");

    this.appendValueInput("loglevel_container")
      .appendField("Log Level：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Write");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Write");
  }
};

pythonGenerator.forBlock['rb_telnet_write'] = function(block) {
  let text = pythonGenerator.valueToCode(block, 'text_container', pythonGenerator.ORDER_ATOMIC) || '';
  text = robotFormate(text, '|', default_indent)

  let loglevel = pythonGenerator.valueToCode(block, 'loglevel_container', pythonGenerator.ORDER_ATOMIC) || '';
  loglevel = robotFormate(loglevel, '|', default_indent)

  let code = `Write`;
  code += `${text ? `${robot_indent}${text}` : ''}`;
  code += `${loglevel ? `${robot_indent}loglevel=${loglevel}` : ''}`;
  code += '\n';
  return code;
};

// Telnet: Write Bare
Blockly.Blocks['rb_telnet_write_bare'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Write Bare");

    this.appendValueInput("text_container")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Write Bare");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Write%20Bare");
  }
};

pythonGenerator.forBlock['rb_telnet_write_bare'] = function(block) {
  let text = pythonGenerator.valueToCode(block, 'text_container', pythonGenerator.ORDER_ATOMIC) || '';
  text = robotFormate(text, '|', default_indent)

  let code = `Write Bare`;
  code += `${text ? `${robot_indent}${text}` : ''}`;
  code += '\n';
  return code;
};

// Telnet: Write Control Character
Blockly.Blocks['rb_telnet_write_control_character'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Write Control Character");

    this.appendValueInput("control_character_container")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Write Control Character");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Write%20Control%20Character");
  }
};

pythonGenerator.forBlock['rb_telnet_write_control_character'] = function(block) {
  let control_character = pythonGenerator.valueToCode(block, 'control_character_container', pythonGenerator.ORDER_ATOMIC) || '';
  control_character = robotFormate(control_character, '|', default_indent)

  let code = `Write Control Character`;
  code += `${control_character ? `${robot_indent}${control_character}` : ''}`;
  code += '\n';
  return code;
};

// Telnet: Write Until Expected Output
Blockly.Blocks['rb_telnet_write_until_expected_output'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Write Until Expected Output");

    this.appendValueInput("text_container")
      .appendField("Input：")
      .setCheck("Variable");

    this.appendValueInput("expected_output_container")
      .appendField("Expected Output：")
      .setCheck("Variable");
    
    this.appendValueInput("timeout_container")
      .appendField("Timeout：")
      .setCheck("Variable");
    
    this.appendValueInput("retry_interval_container")
      .appendField("Retry Interval：")
      .setCheck("Variable");
    
    this.appendValueInput("loglevel_container")
      .appendField("Log Level：")
      .setCheck("Variable");

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Write Until Expected Output");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Write%20Until%20Expected%20Output");
  }
};

pythonGenerator.forBlock['rb_telnet_write_until_expected_output'] = function(block) {
  let text = pythonGenerator.valueToCode(block, 'text_container', pythonGenerator.ORDER_ATOMIC) || '';
  text = robotFormate(text, '|', default_indent)

  let expected_output = pythonGenerator.valueToCode(block, 'expected_output_container', pythonGenerator.ORDER_ATOMIC) || '';
  expected_output = robotFormate(expected_output, '|', default_indent)

  let timeout = pythonGenerator.valueToCode(block, 'timeout_container', pythonGenerator.ORDER_ATOMIC) || '';
  timeout = robotFormate(timeout, '|', default_indent)

  let retry_interval = pythonGenerator.valueToCode(block, 'retry_interval_container', pythonGenerator.ORDER_ATOMIC) || '';
  retry_interval = robotFormate(retry_interval, '|', default_indent)

  let loglevel = pythonGenerator.valueToCode(block, 'loglevel_container', pythonGenerator.ORDER_ATOMIC) || '';
  loglevel = robotFormate(loglevel, '|', default_indent)


  let code = `Write Until Expected Output`;
  code += `${text ? `${robot_indent}${text}` : ''}`;
  code += `${expected_output ? `${robot_indent}${expected_output}` : ''}`;
  code += `${timeout ? `${robot_indent}${timeout}` : ''}`;
  code += `${retry_interval ? `${robot_indent}${retry_interval}` : ''}`;
  code += `${loglevel ? `${robot_indent}loglevel=${loglevel}` : ''}`;
  code += '\n';
  return code;
};