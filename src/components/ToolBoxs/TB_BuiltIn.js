export const BuiltIn_Block_List = [
  'rb_builtin_continue_for_loop', 'rb_builtin_continue_for_loop_if', 'rb_builtin_exit_for_loop',
  'rb_builtin_exit_for_loop_if', 'rb_builtin_pass_execution', 'rb_builtin_pass_execution_if',
  'rb_builtin_skip', 'rb_builtin_skip_if', 'rb_builtin_wait_until_keyword_succeeds',
  'rb_builtin_return_from_keyword', 'rb_builtin_return_from_keyword_if', 'rb_builtin_run_keyword',
  'rb_builtin_run_keyword_and_continue_on_failure', 'rb_builtin_run_keyword_and_expect_error',
  'rb_builtin_run_keyword_and_ignore_error', 'rb_builtin_run_keyword_and_return',
  'rb_builtin_run_keyword_and_return_if', 'rb_builtin_run_keyword_and_return_status',
  'rb_builtin_run_keyword_and_warn_on_failure', 'rb_builtin_run_keyword_if',
  'rb_builtin_run_keyword_if_all_tests_passed', 'rb_builtin_run_keyword_if_any_tests_failed',
  'rb_builtin_run_keyword_if_test_failed', 'rb_builtin_run_keyword_if_test_passed',
  'rb_builtin_run_keyword_if_timeout_occurred', 'rb_builtin_run_keyword_unless',
  'rb_builtin_run_keywords', 'rb_builtin_get_variable_value', 'rb_builtin_get_variables',
  'rb_builtin_import_variables', 'rb_builtin_replace_variables', 'rb_builtin_set_global_variable',
  'rb_builtin_set_local_variable', 'rb_builtin_set_suite_variable', 'rb_builtin_set_task_variable',
  'rb_builtin_set_test_variable', 'rb_builtin_set_variable', 'rb_builtin_set_variable_if',
  'rb_builtin_variable_should_exist', 'rb_builtin_variable_should_not_exist', 'rb_builtin_should_be_empty',
  'rb_builtin_should_be_equal', 'rb_builtin_should_be_equal_as_integers', 'rb_builtin_should_be_equal_as_numbers',
  'rb_builtin_should_be_equal_as_strings', 'rb_builtin_should_be_true', 'rb_builtin_should_contain',
  'rb_builtin_should_contain_any', 'rb_builtin_should_contain_x_times', 'rb_builtin_should_match',
  'rb_builtin_should_match_regexp', 'rb_builtin_should_not_be_empty', 'rb_builtin_should_not_be_equal',
  'rb_builtin_should_not_be_equal_as_integers', 'rb_builtin_should_not_be_equal_as_numbers',
  'rb_builtin_should_not_be_equal_as_strings', 'rb_builtin_should_not_be_true', 'rb_builtin_should_not_contain',
  'rb_builtin_should_not_contain_any', 'rb_builtin_should_not_match', 'rb_builtin_should_not_match_regexp',
  'rb_builtin_should_start_with', 'rb_builtin_should_not_start_with', 'rb_builtin_should_end_with',
  'rb_builtin_should_not_end_with', 'rb_builtin_keyword_should_exist', 'rb_builtin_length_should_be',
  'rb_builtin_convert_to_binary', 'rb_builtin_convert_to_boolean', 'rb_builtin_convert_to_bytes',
  'rb_builtin_convert_to_hex', 'rb_builtin_convert_to_integer', 'rb_builtin_convert_to_number',
  'rb_builtin_convert_to_octal', 'rb_builtin_convert_to_string', 'rb_builtin_log', 'rb_builtin_log_many',
  'rb_builtin_log2console', 'rb_builtin_log_variables', 'rb_builtin_set_log_level',
  'rb_builtin_reset_log_level', 'rb_builtin_set_suite_documentation', 'rb_builtin_set_suite_metadata',
  'rb_builtin_set_test_documentation', 'rb_builtin_set_test_message', 'rb_builtin_set_tags',
  'rb_builtin_remove_tags', 'rb_builtin_import_library', 'rb_builtin_import_resource',
  'rb_builtin_reload_library', 'rb_builtin_get_library_instance', 'rb_builtin_set_library_search_order',
  'rb_builtin_call_method', 'rb_builtin_catenate', 'rb_builtin_comment', 'rb_builtin_create_dictionary',
  'rb_builtin_create_list', 'rb_builtin_evaluate', 'rb_builtin_fail', 'rb_builtin_fatal_error',
  'rb_builtin_get_count', 'rb_builtin_get_length', 'rb_builtin_get_time', 'rb_builtin_no_operation',
  'rb_builtin_regexp_escape', 'rb_builtin_repeat_keyword', 'rb_builtin_sleep'
]

export const TB_BuiltIn_FlowContol = {
  kind: "category",
  name: "FlowContol",
  colour: "#A65C81",
  contents: [
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
      type: "rb_builtin_exit_for_loop",
    },
    {
      kind: "block",
      type: "rb_builtin_exit_for_loop_if",
    },
    {
      kind: "block",
      type: "rb_builtin_pass_execution",
    },
    {
      kind: "block",
      type: "rb_builtin_pass_execution_if",
    },
    {
      kind: "block",
      type: "rb_builtin_skip",
      inputs: {
        message: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              COMMENT: "Reason"
            }
          }
        }
      },
    },
    {
      kind: "block",
      type: "rb_builtin_skip_if",
      inputs: {
        message: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              COMMENT: "Reason"
            }
          }
        }
      },
    },
    {
      kind: "block",
      type: "rb_builtin_wait_until_keyword_succeeds",
      inputs: {
        retry: {
          shadow: {
            type: 'rb_cm_time_string',
            fields: {
              time_value: "0",
              time_type: "times"
            }
          }
        },
        retry_interval: {
          shadow: {
            type: 'rb_cm_time_string',
            fields: {
              time_value: "0",
              time_type: "m"
            }
          }
        },
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    }
  ],
}

export const TB_BuiltIn_Keyword = {
  kind: "category",
  name: "Keyword",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_builtin_return_from_keyword",
      inputs: {
        container: { 
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              CONTENT: "Keyword"
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_builtin_return_from_keyword_if",
      inputs: {
        condition_container: {
          shadow: {
            type: 'rb_cm_S2S',
          }
        },
        value_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              CONTENT: "Variable"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword",
      inputs: {
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_and_continue_on_failure",
      inputs: {
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_and_expect_error",
      inputs: {
        error_message: {
          shadow: {
            type: "rb_cm_content",
            fields: {
              CONTENT: "Error String"
            }
          }
        },
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_and_ignore_error",
      inputs:{
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_and_return",
      inputs:{
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_and_return_if",
      inputs: {
        condition: {
          shadow: {
            type: 'rb_cm_S2S',
          }
        },
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_and_return_status",
      inputs: {
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_and_warn_on_failure",
      inputs: {
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_if",
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_if_all_tests_passed",
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_if_any_tests_failed",
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_if_test_failed",
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_if_test_passed",
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_if_timeout_occurred",
    },
    {
      kind: "block",
      type: "rb_builtin_run_keyword_unless",
      inputs: {
        condition_container: {
          shadow: {
            type: 'rb_cm_S2S',
          }
        },
        keyword_container: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_run_keywords",
      inputs: {
        keyword_container: {
          shadow: {
            type: 'other_create_logic_statement',
          }
        }
      }
    }
  ]
}

export const TB_BuiltIn_Variable = {
  kind: "category",
  name: "Variable",
  colour: "#A65C81",
  contents: [
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
    {
      kind: "block",
      type: "rb_builtin_replace_variables",
    },
    {
      kind: "block",
      type: "rb_builtin_set_global_variable",
      inputs: {
        variable: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable: 'Variable'
            }
          }
        },
        value: {
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
      type: "rb_builtin_set_local_variable",
      inputs: {
        variable: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable: 'Variable'
            }
          }
        },
        value: {
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
      type: "rb_builtin_set_suite_variable",
    },
    {
      kind: "block",
      type: "rb_builtin_set_task_variable",
      inputs: {
        variable: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable: 'Variable'
            }
          }
        },
        value: {
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
      type: "rb_builtin_set_test_variable",
      inputs: {
        variable: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable: 'Variable'
            }
          }
        },
        value: {
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
      type: "rb_builtin_set_variable",
      inputs: {
        variable: {
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
      type: "rb_builtin_set_variable_if",
    },
    {
      kind: "block",
      type: "rb_builtin_variable_should_exist",
    },
    {
      kind: "block",
      type: "rb_builtin_variable_should_not_exist",
    }
  ]
}

export const TB_BuiltIn_Assert = {
  kind: "category",
  name: "Assert",
  colour: "#A65C81",
  contents: [
    {
      kind: "category",
      name: "Should_Be",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_be_empty",
        },
        {
          kind: "block",
          type: "rb_builtin_should_be_equal",
        },
        {
          kind: "block",
          type: "rb_builtin_should_be_equal_as_integers",
        },
        {
          kind: "block",
          type: "rb_builtin_should_be_equal_as_numbers",
        },
        {
          kind: "block",
          type: "rb_builtin_should_be_equal_as_strings",
        },
        {
          kind: "block",
          type: "rb_builtin_should_be_true",
        }
      ]
    },
    {
      kind: "category",
      name: "Should_Contain",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_contain",
        },
        {
          kind: "block",
          type: "rb_builtin_should_contain_any",
        },
        {
          kind: "block",
          type: "rb_builtin_should_contain_x_times",
        }
      ]
    },
    {
      kind: "category",
      name: "Should_Match",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_match",
        },
        {
          kind: "block",
          type: "rb_builtin_should_match_regexp",
        },
      ]
    },
    {
      kind: "category",
      name: "Should_Not_Be",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_not_be_empty",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_be_equal",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_be_equal_as_integers",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_be_equal_as_numbers",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_be_equal_as_strings",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_be_true",
        }
      ]
    },
    {
      kind: "category",
      name: "Should_Not_Contain",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_not_contain",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_contain_any",
        }
      ]
    },
    {
      kind: "category",
      name: "Should_Not_Match",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_not_match",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_match_regexp",
        },
      ]
    },
    {
      kind: "category",
      name: "Should_Start_With",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_start_with",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_start_with",
        }
      ]
    },
    {
      kind: "category",
      name: "Should_End_With",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_should_end_with",
        },
        {
          kind: "block",
          type: "rb_builtin_should_not_end_with",
        }
      ]
    },
    {
      kind: "category",
      name: "Other",
      contents: [
        {
          kind: "block",
          type: "rb_builtin_keyword_should_exist",
        },
        {
          kind: "block",
          type: "rb_builtin_length_should_be",
        }
      ]
    }
  ]
}

export const TB_BuiltIn_Convert = {
  kind: "category",
  name: "Convert",
  colour: "#A65C81",
  contents: [
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
      }
    },
    {
      kind: "block",
      type: "rb_builtin_convert_to_bytes",
      inputs: {
        value_container: { 
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
      }
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
      }
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
      }
    }
  ]
}

export const TB_BuiltIn_Log = {
  kind: "category",
  name: "Log",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_builtin_log",
    },
    {
      kind: "block",
      type: "rb_builtin_log_many",
    },
    {
      kind: "block",
      type: "rb_builtin_log2console",
    },
    {
      kind: "block",
      type: "rb_builtin_log_variables",
    },
    {
      kind: "block",
      type: "rb_builtin_set_log_level",
    },
    {
      kind: "block",
      type: "rb_builtin_reset_log_level",
    }
  ]
}

export const TB_BuiltIn_TestManagement = {
  kind: "category",
  name: "TestManagement",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_builtin_set_suite_documentation",
    },
    {
      kind: "block",
      type: "rb_builtin_set_suite_metadata",
    },
    {
      kind: "block",
      type: "rb_builtin_set_test_documentation",
    },
    {
      kind: "block",
      type: "rb_builtin_set_test_message",
    },
    {
      kind: "block",
      type: "rb_builtin_set_tags",
    },
    {
      kind: "block",
      type: "rb_builtin_remove_tags",
    },
  ]
}

export const TB_BuiltIn_Resource = {
  kind: "category",
  name: "Resource",
  colour: "#A65C81",
  contents: [
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
      type: "rb_builtin_reload_library",
    },
    {
      kind: "block",
      type: "rb_builtin_get_library_instance",
    },
    {
      kind: "block",
      type: "rb_builtin_set_library_search_order",
    }
  ]
}

export const TB_BuiltIn_UtilTools = {
  kind: "category",
  name: "UtilsTools",
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
      type: "rb_builtin_comment",
    },
    {
      kind: "block",
      type: "rb_builtin_create_dictionary",
      inputs: {
        create_dictionary_container: { 
          shadow: {
            type: 'rb_cm_V2V',
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
      }
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
      }
    },
    {
      kind: "block",
      type: "rb_builtin_get_time",
    },
    {
      kind: "block",
      type: "rb_builtin_no_operation",
    },
    {
      kind: "block",
      type: "rb_builtin_regexp_escape",
    },
    {
      kind: "block",
      type: "rb_builtin_repeat_keyword",
      inputs: {
        repeats: {
          shadow: {
            type: 'rb_cm_time_string',
            fields: {
              time_value: "3",
              time_type: "times"
            }
          }
        },
        keyword: {
          shadow: {
            type: 'other_call_keyword',
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_builtin_sleep",
      inputs : {
        time: {
          shadow: {
            type: 'rb_cm_time_string',
            fields: {
              time_value: "10",
              time_type: "s"
            }
          }
        }
      }
    }
  ]
}