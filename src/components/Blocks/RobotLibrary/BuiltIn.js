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

// BuiltIn: Continue For Loop
Blockly.Blocks['rb_builtin_continue_for_loop'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Continue For Loop")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Continue For Loop");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Continue%20For%20Loop");
  }
};

pythonGenerator.forBlock['rb_builtin_continue_for_loop'] = function(block) {
  let code = `${split_mark}Continue For Loop\n`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

// BuiltIn: Continue For Loop If
Blockly.Blocks['rb_builtin_continue_for_loop_if'] = {
  init: function() {
    this.appendValueInput("condition")
      .appendField("Continue For Loop If")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Continue For Loop If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Continue%20For%20Loop%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_continue_for_loop_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', robot_indent)
  let code = `Continue For Loop If${robot_indent}${condition}\n`;
  return code;
};

// BuiltIn: Convert To Binary
const ConvertToBinary_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasBase', this.hasBase_);
    container.setAttribute('hasPrefix', this.hasPrefix_);
    container.setAttribute('hasLength', this.hasLength_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasBase_ = xmlElement.getAttribute('hasBase') === 'true';
    this.hasPrefix_ = xmlElement.getAttribute('hasPrefix') === 'true';
    this.hasLength_ = xmlElement.getAttribute('hasLength') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('c2b_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasBase_) {
      const baseBlock = workspace.newBlock('c2b_base_item');
      baseBlock.initSvg();
      connection.connect(baseBlock.outputConnection);
      connection = baseBlock.getInput('base_container').connection;
    }
    
    if (this.hasPrefix_) {
      const prefixBlock = workspace.newBlock('c2b_prefix_item');
      prefixBlock.initSvg();
      connection.connect(prefixBlock.outputConnection);
      connection = prefixBlock.getInput('prefix_container').connection;
    }
    
    if (this.hasLength_) {
      const lengthBlock = workspace.newBlock('c2b_length_item');
      lengthBlock.initSvg();
      connection.connect(lengthBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('container');
    
    // Store connections for reconnection
    const connections = new Map();
    ['base', 'prefix', 'length'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.hasBase_ = false;
    this.hasPrefix_ = false;
    this.hasLength_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('base_container') ||
                        itemBlock.getInputTargetBlock('prefix_container') ||
                        itemBlock.getInputTargetBlock('length_container');
        
        // Disconnect this block
        if (itemBlock.outputConnection && itemBlock.outputConnection.targetConnection) {
          itemBlock.outputConnection.targetConnection.disconnect();
        }
        
        // Move to next block
        itemBlock = nextBlock;
        continue;
      }
      
      // Process the block
      switch(blockType) {
        case 'c2b_base_item':
          this.hasBase_ = true;
          seenTypes.add(blockType);
          break;
        case 'c2b_prefix_item':
          this.hasPrefix_ = true;
          seenTypes.add(blockType);
          break;
        case 'c2b_length_item':
          this.hasLength_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                itemBlock.getInputTargetBlock('prefix_container') ||
                itemBlock.getInputTargetBlock('length_container');
    }
    
    this.updateShape_();
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                  itemBlock.getInputTargetBlock('prefix_container') ||
                  itemBlock.getInputTargetBlock('length_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'c2b_base_item':
          input = this.getInput('base');
          seenTypes.add(blockType);
          break;
        case 'c2b_prefix_item':
          input = this.getInput('prefix');
          seenTypes.add(blockType);
          break;
        case 'c2b_length_item':
          input = this.getInput('length');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                itemBlock.getInputTargetBlock('prefix_container') ||
                itemBlock.getInputTargetBlock('length_container');
    }
  }
};

Blockly.Blocks['rb_builtin_convert_to_binary'] = {
  init: function() {
    this.containerBlockType = 'c2b_container';
    this.itemBlockTypes = ['c2b_base_item', 'c2b_prefix_item', 'c2b_length_item'];
    this.hasBase_ = false;
    this.hasPrefix_ = false;
    this.hasLength_ = false;

    this.appendDummyInput("container")
      .appendField("Convert To Binary ")
      .appendField(new Blockly.FieldTextInput("value"), "value");

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Binary");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Binary");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }

    if (this.hasBase_) {
      this.appendDummyInput('base_input')
        .appendField("base=")
        .appendField(new Blockly.FieldTextInput(''), 'base_arg');
    }
    
    if (this.hasPrefix_) {
      this.appendDummyInput('prefix_input')
        .appendField("prefix=")
        .appendField(new Blockly.FieldTextInput(''), 'prefix_arg');
    }
    
    if (this.hasLength_) {
      this.appendDummyInput('length_input')
        .appendField("length=")
        .appendField(new Blockly.FieldTextInput(''), 'length_arg');
    }
  },

  ...ConvertToBinary_MutatorMixin
};

Blockly.Blocks['c2b_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Convert To Binary");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Container for binary conversion options");
  }
};

Blockly.Blocks['c2b_base_item'] = {
  init: function() {
    this.appendValueInput('base_container')
      .appendField("arg:base")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['c2b_prefix_item'] = {
  init: function() {
    this.appendValueInput('prefix_container')
      .appendField("arg:prefix")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['c2b_length_item'] = {
  init: function() {
    this.appendValueInput('length_container')
      .appendField("arg:length")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_binary'] = function(block) {
  let value = block.getFieldValue('value') || '';

  let args = [];
  if (block.hasBase_) {
    const baseArg = block.getFieldValue('base_arg') || '';
    if (baseArg) {
      args.push(`base=${baseArg}`);
    }
  }
  
  if (block.hasPrefix_) {
    const prefixArg = block.getFieldValue('prefix_arg') || '';
    if (prefixArg) {
      args.push(`prefix=${prefixArg}`);
    }
  }
  
  if (block.hasLength_) {
    const lengthArg = block.getFieldValue('length_arg') || '';
    if (lengthArg) {
      args.push(`length=${lengthArg}`);
    }
  }

  const code = `Convert To Binary${robot_indent}${value}${robot_indent}${args.join(robot_indent)}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Convert To Boolean
Blockly.Blocks['rb_builtin_convert_to_boolean'] = {
  init: function() {
    this.appendValueInput("value_block")
      .appendField("Convert To Boolean")
      .setCheck("Variable")
    
    this.appendDummyInput("type_block")
      .appendField("Type=")
      .appendField(new Blockly.FieldDropdown([
        ["text", ""], 
        ["int", "int"],
        ["hex", "hex"],
        ["binary", "bin"],
      ]), "type");
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Boolean");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Boolean");
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_boolean'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'value_block', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let type = block.getFieldValue('type') || '';
  let code = `Convert To Boolean${robot_indent}${value}${type ? `${robot_indent}${type}` : ''}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Convert To Hex
const ConvertToHex_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasBase', this.hasBase_);
    container.setAttribute('hasPrefix', this.hasPrefix_);
    container.setAttribute('hasLength', this.hasLength_);
    container.setAttribute('hasLowercase', this.hasLowercase_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasBase_ = xmlElement.getAttribute('hasBase') === 'true';
    this.hasPrefix_ = xmlElement.getAttribute('hasPrefix') === 'true';
    this.hasLength_ = xmlElement.getAttribute('hasLength') === 'true';
    this.hasLowercase_ = xmlElement.getAttribute('hasLowercase') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('c2h_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('value_container').connection;
    
    if (this.hasBase_) {
      const baseBlock = workspace.newBlock('c2h_base_item');
      baseBlock.initSvg();
      connection.connect(baseBlock.outputConnection);
      connection = baseBlock.getInput('base_container').connection;
    }
    
    if (this.hasPrefix_) {
      const prefixBlock = workspace.newBlock('c2h_prefix_item');
      prefixBlock.initSvg();
      connection.connect(prefixBlock.outputConnection);
      connection = prefixBlock.getInput('prefix_container').connection;
    }
    
    if (this.hasLength_) {
      const lengthBlock = workspace.newBlock('c2h_length_item');
      lengthBlock.initSvg();
      connection.connect(lengthBlock.outputConnection);
    }

    if (this.hasLowercase_) {
      const lowercaseBlock = workspace.newBlock('c2h_lowercase_item');
      lowercaseBlock.initSvg();
      connection.connect(lowercaseBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    
    // Store connections for reconnection
    const connections = new Map();
    ['base', 'prefix', 'length', 'lowercase'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.hasBase_ = false;
    this.hasPrefix_ = false;
    this.hasLength_ = false;
    this.hasLowercase_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('base_container') ||
                        itemBlock.getInputTargetBlock('prefix_container') ||
                        itemBlock.getInputTargetBlock('length_container') ||
                        itemBlock.getInputTargetBlock('lowercase_container');
        
        // Disconnect this block
        if (itemBlock.outputConnection && itemBlock.outputConnection.targetConnection) {
          itemBlock.outputConnection.targetConnection.disconnect();
        }
        
        // Move to next block
        itemBlock = nextBlock;
        continue;
      }
      
      // Process the block
      switch(blockType) {
        case 'c2h_base_item':
          this.hasBase_ = true;
          seenTypes.add(blockType);
          break;
        case 'c2h_prefix_item':
          this.hasPrefix_ = true;
          seenTypes.add(blockType);
          break;
        case 'c2h_length_item':
          this.hasLength_ = true;
          seenTypes.add(blockType);
          break;
        case 'c2h_lowercase_item':
          this.hasLowercase_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                itemBlock.getInputTargetBlock('prefix_container') ||
                itemBlock.getInputTargetBlock('length_container') ||
                itemBlock.getInputTargetBlock('lowercase_container');
    }
    
    this.updateShape_();
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                  itemBlock.getInputTargetBlock('prefix_container') ||
                  itemBlock.getInputTargetBlock('length_container') ||
                  itemBlock.getInputTargetBlock('lowercase_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'c2h_base_item':
          input = this.getInput('base');
          seenTypes.add(blockType);
          break;
        case 'c2h_prefix_item':
          input = this.getInput('prefix');
          seenTypes.add(blockType);
          break;
        case 'c2h_length_item':
          input = this.getInput('length');
          seenTypes.add(blockType);
          break;
        case 'c2h_lowercase_item':
          input = this.getInput('lowercase');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                itemBlock.getInputTargetBlock('prefix_container') ||
                itemBlock.getInputTargetBlock('length_container') ||
                itemBlock.getInputTargetBlock('lowercase_container');
    }
  }
};

Blockly.Blocks['rb_builtin_convert_to_hex'] = {
  init: function() {
    this.containerBlockType = 'c2h_container';
    this.itemBlockTypes = ['c2h_base_item', 'c2h_prefix_item', 'c2h_length_item', 'c2h_lowercase_item'];
    this.hasBase_ = false;
    this.hasPrefix_ = false;
    this.hasLength_ = false;
    this.hasLowercase_ = false;
    
    this.appendValueInput("value_container")
      .appendField("Convert To Hex");

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Hex");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Hex");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }

    if (this.hasBase_) {
      this.appendDummyInput('base_input')
        .appendField("base=")
        .appendField(new Blockly.FieldTextInput(''), 'base_arg');
    }
    
    if (this.hasPrefix_) {
      this.appendDummyInput('prefix_input')
        .appendField("prefix=")
        .appendField(new Blockly.FieldTextInput(''), 'prefix_arg');
    }
    
    if (this.hasLength_) {
      this.appendDummyInput('length_input')
        .appendField("length=")
        .appendField(new Blockly.FieldTextInput(''), 'length_arg');
    }

    if (this.hasLowercase_) {
      this.appendDummyInput('lowercase_input')
        .appendField("lowercase=")
        .appendField(new Blockly.FieldDropdown ([
          ["False", ""],
          ["True", "True"],
        ]), "lowercase_arg");
    }
  },

  ...ConvertToHex_MutatorMixin
};

Blockly.Blocks['c2h_container'] = {
  init: function() {
    this.appendValueInput('value_container')
      .appendField("Convert To Binary");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Container for hex conversion options");
  }
};

Blockly.Blocks['c2h_base_item'] = {
  init: function() {
    this.appendValueInput('base_container')
      .appendField("arg:base")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['c2h_prefix_item'] = {
  init: function() {
    this.appendValueInput('prefix_container')
      .appendField("arg:prefix")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['c2h_length_item'] = {
  init: function() {
    this.appendValueInput('length_container')
      .appendField("arg:length")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['c2h_lowercase_item'] = {
  init: function() {
    this.appendValueInput('lowercase_container')
      .appendField("arg:lowercase")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_hex'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let args = [];
  if (block.hasBase_) {
    const baseArg = block.getFieldValue('base_arg') || '';
    if (baseArg) {
      args.push(`base=${baseArg}`);
    }
  }
  if (block.hasPrefix_) {
    const prefixArg = block.getFieldValue('prefix_arg') || '';
    if (prefixArg) {
      args.push(`prefix=${prefixArg}`);
    }
  }
  if (block.hasLength_) {
    const lengthArg = block.getFieldValue('length_arg') || '';
    if (lengthArg) {
      args.push(`length=${lengthArg}`);
    }
  }
  if (block.hasLowercase_) {
    const lowercaseArg = block.getFieldValue('lowercase_arg') || '';
    if (lowercaseArg) {
      args.push(`lowercase=${lowercaseArg}`);
    }
  }

  const code = `Convert To Hex${robot_indent}${value}${robot_indent}${args.join(robot_indent)}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Convert To Integer
Blockly.Blocks['rb_builtin_convert_to_integer'] = {
  init: function() {
    this.appendValueInput("value_block")
      .appendField("Convert To Integer")
      .setCheck("Variable")
    
    this.appendDummyInput("base_block")
      .appendField("Base=")
      .appendField(new Blockly.FieldDropdown([
        ["None", ""],
        ["10", "2"],
        ["8", "8"],
        ["16", "16"],
      ]), "base");
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Integer");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Integer");
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_integer'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'value_block', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let base = block.getFieldValue('base') || '';
  let code = `Convert To Integer${robot_indent}${value}${base ? `${robot_indent}${base}` : ''}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Convert To Number
Blockly.Blocks['rb_builtin_convert_to_number'] = {
  init: function() {
    this.appendValueInput("value_block")
      .appendField("Convert To Number")
      .setCheck("Variable")
    
    this.appendDummyInput("precision_block")
      .appendField("Precision=")
      .appendField(new Blockly.FieldDropdown([
        ["None", ""], 
        ["1", "1"],
        ["0", "0"],
        ["-1", "-1"],
      ]), "type");
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Number");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Number");
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_number'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'value_block', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let type = block.getFieldValue('type') || '';
  let code = `Convert To Number${robot_indent}${value}${type ? `${robot_indent}${type}` : ''}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Convert To Octal
const ConvertToOctal_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasBase', this.hasBase_);
    container.setAttribute('hasPrefix', this.hasPrefix_);
    container.setAttribute('hasLength', this.hasLength_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasBase_ = xmlElement.getAttribute('hasBase') === 'true';
    this.hasPrefix_ = xmlElement.getAttribute('hasPrefix') === 'true';
    this.hasLength_ = xmlElement.getAttribute('hasLength') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('c2o_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('value_container').connection;
    
    if (this.hasBase_) {
      const baseBlock = workspace.newBlock('c2o_base_item');
      baseBlock.initSvg();
      connection.connect(baseBlock.outputConnection);
      connection = baseBlock.getInput('base_container').connection;
    }
    
    if (this.hasPrefix_) {
      const prefixBlock = workspace.newBlock('c2o_prefix_item');
      prefixBlock.initSvg();
      connection.connect(prefixBlock.outputConnection);
      connection = prefixBlock.getInput('prefix_container').connection;
    }
    
    if (this.hasLength_) {
      const lengthBlock = workspace.newBlock('c2o_length_item');
      lengthBlock.initSvg();
      connection.connect(lengthBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    
    // Store connections for reconnection
    const connections = new Map();
    ['base', 'prefix', 'length'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.hasBase_ = false;
    this.hasPrefix_ = false;
    this.hasLength_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('base_container') ||
                        itemBlock.getInputTargetBlock('prefix_container') ||
                        itemBlock.getInputTargetBlock('length_container');
        
        // Disconnect this block
        if (itemBlock.outputConnection && itemBlock.outputConnection.targetConnection) {
          itemBlock.outputConnection.targetConnection.disconnect();
        }
        
        // Move to next block
        itemBlock = nextBlock;
        continue;
      }
      
      // Process the block
      switch(blockType) {
        case 'c2o_base_item':
          this.hasBase_ = true;
          seenTypes.add(blockType);
          break;
        case 'c2o_prefix_item':
          this.hasPrefix_ = true;
          seenTypes.add(blockType);
          break;
        case 'c2o_length_item':
          this.hasLength_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                itemBlock.getInputTargetBlock('prefix_container') ||
                itemBlock.getInputTargetBlock('length_container');
    }
    
    this.updateShape_();
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                  itemBlock.getInputTargetBlock('prefix_container') ||
                  itemBlock.getInputTargetBlock('length_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'c2o_base_item':
          input = this.getInput('base');
          seenTypes.add(blockType);
          break;
        case 'c2o_prefix_item':
          input = this.getInput('prefix');
          seenTypes.add(blockType);
          break;
        case 'c2o_length_item':
          input = this.getInput('length');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('base_container') ||
                itemBlock.getInputTargetBlock('prefix_container') ||
                itemBlock.getInputTargetBlock('length_container');
    }
  }
};

Blockly.Blocks['rb_builtin_convert_to_octal'] = {
  init: function() {
    this.containerBlockType = 'c2o_container';
    this.itemBlockTypes = ['c2o_base_item', 'c2o_prefix_item', 'c2o_length_item'];
    this.hasBase_ = false;
    this.hasPrefix_ = false;
    this.hasLength_ = false;

    this.appendValueInput("value_container")
      .appendField("Convert To Octal");

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Octal");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Octal");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }

    if (this.hasBase_) {
      this.appendDummyInput('base_input')
        .appendField("base=")
        .appendField(new Blockly.FieldTextInput(''), 'base_arg');
    }
    
    if (this.hasPrefix_) {
      this.appendDummyInput('prefix_input')
        .appendField("prefix=")
        .appendField(new Blockly.FieldTextInput(''), 'prefix_arg');
    }
    
    if (this.hasLength_) {
      this.appendDummyInput('length_input')
        .appendField("length=")
        .appendField(new Blockly.FieldTextInput(''), 'length_arg');
    }
  },

  ...ConvertToOctal_MutatorMixin
};

Blockly.Blocks['c2o_container'] = {
  init: function() {
    this.appendValueInput('value_container')
      .appendField("Convert To Binary");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Container for binary conversion options");
  }
};

Blockly.Blocks['c2o_base_item'] = {
  init: function() {
    this.appendValueInput('base_container')
      .appendField("arg:base")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['c2o_prefix_item'] = {
  init: function() {
    this.appendValueInput('prefix_container')
      .appendField("arg:prefix")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['c2o_length_item'] = {
  init: function() {
    this.appendValueInput('length_container')
      .appendField("arg:length")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_octal'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let args = [];
  if (block.hasBase_) {
    const baseArg = block.getFieldValue('base_arg') || '';
    if (baseArg) {
      args.push(`base=${baseArg}`);
    }
  }
  if (block.hasPrefix_) {
    const prefixArg = block.getFieldValue('prefix_arg') || '';
    if (prefixArg) {
      args.push(`prefix=${prefixArg}`);
    }
  }
  if (block.hasLength_) {
    const lengthArg = block.getFieldValue('length_arg') || '';
    if (lengthArg) {
      args.push(`length=${lengthArg}`);
    }
  }

  const code = `Convert To Octal${robot_indent}${value}${robot_indent}${args.join(robot_indent)}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Convert To String
Blockly.Blocks['rb_builtin_convert_to_string'] = {
  init: function() {
    this.appendValueInput("value_block")
      .appendField("Convert To String")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20String");
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_string'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'value_block', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let code = `Convert To String${robot_indent}${value}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Create Dictionary
Blockly.Blocks['rb_builtin_create_dictionary'] = {
  init: function() {
    this.appendValueInput("create_dictionary_container")
      .appendField("Create Dictionary")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Create Dictionary");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Create%20Dictionary");
  }
}
pythonGenerator.forBlock['rb_builtin_create_dictionary'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'create_dictionary_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let code = `Create Dictionary${robot_indent}${value}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];

};

// BuiltIn: Create List
Blockly.Blocks['rb_builtin_create_list'] = {
  init: function() {
    this.appendValueInput("create_list_container")
      .appendField("Create List")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Create List");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Create%20List");
  }
}
pythonGenerator.forBlock['rb_builtin_create_list'] = function(block) {
  let connect_block_container = pythonGenerator.valueToCode(block, 'create_list_container', pythonGenerator.ORDER_ATOMIC) || '';
  let connect_blocks = robotFormate(connect_block_container, '|', robot_indent)
  let code = `Create List${robot_indent}${connect_blocks}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Evaluate
const Evaluate_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasModules', this.hasModules_);
    container.setAttribute('hasNamespace', this.hasNamespace_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasModules_ = xmlElement.getAttribute('hasModules') === 'true';
    this.hasNamespace_ = xmlElement.getAttribute('hasNamespace') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('eva_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasModules_) {
      const modulesBlock = workspace.newBlock('eva_modules_item');
      modulesBlock.initSvg();
      connection.connect(modulesBlock.outputConnection);
      connection = modulesBlock.getInput('modules').connection;
    }
    
    if (this.hasNamespace_) {
      const namespaceBlock = workspace.newBlock('eva_namespace_item');
      namespaceBlock.initSvg();
      connection.connect(namespaceBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('container');
    
    // Store connections for reconnection
    const connections = new Map();
    ['modules', 'namespace'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.hasModules_ = false;
    this.hasNamespace_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('modules') ||
                        itemBlock.getInputTargetBlock('namespace_container');
        
        // Disconnect this block
        if (itemBlock.outputConnection && itemBlock.outputConnection.targetConnection) {
          itemBlock.outputConnection.targetConnection.disconnect();
        }
        
        // Move to next block
        itemBlock = nextBlock;
        continue;
      }
      
      // Process the block
      switch(blockType) {
        case 'eva_modules_item':
          this.hasModules_ = true;
          seenTypes.add(blockType);
          break;
        case 'eva_namespace_item':
          this.hasNamespace_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('modules') ||
                itemBlock.getInputTargetBlock('namespace_container');
    }
    
    this.updateShape_();
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('modules') ||
                  itemBlock.getInputTargetBlock('namespace_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'eva_modules_item':
          input = this.getInput('modules');
          seenTypes.add(blockType);
          break;
        case 'eva_namespace_item':
          input = this.getInput('namespace');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('modules') ||
                itemBlock.getInputTargetBlock('namespace_container');
    }
  }
};

Blockly.Blocks['rb_builtin_evaluate'] = {
  init: function() {
    this.containerBlockType = 'eva_container';
    this.itemBlockTypes = ['eva_modules_item', 'eva_namespace_item'];
    this.hasModules_ = false;
    this.hasNamespace_ = false;

    this.appendValueInput("container")
      .appendField("Evaluate ")

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Evaluate Python Expression");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Evaluate");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }

    if (this.hasModules_) {
      this.appendValueInput('modules_input')
        .appendField("modules=")
    }
    
    if (this.hasNamespace_) {
      this.appendValueInput('namespace_input')
        .appendField("namespace=")
    }
  },

  ...Evaluate_MutatorMixin
};

Blockly.Blocks['eva_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Evaluate");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Evaluates the given expression in Python and returns the result.");
  }
};

Blockly.Blocks['eva_modules_item'] = {
  init: function() {
    this.appendValueInput('modules')
      .appendField("arg:modules")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['eva_namespace_item'] = {
  init: function() {
    this.appendValueInput('namespace_container')
      .appendField("arg:namespace")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_evaluate'] = function(block) {
  // Get the expression from the container input
  let expressionValue = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  expressionValue = robotFormate(expressionValue, '|', robot_indent)
  
  let args = [];
  // Add modules argument if enabled
  if (block.hasModules_) {
    let modulesValue = pythonGenerator.valueToCode(block,'modules_input',pythonGenerator.ORDER_ATOMIC);
    modulesValue = robotFormate(modulesValue, '|', default_indent)
    if (modulesValue) {
      args.push(`modules=${modulesValue}`);
    }
  }
  
  // Add namespace argument if enabled
  if (block.hasNamespace_) {
    let namespaceValue = pythonGenerator.valueToCode(block,'namespace_input',pythonGenerator.ORDER_ATOMIC);
    namespaceValue = robotFormate(namespaceValue, '|', default_indent)
    if (namespaceValue) {
      args.push(`namespace=${namespaceValue}`);
    }
  }

  let code = 'Evaluate';
  code += `${robot_indent}${expressionValue}`;
  if (args.length > 0) {
    code += `${robot_indent}${args.join(robot_indent)}`;
  }
  
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Exit For Loop
Blockly.Blocks['rb_builtin_exit_for_loop'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Exit For Loop")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Exit For Loop");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Exit%20For%20Loop");
  }
};

pythonGenerator.forBlock['rb_builtin_exit_for_loop'] = function(block) {
  let code = `${split_mark}Exit For Loop\n`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

// BuiltIn: Exit For Loop If
Blockly.Blocks['rb_builtin_exit_for_loop_if'] = {
  init: function() {
    this.appendValueInput("condition")
      .appendField("Exit For Loop If")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Exit For Loop If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Exit%20For%20Loop%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_exit_for_loop_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', robot_indent)
  let code = `Exit For Loop If${robot_indent}${condition}\n`;
  return code;
};

// BuiltIn: Fail
Blockly.Blocks['rb_builtin_fail'] = {
  init: function() {
    this.appendValueInput("message")
      .appendField("Fail")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Fail");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Fail");
  }
};

pythonGenerator.forBlock['rb_builtin_fail'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)
  let code = `Fail${robot_indent}${message}\n`;
  return code;
};

// BuiltIn: Fatal Error
Blockly.Blocks['rb_builtin_fatal_error'] = {
  init: function() {
    this.appendValueInput("message")
      .appendField("Fatal Error")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Fatal Error");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Fatal%20Error");
  }
};

pythonGenerator.forBlock['rb_builtin_fatal_error'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)
  let code = `Fatal Error${robot_indent}${message}\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Get Count
Blockly.Blocks['rb_builtin_get_count'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Get Count")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Get Count");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Get%20Count");
  }
};
pythonGenerator.forBlock['rb_builtin_get_count'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  let code = `Get Count${robot_indent}${container}\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Get Length
Blockly.Blocks['rb_builtin_get_length'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Get Length")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Get Length");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Get%20Length");
  }
};
pythonGenerator.forBlock['rb_builtin_get_length'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  let code = `Get Length${robot_indent}${container}\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Get Library Instance
const Get_Library_Instance_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasAll', this.hasAll_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasAll_ = xmlElement.getAttribute('hasAll') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('get_library_instance_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasAll_) {
      const allBlock = workspace.newBlock('get_library_instance_all_item');
      allBlock.initSvg();
      connection.connect(allBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {
    // Check if there's an all_item block connected
    const allBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasAll_ = allBlock && allBlock.type === 'get_library_instance_all_item';
    
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    // No connections need to be saved since we only have a dropdown
  }
};

Blockly.Blocks['rb_builtin_get_library_instance'] = {
  init: function() {
    this.containerBlockType = 'get_library_instance_container';
    this.itemBlockTypes = ['get_library_instance_all_item'];  // 修正這裡
    this.hasAll_ = false;

    this.appendValueInput("container")
      .appendField("Get library instance ")

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Get library instance");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Get%20Library%20Instance");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }

    if (this.hasAll_) {
      this.appendDummyInput('all_input')
        .appendField("all=")
        .appendField(new Blockly.FieldDropdown([
          ["False", ""],
          ["True", "True"],
        ]), "all_arg");
    }
  },

  ...Get_Library_Instance_MutatorMixin
};

Blockly.Blocks['get_library_instance_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Get Library Instance");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Evaluates the given expression in Python and returns the result.");
  }
};

Blockly.Blocks['get_library_instance_all_item'] = {
  init: function() {
    this.appendDummyInput('all_value')
      .appendField("arg:all")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_get_library_instance'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  
  let code = `Get Library Instance${robot_indent}${container}`;

  if (block.hasAll_) {
    const allValue = block.getFieldValue('all_arg');
    if (allValue) {
      code += `${robot_indent}all=${allValue}`;
    }
  }

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Get Time
Blockly.Blocks['rb_builtin_get_time'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Get Time")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Get Time");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Get%20Time");
  }
};
pythonGenerator.forBlock['rb_builtin_get_time'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  let code = `Get Time${robot_indent}${container}\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Get Variable Value
Blockly.Blocks['rb_builtin_get_variable_value'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Get Variable Value")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Get Variable Value");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Get%20Variable%20Value");
  }
};
pythonGenerator.forBlock['rb_builtin_get_variable_value'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  let code = `Get Variable Value${robot_indent}${container}\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Get Variables
const Get_Variables_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasDecoration', this.hasDecoration_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasDecoration_ = xmlElement.getAttribute('hasDecoration') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('get_variables_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasDecoration_) {
      const allBlock = workspace.newBlock('get_variables_decoration_item');
      allBlock.initSvg();
      connection.connect(allBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {
    // Check if there's an all_item block connected
    const allBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasDecoration_ = allBlock && allBlock.type === 'get_variables_decoration_item';
    
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    // No connections need to be saved since we only have a dropdown
  }
};

Blockly.Blocks['rb_builtin_get_variables'] = {
  init: function() {
    this.containerBlockType = 'get_variables_container';
    this.itemBlockTypes = ['get_variables_decoration_item'];
    this.hasDecoration_ = false;

    this.appendDummyInput("container")
      .appendField("Get Variables ")

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Get Variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Get%20Variables");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }

    if (this.hasDecoration_) {
      this.appendDummyInput('decoration_input')
        .appendField("no_decoration=")
        .appendField(new Blockly.FieldDropdown([
          ["False", ""],
          ["True", "True"],
        ]), "decoration_arg");
    }
  },

  ...Get_Variables_MutatorMixin
};

Blockly.Blocks['get_variables_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Get Variables");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Returns a dictionary containing all variables in the current scope.");
  }
};

Blockly.Blocks['get_variables_decoration_item'] = {
  init: function() {
    this.appendDummyInput('decoration_value')
      .appendField("arg:decoration")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_get_variables'] = function(block) {
  let code = `Get Variables`;

  if (block.hasDecoration_) {
    const decorationArg = block.getFieldValue('decoration_arg') || '';
    if (decorationArg) {
      code += `${robot_indent}no_decoration=${decorationArg}`;
    }
  }

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Import Library
const Import_Library_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasCustomName', this.hasCustomName_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasCustomName_ = xmlElement.getAttribute('hasCustomName') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('import_library_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasCustomName_) {
      const allBlock = workspace.newBlock('import_library_custom_name_item');
      allBlock.initSvg();
      connection.connect(allBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {
    // Check if there's an all_item block connected
    const allBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasCustomName_ = allBlock && allBlock.type === 'import_library_custom_name_item';
    
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    // No connections need to be saved since we only have a dropdown
  }
};

Blockly.Blocks['rb_builtin_import_library'] = {
  init: function() {
    this.containerBlockType = 'import_library_container';
    this.itemBlockTypes = ['import_library_custom_name_item'];
    this.hasCustomName_ = false;

    this.appendValueInput("library_name")
      .appendField("Import Library ")

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Import Library");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Import%20Library");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }

    if (this.hasCustomName_) {
      this.appendDummyInput('custom_name_input')
        .appendField("AS ")
        .appendField(new Blockly.FieldTextInput("library_custom_name"), "custom_name_arg");
    }
  },

  ...Import_Library_MutatorMixin
};

Blockly.Blocks['import_library_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Import Library");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Imports a library with the given name and optional arguments.");
  }
};

Blockly.Blocks['import_library_custom_name_item'] = {
  init: function() {
    this.appendDummyInput('custom_name_value')
      .appendField("arg:custom_name")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_import_library'] = function(block) {
  let libraryName = pythonGenerator.valueToCode(block, 'library_name', pythonGenerator.ORDER_ATOMIC) || '';
  libraryName = robotFormate(libraryName, '|', robot_indent)

  let code = `Import Library${robot_indent}${libraryName}`;

  if (block.hasCustomName_) {
    const customName = block.getFieldValue('custom_name_arg');
    code += `${robot_indent}AS${robot_indent}${customName}`;
  }

  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Import Resource
Blockly.Blocks['rb_builtin_import_resource'] = {
  init: function() {
    this.appendValueInput("resource")
      .appendField("Import Resource")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Import Resource");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Import%20Resource");
  }
};

pythonGenerator.forBlock['rb_builtin_import_resource'] = function(block) {
  let resource = pythonGenerator.valueToCode(block, 'resource', pythonGenerator.ORDER_ATOMIC) || '';
  resource = robotFormate(resource, '|', robot_indent)
  let code = `Import Resource${robot_indent}${resource}\n`;
  return code;
};

// BuiltIn: Import Variables
Blockly.Blocks['rb_builtin_import_variables'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Import Variables")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Import Variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Import%20Variables");
  }
};

pythonGenerator.forBlock['rb_builtin_import_variables'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  let code = `Import Variables${robot_indent}${container}\n`;
  return code;
};

// BuiltIn: Keyword Should Exist
const Keyword_Should_Exist_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasAll', this.hasAll_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasAll_ = xmlElement.getAttribute('hasAll') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('mutation_option_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasAll_) {
      const allBlock = workspace.newBlock('option_message_item');
      allBlock.initSvg();
      connection.connect(allBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {    
    const allBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasAll_ = allBlock && allBlock.type === 'option_message_item';
    
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    // No connections need to be saved since we only have a dropdown
  }
};

Blockly.Blocks['rb_builtin_keyword_should_exist'] = {
  init: function() {
    this.containerBlockType = 'mutation_option_container';
    this.itemBlockTypes = ['option_message_item']; 
    this.hasAll_ = false;

    this.appendDummyInput("container")
      .appendField("Keyword Should Exist")
      .appendField(new Blockly.FieldTextInput("Input_KeyWord"), "keyword");

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Keyword Should Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Keyword%20Should%20Exist");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      if (input && input.name) {  
        this.removeInput(input.name);
      }
    }

    if (this.hasAll_) {
      this.appendDummyInput('msg_input')
        .appendField("msg=")
        .appendField(new Blockly.FieldTextInput("Exist_Show_Message"), "msg_arg");
    }
  },

  ...Keyword_Should_Exist_MutatorMixin
};

Blockly.Blocks['mutation_option_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Keyword Should Exist");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Evaluates the given expression in Python and returns the result.");
  }
};

Blockly.Blocks['option_message_item'] = {
  init: function() {
    this.appendDummyInput('option_value')
      .appendField("arg:message")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_keyword_should_exist'] = function(block) {
  const keyword_name = block.getFieldValue('keyword');

  const hasMessage = block.hasAll_;
  let code = '';
  
  if (hasMessage) {
    let message = block.getFieldValue('msg_arg');
    code = `Keyword Should Exist${robot_indent}${keyword_name}${robot_indent}msg=${message}\n`;
  }else{
    code = `Keyword Should Exist${robot_indent}${keyword_name}\n`;
  }

  return code;
};

// BuiltIn: Length Should Be
const Length_Should_Be_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasAll', this.hasAll_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasAll_ = xmlElement.getAttribute('hasAll') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('mutation_option_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasAll_) {
      const allBlock = workspace.newBlock('option_message_item');
      allBlock.initSvg();
      connection.connect(allBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {    
    const allBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasAll_ = allBlock && allBlock.type === 'option_message_item';
    
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    // No connections need to be saved since we only have a dropdown
  }
};

Blockly.Blocks['rb_builtin_length_should_be'] = {
  init: function() {
    this.containerBlockType = 'mutation_option_container';
    this.itemBlockTypes = ['option_message_item']; 
    this.hasAll_ = false;

    this.appendValueInput("container")
      .appendField("Length Should Be")
    
    this.appendValueInput("length")
      .appendField("Length=")

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Length Should Be");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Length%20Should%20Be");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(2);
    for (const input of inputs) {
      if (input && input.name && input.name !== 'container' && input.name !== 'length') {  
        this.removeInput(input.name);
    }
    }

    if (this.hasAll_) {
      this.appendDummyInput('msg_input')
        .appendField("msg=")
        .appendField(new Blockly.FieldTextInput("Exist_Show_Message"), "msg_arg");
    }
  },

  ...Length_Should_Be_MutatorMixin
};

Blockly.Blocks['mutation_option_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Length Should Be");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Verifies that the length of the given item is correct.");
  }
};

Blockly.Blocks['option_message_item'] = {
  init: function() {
    this.appendDummyInput('option_value')
      .appendField("arg:message")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_length_should_be'] = function(block) {
  // Get the value from the container input
  let containerCode = pythonGenerator.valueToCode(
    block, 'container', pythonGenerator.ORDER_ATOMIC
  ) || '';
  containerCode = robotFormate(containerCode, '|', robot_indent)

  let length = pythonGenerator.valueToCode(
    block, 'length', pythonGenerator.ORDER_ATOMIC
  ) || '';
  length = robotFormate(length, '|', robot_indent)

  const hasMessage = block.hasAll_;
  let code = `Length Should Be`;

  if (containerCode) {
    code += `${robot_indent}${containerCode}`;
  }
  if (length) {
    code += `${robot_indent}${length}`;
  }

  if (hasMessage) {
    let message = block.getFieldValue('msg_arg');
    code += `${robot_indent}msg=${message}\n`;
  }else{
    code += `\n`;
  }
  
  return code
};