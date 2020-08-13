import AppService from '../app.service';
import {Observable} from 'rxjs';
import {API_MARK} from '../../constants/api.constants';
import { STRING_REPLACE } from '../../constants/common.constants';
export default class MarkService{
    private appService = new AppService();
    getExamMarkInClass = (id:any, ex_id:any) : Observable<any> => {
        return this.appService.get(API_MARK.GET_EXAM_MARKS.replace(STRING_REPLACE.REPLACE_0,id).replace(STRING_REPLACE.REPLACE_1,ex_id))
    }

    getTestMarkInClass = (id:any, ex_id:any) : Observable<any> => {
        return this.appService.get(API_MARK.GET_TEST_MARKS.replace(STRING_REPLACE.REPLACE_0, id).replace(STRING_REPLACE.REPLACE_1,ex_id))
    }

    getExOfStudent = (s_id:any, e_id:any) : Observable<any> => {
        return this.appService.get(API_MARK.GET_EXAM_STUDENT.replace(STRING_REPLACE.REPLACE_0,s_id).replace(STRING_REPLACE.REPLACE_1,e_id))
    }

    getTestOfStudent = (s_id:any, t_id:any) : Observable<any> => {
        return this.appService.get(API_MARK.GET_TEST_STUDENT.replace(STRING_REPLACE.REPLACE_0,s_id).replace(STRING_REPLACE.REPLACE_1,t_id))
    }

    addMark = (body: any) : Observable<any> => {
        return this.appService.post(API_MARK.ADD_MARK,body)
    }
}