import React, { Component } from 'react';
import { Box, Typography } from '@material-ui/core';
import { MyInput } from '../../../shared/components/my-input/my-input';
import MyButton from '../../../shared/components/my-button/my-button';
import { profileService } from '../../../service/profile.service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSnackbar } from '../../../redux/actionCreator/actionCreator';
import { MESSAGE_CHANEPASSWORD } from '../../../constants/message.constants';
import { VARIANT_TYPE } from '../../../models/common.model';

interface IPasswordTab {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    error: boolean;
    errorText: string;
}
class PassWordTab extends Component<{ showSnackbar: any }, IPasswordTab> {

    profileService = new profileService();

    constructor(props: any) {
        super(props)
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            error: false,
            errorText: '',
        }
    }

    onVerifyPassword = (value: string) => {
        let re: any;
        if (value !== "") {
            let error = false;
            let errorText = '';
            if (value.length < 6 || value.length > 24) {
                errorText = "Lỗi: Mật khẩu phải từ 6 - 24 ký tự!";
                error = true;
            }
            re = /[0-9]/;
            if (!re.test(value)) {
                error = true;
                errorText = "Lỗi: mật khẩu phải có ít nhất một chữ số (0-9)!";
            }
            re = /[a-z]/;
            if (!re.test(value)) {
                error = true;
                errorText = "Lỗi: mật khẩu phải có ít nhất một chữ cái viết thường (a-z)!";
            }
            re = /[A-Z]/;
            if (!re.test(value)) {
                error = true;
                errorText = "Lỗi: mật khẩu phải có ít nhất một chữ cái viết hoa (A-Z)!";
            }
            this.setState({ newPassword: value, error, errorText });
        }
    }

    onConfirmPassword = (value: string) => {
        const error = value !== this.state.newPassword;
        this.setState({
            confirmPassword: value,
            error,
            errorText: 'Mật Khẩu không khớp',
        });
    }

    onSubmit = () => {
        if (this.state.error) {
            return;
        }
        const body = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
        }
        this.profileService.chanePassword(body).subscribe(res => {
            if (res && res.success) {
                this.props.showSnackbar({
                    message: MESSAGE_CHANEPASSWORD.SUCCESS,
                    variant: VARIANT_TYPE.SUCCESS,
                    open: true,
                })
                this.setState({ oldPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                this.props.showSnackbar({
                    message: MESSAGE_CHANEPASSWORD.ERROR,
                    variant: VARIANT_TYPE.ERROR,
                    open: true,
                })
                this.setState({ oldPassword: "", newPassword: "", confirmPassword: "" })
            }
        })
    }

    render() {
        return (
            <Box className="infor-container" >
                <Typography variant='h6'>Thay Đổi Mật Khẩu</Typography>
                <div className="infor-content">
                    <MyInput
                        value={this.state.oldPassword}
                        variant='outlined'
                        label="Mật Khẩu Hiện Tại"
                        onChange={(value: string) => this.setState({ oldPassword: value })}
                        fullWidth
                        type="password"
                    />
                    <MyInput
                        value={this.state.newPassword}
                        variant='outlined'
                        label="Mật Khẩu mới"
                        onChange={this.onVerifyPassword}
                        fullWidth
                        type="password"
                    />
                    <MyInput
                        value={this.state.confirmPassword}
                        variant='outlined'
                        label="Nhập Mật Khẩu mới"
                        onChange={this.onConfirmPassword}
                        fullWidth
                        type="password"
                    />
                    {this.state.error ? <div className="error">
                        {this.state.errorText}
                    </div> : null}
                </div>
                <div className='button-update'>
                    <MyButton
                        label='Cập Nhật'
                        onClick={this.onSubmit}
                    />
                </div>
            </Box>

        )
    }
}
const mapStateToProps = (state: any) => {
    return {

    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = { showSnackbar };
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(PassWordTab);