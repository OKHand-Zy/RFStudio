export const DateTime_Blocks_List = [
    'rbl_datetime_get_current_date', 'rbl_datetime_add_time_to_date', 'rbl_datetime_add_time_to_time',
    'rbl_datetime_convert_date', 'rbl_datetime_convert_time', 'rbl_datetime_subtract_date_from_date',
    'rbl_datetime_subtract_time_from_date', 'rbl_datetime_subtract_time_from_time'
]

export const TB_DateTime_Get = {
    kind: "category",
    name: "Get Date&Time",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rbl_datetime_get_current_date",
        }
    ]
}

export const TB_DateTime_add = {
    kind: "category",
    name: "Add Date&Time",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rbl_datetime_add_time_to_date"
        },
        {
            kind: "block",
            type: "rbl_datetime_add_time_to_time"
        }
    ]
}

export const TB_DateTime_convert = {
    kind: "category",
    name: "Convert Date&Time",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rbl_datetime_convert_date",
        },
        {
            kind: "block",
            type: "rbl_datetime_convert_time",
        }
    ]
}

export const TB_DateTime_subtract = {
    kind: "category",
    name: "Subtract Date&Time",
    colour: "#A65C81",
    contents: [
        {
            kind: "block",
            type: "rbl_datetime_subtract_date_from_date"
        },
        {
            kind: "block",
            type: "rbl_datetime_subtract_time_from_date"
        },
        {
            kind: "block",
            type: "rbl_datetime_subtract_time_from_time"
        }
    ]
}