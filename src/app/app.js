"use client";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import {pythonGenerator} from 'blockly/python';

import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import DownloadButton from "@/components/btn_download";

import "@/components/Blocks/command_Blocks";
import "@/components/Blocks/rb_Common";
import "@/components/Blocks/rb_BuiltIn";


export default function App() {
  const [xml, setXml] = useState("");
  const [CodeSpaceCode, setCodeSpaceCode] = useState("");

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="Robot_framework" x="70" y="30"></field></block></xml>';
  
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
            kind: "block",
            type: "Robot_framework",
          },
          {
            kind: "category",
            name: "Settings",
            colour: "#A65C81",
            contents: [
              {
                kind: "block",
                type: "setting_import",
              },
              {
                kind: "block",
                type: "Content"
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
                type: "variable_set",
              },
              {
                kind: "block",
                type: "Content"
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
                type: "Content"
              }
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
          {
            kind: "block",
            type: "Function_block",
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
