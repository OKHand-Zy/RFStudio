export const XML_Block_List = [
  'rb_xml_add_element', 'rb_xml_remove_element', 'rb_xml_remove_elements', 'rb_xml_remove_element_attribute',
  'rb_xml_remove_elements_attribute', 'rb_xml_remove_element_attributes', 'rb_xml_remove_elements_attributes',
  'rb_xml_clear_element', 'rb_xml_get_element', 'rb_xml_get_elements', 'rb_xml_get_child_elements',
  'rb_xml_get_element_count', 'rb_xml_get_element_text', 'rb_xml_get_elements_texts', 
  'rb_xml_get_element_attribute', 'rb_xml_get_element_attributes', 'rb_xml_set_element_text', 
  'rb_xml_set_elements_text', 'rb_xml_set_element_tag', 'rb_xml_set_elements_tag', 
  'rb_xml_set_element_attribute', 'rb_xml_set_elements_attribute', 'rb_xml_element_should_exist',
  'rb_xml_element_should_not_exist', 'rb_xml_element_attribute_should_be', 'rb_xml_element_attribute_should_match',
  'rb_xml_element_text_should_be', 'rb_xml_element_text_should_match', 'rb_xml_elements_should_be_equal',
  'rb_xml_elements_should_match', 'rb_xml_element_should_not_have_attribute', 'rb_xml_parse_xml',
  'rb_xml_save_xml', 'rb_xml_evaluate_xpath', 'rb_xml_element_to_string', 'rb_xml_copy_element', 
  'rb_xml_log_element'
]

export const TB_XML_Add_Remove = {
  kind: "category",
  name: "Element Addition and Removal",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_xml_add_element",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        element_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "<Element></Element>"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_remove_element",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_remove_elements",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_remove_element_attribute",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Element Attribute"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_remove_elements_attribute",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Element Attribute"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_remove_element_attributes",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_remove_elements_attributes",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_clear_element",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
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
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_get_elements",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        xpath_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "xpath"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_get_child_elements",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_get_element_count",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_get_element_text",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_get_elements_texts",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        xpath_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "xpath"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_get_element_attribute",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Element Attribute"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_get_element_attributes",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        } 
      }
    },

  ]
}

export const TB_XML_Setting = {
  kind: "category",
  name: "ElementModification and Setting",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_xml_set_element_text",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_set_elements_text",
      inputs:{
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_set_element_tag",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        tag_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Tag"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_set_elements_tag",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        tag_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Tag"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_set_element_attribute",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Name"
            }
          }
        }, 
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Value"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_set_elements_attribute",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Name"
            }
          }
        }, 
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Value"
            }
          }
        } 
      }
    }
  ]
}

export const TB_XML_Verification = {
  kind: "category",
  name: "Verification and Assertion",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_xml_element_should_exist",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_element_should_not_exist",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_element_attribute_should_be",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Element Attribute"
            }
          }
        },
        expected_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Expected"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_element_attribute_should_match",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Element Attribute"
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Find_Pattern'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_element_text_should_be",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        expected_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Expected"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_element_text_should_match",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Find_Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_elements_should_be_equal",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        expected_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'ExpectedXML'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_elements_should_match",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        expected_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'ExpectedXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_element_should_not_have_attribute",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }, 
        name_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Element Attribute"
            }
          }
        }
      }
    }
  ]
}

export const TB_XML_Other = {
  kind: "category",
  name: "Element Other",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_xml_parse_xml",
      inputs:{
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_save_xml",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        path_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "path"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_evaluate_xpath",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        },
        expression_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "expression"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_element_to_string",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_xml_copy_element",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_xml_log_element",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'SourceXML'
            }
          }
        }
      }
    }
  ]
}

