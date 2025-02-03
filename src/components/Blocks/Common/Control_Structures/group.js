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

const Group_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasInput', this.hasInput_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasInput_ = xmlElement.getAttribute('hasInput') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('group_container');
    containerBlock.initSvg();
    
    if (this.hasInput_) {
      const itemBlock = workspace.newBlock('group_item');
      itemBlock.initSvg();
      containerBlock.getInput('Title').connection.connect(itemBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('Title');
    let connection = null;
    
    const input = this.getInput('TEXT');
    if (input && input.connection && input.connection.targetConnection) {
      connection = input.connection.targetConnection;
    }
    
    this.hasInput_ = !!itemBlock;
    this.updateShape_();
    
    if (connection && this.hasInput_) {
      const newInput = this.getInput('TEXT');
      if (newInput && newInput.connection) {
        newInput.connection.connect(connection);
      }
    }
  },

  saveConnections: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('Title');
    if (itemBlock) {
      const variablesInput = this.getInput('Variables');
      if (variablesInput && variablesInput.connection.targetConnection) {
        itemBlock.variablesConnection_ = variablesInput.connection.targetConnection;
      }
    }
  }
};

Blockly.Blocks['rb_logic_group'] = {
  init: function() {
    this.containerBlockType = 'group_container';
    this.itemBlockTypes = ['group_item'];
    this.hasInput_ = false;

    this.appendDummyInput('HEADER')
      .appendField("GROUP");
    this.appendStatementInput("Variables");
    this.appendDummyInput()
      .appendField("END");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Create a Group");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#group-syntax");
  },

  updateShape_: function() {
    let variablesConnection = null;
    const variablesInput = this.getInput('Variables');
    if (variablesInput && variablesInput.connection && variablesInput.connection.targetConnection) {
      variablesConnection = variablesInput.connection.targetConnection;
    }
  
    const inputs = this.inputList.slice();
    for (let i = 1; i < inputs.length; i++) {
      this.removeInput(inputs[i].name);
    }
  
    if (this.hasInput_) {
      this.appendDummyInput('TEXT')
        .appendField(" ")
        .appendField(new Blockly.FieldTextInput(''), 'TEXT');
    }
  
    const newVariablesInput = this.appendStatementInput('Variables');
    this.appendDummyInput()
      .appendField("END");
  
    if (variablesConnection && newVariablesInput && newVariablesInput.connection) {
      newVariablesInput.connection.connect(variablesConnection);
    }
  },

  ...Group_MutatorMixin
};

// Container block
Blockly.Blocks['group_container'] = {
  init: function() {
    this.appendValueInput('Title').appendField("GROUP");
    this.appendStatementInput('STACK');
    this.appendDummyInput()
      .appendField("END");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

// Item block
Blockly.Blocks['group_item'] = {
  init: function() {
    this.appendDummyInput().appendField("GROUP_NAME");
    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_logic_group'] = function(block) {
  pythonGenerator.INDENT = robot_indent;
  let groupName = '';
  if (block.hasInput_) {
    groupName = block.getFieldValue('TEXT') || '';
  }

  let variablesCode = pythonGenerator.statementToCode(block, 'Variables') || '';

  let code = '';
  code += `GROUP${groupName ? `${robot_indent}${groupName}`:''}\n`;

  if (variablesCode) {
    variablesCode = robotFormate(variablesCode)
    code += `${variablesCode ? `${robot_indent}${variablesCode}`:' ．．． '}\n`;
  }
  
  code += 'END\n';
  
  return code;
};

