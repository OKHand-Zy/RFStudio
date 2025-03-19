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

// XML: Parse Xml
Blockly.Blocks['rb_xml_parse_xml'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Parse Xml");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("keep_clark_notation：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"]
      ]), "keep_clark_notation_arg")

      .appendField("strip_namespaces：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"]
      ]), "strip_namespaces_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Parse Xml");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Parse%20Xml");
  }  
};

pythonGenerator.forBlock['rb_xml_parse_xml'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let keep_clark_notation = block.getFieldValue('keep_clark_notation_arg') || '';
  let strip_namespaces = block.getFieldValue('strip_namespaces_arg') || '';

  let code = `Parse Xml`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${keep_clark_notation ? `${robot_indent}keep_clark_notation=${keep_clark_notation}` : ''}`;
  code += `${strip_namespaces ? `${robot_indent}strip_namespaces=${strip_namespaces}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Save Xml
Blockly.Blocks['rb_xml_save_xml'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Save Xml");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("path_container")
      .appendField("path：")
      .setCheck("Variable");
    
    this.appendValueInput("encoding_container")
      .appendField("encoding：")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Save Xml");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Save%20Xml");
  }  
};

pythonGenerator.forBlock['rb_xml_save_xml'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let path = pythonGenerator.valueToCode(block, 'path_container', pythonGenerator.ORDER_ATOMIC) || '';
  path = robotFormate(path, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let code = `Save Xml`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${path ? `${robot_indent}${path}` : ''}`;
  code += `${encoding ? `${robot_indent}encoding=${encoding}` : ''}`;
  code += '\n';
  return code;
};


// XML: Evaluate Xpath
Blockly.Blocks['rb_xml_evaluate_xpath'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Evaluate Xpath");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("expression_container")
      .setCheck("Variable");

    this.appendValueInput("context_container")
      .appendField("context：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Evaluate Xpath");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Evaluate%20Xpath");
  }  
};

pythonGenerator.forBlock['rb_xml_evaluate_xpath'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let expression = pythonGenerator.valueToCode(block, 'expression_container', pythonGenerator.ORDER_ATOMIC) || '';
  expression = robotFormate(expression, '|', default_indent)

  let context = pythonGenerator.valueToCode(block, 'context_container', pythonGenerator.ORDER_ATOMIC) || '';
  context = robotFormate(context, '|', default_indent)

  let code = `Evaluate Xpath`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${expression ? `${robot_indent}${expression}` : ''}`;
  code += `${context ? `${robot_indent}context=${context}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Element To String
Blockly.Blocks['rb_xml_element_to_string'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element To String");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendValueInput("encoding_container")
      .appendField("encoding：")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element To String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20To%20String");
  }  
};

pythonGenerator.forBlock['rb_xml_element_to_string'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let code = `Element To String`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${encoding ? `${robot_indent}encoding=${encoding}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Copy Element
Blockly.Blocks['rb_xml_copy_element'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Copy Element");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Copy Element");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Copy%20Element");
  }  
};

pythonGenerator.forBlock['rb_xml_copy_element'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Copy Element`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Log Element
Blockly.Blocks['rb_xml_log_element'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Log Element");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");
    
    this.appendDummyInput("option_container")
      .appendField("Log level：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["FAIL", "FAIL"],
        ["WARN", "WARN"],
        ["INFO", "INFO"],
        ["DEBUG", "DEBUG"],
        ["DEBUG", "DEBUG"]
      ]), "log_level_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Log Element");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Log%20Element");
  }  
};

pythonGenerator.forBlock['rb_xml_log_element'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let log_level = block.getFieldValue('log_level_arg') || '';

  let code = `Log Element`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${log_level ? `${robot_indent}level=${log_level}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return code;
};