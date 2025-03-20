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

// String: Decode Bytes To String
Blockly.Blocks['rb_string_decode_bytes_to_string'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Decode Bytes To String");
    
    this.appendValueInput("bytes_container")
      .setCheck("Variable");

    this.appendValueInput("encoding_container")
      .appendField("encoding：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("errors：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["strict", "strict"],
        ["ignore", "ignore"],
        ["replace", "replace"]
      ]), "errors_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Decode Bytes To String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Decode%20Bytes%20To%20String");
  }
};

pythonGenerator.forBlock['rb_string_decode_bytes_to_string'] = function(block) {
  let bytes = pythonGenerator.valueToCode(block, 'bytes_container', pythonGenerator.ORDER_ATOMIC) || '';
  bytes = robotFormate(bytes, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let errors = block.getFieldValue('errors_arg') || '';

  let code = `Decode Bytes To String`;
  code += `${bytes ? `${robot_indent}${bytes}` : ''}`;
  code += `${encoding ? `${robot_indent}${encoding}` : ''}`;
  code += `${errors ? `${robot_indent}errors=${errors}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Encode String To Bytes
Blockly.Blocks['rb_string_encode_string_to_bytes'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Encode String To Bytes");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("encoding_container")
      .appendField("encoding：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("errors：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["strict", "strict"],
        ["ignore", "ignore"],
        ["replace", "replace"]
      ]), "errors_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Encode String To Bytes");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Encode%20String%20To%20Bytes");
  }
};

pythonGenerator.forBlock['rb_string_encode_string_to_bytes'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let errors = block.getFieldValue('errors_arg') || '';

  let code = `Encode String To Bytes`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${encoding ? `${robot_indent}${encoding}` : ''}`;
  code += `${errors ? `${robot_indent}errors=${errors}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};