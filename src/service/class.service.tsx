import AppService from "./app.service";
import { Observable } from "rxjs";
import { API_CLASS } from "../constants/api.constants";
import { STRING_REPLACE } from "../constants/common.constants";
export default class ClassService {
    private appService = new AppService();
    getAllStudentsByClass = (id:any) : Observable<any> => {
        return this.appService.get(API_CLASS.DROPDOWN_CLASS.replace(STRING_REPLACE.REPLACE_0,id)+'/sinh-vien')
    }
    // getAllExamsByClass = (id:any) : Observable<any> => {
    //     //return this.appService.get(API_CLASS.DROPDOWN_CLASS+id+'/bai-tap'); 
    // }
    // getAllTestsByClass = (id:any) : Observable<any> => {
    //     return this.appService.get(API_CLASS.DROPDOWN_CLASS+id+'/bai-thi'); 
    // }
    getAllClassesByTeacher = (id:string) : Observable<any> => {
        const ids = API_CLASS.DROPDOWN_CLASS.replace(STRING_REPLACE.REPLACE_0, id);
        return this.appService.get(ids);
    }
    getInfoById = (id:any) : Observable<any> => {
        return this.appService.get(`${API_CLASS.INFO}/${id}`);
    }

    addExamToClass = (c_id:any, ex_id:any) : Observable<any> => {
        return this.appService.post(`${API_CLASS.ADD_EXAM_TO_CLASS}`,{c_id: c_id, ex_id: ex_id});
    }

    addTestToClass = (c_id:any, ex_id:any) : Observable<any> => {
        return this.appService.post(`${API_CLASS.ADD_TEST_TO_CLASS}`,{c_id: c_id, ex_id: ex_id});
    }

    removeStudent = (c_id:any, s_id:any) : Observable<any> => {
        return this.appService.post(`${API_CLASS.REMOVE_STUDENT}`, {c_id: c_id, s_id: s_id});
    }

    inviteStudent = (email: string, nguoi_moi: any, lop_hoc: any) : Observable<any> => {
        const body = {email: email, nguoi_moi_id: nguoi_moi, lop_hoc_id: lop_hoc};
        return this.appService.post(`${API_CLASS.INVITE_STUDENT}addcode`,body);
    }

    addClassroom = (body:any) : Observable<any> => {
        return this.appService.post(`${API_CLASS.ADD}`,body)
    }

    updateClassroom = (body:any) : Observable<any> => {
        return this.appService.post(`${API_CLASS.UPDATE}`,body)
    }

}