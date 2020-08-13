import React, { Component } from 'react';
import { Radio, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import './my-checkbox.scss';
interface IMyCheckBox {
    checked?: boolean;
    onChange: any;
    value?: string;
    name?: string;
    inputProps?: object;
    label: string;
    disabled?: boolean;
    className?: string;
}
export default class MyCheckBox extends Component<IMyCheckBox> {
    render() {
        const { checked, onChange, value, name, inputProps } = this.props;
        return (
            <div>
                <FormControlLabel
                    className={this.props.className}
                    label=''
                    disabled={this.props.disabled}
                    control={
                        <div>
                            <Typography className="label-text" variant='caption'>
                                <Checkbox
                                    checked={checked}
                                    onChange={onChange}
                                />
                                <b>{this.props.label}</b>
                            </Typography>
                        </div>
                    }
                />
            </div>
        )
    }
}