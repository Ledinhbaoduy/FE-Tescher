import React, { Component } from 'react';
import { Avatar, Typography, Divider, ListItem, ListItemIcon, ListItemText, IconButton, createStyles, makeStyles, withStyles, Theme, LinearProgress, CircularProgress } from '@material-ui/core';
import { MENU_PROFILE } from '../../../constants/master-data.constants';
import '../profile.scss'
import CameraEnhanceOutlinedIcon from '@material-ui/icons/CameraEnhanceOutlined';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserInformation } from '../../../models/user.model';
import { StringHelper } from '../../../helper/string.helper';
import Axios from 'axios';
import { styles } from '@material-ui/pickers/views/Clock/Clock';
import AuthorizedService from '../../../service/authorized.service';
import {getAvatar} from '../../../redux/actionCreator/actionCreator';

interface IMenuProfileProps {
    onClickMenu: Function,
    userInfo: UserInformation,
    classes?: any,
    getAvatar:any,
    avatar?: string,
}

interface IMenuProfileState {
    selectedFile: any;
    userInfo?: UserInformation;
    isLoading?: boolean;
    toggleHidden?: boolean;
    src: string,
}
class MenuProfile extends Component<IMenuProfileProps, IMenuProfileState> {
    private authorize = new AuthorizedService();
    constructor(props: any) {
        super(props);
        this.state = {
            selectedFile: null,
            isLoading: false,
            toggleHidden: true,
            src: this.authorize.getAvatar(),
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
        console.log(e.target.files[0]);
        var form = new FormData();
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        form.append('file', e.target.files[0], e.target.files[0].name)
        form.append('id', this.authorize.getIdUsers())
        this.setState({toggleHidden: false})
        Axios.post('http://anstudying.herokuapp.com/api/file/avatar/upload',form, config).then(res => {
            this.props.getAvatar(res.data.id)
        }).catch(err => {console.log(err); this.setState({toggleHidden: true})})
        this.setState({toggleHidden: false});
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
                    <div className='avatar-profile'>
                    <CircularProgress  hidden={this.state.toggleHidden} className='circular'/>
                    <img src={this.props.avatar}/>
                    </div>
                    <div className='menu-info'>
                        <input accept="image/*" className="btn-upload" id="icon-button-file" type="file"
                            onChange={this.onChange}
                        />
                        
                        <label htmlFor='icon-button-file'>
                        
                            <IconButton color="primary" aria-label="upload picture" component="span" >
                                <CameraEnhanceOutlinedIcon color='secondary' />
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
        avatar: state.data.avatar
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionCreator = {getAvatar};
    const action = bindActionCreators(actionCreator, dispatch);
    return { ...action };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuProfile); 