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

// OperatingSystem: Append To Environment Variable
Blockly.Blocks['rb_operating_system_append_to_environment_variable'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Append To Environment Variable ");

    this.appendValueInput('values_container')
      .setCheck('Variable');

    this.appendValueInput("config_container")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Append To Environment Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Append%20To%20Environment%20Variable");
  }
};

pythonGenerator.forBlock['rb_operating_system_append_to_environment_variable'] = function(block) {
  let values = pythonGenerator.valueToCode(block, 'values_container', pythonGenerator.ORDER_ATOMIC) || '';
  values = robotFormate(values, '|', default_indent)

  let config = pythonGenerator.valueToCode(block, 'config_container', pythonGenerator.ORDER_ATOMIC) || '';
  config = robotFormate(config, '|', robot_indent)

  let code = `Append To Environment Variable`;
  code += `${values ? `${robot_indent}${values}` : ''}`;
  code += `${config ? `${robot_indent}${config}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Environment Variable Should Be Set
Blockly.Blocks['rb_operating_system_environment_variable_should_be_set'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Environment Variable Should Be Set ");
    
    this.appendValueInput('name_container')
      .setCheck('Variable');

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Environment Variable Should Be Set");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Environment%20Variable%20Should%20Be%20Set");
  }
};

pythonGenerator.forBlock['rb_operating_system_environment_variable_should_be_set'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Environment Variable Should Be Set`;
  code += `${variable ? `${robot_indent}${variable}` : ''}`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Environment Variable Should Not Be Set
Blockly.Blocks['rb_operating_system_environment_variable_should_not_be_set'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Environment Variable Should Not Be Set ");
    
    this.appendValueInput('variable_container')
      .appendField("variable：")
      .setCheck('Variable');

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Environment Variable Should Not Be Set");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Environment%20Variable%20Should%20Not%20Be%20Set");
  }
};

pythonGenerator.forBlock['rb_operating_system_environment_variable_should_not_be_set'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Environment Variable Should Not Be Set`;
  code += `${variable ? `${robot_indent}${variable}` : ''}`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Get Environment Variable
Blockly.Blocks['rb_operating_system_get_environment_variable'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Get Environment Variable ");
    
    this.appendValueInput('variable_container')
      .appendField("variable：")
      .setCheck('Variable');
    
    this.appendValueInput("default_container")
      .appendField("default：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Get Environment Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Get%20Environment%20Variable");
  }
};

pythonGenerator.forBlock['rb_operating_system_get_environment_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)

  let default_value = pythonGenerator.valueToCode(block, 'default_container', pythonGenerator.ORDER_ATOMIC) || '';
  default_value = robotFormate(default_value, '|', default_indent)

  let code = `Get Environment Variable`;
  code += `${variable ? `${robot_indent}${variable}` : ''}`;
  code += `${default_value ? `${robot_indent}${default_value}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Get Environment Variables
Blockly.Blocks['rb_operating_system_get_environment_variables'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Get Environment Variables ");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Get Environment Variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Get%20Environment%20Variables");
  }
};

pythonGenerator.forBlock['rb_operating_system_get_environment_variables'] = function(block) {
  let code = `Get Environment Variables`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Log Environment Variables
Blockly.Blocks['rb_operating_system_log_environment_variables'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Log Environment Variables ");
    
    this.appendDummyInput('level_container')
      .appendField("level：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["TRACE", "TRACE"],
        ["DEBUG", "DEBUG"],
        ["INFO", "INFO"],
        ["WARN", "WARN"],
        ["ERROR", "ERROR"],
      ]), "level_arg")
      
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Log Environment Variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Log%20Environment%20Variables");
  }
};

pythonGenerator.forBlock['rb_operating_system_log_environment_variables'] = function(block) {
  let level = block.getFieldValue('level_arg') || '';

  let code = `Log Environment Variables`;
  code += `${level ? `${robot_indent}level=${level}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Remove Environment Variable
Blockly.Blocks['rb_operating_system_remove_environment_variable'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Remove Environment Variable ");
    
    this.appendValueInput('variable_container')
      .appendField("variable：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Remove Environment Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Remove%20Environment%20Variable");
  }
};

pythonGenerator.forBlock['rb_operating_system_remove_environment_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)

  let code = `Remove Environment Variable`;
  code += `${variable ? `${robot_indent}${variable}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Set Environment Variable
Blockly.Blocks['rb_operating_system_set_environment_variable'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Set Environment Variable ");
    
    this.appendValueInput('name_container')
      .appendField("name：")
      .setCheck('Variable');

    this.appendValueInput("value_container")
      .appendField("value：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Set Environment Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Set%20Environment%20Variable");
  }
};

pythonGenerator.forBlock['rb_operating_system_set_environment_variable'] = function(block) {
  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let code = `Set Environment Variable`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += '\n';
  return code;
};