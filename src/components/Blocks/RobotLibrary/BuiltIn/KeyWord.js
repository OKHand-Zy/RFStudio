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

// BuiltIn: Return From Keyword
Blockly.Blocks['rb_builtin_return_from_keyword'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Return From Keyword")
      .setCheck("Variable")
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("BuiltIn: Return From Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Return%20From%20Keyword");
  }
};
pythonGenerator.forBlock['rb_builtin_return_from_keyword'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  let code = `Return From Keyword${robot_indent}${container}\n`;
  return code;
};

// BuiltIn: Return From Keyword If
Blockly.Blocks['rb_builtin_return_from_keyword_if'] = {
  init: function() {
    this.appendValueInput("condition_container")
      .appendField("Return From Keyword If  ")
      .appendField("condition=")
      .setCheck("Variable")

    this.appendValueInput("value_container")
      .appendField("  Return Values=")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("BuiltIn: Return From Keyword If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Return%20From%20Keyword%20If");
  }
};
pythonGenerator.forBlock['rb_builtin_return_from_keyword_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition_container', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)

  let code = `Return From Keyword If`
  code += `${robot_indent}${condition}`;
  code += `${robot_indent}${value}`;
  code += '\n';
  return code;
};

// BuiltIn: Run Keyword
Blockly.Blocks['rb_builtin_run_keyword'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendValueInput("keyword")
      .appendField("Run KeyWord  ")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword");
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

pythonGenerator.forBlock['rb_builtin_run_keyword'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `Repeat Keyword`;
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

// BuiltIn: Run Keyword And Continue On Failure
Blockly.Blocks['rb_builtin_run_keyword_and_continue_on_failure'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendDummyInput("container")
      .appendField("Run Keyword And Continue On Failure  ")

    this.appendValueInput("error_message")
      .appendField(new Blockly.FieldDropdown([
        ["GLOB", "GLOB"],
        ["EQUALS", "EQUALS"],
        ["STARTS", "STARTS"],
        ["REGEXP", "REGEXP"],
      ]), "type")
      .appendField("： Find Error Message")
      .setCheck(null);
    
    this.appendValueInput("keyword")
      .appendField("KeyWord Name：")
      .setCheck(null);

    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Continue On Failure");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Continue%20On%20Failure");
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

pythonGenerator.forBlock['rb_builtin_run_keyword_and_continue_on_failure'] = function(block) {
  let type = block.getFieldValue('type');
  let error_message = pythonGenerator.valueToCode(block, 'error_message', pythonGenerator.ORDER_ATOMIC) || '';
  error_message = robotFormate(error_message, '|', default_indent)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `Run Keyword And Continue On Failure`;
  code += `${robot_indent}${type}:${error_message ? `${error_message}`:``}`;
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

// BuiltIn: Run Keyword And Ignore Error
Blockly.Blocks['rb_builtin_run_keyword_and_ignore_error'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendValueInput("keyword")
      .appendField("Run KeyWord And Ignore Error ")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Ignore%20Error");
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

pythonGenerator.forBlock['rb_builtin_run_keyword_and_ignore_error'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `Run Keyword And Ignore Error`;
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

// BuiltIn: Run Keyword And Return
Blockly.Blocks['rb_builtin_run_keyword_and_return'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendValueInput("keyword")
      .appendField("Run KeyWord And Return ")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Return");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Return");
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

pythonGenerator.forBlock['rb_builtin_run_keyword_and_return'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `Run Keyword And Return`;
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

// BuiltIn: Run Keyword And Return If
Blockly.Blocks['rb_builtin_run_keyword_and_return_if'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendDummyInput("container")
      .appendField("Run KeyWord And Return If ")
      
    
    this.appendValueInput("condition")
      .appendField("Condition：")
      .setCheck(null);

    this.appendValueInput("keyword")
      .appendField("KeyWord Name：")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Return If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Return%20If");
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

pythonGenerator.forBlock['rb_builtin_run_keyword_and_return_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', default_indent)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `Run KeyWord And Return If`;
  code += `${condition ? `${robot_indent}${condition}`:``}`;
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

// BuiltIn: Run Keyword And Return Status
Blockly.Blocks['rb_builtin_run_keyword_and_return_status'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendValueInput("keyword")
      .appendField("Run Keyword And Return Status ")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Return Status");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Return%20Status");
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

pythonGenerator.forBlock['rb_builtin_run_keyword_and_return_status'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `Run Keyword And Return Status`;
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

// BuiltIn: Run Keyword And Warn On Failure
Blockly.Blocks['rb_builtin_run_keyword_and_warn_on_failure'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendValueInput("keyword")
      .appendField("Run Keyword And Warn On Failure ")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Warn On Failure");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Warn%20On%20Failure");
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

pythonGenerator.forBlock['rb_builtin_run_keyword_and_warn_on_failure'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `Run Keyword And Warn On Failure`;
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

// BuiltIn: Run Keyword If
Blockly.Blocks['rb_builtin_run_keyword_if'] = {
  init: function() {
    this.elseCount_ = 0;
    this.hasElse_ = false;
    
    this.appendValueInput("IF0")
        .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
          this.addElse_();
        }))
        .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
          this.removeElse_();
        }))
        .appendField("Run Keyword If");
    
    this.setColour(block_color);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    
    // 設置 mutator
    this.setMutator(new Blockly.icons.MutatorIcon(['option_else_if_container'],this));
    
    this.updateShape_();
  },

  // 保存 mutator 狀態
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('else', this.elseCount_);
    container.setAttribute('haselse', this.hasElse_);
    return container;
  },

  // 從 DOM 讀取 mutator 狀態
  domToMutation: function(xmlElement) {
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.hasElse_ = xmlElement.getAttribute('haselse') === 'true';
    this.updateShape_();
  },

  // 分解 block 到 mutator 編輯器
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('mutator_if_container');
    containerBlock.initSvg();
    
    if (this.hasElse_) {
      const elseBlock = workspace.newBlock('option_else_if_container');
      elseBlock.initSvg();
      containerBlock.getInput('STACK').connection.connect(elseBlock.previousConnection);
    }
    
    return containerBlock;
  },

  // 從 mutator 編輯器重組 block
  compose: function(containerBlock) {
    // 檢查是否有 else block
    let clauseBlock = containerBlock.getInputTargetBlock('STACK');
    this.hasElse_ = false;
    
    while (clauseBlock) {
      if (clauseBlock.type === 'option_else_if_container') {
        this.hasElse_ = true;
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    
    this.updateShape_();
  },

  // 更新 block 外觀
  updateShape_: function() {
    // 移除 END 和 ELSE block
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    
    // 移除所有現有的 else if inputs
    for (let i = 1; this.getInput('IF' + i); i++) {
      this.removeInput('IF' + i);
    }
    
    // 重建 else if inputs
    for (let i = 1; i <= this.elseCount_; i++) {
      this.appendValueInput('IF' + i)
          .appendField('ELSE IF');
    }
    
    // 如果有 else，添加 else block
    if (this.hasElse_) {
      this.appendValueInput('ELSE')
          .appendField('ELSE');
    }
  },

  addElse_: function() {
    this.elseCount_++;
    this.updateShape_();
  },
  
  removeElse_: function() {
    if (this.elseCount_ > 0) {
      this.elseCount_--;
      this.updateShape_();
    }
  }
};

// 註冊 mutator 的子 block
Blockly.Blocks['mutator_if_container'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Run Keyword If');
    this.appendStatementInput('STACK');
    this.setColour(block_color);
    this.contextMenu = false;
  } 
};

Blockly.Blocks['option_else_if_container'] = {
  init: function() {
      this.appendDummyInput()
          .appendField('ELSE');
      this.setPreviousStatement(true);
      this.setColour(block_color);
      this.contextMenu = false;
    }
  };

pythonGenerator.forBlock['rb_builtin_run_keyword_if'] = function(block) {
  let code = '';
  
  let conditionCode = pythonGenerator.valueToCode(block, 'IF0', pythonGenerator.ORDER_NONE) || '';
  conditionCode = robotFormate(conditionCode)
  
  code += `Run Keyword If${robot_indent}${conditionCode}\n`

  // Process ELSE IF blocks
  let i = 1;
  while (block.getInput('IF' + i)) {
    conditionCode = pythonGenerator.valueToCode(block, 'IF' + i, pythonGenerator.ORDER_NONE) || '';
    conditionCode = robotFormate(conditionCode)

    code += `...${robot_indent}ELSE IF${robot_indent}${conditionCode}\n`
    i++;
  }

  // Add ELSE block if it exists
  if (block.getInput('ELSE')) {
    let elseCode = pythonGenerator.valueToCode(block, 'ELSE', pythonGenerator.ORDER_NONE) || '';
    elseCode = robotFormate(elseCode)
    code += `...${robot_indent}ELSE${robot_indent}${elseCode}\n`
  }

  return code;
};

// BuiltIn: Run Keyword If All Tests Passed

