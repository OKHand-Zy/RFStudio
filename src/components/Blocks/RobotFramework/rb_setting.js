import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const block_color = 50;

pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// RB: Settings Group Block
Blockly.Blocks['rb_fw_Settings'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Settings')
      .appendField("*** Settings ***")

    this.appendStatementInput("Settings")
      .setCheck(['rb_setting_section_container', 'rb_setting_content'])
    
    this.setNextStatement(true, ['rb_fw_Variables']) 
    this.setColour(block_color)
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
  import_Library += hasBuiltInBlocks ? `Library${robot_indent}BuiltIn\n` : '';
  
  var settings_content = import_Library + (pythonGenerator.statementToCode(block, 'Settings') || '');

  var code = `*** Settings ***
${settings_content}`;
  
  return code;  
}

// RB: Setting section Block
// https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-694
Blockly.Blocks['rb_setting_section_container'] = {
  init: function() {
    this.appendDummyInput("import_file")
      .appendField(new Blockly.FieldDropdown([
        ["Library", "Library"],
        ["Resource", "Resource"],
        ["Variables", "Variables"],
        ["Name", "Name"],
        ["Documentation", "Documentation"],
        ["Metadata", "Metadata"],
        ["Suite Setup", "Suite Setup"],
        ["Suite Teardown", "Suite Teardown"],
        ["Test Tags", "Test Tags"],
        ["Force Tags", "Force Tags"],
        ["Default Tags", "Default Tags"],
        ["Keyword Tags", "Keyword Tags"],
        ["Test Setup", "Test Setup"],
        ["Test Teardown", "Test Teardown"],
        ["Test Template", "Test Template"],
        ["Timeout", "Timeout"],
        ["Task Setup", "Task Setup"],
        ["Task Teardown", "Task Teardown"],
        ["Task Template", "Task Template"],
        ["Task Timeout", "Task Timeout"],
      ]), "import_type")
      .appendField(new Blockly.FieldTextInput("Import_Resource"), "import_resource")
    
    this.appendValueInput("args")
        .appendField("  ")
        .setCheck("Variable") 

    this.setOutput(false, "Setting");
    this.setPreviousStatement(true, ['rb_fw_Settings','rb_setting_section_container']);
    this.setNextStatement(true, ['rb_setting_section_container']);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting Import Something");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_setting_section_container'] = function(block) {
  var import_type = block.getFieldValue('import_type');
  var import_resource = block.getFieldValue('import_resource');
  var resource_args = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';
  var code = `${import_type}${robot_indent}${import_resource}${resource_args ? `${robot_indent}${resource_args}` : ''}\n`;
  return code;
};

// RB: remote library
Blockly.Blocks['rb_setting_remote_library'] = {
  init: function() {
    this.appendValueInput("args")
      .appendField("Remote")
      .appendField(new Blockly.FieldTextInput("Remote_Link"), "remote_link")

    this.appendDummyInput("")
      .appendField("As")
      .appendField(new Blockly.FieldTextInput("Liberary_Name"), "liberary_name")  

    this.setOutput(true, "Variable");
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Import Remote Library");
    this.setHelpUrl("");
  }
};
pythonGenerator.forBlock['rb_setting_remote_library'] = function(block) {
  const remoteLink = block.getFieldValue('remote_link');
  const libraryName = block.getFieldValue('liberary_name');
  const args = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';

  const code = `Remote${robot_indent}${remoteLink}${args ? `${robot_indent}${args}`:''}${robot_indent}As${robot_indent}${libraryName}\n`;

  return code;
}