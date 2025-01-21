import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
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
                ["Env_Variable", "%"],
            ]), "variable_type")
        .appendField("{")
        .appendField(new Blockly.FieldTextInput("variable"), "variable")
        .appendField("}");

    this.setOutput(true, 'Variable'); 
    this.setColour(block_color);
    this.setTooltip("Setting Variables args");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_cm_variable'] = function(block) {
  var variable_type = block.getFieldValue('variable_type') || '$';
  var variable = block.getFieldValue('variable') || '';
  var value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  var code = '';

  code = `${split_mark}${variable_type}{${variable.trim()}}${value_input}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: index
Blockly.Blocks['rb_cm_index'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField("[")
      .appendField(new Blockly.FieldTextInput("Index"), "Index")
      .appendField("]")
      .setCheck("Variable")
        
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input Index");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_cm_index'] = function(block) {
  const Index = block.getFieldValue('Index');
  const connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  let code = '';
  code = `[${Index}]${connected_value}`;
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: content
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
  const text_content = block.getFieldValue('CONTENT');
  const connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  let code = '';

  code = `${split_mark}${text_content}${connected_value}`;
  
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
  const day = block.getFieldValue('day');
  const month = block.getFieldValue('month');
  const year = block.getFieldValue('year');
  const container_code = pythonGenerator.valueToCode(block, 'bh_container_code', pythonGenerator.ORDER_ATOMIC) || '';

  let code = `${day}.${month}.${year}${container_code}`;

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
Blockly.Blocks['rb_cm_custom_links'] = {
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
  const code = `[${custom_links}|${custom_content}]${bh_container_code}`;
  return [code, pythonGenerator.ORDER_ATOMIC];
}



// Operating-system variables
Blockly.Blocks['rb_cm_operating_system'] = {
  init: function() {
    this.appendValueInput("Variable")  // Named input for potential connections
        .appendField(
            new Blockly.FieldDropdown([
                ["CURDIR", "${CURDIR}"],
                ["TEMPDIR", "${TEMPDIR}"],
                ["EXECDIR", "${EXECDIR}"],
                ["/", "${/}"], [":", "${:}"], ["\\n", "${\\n}"]
            ]), "operating_system_command")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting Operating-system variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-337");
  }
}
pythonGenerator.forBlock['rb_cm_operating_system'] = function(block) {
  const operating_system_command = block.getFieldValue('operating_system_command') || '';
  const value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  let code = operating_system_command + value_input;

  return [code, pythonGenerator.ORDER_ATOMIC];
}

// EMPTY
Blockly.Blocks['rb_cm_empty'] = {
  init: function() {
    this.appendValueInput("Variable")
      .appendField(
        new Blockly.FieldDropdown([
          ["List", "@"],
          ["Dict", "&"],
      ]), "empty_type")
      .appendField("EMPTY")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting EMPTY variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-340");
  }
}

pythonGenerator.forBlock['rb_cm_empty'] = function(block) {
  const empty_type = block.getFieldValue('empty_type') || '';
  const value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  let code = empty_type+ `{EMPTY}` + value_input;

  return [code, pythonGenerator.ORDER_ATOMIC];
}

// Automatic variables Block
Blockly.Blocks['rb_cm_automatic_variables'] = {
  init: function() {
    this.appendValueInput("Variable") 
        .appendField(
            new Blockly.FieldDropdown([
              ["TEST NAME", "${TEST NAME}"],
              ["TEST TAGS", "@{TEST TAGS}"],
              ["TEST DOCUMENTATION", "${TEST DOCUMENTATION}"],
              ["TEST STATUS", "${TEST STATUS}"],
              ["TEST MESSAGE", "${TEST MESSAGE}"],
              ["PREV TEST NAME", "${PREV TEST NAME}"],
              ["PREV TEST STATUS", "${PREV TEST STATUS}"],
              ["PREV TEST MESSAGE", "${PREV TEST MESSAGE}"],
              ["SUITE NAME", "${SUITE NAME}"],
              ["SUITE SOURCE", "${SUITE SOURCE}"],
              ["SUITE DOCUMENTATION", "${SUITE DOCUMENTATION}"],
              ["SUITE METADATA", "&{SUITE METADATA}"],
              ["SUITE STATUS", "${SUITE STATUS}"],
              ["SUITE MESSAGE", "${SUITE MESSAGE}"],
              ["KEYWORD STATUS","${KEYWORD STATUS}"],
              ["KEYWORD MESSAGE", "${KEYWORD MESSAGE}"],
              ["LOG LEVEL", "${LOG LEVEL}"],
              ["OUTPUT DIR", "${OUTPUT DIR}"],
              ["OUTPUT FILE", "${OUTPUT FILE}"],
              ["LOG FILE", "${LOG FILE}"],
              ["REPORT FILE","${REPORT FILE}"],
              ["DEBUG FILE","${DEBUG FILE}"],
              ["OPTIONS", "&{OPTIONS}"]
            ]), "automatic_variables")
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting Operating-system variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-341");
  }
}
pythonGenerator.forBlock['rb_cm_automatic_variables'] = function(block) {
  const automatic_variables = block.getFieldValue('automatic_variables') || '';
  const value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  let code = automatic_variables + value_input;

  return [code, pythonGenerator.ORDER_ATOMIC];
}

