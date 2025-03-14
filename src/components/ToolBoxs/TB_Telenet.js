export const Telnet_Block_List = [
  'rb_telnet_open_connection', 'rb_telnet_close_connection', 'rb_telnet_close_all_connections',
  'rb_telnet_switch_connection', 'rb_telnet_read', 'rb_telnet_read_until', 'rb_telnet_read_until_prompt',
  'rb_telnet_read_until_regexp', 'rb_telnet_write', 'rb_telnet_write_bare', 'rb_telnet_write_control_character',
  'rb_telnet_write_until_expected_output', 'rb_telnet_set_timeout', 'rb_telnet_set_prompt', 
  'rb_telnet_set_encoding', 'rb_telnet_set_newline', 'rb_telnet_set_default_log_level', 
  'rb_telnet_set_telnetlib_log_level', 'rb_telnet_execute_command', 'rb_telnet_login'
]

export const TB_Telnet_Connection = {
  kind: "category",
  name: "Connection",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_telnet_open_connection",
    },
    {
      kind: "block",
      type: "rb_telnet_close_connection",
    },
    {
      kind: "block",
      type: "rb_telnet_close_all_connections",
    },
    {
      kind: "block",
      type: "rb_telnet_switch_connection",
    }
  ]
}

export const TB_Telnet_OpRead = {
  kind: "category",
  name: "Reading",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_telnet_read",
    },
    {
      kind: "block",
      type: "rb_telnet_read_until",
    },
    {
      kind: "block",
      type: "rb_telnet_read_until_prompt",
    },
    {
      kind: "block",
      type: "rb_telnet_read_until_regexp",
    }
  ]
}

export const TB_Telnet_OpWrit = {
  kind: "category",
  name: "Writing",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_telnet_write",
    },
    {
      kind: "block",
      type: "rb_telnet_write_bare"
    },
    {
      kind: "block",
      type: "rb_telnet_write_control_character"
    },
    {
      kind: "block",
      type: "rb_telnet_write_until_expected_output"
    }
  ]
}

export const TB_Telnet_Setting = {
  kind: "category",
  name: "Config Setting",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_telnet_set_timeout"
    },
    {
      kind: "block",
      type: "rb_telnet_set_prompt"
    },
    {
      kind: "block",
      type: "rb_telnet_set_encoding"
    },
    {
      kind: "block",
      type: "rb_telnet_set_newline"
    },
    {
      kind: "block",
      type: "rb_telnet_set_default_log_level"
    },
    {
      kind: "block",
      type: "rb_telnet_set_telnetlib_log_level"
    }
  ]
}

export const TB_Telnet_Action = {
  kind: "category",
  name: "Other Action",
  colour: "#A65C81",
  contents: [
    {
      kind: "block",
      type: "rb_telnet_execute_command"
    },
    {
      kind: "block",
      type: "rb_telnet_login"
    }
  ]
}