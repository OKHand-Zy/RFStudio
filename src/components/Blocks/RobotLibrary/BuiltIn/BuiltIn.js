import * as Blockly from 'blockly';
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

// BuiltIn: No Operation
Blockly.Blocks['rb_builtin_no_operation'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("No Operation")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: No Operation");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#No%20Operation");
  }
};

pythonGenerator.forBlock['rb_builtin_no_operation'] = function(block) {
  let code = `No Operation\n`;
  return code;
};

// BuiltIn: Pass Execution
Blockly.Blocks['rb_builtin_pass_execution'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Pass Execution")
    
    this.appendValueInput("message")
      .appendField("Message=")
      .setCheck(null);
    
    this.appendValueInput("tags")
      .appendField("Tag=")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Pass Execution");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Pass%20Execution");
  }
};

pythonGenerator.forBlock['rb_builtin_pass_execution'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)
  
  let tags = pythonGenerator.valueToCode(block, 'tags', pythonGenerator.ORDER_ATOMIC) || '';
  tags = robotFormate(tags, '|', '  ')

  let code = `Pass Execution${message ? `${robot_indent}${message}` : ''}${tags ? `${robot_indent}${tags}` : ''}\n`;
  return code;
};

// BuiltIn: Pass Execution If
Blockly.Blocks['rb_builtin_pass_execution_if'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Pass Execution If")
    
    this.appendValueInput("condition")
      .appendField("Condition=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField("Message=")
      .setCheck(null);
    
    this.appendValueInput("tags")
      .appendField("Tag=")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Pass Execution If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Pass%20Execution%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_pass_execution_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)
  
  let tags = pythonGenerator.valueToCode(block, 'tags', pythonGenerator.ORDER_ATOMIC) || '';
  tags = robotFormate(tags, '|', '  ')

  let code = `Pass Execution If${condition ? `${robot_indent}${condition}` : ''}${message ? `${robot_indent}${message}` : ''}${tags ? `${robot_indent}${tags}` : ''}\n`;
  return code;
}

// BuiltIn: Regexp Escape
Blockly.Blocks['rb_builtin_regexp_escape'] = {
  init: function() {
    this.appendValueInput("regexp_value_container")
      .appendField("Regexp Escape")
      .setCheck(null);
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Regexp Escape");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Regexp%20Escape");
  }
};

pythonGenerator.forBlock['rb_builtin_regexp_escape'] = function(block) {
  let regexp_value = pythonGenerator.valueToCode(block, 'regexp_value_container', pythonGenerator.ORDER_ATOMIC) || '';
  regexp_value = robotFormate(regexp_value, '|', default_indent);
  let code = `Regexp Escape${robot_indent}${regexp_value}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Reload Library
Blockly.Blocks['rb_builtin_reload_library'] = {
  init: function() {
    this.appendValueInput("library_name")
      .appendField("Reload Library")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Reload Library");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Reload%20Library");
  }
};

pythonGenerator.forBlock['rb_builtin_reload_library'] = function(block) {
  let library_name = pythonGenerator.valueToCode(block, 'library_name', pythonGenerator.ORDER_ATOMIC) || '';
  library_name = robotFormate(library_name, '|', default_indent);
  let code = `Reload Library${robot_indent}${library_name}\n`;

  return code;
};

// BuiltIn: Remove Tags
Blockly.Blocks['rb_builtin_remove_tags'] = {
  init: function() {
    this.appendValueInput("tags_container")
      .appendField("Remove Tags")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Remove Tags");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Remove%20Tags");
  }
};

pythonGenerator.forBlock['rb_builtin_remove_tags'] = function(block) {
  let tags = pythonGenerator.valueToCode(block, 'tags_container', pythonGenerator.ORDER_ATOMIC) || '';
  tags = robotFormate(tags, '|', '  ');
  let code = `Remove Tags${robot_indent}${tags}\n`;

  return code;
};

// BuiltIn: Repeat Keyword
Blockly.Blocks['rb_builtin_repeat_keyword'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendDummyInput("container")
      .appendField("Repeat Keyword")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));

    this.appendValueInput("repeats")
      .appendField("Repeat：")
      .setCheck(null);
    
    this.appendValueInput("keyword")
      .appendField("Keyword_Name：")
      .setCheck(null);
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Repeat Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Repeat%20Keyword");
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
  
  // 更新 block 外觀
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

pythonGenerator.forBlock['rb_builtin_repeat_keyword'] = function(block) {
  let repeats = pythonGenerator.valueToCode(block, 'repeats', pythonGenerator.ORDER_ATOMIC) || '';
  repeats = robotFormate(repeats)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    const arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    args.push(arg);
  }

  let code = `Repeat Keyword`;
  code += `${repeats ? `${robot_indent}${repeats}`:``}`
  code += `${keyword ? `${robot_indent}${keyword}`:``}`

  if (args.length > 0) {
    code+= `${robot_indent}`
    args.forEach(arg => {
      code += `${arg}  `;
    });
  }
  
  code += '\n'
  return code;
};

// BuiltIn: Replace Variables
Blockly.Blocks['rb_builtin_replace_variables'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Replace Variables")
      .setCheck(null);
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Replace Variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Replace%20Variables");
  }
};

pythonGenerator.forBlock['rb_builtin_replace_variables'] = function(block) {
  let variables = pythonGenerator.valueToCode(block, 'conatiner', pythonGenerator.ORDER_ATOMIC) || '';
  variables = robotFormate(variables)
  let code = `Replace Variables${robot_indent}${variables}\n`;
  return code;
};