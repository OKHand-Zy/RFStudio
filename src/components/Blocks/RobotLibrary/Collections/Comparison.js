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

// Collections: Dictionaries Should Be Equal
Blockly.Blocks['rbl_collections_dictionaries_should_be_equal'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Dictionaries Should Be Equal');

    this.appendValueInput('dict1_container')
      .setCheck('Variable');
    
    this.appendValueInput('dict2_container')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);

    this.appendValueInput('ignore_keys_container')
      .appendField(' ignore_keys：')
      .setCheck(null);

    this.appendDummyInput('options_container')
      .appendField(' Values：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(' ignore_order：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_order_arg")
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Dictionaries Should Be Equal');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Dictionaries%20Should%20Be%20Equal');
  }
};

pythonGenerator.forBlock['rbl_collections_dictionaries_should_be_equal'] = function(block) {
  let dict1 = pythonGenerator.valueToCode(block, 'dict1_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict1 = robotFormate(dict1, '|', default_indent)

  let dict2 = pythonGenerator.valueToCode(block, 'dict2_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict2 = robotFormate(dict2, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_keys = pythonGenerator.valueToCode(block, 'ignore_keys_container', pythonGenerator.ORDER_ATOMIC) || '';
  ignore_keys = robotFormate(ignore_keys, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let ignore_order = block.getFieldValue('ignore_order_arg') || '';

  let code = `Dictionaries Should Be Equal`
  code += `${dict1 ? `${robot_indent}${dict1}` : ''}`;
  code += `${dict2 ? `${robot_indent}${dict2}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_keys ? `${robot_indent}ignore_keys=${ignore_keys}` : ''}`;
  code += `${values ? `${robot_indent}values=${values}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${ignore_order ? `${robot_indent}ignore_order=${ignore_order}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Dictionary Should Contain Item
Blockly.Blocks['rbl_collections_dictionary_should_contain_item'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Dictionary Should Contain Item');
    
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('key_container')
      .appendField('Key：')
      .setCheck('Variable');

    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Dictionary Should Contain Item');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Dictionary%20Should%20Contain%20Item');
  }
};

pythonGenerator.forBlock['rbl_collections_dictionary_should_contain_item'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let key = pythonGenerator.valueToCode(block, 'key_container', pythonGenerator.ORDER_ATOMIC) || '';
  key = robotFormate(key, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Dictionary Should Contain Item`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${key ? `${robot_indent}${key}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Dictionary Should Contain Key
Blockly.Blocks['rbl_collections_dictionary_should_contain_key'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Dictionary Should Contain Key');
    
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('key_container')
      .appendField('Key：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Dictionary Should Contain Key');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Dictionary%20Should%20Contain%20Key');
  }
};

pythonGenerator.forBlock['rbl_collections_dictionary_should_contain_key'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let key = pythonGenerator.valueToCode(block, 'key_container', pythonGenerator.ORDER_ATOMIC) || '';
  key = robotFormate(key, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Dictionary Should Contain key`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${key ? `${robot_indent}${key}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Dictionary Should Contain Sub Dictionary
Blockly.Blocks['rbl_collections_dictionary_should_contain_sub_dictionary'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Dictionary Should Contain Sub Dictionary');
    
    this.appendValueInput('dict1_container')
      .setCheck('Variable');
    
    this.appendValueInput('dict2_container')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' values：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(' ignore_order：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_order_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Dictionary Should Contain Sub Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Dictionary%20Should%20Contain%20Sub%20Dictionary');
  }
};

pythonGenerator.forBlock['rbl_collections_dictionary_should_contain_sub_dictionary'] = function(block) {
  let dict1 = pythonGenerator.valueToCode(block, 'dict1_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict1 = robotFormate(dict1, '|', default_indent)

  let dict2 = pythonGenerator.valueToCode(block, 'dict2_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict2 = robotFormate(dict2, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let ignore_order = block.getFieldValue('ignore_order_arg') || '';

  let code = `Dictionary Should Contain Sub Dictionary`
  code += `${dict1 ? `${robot_indent}${dict1}` : ''}`;
  code += `${dict2 ? `${robot_indent}${dict2}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${values ? `${robot_indent}values=${values}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${ignore_order ? `${robot_indent}ignore_order=${ignore_order}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Dictionary Should Contain Value
Blockly.Blocks['rbl_collections_dictionary_should_contain_value'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Dictionary Should Contain Value');
    
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Dictionary Should Contain Value');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Dictionary%20Should%20Contain%20Value');
  }
};

pythonGenerator.forBlock['rbl_collections_dictionary_should_contain_value'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Dictionary Should Contain Value`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Dictionary Should Not Contain Key
Blockly.Blocks['rbl_collections_dictionary_should_not_contain_key'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Dictionary Should Not Contain Key');

    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('key_container')
      .appendField('Key：')
      .setCheck('Variable');

    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Dictionary Should Not Contain Key');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Dictionary%20Should%20Not%20Contain%20Key');
  }
};

pythonGenerator.forBlock['rbl_collections_dictionary_should_not_contain_key'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let key = pythonGenerator.valueToCode(block, 'key_container', pythonGenerator.ORDER_ATOMIC) || '';
  key = robotFormate(key, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Dictionary Should Not Contain key`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${key ? `${robot_indent}${key}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Dictionary Should Not Contain Value
Blockly.Blocks['rbl_collections_dictionary_should_not_contain_value'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Dictionary Should Not Contain Value');

    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Dictionary Should Not Contain Value');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Dictionary%20Should%20Not%20Contain%20Value');
  }
};

pythonGenerator.forBlock['rbl_collections_dictionary_should_not_contain_value'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Dictionary Should Not Contain Value`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: List Should Contain Sub List
Blockly.Blocks['rbl_collections_list_should_contain_sub_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('List Should Contain Sub List');
      
    this.appendValueInput('list1_container')
      .setCheck('Variable');
    
    this.appendValueInput('list2_container')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' values：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: List Should Contain Sub List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#List%20Should%20Contain%20Sub%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_list_should_contain_sub_list'] = function(block) {
  let list1 = pythonGenerator.valueToCode(block, 'list1_container', pythonGenerator.ORDER_ATOMIC) || '';
  list1 = robotFormate(list1, '|', default_indent)

  let list2 = pythonGenerator.valueToCode(block, 'list2_container', pythonGenerator.ORDER_ATOMIC) || '';
  list2 = robotFormate(list2, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `List Should Contain Sub List`
  code += `${list1 ? `${robot_indent}${list1}` : ''}`;  
  code += `${list2 ? `${robot_indent}${list2}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${values ? `${robot_indent}values=${values}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: List Should Contain Value
Blockly.Blocks['rbl_collections_list_should_contain_value'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('List Should Contain Value');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: List Should Contain Value');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#List%20Should%20Contain%20Value');
  }
};

pythonGenerator.forBlock['rbl_collections_list_should_contain_value'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `List Should Contain Value`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: sList Should Not Contain Value
Blockly.Blocks['rbl_collections_list_should_not_contain_value'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('List Should Not Contain Value');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);
    
    this.appendDummyInput('option_container')
      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: List Should Not Contain Value');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#List%20Should%20Not%20Contain%20Value');
  }
};

pythonGenerator.forBlock['rbl_collections_list_should_not_contain_value'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `List Should Not Contain Value`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Lists Should Be Equal
const Lists_Should_Be_Equal_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasNames', this.hasNames_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasNames_ = xmlElement.getAttribute('hasNames') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('lists_should_be_equal_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasNames_) {
      const namesBlock = workspace.newBlock('lists_should_be_equal_names_item');
      namesBlock.initSvg();
      connection.connect(namesBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {
    // Check if there's a names_item block connected
    const namesBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasNames_ = namesBlock && namesBlock.type === 'lists_should_be_equal_names_item';
    
    this.updateShape_();
  }
};

// Define the container block for the mutator
Blockly.Blocks['lists_should_be_equal_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Lists Should Be Equal");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Container for mutator settings.");
  }
};

// Define the names item block for the mutator
Blockly.Blocks['lists_should_be_equal_names_item'] = {
  init: function() {
    this.appendDummyInput('names_value')
      .appendField("arg:names")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

// Update the main block to use the mutator
Blockly.Blocks['rbl_collections_lists_should_be_equal'] = {
  init: function() {
    this.containerBlockType = 'lists_should_be_equal_container';
    this.itemBlockTypes = ['lists_should_be_equal_names_item'];
    this.hasNames_ = false;

    this.appendDummyInput('title')
      .appendField('Lists Should Be Equal');
    
    this.appendValueInput('list1_container')
      .setCheck('Variable');
    
    this.appendValueInput('list2_container')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);

    this.appendDummyInput('option_container')
      .appendField(' values：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(' ignore_order：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_order_arg")

      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg");
    
    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Lists Should Be Equal');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Lists%20Should%20Be%20Equal');
  },

  updateShape_: function() {
    // Store values from option_container before potentially removing it
    let values_arg = this.getFieldValue('values_arg');
    let ignore_order_arg = this.getFieldValue('ignore_order_arg');
    let ignore_case_arg = this.getFieldValue('ignore_case_arg');
    
    // Always remove option_container as we'll need to reposition it
    if (this.getInput('option_container')) {
      this.removeInput('option_container');
    }
    
    // Remove names input if it exists
    if (this.getInput('names_container')) {
      this.removeInput('names_container');
    }

    // Add names input if needed
    if (this.hasNames_) {
      this.appendValueInput('names_container')
        .setCheck('Variable')
        .appendField('names：');
    }
    
    // Re-add option_container with the saved values
    this.appendDummyInput('option_container')
      .appendField(' values：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(' ignore_order：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_order_arg")

      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg");
      
    // Restore saved dropdown values if they exist
    if (values_arg) {
      this.setFieldValue(values_arg, 'values_arg');
    }
    if (ignore_order_arg) {
      this.setFieldValue(ignore_order_arg, 'ignore_order_arg');
    }
    if (ignore_case_arg) {
      this.setFieldValue(ignore_case_arg, 'ignore_case_arg');
    }
  },
  ...Lists_Should_Be_Equal_MutatorMixin
};

// Define the code generator
pythonGenerator.forBlock['rbl_collections_lists_should_be_equal'] = function(block) {
  let list1 = pythonGenerator.valueToCode(block, 'list1_container', pythonGenerator.ORDER_ATOMIC) || '';
  list1 = robotFormate(list1, '|', default_indent);

  let list2 = pythonGenerator.valueToCode(block, 'list2_container', pythonGenerator.ORDER_ATOMIC) || '';
  list2 = robotFormate(list2, '|', default_indent);

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent);

  // Get dropdown values
  let values = block.getFieldValue('values_arg');
  let ignore_order = block.getFieldValue('ignore_order_arg');
  let ignore_case = block.getFieldValue('ignore_case_arg');

  let code = `Lists Should Be Equal`;
  code += `${robot_indent}${list1}`;
  code += `${robot_indent}${list2}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += `${values ? `${robot_indent}values=${values}` : ''}`;
  if (block.hasNames_) {
    let names = pythonGenerator.valueToCode(block, 'names_container', pythonGenerator.ORDER_ATOMIC) || '';
    names = robotFormate(names, '|', default_indent);
    if (names) {
      code += `${robot_indent}names=${names}`;
    }
  }
  code += `${ignore_order ? `${robot_indent}ignore_order=${ignore_order}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};