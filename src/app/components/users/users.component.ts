import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { UserService } from '../../services/user.services';
import { FollowService } from '../../services/follow.services';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService, FollowService]

})

export class UsersComponent implements OnInit {
    public title: string ;
    public status: string;
    public identity;
    public token;
    public page;
    public next_page;
    public prev_page;
    public total;
    public users: User[];
    public pages;
    public follows;
    public url: string;
    
    constructor( 
        private _route : ActivatedRoute, 
        private _router : Router,
        private _userService: UserService,
        private _followService: FollowService
        ){
        this.title = 'Users';
        this.url= GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
 
      
    }
    ngOnInit(){
        console.log('componente users cargado');
        this.actualPage();
    }

    actualPage(){
        this._route.params.subscribe(params => {
            let page = +params['page']; // el signo + convierte a integer
            this.page = page;

            if(!params['page']){
                page = 1;
            }
            if(!page){
                page = 1;
                

            }else{
                this.next_page = page + 1; 
                this.prev_page = page - 1; 

                if(this.prev_page <= 0){
                    
                    this.prev_page = 1;

                }

            }

            // devolver listado de usuarios
            this.getUsers(page);


        });
    }

    getUsers(page){

        this._userService.getUsers(page).subscribe(
            response => {
                if(!response.users){
                    this.status = 'error';
                }else{
                    this.total= response.total;
                    this.users= response.users;
                    this.pages= response.pages;
                    this.follows= response.user_following;
                    if(page > this.pages){
                        this._router.navigate(['/users', 1]);

                    }
                }
            },
            error => {
                var errorMessage =  <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );

    }
    public followUserOver;
    mouseEnter(user_id){
        this.followUserOver = user_id;

    }
    mouseLeave(user_id){
        this.followUserOver = 0;

    }

    followUser(followed){
    
        var follow = new Follow('',this.identity._id,followed);

        this._followService.addFollows(this.token, follow).subscribe(
            response => {
                if(!response.follow){
                    this.status = 'error';
                }else{
                  
                    this.status = 'success';
                    this.follows.push(followed);
                    this.getCounters();
                   
                }
            },
            error => {
                var errorMessage =  <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }
    unFollow(followed){

        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
              var search = this.follows.indexOf(followed);

              if(search != -1){
                this.follows.splice(search, 1);// elimina el followed del arreglo follows
                this.getCounters(); 
              }
            },
            error => {
                var errorMessage =  <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    // Esto no esta en el curso lo hice con mi propia logica

    getCounters = async () => {
 
        let response = await this._userService.getCounters().toPromise().then((response) => {
                
            return response;
        });

        localStorage.setItem('stats', JSON.stringify(response) );
        console.log('hola 2');
        
    }
     

}
