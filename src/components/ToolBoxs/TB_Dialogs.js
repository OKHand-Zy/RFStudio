export const Dialogs_Block_List = [
  'rb_dialogs_execute_manual_step', 'rb_dialogs_pause_execution', 'rb_dialogs_get_selection_from_user',
  'rb_dialogs_get_selections_from_user', 'rb_dialogs_get_value_from_user'
]

export const TB_Dialogs_Action = {
  kind: "category",
  name: "Dialogs Action",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_dialogs_execute_manual_step",
      inputs: {
        message_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Show_Message"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_dialogs_pause_execution",
      inputs: {
        message_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Show_Message"
            }
          }
        } 
      }
    },
  ]
}

export const TB_Dialogs_Get = {
  kind: "category",
  name: "Dialogs Get",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_dialogs_get_selection_from_user",
      inputs: {
        message_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Show_Message"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_dialogs_get_selections_from_user",
      inputs: {
        message_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Show_Message"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_dialogs_get_value_from_user",
      inputs: {
        message_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Show_Message"
            }
          }
        }
      }
    }
  ]
}