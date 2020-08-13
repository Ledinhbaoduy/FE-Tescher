import React, { Component } from 'react';
import { Tooltip, Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

interface ITooltip {
    className?: string;
    onClick: any;
    title: string;
    color?: 'inherit' | 'primary' | 'default' | 'secondary';
}

export default class MyTooltipComponent extends Component<ITooltip> {
    render() {
        return (
            <IconButton onClick={this.props.onClick}>
                <Tooltip title={this.props.title}>
                    <Fab
                        color={this.props.color ? this.props.color : 'primary'}
                        className={this.props.className}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </IconButton>
        )
    }
}