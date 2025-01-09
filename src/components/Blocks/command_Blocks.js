import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const rb_indent = '    ';

pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

const Order = {
    ATOMIC: 0,
};

// Text Block
Blockly.Blocks['Content'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField(new Blockly.FieldTextInput("Content"), "CONTENT");
        
    this.setOutput(true, "args");
    this.setColour(290);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['Content'] = function(block) {
  var text_content = block.getFieldValue('CONTENT');
  var connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  var code = '';
  if (connected_value) {
    code = `${text_content}${rb_indent}${connected_value}`;
  } else {
    code = `${text_content}`;
  }
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};
