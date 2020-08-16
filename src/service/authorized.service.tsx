import { LOCAL_STORAGE } from "../constants/common.constants"
// import { post } from "./app.service";
import jwt_decode from "jwt-decode";
import { TokenInformation } from "../models/user.model";
import { UserLogin } from "../models/user.model";

export default class AuthorizedService {
    getUserInfo(): TokenInformation {
        let user = localStorage.getItem(LOCAL_STORAGE.USER_INFO);
        return user ? JSON.parse(user) : new UserLogin('', '');

    }
    getToken(): string {
        let user = localStorage.getItem(LOCAL_STORAGE.USER_INFO);
        return user ? JSON.parse(user).token : '';
    }

    setUserInfo(data: TokenInformation): void {
        let user = JSON.stringify(data);
        localStorage.setItem(LOCAL_STORAGE.USER_INFO, user);
    }

    setAvatar = (id: string) =>{
        localStorage.setItem('AVATAR', id);
    }

    getAvatar = () => {
        let id = localStorage.getItem('AVATAR');
        return `http://localhost:3001/api/file/${id}`
    }

    getIdUsers(): string {
        let user = localStorage.getItem(LOCAL_STORAGE.USER_INFO) || "";
        if (user) {
            const objUser = JSON.parse(user);
            return objUser.user_info.id;
        } else {
            return "";
        }
    }

    checkExpiryToken = (token: any): boolean => {
        if (token === '') return true;
        const claims = jwt_decode<any>(token);
        if (Date.now() >= claims.exp * 1000) {
            return true;
        }
        return false
    }

    // isAdmin = (): boolean => {
    //     const userInfo = this.getUserInfo();
    //     return userInfo.roleId === ROLE.ADMINISTRATOR || userInfo.roleId === ROLE.SUPER_ADMIN;
    // }

    // isEditor = (): boolean => {
    //     const userInfo = this.getUserInfo();
    //     return userInfo.roleId === ROLE.EDITOR;
    // }

    // getRoleName = (roleId?: string): string => {
    //     const userInfo = this.getUserInfo();
    //     const role = roleId ? roleId : userInfo.roleId;
    //     switch (role) {
    //         case ROLE.ADMINISTRATOR:
    //             return ROLE_NAME.ADMINISTRATOR;
    //         case ROLE.CUSTOMER:
    //             return ROLE_NAME.CUSTOMER;
    //         case ROLE.EDITOR:
    //             return ROLE_NAME.EDITOR;
    //         case ROLE.SALES_MANAGER:
    //             return ROLE_NAME.SALES_MANAGER;
    //         case ROLE.SUPER_ADMIN:
    //             return ROLE_NAME.SUPER_ADMIN;
    //         default:
    //             return ''
    //     }
    // }
}