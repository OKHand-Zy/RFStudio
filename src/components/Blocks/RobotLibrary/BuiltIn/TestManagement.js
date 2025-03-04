import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import {PythonGenerator, pythonGenerator} from 'blockly/python';

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

// BuiltIn: Remove Tags
Blockly.Blocks['rb_builtin_remove_tags'] = {
  init: function() {
    this.appendValueInput("tags_container")
      .appendField("Remove Tags")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Remove Tags");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Remove%20Tags");
  }
};

pythonGenerator.forBlock['rb_builtin_remove_tags'] = function(block) {
  let tags = pythonGenerator.valueToCode(block, 'tags_container', pythonGenerator.ORDER_ATOMIC) || '';
  tags = robotFormate(tags, '|', '  ');
  let code = `Remove Tags${robot_indent}${tags}\n`;

  return code;
};

// BuiltIn: Set Suite Documentation
Blockly.Blocks['rb_builtin_set_suite_documentation'] = {
  init: function() {
    this.appendValueInput("doc_container")
      .appendField("Set Suite Documentation ")
      .setCheck(null)
    
    this.appendDummyInput("append_container")
      .appendField("append= ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "append_arg")
    
    this.appendDummyInput("top_container")
      .appendField("top= ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["Flase", "False"],
        ["True", "True"],
      ]), "top_arg")
    
    this.appendDummyInput("separator_container")
      .appendField("separator= ")
      .appendField(new Blockly.FieldTextInput("\\ \\"), "separator_arg")

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Suite Documentation");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Suite%20Documentation");
  }
};

pythonGenerator.forBlock['rb_builtin_set_suite_documentation'] = function(block) {
  let doc = pythonGenerator.valueToCode(block, 'doc_container', pythonGenerator.ORDER_ATOMIC) || '';
  doc = robotFormate(doc, '|', robot_indent)

  let append = block.getFieldValue('append_arg') || '';
  let top = block.getFieldValue('top_arg') || '';
  
  let separator = pythonGenerator.valueToCode(block, 'separator_container', pythonGenerator.ORDER_ATOMIC) || '';
  if (separator == '\\ \\') {
    separator = '';
  }

  let code = `Set Suite Documentation`;
  code += `${doc ? `${robot_indent}${doc}`:``}`
  code += `${append ? `${robot_indent}append=${append}`:``}`
  code += `${top ? `${robot_indent}top=${top}`:``}`
  code += `${separator ? `${robot_indent}separator=${separator}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Set Suite Metadata
Blockly.Blocks['rb_builtin_set_suite_metadata'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Set Suite Metadata ")

    this.appendValueInput("name_container")
      .appendField("name = ")
      .setCheck(null)
    
    this.appendValueInput("value_container")
      .appendField("value = ")
      .setCheck(null)
    
    this.appendDummyInput("append_container")
      .appendField("append = ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "append_arg")
    
    this.appendDummyInput("top_container")
      .appendField("top = ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "top_arg")
    
    this.appendDummyInput("separator_container")
      .appendField("separator = ")
      .appendField(new Blockly.FieldTextInput("\\ \\"), "separator_arg")

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Suite Metadata");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Suite%20Metadata");
  }
};

pythonGenerator.forBlock['rb_builtin_set_suite_metadata'] = function(block) {
  let name = pythonGenerator.valueToCode(block, 'name_container', pythonGenerator.ORDER_ATOMIC) || '';
  name = robotFormate(name, '|', robot_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)

  let append = block.getFieldValue('append_arg') || '';
  let top = block.getFieldValue('top_arg') || '';
  
  let separator = pythonGenerator.valueToCode(block, 'separator_container', pythonGenerator.ORDER_ATOMIC) || '';
  if (separator == '\\ \\') {
    separator = '';
  }

  let code = `Set Suite Metadata`;
  code += `${name ? `${robot_indent}${name}`:``}`
  code += `${value ? `${robot_indent}${value}`:``}`
  code += `${append ? `${robot_indent}append=${append}`:``}`
  code += `${top ? `${robot_indent}top=${top}`:``}`
  code += `${separator ? `${robot_indent}separator=${separator}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Set Tags
Blockly.Blocks['rb_builtin_set_tags'] = {
  init: function() {
    this.appendValueInput("tags_container")
      .appendField("Set Tags ")
      .setCheck(null)

      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(block_color);
      this.setTooltip("BuiltIn: Set Tags");
      this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Tags");
  }
};

pythonGenerator.forBlock['rb_builtin_set_tags'] = function(block) {
  let tags = pythonGenerator.valueToCode(block, 'tags_container', pythonGenerator.ORDER_ATOMIC) || '';
  tags = robotFormate(tags, '|', robot_indent)
  let code = `Set Tags${robot_indent}${tags}\n`;

  return code;
};

// BuiltIn: Set Test Documentation
Blockly.Blocks['rb_builtin_set_test_documentation'] = {
  init: function() {
    this.appendValueInput("doc_container")
      .appendField("Set Suite Documentation ")
      .setCheck(null)
    
    this.appendDummyInput("append_container")
      .appendField("append= ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "append_arg")
    
    this.appendDummyInput("separator_container")
      .appendField("separator= ")
      .appendField(new Blockly.FieldTextInput("\\ \\"), "separator_arg")

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Test Documentation");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Test%20Documentation");
  }
};

pythonGenerator.forBlock['rb_builtin_set_test_documentation'] = function(block) {
  let doc = pythonGenerator.valueToCode(block, 'doc_container', pythonGenerator.ORDER_ATOMIC) || '';
  doc = robotFormate(doc, '|', robot_indent)

  let append = block.getFieldValue('append_arg') || '';
  
  let separator = pythonGenerator.valueToCode(block, 'separator_container', pythonGenerator.ORDER_ATOMIC) || '';
  if (separator == '\\ \\') {
    separator = '';
  }

  let code = `Set Test Documentation`;
  code += `${doc ? `${robot_indent}${doc}`:``}`
  code += `${append ? `${robot_indent}append=${append}`:``}`
  code += `${top ? `${robot_indent}top=${top}`:``}`
  code += `${separator ? `${robot_indent}separator=${separator}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Set Test Message
Blockly.Blocks['rb_builtin_set_test_message'] = {
  init: function() {
    this.appendValueInput("msg_container")
      .appendField("Set Test Message ")
      .setCheck(null)
    
    this.appendDummyInput("append_container")
      .appendField("append= ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "append_arg")
    
    this.appendDummyInput("separator_container")
      .appendField("separator= ")
      .appendField(new Blockly.FieldTextInput("\\ \\"), "separator_arg")

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Test Message");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Test%20Message");
  }
};

pythonGenerator.forBlock['rb_builtin_set_test_message'] = function(block) {
  let msg = pythonGenerator.valueToCode(block, 'msg_container', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', robot_indent)

  let append = block.getFieldValue('append_arg') || '';
  
  let separator = pythonGenerator.valueToCode(block, 'separator_container', pythonGenerator.ORDER_ATOMIC) || '';
  if (separator == '\\ \\') {
    separator = '';
  }

  let code = `Set Test Documentation`;
  code += `${msg ? `${robot_indent}${msg}`:``}`
  code += `${append ? `${robot_indent}append=${append}`:``}`
  code += `${top ? `${robot_indent}top=${top}`:``}`
  code += `${separator ? `${robot_indent}separator=${separator}`:``}`
  code += '\n'
  return code;
};

