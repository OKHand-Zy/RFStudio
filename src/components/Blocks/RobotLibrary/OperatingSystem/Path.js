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

// OperatingSystem: Join Path
Blockly.Blocks['rb_operating_system_join_path'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Join Path ");

    this.appendValueInput('base_container')
      .setCheck('Variable');

    this.appendValueInput("path_container")
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Join Path");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Join%20Path");
  }
};

pythonGenerator.forBlock['rb_operating_system_join_path'] = function(block) {
  let base = pythonGenerator.valueToCode(block, 'base_container', pythonGenerator.ORDER_ATOMIC) || '';
  base = robotFormate(base, '|', default_indent)

  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', robot_indent)

  let code = `Join Path`;
  code += `${base ? `${robot_indent}${base}` : ''}`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Join Paths
Blockly.Blocks['rb_operating_system_join_paths'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Join Paths ");
    
    this.appendValueInput('base_container')
      .setCheck('Variable');

    this.appendValueInput('paths_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Join Paths");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Join%20Paths");
  }
};

pythonGenerator.forBlock['rb_operating_system_join_paths'] = function(block) {
  let base = pythonGenerator.valueToCode(block, 'base_container', pythonGenerator.ORDER_ATOMIC) || '';
  base = robotFormate(base, '|', default_indent)

  let paths = pythonGenerator.valueToCode(block, 'paths_container', pythonGenerator.ORDER_ATOMIC) || '';
  paths = robotFormate(paths, '|', robot_indent)

  let code = `Join Paths`;
  code += `${base ? `${robot_indent}${base}` : ''}`;
  code += `${paths ? `${robot_indent}${paths}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Normalize Path
Blockly.Blocks['rb_operating_system_normalize_path'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Normalize Path ");
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.appendDummyInput("options_container")
      .appendField("case_normalize：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "case_normalize_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Normalize Path");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Normalize%20Path");
  }
};

pythonGenerator.forBlock['rb_operating_system_normalize_path'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let case_normalize = block.getFieldValue('case_normalize_arg') || '';

  let code = `Normalize Path`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${case_normalize ? `${robot_indent}case_normalize=${case_normalize}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Split Extension
Blockly.Blocks['rb_operating_system_split_extension'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Split Extension ");
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Split Extension");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Split%20Extension");
  }
};

pythonGenerator.forBlock['rb_operating_system_split_extension'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Split Extension`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// OperatingSystem: Split Path
Blockly.Blocks['rb_operating_system_split_path'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField("Split Path ");
    
    this.appendValueInput('path_container')
      .setCheck('Variable');

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("OperatingSystem：Split Path");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html#Split%20Path");
  }
};

pythonGenerator.forBlock['rb_operating_system_split_path'] = function(block) {
  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let code = `Split Path`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};