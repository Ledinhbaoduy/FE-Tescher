import React, { Component } from 'react';
import MyPaper from '../../shared/components/my-pager';
import { MyInput } from '../../shared/components/my-input/my-input';
import MyButton from '../../shared/components/my-button/my-button';
import { Typography } from '@material-ui/core';
import ForgotService from '../../service/private/forgot-password.service';
import './forgot-password.scss';
import { Alert } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import history from '../../navigation/App.history';
import { APP_ROUTER } from '../../constants/router.constants';
import { showSnackbar } from '../../redux/actionCreator/actionCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VARIANT_TYPE } from '../../constants/common.constants';
class forgotPassword extends Component<{ showSnackbar: any }, { email: string, msg: any, error: boolean }>{
    private forgotService = new ForgotService();
    constructor(props: any) {
        super(props)
        this.state = {
            email: "",
            msg: <Alert></Alert>,
            error: false,
        }
    }

    onClick = () => {
        this.forgotService.sendRequest(this.state.email).subscribe(res => {
            if (res.success) {
                history.goBack();
                this.props.showSnackbar({
                    message: 'Yêu cầu đã được gửi đi',
                    variant: VARIANT_TYPE.SUCCESS,
                    open: true
                })
            }
            else {
                this.props.showSnackbar({
                    message: 'Email không hợp lệ',
                    variant: VARIANT_TYPE.ERROR,
                    open: true
                })
            }
        })
    }
    render() {
        document.title='Quên Mật Khẩu';
        return (
            <div className='forgot-password-container'>
                <MyPaper className="page">
                    <div className='forgot-password-content'>
                        <Typography className='forgot-password' component='h6'>
                            Quên mật khẩu?
                    </Typography>
                        {this.state.error ? this.state.msg : ''}
                        <MyInput
                            className='input-email'
                            label="Nhập địa chỉ email của bạn"
                            onChange={(value: string) => this.setState({ email: value })}
                            variant="outlined"
                            value={this.state.email}
                            fullWidth
                        />
                        <div className='button-forgot-password'>
                            <MyButton
                                className="btn-send"
                                label="Gửi"
                                onClick={this.onClick}
                                variant="outlined"
                                color="primary"
                            />
                        </div>
                    </div>
                </MyPaper>
            </div>

        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        listTopic: state.data.listTopic
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { showSnackbar };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(forgotPassword);