import React, { Component } from 'react';
import { List, ListItem, Drawer, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import AvatarUserComponent from '../avatar-user/avatar-user';
import { MENU_DATA } from '../../../constants/master-data.constants';
import { onLogin } from '../../../redux/actionCreator/actionCreator';
import history from '../../../navigation/App.history';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APP_ROUTER } from '../../../constants/router.constants';
import { LOCAL_STORAGE } from '../../../constants/common.constants';
import { green } from '@material-ui/core/colors';

export class AppMenu extends Component<{ isOpen: boolean, closeDrawer: any, onLogin: any }> {

    onClickMenu = (routing: any) => {
        history.push(routing);
        this.props.closeDrawer();
    }

    onLogout = () => {
        localStorage.setItem(LOCAL_STORAGE.USER_INFO, '');
        history.push(APP_ROUTER.LOGIN.HOME);
        this.props.onLogin(false);
        this.props.closeDrawer();
    }

    renderMenuItem = () => {
        return MENU_DATA.map((data, index) => {
            return (
                <ListItem key={index} button onClick={() => this.onClickMenu(data.routing)} color="inherit">
                    <ListItemIcon>
                        {data.icon}
                    </ListItemIcon>
                    <ListItemText> {data.name}</ListItemText>
                </ListItem>

            )
        })
    }
    render() {
        return (
            <div className='app-menu'>

                <Drawer className="Drawer-menu"
                    variant="temporary"
                    anchor={'left'}
                    open={this.props.isOpen}
                    onClose={this.props.closeDrawer}
                >
                    <List className="list-menu">
                        <AvatarUserComponent onClick={this.onClickMenu}/>
                        <Divider />
                        {this.renderMenuItem()}
                        <ListItem key={5} button onClick={this.onLogout} color="inherit">
                            <ListItemIcon>
                                <ExitToAppIcon style={{ color: green[500] }} />
                            </ListItemIcon>
                            <ListItemText> {'Đăng xuất'}</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
            </div>


        )
    }
}

const mapStateToProps = (state: any) => {
    return {};
}
const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = { onLogin };
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);