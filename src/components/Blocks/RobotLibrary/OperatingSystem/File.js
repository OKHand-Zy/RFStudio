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

// OperatingSystem: Append To File
Blockly.Blocks['rb_operating_system_append_to_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Append To File ');
    
    this.appendValueInput('path_container')
      .appendField('Path：')
      .setCheck('Variable');

    this.appendValueInput('content_container')
      .appendField('Content：')
      .setCheck('Variable');

    this.appendValueInput('encoding_container')
      .appendField('Encoding：')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Append To File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Append%20To%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_append_to_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent);

  let content = pythonGenerator.valueToCode(block, 'content_container', pythonGenerator.ORDER_ATOMIC) || '';
  content = robotFormate(content, '|', default_indent);

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent);

  let code = `Append To File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${content ? `${robot_indent}${content}` : ''}`;
  code += `${encoding ? `${robot_indent}encoding=${encoding}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Copy File
Blockly.Blocks['rb_operating_system_copy_file'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Copy File ")
    
    this.appendValueInput("source_container")
      .appendField("Source：")
      .setCheck('Variable');

    this.appendValueInput("destination_container")
      .appendField("Destination：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Copy File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Copy%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_copy_file'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let destination = pythonGenerator.valueToCode(block, 'destination_container', pythonGenerator.ORDER_ATOMIC) || '';
  destination = robotFormate(destination, '|', default_indent)

  let code = `Copy File`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${destination ? `${robot_indent}${destination}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Copy Files
Blockly.Blocks['rb_operating_system_copy_files'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Copy Files ")
    
    this.appendValueInput('sources_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Copy Files");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Copy%20Files");
  }
};

pythonGenerator.forBlock['rb_operating_system_copy_files'] = function(block) {
  let sources = pythonGenerator.valueToCode(block, 'sources_container', pythonGenerator.ORDER_ATOMIC) || '';
  sources = robotFormate(sources, '|', robot_indent)

  let code = `Copy Files`;
  code += `${sources ? `${robot_indent}${sources}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Create Binary File
Blockly.Blocks['rb_operating_system_create_binary_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Create Binary File ")
    
    this.appendValueInput('path_container')
      .appendField("Path：")
      .setCheck('Variable');

    this.appendValueInput("content_container")
      .appendField("Content：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Create Binary File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Create%20Binary%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_create_binary_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let content = pythonGenerator.valueToCode(block, 'content_container', pythonGenerator.ORDER_ATOMIC) || '';
  content = robotFormate(content, '|', default_indent)

  let code = `Create Binary File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${content ? `${robot_indent}${content}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Create File
Blockly.Blocks['rb_operating_system_create_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Create File ")
    
    this.appendValueInput('path_container')
      .appendField("Path:")
      .setCheck('Variable');

    this.appendValueInput("content_container")
      .appendField("Content：")
      .setCheck('Variable');

    this.appendValueInput("encoding_container")
      .appendField("Encoding：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Create File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Create%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_create_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let content = pythonGenerator.valueToCode(block, 'content_container', pythonGenerator.ORDER_ATOMIC) || '';
  content = robotFormate(content, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let code = `Create File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${content ? `${robot_indent}${content}` : ''}`;
  code += `${encoding ? `${robot_indent}encoding=${encoding}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: File Should Be Empty
Blockly.Blocks['rb_operating_system_file_should_be_empty'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("File Should Be Empty ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：File Should Be Empty");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#File%20Should%20Be%20Empty");
  }
};

pythonGenerator.forBlock['rb_operating_system_file_should_be_empty'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `File Should Be Empty`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: File Should Exist
Blockly.Blocks['rb_operating_system_file_should_exist'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("File Should Exist ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：File Should Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#File%20Should%20Exist");
  }
};

pythonGenerator.forBlock['rb_operating_system_file_should_exist'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `File Should Exist`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: File Should Not Be Empty
Blockly.Blocks['rb_operating_system_file_should_not_be_empty'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("File Should Not Be Empty ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：File Should Not Be Empty");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#File%20Should%20Not%20Be%20Empty");
  }
};

pythonGenerator.forBlock['rb_operating_system_file_should_not_be_empty'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `File Should Not Be Empty`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: File Should Not Exist
Blockly.Blocks['rb_operating_system_file_should_not_exist'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("File Should Not Exist ")

    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("message_container")
      .appendField("Message：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：File Should Not Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#File%20Should%20Not%20Exist");
  }
};

pythonGenerator.forBlock['rb_operating_system_file_should_not_exist'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `File Should Not Exist`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Get Binary File
Blockly.Blocks['rb_operating_system_get_binary_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Get Binary File ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem: Get Binary File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Get%20Binary%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_get_binary_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Get Binary File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Get File
Blockly.Blocks['rb_operating_system_get_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Get File ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendValueInput("encoding_container")
      .appendField("Encoding：")
      .setCheck('Variable');
    
    this.appendDummyInput("options_container")
      .appendField("encoding errors：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["strict", "strict"],
        ["ignore", "ignore"],
        ["replace", "replace"]
      ]), "encoding_errors_arg");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem: Get File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Get%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_get_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let encoding_errors = block.getFieldValue('encoding_errors_arg') || '';

  let code = `Get File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${encoding ? `${robot_indent}encoding=${encoding}` : ''}`;
  code += `${encoding_errors ? `${robot_indent}encoding_errors=${encoding_errors}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Get File Size
Blockly.Blocks['rb_operating_system_get_file_size'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Get File Size ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem: Get File Size");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Get%20File%20Size");
  }
};

pythonGenerator.forBlock['rb_operating_system_get_file_size'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Get File Size`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Get Modified Time
Blockly.Blocks['rb_operating_system_get_modified_time'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Get Modified Time ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');
    
    this.appendValueInput("format_container")
      .appendField("format：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Get Modified Time");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Get%20Modified%20Time");
  }
};

pythonGenerator.forBlock['rb_operating_system_get_modified_time'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let format = pythonGenerator.valueToCode(block, 'format_container', pythonGenerator.ORDER_ATOMIC) || '';
  format = robotFormate(format, '|', default_indent)

  let code = `Get Modified Time`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${format ? `${robot_indent}format=${format}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Grep File
Blockly.Blocks['rb_operating_system_grep_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Grep File ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendValueInput("pattern_container")
      .appendField("Pattern：")
      .setCheck('Variable');
    
    this.appendValueInput("encoding_container")
      .appendField("Encoding：")
      .setCheck('Variable');
    
    this.appendDummyInput("options_container")
      .appendField("encoding errors：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["strict", "strict"],
        ["ignore", "ignore"],
        ["replace", "replace"]
      ]), "encoding_errors_arg")
    
      .appendField("regexp：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "regexp_arg");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Grep File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Grep%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_grep_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let encoding_errors = block.getFieldValue('encoding_errors_arg') || '';
  let regexp = block.getFieldValue('regexp_arg') || '';

  let code = `Grep File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${encoding ? `${robot_indent}encoding=${encoding}` : ''}`;
  code += `${encoding_errors ? `${robot_indent}encoding_errors=${encoding_errors}` : ''}`;
  code += `${regexp ? `${robot_indent}regexp=${regexp}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Log File
Blockly.Blocks['rb_operating_system_log_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Log File ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendValueInput("encoding_container")
      .appendField("Encoding：")
      .setCheck('Variable');
    
    this.appendDummyInput("options_container")
      .appendField("encoding errors：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["strict", "strict"],
        ["ignore", "ignore"],
        ["replace", "replace"]
      ]), "encoding_errors_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Log File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Log%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_log_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let encoding_errors = block.getFieldValue('encoding_errors_arg');

  let code = `Log File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${encoding ? `${robot_indent}encoding=${encoding}` : ''}`;
  code += `${encoding_errors ? `${robot_indent}encoding_errors=${encoding_errors}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Move File
Blockly.Blocks['rb_operating_system_move_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Move File ")

    this.appendValueInput('source_container')
      .setCheck('Variable');

    this.appendValueInput('destination_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Move File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Move%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_move_file'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let destination = pythonGenerator.valueToCode(block, 'destination_container', pythonGenerator.ORDER_ATOMIC) || '';
  destination = robotFormate(destination, '|', default_indent)

  let code = `Move File`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${destination ? `${robot_indent}${destination}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Move Files
Blockly.Blocks['rb_operating_system_move_files'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Move Files ")
    
    this.appendValueInput('sources_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Move Files");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Move%20Files");
  }
};

pythonGenerator.forBlock['rb_operating_system_move_files'] = function(block) {
  let sources = pythonGenerator.valueToCode(block, 'sources_container', pythonGenerator.ORDER_ATOMIC) || '';
  sources = robotFormate(sources, '|', robot_indent)

  let code = `Move Files`;
  code += `${sources ? `${robot_indent}${sources}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Remove File
Blockly.Blocks['rb_operating_system_remove_file'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Remove File ")

    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem: Remove File");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Remove%20File");
  }
};

pythonGenerator.forBlock['rb_operating_system_remove_file'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Remove File`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Remove Files
Blockly.Blocks['rb_operating_system_remove_files'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Remove Files ")
    
    this.appendValueInput('paths_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Remove Files");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Remove%20Files");
  }
};

pythonGenerator.forBlock['rb_operating_system_remove_files'] = function(block) {
  let paths = pythonGenerator.valueToCode(block, 'paths_container', pythonGenerator.ORDER_ATOMIC) || '';
  paths = robotFormate(paths, '|', robot_indent)

  let code = `Remove Files`;
  code += `${paths ? `${robot_indent}${paths}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Set Modified Time
Blockly.Blocks['rb_operating_system_set_modified_time'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Set Modified Time ")

    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendValueInput("time_container")
      .appendField("Modified Time：")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Set Modified Time");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Set%20Modified%20Time");
  }
};

pythonGenerator.forBlock['rb_operating_system_set_modified_time'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let time = pythonGenerator.valueToCode(block, 'time_container', pythonGenerator.ORDER_ATOMIC) || '';
  time = robotFormate(time, '|', default_indent)

  let code = `Set Modified Time`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${time ? `${robot_indent}${time}` : ''}`;
  code += '\n';
  return code;
};

// OperatingSystem: Touch
Blockly.Blocks['rb_operating_system_touch'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Touch ")
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Touch");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Touch");
  }
};

pythonGenerator.forBlock['rb_operating_system_touch'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Touch`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return code;
};