import AppService from "./app.service";
import { Observable } from "rxjs";
import AuthorizedService from "./authorized.service";
import { API_TEST } from "../constants/api.constants";
import { STRING_REPLACE } from "../constants/common.constants";

export class TestService {
    private appService = new AppService();
    private authService = new AuthorizedService();
    userId = '';

    constructor() {
        this.userId = this.authService.getIdUsers();
    }

    getAllTestsByTeacher = (body: any): Observable<any> => {
        const model = { t_id: this.userId, ...body }
        return this.appService.post(API_TEST.TEST, model);
    }

    getTestInClassroom = (c_id: any) : Observable<any> => {
        return this.appService.get(`${API_TEST.TEST_IN_CLASS}${c_id}`);
    }

    getQuestionMCByTopic = (body: any): Observable<any> => {
        const model = { u_id: this.userId, topic: body };
        return this.appService.post(API_TEST.GET_QUESTION_MC_BY_TOPIC, model);
    }

    getQuestionEssayByTopic = (body: any): Observable<any> => {
        const model = { u_id: this.userId, topic: body };
        return this.appService.post(API_TEST.GET_QUESTION_ESSAY_BY_TOPIC, model);
    }
    addTest = (body: any): Observable<any> => {
        const model = { nguoi_tao_id: this.userId, ...body };
        return this.appService.post(API_TEST.ADD_TEST, model);
    }
    deleteTest = (body: any): Observable<any> => {
        return this.appService.post(API_TEST.DELETE_TEST, body)
    }
    getDetailTest = (id: string): Observable<any> => {
        const _id = API_TEST.DETAIL_TEST.replace(STRING_REPLACE.REPLACE_0, id);
        return this.appService.get(_id);
    }

    updateTest = (body: any): Observable<any> => {
        return this.appService.post(API_TEST.UPDATE_TEST, body);
    }
}