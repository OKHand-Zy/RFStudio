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
          ["default", ""],
          ["False", "False"],
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

// BuiltIn: Set Library Search Order
Blockly.Blocks['rb_builtin_set_library_search_order'] = {
  init: function() {
    this.appendValueInput("library_container")
      .appendField("Set Library Search Order ")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Library Search Order");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Library%20Search%20Order");
  }
};

pythonGenerator.forBlock['rb_builtin_set_library_search_order'] = function(block) {
  let librarys = pythonGenerator.valueToCode(block, 'library_container', pythonGenerator.ORDER_ATOMIC) || '';
  librarys = robotFormate(librarys, '|', robot_indent)

  let code = `Set Library Search Order`
  code += `${librarys ? `${robot_indent}${librarys}`:``}`

  return code;
};