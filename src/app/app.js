"use client";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import {pythonGenerator} from 'blockly/python';

import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import DownloadButton from "@/components/btn_download";

import "@/components/Blocks/Framework/rb_setting";
import "@/components/Blocks/Framework/rb_variable";
import "@/components/Blocks/Framework/rb_testcase";
import "@/components/Blocks/Framework/rb_keyword";

import "@/components/Blocks/command_Blocks";
import "@/components/Blocks/rb_Common";
import "@/components/Blocks/rb_BuiltIn";
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
            kind : "block",
            type: "Content",
          },
        ],
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
                type: "rb_setting_import",
              },
              {
                kind: "block",
                type: "rb_setting_content"
              }
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
              },
              {
                kind: "block",
                type: "rb_variable_content"
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
              }
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
            ]
          }
        ]
      },    
      {
        kind: "category",
        name: "RB_Common",
        colour: "#A65C81",
        contents: [
          {
            kind: "block",
            type: "Robot_framework",
          },
        ],
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
