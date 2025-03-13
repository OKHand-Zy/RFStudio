export const TB_Screenshot = [
    {
        kind: "block",
        type: "rb_screenshot_set_screenshot_directory",
        inputs: {
            path_container: {
                shadow: {
                    type: 'rb_cm_content',
                    fields: {
                        CONTENT: "Save_Diractory_Path"
                    }
                }
            },
        }
    },
    {
        kind: "block",
        type: "rb_screenshot_take_screenshot",
    },
    {
        kind: "block",
        type: "rb_screenshot_take_screenshot",
    },
    {
        kind: "block",
        type: "rb_screenshot_take_screenshot_without_embedding",
    }
]