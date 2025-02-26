import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import {PythonGenerator, pythonGenerator} from 'blockly/python';

// image
const plusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
  '9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMT' +
  'ggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNz' +
  'FjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MW' +
  'MwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS' +
  '44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';
const minusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw' +
  'MC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPS' +
  'JNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAw' +
  'IDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
const block_color = 10;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// Other: Call KeyWord
Blockly.Blocks['other_call_keyword'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendValueInput("keyword")
      .appendField("KeyWord：")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Other: Call KeyWord");
  },
  
  // 保存狀態
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('arguments', this.argumentCount_);
    return container;
  },

  // 從 DOM 讀取狀態
  domToMutation: function(xmlElement) {
    this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10) || 1;
    this.updateShape_();
  },
  
  updateShape_: function() {
    // 移除所有現有的參數輸入
    for (let i = 0; this.getInput('argument' + i); i++) {
      this.removeInput('argument' + i);
    }
    
    // 重建參數輸入
    for (let i = 0; i < this.argumentCount_; i++) {
      this.appendValueInput('argument' + i)
          .appendField('Argument：')
          .setCheck(null);
    }
  },

  addArgument_: function() {
    this.argumentCount_++;
    this.updateShape_();
  },
  
  removeArgument_: function() {
    if (this.argumentCount_ > 1) {
      this.argumentCount_--;
      this.updateShape_();
    }
  }
};

pythonGenerator.forBlock['other_call_keyword'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `${keyword ? `${split_mark}${keyword}`:``}`

  if (args.length > 0) {
    code+= `${robot_indent}`
    args.forEach(arg => {
      code += `${arg}  `;
    });
  }
  
  code += '\n'
  return [code,pythonGenerator.ORDER_ATOMIC];
};
