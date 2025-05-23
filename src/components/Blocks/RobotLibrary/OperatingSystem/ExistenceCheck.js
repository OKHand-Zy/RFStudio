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

// OperatingSystem: Should Exist
Blockly.Blocks['rb_operating_system_should_exist'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Should Exist");
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Should Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Should%20Exist");
  }
};

pythonGenerator.forBlock['rb_operating_system_should_exist'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Should Exist`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Should Not Exist
Blockly.Blocks['rb_operating_system_should_not_exist'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Should Not Exist");
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Should Not Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Should%20Not%20Exist");
  }
};

pythonGenerator.forBlock['rb_operating_system_should_not_exist'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Should Not Exist`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += '\n';
  return code;
};