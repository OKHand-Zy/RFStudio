import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const rb_indent = '    ';
const rb_testcase_color = 150;
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
    this.setColour(rb_testcase_color)
    this.setTooltip("Create robotframework TestCases Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_TestCases'] = function(block) {
  var testcases_content = pythonGenerator.statementToCode(block, 'TestCases') || '';
  var code = `*** TestCases ***
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
      this.setColour(rb_testcase_color);
      this.setTooltip("Create a TestCase function");
      this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_testcase_function'] = function (block) {
  var testcase_name = block.getFieldValue('testcase_name');
  
  // 設定縮排為4個空格
  pythonGenerator.INDENT = rb_indent;
  // 生成內容（現在會自動加入縮排）
  var statements_content = pythonGenerator.statementToCode(block, 'testcase_content') || '';
  // 還原原本的縮排設定
  pythonGenerator.INDENT = default_indent;
  
  var code = `${testcase_name}\n${statements_content}\n`;
  return code;
};