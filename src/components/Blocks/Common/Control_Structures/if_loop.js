import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

//image
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
const block_color = 30;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// IF ELSE LOOP
Blockly.Blocks['rb_logic_if_else_mutator'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('else');
    this.setPreviousStatement(true);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

// 主要的 if-else block
Blockly.Blocks['rb_logic_if_else_loop'] = {
  init: function() {
    this.elseCount_ = 0;
    this.hasElse_ = false;
    
    this.appendValueInput("IF0")
        .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
          this.addElse_();
        }))
        .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
          this.removeElse_();
        }))
        .appendField("IF");
    
    this.appendStatementInput("DO0");
    
    this.appendDummyInput('END')
        .appendField("END");
        
    this.setColour(block_color);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    
    // 設置 mutator
    this.setMutator(new Blockly.icons.MutatorIcon(['rb_logic_if_else_mutator'],this));
    
    this.updateShape_();
  },

  // 保存 mutator 狀態
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('else', this.elseCount_);
    container.setAttribute('haselse', this.hasElse_);
    return container;
  },

  // 從 DOM 讀取 mutator 狀態
  domToMutation: function(xmlElement) {
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.hasElse_ = xmlElement.getAttribute('haselse') === 'true';
    this.updateShape_();
  },

  // 分解 block 到 mutator 編輯器
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('controls_if_if');
    containerBlock.initSvg();
    
    if (this.hasElse_) {
      const elseBlock = workspace.newBlock('rb_logic_if_else_mutator');
      elseBlock.initSvg();
      containerBlock.getInput('STACK').connection.connect(elseBlock.previousConnection);
    }
    
    return containerBlock;
  },

  // 從 mutator 編輯器重組 block
  compose: function(containerBlock) {
    // 檢查是否有 else block
    let clauseBlock = containerBlock.getInputTargetBlock('STACK');
    this.hasElse_ = false;
    
    while (clauseBlock) {
      if (clauseBlock.type === 'rb_logic_if_else_mutator') {
        this.hasElse_ = true;
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    
    this.updateShape_();
  },

  // 更新 block 外觀
  updateShape_: function() {
    // 移除 END 和 ELSE block
    if (this.getInput('END')) {
      this.removeInput('END');
    }
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    
    // 移除所有現有的 else if inputs
    for (let i = 1; this.getInput('IF' + i); i++) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
    }
    
    // 重建 else if inputs
    for (let i = 1; i <= this.elseCount_; i++) {
      this.appendValueInput('IF' + i)
          .appendField('ELSE IF');
      this.appendStatementInput('DO' + i);
    }
    
    // 如果有 else，添加 else block
    if (this.hasElse_) {
      this.appendStatementInput('ELSE')
          .appendField('ELSE');
    }
    
    // 添加 END 標籤
    this.appendDummyInput('END')
        .appendField("END");
  },

  addElse_: function() {
    this.elseCount_++;
    this.updateShape_();
  },
  
  removeElse_: function() {
    if (this.elseCount_ > 0) {
      this.elseCount_--;
      this.updateShape_();
    }
  }
};

// 註冊 mutator 的子 block
Blockly.Blocks['controls_if_if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('if');
    this.appendStatementInput('STACK');
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_logic_if_else_loop'] = function(block) {
  let code = '';
  
  let conditionCode = pythonGenerator.valueToCode(block, 'IF0', pythonGenerator.ORDER_NONE) || '';
  conditionCode = robotFormate(conditionCode)
  let branchCode = pythonGenerator.statementToCode(block, 'DO0') || 'No Operation';
  branchCode = robotFormate(branchCode)
  
  code += `IF${robot_indent}${conditionCode}\n`
  code += `${robot_indent}${branchCode}\n`

  // Process ELSE IF blocks
  let i = 1;
  while (block.getInput('IF' + i)) {
    conditionCode = pythonGenerator.valueToCode(block, 'IF' + i, pythonGenerator.ORDER_NONE) || '';
    conditionCode = robotFormate(conditionCode)
    branchCode = pythonGenerator.statementToCode(block, 'DO' + i) || 'No Operation';
    branchCode = robotFormate(branchCode)

    code += `ELSE IF${robot_indent}${conditionCode}\n`
    code += `${robot_indent}${branchCode}\n`
    i++;
  }

  // Add ELSE block if it exists
  if (block.getInput('ELSE')) {
    branchCode = pythonGenerator.statementToCode(block, 'ELSE') || 'No Operation';
    branchCode = robotFormate(branchCode)
    code += `ELSE\n`
    code += `${robot_indent}${branchCode}\n`
  }

  code += `END\n`;
  return code;
};