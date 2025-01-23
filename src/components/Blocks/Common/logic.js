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

// For...LOOP
const For_END_MutatorMixin = {
  mutationToDom: function() {
      const container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      container.setAttribute('type', this.currentItemType_);
      return container;
  },

  domToMutation: function(xmlElement) {
      const items = parseInt(xmlElement.getAttribute('items'), 10);
      this.itemCount_ = isNaN(items) ? 0 : items;
      this.currentItemType_ = xmlElement.getAttribute('type') || '';
      this.updateShape_();
  },

  decompose: function(workspace) {
      const containerBlock = workspace.newBlock(this.containerBlockType);
      containerBlock.initSvg();
      
      let connection = containerBlock.getInput('STACK').connection;
      if (this.itemCount_ > 0 && this.currentItemType_) {
        const itemBlock = workspace.newBlock(this.currentItemType_);
        itemBlock.initSvg();
        connection.connect(itemBlock.outputConnection);
      }
      
      return containerBlock;
  },

  compose: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('STACK');
    if (itemBlock && !itemBlock.isInsertionMarker()) {
      this.itemCount_ = 1;
      this.currentItemType_ = itemBlock.type;
    } else {
      this.itemCount_ = 0;
      this.currentItemType_ = '';
    }
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('STACK');
    if (itemBlock) {
        this.currentItemType_ = itemBlock.type;

        const mainInput = this.getInput('main_container');
        const subInput = this.getInput('sub_container');
        
        if (mainInput && mainInput.connection.targetConnection) {
            itemBlock.mainConnection_ = mainInput.connection.targetConnection;
        }
        
        if (subInput && subInput.connection.targetConnection) {
            itemBlock.subConnection_ = subInput.connection.targetConnection;
        }
    }
  }
};

Blockly.Blocks['rb_logic_for_loop'] = {
  init: function() {
    this.containerBlockType = 'op_container';
    this.itemBlockTypes = ['op_range_item', 'op_enumerate_item', 'op_zip_item'];
    this.itemCount_ = 0;
    this.currentItemType_ = '';

    this.appendValueInput("main_container")
      .appendField("IF")
    
    this.appendValueInput("sub_container")
      .appendField("IN")

    this.appendStatementInput("Variables")

    this.appendDummyInput()
      .appendField("END")

    this.updateShape_()
    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting Import Library");
    this.setHelpUrl("");
  },
  updateShape_: function() {
    const subContainer = this.getInput('sub_container');
    if (subContainer.fieldRow.find(field => field.name === 'OPERATION')) {
      subContainer.removeField('OPERATION');
    }

    if (this.itemCount_ > 0) {
      let operationText;
      switch(this.currentItemType_) {
        case 'op_range_item':
          operationText = 'RANGE';
          break;
        case 'op_enumerate_item':
          operationText = 'ENUMERATE';
          break;
        case 'op_zip_item':
          operationText = 'ZIP';
          break;
        default:
          operationText = '';
      }
      subContainer.appendField(operationText, 'OPERATION');
      
    }
  },
    ...For_END_MutatorMixin
};

Blockly.Blocks['op_container'] = {
  init: function() {
    this.appendValueInput('STACK')
        .appendField("FOR．．．IN")
        .setCheck(null)
    
    this.appendDummyInput()
        .appendField("．．．END")

    this.setOutput(null)
    this.setInputsInline(true);
    this.setTooltip("Add or remove items");
    this.contextMenu = false;
    this.setColour(260);
  },
};

Blockly.Blocks['op_range_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Range")

    this.setOutput(true, "Variable");  
    this.setColour(260);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['op_enumerate_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("ENUMERATE")

    this.setOutput(true, "Variable");  
    this.setColour(260);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['op_zip_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("ZIP")

    this.setOutput(true, "Variable");  
    this.setColour(260);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_logic_for_loop'] = function(block) {
  let mainValue = pythonGenerator.valueToCode(block, 'main_container', pythonGenerator.ORDER_ATOMIC) || '';
  if (mainValue) {
    mainValue = mainValue.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join(robot_indent);
  }

  let subValue = pythonGenerator.valueToCode(block, 'sub_container', pythonGenerator.ORDER_ATOMIC) || '';
  if (subValue) {
    subValue = subValue.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join(robot_indent);
  }

  let operation = '';
  switch(block.currentItemType_) {
    case 'op_range_item':
      operation = 'RANGE';
      break;
    case 'op_enumerate_item':
      operation = 'ENUMERATE';
      break;
    case 'op_zip_item':
      operation = 'ZIP';
      break;
    default:
      operation = '';
  }

  pythonGenerator.INDENT = robot_indent;
  let statements = pythonGenerator.statementToCode(block, 'Variables') || '  No Operation\n';
  let code = '';
  code += `FOR${mainValue ? `${robot_indent}${mainValue}${robot_indent}`:' ．．． '}`;
  code += `IN${operation? ` ${operation}`:''}`
  code += `${subValue ? `${robot_indent}${subValue}`:' ．．． '}\n`;
  code += `${statements}`;
  code += 'END\n';

  return code;
};

// IF ZIP Mode
Blockly.Blocks['rb_logic_for_zip_mode'] = {
  init: function() {
    this.appendValueInput("mode_container")
      .setCheck("FILL")
      .appendField("mode=")
      .appendField(new Blockly.FieldDropdown([
        ['LONGEST', 'LONGEST'],
        ['STRICT', 'STRICT'],
        ['SHORTEST', 'SHORTEST']
      ]), 'ZIP_MODE');
    
    this.setOutput(true, "Variable");
    this.setColour(block_color);
    this.setTooltip("Input IF LOOP ZIP fill value");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-395");
  }
};
pythonGenerator.forBlock['rb_logic_for_zip_mode'] = function(block) {
  const mode = block.getFieldValue('ZIP_MODE');
  const modeValue = pythonGenerator.valueToCode(block, 'mode_container', pythonGenerator.ORDER_ATOMIC) || '';
  let code = '';
  code = `${split_mark}mode=${mode}${modeValue ? `${split_mark}${modeValue}` : ''}`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// IF ZIP fill
Blockly.Blocks['rb_logic_for_zip_fill'] = {
  init: function() {
    const integerValidator = function(newValue) {
      // 只允許整數（包括負數）
      if (/^-?\d+$/.test(newValue)) {
        return newValue;
      }
      return null;
    };

    const fillValue = new Blockly.FieldTextInput("0");
    fillValue.setValidator(integerValidator);

    this.appendDummyInput("fill_container")
      .appendField("fill=")
      .appendField(fillValue, "fill_value");
    
    this.setOutput(true, "FILL");  
    this.setColour(block_color);
    this.setTooltip("Input IF LOOP ZIP fill value");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-395");
  }
};
pythonGenerator.forBlock['rb_logic_for_zip_fill'] = function(block) {
  const fill_value = block.getFieldValue('fill_value');
  let code = '';
  code = `${split_mark}fill=${fill_value}`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};


// WHILE...LOOP
Blockly.Blocks['rb_logic_while_loop'] = {
  init: function() {
    this.appendValueInput("while_args")
      .appendField("WHILE")

    this.appendStatementInput("do_commands")

    this.appendDummyInput()
      .appendField("END")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("While Loop");
    this.setHelpUrl("");
  },
};
pythonGenerator.forBlock['rb_logic_while_loop'] = function(block) {
  let while_args = pythonGenerator.valueToCode(block, 'while_args', pythonGenerator.ORDER_ATOMIC) || '';
  if (while_args) {
    while_args = while_args.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join(robot_indent);
  }

  let do_commands = pythonGenerator.statementToCode(block, 'do_commands') || '';
  if (do_commands) {
    do_commands = do_commands.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join(robot_indent);
  }

  let code = '';
  pythonGenerator.INDENT = robot_indent;
  code += `WHILE${while_args ? `${robot_indent}${while_args}` : ''}\n`;
  code += `${do_commands? `${robot_indent}${do_commands}` : '  No Operation'}\n`;
  code += 'END\n';
  return code;
};

// WHILE...Value...Loop
Blockly.Blocks['rb_logic_while_value'] = {
  init: function() {
    this.appendValueInput("variables")

    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['>', '>'],
          ['>=','>='],
          ['<', '<'],
          ['<=','<='],
        ]), 'while_operator')

    this.appendValueInput("verified")

    this.setOutput(true, "Variable");
    this.setColour(block_color);
    this.setTooltip("while Value Limit");
    this.setHelpUrl("");
  }
}
pythonGenerator.forBlock['rb_logic_while_value'] = function(block) {
  let value_variables = pythonGenerator.valueToCode(block, 'variables', pythonGenerator.ORDER_ATOMIC) || '';
  if (value_variables) {
    value_variables = value_variables.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join('');
  }
  let value_verified = pythonGenerator.valueToCode(block, 'verified', pythonGenerator.ORDER_ATOMIC) || '';
  if (value_verified) {
    value_verified = value_verified.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join('');
  }
  const while_operator = block.getFieldValue('while_operator');
  let code = `${value_variables} ${while_operator} ${value_verified}\n`;
  return [code,pythonGenerator.ORDER_ATOMIC];
};

// WHILE...True...Limit
Blockly.Blocks['rb_logic_while_true_limit'] = {
  init: function() {
    this.appendDummyInput("while_args")
      .appendField("True")
      .appendField("  ")
      .appendField("Limit=")
      .appendField(new Blockly.FieldTextInput("NONE"), "limit_value")
      .appendField(new Blockly.FieldDropdown([
        ['times', 'times'],
        ['seconds', 'seconds'],
        ['minutes', 'minutes'],
        ['hours', 'hours'],
        ['days','days'],
        ['weeks','weeks'],
        ['milliseconds','milliseconds'],
        ['microseconds','microseconds'],
        ['nanoseconds','nanoseconds']
      ]), "limit_type")
      .appendField("  ")
      .appendField(new Blockly.FieldDropdown([
        ['on_limit', 'on_limit'],
        ['on_limit_message', 'on_limit_message']
      ]), "limit_action")
      .appendField("=")
      .appendField(new Blockly.FieldTextInput("fail"), "limit_action_value")
      
    this.setOutput(true, "Variable");
    this.setColour(block_color);
    this.setTooltip("While Loop Limit");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-401");
  },
};
pythonGenerator.forBlock['rb_logic_while_true_limit'] = function(block) {
  let limit_value = block.getFieldValue('limit_value');
  let limit_type = block.getFieldValue('limit_type');
  let limit_action = block.getFieldValue('limit_action');
  let limit_action_value = block.getFieldValue('limit_action_value');

  if (limit_value.toUpperCase() === 'NONE') {
    limit_type = '';
  }

  pythonGenerator.INDENT = robot_indent;
  let code = '';
  code += `${split_mark}True`
  code += `${limit_value ? `${split_mark}limit=${limit_value}` : ''}${limit_value ? ` ${limit_type}` : ''}`;
  code += `${limit_action ? `${split_mark}${limit_action}` : ''}${limit_action_value ? `=${limit_action_value}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};
  

// IF ELSE LOOP
Blockly.Blocks['rb_logic_if_else_loop'] = {
  init: function() {
    this.elseCount_ = 0;
    
    this.appendValueInput("IF0")
        .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
          this.addElse_();
        }))
        .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
          this.removeElse_();
        }))
        .appendField("IF")
    
    this.appendStatementInput("DO0")

    // Add END label at initialization
    this.appendDummyInput('END')
        .appendField("END");

    this.setColour(210);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.updateShape_();
  },

  addElse_: function() {
    this.elseCount_++;
    this.updateShape_();
  },

  removeElse_: function() {
    if (this.elseCount_ > 0) {
      // Remove ELSE input if exists
      if (this.getInput('ELSE')) {
        this.removeInput('ELSE');
      }
      this.elseCount_--;
      this.updateShape_();
    }
  },

  updateShape_: function() {
    // Remove END label first
    if (this.getInput('END')) {
      this.removeInput('END');
    }
    
    // Remove ELSE input if exists
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    
    // Remove all existing else if inputs
    for (let i = 1; this.getInput('IF' + i); i++) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
    }
    
    // Rebuild else if inputs
    for (let i = 1; i <= this.elseCount_; i++) {
      this.appendValueInput('IF' + i)
          .appendField('ELSE IF');
      this.appendStatementInput('DO' + i)
    }
    
    // Add else if there are else if blocks
    if (this.elseCount_ > 0) {
      this.appendStatementInput('ELSE')
          .appendField('ELSE');
    }

    // Always add END label at the bottom
    this.appendDummyInput('END')
        .appendField("END");
  },

  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('else', this.elseCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.updateShape_();
  }
};

pythonGenerator.forBlock['rb_logic_if_else_loop'] = function(block) {
  pythonGenerator.INDENT = robot_indent;
  let code = '';
  let ifCondition = pythonGenerator.valueToCode(block, 'IF0', pythonGenerator.ORDER_NONE) || '';
  let ifBranch = pythonGenerator.statementToCode(block, 'DO0') || '  No Operation';
  code += `IF${robot_indent}${ifCondition}`;
  code += `${ifBranch}`;
  
  let i = 1;
  while (block.getInput('IF' + i)) {
    let condition = pythonGenerator.valueToCode(block, 'IF' + i, pythonGenerator.ORDER_NONE) || '';
    let branch = pythonGenerator.statementToCode(block, 'DO' + i) || '  No Operation';
    code += 'elif' + condition + ':\n' + branch;
    i++;
  }
  
  if (block.getInput('ELSE')) {
    let elseBranch = pythonGenerator.statementToCode(block, 'ELSE') || '  No Operation';
    code += 'else:\n' + elseBranch;
  }
  code += 'END\n';
  return code;
};

// 