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
      .setCheck(['rb_setting_section', 'rb_setting_content'])
    
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
  
  let settings_content = import_Library + (pythonGenerator.statementToCode(block, 'Settings') || '');
  let code = `*** Settings ***
${settings_content}`;
  
  return code;  
}

// RB: Setting import Library Block
const Library_MutatorMixin = {
  mutationToDom: function() {
      const container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
  },

  domToMutation: function(xmlElement) {
      const items = parseInt(xmlElement.getAttribute('items'), 10);
      this.itemCount_ = isNaN(items) ? 0 : items;
      this.updateShape_();
  },

  decompose: function(workspace) {
      const containerBlock = workspace.newBlock(this.containerBlockType);
      containerBlock.initSvg();
      
      let connection = containerBlock.getInput('STACK').connection;
      if (this.itemCount_ > 0) {
          const itemBlock = workspace.newBlock(this.itemBlockType);
          itemBlock.initSvg();
          connection.connect(itemBlock.outputConnection);
      }
      
      return containerBlock;
  },

  compose: function(containerBlock) {
      const itemBlock = containerBlock.getInputTargetBlock('STACK');
      this.itemCount_ = itemBlock && !itemBlock.isInsertionMarker() ? 1 : 0;
      this.updateShape_();
  },

  saveConnections: function(containerBlock) {
      const itemBlock = containerBlock.getInputTargetBlock('STACK');
      if (itemBlock) {
          const input = this.getInput('LIBRARY_AS');
          if (input) {
              const field = input.fieldRow.find(field => field.name === 'short_name');
              if (field) {
                  itemBlock.valueConnection_ = field.getValue();
              }
          }
      }
  }
};

Blockly.Blocks['rb_setting_import_library'] = {
  init: function() {
    this.containerBlockType = 'library_container';
    this.itemBlockType = 'as_item';
    this.itemCount_ = 0;

    this.appendDummyInput("import_file")
      .appendField("Library ")
      .appendField(new Blockly.FieldTextInput("Library_Name"), "import_library");
    
    this.appendValueInput("args")
      .appendField(" ")
      .setCheck("Variable")

    this.updateShape_()
    this.setMutator(new Blockly.icons.MutatorIcon([this.itemBlockType], this));

    this.setPreviousStatement(true, ['rb_fw_Settings', 'rb_setting_section', 'rb_setting_import_library']);
    this.setNextStatement(true, ['rb_setting_section', 'rb_setting_import_library']);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting Import Library");
    this.setHelpUrl("");
  },
  updateShape_: function() {
      if (this.getInput('LIBRARY_AS')) {
        this.removeInput('LIBRARY_AS');
      }
  
      if (this.itemCount_ > 0) {
        this.appendDummyInput('LIBRARY_AS')
          .appendField("AS")
          .appendField(new Blockly.FieldTextInput("Short_Name"), "short_name");
      }
    },
    ...Library_MutatorMixin
};

Blockly.Blocks['library_container'] = {
  init: function() {
    this.appendValueInput('STACK')
        .appendField("Import Library")
        .setCheck(null)
    
    this.setOutput(null)
    this.setInputsInline(true);
    this.setTooltip("Add or remove items");
    this.contextMenu = false;
    this.setColour(260);
  }
};

Blockly.Blocks['as_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("AS Short Name")

    this.setOutput(true, "Variable");  
    this.setColour(260);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_setting_import_library'] = function(block) {
  const libraryName = block.getFieldValue('import_library');
  const argsValue = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';
  let shortName = '';
  const shortNameField = block.getField('short_name');
  
  if (shortNameField) {
    shortName = shortNameField.getValue();
  }
  let code = `Library${robot_indent}${libraryName}`;

  if (argsValue) {
    code += `${robot_indent}${argsValue}`;
  }
  
  if (shortName) {
    code += `${robot_indent}AS${robot_indent}${shortName}`;
  }

  code += '\n';  
  return code;
};

// RB: Setting import Remote Library Block
Blockly.Blocks['rb_setting_import_remote_library'] = {
  init: function() {
    this.containerBlockType = 'library_container';
    this.itemBlockType = 'as_item';
    this.itemCount_ = 0;

    this.appendDummyInput("import_file")
      .appendField("Library  Remote")
      .appendField(new Blockly.FieldTextInput("Library_Url"), "import_library");
    
    this.appendValueInput("args")
      .appendField(" ")
      .setCheck("Variable")

    this.updateShape_()
    this.setMutator(new Blockly.icons.MutatorIcon([this.itemBlockType], this));

    this.setPreviousStatement(true, ['rb_fw_Settings', 'rb_setting_section', 'rb_setting_import_library']);
    this.setNextStatement(true, ['rb_setting_section', 'rb_setting_import_library']);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting Import Library");
    this.setHelpUrl("");
  },
  updateShape_: function() {
      if (this.getInput('LIBRARY_AS')) {
        this.removeInput('LIBRARY_AS');
      }
  
      if (this.itemCount_ > 0) {
        this.appendDummyInput('LIBRARY_AS')
          .appendField("AS")
          .appendField(new Blockly.FieldTextInput("Short_Name"), "short_name");
      }
    },
    ...Library_MutatorMixin
};

pythonGenerator.forBlock['rb_setting_import_remote_library'] = function(block) {
  const libraryName = block.getFieldValue('import_library');
  const argsValue = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';
  let shortName = '';
  const shortNameField = block.getField('short_name');
  
  if (shortNameField) {
    shortName = shortNameField.getValue();
  }
  let code = `Library${robot_indent}Remote${robot_indent}${libraryName}`;

  if (argsValue) {
    code += `${robot_indent}${argsValue}`;
  }
  
  if (shortName) {
    code += `${robot_indent}AS${robot_indent}${shortName}`;
  }

  code += '\n';  
  return code;
};

// RB: Setting section Block
// https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-694
Blockly.Blocks['rb_setting_section'] = {
  init: function() {
    this.appendDummyInput("import_file")
      .appendField(new Blockly.FieldDropdown([
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
    this.setPreviousStatement(true, ['rb_fw_Settings','rb_setting_section']);
    this.setNextStatement(true, ['rb_setting_section']);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("Setting Import Something");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_setting_section'] = function(block) {
  const import_type = block.getFieldValue('import_type');
  const import_resource = block.getFieldValue('import_resource');
  const resource_args = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';
  let code = `${import_type}${robot_indent}${import_resource}${resource_args ? `${robot_indent}${resource_args}` : ''}\n`;
  return code;
};
