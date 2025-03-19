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

// XML: Element Should Exist
Blockly.Blocks['rb_xml_element_should_exist'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element Should Exist");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");
    
    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element Should Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20Should%20Exist");
  }  
};

pythonGenerator.forBlock['rb_xml_element_should_exist'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Element Should Exist`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${message ? `${robot_indent}message=${message}` : ''}`;
  code += '\n';
  return code;
};

// XML: Element Should Not Exist
Blockly.Blocks['rb_xml_element_should_not_exist'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element Should Not Exist");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");
    
    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element Should Not Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20Should%20Not%20Exist");
  }  
};

pythonGenerator.forBlock['rb_xml_element_should_not_exist'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Element Should Not Exist`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;  
  code += `${message ? `${robot_indent}message=${message}` : ''}`;
  code += '\n';
  return code;
};

// XML: Element Attribute Should Be
Blockly.Blocks['rb_xml_element_attribute_should_be'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element Attribute Should Be");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("name_container")
      .appendField("name：")
      .setCheck("Variable");
    
    this.appendValueInput("expected_container")
      .appendField("expected：")
      .setCheck("Variable");
    
    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element Attribute Should Be");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20Attribute%20Should%20Be");
  }  
};

pythonGenerator.forBlock['rb_xml_element_attribute_should_be'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let expected = pythonGenerator.valueToCode(block, 'expected_container', pythonGenerator.ORDER_ATOMIC) || '';
  expected = robotFormate(expected, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Element Attribute Should Be`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;  
  code += `${expected ? `${robot_indent}${expected}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${message ? `${robot_indent}message=${message}` : ''}`;
  code += '\n';
  return code;
};

// XML: Element Attribute Should Match
Blockly.Blocks['rb_xml_element_attribute_should_match'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element Attribute Should Match");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("name_container")
      .appendField("name：")
      .setCheck("Variable");

    this.appendValueInput("pattern_container")
      .appendField("pattern：")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("normalize_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "normalize_whitespace_arg")
      
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element Attribute Should Match");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20Attribute%20Should%20Match");
  }  
};

pythonGenerator.forBlock['rb_xml_element_attribute_should_match'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let normalize_whitespace = block.getFieldValue('normalize_whitespace_arg') || '';

  let code = `Element Attribute Should Match`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${normalize_whitespace ? `${robot_indent}normalize_whitespace=${normalize_whitespace}` : ''}`;
  code += `${message ? `${robot_indent}message=${message}` : ''}`
  code += '\n';
  return code;
};

// XML: Element Text Should Be
Blockly.Blocks['rb_xml_element_text_should_be'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element Text Should Be");

    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("expected_container")
      .appendField("expected：")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("normalize_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "normalize_whitespace_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element Text Should Be");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20Text%20Should%20Be");
  }  
};

pythonGenerator.forBlock['rb_xml_element_text_should_be'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let expected = pythonGenerator.valueToCode(block, 'expected_container', pythonGenerator.ORDER_ATOMIC) || '';
  expected = robotFormate(expected, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let normalize_whitespace = block.getFieldValue('normalize_whitespace_arg') || '';

  let code = `Element Text Should Be`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${expected ? `${robot_indent}${expected}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${normalize_whitespace ? `${robot_indent}normalize_whitespace=${normalize_whitespace}` : ''}`;
  code += `${message ? `${robot_indent}message=${message}` : ''}`
  code += '\n';
  return code;
};

// XML: Element Text Should Match
Blockly.Blocks['rb_xml_element_text_should_match'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element Text Should Match");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("pattern_container")
      .appendField("pattern：")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("normalize_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "normalize_whitespace_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element Text Should Match");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20Text%20Should%20Match");
  }  
};

pythonGenerator.forBlock['rb_xml_element_text_should_match'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let normalize_whitespace = block.getFieldValue('normalize_whitespace_arg') || '';

  let code = `Element Text Should Match`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${normalize_whitespace ? `${robot_indent}normalize_whitespace=${normalize_whitespace}` : ''}`;
  code += `${message ? `${robot_indent}message=${message}` : ''}`
  code += '\n';
  return code;
};

// XML: Elements Should Be Equal
Blockly.Blocks['rb_xml_elements_should_be_equal'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Elements Should Be Equal");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("expected_container")
      .appendField("expected：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField(" exclude_children：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "exclude_children_arg")  
    
      .appendField(" normalize_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "normalize_whitespace_arg")
    
      .appendField(" sort_children：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "sort_children_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Elements Should Be Equal");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Elements%20Should%20Be%20Equal");
  }  
};

pythonGenerator.forBlock['rb_xml_elements_should_be_equal'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let expected = pythonGenerator.valueToCode(block, 'expected_container', pythonGenerator.ORDER_ATOMIC) || '';
  expected = robotFormate(expected, '|', default_indent)

  let exclude_children = block.getFieldValue('exclude_children_arg') || '';
  let normalize_whitespace = block.getFieldValue('normalize_whitespace_arg') || '';
  let sort_children = block.getFieldValue('sort_children_arg') || '';

  let code = `Elements Should Be Equal`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${expected ? `${robot_indent}${expected}` : ''}`;
  code += `${exclude_children ? `${robot_indent}exclude_children=${exclude_children}` : ''}`;
  code += `${normalize_whitespace ? `${robot_indent}normalize_whitespace=${normalize_whitespace}` : ''}`;
  code += `${sort_children ? `${robot_indent}sort_children=${sort_children}` : ''}`;
  code += '\n';
  return code;
};

// XML: Elements Should Match
Blockly.Blocks['rb_xml_elements_should_match'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Elements Should Match");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("expected_container")
      .appendField("expected：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("exclude_children：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "exclude_children_arg")

      .appendField("normalize_whitespace：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "normalize_whitespace_arg")

      .appendField("sort_children：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "sort_children_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Elements Should Match");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Elements%20Should%20Match");
  }  
};

pythonGenerator.forBlock['rb_xml_elements_should_match'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let expected = pythonGenerator.valueToCode(block, 'expected_container', pythonGenerator.ORDER_ATOMIC) || '';
  expected = robotFormate(expected, '|', default_indent)

  let exclude_children = block.getFieldValue('exclude_children_arg') || '';
  let normalize_whitespace = block.getFieldValue('normalize_whitespace_arg') || '';
  let sort_children = block.getFieldValue('sort_children_arg') || '';

  let code = `Elements Should Match`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${expected ? `${robot_indent}${expected}` : ''}`;
  code += `${exclude_children ? `${robot_indent}exclude_children=${exclude_children}` : ''}`;
  code += `${normalize_whitespace ? `${robot_indent}normalize_whitespace=${normalize_whitespace}` : ''}`;
  code += `${sort_children ? `${robot_indent}sort_children=${sort_children}` : ''}`;
  code += '\n';
  return code;
};

// XML: Element Should Not Have Attribute
Blockly.Blocks['rb_xml_element_should_not_have_attribute'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Element Should Not Have Attribute");

    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("name_container")
      .appendField("name：")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendValueInput("message_container")
      .appendField("message：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Element Should Not Have Attribute");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Element%20Should%20Not%20Have%20Attribute");
  }  
};

pythonGenerator.forBlock['rb_xml_element_should_not_have_attribute'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message_container', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Element Should Not Have Attribute`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${message ? `${robot_indent}message=${message}` : ''}`;
  code += '\n';
  return code;
};