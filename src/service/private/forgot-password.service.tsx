import {API_USER} from '../../constants/api.constants';
import { Observable } from 'rxjs';
import AppService from '../app.service';
export default class ForgotPassword {
    private appService = new AppService();

    sendRequest = (email:string) : Observable<any> => {
        return this.appService.post(`${API_USER.FORGOT_PASSWORD}`,{email: email})
    }

    checkCode = (code: string) : Observable<any> => {
        return this.appService.get(`${API_USER.CHECK_CODE}${code}`)
    }

    changePassword = (email: string, password: string) : Observable<any> => {
        return this.appService.post(`${API_USER.FORGOT_CHANGE_PASSWORD}`,{email: email, pwd: password})
    }

    deleteCode = (code: string) : Observable<any> => {
        return this.appService.post(`${API_USER.DELETE_CODE}`, {code: code})
    }
    
}