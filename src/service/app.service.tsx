import Axios from "axios"
import AuthorizedService from "./authorized.service";
import { Observable, from } from "rxjs";

class AppService {

    private authorService = new AuthorizedService();

    setHeader = () => {
        const headers = {
            'ContentType': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': "Bearer " + this.authorService.getToken(),
        }
        return headers;
    }

    private extend = { timeout: 10000 };


    get = (url: string, config?: any): Observable<any> => {
        config = { ...config, ...this.extend };

        return from(Axios.create({ headers: this.setHeader() })
            .get(url, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            }));
    }

    post = (url: string, body: any, config?: any): Observable<any> => {
        config = { ...config, ...this.extend };
        return from(Axios.create({ headers: this.setHeader() })
            .post(url, body, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            }));
    }
}
export default AppService;