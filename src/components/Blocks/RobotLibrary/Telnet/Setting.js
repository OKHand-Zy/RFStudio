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

// Telnet: Set Timeout
Blockly.Blocks['rb_telnet_set_timeout'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
      .appendField("Set Timeout");

    this.appendValueInput("timeout_container")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Set Timeout");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Set%20Timeout");

    this.setOnChange(function(changeEvent) {
      // 如果是移動或欄位變更，更新 checkbox 狀態
      if (changeEvent.type === Blockly.Events.BLOCK_MOVE ||
          changeEvent.type === Blockly.Events.BLOCK_CHANGE) {
        this.updateCheckboxState();
      }
      
      // 如果 checkbox 變更，更新形狀
      if (changeEvent.type === Blockly.Events.BLOCK_CHANGE &&
          changeEvent.element === 'field' &&
          changeEvent.name === 'IS_STATEMENT') {
        this.updateShape_();
      }
    });
  },
  
  // 驗證 checkbox 變更
  validateCheckboxChange: function(newValue) {
    const block = this.getSourceBlock();
    
    // 如果已連接，拒絕變更
    if (block && (
      (block.previousConnection && block.previousConnection.isConnected()) || 
      (block.nextConnection && block.nextConnection.isConnected()) ||
      (block.outputConnection && block.outputConnection.isConnected())
    )) {
      return null;
    }

    return newValue;
  },
  
  // 更新 checkbox 狀態
  updateCheckboxState: function() {
    const checkbox = this.getField('IS_STATEMENT');
    if (checkbox) {
      const isConnected = (this.previousConnection && this.previousConnection.isConnected()) || 
        (this.nextConnection && this.nextConnection.isConnected()) ||
        (this.outputConnection && this.outputConnection.isConnected());
      
      checkbox.setEnabled(!isConnected);
    }
  },
  
  // 更新形狀
  updateShape_: function() {
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
  
  // 序列化
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    container.setAttribute('statement', isStatement);
    return container;
  },
  
  // 反序列化
  domToMutation: function(xmlElement) {
    var isStatement = xmlElement.getAttribute('statement') === 'true';
    this.setFieldValue(isStatement ? 'TRUE' : 'FALSE', 'IS_STATEMENT');
    this.updateShape_();
  }
};

pythonGenerator.forBlock['rb_telnet_set_timeout'] = function(block) {
  let isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  let timeout = pythonGenerator.valueToCode(block, 'timeout_container', pythonGenerator.ORDER_ATOMIC) || '';
  timeout = robotFormate(timeout, '|', default_indent)

  let code = `Set Timeout`;
  code += `${timeout ? `${robot_indent}${timeout}` : ''}`;
  code += '\n';

  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// Telnet: Set Prompt
Blockly.Blocks['rb_telnet_set_prompt'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
      .appendField("Set Prompt");

    this.appendValueInput("prompt_container")
      .setCheck("Variable");
    
    this.appendDummyInput("option_container")
      .appendField("Prompt is Regexp：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "prompt_is_regexp_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Set Prompt");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Set%20Prompt");

    this.setOnChange(function(changeEvent) {
      // 如果是移動或欄位變更，更新 checkbox 狀態
      if (changeEvent.type === Blockly.Events.BLOCK_MOVE ||
          changeEvent.type === Blockly.Events.BLOCK_CHANGE) {
        this.updateCheckboxState();
      }
      
      // 如果 checkbox 變更，更新形狀
      if (changeEvent.type === Blockly.Events.BLOCK_CHANGE &&
          changeEvent.element === 'field' &&
          changeEvent.name === 'IS_STATEMENT') {
        this.updateShape_();
      }
    });
  },
  
  // 驗證 checkbox 變更
  validateCheckboxChange: function(newValue) {
    const block = this.getSourceBlock();
    
    // 如果已連接，拒絕變更
    if (block && (
      (block.previousConnection && block.previousConnection.isConnected()) || 
      (block.nextConnection && block.nextConnection.isConnected()) ||
      (block.outputConnection && block.outputConnection.isConnected())
    )) {
      return null;
    }

    return newValue;
  },
  
  // 更新 checkbox 狀態
  updateCheckboxState: function() {
    const checkbox = this.getField('IS_STATEMENT');
    if (checkbox) {
      const isConnected = (this.previousConnection && this.previousConnection.isConnected()) || 
        (this.nextConnection && this.nextConnection.isConnected()) ||
        (this.outputConnection && this.outputConnection.isConnected());
      
      checkbox.setEnabled(!isConnected);
    }
  },
  
  // 更新形狀
  updateShape_: function() {
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
  
  // 序列化
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    container.setAttribute('statement', isStatement);
    return container;
  },
  
  // 反序列化
  domToMutation: function(xmlElement) {
    var isStatement = xmlElement.getAttribute('statement') === 'true';
    this.setFieldValue(isStatement ? 'TRUE' : 'FALSE', 'IS_STATEMENT');
    this.updateShape_();
  }
};

pythonGenerator.forBlock['rb_telnet_set_prompt'] = function(block) {
  let isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  let prompt = pythonGenerator.valueToCode(block, 'prompt_container', pythonGenerator.ORDER_ATOMIC) || '';
  prompt = robotFormate(prompt, '|', default_indent)

  let prompt_is_regexp_arg = block.getFieldValue('prompt_is_regexp_arg') || '';

  let code = `Set Prompt`;
  code += `${prompt ? `${robot_indent}${prompt}` : ''}`;
  code += `${prompt_is_regexp_arg ? `${robot_indent}prompt_is_regexp=${prompt_is_regexp_arg}` : ''}`;
  code += '\n';

  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// Telnet: Set Encoding
Blockly.Blocks['rb_telnet_set_encoding'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
      .appendField("Set Encoding");

    this.appendValueInput("encoding_container")
      .setCheck("Variable");
    
    this.appendValueInput("encoding_errors_container")
      .appendField("Encoding Errors：")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Set Encoding");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Set%20Encoding");

    this.setOnChange(function(changeEvent) {
      // 如果是移動或欄位變更，更新 checkbox 狀態
      if (changeEvent.type === Blockly.Events.BLOCK_MOVE ||
          changeEvent.type === Blockly.Events.BLOCK_CHANGE) {
        this.updateCheckboxState();
      }
      
      // 如果 checkbox 變更，更新形狀
      if (changeEvent.type === Blockly.Events.BLOCK_CHANGE &&
          changeEvent.element === 'field' &&
          changeEvent.name === 'IS_STATEMENT') {
        this.updateShape_();
      }
    });
  },
  
  // 驗證 checkbox 變更
  validateCheckboxChange: function(newValue) {
    const block = this.getSourceBlock();
    
    // 如果已連接，拒絕變更
    if (block && (
      (block.previousConnection && block.previousConnection.isConnected()) || 
      (block.nextConnection && block.nextConnection.isConnected()) ||
      (block.outputConnection && block.outputConnection.isConnected())
    )) {
      return null;
    }

    return newValue;
  },
  
  // 更新 checkbox 狀態
  updateCheckboxState: function() {
    const checkbox = this.getField('IS_STATEMENT');
    if (checkbox) {
      const isConnected = (this.previousConnection && this.previousConnection.isConnected()) || 
        (this.nextConnection && this.nextConnection.isConnected()) ||
        (this.outputConnection && this.outputConnection.isConnected());
      
      checkbox.setEnabled(!isConnected);
    }
  },
  
  // 更新形狀
  updateShape_: function() {
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
  
  // 序列化
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    container.setAttribute('statement', isStatement);
    return container;
  },
  
  // 反序列化
  domToMutation: function(xmlElement) {
    var isStatement = xmlElement.getAttribute('statement') === 'true';
    this.setFieldValue(isStatement ? 'TRUE' : 'FALSE', 'IS_STATEMENT');
    this.updateShape_();
  }
};

pythonGenerator.forBlock['rb_telnet_set_encoding'] = function(block) {
  let isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  let encoding = pythonGenerator.valueToCode(block, 'encoding_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding = robotFormate(encoding, '|', default_indent)

  let encoding_errors = pythonGenerator.valueToCode(block, 'encoding_errors_container', pythonGenerator.ORDER_ATOMIC) || '';
  encoding_errors = robotFormate(encoding_errors, '|', default_indent)

  let code = `Set Encoding`;
  code += `${encoding ? `${robot_indent}${encoding}` : ''}`;
  code += `${encoding_errors ? `${robot_indent}errors=${encoding_errors}` : ''}`;
  code += '\n';
  
  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// Telnet: Set Newline
Blockly.Blocks['rb_telnet_set_newline'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
      .appendField("Set Newline");

    this.appendValueInput("newline_container")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Set Newline");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Set%20Newline");

    this.setOnChange(function(changeEvent) {
      // 如果是移動或欄位變更，更新 checkbox 狀態
      if (changeEvent.type === Blockly.Events.BLOCK_MOVE ||
          changeEvent.type === Blockly.Events.BLOCK_CHANGE) {
        this.updateCheckboxState();
      }
      
      // 如果 checkbox 變更，更新形狀
      if (changeEvent.type === Blockly.Events.BLOCK_CHANGE &&
          changeEvent.element === 'field' &&
          changeEvent.name === 'IS_STATEMENT') {
        this.updateShape_();
      }
    });
  },
  
  // 驗證 checkbox 變更
  validateCheckboxChange: function(newValue) {
    const block = this.getSourceBlock();
    
    // 如果已連接，拒絕變更
    if (block && (
      (block.previousConnection && block.previousConnection.isConnected()) || 
      (block.nextConnection && block.nextConnection.isConnected()) ||
      (block.outputConnection && block.outputConnection.isConnected())
    )) {
      return null;
    }

    return newValue;
  },
  
  // 更新 checkbox 狀態
  updateCheckboxState: function() {
    const checkbox = this.getField('IS_STATEMENT');
    if (checkbox) {
      const isConnected = (this.previousConnection && this.previousConnection.isConnected()) || 
        (this.nextConnection && this.nextConnection.isConnected()) ||
        (this.outputConnection && this.outputConnection.isConnected());
      
      checkbox.setEnabled(!isConnected);
    }
  },
  
  // 更新形狀
  updateShape_: function() {
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
  
  // 序列化
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    container.setAttribute('statement', isStatement);
    return container;
  },
  
  // 反序列化
  domToMutation: function(xmlElement) {
    var isStatement = xmlElement.getAttribute('statement') === 'true';
    this.setFieldValue(isStatement ? 'TRUE' : 'FALSE', 'IS_STATEMENT');
    this.updateShape_();
  }
};

pythonGenerator.forBlock['rb_telnet_set_newline'] = function(block) {
  let isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  let newline = pythonGenerator.valueToCode(block, 'newline_container', pythonGenerator.ORDER_ATOMIC) || '';
  newline = robotFormate(newline, '|', default_indent)

  let code = `Set Newline`;
  code += `${newline ? `${robot_indent}${newline}` : ''}`;
  code += '\n';

  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// Telnet: Set Default Log Level
Blockly.Blocks['rb_telnet_set_default_log_level'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
      .appendField("Set Default Log Level");

    this.appendValueInput("default_log_level_container")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Set Default Log Level");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Set%20Default%20Log%20Level");

    this.setOnChange(function(changeEvent) {
      // 如果是移動或欄位變更，更新 checkbox 狀態
      if (changeEvent.type === Blockly.Events.BLOCK_MOVE ||
          changeEvent.type === Blockly.Events.BLOCK_CHANGE) {
        this.updateCheckboxState();
      }
      
      // 如果 checkbox 變更，更新形狀
      if (changeEvent.type === Blockly.Events.BLOCK_CHANGE &&
          changeEvent.element === 'field' &&
          changeEvent.name === 'IS_STATEMENT') {
        this.updateShape_();
      }
    });
  },
  
  // 驗證 checkbox 變更
  validateCheckboxChange: function(newValue) {
    const block = this.getSourceBlock();
    
    // 如果已連接，拒絕變更
    if (block && (
      (block.previousConnection && block.previousConnection.isConnected()) || 
      (block.nextConnection && block.nextConnection.isConnected()) ||
      (block.outputConnection && block.outputConnection.isConnected())
    )) {
      return null;
    }

    return newValue;
  },
  
  // 更新 checkbox 狀態
  updateCheckboxState: function() {
    const checkbox = this.getField('IS_STATEMENT');
    if (checkbox) {
      const isConnected = (this.previousConnection && this.previousConnection.isConnected()) || 
        (this.nextConnection && this.nextConnection.isConnected()) ||
        (this.outputConnection && this.outputConnection.isConnected());
      
      checkbox.setEnabled(!isConnected);
    }
  },
  
  // 更新形狀
  updateShape_: function() {
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
  
  // 序列化
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    container.setAttribute('statement', isStatement);
    return container;
  },
  
  // 反序列化
  domToMutation: function(xmlElement) {
    var isStatement = xmlElement.getAttribute('statement') === 'true';
    this.setFieldValue(isStatement ? 'TRUE' : 'FALSE', 'IS_STATEMENT');
    this.updateShape_();
  }
};

pythonGenerator.forBlock['rb_telnet_set_default_log_level'] = function(block) {
  let isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  let default_log_level = pythonGenerator.valueToCode(block, 'default_log_level_container', pythonGenerator.ORDER_ATOMIC) || '';
  default_log_level = robotFormate(default_log_level, '|', default_indent)

  let code = `Set Default Log Level`;
  code += `${default_log_level ? `${robot_indent}${default_log_level}` : ''}`;
  code += '\n';

  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// Telnet: Set Telnetlib Log Level
Blockly.Blocks['rb_telnet_set_telnetlib_log_level'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
      .appendField("Set Telnetlib Log Level");

    this.appendValueInput("telnetlib_log_level_container")
      .setCheck("Variable");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Set Telnetlib Log Level");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Set%20Telnetlib%20Log%20Level");

    this.setOnChange(function(changeEvent) {
      // 如果是移動或欄位變更，更新 checkbox 狀態
      if (changeEvent.type === Blockly.Events.BLOCK_MOVE ||
          changeEvent.type === Blockly.Events.BLOCK_CHANGE) {
        this.updateCheckboxState();
      }
      
      // 如果 checkbox 變更，更新形狀
      if (changeEvent.type === Blockly.Events.BLOCK_CHANGE &&
          changeEvent.element === 'field' &&
          changeEvent.name === 'IS_STATEMENT') {
        this.updateShape_();
      }
    });
  },
  
  // 驗證 checkbox 變更
  validateCheckboxChange: function(newValue) {
    const block = this.getSourceBlock();
    
    // 如果已連接，拒絕變更
    if (block && (
      (block.previousConnection && block.previousConnection.isConnected()) || 
      (block.nextConnection && block.nextConnection.isConnected()) ||
      (block.outputConnection && block.outputConnection.isConnected())
    )) {
      return null;
    }

    return newValue;
  },
  
  // 更新 checkbox 狀態
  updateCheckboxState: function() {
    const checkbox = this.getField('IS_STATEMENT');
    if (checkbox) {
      const isConnected = (this.previousConnection && this.previousConnection.isConnected()) || 
        (this.nextConnection && this.nextConnection.isConnected()) ||
        (this.outputConnection && this.outputConnection.isConnected());
      
      checkbox.setEnabled(!isConnected);
    }
  },
  
  // 更新形狀
  updateShape_: function() {
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
  
  // 序列化
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isStatement = this.getFieldValue('IS_STATEMENT') === 'TRUE';
    container.setAttribute('statement', isStatement);
    return container;
  },
  
  // 反序列化
  domToMutation: function(xmlElement) {
    var isStatement = xmlElement.getAttribute('statement') === 'true';
    this.setFieldValue(isStatement ? 'TRUE' : 'FALSE', 'IS_STATEMENT');
    this.updateShape_();
  }
};

pythonGenerator.forBlock['rb_telnet_set_telnetlib_log_level'] = function(block) {
  let isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  let telnetlib_log_level = pythonGenerator.valueToCode(block, 'telnetlib_log_level_container', pythonGenerator.ORDER_ATOMIC) || '';
  telnetlib_log_level = robotFormate(telnetlib_log_level, '|', default_indent)

  let code = `Set Telnetlib Log Level`;
  code += `${telnetlib_log_level ? `${robot_indent}${telnetlib_log_level}` : ''}`;
  code += '\n';

  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};