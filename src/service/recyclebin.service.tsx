import AppService from "./app.service";
import AuthorizedService from "./authorized.service";
import { Observable } from "rxjs";
import { API_RECYCLE_BIN } from "../constants/api.constants";

export class recycleBinService {
    private appService = new AppService();
    private authService = new AuthorizedService();
    userId = '';
    constructor() {
        this.userId = this.authService.getIdUsers();
    }
    //api Bài Thi
    getRecycleBinTest = (body: any): Observable<any> => {
        body = { t_id: this.userId, ...body };
        return this.appService.post(API_RECYCLE_BIN.GET_TEST, body);
    }
    recycleBinRestoreTest = (body: any): Observable<any> => {
        body = { id: this.userId, ...body };
        return this.appService.post(API_RECYCLE_BIN.RESTORE_TEST, body);
    }

    recycleBinDeleteTest = (body: any): Observable<any> => {
        return this.appService.post(API_RECYCLE_BIN.DELETE_TEST, body);
    }
    //api Bài Tập
    getRecycleBinExcer = (body: any): Observable<any> => {
        body = { t_id: this.userId, ...body };
        return this.appService.post(API_RECYCLE_BIN.GET_EXCER, body);
    }
    recycleBinRestoreExcer = (body: any): Observable<any> => {
        body = { id: this.userId, ...body };
        return this.appService.post(API_RECYCLE_BIN.RESTORE_EXCER, body);
    }
    recycleBinDeleteExcer = (body: any): Observable<any> => {
        body = { id: this.userId, ...body };
        return this.appService.post(API_RECYCLE_BIN.DELETE_EXCER, body);
    }
}