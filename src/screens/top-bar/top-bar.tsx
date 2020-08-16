import React, { Component } from 'react';
//import * as reactBootStrap from 'react-bootstrap';
import './top-bar.scss';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppBar, Toolbar, IconButton, Typography, Badge, Button, } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AuthorizedService from '../../service/authorized.service';
import history from '../../navigation/App.history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgressBar from '../../shared/components/my-progressbar';
import { onLoading } from '../../redux/actionCreator/actionCreator';
import { Link } from 'react-router-dom';
import { APP_ROUTER } from '../../constants/router.constants';
import {getAvatar} from '../../redux/actionCreator/actionCreator';

interface ITopBar {
    logged?: boolean;
    onClickMenu: Function;
    onLoading?: any;
    isLoading?: boolean;
    avatar?: string,
    getAvatar?: any
}
class TopBarComponent extends Component<ITopBar, {}> {

    clickMenu = () => {
        this.props.onClickMenu();
    }

    render() {
        const logged = this.props.logged;
        return (
            <AppBar position="static">
                <Toolbar className='toolbar'>
                    <div className='content'>
                        {logged ?
                            <IconButton onClick={this.clickMenu} edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton> : null}
                        <Typography variant="h6" className='title' >
                            Navilearn
                        </Typography>
                    </div>
                    {/* {logged ? <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> : null} */}
                    {/* { !logged ? <Button onClick={()=>history.push('/')} color='inherit'>Đăng nhập</Button> : <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                {/* <AccountCircle /> */}
                    {/* </IconButton>} */}

                </Toolbar>
                {this.props.isLoading ? <ProgressBar /> : ''}

            </AppBar>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        logged: state.data.logged,
        isLoading: state.data.isLoading,
        avatar: state.data.avatar,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = {};
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBarComponent);
