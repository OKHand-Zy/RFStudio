import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

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
      .appendField("FOR")
    
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
    this.setColour(block_color);
  },
};

Blockly.Blocks['op_range_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Range")

    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['op_enumerate_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("ENUMERATE")

    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['op_zip_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("ZIP")

    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_logic_for_loop'] = function(block) {
  let mainValue = pythonGenerator.valueToCode(block, 'main_container', pythonGenerator.ORDER_ATOMIC) || '';
  mainValue = robotFormate(mainValue)

  let subValue = pythonGenerator.valueToCode(block, 'sub_container', pythonGenerator.ORDER_ATOMIC) || '';
  subValue = robotFormate(subValue)

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

// For ZIP Mode
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

// For ZIP fill
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