import React, { Component } from 'react';
import { MyInput } from '../../shared/components/my-input/my-input';
import MyButton from '../../shared/components/my-button/my-button';
import './login.scss';
import { LoginService } from '../../service/login.service';
import { Typography } from '@material-ui/core';
import MyCheckBox from '../../shared/components/my-checkbox/my-checkbox';
import MyPaper from '../../shared/components/my-pager';
import AuthorizedService from '../../service/authorized.service';
import history from '../../navigation/App.history';
import { APP_ROUTER } from '../../constants/router.constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onLogin, onLoading } from '../../redux/actionCreator/actionCreator';
import { showSnackbar } from '../../redux/actionCreator/actionCreator';
import { MESSAGE_LOGIN } from '../../constants/message.constants';
import { VARIANT_TYPE } from '../../models/common.model';

interface ILoginState {
    email: string;
    mat_khau: string;
    show_alert: string;
    // showPassword: boolean;
}
interface ILoginProps {
    onLogin: any;
    logged?: boolean;
    onLoading?: any;
    showSnackbar: any;
}

class LoginScreen extends Component<ILoginProps, ILoginState>{

    private loginService = new LoginService();
    private authService = new AuthorizedService();
    constructor(props: ILoginProps) {
        super(props)
        this.state = {
            email: "thi12171999@gmail.com",
            mat_khau: "Test123",
            show_alert: 'none',
            // showPassword: false,
        }
    }

    componentDidMount() {
        //if (this.props.logged) { history.push(APP_ROUTER.CLASS.ALL_BY_TEACHER); }
        //console.log(this.props.logged);
        document.title = 'Đăng nhập';
    }

    validateForm = () => {
        if (!this.state.email || !this.state.mat_khau) {
            this.props.showSnackbar({
                message: "Bạn Chưa Nhập Email Và Mật Khẩu",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        else if (!this.state.email) {
            this.props.showSnackbar({
                message: "Bạn Chưa Nhập Email",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        else if (!this.state.email.includes('@')) {
            this.props.showSnackbar({
                message: "Email Nhập Không Hợp Lệ",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        else if (!this.state.mat_khau) {
            this.props.showSnackbar({
                message: "Bạn chưa nhập mật khẩu",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        return true;
    }

    onLogin = () => {
        this.props.onLoading(true);
        const validate = this.validateForm();
        if (validate) {
            this.loginService.login(this.state).subscribe(res => {
                if (res && res.success) {
                    
                    this.authService.setUserInfo(res);
                    history.push(APP_ROUTER.CLASS.ALL_BY_TEACHER);
                    this.props.onLogin(true);
                }
                else {
                    this.props.showSnackbar({
                        message: MESSAGE_LOGIN.LOGIN_FAILURE,
                        variant: VARIANT_TYPE.ERROR,
                        open: true,
                    })
                }
                this.props.onLoading(false);
            });
        }

    }

    rememberMe = () => {

    }

    onClickRememberMe = () => {

    }

    oncResetPassword = () => {
        history.push(APP_ROUTER.LOGIN.FORGOT_PASSWORD)
    }


    render() {
        return (
            <div className="login-container">
                <MyPaper className="login-paper" >
                    <div className="login-content">
                        <Typography className='login-title' variant='h4' align='center'>Welcome</Typography>
                        <div className="login-input">
                            <MyInput className="login-input" label='Tên tài khoản*' value={this.state.email}
                                onChange={(value: string) => this.setState({ email: value })}
                                variant="outlined"
                            />
                        </div>
                        <div className="login-input">
                            <MyInput className="login-input" label="Mật Khẩu*" value={this.state.mat_khau} type='password'
                                onChange={(value: string) => this.setState({ mat_khau: value })}
                                variant="outlined" />
                        </div>
                        <div className='login-rememberMe'>
                            {/* <MyCheckBox className='login-rememberMe' label='Nhớ đăng nhập của tôi' onChange={this.onClickRememberMe} /> */}
                            <div className="signUpText" onClick={this.oncResetPassword}>
                                <Typography variant='caption' align='right'><b>Quên mật khẩu?</b></Typography>
                            </div>
                        </div>
                        <div className="btn-login">
                            <MyButton className="btn-login" onClick={this.onLogin} label="Đăng nhập" />
                        </div>
                    </div>
                </MyPaper>

            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        logged: state.data.logged,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { onLogin, onLoading, showSnackbar };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);