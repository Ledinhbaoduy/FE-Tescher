import React, { Component } from 'react';
import { Avatar, Typography } from '@material-ui/core';
import 'fontsource-roboto';
import './avatar-user.scss';
import { APP_ROUTER } from '../../../constants/router.constants';
import MyButton from '../my-button/my-button';
import { UserInformation } from '../../../models/user.model';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StringHelper } from '../../../helper/string.helper';
import { onLoading, getAvatar } from '../../../redux/actionCreator/actionCreator';
import AuthorizedService from '../../../service/authorized.service';

class AvatarUserComponent extends Component<{ userInfo?: UserInformation, onClick: any, onLoading: any, avatar?:string, getAvatar?:any }> {
    private authorize = new AuthorizedService();
    onClickProfile = () => {
        this.props.onClick(APP_ROUTER.USER.PROFILE);
    }

    render() {
        const fullName = this.props.userInfo ? this.props.userInfo.fullName : '...';
        const shortName = StringHelper.getShortName(fullName);
        
        return (
            <div className='avatar-container'>
                <div className='content'>
                    <Avatar src={this.props.avatar} />
                    <div className='user-info'>
                        <Typography className="user-name" component="h6">
                            {fullName}
                        </Typography>
                        <div className='button-profile'>
                            <MyButton label="trang cá nhân" color="primary" variant="text" onClick={this.onClickProfile} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        userInfo: state.data.userInfo,
        avatar: state.data.avatar,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = { onLoading, getAvatar };
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUserComponent);