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

// String: Format String
Blockly.Blocks['rb_string_format_string'] = {
  init: function() {
    this.argumentCount_ = 1;
    
    this.appendDummyInput("title")
      .appendField("Format String");
    
    this.appendValueInput("template_container")
      .appendField("template:")
      .setCheck("Variable");

    this.appendDummyInput("buttons")
      .appendField(new Blockly.FieldImage(plusImage, 15, 15, "+", () => {
        this.addArgument_();
      }))
      .appendField(new Blockly.FieldImage(minusImage, 15, 15, "-", () => {
        this.removeArgument_();
      }))
      
    this.appendValueInput("argument0")
      .appendField("argument:")
      .setCheck("Variable");
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Format String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Format%20String");
  },
  
  // Save state
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('arguments', this.argumentCount_);
    return container;
  },

  // Read state from DOM
  domToMutation: function(xmlElement) {
    this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10) || 1;
    this.updateShape_();
  },
  
  updateShape_: function() {
    // Remove all existing argument inputs
    for (let i = 0; this.getInput('argument' + i); i++) {
      this.removeInput('argument' + i);
    }
    
    // Rebuild argument inputs
    for (let i = 0; i < this.argumentCount_; i++) {
      this.appendValueInput('argument' + i)
        .appendField("argument:")
        .setCheck("Variable");
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

pythonGenerator.forBlock['rb_string_format_string'] = function(block) {
  let template = pythonGenerator.valueToCode(block, 'template_container', pythonGenerator.ORDER_ATOMIC) || '';
  template = robotFormate(template, '|', default_indent)

  let args = [];
  for (let i = 0; i < block.argumentCount_; i++) {
    let arg = pythonGenerator.valueToCode(block, 'argument' + i, pythonGenerator.ORDER_ATOMIC) || '';
    arg = robotFormate(arg, '|', robot_indent)
    args.push(arg);
  }

  let code = `Format String`;
  code += `${template ? `${robot_indent}${template}` : ''}`;
  if (args.length > 0) {
    args.forEach(arg => {
      code += `${robot_indent}${arg}`;
    });
  }
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Remove String
Blockly.Blocks['rb_string_remove_string'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove String");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("removables_container")
      .appendField("removables:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Remove String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Remove%20String");
  }
};

pythonGenerator.forBlock['rb_string_remove_string'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let removables = pythonGenerator.valueToCode(block, 'removables_container', pythonGenerator.ORDER_ATOMIC) || '';
  removables = robotFormate(removables, '|', robot_indent)

  let code = `Remove String`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${removables ? `${robot_indent}${removables}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Remove String Using Regexp
Blockly.Blocks['rb_string_remove_string_using_regexp'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Remove String Using Regexp");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("patterns_container")
      .setCheck("Variable");
    
    this.appendDummyInput("option_container")
      .appendField("flags：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["IGNORECASE", "IGNORECASE"],
        ["VERBOSE", "VERBOSE"]
      ]), "flags_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Remove String Using Regexp");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Remove%20String%20Using%20Regexp");
  }
};

pythonGenerator.forBlock['rb_string_remove_string_using_regexp'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let patterns = pythonGenerator.valueToCode(block, 'patterns_container', pythonGenerator.ORDER_ATOMIC) || '';
  patterns = robotFormate(patterns, '|', default_indent)

  let flags = block.getFieldValue('flags_arg') || '';

  let code = `Remove String Using Regexp`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${patterns ? `${robot_indent}${patterns}` : ''}`;
  code += `${flags ? `${robot_indent}flags=${flags}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Replace String
Blockly.Blocks['rb_string_replace_string'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Replace String");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("search_container")
      .appendField("search:")
      .setCheck("Variable");

    this.appendValueInput("replace_container")
      .appendField("replace:")
      .setCheck("Variable");
    
    this.appendDummyInput("option_container")
      .appendField("count：")
      .appendField(new Blockly.FieldTextInput("default"), "count_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Replace String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Replace%20String");
  }
};

pythonGenerator.forBlock['rb_string_replace_string'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let search = pythonGenerator.valueToCode(block, 'search_container', pythonGenerator.ORDER_ATOMIC) || '';
  search = robotFormate(search, '|', default_indent)

  let replace = pythonGenerator.valueToCode(block, 'replace_container', pythonGenerator.ORDER_ATOMIC) || '';
  replace = robotFormate(replace, '|', default_indent)

  let count = block.getFieldValue('count_arg') || '';
  if (count == 'default') {
    count = '';
  }

  let code = `Replace String`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${search ? `${robot_indent}${search}` : ''}`;
  code += `${replace ? `${robot_indent}${replace}` : ''}`;
  code += `${count ? `${robot_indent}count=${count}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Replace String Using Regexp
Blockly.Blocks['rb_string_replace_string_using_regexp'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Replace String Using Regexp");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendValueInput("pattern_container")
      .setCheck("Variable");

    this.appendValueInput("replace_container")
      .appendField("replace:")
      .setCheck("Variable");

    this.appendDummyInput("option_container")
      .appendField("count：")
      .appendField(new Blockly.FieldTextInput("default"), "count_arg")

      .appendField("flags：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["IGNORECASE", "IGNORECASE"],
        ["VERBOSE", "VERBOSE"]
      ]), "flags_arg")

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Replace String Using Regexp");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Replace%20String%20Using%20Regexp");
  }
};

pythonGenerator.forBlock['rb_string_replace_string_using_regexp'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let pattern = pythonGenerator.valueToCode(block, 'pattern_container', pythonGenerator.ORDER_ATOMIC) || '';
  pattern = robotFormate(pattern, '|', default_indent)

  let replace = pythonGenerator.valueToCode(block, 'replace_container', pythonGenerator.ORDER_ATOMIC) || '';
  replace = robotFormate(replace, '|', default_indent)

  let count = block.getFieldValue('count_arg') || '';
  if (count == 'default') {
    count = '';
  }

  let flags = block.getFieldValue('flags_arg') || '';

  let code = `Replace String Using Regexp`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${pattern ? `${robot_indent}${pattern}` : ''}`;
  code += `${replace ? `${robot_indent}${replace}` : ''}`;
  code += `${count ? `${robot_indent}count=${count}` : ''}`;
  code += `${flags ? `${robot_indent}flags=${flags}` : ''}`;
  code += `\n`
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// String: Strip String
Blockly.Blocks['rb_string_strip_string'] = {
  init: function() {
    this.appendDummyInput("title")
      .appendField("Strip String");
    
    this.appendValueInput("string_container")
      .setCheck("Variable");

    this.appendDummyInput("option_container1")
      .appendField("mode：")
      .appendField(new Blockly.FieldDropdown([
        ["default", ""],
        ["LEFT", "LEFT"],
        ["RIGHT", "RIGHT"],
        ["BOTH", "BOTH"]
      ]), "mode_arg")

    this.appendValueInput("characters_container")
      .appendField("characters:")
      .setCheck("Variable");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(block_color);
    this.setTooltip("String: Strip String");
    this.setHelpUrl("https://robotframework.org/robotframework/latest/libraries/String.html#Strip%20String");
  }
};

pythonGenerator.forBlock['rb_string_strip_string'] = function(block) {
  let string = pythonGenerator.valueToCode(block, 'string_container', pythonGenerator.ORDER_ATOMIC) || '';
  string = robotFormate(string, '|', default_indent)

  let mode = block.getFieldValue('mode_arg') || '';
  let characters = pythonGenerator.valueToCode(block, 'characters_container', pythonGenerator.ORDER_ATOMIC) || '';
  characters = robotFormate(characters, '|', default_indent)

  let code = `Strip String`;
  code += `${string ? `${robot_indent}${string}` : ''}`;
  code += `${mode ? `${robot_indent}mode=${mode}` : ''}`;
  code += `${characters ? `${robot_indent}characters=${characters}` : ''}`;
  code += '\n';
  return [code, pythonGenerator.ORDER_ATOMIC];
};