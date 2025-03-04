import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const block_color = 200;
const split_mark = '|';
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// RB: Keywords Group Block
Blockly.Blocks['rb_fw_Keywords'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Keywords')
      .appendField("*** Keywords ***")

    this.appendStatementInput("Keywords")
      .setCheck(null)
    
    this.setPreviousStatement(true, ['rb_fw_Keywords'])
    this.setColour(block_color)
    this.setTooltip("Create robotframework Keywords Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_Keywords'] = function(block) {
  const keywords_content = pythonGenerator.statementToCode(block, 'Keywords') || '';
  let code = `*** Keywords ***
${keywords_content}`;
  
  return code;  
}

// RB: KeyWord Function Block
Blockly.Blocks['rb_keyword_function'] = {
  init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("KeyWord Function Name"), "keyword_name");
      this.appendStatementInput("keyword_content")
          .setCheck(null);
      
      this.setPreviousStatement(true, ['rb_fw_Keywords','rb_keyword_function']);
      this.setNextStatement(true, ['rb_keyword_function']);
      this.setInputsInline(true);
      this.setColour(block_color);
      this.setTooltip("Create a keyword function");
      this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_keyword_function'] = function (block) {
  const keyword_name = block.getFieldValue('keyword_name');
  pythonGenerator.INDENT = robot_indent;
  const statements_content = pythonGenerator.statementToCode(block, 'keyword_content') || '';
  pythonGenerator.INDENT = default_indent;
  
  let code = `${keyword_name}\n${statements_content}\n`;
  return code;
};

// RB: KeyWord Function Arguments Block 
// https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-696
Blockly.Blocks['rb_keyword_function_arg_container'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["Arguments", "Arguments"],
          ["Documentation", "Documentation"],
          ["Tags", "Tags"],
          ["Setup", "Setup"],
          ["Teardown", "Teardown"],
          ["Timeout", "Timeout"],
          ["Return", "Return"],
        ]), "variable_type")
  
    this.appendValueInput("add_args")
        .appendField("  ")
        .setCheck("Variable") 
    
    this.setPreviousStatement(true, ['rb_keyword_function','rb_keyword_function_arg_container']);
    this.setNextStatement(true, ['rb_keyword_function_arg_container']);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting Variables");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_keyword_function_arg_container'] = function(block) {
  const variable_type = block.getFieldValue('variable_type');  
  const variable_value = pythonGenerator.valueToCode(block, 'add_args', pythonGenerator.ORDER_ATOMIC) || '';

  let code = `${variable_value ? `[${variable_type}]${robot_indent}${variable_value}` : ''}\n`;
  return code;
};

// KeyWord: Arg=Value
Blockly.Blocks['rb_keyword_A2V'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("FALSE", this.validateCheckboxChange), "IS_STATEMENT")
        .appendField("OP");
    
    this.appendValueInput("value1");
    this.appendDummyInput().appendField("=");
    this.appendValueInput("value2");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting Variables To Args");

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

pythonGenerator.forBlock['rb_keyword_A2V'] = function(block) {
  let value1 = pythonGenerator.valueToCode(block, 'value1', pythonGenerator.ORDER_ATOMIC) || '';
  value1 = robotFormate(value1, '|', default_indent);
  
  let value2 = pythonGenerator.valueToCode(block, 'value2', pythonGenerator.ORDER_ATOMIC) || '';
  value2 = robotFormate(value2, '|', robot_indent);

  let code = `${value1}=${robot_indent}${value2}`;

  var isStatement = block.getFieldValue('IS_STATEMENT') === 'TRUE';
  
  if (isStatement) {
    return [code, pythonGenerator.ORDER_ATOMIC];
  } else {
    return code;
  }
};

