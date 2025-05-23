import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
const block_color = 100;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// RB: Variables Group Block
Blockly.Blocks['rb_fw_Variables'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Variables')
      .appendField("*** Variables ***")

    this.appendStatementInput("Variables")
      .setCheck(['rb_variable_setVariable','rb_variable_content'])
    
    this.setPreviousStatement(true, ['rb_fw_Variables'])
    this.setNextStatement(true, ['rb_fw_TestCases'])
    this.setColour(block_color)
    this.setTooltip("Create robotframework Variables Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_Variables'] = function(block) {
  const variables_content = pythonGenerator.statementToCode(block, 'Variables') || '';
  let code = `*** Variables ***
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
    this.setColour(block_color);
    this.setTooltip("Setting Variables");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_variable_setVariable'] = function(block) {
    const variable_type = block.getFieldValue('variable_type');
    const variable_name = block.getFieldValue('variable_name');
    const variable_value = pythonGenerator.valueToCode(block, 'add_variable', pythonGenerator.ORDER_ATOMIC) || '';

    let code = `${variable_type}{${variable_name}}${variable_value}\n`;
    return code;
};