import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

// 修改 pythonGenerator 的縮排設定
const default_indent = '';
const rb_indent = '    ';
const command_color = 100;
pythonGenerator.INDENT = default_indent; // 將預設縮排設為空字串

