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

// Collections: Copy Dictionary
Blockly.Blocks['rbl_collections_copy_dictionary'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Copy Dictionary');

    this.appendValueInput('dictionary_container')
      .setCheck('Variable');
    
    this.appendDummyInput('options_container')
      .appendField('deep_copy=')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "deep_copy_arg")
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Copy Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Copy%20Dictionary');
  }
};

pythonGenerator.forBlock['rbl_collections_copy_dictionary'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'dictionary_container', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)
  
  let deep_copy_arg = block.getFieldValue('deep_copy_arg') || '';

  let code = `Copy Dictionary`
  code += `${ variable ? `${robot_indent}${variable}` : '' }`;
  code += `${ deep_copy_arg ? `${robot_indent}deep_copy=${deep_copy_arg}` : '' }`;
  code += '\n';

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get Dictionary Items
Blockly.Blocks['rbl_collections_get_dictionary_items'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Dictionary Items');
      
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendDummyInput('option_container')
      .appendField(' sort_keys：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "sort_keys_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get Dictionary Items');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20Dictionary%20Items');
  }
};

pythonGenerator.forBlock['rbl_collections_get_dictionary_items'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let sort_keys = block.getFieldValue('sort_keys_arg') || '';

  let code = `Get Dictionary Items`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${sort_keys ? `${robot_indent}sort_keys=${sort_keys}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get Dictionary Keys
Blockly.Blocks['rbl_collections_get_dictionary_keys'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Dictionary Keys');
      
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendDummyInput('option_container')
      .appendField(' sort_keys：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "sort_keys_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get Dictionary Keys');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20Dictionary%20Keys');
  }
};

pythonGenerator.forBlock['rbl_collections_get_dictionary_keys'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let sort_keys = block.getFieldValue('sort_keys_arg') || '';

  let code = `Get Dictionary Keys`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${sort_keys ? `${robot_indent}sort_keys=${sort_keys}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get Dictionary Values
Blockly.Blocks['rbl_collections_get_dictionary_values'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get Dictionary Values');
      
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendDummyInput('option_container')
      .appendField(' sort_keys：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "sort_keys_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get Dictionary Values');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20Dictionary%20Values');
  }
};

pythonGenerator.forBlock['rbl_collections_get_dictionary_values'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let sort_keys = block.getFieldValue('sort_keys_arg') || '';

  let code = `Get Dictionary Values`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${sort_keys ? `${robot_indent}sort_keys=${sort_keys}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Get From Dictionary
Blockly.Blocks['rbl_collections_get_from_dictionary'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Get From Dictionary');
      
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('key_container')
      .appendField('Key：')
      .setCheck('Variable');
    
    this.appendValueInput('default_value_container')
      .appendField('Default Value：')
      .setCheck(null);

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Get From Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Get%20From%20Dictionary');
  }
};

pythonGenerator.forBlock['rbl_collections_get_from_dictionary'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let key = pythonGenerator.valueToCode(block, 'key_container', pythonGenerator.ORDER_ATOMIC) || '';
  key = robotFormate(key, '|', default_indent)

  let default_value = pythonGenerator.valueToCode(block, 'default_value_container', pythonGenerator.ORDER_ATOMIC) || '';
  default_value = robotFormate(default_value, '|', default_indent)

  let code = `Get From Dictionary`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${key ? `${robot_indent}${key}` : ''}`;
  code += `${default_value ? `${robot_indent}default=${default_value}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Keep In Dictionary
Blockly.Blocks['rbl_collections_keep_in_dictionary'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Keep In Dictionary');
      
    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('keys_container')
      .appendField('Keys：')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Keep In Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Keep%20In%20Dictionary');
  }
};

pythonGenerator.forBlock['rbl_collections_keep_in_dictionary'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let keys = pythonGenerator.valueToCode(block, 'keys_container', pythonGenerator.ORDER_ATOMIC) || '';
  keys = robotFormate(keys, '|', robot_indent)

  let code = `Keep In Dictionary`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${keys ? `${robot_indent}${keys}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Pop From Dictionary
Blockly.Blocks['rbl_collections_pop_from_dictionary'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Pop From Dictionary');

    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('key_container')
      .appendField('Key：')
      .setCheck('Variable');
    
    this.appendValueInput('default_value_container')
      .appendField('Default Value：')
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Pop From Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Pop%20From%20Dictionary');
  }
};

pythonGenerator.forBlock['rbl_collections_pop_from_dictionary'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let key = pythonGenerator.valueToCode(block, 'key_container', pythonGenerator.ORDER_ATOMIC) || '';
  key = robotFormate(key, '|', default_indent)

  let default_value = pythonGenerator.valueToCode(block, 'default_value_container', pythonGenerator.ORDER_ATOMIC) || '';
  default_value = robotFormate(default_value, '|', default_indent)

  let code = `Pop From Dictionary`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${key ? `${robot_indent}${key}` : ''}`;
  code += `${default_value ? `${robot_indent}default=${default_value}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Collections: Remove From Dictionary
Blockly.Blocks['rbl_collections_remove_from_dictionary'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Remove From Dictionary');

    this.appendValueInput('dict_container')
      .setCheck('Variable');
    
    this.appendValueInput('key_container')
      .appendField('Keys：')
      .setCheck('Variable');
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Remove From Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Remove%20From%20Dictionary');
  }
};

pythonGenerator.forBlock['rbl_collections_remove_from_dictionary'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent)

  let keys = pythonGenerator.valueToCode(block, 'key_container', pythonGenerator.ORDER_ATOMIC) || '';
  keys = robotFormate(keys, '|', robot_indent)

  let code = `Remove From Dictionary`
  code += `${dict ? `${robot_indent}${dict}` : ''}`;
  code += `${keys ? `${robot_indent}${keys}` : ''}`;
  code += '\n';
  return code;
};

// Collections: Set To Dictionary
Blockly.Blocks['rbl_collections_set_to_dictionary'] = {
  init: function() {
    this.keyValueCount_ = 1;
    
    this.appendValueInput('dict_container')
      .appendField('Set To Dictionary')
      .setCheck('Variable');
    
    this.appendDummyInput("buttons")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addKeyValue_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeKeyValue_();
      }));
    
    this.appendValueInput('key_value_container0')
      .appendField('Key or Value：')
      .setCheck('Variable');
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('BuiltIn: Set To Dictionary');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Collections.html#Set%20To%20Dictionary');
  },
  
  // 保存狀態
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('keyvalues', this.keyValueCount_);
    return container;
  },

  // 從 DOM 讀取狀態
  domToMutation: function(xmlElement) {
    this.keyValueCount_ = parseInt(xmlElement.getAttribute('keyvalues'), 10) || 1;
    this.updateShape_();
  },
  
  updateShape_: function() {
    // 移除所有現有的 key-value 輸入
    for (let i = 0; this.getInput('key_value_container' + i); i++) {
      this.removeInput('key_value_container' + i);
    }

    for (let i = 0; i < this.keyValueCount_; i++) {
      this.appendValueInput('key_value_container' + i)
          .appendField('Key or Value：')
          .setCheck('Variable');
    }
  },

  addKeyValue_: function() {
    this.keyValueCount_++;
    this.updateShape_();
  },
  
  removeKeyValue_: function() {
    if (this.keyValueCount_ > 1) {
      this.keyValueCount_--;
      this.updateShape_();
    }
  }
};

pythonGenerator.forBlock['rbl_collections_set_to_dictionary'] = function(block) {
  let dict = pythonGenerator.valueToCode(block, 'dict_container', pythonGenerator.ORDER_ATOMIC) || '';
  dict = robotFormate(dict, '|', default_indent);

  let code = `Set To Dictionary`;
  code += `${dict ? `${robot_indent}${dict}` : ''}`;

  for (let i = 0; i < block.keyValueCount_; i++) {
    let key_value = pythonGenerator.valueToCode(block, 'key_value_container' + i, pythonGenerator.ORDER_ATOMIC) || '';
    key_value = robotFormate(key_value, '|', default_indent);
    code += `${key_value ? `${robot_indent}${key_value}` : ''}`;
  }
  
  code += '\n';
  return code;
};