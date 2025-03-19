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

// XML: Get Element
Blockly.Blocks['rb_xml_get_element'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Element");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Element");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Element");
  }  
};

pythonGenerator.forBlock['rb_xml_get_element'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Get Element`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Get Elements
Blockly.Blocks['rb_xml_get_elements'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Elements");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Elements");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Elements");
  }  
};

pythonGenerator.forBlock['rb_xml_get_elements'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Get Elements`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Get Child Elements
Blockly.Blocks['rb_xml_get_child_elements'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Child Elements");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Child Elements");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Child%20Elements");
  }  
};

pythonGenerator.forBlock['rb_xml_get_child_elements'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Get Child Elements`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Get Element Count
Blockly.Blocks['rb_xml_get_element_count'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Element Count");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Element Count");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Element%20Count");
  }  
};

pythonGenerator.forBlock['rb_xml_get_element_count'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Get Element Count`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Get Element Text
Blockly.Blocks['rb_xml_get_element_text'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Element Text");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");
    
    this.appendDummyInput("option_container")
      .appendField("normalize_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"]
      ]), "normalize_whitespace_arg");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Element Text");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Element%20Text");
  }  
};

pythonGenerator.forBlock['rb_xml_get_element_text'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let normalize_whitespace = block.getFieldValue('normalize_whitespace_arg') || '';

  let code = `Get Element Text`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${normalize_whitespace ? `${robot_indent}normalize_whitespace=${normalize_whitespace}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Get Elements Texts
Blockly.Blocks['rb_xml_get_elements_texts'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Elements Texts");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");
    
    this.appendDummyInput("option_container")
      .appendField("normalize_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"]
      ]), "normalize_whitespace_arg");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Elements Texts");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Elements%20Texts");
  }  
};

pythonGenerator.forBlock['rb_xml_get_elements_texts'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let normalize_whitespace = block.getFieldValue('normalize_whitespace_arg') || '';

  let code = `Get Elements Texts`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${normalize_whitespace ? `${robot_indent}normalize_whitespace=${normalize_whitespace}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Get Element Attribute
Blockly.Blocks['rb_xml_get_element_attribute'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Element Attribute");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("name_container")
      .appendField("name：")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");
    
    this.appendValueInput("type_container")
      .appendField("default return type：")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Element Attribute");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Element%20Attribute");
  }  
};

pythonGenerator.forBlock['rb_xml_get_element_attribute'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let type = pythonGenerator.valueToCode(block, 'type_container', pythonGenerator.ORDER_ATOMIC) || '';
  type = robotFormate(type, '|', default_indent)

  let code = `Get Element Attribute`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${type ? `${robot_indent}default=${type}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Get Element Attributes
Blockly.Blocks['rb_xml_get_element_attributes'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Get Element Attributes");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Get Element Attribute");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Get%20Element%20Attribute");
  }  
};

pythonGenerator.forBlock['rb_xml_get_element_attribute'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Get Element Attribute`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};