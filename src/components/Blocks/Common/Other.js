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

// Other: Create KeyWord Arg
Blockly.Blocks['other_create_keyword_arg'] = {
  init: function() {
    this.appendValueInput("arg")
      .appendField("Arg：")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(" = ")
    
    this.appendValueInput("value")
      .setCheck(null);
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Other: Create KeyWord Arg");
  }
};

pythonGenerator.forBlock['other_create_keyword_arg'] = function(block) {
  let arg = pythonGenerator.valueToCode(block, 'arg', pythonGenerator.ORDER_ATOMIC) || '';
  arg = robotFormate(arg, '|', robot_indent)

  let value = pythonGenerator.valueToCode(block, 'value', pythonGenerator.ORDER_ATOMIC) || '';
  value = robotFormate(value, '|', robot_indent)

  let code = `${arg}=${value}\n`;
  return [code,pythonGenerator.ORDER_ATOMIC];
};

// Other: Create Logic Statement
Blockly.Blocks['other_create_logic_statement'] = {
  init: function() {
    this.logicCount = 1; // 跟踪已經添加的邏輯運算符數量

    this.appendValueInput("statement1")
      .setCheck(null);

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["AND", "AND"],
        ["OR", "OR"],
        ["NOT", "NOT"],
      ]), "logic_type1");
    
    this.appendValueInput("statement2")
      .setCheck(null);
    
    this.appendDummyInput("addButton")
      .appendField(new Blockly.FieldImage(
        plusImage, 16, 16, "+", 
        function() {
          // 此函數會在按下按鈕時被調用
          this.sourceBlock_.addLogicInput_();
        }
      ));
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Other: Create Logic Statement");
    
    // 自定義函數，用於添加更多邏輯輸入
    this.addLogicInput_ = function() {
      // 增加計數
      this.logicCount++;
      
      // 先移除添加按鈕
      this.removeInput("addButton");
      
      // 添加新的邏輯運算符和輸入字段
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["AND", "AND"],
          ["OR", "OR"],
          ["NOT", "NOT"],
        ]), "logic_type" + this.logicCount);
      
      this.appendValueInput("statement" + (this.logicCount + 1))
        .setCheck(null);
      
      // 重新添加按鈕
      this.appendDummyInput("addButton")
        .appendField(new Blockly.FieldImage(
          plusImage, 16, 16, "+",
          function() {
            this.sourceBlock_.addLogicInput_();
          }
        ));
    };
  }
};

pythonGenerator.forBlock['other_create_logic_statement'] = function(block) {
  // 處理第一個語句
  let statement1 = pythonGenerator.valueToCode(block, 'statement1', pythonGenerator.ORDER_ATOMIC) || '';
  statement1 = robotFormate(statement1, '|', robot_indent);
  
  let code = statement1;
  
  // 處理所有邏輯運算符和後續語句
  for (let i = 1; i <= block.logicCount; i++) {
    let logic_type = block.getFieldValue('logic_type' + i);
    let statement = pythonGenerator.valueToCode(block, 'statement' + (i + 1), pythonGenerator.ORDER_ATOMIC) || '';
    statement = robotFormate(statement, '|', robot_indent);
    
    code += `${robot_indent}${logic_type}${robot_indent}${statement}`;
  }
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Other: Call KeyWord
Blockly.Blocks['other_call_keyword'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendValueInput("keyword")
      .appendField("KeyWord：")
      .setCheck(null);
    
    this.appendDummyInput("container")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }));
    
    this.appendValueInput("argument0")
      .appendField("Argument：")
      .setCheck(null);
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Other: Call KeyWord");
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

pythonGenerator.forBlock['other_call_keyword'] = function(block) {
  let keyword = pythonGenerator.valueToCode(block, 'keyword', pythonGenerator.ORDER_ATOMIC) || '';
  keyword = robotFormate(keyword)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', default_indent)
    args.push(arg);
  }

  let code = `${keyword ? `${split_mark}${keyword}`:``}`

  if (args.length > 0) {
    code+= `${robot_indent}`
    args.forEach(arg => {
      code += `${arg}  `;
    });
  }
  
  code += '\n'
  return [code,pythonGenerator.ORDER_ATOMIC];
};
