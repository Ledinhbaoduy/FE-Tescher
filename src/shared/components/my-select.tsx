import React, { Component, createRef } from "react"
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core"
import { Dropdown } from "../../models/common.model"

interface IMySelect {
    value: any;
    onChange: any;
    items: Dropdown[],
    defaultValue?: string;
    label: string;
    labelWidth?: number;
    renderValue?: any;
    multiline?: boolean;
    multiple?: boolean;
    variant?: 'outlined' | 'filled' | 'standard';
    disabled?: boolean;
}
export default class MySelect extends Component<IMySelect> {

    renderItem = () => (this.props.items.map((s, index) => (<MenuItem key={index} value={s.id} disabled={s.disabled}>{s.value}</MenuItem>)));

    private inputLabel = createRef<HTMLDivElement>();

    render() {
        const { labelWidth } = this.props;
        const _labelWidth = this.inputLabel.current?.offsetWidth || (labelWidth ? labelWidth : 150);
        return (
            <FormControl style={{ minWidth: 210 }
            } ref={this.inputLabel} variant='outlined' >
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    label={this.props.label}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e.target.value)}
                    variant={this.props.variant as any}
                    defaultValue={this.props.defaultValue}
                    labelWidth={_labelWidth}
                    renderValue={this.props.renderValue}
                    multiline={this.props.multiline ? true : false}
                    multiple={this.props.multiple}
                    disabled={this.props.disabled}
                >
                    {this.renderItem()}
                </Select>
            </FormControl>

        )
    }
}