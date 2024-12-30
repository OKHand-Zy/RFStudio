import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

const Order = {
    ATOMIC: 0,
};

const rb_space = '    ';


// Sleep Block
Blockly.Blocks['sleep'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sleep for");
        this.appendValueInput("DURATION")
            .setCheck("Number")
            .appendField("seconds");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Pause execution for a specified number of seconds");
        this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['sleep'] = function(block) {
    // 在檔案開頭統一處理 import
    pythonGenerator.provideFunction_('import_builtin', ['import BuiltIn']);
    var duration = pythonGenerator.valueToCode(block, 'DURATION', pythonGenerator.ORDER_ATOMIC) || '0';
    var code = `${rb_space}BuiltIn.sleep(${duration})\n`;
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