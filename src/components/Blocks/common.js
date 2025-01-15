import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const block_color = 10;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Common: Variable
Blockly.Blocks['rb_cm_variable'] = {
    init: function() {
      this.appendValueInput("Variable")  // Named input for potential connections
          .appendField(
              new Blockly.FieldDropdown([
                  ["Variable", "$"],
                  ["List", "@"],
                  ["Dict", "&"],
              ]), "variable_type")
          .appendField("{")
          .appendField(new Blockly.FieldTextInput("Arg_Name"), "args")
          .appendField("}");
  
      this.setOutput(true, 'Variable'); 
      this.setColour(block_color);
      this.setTooltip("Setting Variables args");
      this.setHelpUrl("");
    }
  };
  
  pythonGenerator.forBlock['rb_cm_variable'] = function(block) {
    var variable_type = block.getFieldValue('variable_type') || '$';
    var variable_args = block.getFieldValue('args') || '';
    var value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
    var code = '';
  
    if (value_input) {
      code = `${variable_type}{${variable_args.trim()}}${robot_indent}${value_input}`;
    } else {
      code = `${variable_type}{${variable_args.trim()}}`;
    }
  
    return [code, pythonGenerator.ORDER_ATOMIC];
  };
  
Blockly.Blocks['rb_cm_content'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField(new Blockly.FieldTextInput("Content"), "CONTENT")
      .setCheck("Variable")
        
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_cm_content'] = function(block) {
  var text_content = block.getFieldValue('CONTENT');
  var connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  var code = '';
  if (connected_value) {
    code = `${text_content}${robot_indent}${connected_value}`;
  } else {
    code = `${text_content}`;
  }
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Date
Blockly.Blocks['rb_cm_date'] = {
  init: function() {
    this.appendValueInput("bh_container_code")
      .appendField(new Blockly.FieldTextInput("dd"), "day")
      .appendField(".")
      .appendField(new Blockly.FieldTextInput("mm"), "month")
      .appendField(".")
      .appendField(new Blockly.FieldTextInput("yyyy"), "year")
      .setCheck("Variable")
    
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input Date");
    this.setHelpUrl("");
  }
};
pythonGenerator.forBlock['rb_cm_date'] = function(block) {
  var day = block.getFieldValue('day');
  var month = block.getFieldValue('month');
  var year = block.getFieldValue('year');
  var container_code = pythonGenerator.valueToCode(block, 'bh_container_code', pythonGenerator.ORDER_ATOMIC) || '';

  const code = `${day}.${month}.${year}${container_code ? `${robot_indent}${container_code}` : ''}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Documentation Inline Styles
Blockly.Blocks['rb_cm_inline_styles'] = {
  init: function() {
    this.appendValueInput("style_content")
      .appendField("Style=")
      .appendField(
        new Blockly.FieldDropdown([
          ["bold", "bold"],
          ["italic", "italic"],
          ["bold&italic", "bold&italic"],
          ["code", "code"],
        ]), "inline_styles")
      .appendField("Content=")  
      .appendField(new Blockly.FieldTextInput("Content"), "content")
      .setCheck("Documentation")

    this.setOutput(true, 'Documentation');
    this.setColour(block_color);
    this.setTooltip("Setting Variables args");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_cm_inline_styles'] = function(block) {
  const style = block.getFieldValue('inline_styles');
  const content = block.getFieldValue('content');
  const style_content = pythonGenerator.valueToCode(block, 'style_content', pythonGenerator.ORDER_ATOMIC) || '""';
  const styleSymbols = {
    'bold': ['*', '*'],
    'italic': ['_', '_'],
    'bold&italic': ['_*', '*_'],
    'code': ['`', '`']
  };

  const [leftSym, rightSym] = styleSymbols[style] || ['', ''];
  const code = `${leftSym}{${content}}${rightSym}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Custom links and images
Blockly.Blocks['rb_cm_custom_links_content'] = {
  init: function() {
    this.appendValueInput("bh_container_code")
      .appendField("[")
      .appendField(new Blockly.FieldTextInput("Link"), "custom_links")
      .appendField("|")
      .appendField(new Blockly.FieldTextInput("Content"), "custom_content")
      .appendField("]")
    
    this.setOutput(true, 'Documentation');
    this.setColour(block_color);
    this.setTooltip("Setting Custom Links or Images");
    this.setHelpUrl("");
  }
};
pythonGenerator.forBlock['rb_cm_custom_links'] = function(block) {
  const custom_links = block.getFieldValue('custom_links');
  const custom_content = block.getFieldValue('custom_content');
  const bh_container_code = pythonGenerator.valueToCode(block, 'bh_container_code', pythonGenerator.ORDER_ATOMIC) || '""';
  const code = `[${custom_links}|${custom_content}]`;
  return [code, pythonGenerator.ORDER_ATOMIC];
}