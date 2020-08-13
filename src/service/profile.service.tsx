import AppService from "./app.service";
import { Observable } from 'rxjs';
import { API_PROFILE } from "../constants/api.constants";
import { STRING_REPLACE } from "../constants/common.constants";
import AuthorizedService from "./authorized.service";

export class profileService {

    private appService = new AppService();
    private userId = new AuthorizedService().getIdUsers();

    getProfile = (id: string): Observable<any> => {
        const idUser = API_PROFILE.PROFILE.replace(STRING_REPLACE.REPLACE_0, id);
        return this.appService.get(idUser);
    }

    chanePassword = (body: any): Observable<any> => {
        // id, oldPassword, pwd
        body = { id: this.userId, ...body };
        return this.appService.post(API_PROFILE.CHANGE_PASSWORD, body);
    }

    changeInfoRequest = (body: any): Observable<any> => {
        // id, ho, ten, ngay_sinh, ly_do
        body = { id: this.userId, ...body };
        return this.appService.post(API_PROFILE.CHANGE_INFO_REQUEST, body);
    }
}