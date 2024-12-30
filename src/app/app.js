"use client";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import {pythonGenerator} from 'blockly/python';
import "@/components/custom_Blocks";
import "@/components/rb_Common";
import "@/components/rb_BuiltIn";

export default function App() {
  const [xml, setXml] = useState("");
  const [CodeSpaceCode, setCodeSpaceCode] = useState("");

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';
  
    const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
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
        name: "Custom",
        colour: "#5CA699",
        contents: [
            {
                kind: "block",
                type: "print_message",
            },
            {
                kind: "block",
                type: "new_boundary_function",
            },
            {
                kind: "block",
                type: "return",
            },
        ],
      },
      {
        kind: "category",
        name: "RB_Common",
        colour: "#A65C81",
        contents: [
          {
              kind: "block",
              type: "Robot_Init",
          },
          {
              kind: "block",
              type: "variable_block",
          },
          {
              kind: "block",
              type: "Keyword_function",
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
    ],
  };
  
  // Generate code from workspace
  function workspaceDidChange(workspace) {
    const code = pythonGenerator.workspaceToCode(workspace);
    setCodeSpaceCode(code);
  }

  return (
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
        <pre id="generated-xml">{xml}</pre>
        <textarea
          id="code"
          style={{ height: "200px", width: "400px" }}
          value={CodeSpaceCode}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}
