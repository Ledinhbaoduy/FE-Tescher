
import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import LoginScreen from '../screens/login/login';
import { TeacherScreen } from '../screens/teacher-screen/teacher-screen';
import { APP_ROUTER } from '../constants/router.constants';
import ManageQuestionScreen from '../screens/manage-question/manage-question';
import ManageTestScreen from '../screens/manage-test/manage-test';
import TestDetailScreen from '../screens/manage-test/test-detail';
import AuthorizedService from '../service/authorized.service';
import recycleBinScreen from '../screens/trash-can/recycle-bin';
import ProfileUser from '../screens/profile/profile';
import MainClass from '../screens/class/main-class';
import ClassScreen from '../screens/class';
import forgotPassword from '../screens/forgot-password/forgot-password';
import changePassword from '../screens/forgot-password/change-password';


const AppNavigation = (props: any) => {

    const authenSerivce = new AuthorizedService();

    const { setLoading, setSnackbar } = props;

    const getDefaultRouter = (): any => {
        if (authenSerivce.getToken()) {
            return APP_ROUTER.MANAGE_QUESTION;
        } else {
            return APP_ROUTER.LOGIN.HOME;
        }
    }

    return (
        <Switch>
            {/* <Route exact path='/'>
                {<Redirect to={getDefaultRouter()} />}
            </Route> */}
            {/* <Route path={APP_ROUTER.TEACHER.HOME} exact >
                <TeacherScreen />
            </Route> */}
            <Route path={APP_ROUTER.LOGIN.HOME} exact >
                <LoginScreen />
            </Route>
            <Route path={APP_ROUTER.LOGIN.FORGOT_PASSWORD} component={forgotPassword} />

            {/* <Route path={APP_ROUTER.LOGOUT} component={Logout}/> */}
            <Route path={APP_ROUTER.MANAGE_QUESTION}>
                <ManageQuestionScreen />
            </Route>
            <Route path={APP_ROUTER.MANAGE_TEST} exact>
                <ManageTestScreen />
            </Route>
            <Route path={APP_ROUTER.TEST_DETAIL} component={TestDetailScreen} />
            <Route exact path={APP_ROUTER.CLASS.ALL_BY_TEACHER}>
                <ClassScreen />
            </Route>
            <Route path={APP_ROUTER.CLASS.ALL_BY_TEACHER + "/:id"} component={MainClass} />
            <Route path={APP_ROUTER.USER.PROFILE}>
                <ProfileUser />
            </Route>
            <Route path={APP_ROUTER.TRASH_CAN} component={recycleBinScreen} />
            {/* <Route component={NotFoundPage} /> */}
            <Route path={APP_ROUTER.USER.FORGOT_CHANGE_PASSWORD} component={changePassword} />

        </Switch>
    )
}

export default AppNavigation;

