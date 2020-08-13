import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './my-dialog.scss'
import { red } from '@material-ui/core/colors';
interface IMyDialog {
    open: boolean,
    title: string,
    actions?: any,
    onClose: any,
    fullWidth?: any,
    maxWidth?: 'lg'
    | 'md'
    | 'sm'
    | 'xl'
    | 'xs'
    | false,
    className?: string;


}

export default class MyDialog extends Component<IMyDialog> {
    onClose = () => {
        this.props.onClose();
    }

    render() {
        const { open, title, children, onClose, fullWidth, maxWidth, className } = this.props;
        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth ? maxWidth : "sm"}
                className={className} >
                <DialogTitle className="title-dialog">
                    {title}
                    <IconButton className="icon-close" onClick={this.onClose}><CloseIcon style={{ color: red[500] }} /></IconButton>
                </DialogTitle>
                <DialogContent className="content-dialog">
                    {children}
                </DialogContent>
            </Dialog>


        );
    }
}