export const TB_Collections_List = {
  kind: "category",
  name: "List",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rbl_collections_append_to_list",
      inputs: {
        list_variable_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '@',
              variable: 'ListName'
            }
          }
        }
      }
    },
  ]
}

export const TB_Collections_Dictionary = {
  kind: "category",
  name: "Dictionary",
  colour: "#A65C81",
  contents: [
  ]
}

export const TB_Collections_Convert = {
  kind: "category",
  name: "Convert",
  colour: "#A65C81",
  contents: [
  ]
}

export const TB_Collections_Comparison = {
  kind: "category",
  name: "Comparison",
  colour: "#A65C81",
  contents: [
  ]
}

export const TB_Collections_Match = {
  kind: "category",
  name: "Match",
  colour: "#A65C81",
  contents: [
  ]
}

export const TB_Collections_Log = {
  kind: "category",
  name: "Log",
  colour: "#A65C81",
  contents: [
  ]
}