import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService, UploadService]

})

export class UserEditComponent implements OnInit{

    public title: string ;
    public url: string;
    public title_button: string ;
    public user: User;
    public status: string;
    public message: string;
    public identity;
    public token;
    public filesToUpload: Array<File>;
    constructor(
        private _route : ActivatedRoute, 
        private _router : Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.url = GLOBAL.url;
        this.title = 'Actualizar mis Datos';
        this.title_button = 'Guardar';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();
        console.log("Identity desde contructor del componente userEditComponent");
        console.log(this.user);
    }
    ngOnInit(){
        console.log('componente user-edit cargado');
    }


    onSubmit(userEditForm){
        
        this._userService.updateUser(this.user).subscribe(

            response => {
                if (response.user){
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(response.user));
                    //this.user = response.user;
                    this.identity = response.user;
                    console.log("actualizo usuario");

                    // Subir imagen de avatar de usuario

                    this._uploadService.makeFileRequest(this.url+'upload-image-user/'+response.user._id,[],this.filesToUpload,
                    this.token, 'image').then((result: any)=>{
                        console.log(result);
                        this.user.image = result.user.image;
                        localStorage.setItem('identity', JSON.stringify(this.user));
                    });
  
                }else{
                    this.status = 'error';
                    this.message = response.message;

                    console.log("No actualizo usuario");
                }
            },
            error => {
                console.log(<any>error);

                if(error!= null){

                    this.status= 'error';
                    this.message = "Ha ocurrio un error intente mas tarde";

                }
                
            }
        );
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;

        console.log(this.filesToUpload);

    }

    
}