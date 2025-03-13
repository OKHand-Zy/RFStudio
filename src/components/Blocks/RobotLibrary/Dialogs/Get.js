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

// Dialogs: Get Selection From User
Blockly.Blocks['rb_dialogs_get_selection_from_user'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Selection From User');
    
    this.appendValueInput('message_container')
      .appendField('Message：');
    
    this.appendValueInput('selectItems_container')
      .appendField('SelectItems：');

    this.appendValueInput('default_container')
      .appendField('Default：');
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Dialogs: Get Selection From User');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Dialogs.html#Get%20Selection%20From%20User');
  }
};

pythonGenerator.forBlock['rb_dialogs_get_selection_from_user'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let selectItems = pythonGenerator.valueToCode(block, 'selectItems_container', pythonGenerator.ORDER_ATOMIC) || '';
  selectItems = robotFormate(selectItems, '|', robot_indent)

  let default_select = pythonGenerator.valueToCode(block, 'default_container', pythonGenerator.ORDER_ATOMIC) || '';
  default_select = robotFormate(default_select, '|', robot_indent)

  let code = `Get Selection From User`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += `${selectItems ? `${robot_indent}${selectItems}` : ''}`;
  code += `${default_select ? `${robot_indent}default=${default_select}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Dialogs: Get Selections From User
Blockly.Blocks['rb_dialogs_get_selections_from_user'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Get Selections From User');

    this.appendValueInput("message_container")
      .appendField("Message：");

    this.appendValueInput("selections_container")
      .appendField("Selections：");

    this.setInputsInline(true);
    this.setColour(block_color);
    this.setOutput(true, null);
    this.setTooltip("Dialogs: Get Selections From User");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Dialogs.html#Get%20Selections%20From%20User");
  }
};

pythonGenerator.forBlock['rb_dialogs_get_selections_from_user'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)
  
  let selections = pythonGenerator.valueToCode(block, 'selections_container', pythonGenerator.ORDER_ATOMIC) || '';
  selections = robotFormate(selections, '|', robot_indent)
  
  let code = 'Get Selections From User';
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += `${selections ? `${robot_indent}${selections}` : ''}`;

  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Dialogs: Get Value From User
Blockly.Blocks['rb_dialogs_get_value_from_user'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField('Get Value From User');

    this.appendValueInput("message_container")
      .appendField("Message：");

    this.appendValueInput("default_container")
      .appendField("Default Value：");
    
    this.appendDummyInput("option_container")
      .appendField("hidden：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "hidden_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Dialogs: Get Value From User");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Dialogs.html#Get%20Value%20From%20User");
  }
};

pythonGenerator.forBlock['rb_dialogs_get_value_from_user'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let default_value = pythonGenerator.valueToCode(block, 'default_container', pythonGenerator.ORDER_ATOMIC) || '';
  default_value = robotFormate(default_value, '|', default_indent)

  let hidden = block.getFieldValue('hidden_arg') || '';

  let code = `Get Value From User`;
  code += `${message ? `${robot_indent}${message}` : ''}`;
  code += `${default_value ? `${robot_indent}${default_value}` : ''}`;
  code += `${hidden ? `${robot_indent}hidden=${hidden}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};