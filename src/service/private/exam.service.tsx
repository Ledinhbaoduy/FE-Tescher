import {API_EXAM} from '../../constants/api.constants';
import { Observable } from 'rxjs';
import AppService from '../app.service';
export default class ExamService {
    private appService = new AppService();

    getAllExamsByTeacher = (id:any) : Observable<any> =>{
        return this.appService.get(`${API_EXAM.EXAM}${id}/lists`)
    }

    getById = (id:any) : Observable<any> => {
        return this.appService.get(`${API_EXAM.EXAM}${id}`)
    }

    getExInClassroom = (id:any) : Observable<any> => {
        return this.appService.get(`${API_EXAM.EXAM}lophoc/${id}`);
    }

    addEx = (body:any) : Observable<any> => {
        return this.appService.post(`${API_EXAM.ADD}`,body);
    }

    updateEx = (body:any) : Observable<any> => {
        return this.appService.post(`${API_EXAM.UPDATE}`,body)
    }
    
    softDeleteEx = (id: any) : Observable<any> => {
        return this.appService.post(API_EXAM.DELETE,{id: id});
    }
}