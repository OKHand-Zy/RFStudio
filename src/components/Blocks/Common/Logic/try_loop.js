import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
const block_color = 30;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

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

// Formate Function
function robotFormate(code, splitMark = split_mark, indent = robot_indent) {
  if (!code) return '';
  return (
    code.split(splitMark) // 切割
      .map(part => part.trim()) //清理輸入字串
      .filter(part => part) //移除空字串
      .join(indent) //加上縮排
  )
}

// TRY...EXCEPT...ELSE
Blockly.Extensions.register('try_except_controls', function() {
  this.hasElse_ = false;
  this.hasFinally_ = false;

  // Add mutator UI
  this.setMutator(new Blockly.icons.MutatorIcon(['try_else', 'try_finally'], this));
});

Blockly.Blocks['rb_logic_try_except_loop'] = {
  init: function() {
    this.Except_Count_ = 0;
    
    this.appendDummyInput("TRY0")
        .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
          this.addElse_();
        }))
        .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
          this.removeElse_();
        }))
        .appendField("TRY")
    
    this.appendStatementInput("DO0")
    this.appendDummyInput('END')
        .appendField("END");
    this.setColour(block_color);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    
    // Apply the extension
    Blockly.Extensions.apply('try_except_controls', this);
  },

  // Mutator methods
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('try_mutator');
    containerBlock.initSvg();

    // Connect ELSE if it exists
    if (this.hasElse_) {
      const elseBlock = workspace.newBlock('try_else');
      elseBlock.initSvg();
      containerBlock.getInput('STACK').connection.connect(elseBlock.previousConnection);
    }

    // Connect FINALLY if it exists
    if (this.hasFinally_) {
      const finallyBlock = workspace.newBlock('try_finally');
      finallyBlock.initSvg();
      if (this.hasElse_) {
        // Connect after ELSE
        containerBlock.getInput('STACK').connection.targetBlock().nextConnection.connect(finallyBlock.previousConnection);
      } else {
        // Connect directly to container
        containerBlock.getInput('STACK').connection.connect(finallyBlock.previousConnection);
      }
    }

    return containerBlock;
  },

  compose: function(containerBlock) {
    // Remove old shape
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
      this.removeInput('ELSE_DO');
    }
    if (this.getInput('FINALLY')) {
      this.removeInput('FINALLY');
      this.removeInput('FINALLY_DO');
    }
    if (this.getInput('END')) {
      this.removeInput('END');
    }

    // Track what we find
    let hasElse = false;
    let hasFinally = false;
    
    // Scan through connected blocks
    let clauseBlock = containerBlock.getInput('STACK').connection.targetBlock();
    while (clauseBlock) {
      if (clauseBlock.type === 'try_else') {
        hasElse = true;
      } else if (clauseBlock.type === 'try_finally') {
        hasFinally = true;
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }

    // Update block shape
    if (hasElse) {
      this.appendDummyInput('ELSE')
          .appendField('ELSE');
      this.appendStatementInput('ELSE_DO');
    }
    if (hasFinally) {
      this.appendDummyInput('FINALLY')
          .appendField('FINALLY');
      this.appendStatementInput('FINALLY_DO');
    }
    this.appendDummyInput('END')
        .appendField('END');

    // Store state
    this.hasElse_ = hasElse;
    this.hasFinally_ = hasFinally;
  },

  // Save mutations
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('else', this.Except_Count_);
    container.setAttribute('haselse', this.hasElse_);
    container.setAttribute('hasfinally', this.hasFinally_);
    return container;
  },

  // Load mutations
  domToMutation: function(xmlElement) {
    this.Except_Count_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.hasElse_ = xmlElement.getAttribute('haselse') === 'true';
    this.hasFinally_ = xmlElement.getAttribute('hasfinally') === 'true';
    this.updateShape_();
  },

  // Original methods remain the same
  addElse_: function() {
    this.Except_Count_++;
    this.updateShape_();
  },
  removeElse_: function() {
    if (this.Except_Count_ > 0) {
      this.Except_Count_--;
      this.updateShape_();
    }
  },
  updateShape_: function() {
    // Remove END, ELSE, and FINALLY first
    if (this.getInput('END')) this.removeInput('END');
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
      this.removeInput('ELSE_DO');
    }
    if (this.getInput('FINALLY')) {
      this.removeInput('FINALLY');
      this.removeInput('FINALLY_DO');
    }
    
    // Remove all existing except inputs
    for (let i = 1; this.getInput('TRY' + i); i++) {
      this.removeInput('TRY' + i);
      this.removeInput('DO' + i);
    }
    
    // Rebuild except inputs
    for (let i = 1; i <= this.Except_Count_; i++) {
      this.appendValueInput('TRY' + i)
          .appendField('EXCEPT');
      this.appendStatementInput('DO' + i)
    }

    // Add ELSE if needed
    if (this.hasElse_) {
      this.appendDummyInput('ELSE')
          .appendField('ELSE');
      this.appendStatementInput('ELSE_DO');
    }

    // Add FINALLY if needed
    if (this.hasFinally_) {
      this.appendDummyInput('FINALLY')
          .appendField('FINALLY');
      this.appendStatementInput('FINALLY_DO');
    }

    // Always add END label at the bottom
    this.appendDummyInput('END')
        .appendField("END");
  }
};

// Define mutator dialog blocks
Blockly.Blocks['try_mutator'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('try');
    this.appendStatementInput('STACK');
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['try_else'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('else');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['try_finally'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('finally');
    this.setPreviousStatement(true);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_logic_try_except_loop'] = function(block) {
  pythonGenerator.INDENT = robot_indent;
  let code = 'TRY\n';
  
  // 處理 try 區塊
  let tryCode = pythonGenerator.statementToCode(block, 'DO0') || 'No Operation';
  tryCode = robotFormate(tryCode)
  code += `${robot_indent}${tryCode}\n`;
  
  // 處理 except 區塊
  for (let i = 1; i <= block.Except_Count_; i++) {
    let exceptValue = pythonGenerator.valueToCode(block, 'TRY' + i, pythonGenerator.ORDER_NONE) || '';
    exceptValue = robotFormate(exceptValue)

    let exceptCode = pythonGenerator.statementToCode(block, 'DO' + i) || 'No Operation';
    exceptCode = robotFormate(exceptCode)

    code += `EXCEPT${robot_indent}${exceptValue}\n`;
    code += `${robot_indent}${exceptCode}\n`;
  }
  
  // 處理 else 區塊
  if (block.hasElse_) {
    let elseCode = pythonGenerator.statementToCode(block, 'ELSE_DO') || 'No Operation';
    elseCode = robotFormate(elseCode)
    code += `ELSE\n`
    code += `${robot_indent}${elseCode}\n`;
  }
  
  // 處理 finally 區塊
  if (block.hasFinally_) {
    let finallyCode = pythonGenerator.statementToCode(block, 'FINALLY_DO') || '  No Operation';
    finallyCode = robotFormate(finallyCode)
    code += `FINALLY\n`
    code += `${robot_indent}${finallyCode}\n`;  
  }
  
  code += 'END\n';
  return code;
};