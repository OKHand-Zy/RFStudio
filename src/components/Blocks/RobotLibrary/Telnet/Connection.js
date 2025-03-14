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

// Telnet: Open Connection - Optimized
const PARAM_NAMES = [
  'alias', 'port', 'timeout', 'newline', 'prompt', 'prompt_is_regexp',
  'encoding', 'encoding_errors', 'default_log_level', 'window_size',
  'environ_user', 'terminal_emulation', 'terminal_type', 'telnetlib_log_level',
  'connection_timeout'
];

const open_connection_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    
    // Use loop to set attributes instead of repetitive setAttribute calls
    PARAM_NAMES.forEach(param => {
      container.setAttribute(`has${this._camelCase(param)}`, this[`has${this._camelCase(param)}_`]);
    });
    
    return container;
  },

  domToMutation: function(xmlElement) {
    // Use loop to get attributes
    PARAM_NAMES.forEach(param => {
      const camelParam = this._camelCase(param);
      this[`has${camelParam}_`] = xmlElement.getAttribute(`has${camelParam}`) === 'true';
    });
    
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('open_connection_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('stack').connection;
    
    // Create parameter blocks in a loop
    PARAM_NAMES.forEach(param => {
      const hasParam = this[`has${this._camelCase(param)}_`];
      
      if (hasParam) {
        const paramBlock = workspace.newBlock(`open_connection_${param}_item`);
        paramBlock.initSvg();
        connection.connect(paramBlock.previousConnection);
        connection = paramBlock.nextConnection;
      }
    });
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    // Save connections
    const connections = this._saveAllConnections();
    
    // Reset all flags
    this._resetAllFlags();
    
    // Track seen block types to prevent duplicates
    const seenTypes = new Set();
    
    // Parse blocks from mutator dialog
    let itemBlock = containerBlock.getInputTargetBlock('stack');
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicates
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        continue;
      }
      
      // Extract parameter name from block type (e.g., 'open_connection_alias_item' -> 'alias')
      const paramMatch = blockType.match(/^open_connection_(.+)_item$/);
      if (paramMatch && paramMatch[1]) {
        const param = paramMatch[1];
        const camelParam = this._camelCase(param);
        
        if (PARAM_NAMES.includes(param)) {
          this[`has${camelParam}_`] = true;
          seenTypes.add(blockType);
        }
      }
      
      // Move to next block
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    
    // Update the shape and reconnect saved connections
    this.updateShape_();
    this._reconnectSavedConnections(connections);
  },

  saveConnections: function(containerBlock) {
    const seenTypes = new Set();
    
    let itemBlock = containerBlock.getInputTargetBlock('stack');
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        continue;
      }
      
      // Extract parameter name from block type
      const paramMatch = blockType.match(/^open_connection_(.+)_item$/);
      if (paramMatch && paramMatch[1]) {
        const param = paramMatch[1];
        
        if (PARAM_NAMES.includes(param)) {
          const input = this.getInput(param);
          if (input && input.connection && input.connection.targetConnection) {
            itemBlock.valueConnection_ = input.connection.targetConnection;
          }
          seenTypes.add(blockType);
        }
      }
      
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  
  // Helper function to convert snake_case to camelCase
  _camelCase: function(str) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  },
  
  // Helper function to save all connections
  _saveAllConnections: function() {
    const connections = new Map();
    
    // Save host connection
    const hostInput = this.getInput('host');
    if (hostInput && hostInput.connection && hostInput.connection.targetConnection) {
      connections.set('host', hostInput.connection.targetConnection);
    }
    
    // Save connections for optional parameters
    PARAM_NAMES.forEach(param => {
      const input = this.getInput(param);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(param, input.connection.targetConnection);
      }
    });
    
    return connections;
  },
  
  // Helper function to reset all flags
  _resetAllFlags: function() {
    PARAM_NAMES.forEach(param => {
      const camelParam = this._camelCase(param);
      this[`has${camelParam}_`] = false;
    });
  },
  
  // Helper function to reconnect saved connections
  _reconnectSavedConnections: function(connections) {
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  }
};

// Main block definition with mutator
Blockly.Blocks['rb_telnet_open_connection'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Open Connection");
    this.appendValueInput("host")
      .appendField("host：")
      .setCheck("Variable");
    
    // Initialize mutator flags
    PARAM_NAMES.forEach(param => {
      const camelParam = param.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
      this[`has${camelParam}_`] = false;
    });
    
    // Define which blocks can appear in the mutator dialog
    const mutatorBlocks = PARAM_NAMES.map(param => `open_connection_${param}_item`);
    
    this.setMutator(new Blockly.icons.MutatorIcon(mutatorBlocks, this));
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Open Connection");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Open%20Connection");
  },
  
  updateShape_: function() {
    // Save connections
    const connections = this._saveAllConnections();
    
    // Remove all inputs except the first dummy input
    const inputList = this.inputList.slice();
    for (let i = 1; i < inputList.length; i++) {
      this.removeInput(inputList[i].name);
    }
    
    // Re-add host input
    this.appendValueInput("host")
      .appendField("host：")
      .setCheck("Variable");
    
    // Add optional parameters
    PARAM_NAMES.forEach(param => {
      const camelParam = param.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
      
      if (this[`has${camelParam}_`]) {
        this.appendValueInput(param)
          .appendField(`${param}：`)
          .setCheck("Variable");
      }
    });
    
    // Reconnect saved connections
    this._reconnectSavedConnections(connections);
  },
  
  // Add mutator methods
  ...open_connection_MutatorMixin
};

// Container block for the mutator dialog
Blockly.Blocks['open_connection_container'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Open Connection Parameters");
      
    this.appendStatementInput('stack')
      .setCheck(null);

    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add parameters to Open Connection block");
  }
};

// Create item blocks for each parameter using a function
function createParameterItemBlock(param) {
  Blockly.Blocks[`open_connection_${param}_item`] = {
    init: function() {
      this.appendDummyInput()
        .appendField(param);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(block_color);
      this.contextMenu = false;
      this.setTooltip(`Add ${param} parameter`);
    }
  };
}

// Create all parameter blocks
PARAM_NAMES.forEach(createParameterItemBlock);

pythonGenerator.forBlock['rb_telnet_open_connection'] = function(block) {
  // Get host value (always exists)
  let host = pythonGenerator.valueToCode(block, 'host', pythonGenerator.ORDER_ATOMIC) || '';
  host = robotFormate(host, '|', default_indent);
  
  // Build the code
  let code = `Open Connection`;
  code += `${host ? `${robot_indent}${host}` : ''}`;

  // Add all parameters that exist
  PARAM_NAMES.forEach(param => {
    if (block.getInput(param)) {
      let value = pythonGenerator.valueToCode(block, param, pythonGenerator.ORDER_ATOMIC) || '';
      if (value) {
        value = robotFormate(value, '|', default_indent);
        code += `${robot_indent}${param}=${value}`;
      }
    }
  });
  
  code += '\n';
  return code;
};

// Telnet: Close Connection
Blockly.Blocks['rb_telnet_close_connection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Close Connection");
    
    this.appendValueInput("loglevel_container")
        .appendField("Log Level：")
        .setCheck("Variable")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Close Connection");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Close%20Connection");
  }
};

pythonGenerator.forBlock['rb_telnet_close_connection'] = function(block) {
  let loglevel = pythonGenerator.valueToCode(block, 'loglevel_container', pythonGenerator.ORDER_ATOMIC) || '';
  loglevel = robotFormate(loglevel, '|', default_indent)

  let code = `Close Connection`;
  code += `${loglevel ? `${robot_indent}loglevel=${loglevel}` : ''}`;
  code += '\n';
  return code;
};

// Telnet: Close All Connections
Blockly.Blocks['rb_telnet_close_all_connections'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Close All Connections");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Close All Connections");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Close%20All%20Connections");
  }
};

pythonGenerator.forBlock['rb_telnet_close_all_connections'] = function(block) {
  let code = `Close All Connections\n`;
  return code;
};

// Telnet: Switch Connection
Blockly.Blocks['rb_telnet_switch_connection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Switch Connection");
    
    this.appendValueInput("connection_container")
        .setCheck("Variable")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Switch Connection");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Switch%20Connection");
  }
};

pythonGenerator.forBlock['rb_telnet_switch_connection'] = function(block) {
  let connection = pythonGenerator.valueToCode(block, 'connection_container', pythonGenerator.ORDER_ATOMIC) || '';
  connection = robotFormate(connection, '|', default_indent)

  let code = `Switch Connection`;
  code += `${connection ? `${robot_indent}${connection}` : ''}`;
  code += '\n';
  return code;
};