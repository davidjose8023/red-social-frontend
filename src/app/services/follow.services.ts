import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Follow }  from '../models/follow.model';
import { GLOBAL } from './global';

@Injectable()
export class FollowService{

    public url:string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient){

        this.url = GLOBAL.url;

    }

    addFollows(token, follow): Observable<any>{
        let params  = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('Authorization', token);

        return this._http.post(this.url+'follow',params, {headers:headers});
        

    }

    deleteFollow(token, idFollow): Observable<any>{
         
        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('Authorization', token);

        return this._http.delete(this.url+'follow/'+idFollow, {headers:headers});
        

    }
}