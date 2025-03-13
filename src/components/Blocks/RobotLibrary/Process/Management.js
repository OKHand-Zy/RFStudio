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

// Process: Start Process
Blockly.Blocks['rb_process_start_process'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendDummyInput('title')
      .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
      .appendField('Start Process');
    
    this.appendValueInput('command_container')
      .appendField('Command:')
      .setCheck('Variable');
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField('Argument:')
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Start Process');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Start%20Process');
    
    this.setOnChange(function(changeEvent) {
      // If block is moved or field changed, update checkbox state
      if (changeEvent.type === Blockly.Events.BLOCK_MOVE ||
          changeEvent.type === Blockly.Events.BLOCK_CHANGE) {
        this.updateCheckboxState();
      }
      
      // If checkbox changed, update shape
      if (changeEvent.type === Blockly.Events.BLOCK_CHANGE &&
          changeEvent.element === 'field' &&
          changeEvent.name === 'IS_STATEMENT') {
        this.updateShape_();
      }
    });
  },
  
  // Validate checkbox change
  validateCheckboxChange: function(newValue) {
    const block = this.getSourceBlock();
    
    // If already connected, reject change
    if (block && (
      (block.previousConnection && block.previousConnection.isConnected()) || 
      (block.nextConnection && block.nextConnection.isConnected()) ||
      (block.outputConnection && block.outputConnection.isConnected())
    )) {
      return null;
    }

    return newValue;
  },
  
  // Update checkbox state
  updateCheckboxState: function() {
    const checkbox = this.getField('IS_STATEMENT');
    if (checkbox) {
      const isConnected = (this.previousConnection && this.previousConnection.isConnected()) || 
        (this.nextConnection && this.nextConnection.isConnected()) ||
        (this.outputConnection && this.outputConnection.isConnected());
      
      checkbox.setEnabled(!isConnected);
    }
  },
  
  // Save state
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('arguments', this.argumentCount_);
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    container.setAttribute('statement', isStatement);
    return container;
  },

  // Load state from DOM
  domToMutation: function(xmlElement) {
    this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10) || 1;
    var isStatement = xmlElement.getAttribute('statement') === 'true';
    this.setFieldValue(isStatement ? 'TRUE' : 'FALSE', 'IS_STATEMENT');
    this.rebuildBlock_();
  },
  
  rebuildBlock_: function() {
    // First update the shape based on the checkbox
    this.updateBlockShape_();
    // Then update the arguments
    this.updateArgumentsShape_();
  },
  
  updateShape_: function() {
    // First update the shape based on the checkbox
    this.updateBlockShape_();
    // Preserve the arguments
    this.updateArgumentsShape_();
  },
  
  updateBlockShape_: function() {
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    
    if (isStatement) {
      this.setOutput(true, null);
      this.setPreviousStatement(false);
      this.setNextStatement(false);
    } else {
      this.setOutput(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  },
  
  updateArgumentsShape_: function() {
    // Remove all existing argument inputs
    for (let i = 0; this.getInput('argument' + i); i++) {
      this.removeInput('argument' + i);
    }
    
    // Rebuild argument inputs
    for (let i = 0; i < this.argumentCount_; i++) {
      this.appendValueInput('argument' + i)
          .appendField('Argument:')
          .setCheck(null);
    }
  },

  addArgument_: function() {
    this.argumentCount_++;
    this.updateArgumentsShape_();
  },
  
  removeArgument_: function() {
    if (this.argumentCount_ > 1) {
      this.argumentCount_--;
      this.updateArgumentsShape_();
    }
  }
};

pythonGenerator.forBlock['rb_process_start_process'] = function(block) {
  const isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  let command = pythonGenerator.valueToCode(block, 'command_container', pythonGenerator.ORDER_ATOMIC) || '';
  command = robotFormate(command, '|', default_indent)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    args.push(arg);
  }
  
  let code = `Start Process`;
  code += `${command ? `${robot_indent}${command}` : ''}`;
  
  if (args.length > 0) {
    args.forEach(arg => {
      if (arg) {
        code += `${robot_indent}${arg}`;
      }
    });
  }
  code += '\n';
  
  if (!isStatement) {
    return code;
  } else {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  }
};

// Process: Run Process
Blockly.Blocks['rb_process_run_process'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendDummyInput('title')
      .appendField('Run Process');
    
    this.appendValueInput('command_container')
      .appendField('Command:')
      .setCheck('Variable');
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField('Argument:')
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Run Process');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Run%20Process');
  },
  
  // Save state
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('arguments', this.argumentCount_);
    return container;
  },

  // Load state from DOM
  domToMutation: function(xmlElement) {
    this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10) || 1;
    this.updateArgumentsShape_();
  },
  
  updateArgumentsShape_: function() {
    // Remove all existing argument inputs
    for (let i = 0; this.getInput('argument' + i); i++) {
      this.removeInput('argument' + i);
    }
    
    // Rebuild argument inputs
    for (let i = 0; i < this.argumentCount_; i++) {
      this.appendValueInput('argument' + i)
          .appendField('Argument:')
          .setCheck(null);
    }
  },

  addArgument_: function() {
    this.argumentCount_++;
    this.updateArgumentsShape_();
  },
  
  removeArgument_: function() {
    if (this.argumentCount_ > 1) {
      this.argumentCount_--;
      this.updateArgumentsShape_();
    }
  }
};

pythonGenerator.forBlock['rb_process_run_process'] = function(block) {
  let command = pythonGenerator.valueToCode(block, 'command_container', pythonGenerator.ORDER_ATOMIC) || '';
  command = robotFormate(command, '|', default_indent)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    args.push(arg);
  }
  
  let code = `Start Process`;
  code += `${command ? `${robot_indent}${command}` : ''}`;
  
  if (args.length > 0) {
    args.forEach(arg => {
      if (arg) {
        code += `${robot_indent}${arg}`;
      }
    });
  }
  code += '\n';

  return [code, pythonGenerator.ORDER_ATOMIC];
}

// Process: Terminate Process
Blockly.Blocks['rb_process_terminate_process'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Terminate Process');

    this.appendValueInput('process_pid_container')
      .appendField('Process Id:')
    
    this.appendDummyInput("option_container")
      .appendField(' kill：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "kill_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Terminate Process');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Terminate%20Process');
  }
};

pythonGenerator.forBlock['rb_process_terminate_process'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', default_indent)

  let kill_arg = block.getFieldValue('kill_arg') || '';

  let code = `Terminate Process`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += `${kill_arg ? `${robot_indent}kill=${kill_arg}` : ''}`;
  code += '\n';
  return code;
};

// Process: Terminate All Processes
Blockly.Blocks['rb_process_terminate_all_processes'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Terminate All Processes');

    this.appendDummyInput("option_container")
      .appendField(' kill：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "kill_all_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Terminate All Processes');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Terminate%20All%20Processes');
  }
};

pythonGenerator.forBlock['rb_process_terminate_all_processes'] = function(block) {
  let kill_all_arg = block.getFieldValue('kill_all_arg') || '';

  let code = `Terminate All Processes`;
  code += `${kill_all_arg ? `${robot_indent}kill=${kill_all_arg}` : ''}`;
  code += '\n';
  return code;
};

// Process: Wait For Process
Blockly.Blocks['rb_process_wait_for_process'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Wait For Process');

    this.appendValueInput('process_pid_container')
      .appendField('Process Id:')
    
    this.appendValueInput('timeout_container')
      .appendField('Timeout:')

    this.appendDummyInput("option_container")
      .appendField(' On_Timeout：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["continue", "continue"],
        ["terminate", "terminate"],
        ["kill", "kill"],
      ]), "on_timeout_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Wait For Process');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Wait%20For%20Process');
  }
};

pythonGenerator.forBlock['rb_process_wait_for_process'] = function(block) {
  let process_pid = pythonGenerator.valueToCode(block, 'process_pid_container', pythonGenerator.ORDER_ATOMIC) || '';
  process_pid = robotFormate(process_pid, '|', default_indent)

  let timeout = pythonGenerator.valueToCode(block, 'timeout_container', pythonGenerator.ORDER_ATOMIC) || '';
  timeout = robotFormate(timeout, '|', default_indent)

  let on_timeout_arg = block.getFieldValue('on_timeout_arg') || '';

  let code = `Wait For Process`;
  code += `${process_pid ? `${robot_indent}${process_pid}` : ''}`;
  code += `${timeout ? `${robot_indent}timeout=${timeout}` : ''}`;
  code += `${on_timeout_arg ? `${robot_indent}on_timeout=${on_timeout_arg}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Process: Switch Process
Blockly.Blocks['rb_process_switch_process'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Switch Process');

    this.appendValueInput('process_container')
      .appendField('Process:')

    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Switch Process');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Switch%20Process');
  }
};

pythonGenerator.forBlock['rb_process_switch_process'] = function(block) {
  let process = pythonGenerator.valueToCode(block, 'process_container', pythonGenerator.ORDER_ATOMIC) || '';
  process = robotFormate(process, '|', default_indent)

  let code = `Switch Process`;
  code += `${process ? `${robot_indent}${process}` : ''}`;
  code += '\n';
  return code;
}

// Process: Send Signal To Process
Blockly.Blocks['rb_process_send_signal_to_process'] = {
  init: function() {
    this.appendDummyInput('title')
      .appendField('Send Signal To Process');

    this.appendValueInput('signal_container')
      .appendField('Signal:')
    
    this.appendValueInput('process_container')
      .appendField('Process Id:')
    
    this.appendDummyInput("option_container")
      .appendField(' group：')
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "group_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip('Process: Send Signal To Process');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/Process.html#Send%20Signal%20To%20Process');
  }
};

pythonGenerator.forBlock['rb_process_send_signal_to_process'] = function(block) {
  let signal = pythonGenerator.valueToCode(block, 'signal_container', pythonGenerator.ORDER_ATOMIC) || '';
  signal = robotFormate(signal, '|', default_indent)

  let process = pythonGenerator.valueToCode(block, 'process_container', pythonGenerator.ORDER_ATOMIC) || '';
  process = robotFormate(process, '|', default_indent)

  let group_arg = block.getFieldValue('group_arg') || '';

  let code = `Send Signal To Process`;
  code += `${signal ? `${robot_indent}${signal}` : ''}`;
  code += `${process ? `${robot_indent}${process}` : ''}`;
  code += `${group_arg ? `${robot_indent}group=${group_arg}` : ''}`;
  code += '\n';
  return code;
}