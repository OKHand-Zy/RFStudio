export const Logic_For_Loop = {
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
};

export const Logic_While_Loop = {
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
};

export const Logic_If_Loop = {
  kind: "category",
  name: "IF LOOP",
  colour: "#5C81A6",
  contents: [
    {
      kind: "block",
      type: "rb_logic_if_else_loop",
    },
  ]
};

export const Logic_Try_Loop = {
  kind: "category",
  name: "TRY LOOP",
  colour: "#5C81A6",
  contents: [
    {
      kind: "block",
      type: "rb_logic_try_except_loop",
    },
  ]
};

export const Logic_Group = {
  kind: "category",
  name: "GROUP",
  colour: "#5C81A6",
  contents: [
    {
      kind: "block",
      type: "rb_logic_group",
    },
  ]
};