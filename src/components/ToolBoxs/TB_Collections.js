export const Collections_Block_List = [
  'rbl_collections_append_to_list', 'rbl_collections_combine_lists', 'rbl_collections_count_values_in_list',
  'rbl_collections_get_from_list', 'rbl_collections_get_index_from_list', 'rbl_collections_get_slice_from_list',
  'rbl_collections_insert_into_list', 'rbl_collections_list_should_not_contain_duplicates',
  'rbl_collections_remove_duplicates', 'rbl_collections_remove_from_list', 'rbl_collections_remove_values_from_list',
  'rbl_collections_reverse_list', 'rbl_collections_sort_list', 'rbl_collections_copy_dictionary',
  'rbl_collections_get_dictionary_items', 'rbl_collections_get_dictionary_keys', 'rbl_collections_get_dictionary_values',
  'rbl_collections_get_from_dictionary', 'rbl_collections_keep_in_dictionary', 'rbl_collections_pop_from_dictionary',
  'rbl_collections_remove_from_dictionary', 'rbl_collections_set_to_dictionary', 'rbl_collections_convert_to_dictionary',
  'rbl_collections_convert_to_list', 'rbl_collections_dictionaries_should_be_equal', 'rbl_collections_dictionary_should_contain_item',
  'rbl_collections_dictionary_should_contain_key', 'rbl_collections_dictionary_should_contain_sub_dictionary',
  'rbl_collections_dictionary_should_contain_value', 'rbl_collections_dictionary_should_not_contain_key',
  'rbl_collections_dictionary_should_not_contain_value', 'rbl_collections_list_should_contain_sub_list',
  'rbl_collections_list_should_contain_value', 'rbl_collections_list_should_not_contain_value', 'rbl_collections_lists_should_be_equal',
  'rbl_collections_get_match_count', 'rbl_collections_get_matches', 'rbl_collections_should_contain_match',
  'rbl_collections_should_not_contain_match', 'rbl_collections_log_dictionary', 'rbl_collections_log_list'
]

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
    {
      kind: "block",
      type: "rbl_collections_combine_lists",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'ListName'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_count_values_in_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Find_Value",
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_from_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        }, 
        index_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Index_Name"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_index_from_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        }, 
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Find_Value"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_slice_from_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_insert_into_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        index_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Index"
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
      type: "rbl_collections_list_should_not_contain_duplicates",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_remove_duplicates",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
      }
    },
    {
      kind: "block",
      type: "rbl_collections_remove_from_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        index_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Index"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_remove_values_from_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_reverse_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_sort_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        } 
      }
    }
  ]
}

export const TB_Collections_Dictionary = {
  kind: "category",
  name: "Dictionary",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rbl_collections_copy_dictionary",
      inputs: {
        dictionary_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dictionary_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_dictionary_items",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_dictionary_keys",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        },
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_dictionary_values",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_from_dictionary",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        },
        key_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Key_Name"
            }
          }
        }, 
        default_value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Default_Value"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_keep_in_dictionary",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_pop_from_dictionary",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        }, 
        key_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Key_Name"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_remove_from_dictionary",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_set_to_dictionary",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        }
      }
    }
  ]
}

export const TB_Collections_Convert = {
  kind: "category",
  name: "Convert",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rbl_collections_convert_to_dictionary",
      inputs: {
        convert_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Variable_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_convert_to_list",
      inputs: {
        convert_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Variable_Name'
            }
          }
        }
      }
    }
  ]
}

export const TB_Collections_Comparison = {
  kind: "category",
  name: "Comparison",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rbl_collections_dictionaries_should_be_equal",
      inputs: {
        dict1_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dictionary_Name'
            }
          }
        },
        dict2_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dictionary_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_dictionary_should_contain_item",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dictionary_Name'
            }
          }
        },
        key_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Key_Name"
            }
          }
        },
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Value_Name"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_dictionary_should_contain_key",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dictionary_Name'
            }
          }
        },
        key_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Key_Name"
            }
          }
        },
      }
    },
    {
      kind: "block",
      type: "rbl_collections_dictionary_should_contain_sub_dictionary",
      inputs: {
        dict1_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dictionary_Name'
            }
          }
        },
        dict2_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dictionary_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_dictionary_should_contain_value",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        }, 
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Find_Value"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_dictionary_should_not_contain_key",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        },
        key_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Find_Key"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_dictionary_should_not_contain_value",
      inputs: {
        dict_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Dict_Name'
            }
          }
        }, 
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Find_Value"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_list_should_contain_sub_list",
      inputs: {
        list1_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        list2_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_list_should_contain_value",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Find_Value"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_list_should_not_contain_value",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Find_Value"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_lists_should_be_equal",
      inputs: {
        list1_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List1_Name'
            }
          }
        }, 
        list2_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List2_Name'
            }
          }
        }
      }
    }
  ]
}

export const TB_Collections_Match = {
  kind: "category",
  name: "Match",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rbl_collections_get_match_count",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        }, 
        pattern_container: {
          shadow: {
            type: 'rb_cm_regex_escape',
            fields: {
              regex: 'Find_Pattern'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rbl_collections_get_matches",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_regex_escape',
            fields: {
              regex: 'Find_Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_should_contain_match",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_regex_escape',
            fields: {
              regex: 'Find_Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_should_not_contain_match",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'List_Name'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_regex_escape',
            fields: {
              regex: 'Find_Pattern'
            }
          }
        }
      }
    }
  ]
}

export const TB_Collections_Log = {
  kind: "category",
  name: "Log",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rbl_collections_log_dictionary",
      inputs: {
        dictionary_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'DictionaryName'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rbl_collections_log_list",
      inputs: {
        list_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'ListName'
            }
          }
        },
      }
    }
  ]
}