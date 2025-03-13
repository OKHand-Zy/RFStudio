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

// Screenshot: Set Screenshot Directory
Blockly.Blocks['rb_screenshot_set_screenshot_directory'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Set Screenshot Directory');

    this.appendValueInput("path_container")
      .appendField("Path：");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Screenshot: Set Screenshot Directory");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Screenshot.html#Set%20Screenshot%20Directory");
  }
};

pythonGenerator.forBlock['rb_screenshot_set_screenshot_directory'] = function(block) {
  let directory = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  directory = robotFormate(directory, '|', default_indent)

  let code = `Set Screenshot Directory`;
  code += `${directory ? `${robot_indent}${directory}` : ''}`;
  code += '\n';
  return code;
};

// Screenshot: Take Screenshot
Blockly.Blocks['rb_screenshot_take_screenshot'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Take Screenshot');

    this.appendValueInput("name_container")
      .appendField("Name：");

    this.appendValueInput("width_container")
      .appendField("Width：");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Screenshot: Take Screenshot");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Screenshot.html#Take%20Screenshot");
  }
};

pythonGenerator.forBlock['rb_screenshot_take_screenshot'] = function(block) {
  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let width = pythonGenerator.valueToCode(block, 'width_container', pythonGenerator.ORDER_ATOMIC) || '';
  width = robotFormate(width, '|', default_indent)

  let code = `Take Screenshot`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${width ? `${robot_indent}width=${width}` : ''}`;
  code += '\n';
  return code;
};

// Screenshot: Take Screenshot Without Embedding
Blockly.Blocks['rb_screenshot_take_screenshot_without_embedding'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Take Screenshot Without Embedding');
    
    this.appendValueInput("name_container")
      .appendField("Name：");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Screenshot: Take Screenshot Without Embedding");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Screenshot.html#Take%20Screenshot%20Without%20Embedding");
  }
};

pythonGenerator.forBlock['rb_screenshot_take_screenshot_without_embedding'] = function(block) {
  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)
  
  let code = `Take Screenshot Without Embedding`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += '\n';
  return code;
};


