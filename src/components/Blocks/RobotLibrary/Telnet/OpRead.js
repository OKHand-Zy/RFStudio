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

// Telnet: Read
Blockly.Blocks['rb_telnet_read'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Read");
    
    this.appendValueInput("loglevel_container")
      .appendField("Log Level：")
      .setCheck("Variable");
  
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Read");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Read");
  }
};

pythonGenerator.forBlock['rb_telnet_read'] = function(block) {
  let loglevel = pythonGenerator.valueToCode(block, 'loglevel_container', pythonGenerator.ORDER_ATOMIC) || '';
  loglevel = robotFormate(loglevel, '|', default_indent)

  let code = `Read`;
  code += `${loglevel ? `${robot_indent}loglevel=${loglevel}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Telnet: Read Until
Blockly.Blocks['rb_telnet_read_until'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Read Until");

    this.appendValueInput("expected_container")
      .appendField("Expected：")
      .setCheck("Variable");

    this.appendValueInput("loglevel_container")
      .appendField("Log Level：")
      .setCheck("Variable");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Read Until");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Read%20Until");
  }
};

pythonGenerator.forBlock['rb_telnet_read_until'] = function(block) {
  let expected = pythonGenerator.valueToCode(block, 'expected_container', pythonGenerator.ORDER_ATOMIC) || '';
  expected = robotFormate(expected, '|', default_indent)

  let loglevel = pythonGenerator.valueToCode(block, 'loglevel_container', pythonGenerator.ORDER_ATOMIC) || '';
  loglevel = robotFormate(loglevel, '|', default_indent)

  let code = `Read Until`;
  code += `${expected ? `${robot_indent}${expected}` : ''}`;
  code += `${loglevel ? `${robot_indent}loglevel=${loglevel}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Telnet: Read Until Prompt
Blockly.Blocks['rb_telnet_read_until_prompt'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Read Until Prompt");

    this.appendValueInput("loglevel_container")
      .appendField("Log Level：")
      .setCheck("Variable");
    
    this.appendDummyInput("option_container")
      .appendField("Strip Prompt：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "strip_prompt_arg")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Read Until Prompt");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Read%20Until%20Prompt");
  }
};

pythonGenerator.forBlock['rb_telnet_read_until_prompt'] = function(block) {
  let loglevel = pythonGenerator.valueToCode(block, 'loglevel_container', pythonGenerator.ORDER_ATOMIC) || '';
  loglevel = robotFormate(loglevel, '|', default_indent)

  let strip_prompt_arg = block.getFieldValue('strip_prompt_arg') || '';

  let code = `Read Until Prompt`;
  code += `${loglevel ? `${robot_indent}loglevel=${loglevel}` : ''}`;
  code += `${strip_prompt_arg ? `${robot_indent}strip_prompt=${strip_prompt_arg}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Telnet: Read Until Regexp
Blockly.Blocks['rb_telnet_read_until_regexp'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Read Until Regexp");

    this.appendValueInput("regexp_container")
      .appendField("Regexp：")
      .setCheck("Variable");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Read Until Regexp");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Read%20Until%20Regexp");
  }
};

pythonGenerator.forBlock['rb_telnet_read_until_regexp'] = function(block) {
  let regexp = pythonGenerator.valueToCode(block, 'regexp_container', pythonGenerator.ORDER_ATOMIC) || '';
  regexp = robotFormate(regexp, '|', robot_indent)

  let code = `Read Until Regexp`;
  code += `${regexp ? `${robot_indent}${regexp}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};