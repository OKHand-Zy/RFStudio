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

// String: Extract From Left
Blockly.Blocks['rb_string_extract_from_left'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Extract From Left");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("marker_container")
      .appendField("marker:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Extract From Left");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Extract%20From%20Left");
  }
};

pythonGenerator.forBlock['rb_string_extract_from_left'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let marker = pythonGenerator.valueToCode(block, 'marker_container', pythonGenerator.ORDER_ATOMIC) || '';
  marker = robotFormate(marker, '|', default_indent)

  let code = `Extract From Left`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${marker ? `${robot_indent}marker=${marker}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Extract From Right
Blockly.Blocks['rb_string_extract_from_right'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Extract From Right");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("marker_container")
      .appendField("marker:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Extract From Right");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Extract%20From%20Right");
  }
};

pythonGenerator.forBlock['rb_string_extract_from_right'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let marker = pythonGenerator.valueToCode(block, 'marker_container', pythonGenerator.ORDER_ATOMIC) || '';
  marker = robotFormate(marker, '|', default_indent)

  let code = `Extract From Right`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${marker ? `${robot_indent}marker=${marker}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Get Line
Blockly.Blocks['rb_string_get_line'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Line");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("line_number_container")
      .appendField("line number:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Get Line");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Get%20Line");
  }
};

pythonGenerator.forBlock['rb_string_get_line'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let line_number = pythonGenerator.valueToCode(block, 'line_number_container', pythonGenerator.ORDER_ATOMIC) || '';
  line_number = robotFormate(line_number, '|', default_indent)

  let code = `Get Line`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${line_number ? `${robot_indent}${line_number}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Get Line Count
Blockly.Blocks['rb_string_get_line_count'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Line Count");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Get Line Count");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Get%20Line%20Count");
  }
};

pythonGenerator.forBlock['rb_string_get_line_count'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let code = `Get Line Count`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Get Lines Containing String
Blockly.Blocks['rb_string_get_lines_containing_string'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Lines Containing String");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("pattern_container")
      .appendField("pattern:")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("case_insensitive：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "case_insensitive_arg")

      .appendField("ignore_case：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Get Lines Containing String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Get%20Lines%20Containing%20String");
  }
};

pythonGenerator.forBlock['rb_string_get_lines_containing_string'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let case_insensitive = block.getFieldValue('case_insensitive_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Get Lines Containing String`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${case_insensitive ? `${robot_indent}case_insensitive=${case_insensitive}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Get Lines Matching Pattern
Blockly.Blocks['rb_string_get_lines_matching_pattern'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Lines Matching Pattern");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("pattern_container")
      .appendField("pattern:")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("case_insensitive：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "case_insensitive_arg")

      .appendField("ignore_case：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Get Lines Matching Pattern");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Get%20Lines%20Matching%20Pattern");
  }
};

pythonGenerator.forBlock['rb_string_get_lines_matching_pattern'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let case_insensitive = block.getFieldValue('case_insensitive_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Get Lines Matching Pattern`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${case_insensitive ? `${robot_indent}case_insensitive=${case_insensitive}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Get Lines Matching Regexp
Blockly.Blocks['rb_string_get_lines_matching_regexp'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Lines Matching Regexp");

    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("pattern_container")
      .appendField("pattern：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("partial_match：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "partial_match_arg")

      .appendField("flags：")
      .appendField(new Blockly.FieldDropdown([
        ["None", ""],
        ["IGNORECASE", "IGNORECASE"],
        ["VERBOSE", "VERBOSE"]
      ]), "flags_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Get Lines Matching Regexp");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Get%20Lines%20Matching%20Regexp");
  }
};

pythonGenerator.forBlock['rb_string_get_lines_matching_regexp'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let partial_match = block.getFieldValue('partial_match_arg') || '';
  let flags = block.getFieldValue('flags_arg') || '';

  let code = `Get Lines Matching Regexp`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${partial_match ? `${robot_indent}partial_match=${partial_match}` : ''}`;
  code += `${flags ? `${robot_indent}flags=${flags}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Get Regexp Matches
Blockly.Blocks['rb_string_get_regexp_matches'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Regexp Matches");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("pattern_container")
      .appendField("pattern：")
      .setCheck("Variable");
    
    this.appendValueInput("groups_container")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("flags：")
      .appendField(new Blockly.FieldDropdown([
        ["None", ""],
        ["IGNORECASE", "IGNORECASE"],
        ["VERBOSE", "VERBOSE"]
      ]), "flags_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Get Regexp Matches");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Get%20Regexp%20Matches");
  }
};

pythonGenerator.forBlock['rb_string_get_regexp_matches'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let groups = pythonGenerator.valueToCode(block, 'groups_container', pythonGenerator.ORDER_ATOMIC) || '';
  groups = robotFormate(groups, '|', robot_indent)

  let flags = block.getFieldValue('flags_arg') || '';

  let code = `Get Regexp Matches`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${groups ? `${robot_indent}${groups}` : ''}`;
  code += `${flags ? `${robot_indent}flags=${flags}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Get Substring
Blockly.Blocks['rb_string_get_substring'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Substring");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("start_container")
      .appendField("start:")
      .setCheck("Variable");

    this.appendValueInput("end_container")
      .appendField("end:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Get Substring");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Get%20Substring");
  }
};

pythonGenerator.forBlock['rb_string_get_substring'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let start = pythonGenerator.valueToCode(block, 'start_container', pythonGenerator.ORDER_ATOMIC) || '';
  start = robotFormate(start, '|', default_indent)

  let end = pythonGenerator.valueToCode(block, 'end_container', pythonGenerator.ORDER_ATOMIC) || '';
  end = robotFormate(end, '|', default_indent)

  let code = `Get Substring`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${start ? `${robot_indent}${start}` : ''}`;
  code += `${end ? `${robot_indent}${end}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};