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

// XML: Add Element
Blockly.Blocks['rb_xml_add_element'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Add Element");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("element_container")
      .setCheck("Variable");

    this.appendValueInput("index_container")
      .appendField("index：")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Add Element");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Add%20Element");
  }
};

pythonGenerator.forBlock['rb_xml_add_element'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let element = pythonGenerator.valueToCode(block, 'element_container', pythonGenerator.ORDER_ATOMIC) || '';
  element = robotFormate(element, '|', default_indent)

  let index = pythonGenerator.valueToCode(block, 'index_container', pythonGenerator.ORDER_ATOMIC) || '';
  index = robotFormate(index, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Add Element`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${element ? `${robot_indent}${element}` : ''}`;
  code += `${index ? `${robot_indent}index=${index}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return code;
};

// XML: Remove Element
Blockly.Blocks['rb_xml_remove_element'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove Element");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("remove_tail：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "remove_tail_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Remove Element");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Remove%20Element");
  }  
};

pythonGenerator.forBlock['rb_xml_remove_element'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let remove_tail_arg = block.getFieldValue('remove_tail_arg') || '';

  let code = `Remove Element`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${remove_tail_arg ? `${robot_indent}remove_tail=${remove_tail_arg}` : ''}`;
  code += '\n';
  return code;
};

// XML: Remove Elements
Blockly.Blocks['rb_xml_remove_elements'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove Elements");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("remove_tail：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "remove_tail_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Remove Elements");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Remove%20Elements");
  }  
};

pythonGenerator.forBlock['rb_xml_remove_elements'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let remove_tail_arg = block.getFieldValue('remove_tail_arg') || '';

  let code = `Remove Elements`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${remove_tail_arg ? `${robot_indent}remove_tail=${remove_tail_arg}` : ''}`;
  code += '\n';
  return code;
};

// XML: Remove Element Attribute
Blockly.Blocks['rb_xml_remove_element_attribute'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove Element Attribute");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("name_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Remove Element Attribute");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Remove%20Element%20Attribute");
  }  
};

pythonGenerator.forBlock['rb_xml_remove_element_attribute'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Remove Element Attribute`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return code;
};

// XML: Remove Elements Attribute
Blockly.Blocks['rb_xml_remove_elements_attribute'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove Elements Attribute");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("name_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Remove Elements Attribute");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Remove%20Elements%20Attribute");
  }  
};

pythonGenerator.forBlock['rb_xml_remove_elements_attribute'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Remove Elements Attribute`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return code;
};

// XML: Remove Element Attributes
Blockly.Blocks['rb_xml_remove_element_attributes'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove Element Attributes");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Remove Element Attributes");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Remove%20Element%20Attributes");
  }  
};

pythonGenerator.forBlock['rb_xml_remove_element_attributes'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Remove Element Attributes`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return code;
};

// XML: Remove Elements Attributes
Blockly.Blocks['rb_xml_remove_elements_attributes'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove Elements Attributes");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Remove Elements Attributes");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Remove%20Elements%20Attributes");
  }  
};

pythonGenerator.forBlock['rb_xml_remove_elements_attributes'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Remove Elements Attributes`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return code;
};

// XML: Clear Element
Blockly.Blocks['rb_xml_clear_element'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Clear Element");
    
    this.appendValueInput("source_container")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("clear_tail：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "remove_tail_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Clear Element");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Clear%20Element");
  }  
};

pythonGenerator.forBlock['rb_xml_clear_element'] = function(block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let clear_tail_arg = block.getFieldValue('remove_tail_arg') || '';

  let code = `Clear Element`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += `${clear_tail_arg ? `${robot_indent}clear_tail=${clear_tail_arg}` : ''}`;
  code += '\n';
  return code;
};