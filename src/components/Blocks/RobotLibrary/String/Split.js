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

// String: Split String
Blockly.Blocks['rb_string_split_string'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Split String");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");
    
    this.appendValueInput("separator_container")
      .appendField("separator：")
      .setCheck("Variable");
    
    this.appendDummyInput("max_split_container")
      .appendField("max split：")
      .appendField(new Blockly.FieldTextInput("default"), "max_split_value")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Split String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Split%20String");
  }
};

pythonGenerator.forBlock['rb_string_split_string'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let separator = pythonGenerator.valueToCode(block, 'separator_container', pythonGenerator.ORDER_ATOMIC) || '';
  separator = robotFormate(separator, '|', default_indent)

  let max_split = block.getFieldValue('max_split_value') || '';
  if (max_split == 'default') {
    max_split = '';
  }

  let code = `Split String`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${separator ? `${robot_indent}${separator}` : ''}`;
  code += `${max_split ? `${robot_indent}${max_split}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Split String From Right
Blockly.Blocks['rb_string_split_string_from_right'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Split String From Right');
    
    this.appendValueInput("string_container")
      .setCheck("Variable");
    
    this.appendValueInput("separator_container")
      .appendField("separator：")
      .setCheck("Variable");
    
    this.appendDummyInput("max_split_container")
      .appendField("max split：")
      .appendField(new Blockly.FieldTextInput("default"), "max_split_value")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Split String From Right");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Split%20String%20From%20Right");
  }
};

pythonGenerator.forBlock['rb_string_split_string_from_right'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let separator = pythonGenerator.valueToCode(block, 'separator_container', pythonGenerator.ORDER_ATOMIC) || '';
  separator = robotFormate(separator, '|', default_indent)

  let max_split = block.getFieldValue('max_split_value') || '';
  if (max_split == 'default') {
    max_split = '';
  }

  let code = `Split String From Right`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${separator ? `${robot_indent}${separator}` : ''}`;
  code += `${max_split ? `${robot_indent}${max_split}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Split String To Characters
Blockly.Blocks['rb_string_split_string_to_characters'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Split String To Characters');
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Split String To Characters");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Split%20String%20To%20Characters");
  }
};

pythonGenerator.forBlock['rb_string_split_string_to_characters'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let code = `Split String To Characters`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Split To Lines
Blockly.Blocks['rb_string_split_to_lines'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Split To Lines');
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("Start Count：")
      .appendField(new Blockly.FieldTextInput("default"), "start_value")

      .appendField("End Count：")
      .appendField(new Blockly.FieldTextInput("default"), "end_value")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Split To Lines");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Split%20To%20Lines");
  }
};

pythonGenerator.forBlock['rb_string_split_to_lines'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let start = block.getFieldValue('start_value') || '';
  if (start == 'default') {
    start = '';
  }

  let end = block.getFieldValue('end_value') || '';
  if (end == 'default') {
    end = '';
  }

  let code = `Split To Lines`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${start ? `${robot_indent}${start}` : ''}`;
  code += `${end ? `${robot_indent}${end}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};



