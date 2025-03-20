export const String_Block_List = [
  'rb_string_convert_to_lower_case', 'rb_string_convert_to_title_case', 'rb_string_convert_to_upper_case',
  'rb_string_should_be_lower_case', 'rb_string_should_be_title_case', 'rb_string_should_be_upper_case',
  'rb_string_extract_from_left', 'rb_string_extract_from_right', 'rb_string_get_line', 'rb_string_get_line_count',
  'rb_string_get_lines_containing_string', 'rb_string_get_lines_matching_pattern', 'rb_string_get_lines_matching_regexp',
  'rb_string_get_regexp_matches', 'rb_string_get_substring', 'rb_string_format_string', 'rb_string_remove_string',
  'rb_string_remove_string_using_regexp', 'rb_string_replace_string', 'rb_string_replace_string_using_regexp',
  'rb_string_strip_string', 'rb_string_split_string', 'rb_string_split_string_from_right', 
  'rb_string_split_string_to_characters', 'rb_string_split_to_lines', 'rb_string_should_be_byte_string',
  'rb_string_should_be_string', 'rb_string_should_not_be_string', 'rb_string_should_be_unicode_string',
  'rb_string_decode_bytes_to_string', 'rb_string_encode_string_to_bytes', 'rb_string_generate_random_string'
]

export const TB_String_Convert = {
  kind: "category",
  name: "Convert",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_string_convert_to_lower_case",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_convert_to_title_case",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_convert_to_upper_case",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_should_be_lower_case",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_should_be_title_case",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_should_be_upper_case",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    }
  ]
}

export const TB_String_Extract = {
  kind: "category",
  name: "Extract",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_string_extract_from_left",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }, 
        marker_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Marker"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_extract_from_right",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }, 
        marker_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Marker"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_get_line",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        },
        line_number_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Line Number"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_get_line_count",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_get_lines_containing_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Pattern"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_get_lines_matching_pattern",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Pattern"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_get_lines_matching_regexp",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }, 
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Pattern"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_get_regexp_matches",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_get_substring",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }, 
        start_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Start Count"
            }
          }
        },
        end_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "End Count"
            }
          }
        } 
      }
    }
  ]
}

export const TB_String_Modified = {
  kind: "category",
  name: "Modified",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_string_format_string"
    },
    {
      kind: "block",
      type: "rb_string_remove_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_remove_string_using_regexp",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_replace_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        },
        search_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Search"
            }
          }
        }, 
        replace_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Replace"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_replace_string_using_regexp",
      inputs:{
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Pattern"
            }
          }
        },
        replace_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Replace"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_strip_string",
      inputs:{
        string_container:{
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    }
  ]
}

export const TB_String_Split = {
  kind: "category",
  name: "Split",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_string_split_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_split_string_from_right",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_split_string_to_characters",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'String'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_split_to_lines",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'String'
            }
          }
        },
      }
    }
  ]
}

export const TB_String_Validation = {
  kind: "category",
  name: "Validation",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_string_should_be_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        },
      }
    },
    {
      kind: "block",
      type: "rb_string_should_not_be_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_should_be_byte_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_string_should_be_unicode_string",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "String"
            }
          }
        } 
      }
    }
    
  ]
}

export const TB_String_Coding = {
  kind: "category",
  name: "Coding",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_string_decode_bytes_to_string",
      inputs: {
        bytes_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Bytes'
            }
          }
        }, 
        encoding_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "UTF-8"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_string_encode_string_to_bytes",
      inputs: {
        string_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'String'
            }
          }
        }, 
        encoding_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "UTF-8"
            }
          }
        } 
      }
    }
  ]
}

export const TB_String_Generate = {
  kind: "category",
  name: "Generate",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_string_generate_random_string",
      inputs: {
        length_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Length"
            }
          }
        },
        chars_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Chars"
            }
          }
        } 
      }
    }
  ]
}