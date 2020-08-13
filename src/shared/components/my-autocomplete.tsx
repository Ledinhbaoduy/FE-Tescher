import React, { Component, createRef } from "react"
import { Select, MenuItem, InputLabel, FormControl, TextField } from "@material-ui/core"
import { Dropdown } from "../../models/common.model"
import { Autocomplete } from "@material-ui/lab";

interface IMySelect {
    value: any;
    onChange: any;
    items: Dropdown[],
    defaultValue?: string;
    label: string;
    labelWidth?: number;
    multiline?: boolean;
    multiple?: boolean;
    placeHolder?: string;
    fullWidth?: boolean;
    className?: string;
}
export default class MyAutocomplete extends Component<IMySelect> {

    private inputLabel = createRef<HTMLDivElement>();

    private onChange = (value: Dropdown[]) => {
        const data = value.map(s => s.id);
        this.props.onChange(data);
    }
    render() {
        const { label, placeHolder, items, value, multiple, className } = this.props;
        return (
            <Autocomplete
                className={className}
                multiple={multiple}
                value={value}
                options={items}
                getOptionLabel={(option) => option.value}
                onChange={(e, value) => this.onChange(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={label}
                        placeholder={placeHolder}
                    />
                )}
            />

        )
    }
}