import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { Publication }  from '../models/publication.model';
import { GLOBAL } from './global';

@Injectable()
export class PublicationService{

    public url:string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient){

        this.url = GLOBAL.url;

    }

    addPublication(token, publication): Observable<any>{
        let params  = JSON.stringify(publication);
        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('Authorization', token);

        return this._http.post(this.url+'add-publication',params, {headers:headers});
        

    }

    getPublications(token, page = 1): Observable<any>{
        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('Authorization', token);

        return this._http.get(this.url+'publications/'+ page, {headers});

    }

    deletePublication(token, idPublication): Observable<any>{
         
        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('Authorization', token);

        return this._http.delete(this.url+'publication/'+idPublication, {headers:headers});
        

    }
}