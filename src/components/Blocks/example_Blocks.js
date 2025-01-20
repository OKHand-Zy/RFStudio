import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
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

//Test
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
