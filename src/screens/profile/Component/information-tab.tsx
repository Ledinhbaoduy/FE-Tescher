import React, { Component } from 'react';
import { Typography, Box } from '@material-ui/core';
import { MyInput } from '../../../shared/components/my-input/my-input';
import MyButton from '../../../shared/components/my-button/my-button';
import '../profile.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserInformation } from '../../../models/user.model';
import MyPicker from '../../../shared/components/my-picker';
import { profileService } from '../../../service/profile.service';
import AuthorizedService from '../../../service/authorized.service';
import { showSnackbar } from '../../../redux/actionCreator/actionCreator';
import { MESSAGE_REQUEST_INFRO } from '../../../constants/message.constants';
import { VARIANT_TYPE, Dropdown } from '../../../models/common.model';
import MyRadioButtons from '../../../shared/components/my-radiobutton';
import { radioModel } from '../../../shared/models/shared.component.model';

const dataGender: radioModel[] = [
    { id: true, value: 'Nam' }, { id: false, value: 'Nữ' }
]
interface IProfileUser {
    ho: string;
    ten: string;
    mat_khau: string;
    email: string;
    ngay_sinh: Date;
    gioi_tinh: boolean;
    sdt: string;
    updatedAt: Date;
    ly_do: string;
    isLoading: boolean;
    onDisabled: boolean;
}

class InformationUser extends Component<{ userInfo?: UserInformation, showSnackbar: any }, IProfileUser> {
    profileService = new profileService();
    authorizedService = new AuthorizedService();
    constructor(props: any) {
        super(props)
        this.state = {
            ho: "",
            ten: "",
            mat_khau: "",
            email: "",
            ngay_sinh: new Date(),
            updatedAt: new Date(),
            ly_do: "",
            isLoading: false,
            gioi_tinh: false,
            sdt: "",
            onDisabled: false,

        }
    }

    componentDidMount() {
        if (this.props.userInfo) {
            this.setState(this.props.userInfo);
        }
    }
    componentWillReceiveProps = ({ userInfo }: any) => {
        if (this.props.userInfo !== userInfo) {
            this.setState(userInfo);
        }
    }
    onRadioGender = (event: any) => {
        const value = event.target.value === 'true';
        this.setState({ gioi_tinh: value });
    }

    validateForm = () => {
        if (!this.state.ly_do) {
            this.props.showSnackbar({
                message: MESSAGE_REQUEST_INFRO.ERROR_REQUEST,
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        else if (!this.state.ho) {
            this.props.showSnackbar({
                message: "Không Được Bỏ trống Họ ",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        else if (!this.state.ten) {
            this.props.showSnackbar({
                message: "Không Được Bỏ trống Tên",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        else if (!this.state.sdt) {
            this.props.showSnackbar({
                message: "Không Được Bỏ trống Số Điện Thoại",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }else if(this.state.sdt.length < 10 || this.state.sdt.length > 10){
            this.props.showSnackbar({
                message: "Số Điện Thoại chỉ nhập 10 số !",
                variant: VARIANT_TYPE.WARNING,
                open: true,
            })
            return false;
        }
        return true;
    }
    onClickProfile = () => {
        if (this.validateForm()) {
            this.profileService.changeInfoRequest(this.state).subscribe(res => {
                if (res && res.success) {
                    this.props.showSnackbar({
                        message: MESSAGE_REQUEST_INFRO.SUCCESS,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true,
                    })
                    this.setState({ ly_do: "", onDisabled: true });
                }
                else {
                    this.props.showSnackbar({
                        message: MESSAGE_REQUEST_INFRO.ERROR,
                        variant: VARIANT_TYPE.ERROR,
                        open: true,
                    })
                    this.setState({ ly_do: "" });
                }
            })
        }


    }

    render() {

        return (
            <Box className="infor-container" >
                <Typography variant='h6'>Thông Tin Cá Nhân</Typography>
                <div className="infor-content">
                    <div className="infor-select">
                        <MyInput
                            value={this.state.ho}
                            variant='outlined'
                            label="Họ"
                            onChange={(value: string) => this.setState({ ho: value })}
                            fullWidth
                        />
                        <MyInput
                            className="input-data"
                            value={this.state.ten}
                            variant='outlined'
                            label='Tên'
                            onChange={(value: string) => this.setState({ ten: value })}
                            fullWidth
                        />
                    </div>

                    <MyPicker
                        className="date"
                        value={this.state.ngay_sinh}
                        onChange={(value: Date) => this.setState({ ngay_sinh: value })}
                        label="Ngày Sinh"
                        type="date"
                        fullWidth
                        inputVariant="outlined"
                    />
                    <MyRadioButtons
                        className="gender"
                        label='Giới Tính'
                        value={this.state.gioi_tinh}
                        onChange={this.onRadioGender}
                        data={dataGender}
                    />
                    <MyInput
                        value={this.state.sdt}
                        variant='outlined'
                        label='Số Điện Thoại'
                        onChange={(value: string) => this.setState({ sdt: value })}
                        fullWidth
                        type='number'
                    />
                    <div className="infor-account">
                        <MyInput
                            className='E-mail'
                            value={this.state.email}
                            variant='outlined'
                            label='E-mail'
                            onChange={(value: string) => this.setState({ email: value })}
                            fullWidth
                            disabled={true}
                        />
                        <MyInput
                            className="input-data"
                            value={this.state.mat_khau}
                            variant='outlined'
                            label='Mật Khẩu'
                            onChange={(value: string) => this.setState({ mat_khau: value })}
                            fullWidth
                            type="password"
                            disabled={true}
                        />
                    </div>

                    <MyInput
                        className="reason-info"
                        value={this.state.ly_do}
                        variant='outlined'
                        label='Lý Do Thay Đổi Thông Tin'
                        onChange={(value: string) => this.setState({ ly_do: value })}
                        fullWidth
                    />
                </div>
                <div className='button-update'>
                    <MyButton
                        label='Cập Nhật'
                        onClick={this.onClickProfile}
                        disabled={this.state.onDisabled}
                    />
                </div>
            </Box>

        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        userInfo: state.data.userInfo,
        isLoading: state.data.isLoading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = { showSnackbar };
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(InformationUser);