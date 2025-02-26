import * as Blockly from 'blockly';
import {registerFieldMultilineInput, FieldMultilineInput} from '@blockly/field-multilineinput';
import {PythonGenerator, pythonGenerator} from 'blockly/python';

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

// BuiltIn: Log
const Log_MutatorMixin = {
    mutationToDom: function() {
      const container = document.createElement('mutation');
      container.setAttribute('haslevel', this.haslevel_);
      container.setAttribute('hashtml', this.hashtml_);
      container.setAttribute('hashconsole', this.hashconsole_);
      container.setAttribute('hashformatter', this.hashformatter_);
      return container;
    },
  
    domToMutation: function(xmlElement) {
      this.haslevel_ = xmlElement.getAttribute('haslevel') === 'true';
      this.hashtml_ = xmlElement.getAttribute('hashtml') === 'true';
      this.hashconsole_ = xmlElement.getAttribute('hashconsole') === 'true';
      this.hashformatter_ = xmlElement.getAttribute('hashformatter') === 'true';
      this.updateShape_();
    },
  
    decompose: function(workspace) {
      const containerBlock = workspace.newBlock('log_option_container');
      containerBlock.initSvg();
      
      let connection = containerBlock.getInput('container').connection;
      
      if (this.haslevel_) {
        const levelBlock = workspace.newBlock('option_level_item');
        levelBlock.initSvg();
        connection.connect(levelBlock.outputConnection);
        connection = levelBlock.getInput('level_container').connection;
      }
    
      if (this.hashtml_) {
        const htmlBlock = workspace.newBlock('option_html_item');
        htmlBlock.initSvg();
        connection.connect(htmlBlock.outputConnection);
        connection = htmlBlock.getInput('html_container').connection;
      }
    
      if (this.hashconsole_) {
        const consoleBlock = workspace.newBlock('option_console_item');
        consoleBlock.initSvg();
        connection.connect(consoleBlock.outputConnection);
        connection = consoleBlock.getInput('console_container').connection;
      }
    
      if (this.hashformatter_) {
        const formatterBlock = workspace.newBlock('option_formatter_item');
        formatterBlock.initSvg();
        connection.connect(formatterBlock.outputConnection);
      }
      
      return containerBlock;
    },
  
    compose: function(containerBlock) {
      let itemBlock = containerBlock.getInputTargetBlock('container');
      
      // Store connections for reconnection
      const connections = new Map();
      ['message', 'level', 'html', 'console', 'formatter'].forEach(type => {
        const input = this.getInput(type);
        if (input && input.connection && input.connection.targetConnection) {
          connections.set(type, input.connection.targetConnection);
        }
      });
      
      // Reset flags
      this.haslevel_ = false;
      this.hashtml_ = false;
      this.hashconsole_ = false;
      this.hashformatter_ = false;
      
      // Track seen block types
      const seenTypes = new Set();
      
      // Process chain of blocks
      while (itemBlock) {
        const blockType = itemBlock.type;
        
        // If we've seen this type before, disconnect it
        if (seenTypes.has(blockType)) {
          const nextBlock = itemBlock.getInputTargetBlock('level_container') ||
                          itemBlock.getInputTargetBlock('html_container') ||
                          itemBlock.getInputTargetBlock('console_container') ||
                          itemBlock.getInputTargetBlock('formatter_container');
          
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
          case 'option_level_item':
            this.haslevel_ = true;
            seenTypes.add(blockType);
            break;
          case 'option_html_item':
            this.hashtml_ = true;
            seenTypes.add(blockType);
            break;
          case 'option_console_item':
            this.hashconsole_ = true;
            seenTypes.add(blockType);
            break;
          case 'option_formatter_item':
            this.hashformatter_ = true;
            seenTypes.add(blockType);
            break;
        }
        
        itemBlock = itemBlock.getInputTargetBlock('level_container') ||
                    itemBlock.getInputTargetBlock('html_container') ||
                    itemBlock.getInputTargetBlock('console_container') ||
                    itemBlock.getInputTargetBlock('formatter_container');
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
      let itemBlock = containerBlock.getInputTargetBlock('container');
      const seenTypes = new Set();
      
      while (itemBlock) {
        const blockType = itemBlock.type;
        
        // Skip duplicate blocks
        if (seenTypes.has(blockType)) {
          itemBlock = itemBlock.getInputTargetBlock('level_container') ||
                    itemBlock.getInputTargetBlock('html_container') ||
                    itemBlock.getInputTargetBlock('console_container') ||
                    itemBlock.getInputTargetBlock('formatter_container');
          continue;
        }
        
        let input;
        switch(blockType) {
          case 'option_level_item':
            input = this.getInput('level');
            seenTypes.add(blockType);
            break;
          case 'option_html_item':
            input = this.getInput('html');
            seenTypes.add(blockType);
            break;
          case 'option_console_item':
            input = this.getInput('console');
            seenTypes.add(blockType);
            break;
          case 'option_formatter_item':
            input = this.getInput('formatter');
            seenTypes.add(blockType);
            break;        
        }
        
        if (input && input.connection && input.connection.targetConnection) {
          itemBlock.valueConnection_ = input.connection.targetConnection;
        }
        
        itemBlock = itemBlock.getInputTargetBlock('level_container') ||
                  itemBlock.getInputTargetBlock('html_container') ||
                  itemBlock.getInputTargetBlock('console_container') ||
                  itemBlock.getInputTargetBlock('formatter_container');
      }
    }
  };
  
  Blockly.Blocks['rb_builtin_Log'] = {
    init: function() {
      this.containerBlockType = 'log_option_container';
      this.itemBlockTypes = ['option_level_item', 'option_html_item', 'option_console_item', 'option_formatter_item'];
      this.haslevel_ = false;
      this.hashtml_ = false;
      this.hashconsole_ = false;
      this.hashformatter_ = false;
  
      this.appendValueInput("message")
        .appendField("Log")
        .setCheck(null);
  
      this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(block_color);
      this.setTooltip("BuiltIn: Log");
      this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Log");
    },
  
    updateShape_: function() {
      // Remove existing inputs except the first one
      const inputs = this.inputList.slice(1);
      for (const input of inputs) {
        this.removeInput(input.name);
      }
      
      if (this.haslevel_) {
        this.appendDummyInput('level_input')
          .appendField("level=")
          .appendField(new Blockly.FieldDropdown([
            ["INFO", "INFO"],
            ["TRACE", "TRACE"],
            ["WARN", "WARN"],
            ["FAIL", "FAIL"],
            ["DEBUG", "DEBUG"],
          ]), "level_arg");
      }
  
      if (this.hashtml_) {
        this.appendDummyInput('html_input')
          .appendField("html=")
          .appendField(new Blockly.FieldDropdown([
            ["False", "False"],
            ["True", "True"],
          ]), "html_arg");
      }
  
      if (this.hashconsole_) {
        this.appendDummyInput('console_input')
          .appendField("console=")
          .appendField(new Blockly.FieldDropdown([
            ["False", "False"],
            ["True", "True"],
          ]), "console_arg");
      }
      
      if (this.hashformatter_) {
        this.appendDummyInput('formatter_input')
          .appendField("formatter=")
          .appendField(new Blockly.FieldDropdown([
            ["str", "str"],
            ["repr", "repr"],
            ["ascii", "ascii"],
            ["len", "len"],
            ["type", "type"],
          ]), "formatter_arg");
      }
  
    },
  
    ...Log_MutatorMixin
  };
  
  Blockly.Blocks['log_option_container'] = {
    init: function() {
      this.appendValueInput('container')
        .appendField("Log");
      this.setColour(block_color);
      this.contextMenu = false;
      this.setTooltip("Logs the given message with the given level.");
    }
  };
  
  Blockly.Blocks['option_level_item'] = {
    init: function() {
      this.appendValueInput('level_container')
        .appendField("arg:level")
  
      this.setOutput(true, null);
      this.setColour(block_color);
      this.contextMenu = false;
    }
  };
  
  Blockly.Blocks['option_html_item'] = {
    init: function() {
      this.appendValueInput('html_container')
        .appendField("arg:html")
  
      this.setOutput(true, null);
      this.setColour(block_color);
      this.contextMenu = false;
    }
  };
  
  Blockly.Blocks['option_console_item'] = {
    init: function() {
      this.appendValueInput('console_container')
        .appendField("arg:console")
  
      this.setOutput(true, null);
      this.setColour(block_color);
      this.contextMenu = false;
    }
  };
  
  Blockly.Blocks['option_formatter_item'] = {
    init: function() {
      this.appendValueInput('formatter_container')
        .appendField("arg:formatter")
  
      this.setOutput(true, null);
      this.setColour(block_color);
      this.contextMenu = false;
    }
  };
  
  pythonGenerator.forBlock['rb_builtin_Log'] = function(block) {
    let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
    message = robotFormate(message)
    const kwargs = [];
  
    if (block.haslevel_) {
      const level = block.getFieldValue('level_arg');
      kwargs.push(`level=${level}`);
    }
    
    if (block.hashtml_) {
      const html = block.getFieldValue('html_arg');
      kwargs.push(`html=${html}`);
    }
    
    if (block.hashconsole_) {
      const console = block.getFieldValue('console_arg');
      kwargs.push(`console=${console}`);
    }
    
    if (block.hashformatter_) {
      const formatter = block.getFieldValue('formatter_arg');
      kwargs.push(`formatter=${formatter}`);
    }
    
    // Combine all arguments
    let code = `Log${robot_indent}${message ? `${message}${robot_indent}` : ''}`;
    if (kwargs.length > 0) {
      code += kwargs.join(`${robot_indent}`);
    }
    code += '\n';
    return code;
  }

// BuiltIn: Log Many
Blockly.Blocks['rb_builtin_log_many'] = {
  init: function() {
    this.appendValueInput("messages")
      .appendField("Log Many")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Log Many");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Log%20Many");
  }
};

pythonGenerator.forBlock['rb_builtin_log_many'] = function(block) {
  let messages = pythonGenerator.valueToCode(block, 'messages', pythonGenerator.ORDER_ATOMIC);
  messages = robotFormate(messages) 
  return `Log Many${robot_indent}${messages}`;
};

// BuiltIn: Log To Console
const Log2Console_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('has_stream', this.has_stream_);
    container.setAttribute('has_newline', this.has_newline_);
    container.setAttribute('has_format', this.has_format_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.has_stream_ = xmlElement.getAttribute('has_stream') === 'true';
    this.has_newline_ = xmlElement.getAttribute('has_newline') === 'true';
    this.has_format_ = xmlElement.getAttribute('has_format') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('log2console_option_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
      
    if (this.has_stream_) {
      const htmlBlock = workspace.newBlock('option_stream_item');
      htmlBlock.initSvg();
      connection.connect(htmlBlock.outputConnection);
      connection = htmlBlock.getInput('stream_container').connection;
    }
  
    if (this.has_newline_) {
      const consoleBlock = workspace.newBlock('option_newline_item');
      consoleBlock.initSvg();
      connection.connect(consoleBlock.outputConnection);
      connection = consoleBlock.getInput('newline_container').connection;
    }
  
    if (this.has_format_) {
      const formatterBlock = workspace.newBlock('option_format_item');
      formatterBlock.initSvg();
      connection.connect(formatterBlock.outputConnection);
      connection = formatterBlock.getInput('format_container').connection;
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('container');
    
    // Store connections for reconnection
    const connections = new Map();
    ['stream', 'newline', 'format'].forEach(type => {
      const input = this.getInput(type);
      if (input && input.connection && input.connection.targetConnection) {
        connections.set(type, input.connection.targetConnection);
      }
    });
    
    // Reset flags
    this.has_stream_ = false;
    this.has_newline_ = false;
    this.has_format_ = false;
    
    // Track seen block types
    const seenTypes = new Set();
    
    // Process chain of blocks
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // If we've seen this type before, disconnect it
      if (seenTypes.has(blockType)) {
        const nextBlock = itemBlock.getInputTargetBlock('stream_container') ||
                        itemBlock.getInputTargetBlock('newline_container') ||
                        itemBlock.getInputTargetBlock('format_container');
        
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
        case 'option_stream_item':
          this.has_stream_ = true;
          seenTypes.add(blockType);
          break;
        case 'option_newline_item':
          this.has_newline_ = true;
          seenTypes.add(blockType);
          break;
        case 'option_format_item':
          this.has_format_ = true;
          seenTypes.add(blockType);
          break;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('stream_container') ||
                  itemBlock.getInputTargetBlock('newline_container') ||
                  itemBlock.getInputTargetBlock('format_container');
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
    let itemBlock = containerBlock.getInputTargetBlock('container');
    const seenTypes = new Set();
    
    while (itemBlock) {
      const blockType = itemBlock.type;
      
      // Skip duplicate blocks
      if (seenTypes.has(blockType)) {
        itemBlock = itemBlock.getInputTargetBlock('stream_container') ||
                  itemBlock.getInputTargetBlock('newline_container') ||
                  itemBlock.getInputTargetBlock('format_container');
        continue;
      }
      
      let input;
      switch(blockType) {
        case 'option_stream_item':
          input = this.getInput('stream');
          seenTypes.add(blockType);
          break;
        case 'option_newline_item':
          input = this.getInput('newline');
          seenTypes.add(blockType);
          break;
        case 'option_format_item':
          input = this.getInput('format');
          seenTypes.add(blockType);
          break;      
      }
      
      if (input && input.connection && input.connection.targetConnection) {
        itemBlock.valueConnection_ = input.connection.targetConnection;
      }
      
      itemBlock = itemBlock.getInputTargetBlock('stream_container') ||
                itemBlock.getInputTargetBlock('newline_container') ||
                itemBlock.getInputTargetBlock('format_container');
    }
  }
};

Blockly.Blocks['rb_builtin_log2console'] = {
  init: function() {
    this.containerBlockType = 'log2console_option_container';
    this.itemBlockTypes = ['option_stream_item', 'option_newline_item', 'option_format_item'];
    this.has_stream_ = false;
    this.has_newline_ = false;
    this.has_format_ = false;

    this.appendValueInput("message")
      .appendField("Log To Console")
      .setCheck(null);

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Log To Console");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Log%20To%20Console");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      this.removeInput(input.name);
    }
    
    if (this.has_stream_) {
      this.appendDummyInput('stream_input')
        .appendField("stream=")
        .appendField(new Blockly.FieldDropdown([
          ["STDOUT", "STDOUT"],
          ["STDERR", "STDERR"],
        ]), "stream_arg");
    }

    if (this.has_newline_) {
      this.appendDummyInput('newline_input')
        .appendField("no_newline=")
        .appendField(new Blockly.FieldDropdown([
          ["False", "False"],
          ["True", "True"],
        ]), "newline_arg");
    }

    if (this.has_format_) {
      this.appendDummyInput('format_input')
        .appendField("format=")
        .appendField(new Blockly.FieldTextInput(""), "format_arg");
    }
    
  },

  ...Log2Console_MutatorMixin
};

Blockly.Blocks['log2console_option_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Log");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Logs the given message to the console.");
  }
};

Blockly.Blocks['option_stream_item'] = {
  init: function() {
    this.appendValueInput('stream_container')
      .appendField("arg:stream")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['option_newline_item'] = {
  init: function() {
    this.appendValueInput('newline_container')
      .appendField("arg:newline")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

Blockly.Blocks['option_format_item'] = {
  init: function() {
    this.appendValueInput('format_container')
      .appendField("arg:format")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_log2console'] = function(block) {
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)
  const kwargs = [];
  
  if (block.has_stream_) {
    const stream = block.getFieldValue('stream_arg');
    kwargs.push(`stream=${stream}`);
  }
  
  if (block.has_newline_) {
    const no_newline = block.getFieldValue('newline_arg');
    kwargs.push(`no_newline=${no_newline}`);
  }
  
  if (block.has_format_) {
    const format = block.getFieldValue('format_arg');
    if (format) {
      kwargs.push(`format=${format}`);
    }
  }
  
  // Combine all arguments
  let code = `Log To Console${robot_indent}${message ? `${message}${robot_indent}` : ''}`;
  if (kwargs.length > 0) {
    code += kwargs.join(`${robot_indent}`);
  }
  code += '\n';
  return code;
};

// BuiltIn: Log Variables
Blockly.Blocks['rb_builtin_log_variables'] = {
  init: function() {
    this.appendDummyInput("variable_container")
      .appendField("Log Variables  ")
      .appendField("Level=")
      .appendField(new Blockly.FieldTextInput("INFO"), "variables");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Log Variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Log%20Variables");
  }
};

pythonGenerator.forBlock['rb_builtin_log_variables'] = function(block) {
  let level = block.getFieldValue('variables');
  level = level ? `level=${level}` : '';
  let code = `Log Variables${level ? `${robot_indent}${level}` : ''}\n`
  return code;
};

// BuiltIn: Reset Log Level
Blockly.Block['rb_builtin_reset_log_level'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Reset Log Level")

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(block_color)
    this.setTooltip("BuiltIn: Reset Log Level")
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Reset%20Log%20Level")
  }
};
pythonGenerator.forBlock['rb_builtin_reset_log_level'] = function(block) {
  let code = `Reset Log Level\n`;
  return code;
};

// BuiltIn: Set Log Level
Blockly.Block['rb_builtin_set_log_level'] = {
  init: function() {
    this.appendDummyInput("container")
      .appendField("Set Log Level")
      .appendField(new Blockly.FieldDropdown([
        ["TRACE", "TRACE"],
        ["DEBUG", "DEBUG"],
        ["INFO", "INFO"],
        ["WARN", "WARN"],
        ["NONE", "NONE"],
      ]), "level")
    
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(block_color)
    this.setTooltip("BuiltIn: Set Log Level")
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Set%20Log%20Level")
  }
};

pythonGenerator.forBlock['rb_builtin_set_log_level'] = function(block) {
  let level = block.getFieldValue('level') || '';
  let code = `Set Log Level${robot_indent}${level}\n`;
  return code;
};