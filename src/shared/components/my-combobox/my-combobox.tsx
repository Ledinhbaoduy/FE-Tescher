import React, { Component } from 'react';
import { Autocomplete } from '@material-ui/lab';
interface IMyComBoBox {
    id?: string;
    options: any;
    getOptionLabel: any;
    renderInput: any; 
    style: any;

}
export default class MyComBoBox extends Component<IMyComBoBox> {
    render() {
        const  {id, options,getOptionLabel, renderInput, style} = this.props
        return (
                <Autocomplete
                    id={id}
                    options={options}
                    getOptionLabel={getOptionLabel}
                    style={style}
                    renderInput={renderInput}
                />
        )
    }
}