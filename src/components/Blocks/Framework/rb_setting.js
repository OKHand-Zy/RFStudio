import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const rb_indent = '    ';
const rb_setting_color = 50;

pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// RB: Settings Group Block
Blockly.Blocks['rb_fw_Settings'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Settings')
      .appendField("*** Settings ***")

    this.appendStatementInput("Settings")
      .setCheck(['rb_setting_import', 'rb_setting_content'])
    
    this.setNextStatement(true, ['rb_fw_Variables']) 
    this.setColour(rb_setting_color)
    this.setTooltip("Create robotframework Setting Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_Settings'] = function(block) {
  let import_Library = '';
  const workspace = block.workspace;
  // 檢查工作區是否包含 BuiltIn 的 Blocks
  const hasBuiltInBlocks = workspace.getAllBlocks().some(block => 
    ['sleep', 'Get_Time'].includes(block.type)
  );
  import_Library += hasBuiltInBlocks ? `Library${rb_indent}BuiltIn\n` : '';
  
  var settings_content = import_Library + (pythonGenerator.statementToCode(block, 'Settings') || '');

  var code = `*** Settings ***
${settings_content}`;
  
  return code;  
}

// RB: Setting imprt Block
Blockly.Blocks['rb_setting_import'] = {
  init: function() {
    this.appendDummyInput("import_file")
      .appendField(new Blockly.FieldDropdown([
        ["Library", "Library"],
        ["Documentation", "Documentation"],
        ["Resource", "Resource"],
      ]), "import_type")
      .appendField(new Blockly.FieldTextInput("import_resource"), "import_resource")
      
    this.appendValueInput("args")
        .appendField("  ")
        .setCheck("Setting") 
    
    this.setOutput(false, "Setting");
    this.setPreviousStatement(true, ['rb_fw_Settings','rb_setting_import']);
    this.setNextStatement(true, ['rb_setting_import']);
    this.setInputsInline(true);
    this.setColour(rb_setting_color);
    this.setTooltip("Setting Import Something");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_setting_import'] = function(block) {
  var import_type = block.getFieldValue('import_type');
  var import_resource = block.getFieldValue('import_resource');
  var resource_args = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';
  var code = `${import_type}${rb_indent}${import_resource}${resource_args ? `${rb_indent}${resource_args}` : ''}\n`;
  return code;
};

Blockly.Blocks['rb_setting_content'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField(new Blockly.FieldTextInput("Content"), "CONTENT")
      .setCheck("Setting")
        
    this.setOutput(true, "Setting");  
    this.setColour(rb_setting_color);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_setting_content'] = function(block) {
  var text_content = block.getFieldValue('CONTENT');
  var connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  var code = '';
  if (connected_value) {
    code = `${text_content}${rb_indent}${connected_value}`;
  } else {
    code = `${text_content}`;
  }
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};