import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const rb_indent = '    ';

pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

const Order = {
    ATOMIC: 0,
};

// RB: Robot_Init Block
Blockly.Blocks['Robot_framework'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("*** Settings ***");
        this.appendStatementInput("Settings")
            .setCheck(null)
            
        this.appendDummyInput()
            .appendField("*** Variables ***");
        this.appendStatementInput("Variables")
            .setCheck(null);
        
        this.appendDummyInput()
            .appendField("*** Test Cases ***");
        this.appendStatementInput("TestCases")
            .setCheck(null);

        this.appendDummyInput()
            .appendField("*** Keywords ***");
        this.appendStatementInput("Keywords")
            .setCheck(null);

        this.setInputsInline(true);
        this.setColour(200);
        this.setTooltip("Create robotframework function");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['Robot_framework'] = function(block) {
  let import_Library = '';
  const workspace = block.workspace;
  // 檢查工作區是否包含 BuiltIn 的 Blocks
  const hasBuiltInBlocks = workspace.getAllBlocks().some(block => 
    ['sleep', 'Get_Time'].includes(block.type)
  );

  import_Library += hasBuiltInBlocks ? `Library${rb_indent}BuiltIn\n` : '';
  
  var settings_content = import_Library + (pythonGenerator.statementToCode(block, 'Settings') || '');
  var variables_content = pythonGenerator.statementToCode(block, 'Variables') || '';
  var testcases_content = pythonGenerator.statementToCode(block, 'TestCases') || '';
  var keywords_content = pythonGenerator.statementToCode(block, 'Keywords') || '';
    
  var code = `*** Settings ***
${settings_content}
*** Variables ***
${variables_content}
*** Test Cases ***
${testcases_content}
*** Keywords ***
${keywords_content}`;
    return code;
};

// RB: Setting imprt Block
Blockly.Blocks['setting_import'] = {
  init: function() {
    this.appendValueInput("import_file")
      .appendField(new Blockly.FieldDropdown([
        ["Library", "Library"],
        ["Documentation", "Documentation"],
        ["Resource", "Resource"],
      ]), "import_type");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("Setting Import Something");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['setting_import'] = function(block) {
    var import_type = block.getFieldValue('import_type');
    var import_file = pythonGenerator.valueToCode(block, 'import_file', pythonGenerator.ORDER_ATOMIC);
    var code = `${import_type}${rb_indent}${import_file ? `${import_file}` : ''}\n`;
    return code;
};

// RB: Variable Block
Blockly.Blocks['variable_set'] = {
  init: function() {
    this.appendValueInput("add_variable")
      .appendField(
        new Blockly.FieldDropdown([
          ["Variable", "$"],
          ["List", "@"],
          ["Dict", "&"],
        ]), "variable_type");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("Setting Variables");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['variable_set'] = function(block) {
    var variable_type = block.getFieldValue('variable_type');
    var variables = pythonGenerator.valueToCode(block, 'add_variable', pythonGenerator.ORDER_ATOMIC);
    // 將變數名稱包在 {} 中，並保持其餘部分不變
    var variableName = variables.split(rb_indent)[0];
    var variableValue = variables.split(rb_indent).slice(1).join(rb_indent) || '';
    var code = `${variable_type}{${variableName}}${variableValue ? `    ${variableValue}` : ''}\n`;
    return code;
};

// RB: Function Block
Blockly.Blocks['Function_block'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Keyword Function Name"), "function_name");
        this.appendStatementInput("function_content")
            .setCheck(null);
        
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour(315);
        this.setTooltip("Create a keyword function");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['Function_block'] = function (block) {
    var function_name = block.getFieldValue('function_name');
    
    // 設定縮排為4個空格
    pythonGenerator.INDENT = rb_indent;
    // 生成內容（現在會自動加入縮排）
    var statements_content = pythonGenerator.statementToCode(block, 'function_content') || '';
    // 還原原本的縮排設定
    pythonGenerator.INDENT = default_indent;
    
    var code = `${function_name}\n${statements_content}\n`;
    return code;
};
