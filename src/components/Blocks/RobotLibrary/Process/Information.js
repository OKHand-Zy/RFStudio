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

// Process: Get Process Id
Blockly.Blocks['rb_process_information_get_process_id'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Process Id');
    
    this.appendValueInput('process_pid_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Get Process Id');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Get%20Process%20Id');
  }
};

pythonGenerator.forBlock['rb_process_information_get_process_id'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', robot_indent)

  let code = `Get Process Id`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Process: Get Process Object
Blockly.Blocks['rb_process_information_get_process_object'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Process Object');
    
    this.appendValueInput('process_pid_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Get Process Object');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Get%20Process%20Object');
  }
};

pythonGenerator.forBlock['rb_process_information_get_process_object'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', robot_indent)

  let code = `Get Process Object`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};