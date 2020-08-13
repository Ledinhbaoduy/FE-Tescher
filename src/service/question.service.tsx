import AppService from "./app.service";
import { Observable } from "rxjs";
import { API_QUESTION } from "../constants/api.constants";
import { STRING_REPLACE } from "../constants/common.constants";
import AuthorizedService from "./authorized.service";

export class QuestionService {
        private appService = new AppService();
        private authService = new AuthorizedService();
        userId = '';
        constructor() {
                this.userId = this.authService.getIdUsers();
        }
        //CÂU HỎI TRẮC NGHIỆM
        searchQuestionMultipleChoice = (body: any): Observable<any> => {
                const model = { t_id: this.userId, ...body };
                return this.appService.post(API_QUESTION.SEARCH_MULTIPLE_CHOICE, model);
        }
        addMultipleChoiceQuestion = (body: any): Observable<any> => {
                return this.appService.post(API_QUESTION.ADD_MULTIPLE_CHOICE_QUESTION, body);
        }

        updateMultipleChoiceQuestion = (body: any): Observable<any> => {
                return this.appService.post(API_QUESTION.UPDATE_MULTIPLE_CHOICE_QUESTION, body);
        }

        deleteMultipleChoiceQuestion = (body: any): Observable<any> => {
                return this.appService.post(API_QUESTION.DELETE_MULTIPLE_CHOICE_QUESTION, body);
        }

        getDetailMultipleChoiceQuestion = (id: string): Observable<any> => {
                const idQuestionMC = API_QUESTION.DETAIL_QUESTION_MULTIPLE_CHOICE.replace(STRING_REPLACE.REPLACE_0, id);
                return this.appService.get(idQuestionMC);
        }

        // CÂU HỎI TỰ LUẬN
        searchQuestionEssay = (body: any): Observable<any> => {
                const model = { t_id: this.userId, ...body };
                return this.appService.post(API_QUESTION.SEARCH_ESSAY, model);
        }
        addEssay = (body: any): Observable<any> => {
                return this.appService.post(API_QUESTION.ADD_ESSAY_QUESTION, body);
        }

        updateEssay = (body: any): Observable<any> => {
                return this.appService.post(API_QUESTION.UPDATE_ESSAY_QUESTION, body);
        }

        deleteEssay = (body: any): Observable<any> => {
                return this.appService.post(API_QUESTION.DELETE_ESSAY_QUESTION, body);
        }

        getDetailEssayQuestion = (id: string): Observable<any> => {
                const idQuestionEssay = API_QUESTION.DETAIL_QUESTION_ESSAY.replace(STRING_REPLACE.REPLACE_0, id);
                return this.appService.get(idQuestionEssay);
        }

        //TÌM KIÊM THEO NỘI DUNG CÂU HỎI 
        searchContentQuestionMultipleChoice = (body: any): Observable<any> => {
                const model = { t_id: this.userId, ...body };
                return this.appService.post(API_QUESTION.SEARCH_QUESTION_MULTIPLE_CHOICE, model)
        }

        searchContentQuestionEssay = (body: any): Observable<any> => {
                const model = { t_id: this.userId, ...body };
                return this.appService.post(API_QUESTION.SEARCH_QUESTION_ESSAY, model)
        }

        //-----------


}