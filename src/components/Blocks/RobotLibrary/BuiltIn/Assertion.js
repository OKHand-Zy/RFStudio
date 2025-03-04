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

// BuiltIn: Should Be Empty
Blockly.Blocks['rb_builtin_should_be_empty'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Should Be Empty")
      .setCheck(null)
    
    this.appendValueInput("message")
      .appendField("msg=")
      .setCheck(null)
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Be Empty");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Be%20Empty");
  }
};

pythonGenerator.forBlock['rb_builtin_should_be_empty'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  
  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)
  
  let code = `Should Be Empty`;
  code += `${container ? `${robot_indent}${container}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Be Equal
Blockly.Blocks['rb_builtin_should_be_equal'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Be Equal")
    
    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(" formatter=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["str", "str"],
        ["repr", "repr"],
        ["ascii", "ascii"],
      ]), "formatter_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "collapse_spaces_arg")

      .appendField(" Check：")
      .appendField(new Blockly.FieldDropdown([
        ["None", ""],
        ["Type", "Type"],
        ["types", "types"],
      ]), "type_arg")
      .appendField(" = ")
      .appendField(new Blockly.FieldTextInput("None"), "type_arg_value")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Be Equal");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Be%20Equal");
  }
};

pythonGenerator.forBlock['rb_builtin_should_be_equal'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let formatter = block.getFieldValue('formatter_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';
  let type = block.getFieldValue('type_arg') || '';
  let type_value = block.getFieldValue('type_arg_value') || '';

  let code = `Should Be Equal`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${formatter ? `${robot_indent}formatter=${formatter}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  if (type) {
    code += `${type ? `${robot_indent}${type}=`:``}`
    code += `${type_value ? `${type_value}`:``}`
  }
  code += '\n'
  return code;
};

// BuiltIn: Should Be Equal As Integers
Blockly.Blocks['rb_builtin_should_be_equal_as_integers'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Be Equal As Integers")

    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)

    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" base=")
      .appendField(new Blockly.FieldTextInput("None"), "base_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Be Equal As Integers");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Be%20Equal%20As%20Integers");
  }
};

pythonGenerator.forBlock['rb_builtin_should_be_equal_as_integers'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let base = block.getFieldValue('base_arg') || '';
  if (base == 'None') {
    base = '';
  }

  let code = `Should Be Equal As Integers`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${base ? `${robot_indent}base=${base}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Be Equal As Numbers
Blockly.Blocks['rb_builtin_should_be_equal_as_numbers'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Be Equal As Numbers")

    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" precision=")
      .appendField(new Blockly.FieldTextInput("6"), "precision_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Be Equal As Numbers");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Be%20Equal%20As%20Numbers");
  }
};

pythonGenerator.forBlock['rb_builtin_should_be_equal_as_numbers'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let precision = block.getFieldValue('precision_arg') || '';
  if (precision == 'None') {
    precision = '';
  }

  let code = `Should Be Equal As Numbers`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${precision ? `${robot_indent}precision=${precision}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Be Equal As Strings
Blockly.Blocks['rb_builtin_should_be_equal_as_strings'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Be Equal As Strings")

    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
      
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "strip_spaces_arg")

      .appendField(" formatter=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["str", "str"],
        ["repr", "repr"],
        ["ascii", "ascii"],
      ]), "formatter_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "collapse_spaces_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Be Equal As Strings");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Be%20Equal%20As%20Strings");
  }
};

pythonGenerator.forBlock['rb_builtin_should_be_equal_as_strings'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let formatter = block.getFieldValue('formatter_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';

  let code = `Should Be Equal As Strings`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${formatter ? `${robot_indent}formatter=${formatter}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Be True
Blockly.Blocks['rb_builtin_should_be_true'] = {
  init: function() {
    this.appendValueInput("condition")
      .appendField("Should Be True")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Be True");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Be%20True");
  }
};

pythonGenerator.forBlock['rb_builtin_should_be_true'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', robot_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)

  let code = `Should Be True`
  code += `${condition ? `${robot_indent}${condition}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Contain
Blockly.Blocks['rb_builtin_should_contain'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Contain")
    
    this.appendValueInput("variable_container")
      .setCheck(null);
    
    this.appendValueInput("item")
      .appendField(" item=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")
      
      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "collapse_spaces_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Contain");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Contain");
  }
}

pythonGenerator.forBlock['rb_builtin_should_contain'] = function(block) {
  // Get input values from the block
  let container = pythonGenerator.valueToCode(block, 'variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', default_indent);
  
  let item = pythonGenerator.valueToCode(block, 'item', pythonGenerator.ORDER_ATOMIC) || '';
  item = robotFormate(item, '|', robot_indent);
  
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent);

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';
  
  let code = 'Should Contain';
  code += `${container ? `${robot_indent}${container}` : ''}`;
  code += `${item ? `${robot_indent}${item}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += `${values ? `${robot_indent}values=${values}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}` : ''}`;
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}` : ''}`;
  code += '\n';
  return code;
};

// BuiltIn: Should Contain Any
Blockly.Blocks['rb_builtin_should_contain_any'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Contain Any")
    
    this.appendValueInput("variable_container")
      .setCheck(null);
    
    this.appendValueInput("item")
      .appendField(" item=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")
      
      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "collapse_spaces_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Contain Any");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Contain%20Any");
  }
}

pythonGenerator.forBlock['rb_builtin_should_contain_any'] = function(block) {
  // Get input values from the block
  let container = pythonGenerator.valueToCode(block, 'variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', default_indent);
  
  let item = pythonGenerator.valueToCode(block, 'item', pythonGenerator.ORDER_ATOMIC) || '';
  item = robotFormate(item, '|', robot_indent);
  
  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent);

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';
  
  let code = 'Should Contain Any';
  code += `${container ? `${robot_indent}${container}` : ''}`;
  code += `${item ? `${robot_indent}${item}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += `${values ? `${robot_indent}values=${values}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}` : ''}`;
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}` : ''}`;
  code += '\n';
  return code;
};

// BuiltIn: Should Contain X Times
Blockly.Blocks['rb_builtin_should_contain_x_times'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Contain X Times")
    
    this.appendValueInput("variable_container")
      .setCheck(null);
    
    this.appendValueInput("item")
      .appendField(" item=")
      .setCheck(null);
    
    this.appendDummyInput("times_container")
      .appendField(" count=")
      .appendField(new Blockly.FieldTextInput("3"), "times_arg")
      .appendField("times")
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")
      
      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "collapse_spaces_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Contain X Times");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Contain%20X%20Times");
  }
}

pythonGenerator.forBlock['rb_builtin_should_contain_x_times'] = function(block) {
  // Get input values from the block
  let container = pythonGenerator.valueToCode(block, 'variable_container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', default_indent);
  
  let item = pythonGenerator.valueToCode(block, 'item', pythonGenerator.ORDER_ATOMIC) || '';
  item = robotFormate(item, '|', robot_indent);
  
  let times = block.getFieldValue('times_arg') || '';

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent);

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';
  
  let code = 'Should Contain X Times';
  code += `${container ? `${robot_indent}${container}` : ''}`;
  code += `${item ? `${robot_indent}${item}` : ''}`;
  code += `${times ? `${robot_indent}count=${times}` : ''}`;
  code += `${message ? `${robot_indent}msg=${message}` : ''}`;
  code += `${values ? `${robot_indent}values=${values}` : ''}`;
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}` : ''}`;
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}` : ''}`;
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}` : ''}`;
  code += '\n';
  return code;
};

// BuiltIn: Should Match
Blockly.Blocks['rb_builtin_should_match'] = { 
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Match")
    
    this.appendValueInput("string")
      .setCheck(null);
    
    this.appendValueInput("pattern")
      .appendField(" pattern=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Match");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Match");
  }
};

pythonGenerator.forBlock['rb_builtin_should_match'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Should Match`
  code += `${string ? `${robot_indent}${string}`:``}`
  code += `${pattern ? `${robot_indent}${pattern}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Match Regexp
Blockly.Blocks['rb_builtin_should_match_regexp'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Match Regexp")
    
    this.appendValueInput("string")
      .setCheck(null);
    
    this.appendValueInput("pattern")
      .appendField(" pattern=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
    this.appendValueInput("flags_container")
      .appendField(" flags= ")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Match Regexp");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Match%20Regexp");
  }
};

pythonGenerator.forBlock['rb_builtin_should_match_regexp'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  
  let flags = pythonGenerator.valueToCode(block, 'flags_container', pythonGenerator.ORDER_ATOMIC) || '';
  flags = robotFormate(flags, '|', default_indent)

  let code = `Should Match Regexp`
  code += `${string ? `${robot_indent}${string}`:``}`
  code += `${pattern ? `${robot_indent}${pattern}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${flags ? `${robot_indent}flags=${flags}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Be Empty
Blockly.Blocks['rb_builtin_should_not_be_empty'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Should Not Be Empty")
      .setCheck(null)
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Be Empty");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Be%20Empty");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_be_empty'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)
  
  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)
  
  let code = `Should Not Be Empty`;
  code += `${container ? `${robot_indent}${container}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Be Equal
Blockly.Blocks['rb_builtin_should_not_be_equal'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not Be Equal")
    
    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "collapse_spaces_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Be Equal");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Be%20Equal");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_be_equal'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';

  let code = `Should Not Be Equal`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Be Equal As Integers
Blockly.Blocks['rb_builtin_should_not_be_equal_as_integers'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not Be Equal As Integers")

    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)

    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" base=")
      .appendField(new Blockly.FieldTextInput("None"), "base_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should not Be Equal As Integers");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Be%20Equal%20As%20Integers");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_be_equal_as_integers'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let base = block.getFieldValue('base_arg') || '';
  if (base == 'None') {
    base = '';
  }

  let code = `Should Not Be Equal As Integers`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${base ? `${robot_indent}base=${base}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Be Equal As Numbers
Blockly.Blocks['rb_builtin_should_not_be_equal_as_numbers'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not Be Equal As Numbers")

    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" precision=")
      .appendField(new Blockly.FieldTextInput("6"), "precision_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Be Equal As Numbers");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Be%20Equal%20As%20Numbers");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_be_equal_as_numbers'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let precision = block.getFieldValue('precision_arg') || '';
  if (precision == 'None') {
    precision = '';
  }

  let code = `Should Not Be Equal As Numbers`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${precision ? `${robot_indent}precision=${precision}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Be Equal As Strings
Blockly.Blocks['rb_builtin_should_not_be_equal_as_strings'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not Be Equal As Strings")

    this.appendValueInput("f_value")
      .appendField(" First：")
      .setCheck(null);
    
    this.appendValueInput("s_value")
      .appendField(" Second：")
      .setCheck(null);
      
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")

      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "collapse_spaces_arg")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Be Equal As Strings");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Be%20Equal%20As%20Strings");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_be_equal_as_strings'] = function(block) {
  let f_value = pythonGenerator.valueToCode(block, 'f_value', pythonGenerator.ORDER_ATOMIC) || '';
  f_value = robotFormate(f_value, '|', robot_indent)

  let s_value = pythonGenerator.valueToCode(block, 's_value', pythonGenerator.ORDER_ATOMIC) || '';
  s_value = robotFormate(s_value, '|', robot_indent)

  let msg = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  msg = robotFormate(msg, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';

  let code = `Should Not Be Equal As Strings`;
  code += `${f_value ? `${robot_indent}${f_value}`:``}`
  code += `${s_value ? `${robot_indent}${s_value}`:``}`
  code += `${msg ? `${robot_indent}msg=${msg}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Be True
Blockly.Blocks['rb_builtin_should_not_be_true'] = {
  init: function() {
    this.appendValueInput("condition")
      .appendField("Should Not Be True")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Be True");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Be%20True");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_be_true'] = function(block) {
  let condition = pythonGenerator.valueToCode(block, 'condition', pythonGenerator.ORDER_ATOMIC) || '';
  condition = robotFormate(condition, '|', robot_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)

  let code = `Should Not Be True`
  code += `${condition ? `${robot_indent}${condition}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Contain
Blockly.Blocks['rb_builtin_should_not_contain'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Should Not Contain")
      .setCheck(null);
    
    this.appendValueInput("item")
      .appendField(" item=")
      .setCheck(null);

    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "collapse_spaces_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Contain");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Contain");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_contain'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)

  let item = pythonGenerator.valueToCode(block, 'item', pythonGenerator.ORDER_ATOMIC) || '';
  item = robotFormate(item, '|', robot_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)

  let values = block.getFieldValue('values_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';

  let code = `Should Not Contain`
  code += `${container ? `${robot_indent}${container}`:``}`
  code += `${item ? `${robot_indent}item=${item}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Contain Any
Blockly.Blocks['rb_builtin_should_not_contain_any'] = {
  init: function() {
    this.appendValueInput("container")
      .appendField("Should Not Contain Any")
      .setCheck(null);
    
    this.appendValueInput("item")
      .appendField(" item=")
      .setCheck(null);

    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "collapse_spaces_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Contain Any");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Contain%20Any");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_contain_any'] = function(block) {
  let container = pythonGenerator.valueToCode(block, 'container', pythonGenerator.ORDER_ATOMIC) || '';
  container = robotFormate(container, '|', robot_indent)

  let item = pythonGenerator.valueToCode(block, 'item', pythonGenerator.ORDER_ATOMIC) || '';
  item = robotFormate(item, '|', robot_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)

  let values = block.getFieldValue('values_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';

  let code = `Should Not Contain Any`
  code += `${container ? `${robot_indent}${container}`:``}`
  code += `${item ? `${robot_indent}item=${item}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Match
Blockly.Blocks['rb_builtin_should_not_match'] = { 
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not Match")
    
    this.appendValueInput("string")
      .setCheck(null);
    
    this.appendValueInput("pattern")
      .appendField(" pattern=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Match");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Match");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_match'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';

  let code = `Should Not Match`
  code += `${string ? `${robot_indent}${string}`:``}`
  code += `${pattern ? `${robot_indent}${pattern}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Match Regexp
Blockly.Blocks['rb_builtin_should_not_match_regexp'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not Match Regexp")
    
    this.appendValueInput("string")
      .setCheck(null);
    
    this.appendValueInput("pattern")
      .appendField(" pattern=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")
    
    this.appendValueInput("flag_container")
      .appendField(" flags=")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Match Regexp");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Match%20Regexp");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_match_regexp'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  
  let flags = pythonGenerator.valueToCode(block, 'flags_container', pythonGenerator.ORDER_ATOMIC) || '';
  flags = robotFormate(flags, '|', default_indent)

  let code = `Should Not Match Regexp`
  code += `${string ? `${robot_indent}${string}`:``}`
  code += `${pattern ? `${robot_indent}${pattern}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${flags ? `${robot_indent}flags=${flags}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Start With
Blockly.Blocks['rb_builtin_should_start_with'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Start With")
    
    this.appendValueInput("f_string")
      .appendField(" string=")
      .setCheck(null)

    this.appendValueInput("s_string")
      .appendField(" pattern=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "ignore_case_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "strip_spaces_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Start With");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Start%20With");
  }
};

pythonGenerator.forBlock['rb_builtin_should_start_with'] = function(block) {
  let f_string = pythonGenerator.valueToCode(block, 'f_string', pythonGenerator.ORDER_ATOMIC) || '';
  f_string = robotFormate(f_string, '|', default_indent)

  let s_string = pythonGenerator.valueToCode(block, 's_string', pythonGenerator.ORDER_ATOMIC) || '';
  s_string = robotFormate(s_string, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';

  let code = `Should Start With`
  code += `${f_string ? `${robot_indent}${f_string}`:``}`
  code += `${s_string ? `${robot_indent}${s_string}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not Start With
Blockly.Blocks['rb_builtin_should_not_start_with'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not Start With")
    
    this.appendValueInput("f_string")
      .appendField(" string=")
      .setCheck(null)

    this.appendValueInput("s_string")
      .appendField(" pattern=")
      .setCheck(null)
    
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "ignore_case_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "strip_spaces_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not Start With");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20Start%20With");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_start_with'] = function(block) {
  let f_string = pythonGenerator.valueToCode(block, 'f_string', pythonGenerator.ORDER_ATOMIC) || '';
  f_string = robotFormate(f_string, '|', default_indent)

  let s_string = pythonGenerator.valueToCode(block, 's_string', pythonGenerator.ORDER_ATOMIC) || '';
  s_string = robotFormate(s_string, '|', default_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';

  let code = `Should Not Start With`
  code += `${f_string ? `${robot_indent}${f_string}`:``}`
  code += `${s_string ? `${robot_indent}${s_string}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should End With
Blockly.Blocks['rb_builtin_should_end_with'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should End With")
    
    this.appendValueInput("f_string")
      .appendField(" String=")
      .setCheck(null);

    this.appendValueInput("s_string")
      .appendField(" End_String=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);
      
    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces= ")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "collapse_spaces_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should End With");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20End%20With");
  }
};

pythonGenerator.forBlock['rb_builtin_should_end_with'] = function(block) {
  let f_string = pythonGenerator.valueToCode(block, 'f_string', pythonGenerator.ORDER_ATOMIC) || '';
  f_string = robotFormate(f_string, '|', default_indent)

  let s_string = pythonGenerator.valueToCode(block, 's_string', pythonGenerator.ORDER_ATOMIC) || '';
  s_string = robotFormate(s_string, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';

  let code = `Should End With`
  code += `${f_string ? `${robot_indent}${f_string}`:``}`
  code += `${s_string ? `${robot_indent}${s_string}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Should Not End With
Blockly.Blocks['rb_builtin_should_not_end_with'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Should Not End With")
    
    this.appendValueInput("f_string")
      .appendField(" String=")
      .setCheck(null);

    this.appendValueInput("s_string")
      .appendField(" End_String=")
      .setCheck(null);
    
    this.appendValueInput("message")
      .appendField(" msg=")
      .setCheck(null);

    this.appendDummyInput("config_container")
      .appendField(" values=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "values_arg")
      
      .appendField(" ignore_case=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["False", "False"],
        ["True", "True"],
      ]), "ignore_case_arg")

      .appendField(" strip_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"],
      ]), "strip_spaces_arg")

      .appendField(" collapse_spaces=")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["True", "True"],
        ["False", "False"]
      ]), "collapse_spaces_arg")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Should Not End With");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Should%20Not%20End%20With");
  }
};

pythonGenerator.forBlock['rb_builtin_should_not_end_with'] = function(block) {
  let f_string = pythonGenerator.valueToCode(block, 'f_string', pythonGenerator.ORDER_ATOMIC) || '';
  f_string = robotFormate(f_string, '|', default_indent)

  let s_string = pythonGenerator.valueToCode(block, 's_string', pythonGenerator.ORDER_ATOMIC) || '';
  s_string = robotFormate(s_string, '|', default_indent)

  let message = pythonGenerator.valueToCode(block, 'message', pythonGenerator.ORDER_ATOMIC) || '';
  message = robotFormate(message, '|', robot_indent)

  let values = block.getFieldValue('values_arg') || '';
  let ignore_case = block.getFieldValue('ignore_case_arg') || '';
  let strip_spaces = block.getFieldValue('strip_spaces_arg') || '';
  let collapse_spaces = block.getFieldValue('collapse_spaces_arg') || '';

  let code = `Should Not End With`
  code += `${f_string ? `${robot_indent}${f_string}`:``}`
  code += `${s_string ? `${robot_indent}${s_string}`:``}`
  code += `${message ? `${robot_indent}msg=${message}`:``}`
  code += `${values ? `${robot_indent}values=${values}`:``}`
  code += `${ignore_case ? `${robot_indent}ignore_case=${ignore_case}`:``}`
  code += `${strip_spaces ? `${robot_indent}strip_spaces=${strip_spaces}`:``}`
  code += `${collapse_spaces ? `${robot_indent}collapse_spaces=${collapse_spaces}`:``}`
  code += '\n'
  return code;
};

// BuiltIn: Keyword Should Exist
const Keyword_Should_Exist_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasAll', this.hasAll_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasAll_ = xmlElement.getAttribute('hasAll') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('mutation_option_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasAll_) {
      const allBlock = workspace.newBlock('option_message_item');
      allBlock.initSvg();
      connection.connect(allBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {    
    const allBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasAll_ = allBlock && allBlock.type === 'option_message_item';
    
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    // No connections need to be saved since we only have a dropdown
  }
};

Blockly.Blocks['rb_builtin_keyword_should_exist'] = {
  init: function() {
    this.containerBlockType = 'mutation_option_container';
    this.itemBlockTypes = ['option_message_item']; 
    this.hasAll_ = false;

    this.appendDummyInput("container")
      .appendField("Keyword Should Exist")
      .appendField(new Blockly.FieldTextInput("Input_KeyWord"), "keyword");

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Keyword Should Exist");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Keyword%20Should%20Exist");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(1);
    for (const input of inputs) {
      if (input && input.name) {  
        this.removeInput(input.name);
      }
    }

    if (this.hasAll_) {
      this.appendDummyInput('msg_input')
        .appendField("msg=")
        .appendField(new Blockly.FieldTextInput("Exist_Show_Message"), "msg_arg");
    }
  },

  ...Keyword_Should_Exist_MutatorMixin
};

Blockly.Blocks['mutation_option_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Keyword Should Exist");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Fails unless the given keyword exists in the current scope.");
  }
};

Blockly.Blocks['option_message_item'] = {
  init: function() {
    this.appendDummyInput('option_value')
      .appendField("arg:message")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_keyword_should_exist'] = function(block) {
  const keyword_name = block.getFieldValue('keyword');

  const hasMessage = block.hasAll_;
  let code = '';
  
  if (hasMessage) {
    let message = block.getFieldValue('msg_arg');
    code = `Keyword Should Exist${robot_indent}${keyword_name}${robot_indent}msg=${message}\n`;
  }else{
    code = `Keyword Should Exist${robot_indent}${keyword_name}\n`;
  }

  return code;
};

// BuiltIn: Length Should Be
const Length_Should_Be_MutatorMixin = {
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('hasAll', this.hasAll_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.hasAll_ = xmlElement.getAttribute('hasAll') === 'true';
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('mutation_option_container');
    containerBlock.initSvg();
    
    let connection = containerBlock.getInput('container').connection;
    
    if (this.hasAll_) {
      const allBlock = workspace.newBlock('option_message_item');
      allBlock.initSvg();
      connection.connect(allBlock.outputConnection);
    }

    return containerBlock;
  },

  compose: function(containerBlock) {    
    const allBlock = containerBlock.getInput('container').connection.targetBlock();
    this.hasAll_ = allBlock && allBlock.type === 'option_message_item';
    
    this.updateShape_();
  },

  saveConnections: function(containerBlock) {
    // No connections need to be saved since we only have a dropdown
  }
};

Blockly.Blocks['rb_builtin_length_should_be'] = {
  init: function() {
    this.containerBlockType = 'mutation_option_container';
    this.itemBlockTypes = ['option_message_item']; 
    this.hasAll_ = false;

    this.appendValueInput("container")
      .appendField("Length Should Be")
    
    this.appendValueInput("length")
      .appendField("Length=")

    this.setMutator(new Blockly.icons.MutatorIcon(this.itemBlockTypes, this));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(block_color);
    this.setTooltip("BuiltIn: Length Should Be");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Length%20Should%20Be");
  },

  updateShape_: function() {
    // Remove existing inputs except the first one
    const inputs = this.inputList.slice(2);
    for (const input of inputs) {
      if (input && input.name && input.name !== 'container' && input.name !== 'length') {  
        this.removeInput(input.name);
    }
    }

    if (this.hasAll_) {
      this.appendDummyInput('msg_input')
        .appendField("msg=")
        .appendField(new Blockly.FieldTextInput("Exist_Show_Message"), "msg_arg");
    }
  },

  ...Length_Should_Be_MutatorMixin
};

Blockly.Blocks['mutation_option_container'] = {
  init: function() {
    this.appendValueInput('container')
      .appendField("Length Should Be");
    this.setColour(block_color);
    this.contextMenu = false;
    this.setTooltip("Verifies that the length of the given item is correct.");
  }
};

Blockly.Blocks['option_message_item'] = {
  init: function() {
    this.appendDummyInput('option_value')
      .appendField("arg:message")

    this.setOutput(true, null);
    this.setColour(block_color);
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['rb_builtin_length_should_be'] = function(block) {
  // Get the value from the container input
  let containerCode = pythonGenerator.valueToCode(
    block, 'container', pythonGenerator.ORDER_ATOMIC
  ) || '';
  containerCode = robotFormate(containerCode, '|', robot_indent)

  let length = pythonGenerator.valueToCode(
    block, 'length', pythonGenerator.ORDER_ATOMIC
  ) || '';
  length = robotFormate(length, '|', robot_indent)

  const hasMessage = block.hasAll_;
  let code = `Length Should Be`;
  code += `${containerCode ? `${robot_indent}${containerCode}`:``}`
  code += `${length ? `${robot_indent}${length}`:``}`
  
  if (hasMessage) {
    let message = block.getFieldValue('msg_arg');
    code += `${robot_indent}msg=${message}\n`;
  }else{
    code += `\n`;
  }
  
  return code
};