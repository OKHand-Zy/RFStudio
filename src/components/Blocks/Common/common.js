import * as Blockly from 'blockly';
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

// Common: Math Symbols
Blockly.Blocks['rb_cm_math_symbols'] = {
  init: function() {
    this.appendValueInput("symbols_container")
      .appendField(new Blockly.FieldDropdown([
          ["+", "+"],
          ["-", "-"],
          ["*", "*"],
          ["/", "/"],
          ["%", "%"],
          ["**", "**"],
          ["//", "//"],
          ["^", "^"],
          ["@", "@"],
          ["&", "&"],
          ["|", "|"],
          ["~", "~"],
          ["<", "<"],
          ["<=", "<="],
          [">", ">"],
          [">=", ">="],
          ["==", "=="],
          ["!=", "!="],
        ]), "symbols")
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Common: Math Symbols");
  }
};

pythonGenerator.forBlock['rb_cm_math_symbols'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'symbols_container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', default_indent);
  let symbol = block.getFieldValue('symbols');
  symbol = robotFormate(symbol, '|', robot_indent);
  let code = `${symbol}${container}`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Variable
Blockly.Blocks['rb_cm_variable'] = {
  init: function() {
    this.appendValueInput("Variable")  // Named input for potential connections
        .appendField(
            new Blockly.FieldDropdown([
                ["Variable", "$"],
                ["List", "@"],
                ["Dict", "&"],
                ["Env_Variable", "%"],
            ]), "variable_type")
        .appendField("{")
        .appendField(new Blockly.FieldTextInput("variable"), "variable")
        .appendField("}");

    this.setOutput(true, 'Variable'); 
    this.setColour(block_color);
    this.setTooltip("Setting Variables args");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_cm_variable'] = function(block) {
  var variable_type = block.getFieldValue('variable_type') || '$';
  var variable = block.getFieldValue('variable') || '';
  var value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  var code = '';

  code = `${split_mark}${variable_type}{${variable.trim()}}${value_input}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Value = Value
Blockly.Blocks['rb_cm_V2V']= {
  init: function() {
    this.appendValueInput("value1")

    this.appendDummyInput()
        .appendField("=");
        
    this.appendValueInput("value2")
    
    this.setInputsInline(true);
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Setting Variables args");
  }
};

pythonGenerator.forBlock['rb_cm_V2V'] = function(block) {
  let value1 = pythonGenerator.valueToCode(block, 'value1', pythonGenerator.ORDER_ATOMIC) || '';
  value1 = robotFormate(value1)
  
  let value2 = pythonGenerator.valueToCode(block, 'value2', pythonGenerator.ORDER_ATOMIC) || '';
  value2 = robotFormate(value2)

  let code = `${value1}=${value2}`;
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: String = String
Blockly.Blocks['rb_cm_S2S']= {
  init: function() {
    this.appendValueInput("string1")

    this.appendDummyInput()
        .appendField("==");
        
    this.appendValueInput("string2")
    
    this.setInputsInline(true);
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Setting Variables args");
  }
};

pythonGenerator.forBlock['rb_cm_S2S'] = function(block) {
  let string1 = pythonGenerator.valueToCode(block, 'string1', pythonGenerator.ORDER_ATOMIC) || '';
  string1 = robotFormate(string1)
  
  let string2 = pythonGenerator.valueToCode(block, 'string2', pythonGenerator.ORDER_ATOMIC) || '';
  string2 = robotFormate(string2)

  let code = `${split_mark}'${string1}' == '${string2}'`;
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: index
Blockly.Blocks['rb_cm_index'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField("[")
      .appendField(new Blockly.FieldTextInput("Index"), "Index")
      .appendField("]")
      .setCheck("Variable")
        
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input Index");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['rb_cm_index'] = function(block) {
  const Index = block.getFieldValue('Index');
  const connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  let code = '';
  code = `[${Index}]${connected_value}`;
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: content
Blockly.Blocks['rb_cm_content'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField(new Blockly.FieldTextInput("Content"), "CONTENT")
      .setCheck("Variable")
        
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input content");
    this.setHelpUrl("");
  }
};
pythonGenerator.forBlock['rb_cm_content'] = function(block) {
  const text_content = block.getFieldValue('CONTENT');
  const connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  let code = '';

  code = `${split_mark}${text_content}${connected_value}`;
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: HTML Content
Blockly.Blocks['rb_cm_html_content'] = {
  init: function() {
    this.appendValueInput("content")
      .appendField("*HTML*")
      .appendField(new Blockly.FieldTextInput("<p>HTML_Content<p>"), "html_content")
      .setCheck("Variable")
    
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("HTML Content");
  }
};
pythonGenerator.forBlock['rb_cm_html_content'] = function(block) {
  let html_content = block.getFieldValue('html_content') || '';
  html_content = robotFormate(html_content, '|', default_indent)

  let connected_value = pythonGenerator.valueToCode(block, 'content', pythonGenerator.ORDER_ATOMIC) || '';
  connected_value = robotFormate(connected_value, '|', robot_indent)

  let code = `${split_mark}*HTML*${html_content}${robot_indent}${connected_value}`;
  
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Date
Blockly.Blocks['rb_cm_date'] = {
  init: function() {
    this.appendValueInput("bh_container_code")
      .appendField(new Blockly.FieldTextInput("dd"), "day")
      .appendField(".")
      .appendField(new Blockly.FieldTextInput("mm"), "month")
      .appendField(".")
      .appendField(new Blockly.FieldTextInput("yyyy"), "year")
      .setCheck("Variable")
    
    this.setOutput(true, "Variable");  
    this.setColour(block_color);
    this.setTooltip("Input Date");
    this.setHelpUrl("");
  }
};
pythonGenerator.forBlock['rb_cm_date'] = function(block) {
  const day = block.getFieldValue('day');
  const month = block.getFieldValue('month');
  const year = block.getFieldValue('year');
  const container_code = pythonGenerator.valueToCode(block, 'bh_container_code', pythonGenerator.ORDER_ATOMIC) || '';

  let code = `${day}.${month}.${year}${container_code}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Documentation Inline Styles
Blockly.Blocks['rb_cm_inline_styles'] = {
  init: function() {
    this.appendValueInput("style_content")
      .appendField("Style=")
      .appendField(
        new Blockly.FieldDropdown([
          ["bold", "bold"],
          ["italic", "italic"],
          ["bold&italic", "bold&italic"],
          ["code", "code"],
        ]), "inline_styles")
      .appendField("Content=")  
      .appendField(new Blockly.FieldTextInput("Content"), "content")
      .setCheck("Documentation")

    this.setOutput(true, 'Documentation');
    this.setColour(block_color);
    this.setTooltip("Setting Variables args");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#inline-styles");
  }
};

pythonGenerator.forBlock['rb_cm_inline_styles'] = function(block) {
  const style = block.getFieldValue('inline_styles');
  const content = block.getFieldValue('content');
  const style_content = pythonGenerator.valueToCode(block, 'style_content', pythonGenerator.ORDER_ATOMIC) || '""';
  const styleSymbols = {
    'bold': ['*', '*'],
    'italic': ['_', '_'],
    'bold&italic': ['_*', '*_'],
    'code': ['`', '`']
  };

  const [leftSym, rightSym] = styleSymbols[style] || ['', ''];
  const code = `${leftSym}{${content}}${rightSym}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Custom links and images
Blockly.Blocks['rb_cm_custom_links'] = {
  init: function() {
    this.appendValueInput("bh_container_code")
      .appendField("[")
      .appendField(new Blockly.FieldTextInput("Link"), "custom_links")
      .appendField("|")
      .appendField(new Blockly.FieldTextInput("Content"), "custom_content")
      .appendField("]")
    
    this.setOutput(true, 'Documentation');
    this.setColour(block_color);
    this.setTooltip("Setting Custom Links or Images");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#custom-links-and-images");
  }
};
pythonGenerator.forBlock['rb_cm_custom_links'] = function(block) {
  const custom_links = block.getFieldValue('custom_links');
  const custom_content = block.getFieldValue('custom_content');
  const bh_container_code = pythonGenerator.valueToCode(block, 'bh_container_code', pythonGenerator.ORDER_ATOMIC) || '""';
  const code = `[${custom_links}|${custom_content}]${bh_container_code}`;
  return [code, pythonGenerator.ORDER_ATOMIC];
}



// Operating-system variables
Blockly.Blocks['rb_cm_operating_system'] = {
  init: function() {
    this.appendValueInput("Variable")  // Named input for potential connections
        .appendField(
            new Blockly.FieldDropdown([
                ["CURDIR", "${CURDIR}"],
                ["TEMPDIR", "${TEMPDIR}"],
                ["EXECDIR", "${EXECDIR}"],
                ["/", "${/}"], [":", "${:}"], ["\\n", "${\\n}"]
            ]), "operating_system_command")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting Operating-system variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-337");
  }
}
pythonGenerator.forBlock['rb_cm_operating_system'] = function(block) {
  const operating_system_command = block.getFieldValue('operating_system_command') || '';
  const value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  let code = operating_system_command + value_input;

  return [code, pythonGenerator.ORDER_ATOMIC];
}

// EMPTY
Blockly.Blocks['rb_cm_empty'] = {
  init: function() {
    this.appendValueInput("Variable")
      .appendField(
        new Blockly.FieldDropdown([
          ["List", "@"],
          ["Dict", "&"],
      ]), "empty_type")
      .appendField("EMPTY")
    
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting EMPTY variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-340");
  }
}

pythonGenerator.forBlock['rb_cm_empty'] = function(block) {
  const empty_type = block.getFieldValue('empty_type') || '';
  const value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  let code = `${split_mark}${empty_type}EMPTY${value_input}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
}

// Automatic variables Block
Blockly.Blocks['rb_cm_automatic_variables'] = {
  init: function() {
    this.appendValueInput("Variable") 
        .appendField(
            new Blockly.FieldDropdown([
              ["TEST NAME", "${TEST NAME}"],
              ["TEST TAGS", "@{TEST TAGS}"],
              ["TEST DOCUMENTATION", "${TEST DOCUMENTATION}"],
              ["TEST STATUS", "${TEST STATUS}"],
              ["TEST MESSAGE", "${TEST MESSAGE}"],
              ["PREV TEST NAME", "${PREV TEST NAME}"],
              ["PREV TEST STATUS", "${PREV TEST STATUS}"],
              ["PREV TEST MESSAGE", "${PREV TEST MESSAGE}"],
              ["SUITE NAME", "${SUITE NAME}"],
              ["SUITE SOURCE", "${SUITE SOURCE}"],
              ["SUITE DOCUMENTATION", "${SUITE DOCUMENTATION}"],
              ["SUITE METADATA", "&{SUITE METADATA}"],
              ["SUITE STATUS", "${SUITE STATUS}"],
              ["SUITE MESSAGE", "${SUITE MESSAGE}"],
              ["KEYWORD STATUS","${KEYWORD STATUS}"],
              ["KEYWORD MESSAGE", "${KEYWORD MESSAGE}"],
              ["LOG LEVEL", "${LOG LEVEL}"],
              ["OUTPUT DIR", "${OUTPUT DIR}"],
              ["OUTPUT FILE", "${OUTPUT FILE}"],
              ["LOG FILE", "${LOG FILE}"],
              ["REPORT FILE","${REPORT FILE}"],
              ["DEBUG FILE","${DEBUG FILE}"],
              ["OPTIONS", "&{OPTIONS}"]
            ]), "automatic_variables")
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("Setting Operating-system variables");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-341");
  }
}
pythonGenerator.forBlock['rb_cm_automatic_variables'] = function(block) {
  const automatic_variables = block.getFieldValue('automatic_variables') || '';
  const value_input = pythonGenerator.valueToCode(block, 'Variable', pythonGenerator.ORDER_ATOMIC) || '';
  let code = automatic_variables + value_input;

  return [code, pythonGenerator.ORDER_ATOMIC];
}

// Common: Time_String
Blockly.Blocks['rb_cm_time_string'] = {
  init: function() {
    this.appendValueInput("Time_Container")
      .appendField(new Blockly.FieldTextInput("00"), "time_value")
      .appendField(new Blockly.FieldDropdown([
        ['weeks','w'],
        ['days','d'],
        ['hours', 'h'],
        ['minutes', 'm'],
        ['seconds', 's'],
        ['milliseconds','ms'],
        ['microseconds','μs'],
        ['nanoseconds','ns']
      ]), "time_type")
      
    this.setOutput(true, "Variable");
    this.setColour(block_color);
    this.setTooltip("Robot Framework Time String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#time-as-time-string");
  },
};
pythonGenerator.forBlock['rb_cm_time_string'] = function(block) {
  let timeValue = block.getFieldValue('time_value');
  let timeType = block.getFieldValue('time_type');
  let timeContainer = pythonGenerator.valueToCode(block, 'Time_Container', pythonGenerator.ORDER_ATOMIC) || '';

  timeContainer = robotFormate(timeContainer, '|', default_indent)

  let code = `${split_mark}${timeValue}${timeType}${timeContainer}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Common: Timer_String
Blockly.Blocks['rb_cm_timer_string'] = {
  init: function() {
    this.appendValueInput("Timer_Container")
      .appendField(new Blockly.FieldTextInput("00"), "HH")
      .appendField(":")
      .appendField(new Blockly.FieldTextInput("00"), "MM")
      .appendField(":")
      .appendField(new Blockly.FieldTextInput("00"), "SS")
      
    this.setOutput(true, "Variable");
    this.setColour(block_color);
    this.setTooltip("Robot Framework Timer String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#time-as-timer-string");
  },
};
pythonGenerator.forBlock['rb_cm_timer_string'] = function(block) {
  const hours = block.getFieldValue('HH');
  const minutes = block.getFieldValue('MM');
  const seconds = block.getFieldValue('SS');

  const timerContainer = pythonGenerator.valueToCode(block, 'Timer_Container', pythonGenerator.ORDER_ATOMIC) || '';
  const code = `${split_mark}${hours}:${minutes}:${seconds}${timerContainer}`;

  return [code, pythonGenerator.ORDER_ATOMIC];
};