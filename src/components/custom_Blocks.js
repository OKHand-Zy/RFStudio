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



