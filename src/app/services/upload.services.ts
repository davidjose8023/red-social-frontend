import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{

    public url:string;
   

    constructor(){

        this.url = GLOBAL.url;

    }
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){

        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i =0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            } 
       

            // hacer peticion ajax
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));

                    }else{// no deja enviar el ajax
                        reject(xhr.response);
                    }
                    
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });

        

    }
}