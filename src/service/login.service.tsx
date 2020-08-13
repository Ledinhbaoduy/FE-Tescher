import { UserLogin } from "../models/user.model";
import { Observable } from "rxjs";
import AppService from "./app.service";
import { API_LOGIN } from "../constants/api.constants";

export class LoginService {
    private appService = new AppService();

    login = (user: UserLogin): Observable<any> => {
        return this.appService.post(API_LOGIN.LOGIN, user);
    }
}