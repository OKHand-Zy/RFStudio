import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const block_color = 10;
const split_mark = '|';
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// Common Function: Return
Blockly.Blocks['rb_cm_return'] = {
  init: function() {
    this.appendValueInput("connect_block")
      .appendField("Return")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting Multiline Comment");
    this.setHelpUrl("");
  },
};
pythonGenerator.forBlock['rb_cm_return'] = function(block) {
  const connect_content = pythonGenerator.valueToCode(block, 'connect_block', pythonGenerator.ORDER_ATOMIC) || '';
  const code = `Return${connect_content}\n`;
  return code;
};

// Break or CONTINUE
Blockly.Blocks['rb_cm_loop_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["BREAK", "BREAK"], 
          ["CONTINUE", "CONTINUE"]
        ]), "control_type");

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null) 
    this.setColour(block_color);
    this.setTooltip("Loop Control statement");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-404");
  }
}
pythonGenerator.forBlock['rb_cm_loop_control'] = function(block) {
  const control_type = block.getFieldValue('control_type')
  let code = `${control_type}\n`
  return code;
}

// Reserved Tags
Blockly.Blocks['rb_cm_reserved_tags'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("[Tags] robot:")
      .appendField(new Blockly.FieldDropdown([
          ["continue-on-failure", "continue-on-failure"], 
          ["recursive-continue-on-failure", "recursive-continue-on-failure"],
          ["stop-on-failure", "stop-on-failure"],
          ["recursive-stop-on-failure", "recursive-stop-on-failure"],
          ["exit-on-failure", "exit-on-failure"],
          ["skip-on-failure", "skip-on-failure"],
          ["skip", "skip"],
          ["exclude", "exclude"],
          ["private", "private"],
          ["no-dry-run", "no-dry-run"],
          ["exit", "exit"],
          ["flatten", "flatten"],
        ]), "tags_type");

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null) 
    this.setColour(block_color);
    this.setTooltip("Reserved Tag");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#reserved-tags");
  }
}
pythonGenerator.forBlock['rb_cm_reserved_tags'] = function(block) {
  const control_type = block.getFieldValue('tags_type')
  let code = `[Tags]${robot_indent}robot:${control_type}\n`
  return code;
}