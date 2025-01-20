import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const block_color = 'gray';
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

registerFieldMultilineInput();
Blockly.Blocks['rb_cmt_comment'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Comment')
      .appendField("*** Comments ***")

    this.appendDummyInput()
      .appendField(
        new FieldMultilineInput(
          '=== Basic Information ===\nDescription:\nAuthor:\nDate:\nVersion:\n=== Additional Notes ===\nNotes:'
        ),
        'COMMENT'
      );
    
    this.setNextStatement(true, ['rb_fw_Settings']) 
    this.setColour(block_color);
    this.setTooltip("Setting Multiline Comment");
    this.setHelpUrl("");
  },
};
pythonGenerator.forBlock['rb_cmt_comment'] = function(block) {
  const comment_text = block.getFieldValue('COMMENT');
  const code = `*** Comments ***\n${comment_text}\n`;
  return code;
};