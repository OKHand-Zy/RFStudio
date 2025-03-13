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

// Process: Join Command Line
Blockly.Blocks['rb_command_line_join_command_line'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Join Command Line');
    
    this.appendValueInput('command_line_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Join Command Line');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Join%20Command%20Line');
  }
};

pythonGenerator.forBlock['rb_command_line_join_command_line'] = function(block) {
  let command_line = pythonGenerator.valueToCode(block, 'command_line_container', pythonGenerator.ORDER_ATOMIC) || '';
  command_line = robotFormate(command_line, '|', robot_indent)

  let code = `Join Command Line`;
  code += `${command_line ? `${robot_indent}${command_line}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Process: Split Command Line
Blockly.Blocks['rb_command_line_split_command_line'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Split Command Line');
    
    this.appendValueInput('command_line_container')
      .setCheck('Variable');

    this.appendDummyInput('option_container')
      .appendField('escaping：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "escaping_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Split Command Line');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Split%20Command%20Line');
  }
};

pythonGenerator.forBlock['rb_command_line_split_command_line'] = function(block) {
  let command_line = pythonGenerator.valueToCode(block, 'command_line_container', pythonGenerator.ORDER_ATOMIC) || '';
  command_line = robotFormate(command_line, '|', robot_indent)

  let escaping_arg = block.getFieldValue('escaping_arg') || '';

  let code = `Split Command Line`;
  code += `${command_line ? `${robot_indent}${command_line}` : ''}`;
  code += `${escaping_arg ? `${robot_indent}escaping=${escaping_arg}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};