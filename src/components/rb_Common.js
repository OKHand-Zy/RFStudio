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
            .setCheck(null);
            
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
        this.setColour(315);
        this.setTooltip("Create robotframework function");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['Robot_framework'] = function(block) {
    // 檢查工作區是否包含 sleep, Get_Time 區塊
    const workspace = block.workspace;
    const hasBuiltInBlocks = workspace.getAllBlocks().some(block => 
        ['sleep', 'Get_Time'].includes(block.type)
    );
    
    // 只有在有 BuiltIn 相關區塊時才添加 Library 導入
    const defaultSettings = hasBuiltInBlocks ? `Library${rb_indent}BuiltIn\n` : '';
    
    var settings_content = defaultSettings + (pythonGenerator.statementToCode(block, 'Settings') || '');
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

// RB: Variable Block
Blockly.Blocks['variable_block'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Variable Name"), "Name");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Valume"), "Value");
        
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour(315);
        this.setTooltip("Create a Variable with arguments");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['variable_block'] = function (block) {
    var text_name = block.getFieldValue('Name');
    var text_value = block.getFieldValue('Value');
    
    // 產生 Robot Framework 變數格式 (例如: ${BROWSER}  chrome)
    var code = text_value ? 
        `\${${text_name}}${rb_indent}${text_value}\n` : `\${${text_name}}\n`;
        
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
