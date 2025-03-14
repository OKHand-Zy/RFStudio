export const TB_Proess_Creation_Management = {
    kind: "category",
    name: "Creation and Management",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rb_process_start_process"
        },
        {
            kind: "block",
            type: "rb_process_run_process"
        },
        {
            kind: "block",
            type: "rb_process_terminate_process"
        },
        {
            kind: "block",
            type: "rb_process_terminate_all_processes"
        },
        {
            kind: "block",
            type: "rb_process_wait_for_process"
        },
        {
            kind: "block",
            type: "rb_process_switch_process"
        },
        {
            kind: "block",
            type: "rb_process_send_signal_to_process"
        }
    ]
}

export const TB_Proess_Status_Verification = {
    kind: "category",
    name: "Status and Verification",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rb_process_verification_is_process_running"
        },
        {
            kind: "block",
            type: "rb_process_verification_process_should_be_running"
        },
        {
            kind: "block",
            type: "rb_process_verification_process_should_be_stopped"
        },
        {
            kind: "block",
            type: "rb_process_verification_get_process_result"
        }
    ]
}

export const TB_Proess_Information = {
    kind: "category",
    name: "Information",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rb_process_information_get_process_id",
        },
        {
            kind: "block",
            type: "rb_process_information_get_process_object",
        }
    ]
}

export const TB_Proess_CommandLine = {
    kind: "category",
    name: "Command Line",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rb_command_line_join_command_line",
        },
        {
            kind: "block",
            type: "rb_command_line_split_command_line",
        } 
    ]
}