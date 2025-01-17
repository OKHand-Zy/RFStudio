import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const block_color = 150;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// RB: TestCases Group Block
Blockly.Blocks['rb_fw_TestCases'] = {
  init: function () {
    this.appendDummyInput('rb_fw_TestCases')
      .appendField("*** TestCases ***")

    this.appendStatementInput("TestCases")
      .setCheck(['rb_fw_TestCases'])
    
    this.setPreviousStatement(true, ['rb_fw_TestCases'])
    this.setNextStatement(true, ['rb_fw_Keywords'])
    this.setColour(block_color)
    this.setTooltip("Create robotframework TestCases Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_TestCases'] = function(block) {
  const testcases_content = pythonGenerator.statementToCode(block, 'TestCases') || '';
  let code = `*** TestCases ***
${testcases_content}`;
  
  return code;  
}

// RB: TestCase Function Block
Blockly.Blocks['rb_testcase_function'] = {
  init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("TestCase Function Name"), "testcase_name");
      this.appendStatementInput("testcase_content")
          .setCheck(null);
      
      this.setPreviousStatement(true, ['rb_fw_TestCases','rb_testcase_function']);
      this.setNextStatement(true, ['rb_testcase_function']);
      this.setInputsInline(true);
      this.setColour(block_color);
      this.setTooltip("Create a TestCase function");
      this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_testcase_function'] = function (block) {
  const testcase_name = block.getFieldValue('testcase_name');
  pythonGenerator.INDENT = robot_indent;
  const statements_content = pythonGenerator.statementToCode(block, 'testcase_content') || '';
  pythonGenerator.INDENT = default_indent;
  let code = `${testcase_name}\n${statements_content}\n`;
  return code;
};

// RB: TestCase section Block
Blockly.Blocks['rb_testcase_section_container'] = {
  init: function() {
    this.appendDummyInput("section")
      .appendField(new Blockly.FieldDropdown([
        ["Documentation", "Documentation"],
        ["Tags", "Tags"],
        ["Setup", "Setup"],
        ["Teardown", "Teardown"],
        ["Template", "Template"],
        ["Timeout", "Timeout"],
      ]), "section_type")
      .appendField(new Blockly.FieldTextInput("Content"), "content")
      
    this.appendValueInput("args")
        .appendField("  ")
        .setCheck("Variable") 
    
    this.setPreviousStatement(true, ['rb_fw_TestCases', 'rb_testcase_function', 'rb_testcase_section_container']);
    this.setNextStatement(true, ['rb_testcase_function', 'rb_testcase_section_container']);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting section");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_testcase_section_container'] = function(block) {
  const section_type = block.getFieldValue('section_type');
  const content = block.getFieldValue('content');
  const resource_args = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';
  let code = `${section_type}${robot_indent}${content}${resource_args ? `${robot_indent}${resource_args}` : ''}\n`;
  return code;
};

// RB: TestCase Assign Variables Block
Blockly.Blocks['rb_testcase_assign_variables'] = {
  init: function() {
    this.appendValueInput("variables")

    this.appendDummyInput()
        .appendField("=");

    this.appendValueInput("verified")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting section");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_testcase_assign_variables'] = function(block) {
  const value_variables = pythonGenerator.valueToCode(block, 'variables', pythonGenerator.ORDER_ATOMIC) || '';
  const value_verified = pythonGenerator.valueToCode(block, 'verified', pythonGenerator.ORDER_ATOMIC) || '';
  pythonGenerator.INDENT = default_indent;  
  let code = `${value_variables} =${value_verified}\n`;
  pythonGenerator.INDENT = robot_indent;
  
  return code;
}

// RB: TestCase Var Block (Support RBF>=7.0)
Blockly.Blocks['rb_testcase_var'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("VAR  ")
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
    
      this.appendDummyInput()
        .appendField("scope=")
        .appendField(
          new Blockly.FieldDropdown([
            ["LOCAL", ""],
            ["TEST", "TEST"],
            ["SUITE", "SUITE"],
            ["SUITES", "SUITES"],
            ["GLOBAL", "GLOBAL"],
          ]), "scope_type")

    this.setPreviousStatement(true, ['rb_variable_setVariable']);
    this.setNextStatement(true, ['rb_variable_setVariable']);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting Variables");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_testcase_var'] = function(block) {
    const variable_type = block.getFieldValue('variable_type');
    const variable_name = block.getFieldValue('variable_name');
    const variable_value = pythonGenerator.valueToCode(block, 'add_variable', pythonGenerator.ORDER_ATOMIC) || '';
    const scope_type = block.getFieldValue('scope_type');
    let code = `VAR${robot_indent}${variable_type}{${variable_name}}${variable_value}${scope_type ? `${robot_indent}scope=${scope_type}` : ''}\n`;
    return code;
};