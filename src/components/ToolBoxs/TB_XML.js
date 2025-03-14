export const XML_Block_List = [
  'rb_xml_add_element', 'rb_xml_remove_element', 'rb_xml_remove_elements', 'rb_xml_remove_element_attribute',
  'rb_xml_remove_elements_attribute', 'rb_xml_remove_element_attributes', 'rb_xml_remove_elements_attributes',
  'rb_xml_clear_element', 'rb_xml_get_element', 'rb_xml_get_elements'
]

export const TB_XML_Add_Remove = {
  kind: "category",
  name: "Element Addition and Removal",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_xml_add_element",
    },
    {
      kind: "block",
      type: "rb_xml_remove_element",
    },
    {
      kind: "block",
      type: "rb_xml_remove_elements",
    },
    {
      kind: "block",
      type: "rb_xml_remove_element_attribute",
    },
    {
      kind: "block",
      type: "rb_xml_remove_elements_attribute",
    },
    {
      kind: "block",
      type: "rb_xml_remove_element_attributes",
    },
    {
      kind: "block",
      type: "rb_xml_remove_elements_attributes",
    },
    {
      kind: "block",
      type: "rb_xml_clear_element",
    }
  ]
}

export const TB_XML_Retrieval = {
  kind: "category",
  name: "Element Retrieval and Reading",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_xml_get_element",
    },
    {
      kind: "block",
      type: "rb_xml_get_elements",
    }
  ]
}

export const TB_XML_Setting = {
  kind: "category",
  name: "ElementModification and Setting",
  colour: "#A65C81",
  contents: [
  ]
}

export const TB_XML_Verification = {
  kind: "category",
  name: "Verification and Assertion",
  colour: "#A65C81",
  contents: [
  ]
}

export const TB_XML_Other = {
  kind: "category",
  name: "Element Other",
  colour: "#A65C81",
  contents: [
  ]
}

