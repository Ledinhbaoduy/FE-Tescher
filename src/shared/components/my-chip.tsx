import React, { Component } from 'react';
import { Chip } from '@material-ui/core';
interface IChipPorps {
    icon?: any;
    label: string;
    onClick: any;
    onDelete?: any;
    clickable?: any;
    variant?: 'default'
    | 'outlined';
    color?: 'default'
    | 'primary'
    | 'secondary';
    size?: 'medium'
    | 'small';
}
export default class chipComponent extends Component<IChipPorps> {
    render() {
        const { icon, label, onClick, onDelete, variant, color, size } = this.props
        return (
            <div>
                <Chip
                    icon={icon}
                    label={label}
                    onClick={onClick}
                    onDelete={onDelete}
                    variant={variant as any}
                    color = {color as any}
                    size = {size as any}
                />
            </div>
        )
    }
}