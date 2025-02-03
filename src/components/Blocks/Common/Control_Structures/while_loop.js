import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const split_mark = '|';
const block_color = 30;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// Formate Function
function robotFormate(code, splitMark = '|', indent = robot_indent) {
  if (!code) return '';
  return code.split(splitMark)
    .map(part => part.trim())
    .filter(part => part)
    .join(indent);
}

// WHILE...LOOP
Blockly.Blocks['rb_logic_while_loop'] = {
  init: function() {
    this.appendValueInput("while_args")
      .appendField("WHILE")

    this.appendStatementInput("do_commands")

    this.appendDummyInput()
      .appendField("END")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(block_color);
    this.setTooltip("While Loop");
    this.setHelpUrl("");
  },
};
pythonGenerator.forBlock['rb_logic_while_loop'] = function(block) {
  let while_args = pythonGenerator.valueToCode(block, 'while_args', pythonGenerator.ORDER_ATOMIC) || '';
  if (while_args) {
    while_args = while_args.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join(robot_indent);
  }

  let do_commands = pythonGenerator.statementToCode(block, 'do_commands') || '';
  if (do_commands) {
    do_commands = do_commands.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join(robot_indent);
  }

  let code = '';
  pythonGenerator.INDENT = robot_indent;
  code += `WHILE${while_args ? `${robot_indent}${while_args}` : ''}\n`;
  code += `${do_commands? `${robot_indent}${do_commands}` : '  No Operation'}\n`;
  code += 'END\n';
  return code;
};

// WHILE...Value...Loop
Blockly.Blocks['rb_logic_while_value'] = {
  init: function() {
    this.appendValueInput("variables")

    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['>', '>'],
          ['>=','>='],
          ['<', '<'],
          ['<=','<='],
        ]), 'while_operator')

    this.appendValueInput("verified")

    this.setOutput(true, "Variable");
    this.setColour(block_color);
    this.setTooltip("while Value Limit");
    this.setHelpUrl("");
  }
}
pythonGenerator.forBlock['rb_logic_while_value'] = function(block) {
  let value_variables = pythonGenerator.valueToCode(block, 'variables', pythonGenerator.ORDER_ATOMIC) || '';
  if (value_variables) {
    value_variables = value_variables.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join('');
  }
  let value_verified = pythonGenerator.valueToCode(block, 'verified', pythonGenerator.ORDER_ATOMIC) || '';
  if (value_verified) {
    value_verified = value_verified.split(split_mark)
      .map(part => part.trim())
      .filter(part => part)
      .join('');
  }
  const while_operator = block.getFieldValue('while_operator');
  let code = `${split_mark}${value_variables} ${while_operator} ${value_verified}\n`;
  return [code,pythonGenerator.ORDER_ATOMIC];
};

// WHILE...True...Limit
Blockly.Blocks['rb_logic_while_true_limit'] = {
  init: function() {
    this.appendDummyInput("while_args")
      .appendField("True")
      .appendField("  ")
      .appendField("Limit=")
      .appendField(new Blockly.FieldTextInput("NONE"), "limit_value")
      .appendField(new Blockly.FieldDropdown([
        ['times', 'times'],
        ['seconds', 'seconds'],
        ['minutes', 'minutes'],
        ['hours', 'hours'],
        ['days','days'],
        ['weeks','weeks'],
        ['milliseconds','milliseconds'],
        ['microseconds','microseconds'],
        ['nanoseconds','nanoseconds']
      ]), "limit_type")
      .appendField("  ")
      .appendField(new Blockly.FieldDropdown([
        ['on_limit', 'on_limit'],
        ['on_limit_message', 'on_limit_message']
      ]), "limit_action")
      .appendField("=")
      .appendField(new Blockly.FieldTextInput("fail"), "limit_action_value")
      
    this.setOutput(true, "Variable");
    this.setColour(block_color);
    this.setTooltip("While Loop Limit");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#toc-entry-401");
  },
};
pythonGenerator.forBlock['rb_logic_while_true_limit'] = function(block) {
  let limit_value = block.getFieldValue('limit_value');
  let limit_type = block.getFieldValue('limit_type');
  let limit_action = block.getFieldValue('limit_action');
  let limit_action_value = block.getFieldValue('limit_action_value');

  if (limit_value.toUpperCase() === 'NONE') {
    limit_type = '';
  }

  pythonGenerator.INDENT = robot_indent;
  let code = '';
  code += `${split_mark}True`
  code += `${limit_value ? `${split_mark}limit=${limit_value}` : ''}${limit_value ? ` ${limit_type}` : ''}`;
  code += `${limit_action ? `${split_mark}${limit_action}` : ''}${limit_action_value ? `=${limit_action_value}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};