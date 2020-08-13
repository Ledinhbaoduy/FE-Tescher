import AppService from './app.service';
import { Observable } from 'rxjs';
import { API_TOPIC, API_CLASS, API_PROFILE } from '../constants/api.constants';
import { STRING_REPLACE } from '../constants/common.constants';

export default class CommonService {
    private appService = new AppService();

    getTopic = (): Observable<any> => {
        return this.appService.get(API_TOPIC.TOPIC)
    }

    getDropdownClass = (id: string): Observable<any> => {
        const idUser = API_CLASS.DROPDOWN_CLASS.replace(STRING_REPLACE.REPLACE_0, id);
        return this.appService.get(idUser);
    }

    getLocationAlphabet = (index: number) => {
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(s => s.toUpperCase());
        return alphabet[index];
    }

    getInfo = (id:string): Observable<any> => {
        const idUser =API_PROFILE.PROFILE.replace(STRING_REPLACE.REPLACE_0, id);
        return this.appService.get(idUser);
    }

}