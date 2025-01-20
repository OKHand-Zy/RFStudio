import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const robot_indent = '    ';
const block_color = 30;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

// IF...ELSE...END