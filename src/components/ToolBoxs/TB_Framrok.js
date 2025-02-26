export const RBF_Comments = {
  kind: "category",
  name: "Comments",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_cmt_comment",
    },
  ]
};

export const RBF_Settings = {
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
};

export const RBF_Variables = {
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
};

export const RBF_TestCases = {
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
};

export const RBF_KeyWords = {
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
    {
      kind: "block",
      type: "rb_keyword_A2V",
      inputs: {
        value1: { 
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Arguments"
            }
          }
        },
        value2: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable: 'Variable'
            }
          }
        },
      },
    }
  ]
};
