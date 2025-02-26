import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
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