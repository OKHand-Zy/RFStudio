import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
pythonGenerator.INDENT = ''; // 將預設縮排設為空字串

const Order = {
    ATOMIC: 0,
};

Blockly.Blocks['print_message'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Print message");
        this.appendValueInput("MESSAGE")
            .setCheck("String")
            .appendField("text");
        this.appendValueInput("VARIABLE")
            .setCheck(null)
            .appendField("with variable");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Print a message with a variable");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['print_message'] = function(block) {
    var text = pythonGenerator.valueToCode(block, 'MESSAGE', pythonGenerator.ORDER_ATOMIC) || "''";
    var variable = pythonGenerator.valueToCode(block, 'VARIABLE', pythonGenerator.ORDER_ATOMIC) || "''";
    // 移除所有行首空白
    var code = `print(f"{${text}}".format(${variable}))\n`.replace(/^\s+/gm, '');
    return code;
};

// Boundary Function Block
Blockly.Blocks['new_boundary_function'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Boundary Function Name"), "Name");
        this.appendStatementInput("Content")
            .setCheck(null);
        this.setInputsInline(true);
        this.setColour(315);
        this.setTooltip("Create a new boundary function");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['new_boundary_function'] = function (block) {
    var text_name = block.getFieldValue('Name');
    // 使用 statementToCode 時不添加額外縮排
    var statements_content = pythonGenerator.statementToCode(block, 'Content').replace(/^\s+/gm, '') || 'pass\n';
    var code = `def ${text_name}(_object,**kwargs):\n${statements_content}\n`;
    return code;
};

// Return Block
Blockly.Blocks['return'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("return");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setColour(330);
        this.setTooltip("Return a value from the function");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['return'] = function (block) {
    var value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    // 移除所有行首空白
    return `return ${value}\n`.replace(/^\s+/gm, '');
};



// 垂直串接限制示範
Blockly.Blocks['green_block'] = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("Green Block");
    this.setPreviousStatement(true, ["blue_green"]);
    this.setNextStatement(true, ["green_blue", "green_purple"]);
  }
};
pythonGenerator.forBlock['green_block'] = function (block) {
  return ``; 
};

Blockly.Blocks['blue_block'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
      .appendField("Blue Block");
    this.setPreviousStatement(true, ["green_blue"]);
    this.setNextStatement(true, ["blue_green"]);
  }
};
pythonGenerator.forBlock['blue_block'] = function (block) {
  return ``; 
};

Blockly.Blocks['purple_block'] = {
  init: function() {
    this.setColour(260);
    this.appendDummyInput()
      .appendField("Purple Block");
    this.setPreviousStatement(true, ["green_purple"]);
  }
};
pythonGenerator.forBlock['purple_block'] = function (block) {
  return ``;
};

// 影子示範
Blockly.Blocks['example_block'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField("顯示文字");
    
    // 正確的影子區塊設置方式
    const input = this.getInput('TEXT');
    const shadow = this.workspace.newBlock('text', 'shadow');
    shadow.setFieldValue('預設文字', 'TEXT');
    shadow.setShadow(true);
    shadow.initSvg();
    shadow.render();
    input.connection.connect(shadow.outputConnection);
    
    this.setColour(160);
    this.setTooltip("這是一個範例區塊");
    this.setHelpUrl("");
    this.setOutput(true, 'String');  // 如果需要輸出的話
  }
};

pythonGenerator.forBlock['example_block'] = function(block) {
  // 獲取輸入值
  const textValue = pythonGenerator.valueToCode(block, 'TEXT', 
    pythonGenerator.ORDER_ATOMIC) || '""';
  
  // 返回正確格式的 Python 代碼
  return [`print(${textValue})`, pythonGenerator.ORDER_NONE];
};