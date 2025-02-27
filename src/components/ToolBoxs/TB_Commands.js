export const Command_Variables = {
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
        type: "other_create_keyword_arg",
        inputs: {
          arg: {
            shadow: {
              type: 'rb_cm_content',
              fields: {
                CONTENT: "ArgName"
              }
            }
          }, 
          value: {
            shadow: {
              type: 'rb_cm_content',
              fields: {
                CONTENT: "Valume"
              }
            }
          }
        }
      },
      {
        kind: "block",
        type: "rb_cm_index",
      },
      {
        kind: "block",
        type: "other_create_logic_statement",
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
      {
        kind: "block",
        type: "other_call_keyword",
        inputs: {
          keyword: {
            shadow: {
              type: 'rb_cm_content',
              fields: {
                CONTENT: "KeyWord Name"
              }
            }
          },
        },
      }
    ]
  };

export const Command_Documentation = {
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
};

export const Command_BaseFunctions = {
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
};