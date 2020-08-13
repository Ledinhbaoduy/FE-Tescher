import React, {useEffect} from 'react';
import history from '../../navigation/App.history';
import { APP_ROUTER } from '../../constants/router.constants';
export const Logout: any = () =>{

    useEffect(()=>{
        logOut();
    },)
    const logOut = ()=>{
        localStorage.clear();
        history.push(APP_ROUTER.LOGIN.HOME);
    }
    return (<div></div>)
}