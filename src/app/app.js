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
//Control Structures
import "@/components/Blocks/Common/Control_Structures/for_loop";
import "@/components/Blocks/Common/Control_Structures/while_loop";
import "@/components/Blocks/Common/Control_Structures/if_loop";
import "@/components/Blocks/Common/Control_Structures/try_loop";
import "@/components/Blocks/Common/Control_Structures/group";

import "@/components/Blocks/Common/function";

// RobotFrameWork Library Blocks
import "@/components/Blocks/RobotLibrary/BuiltIn";

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
                type: "rb_cm_html_content",
              },
              {
                kind: "block",
                type: "rb_cm_math_symbols",
              },
              {
                kind: "block",
                type: "rb_cm_V2V",
                inputs: {
                  value1: { 
                    shadow: {
                      type: 'rb_cm_content',
                      fields: {
                        CONTENT: "Valume"
                      }
                    }
                  },
                  value2: {
                    shadow: {
                      type: 'rb_cm_content',
                      fields: {
                        CONTENT: "Valume"
                      }
                    }
                  }
                },
              },
              {
                kind: "block",
                type: "rb_cm_S2S",
                inputs: {
                  string1: { 
                    shadow: {
                      type: 'rb_cm_variable',
                      fields: {
                        variable: 'Variable'
                      }
                    }
                  },
                  string2: {
                    shadow: {
                      type: 'rb_cm_content',
                      fields: {
                        CONTENT: "Valume"
                      }
                    }
                  }
                },
              },
              {
                kind: "block",
                type: "rb_cm_index",
              },
              {
                kind: "block",
                type: "rb_cm_date",
              },
              {
                kind: "block",
                type: "rb_cm_operating_system",
              },
              {
                kind: "block",
                type: "rb_cm_empty",
              },
              {
                kind: "block",
                type: "rb_cm_automatic_variables",
              },
              {
                kind: "block",
                type: "rb_cm_time_string",
              },
              {
                kind: "block",
                type: "rb_cm_timer_string",
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
          {
            kind: "category",
            name: "Base Functions",
            colour: "#FF0000",
            contents: [
              {
                kind: "block",
                type: "rb_cm_return"
              },
              {
                kind: "block",
                type: "rb_cm_loop_control"
              },
              {
                kind: "block",
                type: "rb_cm_reserved_tags"
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
            kind: "category",
            name: "FOR LOOP",
            colour: "#5C81A6",
            contents: [
              {
                kind: "block",
                type: "rb_logic_for_loop",
              },
              {
                kind: "block",
                type: "rb_logic_for_zip_mode",
              },
              {
                kind: "block",
                type: "rb_logic_for_zip_fill",
              },
            ]
          },
          {
            kind: "category",
            name: "WHILE LOOP",
            colour: "#5C81A6",
            contents: [
              {
                kind: "block",
                type: "rb_logic_while_loop",
              },
              {
                kind: "block",
                type: "rb_logic_while_value",
                inputs: {
                  variables: { 
                    shadow: {
                      type: 'rb_cm_variable',
                      fields: {
                        variable: 'Variable'
                      }
                    }
                  },
                  verified: {
                    shadow: {
                      type: 'rb_cm_content',
                      fields: {
                        CONTENT: "Verified"
                      }
                    }
                  }
                }
              },
              {
                kind: "block",
                type: "rb_logic_while_true_limit",
              }
            ]
          },
          {
            kind: "category",
            name: "IF LOOP",
            colour: "#5C81A6",
            contents: [
              {
                kind: "block",
                type: "rb_logic_if_else_loop",
              },
            ]
          },
          {
            kind: "category",
            name: "TRY LOOP",
            colour: "#5C81A6",
            contents: [
              {
                kind: "block",
                type: "rb_logic_try_except_loop",
              },
            ]
          },
          {
            kind: "category",
            name: "GROUP",
            colour: "#5C81A6",
            contents: [
              {
                kind: "block",
                type: "rb_logic_group",
              },
            ]
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
        name: "RB_Framework",
        colour: "#A65C81",
        contents: [
          {
            kind: "category",
            name: "Comments",
            colour: "#A65C81",
            contents: [
              {
                kind: "block",
                type: "rb_cmt_comment",
              },
            ]
          },
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
                type: "rb_fw_Tasks"
              },
              {
                kind: "block",
                type: "rb_testcase_function"
              },
              {
                kind: "block",
                type: "rb_testcase_section_container"
              },
              {
                kind: "block",
                type: "rb_testcase_assign_variables",
                inputs: {
                  variables: { 
                    shadow: {
                      type: 'rb_cm_variable',
                      fields: {
                        variable: 'Variable'
                      }
                    }
                  },
                  verified: {
                    shadow: {
                      type: 'rb_cm_content',
                      fields: {
                        CONTENT: "Verified"
                      }
                    }
                  }
                },
              },
              {
                kind: "block",
                type: "rb_testcase_var",
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
            type: "rb_builtin_call_method",
          },
          {
            kind: "block",
            type: "rb_builtin_catenate",
          },
          {
            kind: "block",
            type: "rb_builtin_continue_for_loop",  
          },  
          {
            kind: "block",
            type: "rb_builtin_continue_for_loop_if",
          },
          {
            kind: "block",
            type: "rb_builtin_convert_to_binary",
          },
          {
            kind: "block",
            type: "rb_builtin_convert_to_boolean",
            inputs: {
              value_block: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_convert_to_integer",
            inputs: {
              value_block: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_convert_to_number",
            inputs: {
              value_block: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_convert_to_hex",
            inputs: {
              value_container: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_convert_to_octal",
            inputs: {
              value_container: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_convert_to_string",
            inputs: {
              value_block: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_create_dictionary",
            inputs: {
              create_dictionary_container: { 
                shadow: {
                  type: 'rb_cm_V2V',
                  inputs: {
                    value1: { 
                      shadow: {
                        type: 'rb_cm_content',
                        fields: {
                          CONTENT: "Valume"
                        }
                      }
                    },
                    value2: {
                      shadow: {
                        type: 'rb_cm_content',
                        fields: {
                          CONTENT: "Valume"
                        }
                      }
                    },
                  },
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_create_list",
            inputs: {
              create_list_container: {
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              } 
            }
          },
          {
            kind: "block",
            type: "rb_builtin_evaluate",
          },
          {
            kind: "block",
            type: "rb_builtin_exit_for_loop",
          },
          {
            kind: "block",
            type: "rb_builtin_exit_for_loop_if",
          },
          {
            kind: "block",
            type: "rb_builtin_fail",
          },
          {
            kind: "block",
            type: "rb_builtin_fatal_error",
          },
          {
            kind: "block",
            type: "rb_builtin_get_count",
            inputs: {
              container: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_get_length",
            inputs: {
              container: { 
                shadow: {
                  type: 'rb_cm_variable',
                  fields: {
                    variable: 'Variable'
                  }
                }
              }
            },
          },
          {
            kind: "block",
            type: "rb_builtin_get_library_instance",
          },
          {
            kind: "block",
            type: "rb_builtin_get_time",
          },
          {
            kind: "block",
            type: "rb_builtin_get_variable_value",
          },
          {
            kind: "block",
            type: "rb_builtin_get_variables",
          },
          {
            kind: "block",
            type: "rb_builtin_import_library",
            inputs: {
              library_name: {
                shadow: {
                  type: 'rb_cm_content',
                  fields: {
                    CONTENT: "Library"
                  }
                }
              }
            }
          },
          {
            kind: "block",
            type: "rb_builtin_import_resource",
            inputs: {
              resource: {
                shadow: {
                  type: 'rb_cm_content',
                  fields: {
                    CONTENT: "Resource"
                  }
                }
              }
            }
          },
          {
            kind: "block",
            type: "rb_builtin_import_variables",
            inputs: {
              container: { 
                shadow: {
                  type: 'rb_cm_content',
                  fields: {
                    CONTENT: "Variables"
                  }
                }
              } 
            }
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
