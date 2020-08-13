import { TextField } from "@material-ui/core";
import React, { Component } from 'react';
interface IMyInput {
    className?: string;
    id?: string;
    label: string;
    onChange: any;
    variant?: 'filled'
    | 'outlined'
    | 'standard',
    disabled?: boolean,
    placeHolder?: string;
    value?: any;
    fullWidth?: any;
    margin?: any;
    rowsMax?: number;
    type?: 'password' | 'number' | 'date' | 'time' | 'datetime-local'| 'minute' | 'file';
    multiline?: boolean;
    defaultValue?: any;
    InputLabelProps?: object;
    inputRef?: any;
    key?:any

}

export class MyInput extends Component<IMyInput> {
    render() {
        const {
            label,
            variant,
            onChange,
            disabled,
            placeHolder,
            value,
            rowsMax,
            multiline,
            defaultValue,
            InputLabelProps, } = this.props;
        return (

            <TextField 
                className={this.props.className}
                disabled={disabled ? true : false}
                label={label}
                variant={variant as any}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeHolder}
                value={value}
                margin='normal'
                multiline={multiline ? true : false}
                type={this.props.type}
                rowsMax={rowsMax}
                fullWidth={this.props.fullWidth}
                defaultValue={defaultValue}
                InputLabelProps={InputLabelProps}
                inputRef={this.props.inputRef}
            />
        )
    }
}