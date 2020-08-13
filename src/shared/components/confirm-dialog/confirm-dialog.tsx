import React, { Component } from 'react';
import MyDialog from '../../components/my-dialog/my-dialog';
import { Typography, DialogActions } from '@material-ui/core';
import MyButton from '../my-button/my-button';

interface IDialogProps {
    openDialog: boolean;
    onClose: any;
    onSubmit: any;
    content: string;
    title: string;
    maxWidth?: 'lg'
    | 'md'
    | 'sm'
    | 'xl'
    | 'xs'
    | false;
    className?: string;
}

export default class ConfirmDialog extends Component<IDialogProps> {
    render() {
        return (
            <MyDialog
                className={this.props.className}
                title={this.props.title}
                open={this.props.openDialog}
                onClose={this.props.onClose}
                maxWidth="xl"
                fullWidth={false}
            >
                <Typography>
                    {this.props.content}
                </Typography>
                <DialogActions>
                    <MyButton label="Xác Nhận" onClick={this.props.onSubmit} variant="text"/>
                    <MyButton label="Hủy" color="secondary" onClick={this.props.onClose} variant="text" />
                </DialogActions>
            </MyDialog>
        )
    }
}