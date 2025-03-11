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

// Collections: Convert To Dictionary
const Convert_To_Dictionary_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasKeys', this.hasKeys_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasKeys_ = xmlElement.getAttribute('hasKeys') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('convert_to_dictionary_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasKeys_) {
      const keysBlock = workspace.newBlock('convert_to_dictionary_keys_item');
      keysBlock.initSvg();
      connection.connect(keysBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {
    // Check if there's a keys_item block connected
    const keysBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasKeys_ = keysBlock && keysBlock.type === 'convert_to_dictionary_keys_item';
    
    this.updateShape_();
  }
};

// Define the container block for the mutator
Blockly.Blocks['convert_to_dictionary_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Convert To Dictionary");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Container for mutator settings.");
  }
};

// Define the keys item block for the mutator
Blockly.Blocks['convert_to_dictionary_keys_item'] = {
  init: function() {
    this.appendDummyInput('keys_value')
      .appendField("arg:keys")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

// Update the main block to use the mutator
Blockly.Blocks['rbl_collections_convert_to_dictionary'] = {
  init: function() {
    this.containerBlockType = 'convert_to_dictionary_container';
    this.itemBlockTypes = ['convert_to_dictionary_keys_item'];
    this.hasKeys_ = false;

    this.appendDummyInput('title')
      .appendField('Convert To Dictionary');

    this.appendValueInput('convert_container')
      .setCheck('Variable')
      
    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Convert To Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Convert%20To%20Dictionary');
  },

  updateShape_: function() {
    // Remove the keys input if it exists
    if (this.getInput('key_container')) {
      this.removeInput('key_container');
    }

    if (this.hasKeys_) {
      this.appendValueInput('key_container')
        .setCheck('Variable')
        .appendField('key：');
    }
  },

  ...Convert_To_Dictionary_MutatorMixin
};

// Define the code generator
pythonGenerator.forBlock['rbl_collections_convert_to_dictionary'] = function(block) {
  let item = pythonGenerator.valueToCode(block, 'convert_container', pythonGenerator.ORDER_ATOMIC) || '';
  item = robotFormate(item, '|', default_indent)

  let code = `Convert To Dictionary`
  code += `${robot_indent}${item}`;

  if (block.hasKeys_) {
    let keys = pythonGenerator.valueToCode(block, 'key_container', pythonGenerator.ORDER_ATOMIC) || '';
    keys = robotFormate(keys, '|', default_indent)
    if (keys) {
      code += `${robot_indent}${keys}`;
    }
  }

  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Convert To List
Blockly.Blocks['rbl_collections_convert_to_list'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Convert To List');

    this.appendValueInput('convert_container')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Convert To List');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Convert%20To%20List');
  }
};

pythonGenerator.forBlock['rbl_collections_convert_to_list'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'convert_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)
  let code = `Convert To List`
  code += `${ variable ? `${robot_indent}${variable}` : '' }\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};