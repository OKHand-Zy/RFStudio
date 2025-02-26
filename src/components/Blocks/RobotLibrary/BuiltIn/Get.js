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

