export const OperatingSystem_Blocks_List = [
  'rb_operating_system_append_to_file', 'rb_operating_system_copy_file', 'rb_operating_system_copy_files',
  'rb_operating_system_create_binary_file', 'rb_operating_system_create_file', 'rb_operating_system_file_should_be_empty',
  'rb_operating_system_file_should_exist', 'rb_operating_system_file_should_not_be_empty',
  'rb_operating_system_file_should_not_exist', 'rb_operating_system_get_binary_file', 'rb_operating_system_get_file',
  'rb_operating_system_get_file_size', 'rb_operating_system_get_modified_time', 'rb_operating_system_grep_file',
  'rb_operating_system_log_file', 'rb_operating_system_move_file', 'rb_operating_system_move_files',
  'rb_operating_system_remove_file', 'rb_operating_system_remove_files', 'rb_operating_system_set_modified_time',
  'rb_operating_system_touch', 'rb_operating_system_copy_directory', 'rb_operating_system_count_directories_in_directory',
  'rb_operating_system_count_files_in_directory', 'rb_operating_system_count_items_in_directory',
  'rb_operating_system_create_directory', 'rb_operating_system_directory_should_be_empty',
  'rb_operating_system_directory_should_exist', 'rb_operating_system_directory_should_not_be_empty',
  'rb_operating_system_directory_should_not_exist', 'rb_operating_system_empty_directory',
  'rb_operating_system_list_directories_in_directory', 'rb_operating_system_list_directory',
  'rb_operating_system_list_files_in_directory', 'rb_operating_system_move_directory', 'rb_operating_system_remove_directory',
  'rb_operating_system_join_path', 'rb_operating_system_join_paths', 'rb_operating_system_normalize_path',
  'rb_operating_system_split_extension', 'rb_operating_system_split_path', 'rb_operating_system_append_to_environment_variable',
  'rb_operating_system_environment_variable_should_be_set', 'rb_operating_system_environment_variable_should_not_be_set',
  'rb_operating_system_get_environment_variable', 'rb_operating_system_get_environment_variables',
  'rb_operating_system_log_environment_variables', 'rb_operating_system_remove_environment_variable',
  'rb_operating_system_set_environment_variable', 'rb_operating_system_run', 'rb_operating_system_run_and_return_rc',
  'rb_operating_system_run_and_return_rc_and_output', 'rb_operating_system_should_exist', 'rb_operating_system_should_not_exist',
  'rb_operating_system_wait_until_created', 'rb_operating_system_wait_until_removed'
]

export const TB_OperatingSystem_File = {
  kind: "category",
  name: "File Operations",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_operating_system_append_to_file",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Path"
            }
          }
        },
        content_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: "Content"
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_copy_file",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Source'
            }
          }
        }, 
        destination_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Destination'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_copy_files",
    },
    {
      kind: "block",
      type: "rb_operating_system_create_binary_file",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }, 
        content_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'image content'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_create_file",
      inputs:{
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }, 
        content_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'content'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_file_should_be_empty",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_file_should_exist",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_file_should_not_be_empty",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_file_should_not_exist",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_get_binary_file",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_get_file",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_get_file_size",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_get_modified_time",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_grep_file",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Path'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_log_file",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_move_file",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Source'
            }
          }
        }, 
        destination_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Destination'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_move_files",
      inputs:{
        sources_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'file_path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_remove_file",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_remove_files",
      inputs: {
        paths_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Paths'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_set_modified_time",
      inputs:{
        path_container:{
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Paths'
            }
          }
        },
        time_container:{
          shadow: {
            type: 'rb_cm_date'
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_touch",
      inputs:{
        path_container:{
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Paths'
            }
          }
        }
      }
    }
  ]
}

export const TB_OperatingSystem_Direct = {
  kind: "category",
  name: "Directory Operations",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_operating_system_copy_directory",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Source'
            }
          }
        }, 
        destination_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Destination'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_count_directories_in_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Pattern'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_count_files_in_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }, 
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_count_items_in_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }, 
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_create_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_directory_should_be_empty",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_directory_should_exist",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_directory_should_not_be_empty",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_directory_should_not_exist",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_empty_directory",
      inputs:{
        path_container:{
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Paths'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_list_directories_in_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }, 
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_list_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_list_files_in_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        },
        pattern_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Pattern'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_move_directory",
      inputs: {
        source_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Source'
            }
          }
        }, 
        destination_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Destination'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_remove_directory",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Paths'
            }
          }
        }
      }
    }

  ]
}

export const TB_OperatingSystem_Path = {
  kind: "category",
  name: "Path Operations",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_operating_system_join_path",
      inputs: {
        base_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Base_path'
            }
          }
        }, 
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_join_paths",
      inputs: {
        base_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Base_path'
            }
          }
        }, 
        paths_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Paths'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_normalize_path",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_split_extension",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        },
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_split_path",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        },
      }
    }
  ]
}

export const TB_OperatingSystem_Environment = {
  kind: "category",
  name: "Environment Variable Operations",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_operating_system_append_to_environment_variable",
      inputs: {
        values_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Name'
            }
          }
        },
        config_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Value'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_environment_variable_should_be_set",
      inputs: {
        name_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Name'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_environment_variable_should_not_be_set",
      inputs: {
        variable_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Name'
            }
          }
        },
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_get_environment_variable",
      inputs: {
        variable_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Name'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_get_environment_variables",
    },
    {
      kind: "block",
      type: "rb_operating_system_log_environment_variables",
    },
    {
      kind: "block",
      type: "rb_operating_system_remove_environment_variable",
      inputs: {
        variable_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Name'
            }
          }
        }, 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_set_environment_variable",
      inputs: {
        name_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Name'
            }
          }
        }, 
        value_container: {
          shadow: {
            type: 'rb_cm_content',
            fields: {
              CONTENT: 'Value'
            }
          }
        }
      }
    }

  ]
}

export const TB_OperatingSystem_ProcessExecut = {
  kind: "category",
  name: "Process Execution",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_operating_system_run",
      inputs: {
        command_container: {
          shadow: {
            type: 'rb_cm_Content',
            fields: {
              CONTENT: 'Command'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_run_and_return_rc",
      inputs: {
        command_container: {
          shadow: {
            type: 'rb_cm_Content',
            fields: {
              CONTENT: 'Command'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_run_and_return_rc_and_output",
      inputs: {
        command_container: {
          shadow: {
            type: 'rb_cm_Content',
            fields: {
              CONTENT: 'Command'
            }
          }
        } 
      }
    }
  ]
}

export const TB_OperatingSystem_ExistenceCheck = {
  kind: "category",
  name: "Existence Checking",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_operating_system_should_exist",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        } 
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_should_not_exist",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        },
      }
    }
  ]
}

export const TB_OperatingSystem_WaitOperat = {
  kind: "category",
  name: "Waiting Operations",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_operating_system_wait_until_created",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        }, 
        timeout_container: {
          shadow: {
            type: 'rb_cm_time_string',
            fields: {
              time_value: '15',
              time_type: 's'
            }
          }
        }
      }
    },
    {
      kind: "block",
      type: "rb_operating_system_wait_until_removed",
      inputs: {
        path_container: {
          shadow: {
            type: 'rb_cm_variable',
            fields: {
              variable_type: '$',
              variable: 'Path'
            }
          }
        },
        timeout_container: {
          shadow: {
            type: 'rb_cm_time_string',
            fields: {
              time_value: '15',
              time_type: 's'
            }
          }
        } 
      }
    }
  ]
}