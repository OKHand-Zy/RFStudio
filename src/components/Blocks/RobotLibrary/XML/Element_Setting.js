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

// XML: Set Element Text
Blockly.Blocks['rb_xml_set_element_text'] = {
  init: function () {
    this.appendDummyInput("title")
      .appendField('Set Element Text');

    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("text_container")
      .appendField("text：")
      .setCheck("Variable");
    
    this.appendValueInput("tail_container")
      .appendField("tail：")
      .setCheck("Variable");
    
    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Set Element Text");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Set%20Element%20Text");
  }
};

pythonGenerator.forBlock['rb_xml_set_element_text'] = function (block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let text = pythonGenerator.valueToCode(block, 'text_container', pythonGenerator.ORDER_ATOMIC) || '';
  text = robotFormate(text, '|', default_indent)

  let tail = pythonGenerator.valueToCode(block, 'tail_container', pythonGenerator.ORDER_ATOMIC) || '';
  tail = robotFormate(tail, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Set Element Text`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${text ? `${robot_indent}${text}` : ''}`;
  code += `${tail ? `${robot_indent}tail=${tail}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Set Elements Text
Blockly.Blocks['rb_xml_set_elements_text'] = {
  init: function () {
    this.appendDummyInput("title")
      .appendField('Set Elements Text');

    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("text_container")
      .appendField("text：")
      .setCheck("Variable");
    
    this.appendValueInput("tail_container")
      .appendField("tail：")
      .setCheck("Variable");

    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Set Elements Text");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Set%20Elements%20Text");
  }
};

pythonGenerator.forBlock['rb_xml_set_elements_text'] = function (block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let text = pythonGenerator.valueToCode(block, 'text_container', pythonGenerator.ORDER_ATOMIC) || '';
  text = robotFormate(text, '|', default_indent)

  let tail = pythonGenerator.valueToCode(block, 'tail_container', pythonGenerator.ORDER_ATOMIC) || '';
  tail = robotFormate(tail, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Set Elements Text`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${text ? `${robot_indent}${text}` : ''}`;
  code += `${tail ? `${robot_indent}tail=${tail}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Set Element Tag
Blockly.Blocks['rb_xml_set_element_tag'] = {
  init: function () {
    this.appendDummyInput("title")
      .appendField('Set Element Tag');

    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("tag_container")
      .appendField("tag：")
      .setCheck("Variable");
    
    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Set Element Tag");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Set%20Element%20Tag");
  }
};

pythonGenerator.forBlock['rb_xml_set_element_tag'] = function (block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let tag = pythonGenerator.valueToCode(block, 'tag_container', pythonGenerator.ORDER_ATOMIC) || '';
  tag = robotFormate(tag, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Set Element Tag`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${tag ? `${robot_indent}${tag}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Set Elements Tag
Blockly.Blocks['rb_xml_set_elements_tag'] = {
  init: function () {
    this.appendDummyInput("title")
      .appendField('Set Elements Tag');

    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("tag_container")
      .appendField("tag：")
      .setCheck("Variable");
    
    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Set Elements Tag");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Set%20Elements%20Tag");
  }
};

pythonGenerator.forBlock['rb_xml_set_elements_tag'] = function (block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let tag = pythonGenerator.valueToCode(block, 'tag_container', pythonGenerator.ORDER_ATOMIC) || '';
  tag = robotFormate(tag, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Set Elements Tag`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${tag ? `${robot_indent}${tag}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Set Element Attribute
Blockly.Blocks['rb_xml_set_element_attribute'] = {
  init: function () {
    this.appendDummyInput("title")
      .appendField('Set Element Attribute');

    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("name_container")
      .appendField("name：")
      .setCheck("Variable");
    
    this.appendValueInput("value_container")
      .appendField("value：")
      .setCheck("Variable");
    
    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Set Element Attribute");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Set%20Element%20Attribute");
  }
};

pythonGenerator.forBlock['rb_xml_set_element_attribute'] = function (block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Set Element Attribute`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// XML: Set Elements Attribute
Blockly.Blocks['rb_xml_set_elements_attribute'] = {
  init: function () {
    this.appendDummyInput("title")
      .appendField('Set Elements Attribute');

    this.appendValueInput("source_container")
      .setCheck("Variable");
    
    this.appendValueInput("name_container")
      .appendField("name：")
      .setCheck("Variable");
    
    this.appendValueInput("value_container")
      .appendField("value：")
      .setCheck("Variable");
    
    this.appendValueInput("xpath_container")
      .appendField("xpath：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("XML: Set Elements Attribute");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/XML.html#Set%20Elements%20Attribute");
  }
};

pythonGenerator.forBlock['rb_xml_set_elements_attribute'] = function (block) {
  let source = pythonGenerator.valueToCode(block, 'source_container', pythonGenerator.ORDER_ATOMIC) || '';
  source = robotFormate(source, '|', default_indent)

  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', default_indent)

  let xpath = pythonGenerator.valueToCode(block, 'xpath_container', pythonGenerator.ORDER_ATOMIC) || '';
  xpath = robotFormate(xpath, '|', default_indent)

  let code = `Set Elements Attribute`;
  code += `${source ? `${robot_indent}${source}` : ''}`;
  code += `${name ? `${robot_indent}${name}` : ''}`;
  code += `${value ? `${robot_indent}${value}` : ''}`;
  code += `${xpath ? `${robot_indent}xpath=${xpath}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

