import React, { Component } from 'react';
import MyPaper from '../../shared/components/my-pager';
import { MyInput } from '../../shared/components/my-input/my-input';
import MyButton from '../../shared/components/my-button/my-button';
import { Typography } from '@material-ui/core';
import forgotService from '../../service/private/forgot-password.service';
import './forgot-password.scss';
import { RouteComponentProps } from 'react-router-dom';
import history from '../../navigation/App.history';
import { Alert } from '@material-ui/lab';
import {LOCALHOST, prod} from '../../constants/config.constants';
interface ChangeProps extends RouteComponentProps<{code :string}>{
}
export default class forgotPassword extends Component<ChangeProps, { email:string, newpass: string, renewpass: string, msg:any, error: boolean }>{
    private forgot = new forgotService();
    constructor(props: ChangeProps) {
        
        super(props)
        this.state = {
            email: '',
            newpass: '',
            renewpass: '',
            msg: <Alert></Alert>,
            error: false,
        }
    }

    componentDidMount(){
        this.forgot.checkCode(this.props.match.params.code).subscribe(res => {
            if(!res.success){
                history.push('/login');
            }
            else{
                this.setState({email: res.email})
            }
        })
    }

    onClick = () => {
        if(this.state.newpass !== this.state.renewpass){
            this.setState({error: true, msg: <Alert severity='error'>Mật khẩu nhập lại không trùng khớp</Alert>})
        }
        else if(this.state.newpass.indexOf(' ') >=0 || this.state.renewpass.indexOf(' ')>=0){
            this.setState({error: true, msg: <Alert severity='error'>Mật khẩu không hợp lệ</Alert>})
        }
        else if(this.state.newpass.length <6 || this.state.newpass.length>24){
            this.setState({error: true, msg: <Alert severity='error'>Mật khẩu phải từ 6-24 ký tự</Alert>})
        }
        else{
            this.forgot.changePassword(this.state.email, this.state.newpass).subscribe(res => {
                this.forgot.deleteCode(this.props.match.params.code).subscribe(res => {
                    this.setState({error: true, msg: <Alert severity='success'>Mật khẩu đã được đổi thành công.  <a href={LOCALHOST}>ĐĂNG NHẬP</a></Alert>})
                })
            })
        }

    }
    render() {
        return (
            <div className='forgot-password-container'>
                <MyPaper className="page">
                    <div className='forgot-password-content'>
                        <Typography className='forgot-password' component='h6'>
                            Đổi mật khẩu
                    </Typography>
                    {this.state.error ? this.state.msg : ''}
                        <MyInput
                            className='input-password'
                            label="Nhập mật khẩu mới"
                            onChange={(value: string) => this.setState({ newpass: value })}
                            variant="outlined"
                            value={this.state.newpass}
                            type='password'
                            fullWidth
                        />
                        <MyInput
                            className='input-password'
                            label="Nhập lại mật khẩu mới"
                            onChange={(value: string) => this.setState({ renewpass: value })}
                            variant="outlined"
                            value={this.state.renewpass}
                            type='password'
                            fullWidth
                        />
                        <div className='button-forgot-password'>
                            <MyButton
                                className="btn-send"
                                label="Đổi mật khẩu"
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