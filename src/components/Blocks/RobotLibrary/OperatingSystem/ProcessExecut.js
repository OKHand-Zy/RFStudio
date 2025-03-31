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

// OperatingSystem: Run
Blockly.Blocks['rb_operating_system_run'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Run ");
    
    this.appendValueInput('command_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Run");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Run");
  }
};

pythonGenerator.forBlock['rb_operating_system_run'] = function(block) {
  let command = pythonGenerator.valueToCode(block, 'command_container', pythonGenerator.ORDER_ATOMIC) || '';
  command = robotFormate(command, '|', default_indent)

  let code = `Run`;
  code += `${command ? `${robot_indent}${command}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Run And Return Rc
Blockly.Blocks['rb_operating_system_run_and_return_rc'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Run And Return Rc ");
    
    this.appendValueInput('command_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Run And Return Rc");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Run%20And%20Return%20Rc");
  }
};

pythonGenerator.forBlock['rb_operating_system_run_and_return_rc'] = function(block) {
  let command = pythonGenerator.valueToCode(block, 'command_container', pythonGenerator.ORDER_ATOMIC) || '';
  command = robotFormate(command, '|', default_indent)

  let code = `Run And Return Rc`;
  code += `${command ? `${robot_indent}${command}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Run And Return Rc And Output
Blockly.Blocks['rb_operating_system_run_and_return_rc_and_output'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Run And Return Rc And Output ");
    
    this.appendValueInput('command_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Run And Return Rc And Output");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Run%20And%20Return%20Rc%20And%20Output");
  }
};

pythonGenerator.forBlock['rb_operating_system_run_and_return_rc_and_output'] = function(block) {
  let command = pythonGenerator.valueToCode(block, 'command_container', pythonGenerator.ORDER_ATOMIC) || '';
  command = robotFormate(command, '|', default_indent)

  let code = `Run And Return Rc And Output`;
  code += `${command ? `${robot_indent}${command}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};