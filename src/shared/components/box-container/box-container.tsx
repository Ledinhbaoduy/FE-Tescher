import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import './box-container.scss'
export default class BoxContainer extends Component<{ header?: string }> {
    render() {
        return (
            <div className='box-container'>
                <Typography className='header' variant='h5'>{this.props.header}</Typography>
                <div className='content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}