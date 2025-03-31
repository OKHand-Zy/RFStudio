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

// OperatingSystem: Copy Directory
Blockly.Blocks['rb_operating_system_copy_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Copy Directory ")
    
    this.appendValueInput('source_container')
      .setCheck('Variable');

    this.appendValueInput('destination_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Copy Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Copy%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_copy_directory'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let destination = pythonGenerator.valueToCode(block, 'destination_container', pythonGenerator.ORDER_ATOMIC) || '';
  destination = robotFormate(destination, '|', default_indent)

  let code = `Copy Directory`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${destination ? `${robot_indent}${destination}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Count Directories In Directory
Blockly.Blocks['rb_operating_system_count_directories_in_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Count Directories In Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("pattern_container")
      .appendField("Pattern：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Count Directories In Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Count%20Directories%20In%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_count_directories_in_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let code = `Count Directories In Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Count Files In Directory
Blockly.Blocks['rb_operating_system_count_files_in_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Count Files In Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("pattern_container")
      .appendField("Pattern：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Count Files In Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Count%20Files%20In%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_count_files_in_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let code = `Count Files In Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Count Items In Directory
Blockly.Blocks['rb_operating_system_count_items_in_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Count Items In Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("pattern_container")
      .appendField("Pattern：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Count Items In Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Count%20Items%20In%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_count_items_in_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let code = `Count Items In Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Create Directory
Blockly.Blocks['rb_operating_system_create_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Create Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Create Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Create%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_create_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Create Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Directory Should Be Empty
Blockly.Blocks['rb_operating_system_directory_should_be_empty'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Directory Should Be Empty ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Directory Should Be Empty");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Directory%20Should%20Be%20Empty");
  }
};

pythonGenerator.forBlock['rb_operating_system_directory_should_be_empty'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Directory Should Be Empty`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Directory Should Exist
Blockly.Blocks['rb_operating_system_directory_should_exist'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Directory Should Exist ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Directory Should Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Directory%20Should%20Exist");
  }
};

pythonGenerator.forBlock['rb_operating_system_directory_should_exist'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Directory Should Exist`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Directory Should Not Be Empty
Blockly.Blocks['rb_operating_system_directory_should_not_be_empty'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Directory Should Not Be Empty ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Directory Should Not Be Empty");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Directory%20Should%20Not%20Be%20Empty");
  }
};

pythonGenerator.forBlock['rb_operating_system_directory_should_not_be_empty'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Directory Should Not Be Empty`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Directory Should Not Exist
Blockly.Blocks['rb_operating_system_directory_should_not_exist'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Directory Should Not Exist ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Directory Should Not Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Directory%20Should%20Not%20Exist");
  }
};

pythonGenerator.forBlock['rb_operating_system_directory_should_not_exist'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Directory Should Not Exist`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Empty Directory
Blockly.Blocks['rb_operating_system_empty_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Empty Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Empty Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Empty%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_empty_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Empty Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: List Directories In Directory
Blockly.Blocks['rb_operating_system_list_directories_in_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("List Directories In Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("pattern_container")
      .appendField("Pattern：")
      .setCheck('Variable');

    this.appendValueInput("options_container")
      .appendField("Absolute：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "absolute_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：List Directories In Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#List%20Directories%20In%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_list_directories_in_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let absolute = block.getFieldValue('absolute_arg') || '';

  let code = `List Directories In Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${absolute ? `${robot_indent}absolute=${absolute}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: List Directory
Blockly.Blocks['rb_operating_system_list_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("List Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("pattern_container")
      .appendField("Pattern：")
      .setCheck('Variable');

    this.appendValueInput("options_container")
      .appendField("Absolute：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "absolute_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：List Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#List%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_list_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let absolute = block.getFieldValue('absolute_arg') || '';

  let code = `List Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${absolute ? `${robot_indent}absolute=${absolute}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: List Files In Directory
Blockly.Blocks['rb_operating_system_list_files_in_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("List Files In Directory ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("pattern_container")
      .appendField("Pattern：")
      .setCheck('Variable');

    this.appendValueInput("options_container")
      .appendField("Absolute：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "absolute_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：List Files In Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#List%20Files%20In%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_list_files_in_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let absolute = block.getFieldValue('absolute_arg') || '';

  let code = `List Files In Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${absolute ? `${robot_indent}absolute=${absolute}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Move Directory
Blockly.Blocks['rb_operating_system_move_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Move Directory ")

    this.appendValueInput('source_container')
      .setCheck('Variable');

    this.appendValueInput('destination_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Move Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Move%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_move_directory'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let destination = pythonGenerator.valueToCode(block, 'destination_container', pythonGenerator.ORDER_ATOMIC) || '';
  destination = robotFormate(destination, '|', default_indent)

  let code = `Move Directory`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${destination ? `${robot_indent}${destination}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Remove Directory
Blockly.Blocks['rb_operating_system_remove_directory'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Remove Directory ")

    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendDummyInput("options_container")
      .appendField("Recursive：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "recursive_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Remove Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Remove%20Directory");
  }
};

pythonGenerator.forBlock['rb_operating_system_remove_directory'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let recursive = block.getFieldValue('recursive_arg') || '';
  
  let code = `Remove Directory`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${recursive ? `${robot_indent}recursive=${recursive}` : ''}`;
  code += '\n';
  return code;
};