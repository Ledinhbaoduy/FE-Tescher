import React, { Component } from 'react';
import MyDialog from '../../../shared/components/my-dialog/my-dialog';
import { MyInput } from '../../../shared/components/my-input/my-input';
import MyButton from '../../../shared/components/my-button/my-button';
import { DialogActions } from '@material-ui/core';

interface IDialogProps {
    openDialog: boolean,
    toggleDialog: any,
}
export default class reasonUpdate extends Component<IDialogProps, {}>{
    render() {
        return (
            <MyDialog
                title='Lý Do Cập Nhật Thông Tin'
                open={this.props.openDialog}
                onClose={this.props.toggleDialog}
            >
                <div className='reason-content'>
                    <MyInput
                        label="Lý Do"
                        onChange={() => null}
                        variant="outlined"
                    />
                </div>
                <DialogActions>
                    <MyButton
                        label="Cập Nhật"
                        color="primary"
                        onClick={() => null}
                    />
                </DialogActions>
            </MyDialog>
        )
    }
}