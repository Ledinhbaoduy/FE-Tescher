import React, { Component } from 'react'
import { Box } from '@material-ui/core'
import MyPaper from '../../shared/components/my-pager'
import MenuProfile from './Component/menu-profile'
import './profile.scss'
import PassWordTab from './Component/password-tab'
import InformationUser from '../profile/Component/information-tab';
import { TabPanel } from '../../shared/components/my-tab-panel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onLoading } from '../../redux/actionCreator/actionCreator';

interface IProfileState {
    tabIndex: number;
}
class ProfileUser extends Component<{onLoading : any}, IProfileState> {

    constructor(props: any) {
        super(props);
        this.state = {
            tabIndex: 0,
        }

    }

    onClickProfile = (index: number) => {
        this.setState({ tabIndex: index });
    }

    render() {
        document.title= 'Trang Cá nhân';
        return (
            <Box className="profile-container">
                <MyPaper className="menu-profile">
                    <MenuProfile onClickMenu={this.onClickProfile} />
                </MyPaper>
                <MyPaper className='information-user'>
                    <TabPanel value={this.state.tabIndex} index={0}>
                        <InformationUser />
                    </TabPanel>
                    <TabPanel value={this.state.tabIndex} index={1}>
                        <PassWordTab />
                    </TabPanel>
                </MyPaper>
            </Box >
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { onLoading };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);