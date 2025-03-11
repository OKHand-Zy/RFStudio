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

// Collections: Log Dictionary
Blockly.Blocks['rbl_collections_log_dictionary'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Log Dictionary');

    this.appendValueInput('dictionary_container')

    this.appendDummyInput('option_container')
      .appendField(' log_level：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["TRACE", "TRACE"],
        ["DEBUG", "DEBUG"],
        ["INFO", "INFO"],
        ["WARN", "WARN"],
      ]), "log_level_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Log Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Log%20Dictionary');
  }
};

pythonGenerator.forBlock['rbl_collections_log_dictionary'] = function(block) {
  let dict_variable = pythonGenerator.valueToCode(block, 'dictionary_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict_variable = robotFormate(dict_variable, '|', robot_indent)
  let log_level_arg = block.getFieldValue('log_level_arg') || '';

  let code = `Log Dictionary`
  code += `${dict_variable ? `${robot_indent}${dict_variable}`:``}`;
  code += `${log_level_arg ? `${robot_indent}level=${log_level_arg}`:``}`;
  code += '\n';
  return code;
};

// Collections: Log List
Blockly.Blocks['rbl_collections_log_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Log List');

    this.appendValueInput('list_container')
    
    this.appendDummyInput('option_container')
      .appendField(' log_level：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["TRACE", "TRACE"],
        ["DEBUG", "DEBUG"],
        ["INFO", "INFO"],
        ["WARN", "WARN"],
      ]), "log_level_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Log List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Log%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_log_list'] = function(block) {
  let list_variable = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list_variable = robotFormate(list_variable, '|', robot_indent)
  let log_level_arg = block.getFieldValue('log_level_arg') || '';

  let code = `Log List`
  code += `${list_variable ? `${robot_indent}${list_variable}`:``}`;
  code += `${log_level_arg ? `${robot_indent}level=${log_level_arg}`:``}`;
  code += '\n';
  return code;
};