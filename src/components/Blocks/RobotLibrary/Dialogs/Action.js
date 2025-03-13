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

// Dialogs: Execute Manual Step
Blockly.Blocks['rb_dialogs_execute_manual_step'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Execute Manual Step');
    
    this.appendValueInput('message_container')
      .appendField('Message：');
    
    this.appendValueInput('error_message_container')
      .appendField('Default Error Msg：');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Dialogs: Execute Manual Step');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Dialogs.html#Execute%20Manual%20Step');
  }
};

pythonGenerator.forBlock['rb_dialogs_execute_manual_step'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let error_message = pythonGenerator.valueToCode(block, 'error_message_container', pythonGenerator.ORDER_ATOMIC) || '';
  error_message = robotFormate(error_message, '|', default_indent)

  let code = `Execute Manual Step`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += `${error_message ? `${robot_indent}default_error=${error_message}` : ''}`;
  code += '\n';
  return code;
};

// Dialogs: Pause Execution
Blockly.Blocks['rb_dialogs_pause_execution'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Pause Execution');

    this.appendValueInput("message_container")
      .appendField("Message：");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Dialogs: Pause Execution");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Dialogs.html#Pause%20Execution");
  }
};

pythonGenerator.forBlock['rb_dialogs_pause_execution'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Pause Execution`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += '\n';
  return code;
};