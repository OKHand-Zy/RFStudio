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

// Telenet: Execute Command
Blockly.Blocks['rb_telnet_execute_command'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Execute Command");
    
    this.appendValueInput("command_container")
      .appendField("Command：")
      .setCheck("Variable");
    
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

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Execute Command");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Execute%20Command");
  }
};

pythonGenerator.forBlock['rb_telnet_execute_command'] = function(block) {
  let command = pythonGenerator.valueToCode(block, 'command_container', pythonGenerator.ORDER_ATOMIC) || '';
  command = robotFormate(command, '|', default_indent)

  let loglevel = pythonGenerator.valueToCode(block, 'loglevel_container', pythonGenerator.ORDER_ATOMIC) || '';
  loglevel = robotFormate(loglevel, '|', default_indent)

  let strip_prompt_arg = block.getFieldValue('strip_prompt_arg') || '';

  let code = `Execute Command`;
  code += `${command ? `${robot_indent}${command}` : ''}`;
  code += `${loglevel ? `${robot_indent}loglevel=${loglevel}` : ''}`;
  code += `${strip_prompt_arg ? `${robot_indent}strip_prompt=${strip_prompt_arg}` : ''}`;
  code += '\n';
  return code;
};

// Telnet: Login
Blockly.Blocks['rb_telnet_login'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Login");
    
    this.appendValueInput("username_container")
      .appendField("Username：")
      .setCheck("Variable");
    
    this.appendValueInput("password_container")
      .appendField("Password：")
      .setCheck("Variable");
    
    this.appendValueInput("login_prompt_container")
      .appendField("Log Prompt：")
      .setCheck("Variable");

    this.appendValueInput("password_prompt_container")
      .appendField("Password Prompt：")
      .setCheck("Variable");
    
    this.appendValueInput("login_timeout_container")
      .appendField("Login Timeout：")
      .setCheck("Variable");
    
    this.appendValueInput("login_incorrect_container")
      .appendField("Login Incorrect：")
      .setCheck("Variable");

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Login");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Login");
  }
};

pythonGenerator.forBlock['rb_telnet_login'] = function(block) {
  let username = pythonGenerator.valueToCode(block, 'username_container', pythonGenerator.ORDER_ATOMIC) || '';
  username = robotFormate(username, '|', default_indent)

  let password = pythonGenerator.valueToCode(block, 'password_container', pythonGenerator.ORDER_ATOMIC) || '';
  password = robotFormate(password, '|', default_indent)

  let login_prompt = pythonGenerator.valueToCode(block, 'login_prompt_container', pythonGenerator.ORDER_ATOMIC) || '';
  login_prompt = robotFormate(login_prompt, '|', default_indent)

  let password_prompt = pythonGenerator.valueToCode(block, 'password_prompt_container', pythonGenerator.ORDER_ATOMIC) || '';
  password_prompt = robotFormate(password_prompt, '|', default_indent)

  let login_timeout = pythonGenerator.valueToCode(block, 'login_timeout_container', pythonGenerator.ORDER_ATOMIC) || '';
  login_timeout = robotFormate(login_timeout, '|', default_indent)

  let login_incorrect = pythonGenerator.valueToCode(block, 'login_incorrect_container', pythonGenerator.ORDER_ATOMIC) || '';
  login_incorrect = robotFormate(login_incorrect, '|', default_indent)

  let code = `Login`;
  code += `${username ? `${robot_indent}${username}` : ''}`;
  code += `${password ? `${robot_indent}${password}` : ''}`;
  code += `${login_prompt ? `${robot_indent}login_prompt=${login_prompt}` : ''}`;
  code += `${password_prompt ? `${robot_indent}password_prompt=${password_prompt}` : ''}`;
  code += `${login_timeout ? `${robot_indent}login_timeout=${login_timeout}` : ''}`;
  code += `${login_incorrect ? `${robot_indent}login_incorrect=${login_incorrect}` : ''}`;
  code += '\n';
  return code;
};