"use client";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import {pythonGenerator} from 'blockly/python';
// UI
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import DownloadButton from "@/components/btn_download";
// RobotFrameWork Blocks
import "@/components/Blocks/RobotFramework/rb_comments";
import "@/components/Blocks/RobotFramework/rb_setting";
import "@/components/Blocks/RobotFramework/rb_variable";
import "@/components/Blocks/RobotFramework/rb_testcase";
import "@/components/Blocks/RobotFramework/rb_keyword";
// Common Blocks
//Common
import "@/components/Blocks/Common/common";
import "@/components/Blocks/Common/Other";
//Control Structures
import "@/components/Blocks/Common/Control_Structures/for_loop";
import "@/components/Blocks/Common/Control_Structures/while_loop";
import "@/components/Blocks/Common/Control_Structures/if_loop";
import "@/components/Blocks/Common/Control_Structures/try_loop";
import "@/components/Blocks/Common/Control_Structures/group";

import "@/components/Blocks/Common/function";

// RobotFrameWork Library Blocks
import "@/components/Blocks/RobotLibrary/BuiltIn/Resource"
import "@/components/Blocks/RobotLibrary/BuiltIn/Variable";
import "@/components/Blocks/RobotLibrary/BuiltIn/Convert";
import "@/components/Blocks/RobotLibrary/BuiltIn/Log";
import "@/components/Blocks/RobotLibrary/BuiltIn/KeyWord";
import "@/components/Blocks/RobotLibrary/BuiltIn/TestManagement"
import "@/components/Blocks/RobotLibrary/BuiltIn/Assertion"
import "@/components/Blocks/RobotLibrary/BuiltIn/FlowControl";
import "@/components/Blocks/RobotLibrary/BuiltIn/utils";

import "@/components/Blocks/RobotLibrary/Collections/List";
import "@/components/Blocks/RobotLibrary/Collections/Dictionary";
import "@/components/Blocks/RobotLibrary/Collections/Convert";
import "@/components/Blocks/RobotLibrary/Collections/Comparison";
import "@/components/Blocks/RobotLibrary/Collections/Match";
import "@/components/Blocks/RobotLibrary/Collections/Log";

import "@/components/Blocks/RobotLibrary/DateTime/Date";
import "@/components/Blocks/RobotLibrary/DateTime/Time";
import "@/components/Blocks/RobotLibrary/DateTime/Combined";

// ToolBoxs
import {
  Command_Variables, 
  Command_Documentation, 
  Command_BaseFunctions
} from "@/components/ToolBoxs/TB_Commands";

import { 
  RBF_Comments,
  RBF_Settings,
  RBF_Variables,
  RBF_TestCases,
  RBF_KeyWords,
} from "@/components/ToolBoxs/TB_Framrok";

import {
  Logic_For_Loop,
  Logic_While_Loop,
  Logic_If_Loop,
  Logic_Try_Loop,
  Logic_Group,
} from "@/components/ToolBoxs/TB_Logic"; 

import { 
  TB_BuiltIn_FlowContol,
  TB_BuiltIn_Keyword,
  TB_BuiltIn_Variable,
  TB_BuiltIn_Assert,
  TB_BuiltIn_Convert,
  TB_BuiltIn_Log,
  TB_BuiltIn_TestManagement,
  TB_BuiltIn_Resource,
  TB_BuiltIn_UtilTools,
} from "@/components/ToolBoxs/TB_BuiltIn";

import {
  TB_Collections_List,
  TB_Collections_Dictionary,
  TB_Collections_Convert,
  TB_Collections_Comparison,
  TB_Collections_Match,
  TB_Collections_Log,
} from "@/components/ToolBoxs/TB_Collections"

import {
  TB_DateTime_Get,
  TB_DateTime_add,
  TB_DateTime_convert,
  TB_DateTime_subtract, 
} from "@/components/ToolBoxs/TB_DateTime"

// Example Blocks
import "@/components/Blocks/example_Blocks";


export default function App() {
  const [xml, setXml] = useState("");
  const [CodeSpaceCode, setCodeSpaceCode] = useState("");
  
  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"></field></block></xml>';
  
  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Test",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "New_dynamic_list_creator"
          },
          {
            kind: "block",
            type: "dynamic_HZ_list_creator",
          },
          {
            kind: "block",
            type: "dynamic_style_block"
          },
          { 
            kind: "block", 
            type: "custom_plus_minus" 
          },
          {
            kind: "block",
            type: "greet_person",
            inputs: {
              NAME: {
                shadow: {
                  type: "text",
                  fields: {
                    TEXT: "小明"  // 預設值
                  }
                }
              }
            }
          },
        ],
      },
      {
        kind: "sep"
      },
      {
        kind: "category",
        name: "Commands",
        colour: "#FF0000",
        contents: [
          Command_Variables,
          Command_Documentation,
          Command_BaseFunctions,
        ]
      },
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          Logic_For_Loop,
          Logic_While_Loop,
          Logic_If_Loop,
          Logic_Try_Loop,
          Logic_Group,
        ],
      },
      {
        kind: "sep"
      },  
      {
        kind: "category",
        name: "RB_Framework",
        colour: "#A65C81",
        contents: [
          RBF_Comments,
          RBF_Settings,
          RBF_Variables,
          RBF_TestCases,
          RBF_KeyWords,
        ]
      },    
      {
        kind: "category",
        name: "RBL_BuiltIn",
        colour: "#A65C81",
        contents: [
          TB_BuiltIn_FlowContol,
          TB_BuiltIn_Keyword,
          TB_BuiltIn_Variable,
          TB_BuiltIn_Assert,
          TB_BuiltIn_Convert,
          TB_BuiltIn_Log,
          TB_BuiltIn_TestManagement,
          TB_BuiltIn_Resource,
          TB_BuiltIn_UtilTools,
        ]
      },
      {
        kind: "category",
        name: "RBL_Collections",
        colour: "#A65C81",
        contents: [
          TB_Collections_List,
          TB_Collections_Dictionary,
          TB_Collections_Convert,
          TB_Collections_Comparison,
          TB_Collections_Match,
          TB_Collections_Log,
        ]
      },
      {
        kind: "category",
        name: "RBL_DateTime",
        colour: "#A65C81",
        contents: [
          TB_DateTime_Get,
          TB_DateTime_add,
          TB_DateTime_convert,
          TB_DateTime_subtract,
        ],
      },
      {
        kind: "category",
        name: "RBL_Dialogs",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "text",
          },
        ],
      },
      {
        kind: "category",
        name: "RBL_OperatingSystem",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "text",
          },
        ],
      },
      {
        kind: "category",
        name: "RBL_Process",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "text",
          },
        ],
      },
      {
        kind: "category",
        name: "RBL_Screenshot",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "text",
          },
        ],
      },
      {
        kind: "category",
        name: "RBL_String",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "text",
          },
        ],
      },
      {
        kind: "category",
        name: "RBL_Telnet",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "text",
          },
        ],
      },
      {
        kind: "category",
        name: "RBL_XML",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "text",
          },
        ],
      },
    ],
  };
  
  // Generate code from workspace
  function workspaceDidChange(workspace) {
    const code = pythonGenerator.workspaceToCode(workspace);
    setCodeSpaceCode(code);
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="workspace-container">
        <div className="workspace-left">
          <BlocklyWorkspace
            toolboxConfiguration={toolboxCategories}
            initialXml={initialXml}
            className="fill-height"
            workspaceConfiguration={{
              zoom:{ 
                controls: true,  // 控制按鈕
                wheel: false,  // 滾輪縮放
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
              },
              trashcan: true, // 垃圾桶
              move:{
                scrollbars: {
                  horizontal: true,
                  vertical: true,
                },
                drag: true,
                wheel: false,
              },
              grid: {
                spacing: 20,
                length: 3,
                colour: "#ccc",
                snap: true,
              },
            }}
            onWorkspaceChange={workspaceDidChange}
            onXmlChange={setXml}
          />
        </div>
        <div className="workspace-right">
          <textarea
            id="code"
            value={CodeSpaceCode}
            readOnly
          ></textarea>
          <DownloadButton CodeSpaceCode={CodeSpaceCode} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
