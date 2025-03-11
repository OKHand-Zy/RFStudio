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

// Collections: Append To List
Blockly.Blocks['rbl_collections_append_to_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Append To List');

    this.appendValueInput('list_variable_container')
      .setCheck('Variable')
    
    this.appendValueInput('items')
      .appendField('Values：')
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Append To List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Append%20To%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_append_to_list'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'list_variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)

  let values = pythonGenerator.valueToCode(block, 'items', pythonGenerator.ORDER_ATOMIC) || '';
  values = robotFormate(values, '|', robot_indent)

  let code = `Append To List`
  code += `${variable ? `${robot_indent}${variable}` : ''}` 
  code += `${values ? `${robot_indent}${values}` : ''}`
  code += '\n'
  return code;
};

// Collections: Combine Lists
Blockly.Blocks['rbl_collections_combine_lists'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Combine Lists');

    this.appendValueInput('list_container')
      .setCheck('Variable')
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Combine Lists');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Combine%20Lists');
  }
};

pythonGenerator.forBlock['rbl_collections_combine_lists'] = function(block) {
  let lists = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  lists = robotFormate(lists, '|', robot_indent);
  
  let code = `Combine Lists`;
  code += `${lists ? `${robot_indent}${lists}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Copy List
Blockly.Blocks['rbl_collections_copy_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Copy Dictionary');

    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendDummyInput('options_container')
      .appendField('deep_copy=')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "deep_copy_arg")
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Copy List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Copy%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_copy_list'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)
  
  let deep_copy_arg = block.getFieldValue('deep_copy_arg') || '';

  let code = `Copy List`
  code += `${ variable ? `${robot_indent}${variable}` : '' }`;
  code += `${ deep_copy_arg ? `${robot_indent}deep_copy=${deep_copy_arg}` : '' }`;
  code += '\n';

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Count Values In List
Blockly.Blocks['rbl_collections_count_values_in_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Count Values In List');

    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck(null);
    
    this.appendDummyInput('options_container')
      .appendField(' Start：')
      .appendField(new Blockly.FieldTextInput('default'), 'start_arg')
      .appendField(' End：')
      .appendField(new Blockly.FieldTextInput('default'), 'end_arg')
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Count Values In List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Count%20Values%20In%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_count_values_in_list'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)

  let find_value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  find_value = robotFormate(find_value, '|', default_indent)

  let start = block.getFieldValue('start_arg') || '';
  if (start == 'default') {
    start = '';
  }
  let end = block.getFieldValue('end_arg') || '';
  if (end == 'default') {
    end = '';
  }

  let code = `Count Values In List`
  code += `${variable ? `${robot_indent}${variable}` : ''}`;
  code += `${find_value ? `${robot_indent}${find_value}` : ''}`;
  code += `${start ? `${robot_indent}start=${start}` : ''}`;
  code += `${end ? `${robot_indent}end=${end}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get From List
Blockly.Blocks['rbl_collections_get_from_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get From List');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('index_container')
      .appendField('Index：')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get From List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20From%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_get_from_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let index = pythonGenerator.valueToCode(block, 'index_container', pythonGenerator.ORDER_ATOMIC) || '';
  index = robotFormate(index, '|', default_indent)

  let code = `Get From List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${index ? `${robot_indent}${index}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get Index From List
Blockly.Blocks['rbl_collections_get_index_from_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Index From List');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.appendDummyInput('option_container')
      .appendField(' start：')
      .appendField(new Blockly.FieldTextInput('default'), 'start_arg')
      .appendField(' end：')
      .appendField(new Blockly.FieldTextInput('default'), 'end_arg')

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get Index From List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20Index%20From%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_get_index_from_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let start = block.getFieldValue('start_arg') || '';
  if (start == 'default') {
    start = '';
  }
  let end = block.getFieldValue('end_arg') || '';
  if (end == 'default') {
    end = '';
  }

  let code = `Get Index From List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${start ? `${robot_indent}start=${start}` : ''}`;
  code += `${end ? `${robot_indent}end=${end}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get Slice From List
Blockly.Blocks['rbl_collections_get_slice_from_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Slice From List');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendDummyInput('option_container')
      .appendField('Start：')
      .appendField(new Blockly.FieldTextInput('default'), 'start_arg')
      .appendField(' End：')
      .appendField(new Blockly.FieldTextInput('default'), 'end_arg')

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get Slice From List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20Slice%20From%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_get_slice_from_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let start = block.getFieldValue('start_arg') || '';
  if (start == 'default') {
    start = '';
  }
  let end = block.getFieldValue('end_arg') || '';
  if (end == 'default') {
    end = '';
  }

  let code = `Get Slice From List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${start ? `${robot_indent}start=${start}` : ''}`;
  code += `${end ? `${robot_indent}end=${end}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Insert Into List
Blockly.Blocks['rbl_collections_insert_into_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Insert Into List');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('index_container')
      .appendField('Index：')
      .setCheck('Variable');
    
      this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Insert Into List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Insert%20Into%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_insert_into_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let index = pythonGenerator.valueToCode(block, 'index_container', pythonGenerator.ORDER_ATOMIC) || '';
  index = robotFormate(index, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let code = `Insert Into List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${index ? `${robot_indent}${index}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += '\n';
  return code;
};

// Collections: List Should Not Contain Duplicates
Blockly.Blocks['rbl_collections_list_should_not_contain_duplicates'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('List Should Not Contain Duplicates');
      
    this.appendValueInput('list_container')
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
    this.setTooltip('BuiltIn: List Should Not Contain Duplicates');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#List%20Should%20Not%20Contain%20Duplicates');
  }
};

pythonGenerator.forBlock['rbl_collections_list_should_not_contain_duplicates'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `List Should Not Contain Duplicates`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Remove Duplicates
Blockly.Blocks['rbl_collections_remove_duplicates'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Remove Duplicates');

    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Remove Duplicates');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Remove%20Duplicates');
  }
};

pythonGenerator.forBlock['rbl_collections_remove_duplicates'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let code = `Remove Duplicates`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Remove From List
Blockly.Blocks['rbl_collections_remove_from_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Remove From List');

    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('index_container')
      .appendField('Index：')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Remove From List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Remove%20From%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_remove_from_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let index = pythonGenerator.valueToCode(block, 'index_container', pythonGenerator.ORDER_ATOMIC) || '';
  index = robotFormate(index, '|', default_indent)

  let code = `Remove From List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${index ? `${robot_indent}${index}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Remove Values From List
Blockly.Blocks['rbl_collections_remove_values_from_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Remove Values From List');

    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('values_container')
      .appendField('Values：')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Remove Values From List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Remove%20Values%20From%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_remove_values_from_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let values = pythonGenerator.valueToCode(block, 'values_container', pythonGenerator.ORDER_ATOMIC) || '';
  values = robotFormate(values, '|', robot_indent)

  let code = `Remove Values From List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${values ? `${robot_indent}${values}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Reverse List
Blockly.Blocks['rbl_collections_reverse_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Reverse List');

    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Reverse List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Reverse%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_reverse_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let code = `Reverse List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Set List Value
Blockly.Blocks['rbl_collections_set_list_value'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Set List Value');

    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('index_container')
      .appendField('Index：')
      .setCheck('Variable');
    
    this.appendValueInput('value_container')
      .appendField('Value：')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Set List Value');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Set%20List%20Value');
  }
};

// Collections: Sort List
Blockly.Blocks['rbl_collections_sort_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Sort List');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Sort List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Sort%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_sort_list'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent);

  let code = `Sort List`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += '\n';
  return code;
};