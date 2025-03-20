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

// DateTime: Subtract Date From Date
const subtract_date_from_date_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasResultFormat', this.hasResultFormat_);
    container.setAttribute('hasExcludeMillis', this.hasExcludeMillis_);
    container.setAttribute('hasDate1Format', this.hasDate1Format_);
    container.setAttribute('hasDate2Format', this.hasDate2Format_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasResultFormat_ = xmlElement.getAttribute('hasResultFormat') === 'true';
    this.hasExcludeMillis_ = xmlElement.getAttribute('hasExcludeMillis') === 'true';
    this.hasDate1Format_ = xmlElement.getAttribute('hasDate1Format') === 'true';
    this.hasDate2Format_ = xmlElement.getAttribute('hasDate2Format') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('gcd_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('value_container').connection;
    
    if (this.hasResultFormat_) {
      const resultFormatBlock = workspace.newBlock('gcd_result_format_item');
      resultFormatBlock.initSvg();
      connection.connect(resultFormatBlock.outputConnection);
      connection = resultFormatBlock.getInput('result_format_container').connection;
    }

    if (this.hasExcludeMillis_) {
      const excludeMillisBlock = workspace.newBlock('gcd_exclude_millis_item');
      excludeMillisBlock.initSvg();
      connection.connect(excludeMillisBlock.outputConnection);
      connection = excludeMillisBlock.getInput('exclude_millis_container').connection;
    }

    if (this.hasDate1Format_) {
      const date1FormatBlock = workspace.newBlock('gcd_date1_format_item');
      date1FormatBlock.initSvg();
      connection.connect(date1FormatBlock.outputConnection);
      connection = date1FormatBlock.getInput('date1_format_container').connection;
    }

    if (this.hasDate2Format_) {
      const date2FormatBlock = workspace.newBlock('gcd_date2_format_item');
      date2FormatBlock.initSvg();
      connection.connect(date2FormatBlock.outputConnection);
      connection = date2FormatBlock.getInput('date2_format_container').connection;
    }
        
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    
    // Store connections for reconnection
    const connections = new Map();
    // 保存date输入的连接
    const date1Input = this.getInput('date1');
    if (date1Input && date1Input.connection && date1Input.connection.targetConnection) {
      connections.set('date1', date1Input.connection.targetConnection);
    }
    const date2Input = this.getInput('date2');
    if (date2Input && date2Input.connection && date2Input.connection.targetConnection) {
      connections.set('date2', date2Input.connection.targetConnection);
    }
    
    // 保存其他参数输入的连接
    ['result_format', 'exclude_millis', 'date1_format', 'date2_format'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.hasResultFormat_ = false;
    this.hasExcludeMillis_ = false;
    this.hasDate1Format_ = false;
    this.hasDate2Format_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                        itemBlock.getInputTargetBlock('exclude_millis_container') ||
                        itemBlock.getInputTargetBlock('date1_format_container') ||
                        itemBlock.getInputTargetBlock('date2_format_container');
        
        // Disconnect this block
        if (itemBlock.outputConnection && itemBlock.outputConnection.targetConnection) {
          itemBlock.outputConnection.targetConnection.disconnect();
        }
        
        // Move to next block
        itemBlock = nextBlock;
        continue;
      }
      
      // Process the block
      switch(blockType) {
        case 'gcd_result_format_item':
          this.hasResultFormat_ = true;
          seenTypes.add(blockType);
          break;
        case 'gcd_exclude_millis_item':
          this.hasExcludeMillis_ = true;
          seenTypes.add(blockType);
          break;
        case 'gcd_date1_format_item':
          this.hasDate1Format_ = true;
          seenTypes.add(blockType);
          break;
        case 'gcd_date2_format_item':
          this.hasDate2Format_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                itemBlock.getInputTargetBlock('exclude_millis_container') ||
                itemBlock.getInputTargetBlock('date1_format_container') ||
                itemBlock.getInputTargetBlock('date2_format_container');
    }
    
    this.updateShape_();
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                  itemBlock.getInputTargetBlock('exclude_millis_container') ||
                  itemBlock.getInputTargetBlock('date1_format_container') ||
                  itemBlock.getInputTargetBlock('date2_format_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'gcd_result_format_item':
          input = this.getInput('result_format');
          seenTypes.add(blockType);
          break;
        case 'gcd_exclude_millis_item':
          input = this.getInput('exclude_millis');
          seenTypes.add(blockType);
          break;
        case 'gcd_date1_format_item':
          input = this.getInput('date1_format');
          seenTypes.add(blockType);
          break;
        case 'gcd_date2_format_item':
          input = this.getInput('date2_format');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                itemBlock.getInputTargetBlock('exclude_millis_container') ||
                itemBlock.getInputTargetBlock('date1_format_container') ||
                itemBlock.getInputTargetBlock('date2_format_container');
    }
  }
};

// Main block definition
Blockly.Blocks['rbl_datetime_subtract_date_from_date'] = {
  init: function() {
    this.containerBlockType = 'gcd_container';
    this.itemBlockTypes = ['gcd_result_format_item', 'gcd_exclude_millis_item', 'gcd_date1_format_item', 'gcd_date2_format_item'];
    this.hasResultFormat_ = false;
    this.hasExcludeMillis_ = false;
    this.hasDate1Format_ = false;
    this.hasDate2Format_ = false;
    
    this.appendDummyInput('title')
      .appendField('Subtract Date From Date');
    
    this.appendValueInput('date1')
      .appendField('Date1:'); 
    
    this.appendValueInput('date2')
      .appendField('Date2:'); 

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('DateTime: Subtract Date From Date');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/DateTime.html#Subtract%20Date%20From%20Date');
  },

  updateShape_: function() {
    // 保存date输入的连接
    let date1Connection = null;
    let date2Connection = null;

    const date1Input = this.getInput('date1');
    if (date1Input && date1Input.connection && date1Input.connection.targetConnection) {
      date1Connection = date1Input.connection.targetConnection;
    }
    const date2Input = this.getInput('date2');
    if (date2Input && date2Input.connection && date2Input.connection.targetConnection) {
      date2Connection = date2Input.connection.targetConnection;
    }
    
    // 移除title之后的所有输入
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }
    
    // 重新添加date输入
    this.appendValueInput('date1')
      .appendField('Date1:');
    
    this.appendValueInput('date2')
      .appendField('Date2:');

    // 如果有连接，恢复它
    if (date1Connection && this.getInput('date1').connection) {
      this.getInput('date1').connection.connect(date1Connection);
    }
    if (date2Connection && this.getInput('date2').connection) {
      this.getInput('date2').connection.connect(date2Connection);
    }

    // 添加可选参数输入
    if (this.hasResultFormat_) {
      this.appendDummyInput('result_format')
        .appendField("result_format：")
        .appendField(new Blockly.FieldTextInput('default'), 'result_format_arg');
    }

    if (this.hasExcludeMillis_) {
      this.appendDummyInput('exclude_millis')
        .appendField("exclude_millis：")
        .appendField(new Blockly.FieldDropdown([
          ["default", ""],
          ["False", "False"],
          ["True", "True"],
        ]), "exclude_millis_arg");
    }

    if (this.hasDate1Format_) {
      this.appendDummyInput('date1_format')
        .appendField("date1_format：")
        .appendField(new Blockly.FieldTextInput('default'), 'date1_format_arg');
    }

    if (this.hasDate2Format_) {
      this.appendDummyInput('date2_format')
        .appendField("date2_format：")
        .appendField(new Blockly.FieldTextInput('default'), 'date2_format_arg');
    }
    
  },

  ...subtract_date_from_date_MutatorMixin
};

// Mutator container block
Blockly.Blocks['gcd_container'] = {
  init: function() {
    this.appendValueInput('value_container')
      .appendField("Subtract Date From Date");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Subtracts time from date and returns the resulting date.");
  }
};

// Mutator item blocks
Blockly.Blocks['gcd_result_format_item'] = {
  init: function() {
    this.appendValueInput('result_format_container')
      .appendField("arg:result_format");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['gcd_exclude_millis_item'] = {
  init: function() {
    this.appendValueInput('exclude_millis_container')
      .appendField("arg:exclude_millis");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['gcd_date1_format_item'] = {
  init: function() {
    this.appendValueInput('date1_format_container')
      .appendField("arg:date1_format");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['gcd_date2_format_item'] = {
  init: function() {
    this.appendValueInput('date2_format_container')
      .appendField("arg:date2_format");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rbl_datetime_subtract_date_from_date'] = function(block) {
  let code = 'Subtract Date From Date';

  let date1 = pythonGenerator.valueToCode(block, 'date1', pythonGenerator.ORDER_ATOMIC) || '';
  date1 = robotFormate(date1, '|', ' ');
  code += `${date1 ? `${robot_indent}${date1}` : ''}`;

  let date2 = pythonGenerator.valueToCode(block, 'date2', pythonGenerator.ORDER_ATOMIC) || '';
  date2 = robotFormate(date2, '|', ' ');
  code += `${date2 ? `${robot_indent}${date2}` : ''}`;

  if (block.hasResultFormat_) {
    let resulFormatArg = block.getFieldValue('result_format_arg') || '';
    if (resulFormatArg == 'default') {
      resulFormatArg = '';
    }
    code += `${resulFormatArg ? `${robot_indent}result_format=${resulFormatArg}` : ''}`;
  }
  
  if (block.hasExcludeMillis_) {
    const excludeMillisArg = block.getFieldValue('exclude_millis_arg') || '';
    code += `${excludeMillisArg ? `${robot_indent}exclude_millis=${excludeMillisArg}` : ''}`;
  }

  if (block.hasDate1Format_) {
    let date1FormatArg = block.getFieldValue('date1_format_arg') || '';
    if (date1FormatArg == 'default') {
      date1FormatArg = '';
    }
    code += `${date1FormatArg ? `${robot_indent}date1_format=${date1FormatArg}` : ''}`;
  }
  
  if (block.hasDate2Format_) {
    let date2FormatArg = block.getFieldValue('date2_format_arg') || '';
    if (date2FormatArg == 'default') {
      date2FormatArg = '';
    }
    code += `${date2FormatArg ? `${robot_indent}date2_format=${date2FormatArg}` : ''}`;
  }

  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// DateTime: Subtract Time From Date
const subtract_time_from_date_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasResultFormat', this.hasResultFormat_);
    container.setAttribute('hasExcludeMillis', this.hasExcludeMillis_);
    container.setAttribute('hasDateFormat', this.hasDateFormat_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasResultFormat_ = xmlElement.getAttribute('hasResultFormat') === 'true';
    this.hasExcludeMillis_ = xmlElement.getAttribute('hasExcludeMillis') === 'true';
    this.hasDateFormat_ = xmlElement.getAttribute('hasDateFormat') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('gcd_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('value_container').connection;
    
    if (this.hasResultFormat_) {
      const resultFormatBlock = workspace.newBlock('gcd_result_format_item');
      resultFormatBlock.initSvg();
      connection.connect(resultFormatBlock.outputConnection);
      connection = resultFormatBlock.getInput('result_format_container').connection;
    }

    if (this.hasExcludeMillis_) {
      const excludeMillisBlock = workspace.newBlock('gcd_exclude_millis_item');
      excludeMillisBlock.initSvg();
      connection.connect(excludeMillisBlock.outputConnection);
      connection = excludeMillisBlock.getInput('exclude_millis_container').connection;
    }
    
    if (this.hasDateFormat_) {
      const dateFormatBlock = workspace.newBlock('gcd_date_format_item');
      dateFormatBlock.initSvg();
      connection.connect(dateFormatBlock.outputConnection);
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    
    // Store connections for reconnection
    const connections = new Map();
    // 保存date输入的连接
    const dateInput = this.getInput('date');
    if (dateInput && dateInput.connection && dateInput.connection.targetConnection) {
      connections.set('date', dateInput.connection.targetConnection);
    }
    
    // 保存其他参数输入的连接
    ['result_format', 'exclude_millis', 'date_format'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.hasResultFormat_ = false;
    this.hasExcludeMillis_ = false;
    this.hasDateFormat_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                        itemBlock.getInputTargetBlock('exclude_millis_container') ||
                        itemBlock.getInputTargetBlock('date_format_container');
        
        // Disconnect this block
        if (itemBlock.outputConnection && itemBlock.outputConnection.targetConnection) {
          itemBlock.outputConnection.targetConnection.disconnect();
        }
        
        // Move to next block
        itemBlock = nextBlock;
        continue;
      }
      
      // Process the block
      switch(blockType) {
        case 'gcd_result_format_item':
          this.hasResultFormat_ = true;
          seenTypes.add(blockType);
          break;
        case 'gcd_exclude_millis_item':
          this.hasExcludeMillis_ = true;
          seenTypes.add(blockType);
          break;
        case 'gcd_date_format_item':
          this.hasDateFormat_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                itemBlock.getInputTargetBlock('exclude_millis_container') ||
                itemBlock.getInputTargetBlock('date_format_container');
    }
    
    this.updateShape_();
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                  itemBlock.getInputTargetBlock('exclude_millis_container') ||
                  itemBlock.getInputTargetBlock('date_format_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'gcd_result_format_item':
          input = this.getInput('result_format');
          seenTypes.add(blockType);
          break;
        case 'gcd_exclude_millis_item':
          input = this.getInput('exclude_millis');
          seenTypes.add(blockType);
          break;
        case 'gcd_date_format_item':
          input = this.getInput('date_format');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                itemBlock.getInputTargetBlock('exclude_millis_container') ||
                itemBlock.getInputTargetBlock('date_format_container');
    }
  }
};

// Main block definition
Blockly.Blocks['rbl_datetime_subtract_time_from_date'] = {
  init: function() {
    this.containerBlockType = 'gcd_container';
    this.itemBlockTypes = ['gcd_result_format_item', 'gcd_exclude_millis_item', 'gcd_date_format_item'];
    this.hasResultFormat_ = false;
    this.hasExcludeMillis_ = false;
    this.hasDateFormat_ = false;
    
    this.appendDummyInput('title')
      .appendField('Subtract Time From Date');
    
    this.appendValueInput('date')
      .appendField('Date:'); 
    
    this.appendValueInput('time')
      .appendField('Time:'); 

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('DateTime: Subtract Time From Date');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/DateTime.html#Subtract%20Time%20From%20Date');
  },

  updateShape_: function() {
    // 保存date输入的连接
    let dateConnection = null;
    const dateInput = this.getInput('date');
    if (dateInput && dateInput.connection && dateInput.connection.targetConnection) {
      dateConnection = dateInput.connection.targetConnection;
    }
    const timeInput = this.getInput('time');
    if (timeInput && timeInput.connection && timeInput.connection.targetConnection) {
      dateConnection = timeInput.connection.targetConnection;
    }
    
    // 移除title之后的所有输入
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }
    
    // 重新添加date输入
    this.appendValueInput('date')
      .appendField('Date:');
    
    this.appendValueInput('time')
      .appendField('Time:');

    // 如果有连接，恢复它
    if (dateConnection && this.getInput('date').connection) {
      this.getInput('date').connection.connect(dateConnection);
    }
    if (dateConnection && this.getInput('time').connection) {
      this.getInput('time').connection.connect(dateConnection);
    }

    // 添加可选参数输入
    if (this.hasResultFormat_) {
      this.appendDummyInput('result_format')
        .appendField("result_format：")
        .appendField(new Blockly.FieldTextInput('default'), 'result_format_arg');
    }

    if (this.hasExcludeMillis_) {
      this.appendDummyInput('exclude_millis')
        .appendField("exclude_millis：")
        .appendField(new Blockly.FieldDropdown([
          ["default", ""],
          ["False", "False"],
          ["True", "True"],
        ]), "exclude_millis_arg");
    }
    
    if (this.hasDateFormat_) {
      this.appendDummyInput('date_format')
        .appendField("date_format：")
        .appendField(new Blockly.FieldTextInput('default'), 'date_format_arg');
    }
  },

  ...subtract_time_from_date_MutatorMixin
};

// Mutator container block
Blockly.Blocks['gcd_container'] = {
  init: function() {
    this.appendValueInput('value_container')
      .appendField("Subtract Time From Date");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Subtracts time from date and returns the resulting date.");
  }
};

// Mutator item blocks
Blockly.Blocks['gcd_result_format_item'] = {
  init: function() {
    this.appendValueInput('result_format_container')
      .appendField("arg:result_format");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['gcd_exclude_millis_item'] = {
  init: function() {
    this.appendValueInput('exclude_millis_container')
      .appendField("arg:exclude_millis");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['gcd_date_format_item'] = {
  init: function() {
    this.appendValueInput('date_format_container')
      .appendField("arg:date_format");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rbl_datetime_subtract_time_from_date'] = function(block) {
  let code = 'Subtract Time From Date';

  let date = pythonGenerator.valueToCode(block, 'date', pythonGenerator.ORDER_ATOMIC) || '';
  date = robotFormate(date, '|', default_indent);
  code += `${date ? `${robot_indent}${date}` : ''}`;

  let time = pythonGenerator.valueToCode(block, 'time', pythonGenerator.ORDER_ATOMIC) || '';
  time = robotFormate(time, '|', default_indent);
  code += `${time ? `${robot_indent}${time}` : ''}`;

  if (block.hasResultFormat_) {
    let resulFormatArg = block.getFieldValue('result_format_arg') || '';
    if (resulFormatArg == 'default') {
      resulFormatArg = '';
    }
    code += `${resulFormatArg ? `${robot_indent}result_format=${resulFormatArg}` : ''}`;
  }
  
  if (block.hasExcludeMillis_) {
    const excludeMillisArg = block.getFieldValue('exclude_millis_arg') || '';
    code += `${excludeMillisArg ? `${robot_indent}exclude_millis=${excludeMillisArg}` : ''}`;
  }
  
  if (block.hasDateFormat_) {
    let dateFormatArg = block.getFieldValue('date_format_arg') || '';
    if (dateFormatArg == 'default') {
      dateFormatArg = '';
    }
    code += `${dateFormatArg ? `${robot_indent}date_format=${dateFormatArg}` : ''}`;
  }

  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// DateTime: Subtract Time From Time
const subtract_time_from_time_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasResultFormat', this.hasResultFormat_);
    container.setAttribute('hasExcludeMillis', this.hasExcludeMillis_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasResultFormat_ = xmlElement.getAttribute('hasResultFormat') === 'true';
    this.hasExcludeMillis_ = xmlElement.getAttribute('hasExcludeMillis') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('gcd_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('value_container').connection;
    
    if (this.hasResultFormat_) {
      const resultFormatBlock = workspace.newBlock('gcd_result_format_item');
      resultFormatBlock.initSvg();
      connection.connect(resultFormatBlock.outputConnection);
      connection = resultFormatBlock.getInput('result_format_container').connection;
    }

    if (this.hasExcludeMillis_) {
      const excludeMillisBlock = workspace.newBlock('gcd_exclude_millis_item');
      excludeMillisBlock.initSvg();
      connection.connect(excludeMillisBlock.outputConnection);
      connection = excludeMillisBlock.getInput('exclude_millis_container').connection;
    }
        
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    
    // Store connections for reconnection
    const connections = new Map();
    // 保存date输入的连接
    const time1Input = this.getInput('time1');
    if (time1Input && time1Input.connection && time1Input.connection.targetConnection) {
      connections.set('time1', time1Input.connection.targetConnection);
    }
    const time2Input = this.getInput('time2');
    if (time2Input && time2Input.connection && time2Input.connection.targetConnection) {
      connections.set('time2', time2Input.connection.targetConnection);
    }
    
    // 保存其他参数输入的连接
    ['result_format', 'exclude_millis'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.hasResultFormat_ = false;
    this.hasExcludeMillis_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                        itemBlock.getInputTargetBlock('exclude_millis_container');
        
        // Disconnect this block
        if (itemBlock.outputConnection && itemBlock.outputConnection.targetConnection) {
          itemBlock.outputConnection.targetConnection.disconnect();
        }
        
        // Move to next block
        itemBlock = nextBlock;
        continue;
      }
      
      // Process the block
      switch(blockType) {
        case 'gcd_result_format_item':
          this.hasResultFormat_ = true;
          seenTypes.add(blockType);
          break;
        case 'gcd_exclude_millis_item':
          this.hasExcludeMillis_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                itemBlock.getInputTargetBlock('exclude_millis_container');
    }
    
    this.updateShape_();
    
    // Reconnect saved connections
    connections.forEach((connection, type) => {
      const input = this.getInput(type);
      if (input && input.connection) {
        input.connection.connect(connection);
      }
    });
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('value_container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                  itemBlock.getInputTargetBlock('exclude_millis_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'gcd_result_format_item':
          input = this.getInput('result_format');
          seenTypes.add(blockType);
          break;
        case 'gcd_exclude_millis_item':
          input = this.getInput('exclude_millis');
          seenTypes.add(blockType);
          break;
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('result_format_container') ||
                itemBlock.getInputTargetBlock('exclude_millis_container');
    }
  }
};

// Main block definition
Blockly.Blocks['rbl_datetime_subtract_time_from_time'] = {
  init: function() {
    this.containerBlockType = 'gcd_container';
    this.itemBlockTypes = ['gcd_result_format_item', 'gcd_exclude_millis_item'];
    this.hasResultFormat_ = false;
    this.hasExcludeMillis_ = false;
    
    this.appendDummyInput('title')
      .appendField('Subtract Time From Time');
    
    this.appendValueInput('time1')
      .appendField('Time1:'); 
    
    this.appendValueInput('time2')
      .appendField('Time2:'); 

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip('DateTime: Subtract Time From Time');
    this.setHelpUrl('https://robotframework.org/robotframework/latest/libraries/DateTime.html#Subtract%20Time%20From%20Time');
  },

  updateShape_: function() {
    // 保存date输入的连接
    let time1Connection = null;
    let time2Connection = null;

    const time1Input = this.getInput('time1');
    if (time1Input && time1Input.connection && time1Input.connection.targetConnection) {
      time1Connection = time1Input.connection.targetConnection;
    }
    const time2Input = this.getInput('time2');
    if (time2Input && time2Input.connection && time2Input.connection.targetConnection) {
      time2Connection = time2Input.connection.targetConnection;
    }
    
    // 移除title之后的所有输入
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }
    
    // 重新添加date输入
    this.appendValueInput('time1')
      .appendField('Time1:');
    
    this.appendValueInput('time2')
      .appendField('Time2:');

    // 如果有连接，恢复它
    if (time1Connection && this.getInput('time1').connection) {
      this.getInput('time1').connection.connect(time1Connection);
    }
    if (time2Connection && this.getInput('time2').connection) {
      this.getInput('time2').connection.connect(time2Connection);
    }

    // 添加可选参数输入
    if (this.hasResultFormat_) {
      this.appendDummyInput('result_format')
        .appendField("result_format：")
        .appendField(new Blockly.FieldTextInput('default'), 'result_format_arg');
    }

    if (this.hasExcludeMillis_) {
      this.appendDummyInput('exclude_millis')
        .appendField("exclude_millis：")
        .appendField(new Blockly.FieldDropdown([
          ["default", ""],
          ["False", "False"],
          ["True", "True"],
        ]), "exclude_millis_arg");
    }
    
  },

  ...subtract_time_from_time_MutatorMixin
};

// Mutator container block
Blockly.Blocks['gcd_container'] = {
  init: function() {
    this.appendValueInput('value_container')
      .appendField("Subtract Time From Time");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Subtracts time from date and returns the resulting date.");
  }
};

// Mutator item blocks
Blockly.Blocks['gcd_result_format_item'] = {
  init: function() {
    this.appendValueInput('result_format_container')
      .appendField("arg:result_format");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['gcd_exclude_millis_item'] = {
  init: function() {
    this.appendValueInput('exclude_millis_container')
      .appendField("arg:exclude_millis");

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rbl_datetime_subtract_time_from_time'] = function(block) {
  let code = 'Subtract Time From Time';

  let time1 = pythonGenerator.valueToCode(block, 'time1', pythonGenerator.ORDER_ATOMIC) || '';
  time1 = robotFormate(time1, '|', default_indent);
  code += `${time1 ? `${robot_indent}${time1}` : ''}`;

  let time2 = pythonGenerator.valueToCode(block, 'time2', pythonGenerator.ORDER_ATOMIC) || '';
  time2 = robotFormate(time2, '|', default_indent);
  code += `${time2 ? `${robot_indent}${time2}` : ''}`;

  if (block.hasResultFormat_) {
    let resulFormatArg = block.getFieldValue('result_format_arg') || '';
    if (resulFormatArg == 'default') {
      resulFormatArg = '';
    }
    code += `${resulFormatArg ? `${robot_indent}result_format=${resulFormatArg}` : ''}`;
  }
  
  if (block.hasExcludeMillis_) {
    const excludeMillisArg = block.getFieldValue('exclude_millis_arg') || '';
    code += `${excludeMillisArg ? `${robot_indent}exclude_millis=${excludeMillisArg}` : ''}`;
  }

  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};