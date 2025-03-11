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

// Collections: Get Match Count
Blockly.Blocks['rbl_collections_get_match_count'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Match Count');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('pattern_container')
      .appendField('Pattern：')
      .setCheck('Variable');
    
    this.appendDummyInput('option_container')
      .appendField(" case_insensitive：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "case_insensitive_arg")

      .appendField(" whitespace_insensitive：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "whitespace_insensitive_arg")

      .appendField(" ignore_case：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_case_arg")

      .appendField(" ignore_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_whitespace_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get Match Count');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20Match%20Count');
  }
};

pythonGenerator.forBlock['rbl_collections_get_match_count'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let case_insensitive = block.getFieldValue('case_insensitive_arg') || '';
  let whitespace_insensitive = block.getFieldValue('whitespace_insensitive_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let ignore_whitespace = block.getFieldValue('ignore_whitespace_arg') || '';

  let code = `Get Match Count`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${case_insensitive ? `${robot_indent}case_insensitive=${case_insensitive}` : ''}`;
  code += `${whitespace_insensitive ? `${robot_indent}whitespace_insensitive=${whitespace_insensitive}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${ignore_whitespace ? `${robot_indent}ignore_whitespace=${ignore_whitespace}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get Matches
Blockly.Blocks['rbl_collections_get_matches'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Matches');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('pattern_container')
      .appendField('Pattern：')
      .setCheck('Variable');
    
    this.appendDummyInput('option_container')
      .appendField(" case_insensitive：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "case_insensitive_arg")

      .appendField(" whitespace_insensitive：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "whitespace_insensitive_arg")

      .appendField(" ignore_case：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_case_arg")

      .appendField(" ignore_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_whitespace_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get Matches');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20Matches');
  }
};

pythonGenerator.forBlock['rbl_collections_get_matches'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent)  

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let case_insensitive = block.getFieldValue('case_insensitive_arg') || '';
  let whitespace_insensitive = block.getFieldValue('whitespace_insensitive_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let ignore_whitespace = block.getFieldValue('ignore_whitespace_arg') || '';

  let code = `Get Matches`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${case_insensitive ? `${robot_indent}case_insensitive=${case_insensitive}` : ''}`;
  code += `${whitespace_insensitive ? `${robot_indent}whitespace_insensitive=${whitespace_insensitive}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${ignore_whitespace ? `${robot_indent}ignore_whitespace=${ignore_whitespace}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Should Contain Match
Blockly.Blocks['rbl_collections_should_contain_match'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Should Contain Match');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('pattern_container')
      .appendField('Pattern：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);

    this.appendDummyInput('option_container')
      .appendField(' case_insensitive：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "case_insensitive_arg")

      .appendField(' whitespace_insensitive：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "whitespace_insensitive_arg")

      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_case_arg")

      .appendField(' ignore_whitespace：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_whitespace_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Should Contain Match');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Should%20Contain%20Match');
  }
};

pythonGenerator.forBlock['rbl_collections_should_contain_match'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent);

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent);

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent);

  let case_insensitive = block.getFieldValue('case_insensitive_arg') || '';
  let whitespace_insensitive = block.getFieldValue('whitespace_insensitive_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let ignore_whitespace = block.getFieldValue('ignore_whitespace_arg') || '';

  let code = `Should Contain Match`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${case_insensitive ? `${robot_indent}case_insensitive=${case_insensitive}` : ''}`;
  code += `${whitespace_insensitive ? `${robot_indent}whitespace_insensitive=${whitespace_insensitive}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${ignore_whitespace ? `${robot_indent}ignore_whitespace=${ignore_whitespace}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Should Not Contain Match
Blockly.Blocks['rbl_collections_should_not_contain_match'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Should Not Contain Match');
      
    this.appendValueInput('list_container')
      .setCheck('Variable');
    
    this.appendValueInput('pattern_container')
      .appendField('Pattern：')
      .setCheck('Variable');
    
    this.appendValueInput('message')
      .appendField(' msg：')
      .setCheck(null);

    this.appendDummyInput('option_container')
      .appendField(' case_insensitive：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "case_insensitive_arg")

      .appendField(' whitespace_insensitive：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["None", "None"],
        ["True", "True"], 
      ]), "whitespace_insensitive_arg")

      .appendField(' ignore_case：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_case_arg")

      .appendField(' ignore_whitespace：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"], 
        ["False", "False"], 
      ]), "ignore_whitespace_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Should Not Contain Match');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Should%20Not%20Contain%20Match');
  }
};

pythonGenerator.forBlock['rbl_collections_should_not_contain_match'] = function(block) {
  let list = pythonGenerator.valueToCode(block, 'list_container', pythonGenerator.ORDER_ATOMIC) || '';
  list = robotFormate(list, '|', default_indent);

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent);

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent);

  let case_insensitive = block.getFieldValue('case_insensitive_arg') || '';
  let whitespace_insensitive = block.getFieldValue('whitespace_insensitive_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let ignore_whitespace = block.getFieldValue('ignore_whitespace_arg') || '';

  let code = `Should Not Contain Match`
  code += `${list ? `${robot_indent}${list}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${msg ? `${robot_indent}msg=${msg}` : ''}`;
  code += `${case_insensitive ? `${robot_indent}case_insensitive=${case_insensitive}` : ''}`;
  code += `${whitespace_insensitive ? `${robot_indent}whitespace_insensitive=${whitespace_insensitive}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${ignore_whitespace ? `${robot_indent}ignore_whitespace=${ignore_whitespace}` : ''}`;
  code += '\n';
  return code;
};