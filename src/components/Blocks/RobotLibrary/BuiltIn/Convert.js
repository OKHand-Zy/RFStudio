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
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Boolean");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Boolean");
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_boolean'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'value_block', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let code = `Convert To Boolean${robot_indent}${value}${type ? `${robot_indent}${type}` : ''}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Convert To Bytes
Blockly.Blocks['rb_builtin_convert_to_bytes'] = {
  init: function() {
    this.appendValueInput("value_container")
      .appendField("Convert To Bytes")
      .setCheck("Variable")
    
    this.appendDummyInput("type_block")
      .appendField(" Input Type= ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["text", "text"], 
        ["int", "int"],
        ["hex", "hex"],
        ["binary", "bin"],
      ]), "type");
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Convert To Bytes");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Convert%20To%20Bytes");
  }
};

pythonGenerator.forBlock['rb_builtin_convert_to_bytes'] = function(block) {
  let values = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  values = robotFormate(values, '|', robot_indent)
  
  let type = block.getFieldValue('type') || '';
  
  let code = `Convert To Bytes`;
  code += `${values ? `${robot_indent}${values}` : ''}`
  code += `${type ? `${robot_indent}${type}` : ''}`
  code += `\n`

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
          ["default", ""],
          ["False", "False"],
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
