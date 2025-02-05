import * as Blockly from 'blockly';
import {PythonGenerator, pythonGenerator} from 'blockly/python';

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

// BuiltIn: Call Method
Blockly.Blocks['rb_builtin_call_method'] = {
  init: function() {
    this.appendValueInput("method_container")
      .appendField("Call Method")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Call Method");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Call%20Method");
  }
};

pythonGenerator.forBlock['rb_builtin_call_method'] = function(block) {
  let method_container = pythonGenerator.valueToCode(block, 'method_container', pythonGenerator.ORDER_ATOMIC) || '';
  method_container = robotFormate(method_container, '|', robot_indent)
  let code = `Call Method${robot_indent}${method_container}\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Catenate
const Catenate_MutatorMixin = {
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
    const containerBlock = workspace.newBlock('catenate_container');
    containerBlock.initSvg();
    
    if (this.hasInput_) {
      const itemBlock = workspace.newBlock('catenate_item');
      itemBlock.initSvg();
      containerBlock.getInput('container').connection.connect(itemBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('container');
    let connection = null;
    
    const input = this.getInput('option_input');
    if (input && input.connection && input.connection.targetConnection) {
      connection = input.connection.targetConnection;
    }
    
    this.hasInput_ = !!itemBlock;
    this.updateShape_();
    
    if (connection && this.hasInput_) {
      const newInput = this.getInput('option_input');
      if (newInput && newInput.connection) {
        newInput.connection.connect(connection);
      }
    }
  },

  saveConnections: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('container');
    if (itemBlock) {
      const input = this.getInput('connect_block_container');
      if (input && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
    }
  }
};

Blockly.Blocks['rb_builtin_catenate'] = {
  init: function() {
    this.containerBlockType = 'catenate_container';
    this.itemBlockTypes = ['catenate_item'];
    this.hasInput_ = false;

    this.appendDummyInput("")
      .appendField("Catenate");
    
    this.appendValueInput("connect_block_container")
      .setCheck("Variable");
    
    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Call Method");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Catenate");
  },

  updateShape_: function() {
    let containerConnection = null;
    const containerInput = this.getInput('connect_block_container');
    if (containerInput && containerInput.connection && containerInput.connection.targetConnection) {
      containerConnection = containerInput.connection.targetConnection;
    }
  
    const inputs = this.inputList.slice();
    for (let i = 1; i < inputs.length; i++) {
      this.removeInput(inputs[i].name);
    }
  
    if (this.hasInput_) {
      this.appendDummyInput('option_input')
        .appendField("SEPARATOR=")
        .appendField(new Blockly.FieldTextInput(''), 'option_input')
        .appendField(" ")
    }
  
    this.appendValueInput('connect_block_container')
      .setCheck("Variable");
  
    if (containerConnection && this.getInput('connect_block_container').connection) {
      this.getInput('connect_block_container').connection.connect(containerConnection);
    }
  },

  ...Catenate_MutatorMixin
};

// Container block
Blockly.Blocks['catenate_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Catenate");
    
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

// Item block
Blockly.Blocks['catenate_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("SEPARATOR");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_catenate'] = function(block) {
  let code = `Catenate${robot_indent}`;
  if (block.hasInput_) {
    let separator = block.getFieldValue('option_input') || '';
    code += `SEPARATOR=${separator}${robot_indent}`;
  }

  const containerBlock = block.getInputTargetBlock('connect_block_container');
  if (containerBlock) {
    let variableCode = pythonGenerator.valueToCode(block, 'connect_block_container', pythonGenerator.ORDER_ATOMIC) || '';
    variableCode = robotFormate(variableCode, '|', robot_indent)
    code += variableCode;
  }

  code += '\n';
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};