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