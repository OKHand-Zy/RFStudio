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
    this.appendDummyInput("condition")
      .appendField("Return From Keyword If ")
    
    this.appendValueInput("condition_container")
      .appendField("Condition：")
      .setCheck("Variable")

    this.appendValueInput("value_container")
      .appendField("Return Values：")
      .setCheck(null);
    
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
    this.appendValueInput("keyword")
      .appendField("Run KeyWord ")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Run Keyword`;
  code += `${keyword ? `${robot_indent}${keyword}\n`:`\n`}`

  return code;
};
// BuiltIn: Run Keyword And Continue On Failure
Blockly.Blocks['rb_builtin_run_keyword_and_continue_on_failure'] = {
  init: function() {    
    this.appendValueInput("keyword")
      .appendField("Run Keyword And Continue On Failure ")
      .setCheck(null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Continue On Failure");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Continue%20On%20Failure");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword_and_continue_on_failure'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);

  let code = `Run Keyword And Continue On Failure`;
  code += `${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  return code;
};

// BuiltIn: Run Keyword And Expect Error
Blockly.Blocks['rb_builtin_run_keyword_and_expect_error'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Run Keyword And Expect Error  ")

    this.appendValueInput("error_message")
      .appendField("Type：")
      .appendField(new Blockly.FieldDropdown([
        ["GLOB", "GLOB"],
        ["EQUALS", "EQUALS"],
        ["STARTS", "STARTS"],
        ["REGEXP", "REGEXP"],
      ]), "type")
      .appendField("：Find Error Message ")
      .setCheck(null);
    
    this.appendValueInput("keyword")
      .appendField("KeyWord：")
      .setCheck(null);

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Expect Error");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Expect%20Error");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword_and_expect_error'] = function(block) {
  let type = block.getFieldValue('type');
  let error_message = pythonGenerator.valueToCode(block, 'error_message', pythonGenerator.ORDER_ATOMIC) || '';
  error_message = robotFormate(error_message, '|', default_indent)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Run Keyword And Continue On Failure`;
  code += `${robot_indent}${type}:${error_message ? `${error_message}`:``}`;
  code += `${keyword ? `${robot_indent}${keyword}\n`:`\n`}`

  return code;
};

// BuiltIn: Run Keyword And Ignore Error
Blockly.Blocks['rb_builtin_run_keyword_and_ignore_error'] = {
  init: function() {
    this.appendValueInput("keyword")
      .appendField("Run KeyWord And Ignore Error ")
      .setCheck(null);

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Ignore%20Error");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword_and_ignore_error'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Run Keyword And Ignore Error`;
  code += `${keyword ? `${robot_indent}${keyword}\n`:`\n`}`

  return code;
};

// BuiltIn: Run Keyword And Return
Blockly.Blocks['rb_builtin_run_keyword_and_return'] = {
  init: function() {
    this.appendValueInput("keyword")
      .appendField("Run KeyWord And Return ")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Return");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Return");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword_and_return'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Run Keyword And Return`;
  code += `${keyword ? `${robot_indent}${keyword}\n`:`\n`}`

  return code;
};

// BuiltIn: Run Keyword And Return If
Blockly.Blocks['rb_builtin_run_keyword_and_return_if'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Run KeyWord And Return If ")
      
    this.appendValueInput("condition")
      .appendField("Condition：")
      .setCheck(null);

    this.appendValueInput("keyword")
      .appendField("KeyWord：")
      .setCheck(null);

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Return If");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Return%20If");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword_and_return_if'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', default_indent)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Run KeyWord And Return If`;
  code += `${condition ? `${robot_indent}${condition}`:``}`;
  code += `${keyword ? `${robot_indent}${keyword}`:``}`
  code += '\n'

  return code;
};

// BuiltIn: Run Keyword And Return Status
Blockly.Blocks['rb_builtin_run_keyword_and_return_status'] = {
  init: function() {
    this.appendValueInput("keyword")
      .appendField("Run Keyword And Return Status ")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Return Status");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Return%20Status");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword_and_return_status'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let code = `Run Keyword And Return Status`;
  code += `${keyword ? `${robot_indent}${keyword}\n`:`\n`}`

  return code;
};

// BuiltIn: Run Keyword And Warn On Failure
Blockly.Blocks['rb_builtin_run_keyword_and_warn_on_failure'] = {
  init: function() {
    this.appendValueInput("keyword")
      .appendField("Run Keyword And Warn On Failure ")
      .setCheck(null);

    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword And Warn On Failure");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20And%20Warn%20On%20Failure");
  },
};

pythonGenerator.forBlock['rb_builtin_run_keyword_and_warn_on_failure'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);

  let code = `Run Keyword And Warn On Failure`;
  code += `${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
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
Blockly.Blocks['rb_builtin_run_keyword_if_all_tests_passed'] = {
  init: function() {
    this.appendValueInput("keyword_container")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
        .appendField(" Run Keyword If All Tests Passed ")
        .setCheck("Variable");
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword If All Tests Passed");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20If%20All%20Tests%20Passed");

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

pythonGenerator.forBlock['rb_builtin_run_keyword_if_all_tests_passed'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword_container', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);
  let code = `Run Keyword If All Tests Passed${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  var isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  
  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// BuiltIn: Run Keyword If Any Tests Failed
Blockly.Blocks['rb_builtin_run_keyword_if_any_tests_failed'] = {
  init: function() {
    this.appendValueInput("keyword_container")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
        .appendField(" Run Keyword If Any Tests Failed ")
        .setCheck("Variable");
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword If Any Tests Failed");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20If%20Any%20Tests%20Failed");

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

pythonGenerator.forBlock['rb_builtin_run_keyword_if_any_tests_failed'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword_container', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);
  let code = `Run Keyword If Any Tests Failed${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  var isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  
  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// BuiltIn: Run Keyword If Test Failed
Blockly.Blocks['rb_builtin_run_keyword_if_test_failed'] = {
  init: function() {
    this.appendValueInput("keyword_container")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
        .appendField(" Run Keyword If Test Failed ")
        .setCheck("Variable");
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword If Tests Failed");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20If%20Test%20Failed");

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

pythonGenerator.forBlock['rb_builtin_run_keyword_if_test_failed'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword_container', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);
  let code = `Run Keyword If Test Failed${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  var isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  
  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// BuiltIn: Run Keyword If Test Passed
Blockly.Blocks['rb_builtin_run_keyword_if_test_passed'] = {
  init: function() {
    this.appendValueInput("keyword_container")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
        .appendField(" Run Keyword If Test Passed ")
        .setCheck("Variable");
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword If Test Passed");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20If%20Test%20Passed");

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

pythonGenerator.forBlock['rb_builtin_run_keyword_if_test_passed'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword_container', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);
  let code = `Run Keyword If Test Passed${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  var isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  
  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// BuiltIn: Run Keyword If Timeout Occurred
Blockly.Blocks['rb_builtin_run_keyword_if_timeout_occurred'] = {
  init: function() {
    this.appendValueInput("keyword_container")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
        .appendField(" Run Keyword If Timeout Occurred ")
        .setCheck("Variable");
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword If Timeout Occurred");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20If%20Timeout%20Occurred");

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

pythonGenerator.forBlock['rb_builtin_run_keyword_if_timeout_occurred'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword_container', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);
  let code = `Run Keyword If Timeout Occurred${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  var isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  
  if (isStatement) {
    return [code.trim(), pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

// BuiltIn: Run Keyword Unless
Blockly.Blocks['rb_builtin_run_keyword_unless'] = {
  init: function() {
    this.appendDummyInput("condition")
      .appendField("Run Keyword Unless ")
    
    this.appendValueInput("condition_container")
      .appendField("Condition：")
      .setCheck("Variable")

    this.appendValueInput("value_container")
      .appendField("Return Values：")
      .setCheck(null);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keyword Unless");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keyword%20Unless");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keyword_unless'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition_container', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', default_indent)

  let value = pythonGenerator.valueToCode(block, 'value_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)

  let code = `Run Keyword Unless`
  code += `${robot_indent}${condition}`;
  code += `${robot_indent}${value}`;
  code += '\n';
  return code;
};

// BuiltIn: Run Keywords
Blockly.Blocks['rb_builtin_run_keywords'] = {
  init: function() {
    this.appendValueInput("keyword_container")
      .appendField("Run Keywords ")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Run Keywords");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Run%20Keywords");
  }
};

pythonGenerator.forBlock['rb_builtin_run_keywords'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword_container', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword);
  
  let code = `Run Keywords${keyword ? `${robot_indent}${keyword}\n`:`\n`}`;

  return code;
};