import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import '@blockly/block-plus-minus';
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

// mutator 與 codecompose 和 decompose (Logic.js if.else model)
// Ref: https://github.com/google/blockly/blob/5a4e30a176b7155cfe3aa777a9241b0bf4fd829f/blocks/logic.js#L360
// issue: https://github.com/google/blockly/issues/7546
// 垂直擴展
const baseMutatorMixin = {
  /**
   * 將 Block 狀態保存到 XML
   */
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * 從 XML 載入 Block 狀態
   */
  domToMutation: function(xmlElement) {
    const items = parseInt(xmlElement.getAttribute('items'), 10);
    this.itemCount_ = isNaN(items) ? 0 : items;
    this.updateShape_();
  },

  /**
   * 建立 mutator UI
   */
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock(this.containerBlockType);
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock(this.itemBlockType);
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    
    return containerBlock;
  },

  /**
   * 從 mutator UI 重建主要 Block 
   */
  compose: function(containerBlock) {
    const connections = [];
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && 
                itemBlock.nextConnection.targetBlock();
    }
    
    this.itemCount_ = connections.length;
    this.updateShape_();
    
    // 重新連接所有輸入
    for (let i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },

  /**
   * 保存連接資訊 
   */
  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    let i = 0;
    
    while (itemBlock) {
      const input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
      i++;
    }
  }
};

/**
 * 動態列表產生器
 */
Blockly.Blocks['New_dynamic_list_creator'] = {
  init: function() {
    this.setColour(260);
    this.itemCount_ = 2;
    this.containerBlockType = 'list_container';
    this.itemBlockType = 'list_item';
    
    this.setMutator(new Blockly.icons.MutatorIcon([this.itemBlockType], this));
    this.setOutput(true, 'Array');
    this.setTooltip("建立具有任意數量項目的列表");
    this.updateShape_();
  },

  updateShape_: function() {
    // 移除現有輸入
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    }
    for (let i = 0; this.getInput('ADD' + i); i++) {
      this.removeInput('ADD' + i);
    }

    // 重建區塊
    if (this.itemCount_ === 0) {
      this.appendDummyInput('EMPTY')
          .appendField("空列表");
    } else {
      for (let i = 0; i < this.itemCount_; i++) {
        this.appendValueInput('ADD' + i)
            .setCheck(null)
            .appendField(i === 0 ? "列表包含" : "和");
      }
    }
  },
  
  ...baseMutatorMixin
};
// Mutator dialog item block
Blockly.Blocks['list_container'] = {
  init: function() {
    this.setColour(260);
    this.appendDummyInput()
        .appendField("list items");
    this.appendStatementInput('STACK');
    this.setTooltip("Add or remove items");
    this.contextMenu = false;
  }
};
// Mutator dialog item block
Blockly.Blocks['list_item'] = {
  init: function() {
    this.setColour(260);
    this.appendDummyInput()
        .appendField("item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an item to the list");
    this.contextMenu = false;
  }
};

/**
 * 產生 Python 程式碼
 */
pythonGenerator.forBlock['New_dynamic_list_creator'] = function(block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const value = pythonGenerator.valueToCode(block, 'ADD' + i, 
      pythonGenerator.ORDER_NONE) || 'None';
    elements.push(value);
  }
  return ['[' + elements.join(', ') + ']', pythonGenerator.ORDER_ATOMIC];
};

// ==================================================================
// 水平擴展
const HZ_MutatorMixin = {
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
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock(this.itemBlockType);
            itemBlock.initSvg();
            // Connect value input instead of statement
            connection.connect(itemBlock.outputConnection);
            connection = itemBlock.getInput('content').connection;
        }
        
        return containerBlock;
    },

    compose: function(containerBlock) {
        const connections = [];
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.getInput('content') && 
                          itemBlock.getInput('content').connection.targetBlock();
        }
        
        this.itemCount_ = connections.length;
        this.updateShape_();
        
        for (let i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).connection.connect(connections[i]);
            }
        }
    },

    saveConnections: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        let i = 0;
        
        while (itemBlock) {
            const input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            itemBlock = itemBlock.getInput('content') &&
                          itemBlock.getInput('content').connection.targetBlock();
            i++;
        }
    }
};

Blockly.Blocks['dynamic_HZ_list_creator'] = {
    init: function() {
        this.setColour(260);
        this.itemCount_ = 2;
        this.containerBlockType = 'HZ_list_container';
        this.itemBlockType = 'HZ_list_item';
        
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon([this.itemBlockType], this));
        this.setOutput(true, 'Array');
        this.setTooltip("Create a list with any number of items");
        this.updateShape_();
    },

    updateShape_: function() {
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        }
        for (let i = 0; this.getInput('ADD' + i); i++) {
            this.removeInput('ADD' + i);
        }

        if (this.itemCount_ === 0) {
            this.appendDummyInput('EMPTY')
                    .appendField("empty list");
        } else {
          for (let i = 0; i < this.itemCount_; i++) {
              this.appendValueInput('ADD' + i)
                .setCheck("Variable")
                .appendField(i === 0 ? "list with" : "and");
          }
          
        }
    },
    ...HZ_MutatorMixin
};

Blockly.Blocks['HZ_list_container'] = {
  init: function() {
    this.appendValueInput('STACK')
        .appendField("list items")
        .setCheck(null)
    
    this.setOutput(null)
    this.setInputsInline(true);
    this.setTooltip("Add or remove items");
    this.contextMenu = false;
    this.setColour(260);
  }
};

Blockly.Blocks['HZ_list_item'] = {
    init: function() {
            this.appendValueInput("content")
                .appendField("args")
                .setCheck("Variable")
                    
            this.setOutput(true, "Variable");  
            this.setColour(260);
            this.setTooltip("Input content");
            this.setHelpUrl("");
    }
};

pythonGenerator.forBlock['dynamic_HZ_list_creator'] = function(block) {
    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const value = pythonGenerator.valueToCode(block, 'ADD' + i, 
            pythonGenerator.ORDER_NONE) || 'None';
        elements.push(value);
    }
    return ['[' + elements.join(', ') + ']', pythonGenerator.ORDER_ATOMIC];
};


// 驗證
Blockly.Blocks['dynamic_style_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Style: ")
        .appendField(new Blockly.FieldDropdown([
          ["Default", "DEFAULT"],
          ["Red", "RED"],
          ["Green", "GREEN"],
          ["Blue", "BLUE"]
        ]), "STYLE");
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("Text:");
    
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("A block that changes its style based on selection");
    this.setHelpUrl("");

    // Track if extra input exists
    this.hasExtraInput = false;

    this.setOnChange(function(changeEvent) {
      if (changeEvent.type == Blockly.Events.BLOCK_CHANGE &&
          changeEvent.name == "STYLE") {
        this.updateShape_();
      }
    });
  },

  updateShape_: function() {
    var style = this.getFieldValue('STYLE');
    
    // Handle extra input for red style
    if (style === 'RED' && !this.hasExtraInput) {
      // Add extra input for red style
      this.appendValueInput("EXTRA_INPUT")
          .setCheck("String")
          .appendField("Extra Input:");
      this.hasExtraInput = true;
    } else if (style !== 'RED' && this.hasExtraInput) {
      // Remove extra input for other styles
      this.removeInput("EXTRA_INPUT");
      this.hasExtraInput = false;
    }

    // Update color based on style
    switch(style) {
      case 'RED':
        this.setColour(0);
        break;
      case 'GREEN':
        this.setColour(120);
        break;
      case 'BLUE':
        this.setColour(210);
        break;
      default:
        this.setColour(230);
    }
  }
};

pythonGenerator.forBlock['dynamic_style_block'] = function(block) {
  var style = block.getFieldValue('STYLE');
  var text = pythonGenerator.valueToCode(block, 'TEXT', pythonGenerator.ORDER_ATOMIC) || '""';
  
  // Handle extra input in code generation
  var extraInput = '';
  if (style === 'RED') {
    extraInput = pythonGenerator.valueToCode(block, 'EXTRA_INPUT', pythonGenerator.ORDER_ATOMIC) || '""';
    return [`f"Style: {${style}}, Text: {${text}}, Extra: {${extraInput}}"`, pythonGenerator.ORDER_NONE];
  }
  
  return [`f"Style: {${style}}, Text: {${text}}"`, pythonGenerator.ORDER_NONE];
};

//showdow
Blockly.Blocks['greet_person'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("跟");

    this.appendDummyInput()
        .appendField("說你好");
    
        this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("向某人打招呼");
  }
};
pythonGenerator.forBlock['greet_person'] = function(block) {
  const name = pythonGenerator.valueToCode(block, 'NAME', pythonGenerator.ORDER_ATOMIC) || '"未知"';
  return `console.log("你好, " + ${name});\n`;
};

// 稍微簡單一點的 mutator
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
              const field = input.fieldRow.find(field => field.name === 'library_name');
              if (field) {
                  itemBlock.valueConnection_ = field.getValue();
              }
          }
      }
  }
};

Blockly.Blocks['Import_Library'] = {
  init: function() {
    this.setColour(260);
    this.itemCount_ = 0;
    this.containerBlockType = 'library_container';
    this.itemBlockType = 'as_item';
      
    this.appendDummyInput("import_file")
      .appendField(new Blockly.FieldDropdown([
        ["Library", "Library"],
        ["Resource", "Resource"],
      ]), "import_type")
      .appendField(new Blockly.FieldTextInput("Import_Resource"), "import_resource")
    
    this.appendValueInput("args")
        .appendField("  ")
        .setCheck("Variable")

    this.updateShape_()
    
    this.setInputsInline(true);
    this.setMutator(new Blockly.icons.MutatorIcon([this.itemBlockType], this));
    this.setOutput(true, 'Array');
    this.setTooltip("Create a list with any number of items");
  },

  updateShape_: function() {
    if (this.getInput('LIBRARY_AS')) {
      this.removeInput('LIBRARY_AS');
    }

    if (this.itemCount_ > 0) {
      this.appendDummyInput('LIBRARY_AS')
        .appendField("AS")
        .appendField(new Blockly.FieldTextInput("Library_Name"), "library_name");
    }
  },
  ...Library_MutatorMixin
};

Blockly.Blocks['library_container'] = {
  init: function() {
    this.appendValueInput('STACK')
        .appendField("Import Resource")
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
      .appendField("AS")
      .appendField("Other Name");

    this.setOutput(true, "Variable");  
    this.setColour(260);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['Import_Library'] = function(block) {
return ``;
};

// @blockly/block-plus-minus
// image -> https://github.com/google/blockly-samples/blob/2d4d03f1e35a3608965ebca858bbc8cd8fb5539d/plugins/block-plus-minus/src/field_plus.js
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
Blockly.Blocks['custom_plus_minus'] = { 
  init: function() {
    this.elseCount_ = 0;
    
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
          this.addElse_();
        }))
        .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
          this.removeElse_();
        }))
        .appendField("if")
    
    this.appendValueInput("IF0")
        .setCheck("Boolean");
    this.appendStatementInput("DO0")
        .appendField("do");
        
    this.setColour(210);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.updateShape_();
  },

  addElse_: function() {
    this.elseCount_++;
    this.updateShape_();
  },

  removeElse_: function() {
    if (this.elseCount_ > 0) {
      // 先移除 ELSE input（如果存在）
      if (this.getInput('ELSE')) {
        this.removeInput('ELSE');
      }
      this.elseCount_--;
      this.updateShape_();
    }
  },

  updateShape_: function() {
    // 確保先移除舊的 ELSE input
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    
    // 移除所有現有的 else 輸入
    for (let i = 1; this.getInput('IF' + i); i++) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
    }
    
    // 重新建立 else if 輸入
    for (let i = 1; i <= this.elseCount_; i++) {
      this.appendValueInput('IF' + i)
          .setCheck('Boolean')
          .appendField('else if');
      this.appendStatementInput('DO' + i)
          .appendField('do');
    }
    
    // 如果有 else，加入最後的 else
    if (this.elseCount_ > 0) {
      this.appendStatementInput('ELSE')
          .appendField('else');
    }
  },

  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('else', this.elseCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.updateShape_();
  }
};

// 2. 定義 JavaScript 生成器
pythonGenerator.forBlock['custom_plus_minus'] = function(block) {
  return ``;
};


// Note： Open Connection 初始版 
// Telnet: Open Connection
const open_connection_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasAlias', this.hasAlias_);
    container.setAttribute('hasPort', this.hasPort_);
    container.setAttribute('hasTimeout', this.hasTimeout_);
    container.setAttribute('hasNewline', this.hasNewline_);
    container.setAttribute('hasPrompt', this.hasPrompt_);
    container.setAttribute('hasPromptIsRegexp', this.hasPromptIsRegexp_);
    container.setAttribute('hasEncoding', this.hasEncoding_);
    container.setAttribute('hasEncodingErrors', this.hasEncodingErrors_);
    container.setAttribute('hasDefaultLogLevel', this.hasDefaultLogLevel_);
    container.setAttribute('hasWindowSize', this.hasWindowSize_);
    container.setAttribute('hasEnvironUser', this.hasEnvironUser_);
    container.setAttribute('hasTerminalEmulation', this.hasTerminalEmulation_);
    container.setAttribute('hasTerminalType', this.hasTerminalType_);
    container.setAttribute('hasTelnetlibLogLevel', this.hasTelnetlibLogLevel_);
    container.setAttribute('hasConnectionTimeout', this.hasConnectionTimeout_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasAlias_ = xmlElement.getAttribute('hasAlias') === 'true';
    this.hasPort_ = xmlElement.getAttribute('hasPort') === 'true';
    this.hasTimeout_ = xmlElement.getAttribute('hasTimeout') === 'true';
    this.hasNewline_ = xmlElement.getAttribute('hasNewline') === 'true';
    this.hasPrompt_ = xmlElement.getAttribute('hasPrompt') === 'true';
    this.hasPromptIsRegexp_ = xmlElement.getAttribute('hasPromptIsRegexp') === 'true';
    this.hasEncoding_ = xmlElement.getAttribute('hasEncoding') === 'true';
    this.hasEncodingErrors_ = xmlElement.getAttribute('hasEncodingErrors') === 'true';
    this.hasDefaultLogLevel_ = xmlElement.getAttribute('hasDefaultLogLevel') === 'true';
    this.hasWindowSize_ = xmlElement.getAttribute('hasWindowSize') === 'true';
    this.hasEnvironUser_ = xmlElement.getAttribute('hasEnvironUser') === 'true';
    this.hasTerminalEmulation_ = xmlElement.getAttribute('hasTerminalEmulation') === 'true';
    this.hasTerminalType_ = xmlElement.getAttribute('hasTerminalType') === 'true';
    this.hasTelnetlibLogLevel_ = xmlElement.getAttribute('hasTelnetlibLogLevel') === 'true';
    this.hasConnectionTimeout_ = xmlElement.getAttribute('hasConnectionTimeout') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('open_connection_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('stack').connection;
    
    if (this.hasAlias_) {
      const aliasBlock = workspace.newBlock('open_connection_alias_item');
      aliasBlock.initSvg();
      connection.connect(aliasBlock.previousConnection);
      connection = aliasBlock.nextConnection;
    }
    
    if (this.hasPort_) {
      const portBlock = workspace.newBlock('open_connection_port_item');
      portBlock.initSvg();
      connection.connect(portBlock.previousConnection);
      connection = portBlock.nextConnection;
    }
    
    if (this.hasTimeout_) {
      const timeoutBlock = workspace.newBlock('open_connection_timeout_item');
      timeoutBlock.initSvg();
      connection.connect(timeoutBlock.previousConnection);
      connection = timeoutBlock.nextConnection;
    }
    
    if (this.hasNewline_) {
      const newlineBlock = workspace.newBlock('open_connection_newline_item');
      newlineBlock.initSvg();
      connection.connect(newlineBlock.previousConnection);
      connection = newlineBlock.nextConnection;
    }
    
    if (this.hasPrompt_) {
      const promptBlock = workspace.newBlock('open_connection_prompt_item');
      promptBlock.initSvg();
      connection.connect(promptBlock.previousConnection);
      connection = promptBlock.nextConnection;
    }
    
    if (this.hasPromptIsRegexp_) {
      const promptIsRegexpBlock = workspace.newBlock('open_connection_prompt_is_regexp_item');
      promptIsRegexpBlock.initSvg();
      connection.connect(promptIsRegexpBlock.previousConnection);
      connection = promptIsRegexpBlock.nextConnection;
    }
    
    if (this.hasEncoding_) {
      const encodingBlock = workspace.newBlock('open_connection_encoding_item');
      encodingBlock.initSvg();
      connection.connect(encodingBlock.previousConnection);
      connection = encodingBlock.nextConnection;
    }

    if (this.hasEncodingErrors_) {
      const encodingErrorsBlock = workspace.newBlock('open_connection_encoding_errors_item');
      encodingErrorsBlock.initSvg();
      connection.connect(encodingErrorsBlock.previousConnection);
      connection = encodingErrorsBlock.nextConnection;
    }

    if (this.hasDefaultLogLevel_) {
      const defaultLogLevelBlock = workspace.newBlock('open_connection_default_log_level_item');
      encodingErrorsBlock.initSvg();
      connection.connect(encodingErrorsBlock.previousConnection);
      connection = encodingErrorsBlock.nextConnection;
    }
    
    if (this.hasWindowSize_) {
      const windowSizeBlock = workspace.newBlock('open_connection_window_size_item');
      windowSizeBlock.initSvg();
      connection.connect(windowSizeBlock.previousConnection);
      connection = windowSizeBlock.nextConnection;
    }

    if (this.hasEnvironUser_) {
      const environUserBlock = workspace.newBlock('open_connection_environ_user_item');
      environUserBlock.initSvg();
      connection.connect(environUserBlock.previousConnection);
      connection = environUserBlock.nextConnection;
    }

    if (this.hasTerminalEmulation_) {
      const terminalEmulationBlock = workspace.newBlock('open_connection_terminal_emulation_item');
      terminalEmulationBlock.initSvg();
      connection.connect(terminalEmulationBlock.previousConnection);
      connection = terminalEmulationBlock.nextConnection;
    }

    if (this.hasTerminalType_) {
      const terminalTypeBlock = workspace.newBlock('open_connection_terminal_type_item');
      terminalTypeBlock.initSvg();
      connection.connect(terminalTypeBlock.previousConnection);
      connection = terminalTypeBlock.nextConnection;
    }

    if (this.hasTelnetlibLogLevel_) {
      const telnetlibLogLevelBlock = workspace.newBlock('open_connection_telnetlib_log_level_item');
      telnetlibLogLevelBlock.initSvg();
      connection.connect(telnetlibLogLevelBlock.previousConnection);
      connection = telnetlibLogLevelBlock.nextConnection;
    }

    if (this.hasConnectionTimeout_) {
      const connectionTimeoutBlock = workspace.newBlock('open_connection_connection_timeout_item');
      connectionTimeoutBlock.initSvg();
      connection.connect(connectionTimeoutBlock.previousConnection);
      connection = connectionTimeoutBlock.nextConnection;
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    // Save connections
    const connections = new Map();
    
    // Save host connection
    const hostInput = this.getInput('host');
    if (hostInput && hostInput.connection && hostInput.connection.targetConnection) {
      connections.set('host', hostInput.connection.targetConnection);
    }
    
    // Save connections for optional parameters
    const paramNames = [
      'alias', 'port', 'timeout', 'newline', 'prompt', 'prompt_is_regexp',
      'encoding', 'encoding_errors', 'default_log_level', 'window_size',
      'environ_user', 'terminal_emulation', 'terminal_type', 'telnetlib_log_level',
      'connection_timeout'
    ];
    
    for (const param of paramNames) {
      const input = this.getInput(param);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(param, input.connection.targetConnection);
      }
    }
    
    // Reset all flags
    this.hasAlias_ = false;
    this.hasPort_ = false;
    this.hasTimeout_ = false;
    this.hasNewline_ = false;
    this.hasPrompt_ = false;
    this.hasPromptIsRegexp_ = false;
    this.hasEncoding_ = false;
    this.hasEncodingErrors_ = false;
    this.hasDefaultLogLevel_ = false;
    this.hasWindowSize_ = false;
    this.hasEnvironUser_ = false;
    this.hasTerminalEmulation_ = false;
    this.hasTerminalType_ = false;
    this.hasTelnetlibLogLevel_ = false;
    this.hasConnectionTimeout_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Parse blocks from mutator dialog
    let itemBlock = containerBlock.getInputTargetBlock('stack');
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicates
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        continue;
      }
      
      // Set flags based on block types
      switch (blockType) {
        case 'open_connection_alias_item':
          this.hasAlias_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_port_item':
          this.hasPort_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_timeout_item':
          this.hasTimeout_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_newline_item':
          this.hasNewline_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_prompt_item':
          this.hasPrompt_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_prompt_is_regexp_item':
          this.hasPromptIsRegexp_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_encoding_item':
          this.hasEncoding_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_encoding_errors_item':
          this.hasEncodingErrors_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_default_log_level_item':
          this.hasDefaultLogLevel_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_window_size_item':
          this.hasWindowSize_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_environ_user_item':
          this.hasEnvironUser_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_terminal_emulation_item':
          this.hasTerminalEmulation_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_terminal_type_item':
          this.hasTerminalType_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_telnetlib_log_level_item':
          this.hasTelnetlibLogLevel_ = true;
          seenTypes.add(blockType);
          break;
        case 'open_connection_connection_timeout_item':
          this.hasConnectionTimeout_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      // Move to next block
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    
    // Update the shape and reconnect saved connections
    this.updateShape_();
    
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    // This function is called when saving the mutator dialog state
    const seenTypes = new Set();
    
    let itemBlock = containerBlock.getInputTargetBlock('stack');
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        continue;
      }
      
      // Save connection for each parameter
      let input;
      switch (blockType) {
        case 'open_connection_alias_item':
          input = this.getInput('alias');
          seenTypes.add(blockType);
          break;
        case 'open_connection_port_item':
          input = this.getInput('port');
          seenTypes.add(blockType);
          break;
        case 'open_connection_timeout_item':
          input = this.getInput('timeout');
          seenTypes.add(blockType);
          break;
        case 'open_connection_prompt_item':
          input = this.getInput('prompt');
          seenTypes.add(blockType);
          break;
        case 'open_connection_prompt_is_regexp_item':
          input = this.getInput('prompt_is_regexp');
          seenTypes.add(blockType);
          break;
        case 'open_connection_encoding_item':
          input = this.getInput('encoding');
          seenTypes.add(blockType);
          break;
        case 'open_connection_encoding_errors_item':
          input = this.getInput('encoding_errors');
          seenTypes.add(blockType);
          break;
        case 'open_connection_default_log_level_item':
          input = this.getInput('default_log_level');
          seenTypes.add(blockType);
          break;
        case 'open_connection_window_size_item':
          input = this.getInput('window_size');
          seenTypes.add(blockType);
          break;
        case 'open_connection_environ_user_item':
          input = this.getInput('environ_user');
          seenTypes.add(blockType);
          break;
        case 'open_connection_terminal_emulation_item':
          input = this.getInput('terminal_emulation');
          seenTypes.add(blockType);
          break;
        case 'open_connection_terminal_type_item':
          input = this.getInput('terminal_type');
          seenTypes.add(blockType);
          break;
        case 'open_connection_telnetlib_log_level_item':
          input = this.getInput('telnetlib_log_level');
          seenTypes.add(blockType);
          break;
        case 'open_connection_connection_timeout_item':
          input = this.getInput('connection_timeout');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  }
};

// Main block definition with mutator
Blockly.Blocks['rb_telnet_open_connection'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Open Connection");
    this.appendValueInput("host")
      .appendField("host：")
      .setCheck("Variable");
    
    // Initialize mutator flags
    this.hasAlias_ = false;
    this.hasPort_ = false;
    this.hasTimeout_ = false;
    this.hasNewline_ = false;
    this.hasPrompt_ = false;
    this.hasPromptIsRegexp_ = false;
    this.hasEncoding_ = false;
    this.hasEncodingErrors_ = false;
    this.hasDefaultLogLevel_ = false;
    this.hasWindowSize_ = false;
    this.hasEnvironUser_ = false;
    this.hasTerminalEmulation_ = false;
    this.hasTerminalType_ = false;
    this.hasTelnetlibLogLevel_ = false;
    this.hasConnectionTimeout_ = false;
    
    // Define which blocks can appear in the mutator dialog
    this.setMutator(new Blockly.icons.MutatorIcon([
      'open_connection_alias_item',
      'open_connection_port_item',
      'open_connection_timeout_item',
      'open_connection_newline_item',
      'open_connection_prompt_item',
      'open_connection_prompt_is_regexp_item',
      'open_connection_encoding_item',
      'open_connection_encoding_errors_item',
      'open_connection_default_log_level_item',
      'open_connection_window_size_item',
      'open_connection_environ_user_item',
      'open_connection_terminal_emulation_item',
      'open_connection_terminal_type_item',
      'open_connection_telnetlib_log_level_item',
      'open_connection_connection_timeout_item'
    ], this));
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("Telnet: Open Connection");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/Telnet.html#Open%20Connection");
  },
  
  updateShape_: function() {
    // Save host connection
    let hostConnection = null;
    const hostInput = this.getInput('host');
    if (hostInput && hostInput.connection && hostInput.connection.targetConnection) {
      hostConnection = hostInput.connection.targetConnection;
    }
    
    // Save other connections
    const connections = new Map();
    const paramNames = [
      'alias', 'port', 'timeout', 'newline', 'prompt', 'prompt_is_regexp',
      'encoding', 'encoding_errors', 'default_log_level', 'window_size',
      'environ_user', 'terminal_emulation', 'terminal_type', 'telnetlib_log_level',
      'connection_timeout'
    ];
    
    for (const param of paramNames) {
      const input = this.getInput(param);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(param, input.connection.targetConnection);
      }
    }
    
    // Remove all inputs except the first dummy input
    const inputList = this.inputList.slice();
    for (let i = 1; i < inputList.length; i++) {
      this.removeInput(inputList[i].name);
    }
    
    // Re-add host input
    this.appendValueInput("host")
      .appendField("host：")
      .setCheck("Variable");
    
    // Reconnect host
    if (hostConnection && this.getInput('host').connection) {
      this.getInput('host').connection.connect(hostConnection);
    }
    
    // Add optional parameters
    if (this.hasAlias_) {
      this.appendValueInput("alias")
        .appendField("alias：")
        .setCheck("Variable");
    }
    
    if (this.hasPort_) {
      this.appendValueInput("port")
        .appendField("port：")
        .setCheck("Variable");
    }
    
    if (this.hasTimeout_) {
      this.appendValueInput("timeout")
        .appendField("timeout：")
        .setCheck("Variable");
    }
    
    if (this.hasNewline_) {
      this.appendValueInput("newline")
        .appendField("newline：")
        .setCheck("Variable");
    }
    
    if (this.hasPrompt_) {
      this.appendValueInput("prompt")
        .appendField("prompt：")
        .setCheck("Variable");
    }
    
    if (this.hasPromptIsRegexp_) {
      this.appendValueInput("prompt_is_regexp")
        .appendField("prompt_is_regexp：")
        .setCheck("Variable");
    }
    
    if (this.hasEncoding_) {
      this.appendValueInput("encoding")
        .appendField("encoding：")
        .setCheck("Variable");
    }
    
    if (this.hasEncodingErrors_) {
      this.appendValueInput("encoding_errors")
        .appendField("encoding_errors：")
        .setCheck("Variable");
    }
    
    if (this.hasDefaultLogLevel_) {
      this.appendValueInput("default_log_level")
        .appendField("default_log_level：")
        .setCheck("Variable");
    }
    
    if (this.hasWindowSize_) {
      this.appendValueInput("window_size")
        .appendField("window_size：")
        .setCheck("Variable");
    }
    
    if (this.hasEnvironUser_) {
      this.appendValueInput("environ_user")
        .appendField("environ_user：")
        .setCheck("Variable");
    }
    
    if (this.hasTerminalEmulation_) {
      this.appendValueInput("terminal_emulation")
        .appendField("terminal_emulation：")
        .setCheck("Variable");
    }
    
    if (this.hasTerminalType_) {
      this.appendValueInput("terminal_type")
        .appendField("terminal_type：")
        .setCheck("Variable");
    }
    
    if (this.hasTelnetlibLogLevel_) {
      this.appendValueInput("telnetlib_log_level")
        .appendField("telnetlib_log_level：")
        .setCheck("Variable");
    }
    
    if (this.hasConnectionTimeout_) {
      this.appendValueInput("connection_timeout")
        .appendField("connection_timeout：")
        .setCheck("Variable");
    }
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },
  
  // Add mutator methods
  ...open_connection_MutatorMixin
};

// Container block for the mutator dialog
Blockly.Blocks['open_connection_container'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Open Connection Parameters");
      
    this.appendStatementInput('stack')
      .setCheck(null);

    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add parameters to Open Connection block");
  }
};

// Item blocks for each parameter
Blockly.Blocks['open_connection_alias_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("alias");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add alias parameter");
  }
};

Blockly.Blocks['open_connection_port_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("port");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add port parameter");
  }
};

Blockly.Blocks['open_connection_timeout_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("timeout");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add timeout parameter");
  }
};

Blockly.Blocks['open_connection_newline_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("newline");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add newline parameter");
  }
};

Blockly.Blocks['open_connection_prompt_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("prompt");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add prompt parameter");
  }
};

Blockly.Blocks['open_connection_prompt_is_regexp_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("prompt_is_regexp");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add prompt_is_regexp parameter");
  }
};

Blockly.Blocks['open_connection_encoding_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("encoding");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add encoding parameter");
  }
};

Blockly.Blocks['open_connection_encoding_errors_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("encoding_errors");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add encoding_errors parameter");
  }
};

Blockly.Blocks['open_connection_default_log_level_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("default_log_level");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add default_log_level parameter");
  }
};

Blockly.Blocks['open_connection_window_size_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("window_size");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add window_size parameter");
  }
};

Blockly.Blocks['open_connection_environ_user_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("environ_user");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add environ_user parameter");
  }
};

Blockly.Blocks['open_connection_terminal_emulation_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("terminal_emulation");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add terminal_emulation parameter");
  }
};

Blockly.Blocks['open_connection_terminal_type_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("terminal_type");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add terminal_type parameter");
  }
};

Blockly.Blocks['open_connection_telnetlib_log_level_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("telnetlib_log_level");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add telnetlib_log_level parameter");
  }
};

Blockly.Blocks['open_connection_connection_timeout_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("connection_timeout");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Add connection_timeout parameter");
  }
};

pythonGenerator.forBlock['rb_telnet_open_connection'] = function(block) {
  // Get host value (always exists)
  let host = pythonGenerator.valueToCode(block, 'host', pythonGenerator.ORDER_ATOMIC) || '';
  host = robotFormate(host, '|', default_indent);
  
  // Define input parameters and their values
  const parameters = [
    'alias', 'port', 'timeout', 'newline', 'prompt', 'prompt_is_regexp',
    'encoding', 'encoding_errors', 'default_log_level', 'window_size',
    'environ_user', 'terminal_emulation', 'terminal_type', 
    'telnetlib_log_level', 'connection_timeout'
  ];
  
  // Build the code
  let code = `Open Connection`;
  code += `${host ? `${robot_indent}${host}` : ''}`;

  parameters.forEach(param => {
    if (block.getInput(param)) {
      let value = pythonGenerator.valueToCode(block, param, pythonGenerator.ORDER_ATOMIC) || '';
      if (value) {
        value = robotFormate(value, '|', default_indent);
        code += `${robot_indent}${param}=${value}`;
      }
    }
  });
  
  code += '\n';
  return code;
};