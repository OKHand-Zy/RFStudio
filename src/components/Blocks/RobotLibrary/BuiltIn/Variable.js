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
          ["default", ""],
          ["False", "False"],
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

// BuiltIn: Set Global Variable
Blockly.Blocks['rb_builtin_set_global_variable'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Set Global Variable ")

    this.appendValueInput("variable")
      .appendField("Variable：")
      .setCheck("Variable")
    
    this.appendValueInput("value")
      .appendField("Value：")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Global Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Global%20Variable");
  }
};

pythonGenerator.forBlock['rb_builtin_set_global_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)
  
  let value = pythonGenerator.valueToCode(block, 'value', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  
  let code = `Set Global Variable`
  code += `${variable ? `${robot_indent}${variable}`:``}`
  code += `${value ? `${robot_indent}${value}\n`:`\n`}`
  
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

// BuiltIn: Set Local Variable
Blockly.Blocks['rb_builtin_set_local_variable'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Set Local Variable ")
    
      this.appendValueInput("variable")
      .appendField("Variable：")
      .setCheck("Variable")
    
    this.appendValueInput("value")
      .appendField("Value：")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Local Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Local%20Variable");
  }
};

pythonGenerator.forBlock['rb_builtin_set_local_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)
  
  let value = pythonGenerator.valueToCode(block, 'value', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  
  let code = `Set Local Variable`
  code += `${variable ? `${robot_indent}${variable}`:``}`
  code += `${value ? `${robot_indent}${value}\n`:`\n`}`
  
  return code;
};

// BuiltIn: Set Suite Variable
Blockly.Blocks['rb_builtin_set_suite_variable'] = {
  init: function() {
    this.valueCount_ = 1;
    
    this.appendDummyInput("title")
      .appendField("Set Suite Variable ")
      

    this.appendValueInput("variable")
      .appendField("Variable：")
      .setCheck("Variable");
    
    this.appendDummyInput("addValue")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addValue_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeValue_();
      }));
    
    this.appendValueInput("value0")
      .appendField("Value：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Suite Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Suite%20Variable");
  },
  
  // Save state
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('values', this.valueCount_);
    return container;
  },

  // Load state from DOM
  domToMutation: function(xmlElement) {
    this.valueCount_ = parseInt(xmlElement.getAttribute('values'), 10) || 1;
    this.updateShape_();
  },
  
  // Update block appearance
  updateShape_: function() {
    // Remove all existing value inputs
    for (let i = 0; this.getInput('value' + i); i++) {
      this.removeInput('value' + i);
    }
    
    // Rebuild value inputs
    for (let i = 0; i < this.valueCount_; i++) {
      this.appendValueInput('value' + i)
          .appendField('Value：')
          .setCheck(null);
    }
  },

  addValue_: function() {
    this.valueCount_++;
    this.updateShape_();
  },
  
  removeValue_: function() {
    if (this.valueCount_ > 1) {
      this.valueCount_--;
      this.updateShape_();
    }
  }
};

pythonGenerator.forBlock['rb_builtin_set_suite_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)

  let values = [];
  for (let i = 0; this.getInput('value' + i); i++) {
    let value = pythonGenerator.valueToCode(block, 'value' + i, pythonGenerator.ORDER_ATOMIC) || '';
    value = robotFormate(value, '|', default_indent)
    values.push(value);
  }

  let code = `Set Suite Variable`
  code += `${variable ? `${robot_indent}${variable}`:``}`
  code += `${values ? `${robot_indent}${values.join(robot_indent)}\n`:`\n`}`
  
  return code;
};

// BuiltIn: Set Task Variable
Blockly.Blocks['rb_builtin_set_task_variable'] = {
  init: function() {
    this.appendValueInput("variable")
      .appendField("Set Task Variable ")
      .setCheck("Variable")
    
    this.appendValueInput("value")
      .appendField("Value：")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Task Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Task%20Variable");
  }
};

pythonGenerator.forBlock['rb_builtin_set_task_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)
  
  let value = pythonGenerator.valueToCode(block, 'value', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  
  let code = `Set Task Variable`
  code += `${variable ? `${robot_indent}${variable}`:``}`
  code += `${value ? `${robot_indent}${value}\n`:`\n`}`
  
  return code;
};

// BuiltIn: Set Test Variable
Blockly.Blocks['rb_builtin_set_test_variable'] = {
  init: function() {
    this.appendValueInput("variable")
      .appendField("Set Test Variable ")
      .setCheck("Variable")
    
    this.appendValueInput("value")
      .appendField("Value：")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Test Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Test%20Variable");
  }
};

pythonGenerator.forBlock['rb_builtin_set_test_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)
  
  let value = pythonGenerator.valueToCode(block, 'value', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  
  let code = `Set Test Variable`
  code += `${variable ? `${robot_indent}${variable}`:``}`
  code += `${value ? `${robot_indent}${value}\n`:`\n`}`
  
  return code;
};

// BuiltIn: Set Variable
Blockly.Blocks['rb_builtin_set_variable'] = {
  init: function() {
    this.appendValueInput("variable")
      .appendField("Set Variable ")
      .setCheck("Variable")
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Variable");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Variable");
  }
};

pythonGenerator.forBlock['rb_builtin_set_variable'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', default_indent)

  let code = `Set Variable`
  code += `${variable ? `${robot_indent}${variable}\n`:`\n`}`
  
  return code;
};

// BuitIn: Set Variable If
Blockly.Blocks['rb_builtin_set_variable_if'] = {
  init: function() {
    // Add control buttons at the top
    this.appendDummyInput("control_buttons")
      .appendField(new Blockly.FieldImage(
        plusImage,15, 15, { alt: "+", flipRtl: false }
      ), 'ADD_CONDITION')
      .appendField(new Blockly.FieldImage(
        minusImage,15, 15, { alt: "-", flipRtl: false }
      ), 'REMOVE_CONDITION')
      

    // First row - condition input
    this.appendValueInput("condition0")
      .appendField("Set Variable If ")
      .setCheck(null);
    
    // First row - true value input
    this.appendValueInput("t_value0")
      .appendField("IF True：")
      .setCheck("Variable");
    
    // First row - false value input
    this.appendValueInput("f_value0")
      .appendField("IF False：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Set Variable If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Variable%20If");

    this.conditionCount = 1;

    this.getField('ADD_CONDITION').setOnClickHandler(this.addCondition.bind(this));
    this.getField('REMOVE_CONDITION').setOnClickHandler(this.removeCondition.bind(this));
  },
  
  addCondition: function() {

    this.conditionCount++;
    const index = this.conditionCount - 1;

    this.appendValueInput("condition" + index)
      .appendField("ELSE IF ");
      
    this.appendValueInput("t_value" + index)
      .appendField("IF True：")
      .setCheck("Variable");
      
    this.appendValueInput("f_value" + index)
      .appendField("IF False：")
      .setCheck(null);

    this.reorganizeBlock();
  },
  
  removeCondition: function() {
    if (this.conditionCount <= 1) return;
    const index = this.conditionCount - 1;

    this.removeInput('condition' + index);
    this.removeInput('t_value' + index);
    this.removeInput('f_value' + index);
    
    this.conditionCount--;

    this.reorganizeBlock();
  },
  
  reorganizeBlock: function() {
    this.updateShape_();
  },

  updateShape_: function() {
    
  },
  
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('conditions', this.conditionCount);
    return container;
  },

  domToMutation: function(xmlElement) {
    var conditionCount = parseInt(xmlElement.getAttribute('conditions'), 10) || 1;
    
    // Restore the saved condition rows
    for (var i = 1; i < conditionCount; i++) {
      this.addCondition();
    }
  }
};

pythonGenerator.forBlock['rb_builtin_set_variable_if'] = function(block) {
  const conditionCount = block.conditionCount || 1;

  let code = `Set Variable If${robot_indent}`;

  for (let i = 0; i < conditionCount; i++) {
    let condition = pythonGenerator.valueToCode(
      block, 'condition' + i, pythonGenerator.ORDER_NONE
    ) || '';
    condition = robotFormate(condition, '|', default_indent)
    
    let trueValue = pythonGenerator.valueToCode(
      block, 't_value' + i, pythonGenerator.ORDER_NONE
    ) || '';
    trueValue = robotFormate(trueValue, '|', default_indent)
    
    let falseValue = pythonGenerator.valueToCode(
      block, 'f_value' + i, pythonGenerator.ORDER_NONE
    ) || '';
    falseValue = robotFormate(falseValue, '|', default_indent)

    if (i === 0) {
      code += `${condition}${robot_indent}${trueValue}${robot_indent}${falseValue}`;
    } else {
      code += `...${robot_indent}${condition}${robot_indent}${trueValue}${robot_indent}${falseValue}`;
    }

    if (i < conditionCount - 1) {
      code += '\n';
    }
  }

  return code;
};

// BuiltIn: Variable Should Exist
Blockly.Blocks['rb_builtin_variable_should_exist'] = {
  init: function() {
    this.appendValueInput("variable")
      .appendField("Variable Should Exist ")
      .setCheck("Variable")
    
    this.appendValueInput("message")
      .appendField(" msg= ")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Variable Should Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Variable%20Should%20Exist");
  }
};

pythonGenerator.forBlock['rb_builtin_variable_should_exist'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Variable Should Exist`
  code += `${variable ? `${robot_indent}${variable}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Variable Should Not Exist
Blockly.Blocks['rb_builtin_variable_should_not_exist'] = {
  init: function() {
    this.appendValueInput("variable")
      .appendField("Variable Should Not Exist ")
      .setCheck("Variable")
    
    this.appendValueInput("message")
      .appendField(" msg= ")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Variable Should Not Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Variable%20Should%20Not%20Exist");
  }
};

pythonGenerator.forBlock['rb_builtin_variable_should_not_exist'] = function(block) {
  let variable = pythonGenerator.valueToCode(block, 'variable', pythonGenerator.ORDER_ATOMIC) || '';
  variable = robotFormate(variable, '|', robot_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let code = `Variable Should Not Exist`
  code += `${variable ? `${robot_indent}${variable}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += '\n'
  return code;
};