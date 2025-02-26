import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import {PythonGenerator, pythonGenerator} from 'blockly/python';

// image
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

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
const block_color = 10;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// BuiltIn: Call Method
Blockly.Blocks['rb_builtin_call_method'] = {
  init: function() {
    this.appendValueInput("method_container")
      .appendField("Call Method")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Call Method");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Call%20Method");
  }
};

pythonGenerator.forBlock['rb_builtin_call_method'] = function(block) {
  let method_container = pythonGenerator.valueToCode(block, 'method_container', pythonGenerator.ORDER_ATOMIC) || '';
  method_container = robotFormate(method_container, '|', robot_indent)
  let code = `Call Method${robot_indent}${method_container}\n`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// BuiltIn: Catenate
const Catenate_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasInput', this.hasInput_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasInput_ = xmlElement.getAttribute('hasInput') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('catenate_container');
    containerBlock.initSvg();
    
    if (this.hasInput_) {
      const itemBlock = workspace.newBlock('catenate_item');
      itemBlock.initSvg();
      containerBlock.getInput('container').connection.connect(itemBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('container');
    let connection = null;
    
    const input = this.getInput('option_input');
    if (input && input.connection && input.connection.targetConnection) {
      connection = input.connection.targetConnection;
    }
    
    this.hasInput_ = !!itemBlock;
    this.updateShape_();
    
    if (connection && this.hasInput_) {
      const newInput = this.getInput('option_input');
      if (newInput && newInput.connection) {
        newInput.connection.connect(connection);
      }
    }
  },

  saveConnections: function(containerBlock) {
    const itemBlock = containerBlock.getInputTargetBlock('container');
    if (itemBlock) {
      const input = this.getInput('connect_block_container');
      if (input && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
    }
  }
};

Blockly.Blocks['rb_builtin_catenate'] = {
  init: function() {
    this.containerBlockType = 'catenate_container';
    this.itemBlockTypes = ['catenate_item'];
    this.hasInput_ = false;

    this.appendDummyInput("")
      .appendField("Catenate");
    
    this.appendValueInput("connect_block_container")
      .setCheck("Variable");
    
    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Catenate");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Catenate");
  },

  updateShape_: function() {
    let containerConnection = null;
    const containerInput = this.getInput('connect_block_container');
    if (containerInput && containerInput.connection && containerInput.connection.targetConnection) {
      containerConnection = containerInput.connection.targetConnection;
    }
  
    const inputs = this.inputList.slice();
    for (let i = 1; i < inputs.length; i++) {
      this.removeInput(inputs[i].name);
    }
  
    if (this.hasInput_) {
      this.appendDummyInput('option_input')
        .appendField("SEPARATOR=")
        .appendField(new Blockly.FieldTextInput(''), 'option_input')
        .appendField(" ")
    }
  
    this.appendValueInput('connect_block_container')
      .setCheck("Variable");
  
    if (containerConnection && this.getInput('connect_block_container').connection) {
      this.getInput('connect_block_container').connection.connect(containerConnection);
    }
  },

  ...Catenate_MutatorMixin
};

// Container block
Blockly.Blocks['catenate_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Catenate");
    
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

// Item block
Blockly.Blocks['catenate_item'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("SEPARATOR");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_catenate'] = function(block) {
  let code = `Catenate${robot_indent}`;
  if (block.hasInput_) {
    let separator = block.getFieldValue('option_input') || '';
    code += `SEPARATOR=${separator}${robot_indent}`;
  }

  const containerBlock = block.getInputTargetBlock('connect_block_container');
  if (containerBlock) {
    let variableCode = pythonGenerator.valueToCode(block, 'connect_block_container', pythonGenerator.ORDER_ATOMIC) || '';
    variableCode = robotFormate(variableCode, '|', robot_indent)
    code += variableCode;
  }

  code += '\n';
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

// BuiltIn: Comment
registerFieldMultilineInput();
Blockly.Blocks['rb_builtin_comment'] = {
  init: function () {
    this.appendDummyInput('rb_builtin_comment')
      .appendField("Comments=")

    this.appendDummyInput()
      .appendField(
        new FieldMultilineInput(
          'Description:\nAuthor:\nDate:\nVersion:'
        ),
        'COMMENT'
      );
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null) 
    this.setColour(block_color);
    this.setTooltip("BuiltIn：Multiline Comment");
    this.setHelpUrl("");
  },
};
pythonGenerator.forBlock['rb_builtin_comment'] = function(block) {
  let comment_text = block.getFieldValue('COMMENT');

  const lines = comment_text.split('\n');
  let formatted_comment = '';
  
  if (lines.length > 0) {
    // 第一行作為主要 Comment 內容
    formatted_comment = `Comment${robot_indent}${lines[0]}`;
    // 從第二行開始，每行前面添加 "..."
    for (let i = 1; i < lines.length; i++) {
      formatted_comment += `\n...${robot_indent}${robot_indent}${lines[i]}`;
    }
  } else {
    formatted_comment = `Comment${robot_indent}`;
  }
  
  return formatted_comment + '\n';
};

// BuiltIn: Create Dictionary
Blockly.Blocks['rb_builtin_create_dictionary'] = {
  init: function() {
    this.appendValueInput("create_dictionary_container")
      .appendField("Create Dictionary")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Create Dictionary");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Create%20Dictionary");
  }
}
pythonGenerator.forBlock['rb_builtin_create_dictionary'] = function(block) {
  let value = pythonGenerator.valueToCode(block, 'create_dictionary_container', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)
  let code = `Create Dictionary${robot_indent}${value}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];

};

// BuiltIn: Create List
Blockly.Blocks['rb_builtin_create_list'] = {
  init: function() {
    this.appendValueInput("create_list_container")
      .appendField("Create List")
      .setCheck("Variable")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Create List");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Create%20List");
  }
}
pythonGenerator.forBlock['rb_builtin_create_list'] = function(block) {
  let connect_block_container = pythonGenerator.valueToCode(block, 'create_list_container', pythonGenerator.ORDER_ATOMIC) || '';
  let connect_blocks = robotFormate(connect_block_container, '|', robot_indent)
  let code = `Create List${robot_indent}${connect_blocks}\n`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};


// BuiltIn: Repeat Keyword
Blockly.Blocks['rb_builtin_repeat_keyword'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendDummyInput("container")
      .appendField("Repeat Keyword")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));

    this.appendValueInput("repeats")
      .appendField("Repeat：")
      .setCheck(null);
    
    this.appendValueInput("keyword")
      .appendField("KeyWord Name：")
      .setCheck(null);
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Repeat Keyword");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Repeat%20Keyword");
  },
  
  // 保存狀態
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('arguments', this.argumentCount_);
    return container;
  },

  // 從 DOM 讀取狀態
  domToMutation: function(xmlElement) {
    this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10) || 1;
    this.updateShape_();
  },
  
  // 更新 block 外觀
  updateShape_: function() {
    // 移除所有現有的參數輸入
    for (let i = 0; this.getInput('argument' + i); i++) {
      this.removeInput('argument' + i);
    }
    
    // 重建參數輸入
    for (let i = 0; i < this.argumentCount_; i++) {
      this.appendValueInput('argument' + i)
          .appendField('Argument：')
          .setCheck(null);
    }
  },

  addArgument_: function() {
    this.argumentCount_++;
    this.updateShape_();
  },
  
  removeArgument_: function() {
    if (this.argumentCount_ > 1) {
      this.argumentCount_--;
      this.updateShape_();
    }
  }
};

pythonGenerator.forBlock['rb_builtin_repeat_keyword'] = function(block) {
  let repeats = pythonGenerator.valueToCode(block, 'repeats', pythonGenerator.ORDER_ATOMIC) || '';
  repeats = robotFormate(repeats)

  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    const arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    args.push(arg);
  }

  let code = `Repeat Keyword`;
  code += `${repeats ? `${robot_indent}${repeats}`:``}`
  code += `${keyword ? `${robot_indent}${keyword}`:``}`

  if (args.length > 0) {
    code+= `${robot_indent}`
    args.forEach(arg => {
      code += `${arg}  `;
    });
  }
  
  code += '\n'
  return code;
};