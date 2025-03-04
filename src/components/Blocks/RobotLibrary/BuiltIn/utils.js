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
    this.setTooltip("BuiltIn: Catenate");
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

// BuiltIn: Comment
registerFieldMultilineInput();
Blockly.Blocks['rb_builtin_comment'] = {
  init: function () {
    this.appendDummyInput('rb_builtin_comment')
      .appendField("Comments= ")
      .appendField(
        new FieldMultilineInput(
          'Description:\nAuthor:\nDate:\nVersion:'
        ),'COMMENT');
      
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null) 
    this.setColour(block_color);
    this.setTooltip("BuiltIn：Multiline Comment");
    this.setHelpUrl("");
  },
};
pythonGenerator.forBlock['rb_builtin_comment'] = function(block) {
  let comment_text = block.getFieldValue('COMMENT');

  const lines = comment_text.split('\n');
  let formatted_comment = '';
  
  if (lines.length > 0) {
    // 第一行作為主要 Comment 內容
    formatted_comment = `Comment${robot_indent}${lines[0]}`;
    // 從第二行開始，每行前面添加 "..."
    for (let i = 1; i < lines.length; i++) {
      formatted_comment += `\n...${robot_indent}${robot_indent}${lines[i]}`;
    }
  } else {
    formatted_comment = `Comment${robot_indent}`;
  }
  
  return formatted_comment + '\n';
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
    this.setTooltip("BuiltIn: Evaluate");
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

// BuiltIn: Repeat Keyword
Blockly.Blocks['rb_builtin_repeat_keyword'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Repeat Keyword")
    
    this.appendValueInput("repeats")
      .appendField("Repeat：")
      .setCheck(null);
    
    this.appendValueInput("keyword")
      .appendField("KeyWord：")
      .setCheck(null);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Repeat Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Repeat%20Keyword");
  }
};

pythonGenerator.forBlock['rb_builtin_repeat_keyword'] = function(block) {
  let repeats = pythonGenerator.valueToCode(block, 'repeats', pythonGenerator.ORDER_ATOMIC) || '';
  repeats = robotFormate(repeats)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Repeat Keyword`;
  code += `${repeats ? `${robot_indent}${repeats}`:``}`
  code += `${keyword ? `${robot_indent}${keyword}`:``}`
  
  code += '\n'
  return code;
};

// BuiltIn: Sleep
Blockly.Blocks['rb_builtin_sleep'] = {
  init: function() {
    this.appendValueInput("time")
      .appendField("Sleep ")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" reason= ")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Sleep");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Sleep");
  }
};

pythonGenerator.forBlock['rb_builtin_sleep'] = function(block) {
  let time = pythonGenerator.valueToCode(block, 'time', pythonGenerator.ORDER_ATOMIC) || '';
  time = robotFormate(time, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Sleep`;
  code += `${time ? `${robot_indent}${time}`:``}`
  code += `${message ? `${robot_indent}reason=${message}`:``}`
  code += '\n'
  return code;
};