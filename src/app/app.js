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

// RobotFrameWork Library: Blocks
import "@/components/Blocks/RobotLibrary/BuiltIn/Resource"
import "@/components/Blocks/RobotLibrary/BuiltIn/Variable";
import "@/components/Blocks/RobotLibrary/BuiltIn/Convert";
import "@/components/Blocks/RobotLibrary/BuiltIn/Log";
import "@/components/Blocks/RobotLibrary/BuiltIn/KeyWord";
import "@/components/Blocks/RobotLibrary/BuiltIn/TestManagement"
import "@/components/Blocks/RobotLibrary/BuiltIn/Assertion"
import "@/components/Blocks/RobotLibrary/BuiltIn/FlowControl";
import "@/components/Blocks/RobotLibrary/BuiltIn/utils";
// RobotFrameWork Library: Collections
import "@/components/Blocks/RobotLibrary/Collections/List";
import "@/components/Blocks/RobotLibrary/Collections/Dictionary";
import "@/components/Blocks/RobotLibrary/Collections/Convert";
import "@/components/Blocks/RobotLibrary/Collections/Comparison";
import "@/components/Blocks/RobotLibrary/Collections/Match";
import "@/components/Blocks/RobotLibrary/Collections/Log";
// RobotFrameWork Library: DateTime
import "@/components/Blocks/RobotLibrary/DateTime/Get_DT";
import "@/components/Blocks/RobotLibrary/DateTime/Add_DT";
import "@/components/Blocks/RobotLibrary/DateTime/Convert_DT";
import "@/components/Blocks/RobotLibrary/DateTime/Subtract_DT";
// RobotFrameWork Library: Dialogs
import "@/components/Blocks/RobotLibrary/Dialogs/Action";
import "@/components/Blocks/RobotLibrary/Dialogs/Get";
// RobotFrameWork Library: OperatingSystem
import '@/components/Blocks/RobotLibrary/OperatingSystem/File';
import '@/components/Blocks/RobotLibrary/OperatingSystem/Direct';
import '@/components/Blocks/RobotLibrary/OperatingSystem/Path';
import '@/components/Blocks/RobotLibrary/OperatingSystem/Environment';
import '@/components/Blocks/RobotLibrary/OperatingSystem/ProcessExecut';
import '@/components/Blocks/RobotLibrary/OperatingSystem/ExistenceCheck';
import '@/components/Blocks/RobotLibrary/OperatingSystem/WaitOperat';
// RobotFrameWork Library: Process
import "@/components/Blocks/RobotLibrary/Process/Management";
import "@/components/Blocks/RobotLibrary/Process/Verification";
import "@/components/Blocks/RobotLibrary/Process/Information";
import "@/components/Blocks/RobotLibrary/Process/CommandLine";
// RobotFrameWork Library: Screenshot
import "@/components/Blocks/RobotLibrary/Screenshot/Screenshot";
// RobotFrameWork Library: String
import "@/components/Blocks/RobotLibrary/String/Convert";
import "@/components/Blocks/RobotLibrary/String/Extract";
import "@/components/Blocks/RobotLibrary/String/Modified";
import "@/components/Blocks/RobotLibrary/String/Split";
import "@/components/Blocks/RobotLibrary/String/Validation";
import "@/components/Blocks/RobotLibrary/String/Coding";
import "@/components/Blocks/RobotLibrary/String/Generate";
// RobotFrameWork Library: Telnet
import "@/components/Blocks/RobotLibrary/Telnet/Connection";
import "@/components/Blocks/RobotLibrary/Telnet/OpRead";
import "@/components/Blocks/RobotLibrary/Telnet/OpWrit";
import "@/components/Blocks/RobotLibrary/Telnet/Setting";
import "@/components/Blocks/RobotLibrary/Telnet/Action";
// RobotFrameWork Library: XML
import "@/components/Blocks/RobotLibrary/XML/Element_Add_Remove";
import "@/components/Blocks/RobotLibrary/XML/Element_Retrieval";
import "@/components/Blocks/RobotLibrary/XML/Element_Verification";
import "@/components/Blocks/RobotLibrary/XML/Element_Setting";
import "@/components/Blocks/RobotLibrary/XML/Other";

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

import {
  TB_Dialogs_Action,
  TB_Dialogs_Get,
} from "@/components/ToolBoxs/TB_Dialogs"

import {
  TB_OperatingSystem_File,
  TB_OperatingSystem_Direct,
  TB_OperatingSystem_Path,
  TB_OperatingSystem_Environment,
  TB_OperatingSystem_ProcessExecut,
  TB_OperatingSystem_ExistenceCheck,
  TB_OperatingSystem_WaitOperat,
} from "@/components/ToolBoxs/TB_OperatingSystem"

import {
  TB_Proess_Creation_Management,
  TB_Proess_Status_Verification,
  TB_Proess_Information,
  TB_Proess_CommandLine,
} from "@/components/ToolBoxs/TB_Processes"

import {
  TB_Screenshot,
} from "@/components/ToolBoxs/TB_Screenshot"

import {
  TB_String_Convert,
  TB_String_Extract,
  TB_String_Modified,
  TB_String_Split,
  TB_String_Validation,
  TB_String_Coding,
  TB_String_Generate,
} from "@/components/ToolBoxs/TB_String"

import {
  TB_Telnet_Connection,
  TB_Telnet_OpRead,
  TB_Telnet_OpWrit,
  TB_Telnet_Setting,
  TB_Telnet_Action,
} from "@/components/ToolBoxs/TB_Telenet"

import {
  TB_XML_Add_Remove,
  TB_XML_Retrieval,
  TB_XML_Setting,
  TB_XML_Verification,
  TB_XML_Other,
} from "@/components/ToolBoxs/TB_XML"

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
          TB_Dialogs_Action,
          TB_Dialogs_Get,
        ],
      },
      {
        kind: "category",
        name: "RBL_OperatingSystem",
        colour: "#A65C81",
        contents: [
          TB_OperatingSystem_File,
          TB_OperatingSystem_Direct,
          TB_OperatingSystem_Path,
          TB_OperatingSystem_Environment,
          TB_OperatingSystem_ProcessExecut,
          TB_OperatingSystem_ExistenceCheck,
          TB_OperatingSystem_WaitOperat,
        ],
      },
      {
        kind: "category",
        name: "RBL_Process",
        colour: "#A65C81",
        contents: [
          TB_Proess_Creation_Management,
          TB_Proess_Status_Verification,
          TB_Proess_Information,
          TB_Proess_CommandLine,
        ],
      },
      {
        kind: "category",
        name: "RBL_Screenshot",
        colour: "#A65C81",
        contents: TB_Screenshot
      },
      {
        kind: "category",
        name: "RBL_String",
        colour: "#A65C81",
        contents: [
          TB_String_Convert,
          TB_String_Extract,
          TB_String_Modified,
          TB_String_Split,
          TB_String_Validation,
          TB_String_Coding,
          TB_String_Generate,
        ],
      },
      {
        kind: "category",
        name: "RBL_Telnet",
        colour: "#A65C81",
        contents: [
          TB_Telnet_Connection,
          TB_Telnet_OpRead,
          TB_Telnet_OpWrit,
          TB_Telnet_Setting,
          TB_Telnet_Action,
        ],
      },
      {
        kind: "category",
        name: "RBL_XML",
        colour: "#A65C81",
        contents: [
          TB_XML_Add_Remove,
          TB_XML_Retrieval,
          TB_XML_Setting,
          TB_XML_Verification,
          TB_XML_Other,
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
