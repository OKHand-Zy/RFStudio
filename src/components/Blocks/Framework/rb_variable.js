import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const rb_indent = '    ';
const rb_variable_color = 100;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// RB: Variables Group Block
Blockly.Blocks['rb_fw_Variables'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Variables')
      .appendField("*** Variables ***")

    this.appendStatementInput("Variables")
      .setCheck(['rb_variable_setVariable','rb_variable_content'])
    
    this.setPreviousStatement(true, ['rb_fw_Variables'])
    this.setNextStatement(true, ['rb_fw_TestCases'])
    this.setColour(rb_variable_color)
    this.setTooltip("Create robotframework Variables Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_Variables'] = function(block) {
  var variables_content = pythonGenerator.statementToCode(block, 'Variables') || '';
  var code = `*** Variables ***
${variables_content}`;
  
  return code;  
}

// RB: Setting Variable Block
Blockly.Blocks['rb_variable_setVariable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown([
                ["Variable", "$"],
                ["List", "@"],
                ["Dict", "&"],
            ]), "variable_type")
        .appendField(new Blockly.FieldTextInput("Variable_Name"), "variable_name");
        
    this.appendValueInput("add_variable")
        .appendField("=")
        .setCheck("Variable") 
    
    this.setPreviousStatement(true, ['rb_variable_setVariable']);
    this.setNextStatement(true, ['rb_variable_setVariable']);
    this.setInputsInline(true);
    this.setColour(rb_variable_color);
    this.setTooltip("Setting Variables");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_variable_setVariable'] = function(block) {
    var variable_type = block.getFieldValue('variable_type');
    var variable_name = block.getFieldValue('variable_name');
    var variable_value = pythonGenerator.valueToCode(block, 'add_variable', pythonGenerator.ORDER_ATOMIC) || '';
    
    // Format: ${variable_name}    value
    var code = `${variable_type}{${variable_name}}${variable_value ? `${rb_indent}${variable_value}` : ''}\n`;
    return code;
};

// RB: Setting Type Variable arg Block
Blockly.Blocks['rb_type_variable_arg'] = {
  init: function() {
    // Create a value input instead of dummy input
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
    this.setColour(rb_variable_color);
    this.setTooltip("Setting Variables args");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_type_variable_arg'] = function(block) {
  var variable_type = block.getFieldValue('variable_type') || '$';
  var variable_args = block.getFieldValue('args') || '';
  var value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  var code = '';

  if (value_input) {
    code = `${variable_type}{${variable_args.trim()}}${rb_indent}${value_input}`;
  } else {
    code = `${variable_type}{${variable_args.trim()}}`;
  }

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// RB: Setting Variable Content Block
Blockly.Blocks['rb_variable_content'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField(new Blockly.FieldTextInput("Content"), "CONTENT")
      .setCheck("Variable")
        
    this.setOutput(true, "Variable");  
    this.setColour(rb_variable_color);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_variable_content'] = function(block) {
  var text_content = block.getFieldValue('CONTENT');
  var connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  var code = '';
  if (connected_value) {
    code = `${text_content}${rb_indent}${connected_value}`;
  } else {
    code = `${text_content}`;
  }
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};