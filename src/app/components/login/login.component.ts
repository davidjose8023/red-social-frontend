import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.services';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]

})

export class LoginComponent implements OnInit {
    public title: string ;
    public user: User;
    public status: string;
    public identity;
    public token;
    constructor(
        private _route : ActivatedRoute, 
        private _router : Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
        this.user = new User("","","","","","","ROLE_USER","","");
    }
    ngOnInit(){
        console.log('componente login cargado');
    }

    onSubmit(loginForm){
        
        this._userService.signUp(this.user).subscribe(

            response => {
                console.log(response.user);
                this.identity = response.user;
                if (!this.identity || !this.identity._id){

                    this.status = 'error';
                }else{

                    this.status = 'success';
                    // PERSISTIR DATOS DEL USUARIO
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    //CONSEGUIR EL TOKEN
                    this.getToken();
 
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage){
                    this.status = 'error';
                }
                
            }
        );
    }

    // getToken(){
    //     this._userService.signUp(this.user, 'true').subscribe(

    //         response => {
    //             //console.log(response.user);
    //             this.token = response.token;
    //             if (this.token.length <= 0){

    //                 this.status = 'error';
    //             }else{

    //                 this.status = 'success';
    //                 // PERSISTIR TOKEN DEL USUARIO
    //                 localStorage.setItem('token', this.token);
    //                 console.log('hola 1');
    //                 this.getCounters();
    //                 console.log('hola 3');
                    
                    
    //                 //CONSEGUIR CONTADORES Y ESTADISTICAS DEL USUARIO
                    
    //             }
    //         },
    //         error => {
    //             var errorMessage = <any>error;
    //             console.log(errorMessage);
    //             if(errorMessage){
    //                 this.status = 'error';
    //             }
                
    //         }
    //     );
    
    // }
  
    getToken = async () => {

        try{
            let response = await this._userService.signUp(this.user, 'true').toPromise().then((response) => {
                
                return response;
            });
            this.token = response.token;
            if (this.token.length <= 0){

                this.status = 'error';
            }else{

                this.status = 'success';
                // PERSISTIR TOKEN DEL USUARIO
                localStorage.setItem('token', this.token);
                console.log('hola 1');
                await this.getCounters();
                console.log('hola 3');
                this._router.navigate(['/']);
                
                
                //CONSEGUIR CONTADORES Y ESTADISTICAS DEL USUARIO
                
            }

          return this.token;
        } catch(e){
            console.log("error hola");
            console.log(e);
            this.status = 'error';
        }
    
    }

    // getCounters(){
 
    //     this._userService.getCounters().subscribe(

    //         response => {
    //             localStorage.setItem('stats', JSON.stringify(response) );
    //             console.log('hola 2');
    //             this._router.navigate(['/']);
    //         },
    //         error => {
    //             console.log(<any>error);
    //         }
    //     );
    // }

    
    getCounters = async () => {
 
        let response = await this._userService.getCounters().toPromise().then((response) => {
                
            return response;
        });

        localStorage.setItem('stats', JSON.stringify(response) );
        console.log('hola 2');
        
    }
     
}
