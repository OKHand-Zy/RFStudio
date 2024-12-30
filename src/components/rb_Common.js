import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

const Order = {
    ATOMIC: 0,
};

const rb_space = '    ';

// RB: Robot_Init Block
Blockly.Blocks['Robot_Init'] = {
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

pythonGenerator.forBlock['Robot_Init'] = function(block) {
    var settings_content = pythonGenerator.statementToCode(block, 'Settings') || pythonGenerator.INDENT + '';
    var variables_content = pythonGenerator.statementToCode(block, 'Variables') || pythonGenerator.INDENT + '';
    var testcases_content = pythonGenerator.statementToCode(block, 'TestCases') || pythonGenerator.INDENT + '';
    var keywords_content = pythonGenerator.statementToCode(block, 'Keywords') || pythonGenerator.INDENT + '';
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
        `\${${text_name}}${rb_space}${text_value}\n` : `\${${text_name}}\n`;
        
    return code;
};

// RB: Keyword Function Block
Blockly.Blocks['Keyword_function'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Keyword Function Name"), "Name");
        this.appendStatementInput("Content")
            .setCheck(null);
        
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour(315);
        this.setTooltip("Create a keyword function");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['Keyword_function'] = function (block) {
    var text_name = block.getFieldValue('Name');
    var statements_content = pythonGenerator.statementToCode(block, 'Content') || pythonGenerator.INDENT + '';
    var code = `${text_name}\n${statements_content}\n`;
    return code;
};
