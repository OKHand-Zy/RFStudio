"use client";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import {pythonGenerator} from 'blockly/python';
// UI
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import DownloadButton from "@/components/btn_download";
// RobotFrameWork Blocks
import "@/components/Blocks/RobotFramework/rb_setting";
import "@/components/Blocks/RobotFramework/rb_variable";
import "@/components/Blocks/RobotFramework/rb_testcase";
import "@/components/Blocks/RobotFramework/rb_keyword";
// Common Blocks
import "@/components/Blocks/common";
import "@/components/Blocks/RobotLibrary/BuiltIn";
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
        name: "Commands",
        colour: "#FF0000",
        contents: [
          {
            kind: "category",
            name: "Variables",
            colour: "#FF0000",
            contents: [
              {
                kind: "block",
                type: "rb_cm_variable",
              },
              {
                kind: "block",
                type: "rb_cm_content",
              },
              {
                kind: "block",
                type: "rb_cm_date",
              },
            ]
          },
          {
            kind: "category",
            name: "Documentation",
            colour: "#FF0000",
            contents: [
              {
                kind: "block",
                type: "rb_cm_inline_styles"
              },
              {
                kind: "block",
                type: "rb_cm_custom_links"
              },
            ]
          },
        ]
      },
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          {
            kind : "block",
            type: "logic_boolean"
          },      
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "logic_compare",
          },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "math_round",
          },
          {
            kind: "block",
            type: "math_number",
          },
        ],
      }, 
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
        name: "RB_Framework",
        colour: "#A65C81",
        contents: [
          {
            kind: "category",
            name: "Settings",
            colour: "#A65C81",
            contents: [
              {
                kind: "block",
                type: "rb_fw_Settings",
              },
              {
                kind: "block",
                type: "rb_setting_import_library",
              },
              {
                kind: "block",
                type: "rb_setting_import_remote_library"
              },
              {
                kind: "block",
                type: "rb_setting_section",
              },
            ]
          },
          {
            kind: "category",
            name: "Variables",
            colour: "#A65C81",
            contents: [
              {
                kind: "block",
                type: "rb_fw_Variables",
              },
              {
                kind: "block",
                type: "rb_variable_setVariable",
              }
            ]
          },
          {
            kind: "category",
            name: "TestCases",
            colour: "#A65C81",
            contents: [
              {
                kind: "block",
                type: "rb_fw_TestCases"
              },
              {
                kind: "block",
                type: "rb_testcase_function"
              },
              {
                kind: "block",
                type: "rb_testcase_section_container"
              },
            ]
          },
          {
            kind: "category",
            name: "KeyWords",
            colour: "#A65C81",
            contents: [
              {
                kind: "block",
                type: "rb_fw_Keywords"
              },
              {
                kind: "block",
                type: "rb_keyword_function"
              },
              {
                kind: "block",
                type: "rb_keyword_function_arg_container"
              },
            ]
          }
        ]
      },    
      {
        kind: "category",
        name: "RB_BuiltIn",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "sleep",
          },
          {
            kind: "block",
            type: "Get_Time",
          },
        ],
      },
      {
        kind: "category",
        name: "RB_Collections",
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
        name: "RB_DateTime",
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
        name: "RB_Dialogs",
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
        name: "RB_OperatingSystem",
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
        name: "RB_Process",
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
        name: "RB_Screenshot",
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
        name: "RB_String",
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
        name: "RB_Telnet",
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
        name: "RB_XML",
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
