import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const rb_indent = '    ';
const rb_keyword_color = 200;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// RB: Keywords Group Block
Blockly.Blocks['rb_fw_Keywords'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Keywords')
      .appendField("*** Keywords ***")

    this.appendStatementInput("Keywords")
      .setCheck(null)
    
    this.setPreviousStatement(true, ['rb_fw_Keywords'])
    this.setColour(rb_keyword_color)
    this.setTooltip("Create robotframework Keywords Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_Keywords'] = function(block) {
  var keywords_content = pythonGenerator.statementToCode(block, 'Keywords') || '';
  var code = `*** Keywords ***
${keywords_content}`;
  
  return code;  
}

// RB: KeyWord Function Block
Blockly.Blocks['rb_keyword_function'] = {
  init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("KeyWord Function Name"), "keyword_name");
      this.appendStatementInput("keyword_content")
          .setCheck(null);
      
      this.setPreviousStatement(true, ['rb_fw_Keywords','rb_keyword_function']);
      this.setNextStatement(true, ['rb_keyword_function']);
      this.setInputsInline(true);
      this.setColour(rb_keyword_color);
      this.setTooltip("Create a keyword function");
      this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_keyword_function'] = function (block) {
  var keyword_name = block.getFieldValue('keyword_name');
  
  // 設定縮排為4個空格
  pythonGenerator.INDENT = rb_indent;
  // 生成內容（現在會自動加入縮排）
  var statements_content = pythonGenerator.statementToCode(block, 'keyword_content') || '';
  // 還原原本的縮排設定
  pythonGenerator.INDENT = default_indent;
  
  var code = `${keyword_name}\n${statements_content}\n`;
  return code;
};

// RB: KeyWord Function Arguments Container Block 
Blockly.Blocks['rb_keyword_function_arg_container'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("[Arguments]")
  
    this.appendValueInput("add_args")
        .appendField("  ")
        .setCheck("Variable") 
    
    this.setPreviousStatement(true, ['rb_variable_setVariable']);
    this.setNextStatement(true, ['rb_variable_setVariable']);
    this.setInputsInline(true);
    this.setColour(rb_keyword_color);
    this.setTooltip("Setting Variables");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_keyword_function_arg_container'] = function(block) {
    var variable_value = pythonGenerator.valueToCode(block, 'add_args', pythonGenerator.ORDER_ATOMIC) || '';
    
    // Format: ${variable_name}    value
    var code = `${variable_value ? `[Arguments]${rb_indent}${variable_value}` : ''}\n`;
    return code;
};

// RB: KeyWord Function Arguments Block 
// https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-696
Blockly.Blocks['rb_keyword_function_arg_container'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["Arguments", "Arguments"],
          ["Documentation", "Documentation"],
          ["Tags", "Tags"],
          ["Setup", "Setup"],
          ["Teardown", "Teardown"],
          ["Timeout", "Timeout"],
          ["Return", "Return"],
        ]), "variable_type")
  
    this.appendValueInput("add_args")
        .appendField("  ")
        .setCheck("Variable") 
    
    this.setPreviousStatement(true, ['rb_variable_setVariable']);
    this.setNextStatement(true, ['rb_variable_setVariable']);
    this.setInputsInline(true);
    this.setColour(rb_keyword_color);
    this.setTooltip("Setting Variables");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_keyword_function_arg_container'] = function(block) {
    var variable_value = pythonGenerator.valueToCode(block, 'add_args', pythonGenerator.ORDER_ATOMIC) || '';
    
    // Format: ${variable_name}    value
    var code = `${variable_value ? `[Arguments]${rb_indent}${variable_value}` : ''}\n`;
    return code;
};