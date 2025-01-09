"use client";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import {pythonGenerator} from 'blockly/python';
import "@/components/Blocks/custom_Blocks";
import "@/components/Blocks/rb_Common";
import "@/components/Blocks/rb_BuiltIn";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import DownloadButton from "@/components/btn_download";

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
              type: "Robot_framework",
          },
          {
              kind: "block",
              type: "variable_block",
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
