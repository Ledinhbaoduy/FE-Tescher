import React, { Component } from 'react';
import { Avatar, Typography, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { MENU_PROFILE } from '../../../constants/master-data.constants';
import '../profile.scss'
import CameraEnhanceOutlinedIcon from '@material-ui/icons/CameraEnhanceOutlined';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserInformation } from '../../../models/user.model';
import { StringHelper } from '../../../helper/string.helper';

interface IMenuProfileState {
    selectedFile: any;
    userInfo?: UserInformation;
    isLoading?: boolean;
}
class MenuProfile extends Component<{ onClickMenu: Function, userInfo: UserInformation }, IMenuProfileState> {

    constructor(props: any) {
        super(props);
        this.state = {
            selectedFile: null,
            isLoading: false,
        }
    }

    componentWillReceiveProps = (props: any) => {
        if (props.userInfo !== this.props.userInfo) {
            this.setState({ userInfo: props.userInfo });
        }
    }

    onClickMenu = (i: number) => {
        this.props.onClickMenu();
    }

    onChange = (e: any) => {
        console.log(e.target.files[0].name);
    }

    renderMenuItem = () => {
        return MENU_PROFILE.map((data, index) => {
            return (
                <ListItem key={index} button onClick={() => this.props.onClickMenu(index)} color="inherit" className='list-item'>
                    <ListItemIcon>
                        {data.icon}
                    </ListItemIcon>
                    <ListItemText> {data.name}</ListItemText>
                </ListItem>

            )
        })
    }

    render() {
        const fullName = this.props.userInfo ? this.props.userInfo.fullName : '...';
        const shortName = StringHelper.getShortName(fullName);
        return (
            <div className='menu-container'>
                <div className='menu-content'>
                    <Avatar className="menu-avatar" alt="Remy Sharp">{shortName}</Avatar>
                    <div className='menu-info'>
                        <input accept="image/*" className="btn-upload" id="icon-button-file" type="file"
                            onChange={this.onChange}
                        />
                        <label htmlFor='icon-button-file'>

                            <IconButton color="primary" aria-label="upload picture" component="span" >
                                <CameraEnhanceOutlinedIcon />
                            </IconButton>
                        </label>
                        <Typography className="menu-username" component="h6">
                            {fullName}
                        </Typography>
                    </div>
                </div>
                <Divider />
                <div className="menu-item">
                    {this.renderMenuItem()}
                </div>

            </div>
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
    const actionCreator = {};
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuProfile);