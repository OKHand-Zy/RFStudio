import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

import {BuiltIn_Block_List} from "@/components/ToolBoxs/TB_BuiltIn";
import {Collections_Block_List} from "@/components/ToolBoxs/TB_Collections";
import {DateTime_Blocks_List} from "@/components/ToolBoxs/TB_DateTime";
import {Dialogs_Block_List} from "@/components/ToolBoxs/TB_Dialogs";
import { OperatingSystem_Blocks_List } from "@/components/ToolBoxs/TB_OperatingSystem";
import {Process_Block_List} from "@/components/ToolBoxs/TB_Processes";
import {Screenshot_Block_List} from "@/components/ToolBoxs/TB_Screenshot";
import {String_Block_List} from "@/components/ToolBoxs/TB_String";
import {Telnet_Block_List} from "@/components/ToolBoxs/TB_Telenet";
import {XML_Block_List} from "@/components/ToolBoxs/TB_XML";

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
const block_color = 50;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// RB: Settings Group Block
Blockly.Blocks['rb_fw_Settings'] = {
  init: function () {
    this.appendDummyInput('rb_fw_Settings')
      .appendField("*** Settings ***")

    this.appendStatementInput("Settings")
      .setCheck(['rb_setting_section', 'rb_setting_content'])
    
    this.setPreviousStatement(true, ['rb_fw_Settings'])
    this.setNextStatement(true, ['rb_fw_Variables']) 
    this.setColour(block_color)
    this.setTooltip("Create robotframework Setting Group")
    this.setHelpUrl("")
  }
};

pythonGenerator.forBlock['rb_fw_Settings'] = function(block) {
  let auto_import = '';
  let import_String = pythonGenerator.statementToCode(block, 'Settings') || '';

  const workspace = block.workspace;
  // 檢查工作區是否包含 各Library 的 Blocks
  const hasBuiltInBlocks = workspace.getAllBlocks().some(block => 
    BuiltIn_Block_List.includes(block.type)
  );
  if (hasBuiltInBlocks && !import_String.includes('Library    BuiltIn')) {
    auto_import += `Library${robot_indent}BuiltIn\n`;
  }
  
  const hasCollectionsBlocks = workspace.getAllBlocks().some(block => 
    Collections_Block_List.includes(block.type)
  );
  if (hasCollectionsBlocks && !import_String.includes('Library    Collections')) {
    auto_import += `Library${robot_indent}Collections\n`;
  }

  const hasDateTimeBlocks = workspace.getAllBlocks().some(block => 
    DateTime_Blocks_List.includes(block.type)
  );
  if (hasDateTimeBlocks && !import_String.includes('Library    DateTime')) {
    auto_import += `Library${robot_indent}DateTime\n`;
  }

  const hasDialogsBlocks = workspace.getAllBlocks().some(block => 
    Dialogs_Block_List.includes(block.type)
  );
  if (hasDialogsBlocks && !import_String.includes('Library    Dialogs')) {
    auto_import += `Library${robot_indent}Dialogs\n`;
  }

  const hasOperatingSystemBlocks = workspace.getAllBlocks().some(block => 
    OperatingSystem_Blocks_List.includes(block.type)
  );
  if (hasOperatingSystemBlocks && !import_String.includes('Library    OperatingSystem')) {
    auto_import += `Library${robot_indent}OperatingSystem\n`;
  }

  const hasProcessBlocks = workspace.getAllBlocks().some(block => 
    Process_Block_List.includes(block.type)
  );
  if (hasProcessBlocks && !import_String.includes('Library    Process')) {
    auto_import += `Library${robot_indent}Process\n`;
  }

  const hasScreenshotBlocks = workspace.getAllBlocks().some(block => 
    Screenshot_Block_List.includes(block.type)
  );
  if (hasScreenshotBlocks && !import_String.includes('Library    Screenshot')) {
    auto_import += `Library${robot_indent}Screenshot\n`;
  }

  const hasStringBlocks = workspace.getAllBlocks().some(block => 
    String_Block_List.includes(block.type)
  );
  if (hasStringBlocks && !import_String.includes('Library    String')) {
    auto_import += `Library${robot_indent}String\n`;
  }

  const hasTelnetBlocks = workspace.getAllBlocks().some(block => 
    Telnet_Block_List.includes(block.type)
  );
  if (hasTelnetBlocks && !import_String.includes('Library    Telnet')) {
    auto_import += `Library${robot_indent}Telnet\n`;
  }

  const hasXMLBlocks = workspace.getAllBlocks().some(block => 
    XML_Block_List.includes(block.type)
  );
  if (hasXMLBlocks && !import_String.includes('Library    XML')) {
    auto_import += `Library${robot_indent}XML\n`;
  }

  let code = `*** Settings ***\n${auto_import}${import_String}`;
  
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
  let argsValue = pythonGenerator.valueToCode(block, 'args', pythonGenerator.ORDER_ATOMIC) || '';
  argsValue = robotFormate(argsValue, '|', robot_indent)
  let shortName = '';
  const shortNameField = block.getField('short_name');
  if (shortNameField) {
    shortName = shortNameField.getValue();
  }

  let code = `Library${robot_indent}${libraryName}`;
  code += `${argsValue ? `${robot_indent}${argsValue}` : ''}`;
  
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
