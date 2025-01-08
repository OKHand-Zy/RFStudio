import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
pythonGenerator.INDENT = ''; // 將預設縮排設為空字串

const Order = {
    ATOMIC: 0,
};

const rb_space = '    ';


// Sleep Block
Blockly.Blocks['sleep'] = {
    init: function() {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField("Sleep");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Sleep for specified seconds");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['sleep'] = function(block) {
    var value_time = pythonGenerator.valueToCode(block, 'TIME', pythonGenerator.ORDER_ATOMIC);
    var code = `Sleep${rb_space}${value_time}\n`;
    return code;
};

// Get_Time Block
Blockly.Blocks['Get_Time'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get Time");
        this.appendValueInput("DURATION")
            .setCheck("String")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Get system Time");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['Get_Time'] = function(block) {
    pythonGenerator.provideFunction_('import_builtin', ['import BuiltIn']);
    
    let code;
    // 檢查是否有 DURATION 輸入值
    const duration = pythonGenerator.valueToCode(block, 'DURATION', pythonGenerator.ORDER_ATOMIC);
    
    if (duration) {
        code = `${rb_space}BuiltIn.get_time${rb_space}${duration}`;
    } else {
        code = `${rb_space}BuiltIn.get_time\n`;
    }
    
    return code;
};