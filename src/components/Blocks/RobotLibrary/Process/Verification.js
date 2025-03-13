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

// Process: Is Process Running
Blockly.Blocks['rb_process_verification_is_process_running'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Is Process Running');
    
    this.appendValueInput('process_pid_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Is Process Running');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Is%20Process%20Running');
  }
};

pythonGenerator.forBlock['rb_process_verification_is_process_running'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', default_indent)

  let code = `Is Process Running`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Process: Process Should Be Running
Blockly.Blocks['rb_process_verification_process_should_be_running'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Process Should Be Running');
    
    this.appendValueInput('process_pid_container')
      .setCheck('Variable');

    this.appendValueInput('error_message_container')
      .appendField('Error Message：');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Process Should Be Running');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Process%20Should%20Be%20Running');
  }
};

pythonGenerator.forBlock['rb_process_verification_process_should_be_running'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', default_indent)

  let error_message = pythonGenerator.valueToCode(block, 'error_message_container', pythonGenerator.ORDER_ATOMIC) || '';
  error_message = robotFormate(error_message, '|', default_indent)

  let code = `Process Should Be Running`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += `${error_message ? `${robot_indent}error_message=${error_message}` : ''}`;
  code += '\n';
  return code;
};

// Process: Process Should Be Stopped
Blockly.Blocks['rb_process_verification_process_should_be_stopped'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Process Should Be Stopped');
    
    this.appendValueInput('process_pid_container')
      .setCheck('Variable');

    this.appendValueInput('error_message_container')
      .appendField('Error Message：');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Process Should Be Stopped');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Process%20Should%20Be%20Stopped');
  }
};

pythonGenerator.forBlock['rb_process_verification_process_should_be_stopped'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', default_indent)

  let error_message = pythonGenerator.valueToCode(block, 'error_message_container', pythonGenerator.ORDER_ATOMIC) || '';
  error_message = robotFormate(error_message, '|', default_indent)

  let code = `Process Should Be Stopped`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += `${error_message ? `${robot_indent}error_message=${error_message}` : ''}`;
  code += '\n';
  return code;
};

// Process: Get Process Result
Blockly.Blocks['rb_process_verification_get_process_result'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Process Result');
    
    this.appendValueInput('process_pid_container')
      .appendField('Process Id:')
      .setCheck('Variable');

    this.appendDummyInput('rc_option_container')
      .appendField('rc：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "rc_arg")
    
    this.appendDummyInput('stdout_option_container')
      .appendField('stdout：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "stdout_arg")

    this.appendDummyInput('stderr_option_container')
      .appendField('stderr：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "stderr_arg")

    this.appendValueInput('stdout_path_container')
      .appendField('stdout_path：')
    
    this.appendValueInput('stderr_path_container')
      .appendField('stderr_path：')
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Get Process Result');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Get%20Process%20Result');
  }
};

pythonGenerator.forBlock['rb_process_verification_get_process_result'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', default_indent)

  let rc_arg = block.getFieldValue('rc_arg') || '';
  let stdout_arg = block.getFieldValue('stdout_arg') || '';
  let stderr_arg = block.getFieldValue('stderr_arg') || '';

  let stdout_path = pythonGenerator.valueToCode(block, 'stdout_path_container', pythonGenerator.ORDER_ATOMIC) || '';
  stdout_path = robotFormate(stdout_path, '|', default_indent)

  let stderr_path = pythonGenerator.valueToCode(block, 'stderr_path_container', pythonGenerator.ORDER_ATOMIC) || '';
  stderr_path = robotFormate(stderr_path, '|', default_indent)

  let code = `Get Process Result`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += `${rc_arg ? `${robot_indent}rc=${rc_arg}` : ''}`;
  code += `${stdout_arg ? `${robot_indent}stdout=${stdout_arg}` : ''}`;
  code += `${stderr_arg ? `${robot_indent}stderr=${stderr_arg}` : ''}`;
  code += `${stdout_path ? `${robot_indent}stdout_path=${stdout_path}` : ''}`;
  code += `${stderr_path ? `${robot_indent}stderr_path=${stderr_path}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};