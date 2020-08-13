import React, { Component } from 'react'
import { Button } from '@material-ui/core'

interface IMyButton {
    startIcon?: any;
    color?: 'inherit' | 'primary' | 'default' | 'secondary';
    variant?: 'contained' | 'outlined' | 'text';
    label: string
    onClick: any;
    className?: string;
    disabled?: boolean;
}
export default class MyButton extends Component<IMyButton> {
    render() {
        const { startIcon, color, variant, label, onClick, disabled } = this.props;
        return (
            <Button
                className={this.props.className}
                variant={variant ? variant : 'contained'}
                color={color ? color : 'primary'}
                startIcon={startIcon}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </Button>
        )
    }
}